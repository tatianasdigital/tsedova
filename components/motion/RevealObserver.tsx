"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-triggered entrances (once per element).
 *
 * Observes every `[data-reveal-group]` and every `[data-reveal]` that is not
 * inside a group. When one enters the viewport it gets `.is-revealed` and is
 * no longer observed — the CSS in globals.css does the animation
 * (opacity + small translateY, stagger via `--reveal-delay`).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;

    const targets = new Set<Element>();
    document.querySelectorAll("[data-reveal-group]").forEach((el) => targets.add(el));
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (!el.closest("[data-reveal-group]")) targets.add(el);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      // fire when the element's top has risen to ~75% of the viewport height,
      // so the animation plays where the visitor is actually looking
      { rootMargin: "0px 0px -25% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
