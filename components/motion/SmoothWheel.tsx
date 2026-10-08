"use client";

import { useEffect } from "react";

/**
 * Subtle wheel smoothing — mouse wheels only.
 *
 * A notched mouse wheel jumps ~100px per tick; this eases each jump over a
 * few frames (lerp 0.2 ≈ 150–250ms). It never adds a long tail.
 * Left completely native: touchpads (small/fractional deltas), keyboard,
 * scrollbar dragging, anchor links, touch, zoom (ctrl/⌘ + wheel), nested
 * scrollable elements, and everything when prefers-reduced-motion is on.
 * The real document scroll position is used throughout (no fake scroller),
 * so sticky elements, IntersectionObserver and #anchors work as usual.
 */
export function SmoothWheel({ ease = 0.22 }: { ease?: number }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = window.scrollY;
    let pos = target; // our own float position (the browser rounds scrollY)
    let lastSet = target;
    let frame = 0;
    let running = false;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const step = () => {
      // someone else scrolled (keyboard, anchor, scrollbar, script) → hand over
      if (Math.abs(window.scrollY - lastSet) > 2) {
        stop();
        return;
      }
      pos += (target - pos) * ease;
      if (Math.abs(target - pos) < 0.5) pos = target;
      window.scrollTo({ top: pos, behavior: "instant" });
      lastSet = window.scrollY;
      if (pos === target) {
        stop();
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const isMouseWheel = (e: WheelEvent) =>
      e.deltaMode !== 0 || // line/page based (Firefox wheel)
      (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 50);

    const scrollsInside = (el: EventTarget | null, dy: number) => {
      let node = el instanceof Element ? el : null;
      while (node && node !== document.body && node !== document.documentElement) {
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
          if ((dy > 0 && node.scrollTop + node.clientHeight < node.scrollHeight) || (dy < 0 && node.scrollTop > 0)) {
            return true;
          }
        }
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (reduce.matches || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!isMouseWheel(e) || scrollsInside(e.target, e.deltaY)) {
        if (running) stop();
        return;
      }
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (!running) target = pos = lastSet = window.scrollY;
      target = Math.max(0, Math.min(maxScroll(), target + delta));
      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };

    // Any other way of scrolling hands control back to the browser at once
    const interrupt = () => running && stop();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", interrupt);
    window.addEventListener("pointerdown", interrupt);
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("hashchange", interrupt);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("hashchange", interrupt);
    };
  }, [ease]);

  return null;
}
