type IconProps = { className?: string };

const base = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

export function GitHubIcon({ className = "size-5" }: IconProps) {
    return (
        <svg {...base} strokeWidth={1.8} className={className}>
            <path d="M8 4L3 12l5 8" />
            <path d="M16 4l5 8-5 8" />
        </svg>
    );
}

export function LinkedInIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 7.5v.5M12 17v-6M12 13.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
    </svg>
  );
}

export function MenuIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}