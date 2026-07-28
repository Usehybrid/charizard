/** Inline 16px stroke icons — no icon dependency, no network fetches. */
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function CopyIcon() {
  return (
    <svg {...base} aria-hidden>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg {...base} aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg {...base} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function EyeIcon() {
  return (
    <svg {...base} width={14} height={14} aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function CodeIcon() {
  return (
    <svg {...base} width={14} height={14} aria-hidden>
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
    </svg>
  )
}

export function ChevronDownIcon() {
  return (
    <svg {...base} width={14} height={14} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ArrowRightIcon() {
  return (
    <svg {...base} width={14} height={14} aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  )
}
