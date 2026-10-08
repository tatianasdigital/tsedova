"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Mode = "static" | "sticky";

type Props = {
  /** The call-to-action (rendered once) */
  button: ReactNode;
  /** Content the button travels along (the project images) */
  children: ReactNode;
  /** Gap between the button and the content, in Figma px (mobile unit) */
  gap: number;
  /** Distance to the bottom of the viewport while docked, in CSS px */
  offset?: number;
  /** Entrance delay (ms) — same entrance as the other blocks */
  enterDelay?: number;
  className?: string;
};

/**
 * Mobile sticky CTA (WorkPage PrimaryButton).
 *
 * Docking is done by the browser itself with `position: sticky` and
 * `top: <viewport height − offset − button height>`: while the button's own
 * place is below that line it simply sits in the page; when it reaches the
 * line it stays there (24px above the bottom of the screen) and the content
 * scrolls on; at the end of the block it is released and rests below the
 * last image (a spacer reserves that room), so it never covers the contact
 * section. Because the browser's scrolling thread does all of this, there is
 * no one-frame lag and no jump — the button glides into place.
 *
 * JS only measures the button height and handles one special case: if the
 * button is already above the dock line when the page opens (short info
 * text / tall screen), sticky would pull it down at once, so it stays a
 * normal block until it has scrolled out of view, then docks with a
 * slide-in from below. Scrolling back up reverses this.
 */
export function MobileStickyCta({ button, children, gap, offset = 24, enterDelay = 0, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("static");
  const [slideIn, setSlideIn] = useState(false);
  const [h, setH] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    let current: Mode = "static";
    let frame = 0;
    const slideInRef = { current: false }; // docked via the slide-in path

    const evaluate = () => {
      frame = 0;
      const bh = btn.offsetHeight;
      const line = window.innerHeight - offset - bh; // top of the button when docked
      // The button is the first thing in the wrapper, so the wrapper's top is
      // the button's own place in the page (sticky offsets don't move it).
      const natural = wrap.getBoundingClientRect().top;

      let next: Mode;
      let animate = false;
      if (natural >= line) {
        next = "sticky"; // own place at/below the line → sticky docks it seamlessly
      } else if (current === "sticky" && !slideInRef.current) {
        next = "sticky"; // docked by sticky on the way down → keep it
      } else if (natural + bh < 0) {
        next = "sticky"; // was visible above the line and scrolled away → slide in
        animate = current === "static";
      } else {
        next = "static";
      }

      if (next !== current) {
        if (next === "sticky") {
          slideInRef.current = animate;
          setSlideIn(animate);
        }
        current = next;
        setMode(next);
      }
      setH((v) => (v === bh ? v : bh));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(wrap);
    ro.observe(btn);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [offset]);

  const sticky = mode === "sticky";
  const vars = { "--cta-h": `${h}px`, "--cta-offset": `${offset}px` } as CSSProperties;

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={vars}>
      <div
        ref={btnRef}
        className={sticky ? `m-cta-sticky${slideIn ? " m-cta-slide-in" : ""}` : "relative"}
      >
        {/* The entrance animation lives on this inner layer so it never
            interferes with the docking of the outer one. */}
        <div className="enter-from-above" style={{ "--enter-delay": `${enterDelay}ms` } as CSSProperties}>
          {button}
        </div>
      </div>
      <div style={{ marginTop: `calc(var(--u) * ${gap})` }}>{children}</div>
      {/* Room for the button to rest below the last image at the end */}
      <div aria-hidden style={{ height: h ? h + offset : undefined }} />
    </div>
  );
}
