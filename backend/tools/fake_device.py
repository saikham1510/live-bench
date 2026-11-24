"""Fake bench-01: publishes contract-shaped telemetry to a local MQTT broker.

Stands in for the ESP32, and stays useful afterwards for testing the backend without hardware. Follows docs/api-contract.md, "MQTT payloads".

Run from backend/ with the virtualenv active:
    python tools/fake_device.py --interval 5
"""

from __future__ import annotations

import argparse
import json
import math
import random
import threading
import time
from datetime import datetime, timedelta, timezone

import paho.mqtt.client as mqtt

SGT = timezone(timedelta(hours=8))


def topics(device_id: str) -> tuple[str, str]:
    """Return the (telemetry, status) topics for one device."""
    return f"devices/{device_id}/telemetry", f"devices/{device_id}/status"


def utc_timestamp(moment: datetime) -> str:
    """ISO 8601, UTC, whole seconds, Z suffix: 2026-09-17T09:12:00Z."""
    return moment.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def make_reading(
    device_id: str,
    now: datetime,
    uptime_s: int,
    rng: random.Random,
    null_rate: float = 0.0,
) -> dict:
    """Build one telemetry payload"""
    local = now.astimezone(SGT)
    hour = local.hour + local.minute / 60

    # About 27 °C before dawn, about 31 °C at 3 pm.
    temperature = 29.0 + 2.0 * math.sin((hour - 9) / 24 * 2 * math.pi)
    temperature += rng.uniform(-0.3, 0.3)

    # Daylight from 7 am to 7 pm (peak at 1 pm), room lights in the evening.
    daylight = math.sin((hour - 7) / 12 * math.pi) if 7 <= hour <= 19 else 0.0
    lamps = 25 if 19 <= hour < 23 else 0
    light = 80 * daylight + lamps + rng.uniform(-3, 3)

    # Someone is around most of the day, rarely at night.
    presence = rng.random() < (0.6 if 7 <= hour < 23 else 0.05)

    reading = {
        "device_id": device_id,
        "timestamp": utc_timestamp(now),
        "temperature": round(temperature, 1),
        "light_level": int(min(100, max(0, round(light)))),
        "presence": presence,
        "rssi": rng.randint(-72, -55),
        "uptime_s": uptime_s,
    }

    # A failed sensor read is sent as null, never 0 or -1 (contract rule).
    if rng.random() < null_rate:
        reading["temperature"] = None  # DHT22 read failed
    if rng.random() < null_rate:
        reading["light_level"] = None  # ADC read failed

    return reading


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--host", default="127.0.0.1", help="broker address")
    parser.add_argument("--port", type=int, default=1883)
    parser.add_argument("--device-id", default="bench-01")
    parser.add_argument(
        "--interval",
        type=float,
        default=60,
        help="seconds between readings (contract: 60)",
    )
    parser.add_argument(
        "--count", type=int, default=0, help="stop after N readings (0 = run forever)"
    )
    parser.add_argument(
        "--keepalive", type=int, default=15, help="MQTT keepalive in seconds"
    )
    parser.add_argument(
        "--null-rate",
        type=float,
        default=0.0,
        help="chance (0-1) that a sensor read 'fails'",
    )
    parser.add_argument(
        "--hang-after",
        type=int,
        default=0,
        help="after N readings, freeze without disconnecting (tests the last will)",
    )
    return parser.parse_args(argv)


def clock() -> str:
    return datetime.now(SGT).strftime("%H:%M:%S")


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    telemetry_topic, status_topic = topics(args.device_id)
    rng = random.Random()
    connected = threading.Event()
    refused = []  # filled in if the broker says no (e.g. wrong password)

    client = mqtt.Client(
        mqtt.CallbackAPIVersion.VERSION2, client_id=f"fake-{args.device_id}"
    )

    # Last will
    client.will_set(status_topic, "offline", qos=1, retain=True)

    def on_connect(client, userdata, flags, reason_code, properties):
        if reason_code.is_failure:
            refused.append(str(reason_code))
            connected.set()  # wake main() so it can stop instead of retrying
            return
        # Runs on every (re)connect, so a reconnect also says "online" again.
        client.publish(status_topic, "online", qos=1, retain=True)
        print(f"{clock()} connected to {args.host}:{args.port}, status = online")
        connected.set()

    def on_disconnect(client, userdata, flags, reason_code, properties):
        if reason_code != 0 and not refused:
            print(f"{clock()} lost the broker ({reason_code}); paho will retry")

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect

    try:
        client.connect(args.host, args.port, keepalive=args.keepalive)
    except OSError as error:
        print(f"Can't reach the broker at {args.host}:{args.port} ({error}).")
        print("Is it running? Try: docker compose ps")
        return 1

    client.loop_start()  # network thread: sends, receives, keepalive pings

    # connect() returns before the broker answers. Wait for the answer, so
    # "online" always goes out before the first reading.
    if not connected.wait(timeout=5):
        print("The broker didn't answer within 5 s.")
        client.loop_stop()
        return 1
    if refused:
        print(f"The broker refused the connection: {refused[0]}.")
        client.loop_stop()
        return 1

    started = time.monotonic()
    sent = 0

    try:
        while args.count == 0 or sent < args.count:
            reading = make_reading(
                args.device_id,
                datetime.now(timezone.utc),
                uptime_s=int(time.monotonic() - started),
                rng=rng,
                null_rate=args.null_rate,
            )
            client.publish(telemetry_topic, json.dumps(reading), qos=1)
            sent += 1
            print(
                f"{clock()} #{sent} temp={reading['temperature']} "
                f"light={reading['light_level']} presence={reading['presence']}"
            )

            if args.hang_after and sent >= args.hang_after:
                print(f"{clock()} freezing now: no more pings, connection left open.")
                print("Watch the subscriber. Press Ctrl+C to quit.")
                client.loop_stop()  # stops keepalive pings, socket stays open
                while True:
                    time.sleep(1)

            if args.count == 0 or sent < args.count:
                time.sleep(args.interval)
    except KeyboardInterrupt:
        if args.hang_after and sent >= args.hang_after:
            print(f"\n{clock()} quit while frozen (no goodbye).")
            return 0
        print(f"\n{clock()} Ctrl+C")

    # Clean exit for proper client disconnections: say "offline" ourselves.
    goodbye = client.publish(status_topic, "offline", qos=1, retain=True)
    goodbye.wait_for_publish(timeout=3)
    client.disconnect()
    client.loop_stop()
    print(f"{clock()} said goodbye: status = offline. Sent {sent} readings.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())