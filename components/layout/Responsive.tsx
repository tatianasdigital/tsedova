import type { ReactNode } from "react";

/**
 * Desktop / mobile switch (breakpoint 768px = Tailwind `md`).
 *
 * DesktopOnly uses `display: contents` from 768px up, so it creates no box
 * of its own — the approved desktop layout renders exactly as before.
 * MobileOnly is a real block (it carries the mobile unit scope `.m-scope`).
 */
export function DesktopOnly({ children }: { children: ReactNode }) {
  return <div className="hidden md:contents">{children}</div>;
}

export function MobileOnly({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`m-scope md:hidden ${className}`}>{children}</div>;
}

/** 1×1 transparent GIF — used in <picture> so the other layout's heavy images are never downloaded */
export const BLANK_SRC = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
export const MOBILE_MEDIA = "(max-width: 767.98px)";
export const DESKTOP_MEDIA = "(min-width: 768px)";
