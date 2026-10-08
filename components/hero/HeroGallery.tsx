"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { HeroGalleryItem } from "@/types";
import { BLANK_SRC, MOBILE_MEDIA } from "@/components/layout/Responsive";

type Props = {
  items: readonly HeroGalleryItem[];
  /** How long each image stays fully visible (ms) */
  interval?: number;
  /** Cross-fade duration (ms) */
  fade?: number;
  /** Positioning classes; must include a position (default: relative) */
  className?: string;
  /** CSS variable used as the Figma-pixel unit (default --u) */
  unit?: string;
  /** Frame size in Figma px */
  width?: number;
  height?: number;
  /** Extra positioning styles (e.g. bottom offset) */
  style?: CSSProperties;
};

/**
 * Auto-rotating 3-image gallery: soft cross-fade, endless loop, no controls.
 * With prefers-reduced-motion the images still change, but without the fade.
 */
export function HeroGallery({ items, interval = 4500, fade = 700, className = "", unit = "--u", width = 397, height = 320, style }: Props) {
  const u = (n: number) => `calc(var(${unit}) * ${n})`;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % items.length), interval + fade);
    return () => window.clearInterval(id);
  }, [items.length, interval, fade]);

  return (
    <div
      className={`overflow-clip bg-placeholder ${className || "relative"}`}
      style={{ ...style, width: u(width), height: u(height) }}
    >
      {items.map((item, i) => {
        const cropStyle = item.crop
          ? { left: u(item.crop.left), top: u(item.crop.top), width: u(item.crop.width), height: u(item.crop.height) }
          : { inset: 0, width: "100%", height: "100%" };
        return (
          // <picture>: phones (mobile layout has no gallery) don't download the images
          <picture key={item.src + i}>
            <source media={MOBILE_MEDIA} srcSet={BLANK_SRC} />
            <img
              src={item.src}
              alt={item.alt}
              aria-hidden={i !== active}
              className="pointer-events-none absolute object-cover"
              style={{
                ...cropStyle,
                opacity: i === active ? 1 : 0,
                transition: reduced ? "none" : `opacity ${fade}ms ease-in-out`,
              }}
            />
          </picture>
        );
      })}
    </div>
  );
}
