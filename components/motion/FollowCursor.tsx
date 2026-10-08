"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** SVG of the cursor button (from Figma) */
  src: string;
  /** Add a background blur behind the (transparent) button */
  blur?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Replaces the system cursor with a Figma cursor-button while the pointer is
 * over the wrapped area. The button follows the pointer with a light lerp
 * and morphs in/out of a dot exactly under the pointer, so switching between
 * the system cursor and the button is seamless.
 * Only for fine pointers (mouse/touchpad); on touch nothing changes.
 * The wrapper adds no box of its own (display: contents is not used so the
 * hover area is exactly the child's box).
 */
export function FollowCursor({ src, blur = false, children, className = "" }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    const cursor = cursorRef.current;
    if (!enabled || !area || !cursor) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frame = 0;
    let inside = false;
    let exitUntil = 0; // keep following the pointer while the exit morph plays

    const render = () => {
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    // Inside the area: a light lerp gives the button a soft, "weighted" follow.
    const loop = () => {
      if (!inside) {
        frame = 0;
        return;
      }
      pos.x += (target.x - pos.x) * 0.45;
      pos.y += (target.y - pos.y) * 0.45;
      render();
      frame = requestAnimationFrame(loop);
    };

    /*
     * Handover between the system cursor and the button happens exactly at
     * the pointer: on enter the button grows out of a dot under the arrow,
     * on leave it snaps onto the pointer (no lagging offset) and shrinks back
     * into that dot while it keeps following — so it never drifts or "flies
     * away" while the native cursor reappears.
     */
    const onWindowMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (reduce || (!inside && performance.now() < exitUntil)) {
        pos.x = target.x;
        pos.y = target.y;
        render();
      }
    };

    const onEnter = (e: PointerEvent) => {
      inside = true;
      target.x = pos.x = e.clientX;
      target.y = pos.y = e.clientY;
      render();
      cursor.classList.add("is-active");
      if (!frame && !reduce) frame = requestAnimationFrame(loop);
    };

    const onLeave = (e: PointerEvent) => {
      inside = false;
      cancelAnimationFrame(frame);
      frame = 0;
      target.x = pos.x = e.clientX;
      target.y = pos.y = e.clientY;
      render();
      exitUntil = performance.now() + 450;
      cursor.classList.remove("is-active");
    };

    window.addEventListener("pointermove", onWindowMove, { passive: true });
    area.addEventListener("pointerenter", onEnter);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onWindowMove);
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, mounted]);

  return (
    <div ref={areaRef} className={`${enabled ? "cursor-none [&_*]:cursor-none" : ""} ${className}`}>
      {children}
      {mounted &&
        enabled &&
        createPortal(
          /* outer layer: position only · inner layer: scale + opacity
             (keeping them apart makes the shrink/grow happen around the
             pointer instead of pulling the button towards the screen corner) */
          <div ref={cursorRef} aria-hidden className="follow-cursor">
            <div className={`follow-cursor-inner ${blur ? "follow-cursor--blur" : ""}`}>
              <img src={src} alt="" className="size-full" />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
