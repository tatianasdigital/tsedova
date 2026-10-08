import type { CSSProperties } from "react";

export type RevealKind = "from-above" | "from-below" | "fade" | "ring";

/**
 * Props for a scroll-triggered entrance (see RevealObserver + globals.css).
 * `delay` in ms staggers elements that become visible together.
 */
export const reveal = (kind: RevealKind, delay = 0) => ({
  "data-reveal": kind,
  style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
});

/** Standard stagger step between sibling entrances (ms) */
export const STAGGER = 150;
