// Monogram: an E whose middle arm ends in a dot, drawn so it follows the theme's primary colour.
export default function Logo({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="15" className="fill-primary" />
      <path
        d="M20 17h22M20 32h14M20 47h22M20 17v30"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        className="stroke-primary-foreground"
      />
      <circle cx="46" cy="32" r="4" className="fill-primary-foreground" />
    </svg>
  );
}
