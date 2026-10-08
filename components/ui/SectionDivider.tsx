/** 1px rgba(255,255,255,.2) rule along the top edge of a section block. */
export function SectionDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-divider ${className}`} />;
}
