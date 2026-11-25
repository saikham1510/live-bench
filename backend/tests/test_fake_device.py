"""The fake device follows docs/api-contract.md exactly, because the backend will be built and tested against what it sends."""

import random
import re
from datetime import datetime, timedelta, timezone

from fake_device import make_reading, topics

START = datetime(2026, 11, 24, 0, 0, tzinfo=timezone.utc)
CONTRACT_FIELDS = {
    "device_id",
    "timestamp",
    "temperature",
    "light_level",
    "presence",
    "rssi",
    "uptime_s",
}

def a_day_of_readings(null_rate=0.0):
    """One reading every 10 minutes for 24 hours, with a fixed seed."""
    rng = random.Random(42)
    return [
        make_reading(
            "bench-01", START + timedelta(minutes=10 * i), 600 * i, rng, null_rate
        )
        for i in range(144)
    ]

def test_topics_match_the_contract():
    assert topics("bench-01") == (
        "devices/bench-01/telemetry",
        "devices/bench-01/status",
    )

def test_reading_has_exactly_the_contract_fields():
    for reading in a_day_of_readings():
        assert set(reading) == CONTRACT_FIELDS

def test_timestamp_is_utc_with_z_and_whole_seconds():
    reading = make_reading("bench-01", START, 0, random.Random(1))
    assert reading["timestamp"] == "2026-11-24T00:00:00Z"
    assert re.fullmatch(r"\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ", reading["timestamp"])

def test_values_have_contract_types_and_ranges():
    for r in a_day_of_readings():
        assert isinstance(r["temperature"], float)
        assert r["temperature"] == round(r["temperature"], 1)
        assert isinstance(r["light_level"], int) and not isinstance(
            r["light_level"], bool
        )
        assert 0 <= r["light_level"] <= 100
        assert isinstance(r["presence"], bool)
        assert isinstance(r["rssi"], int) and r["rssi"] < 0
        assert isinstance(r["uptime_s"], int) and r["uptime_s"] >= 0

def test_failed_reads_are_null_never_zero_or_minus_one():
    readings = a_day_of_readings(null_rate=1.0)
    assert all(r["temperature"] is None for r in readings)
    assert all(r["light_level"] is None for r in readings)