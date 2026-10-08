"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Share of the title height the content covers. Spec: ~50%. */
  overlap?: number;
};

/**
 * Title / content scroll overlap.
 *
 * The title sits in a "track" that is (1 + overlap) × its own height and
 * is `position: sticky; top: 0` inside it. The content is pulled up by
 * `overlap × title height`, so at rest it starts exactly under the title.
 *
 * When the title reaches the top of the viewport it holds still for
 * `overlap × height` of scrolling while the content (higher z-index,
 * opaque background) slides over its lower part. Once the track runs out
 * the title is released and both move on together with the page — upper
 * half of the title still visible, lower half covered.
 *
 * Pure CSS scroll behaviour; JS only measures the title height so wrapped
 * (multi-line) titles keep the same 50% proportion at every width.
 */
export function OverlapSection({
  id,
  title,
  children,
  className = "",
  contentClassName = "",
  overlap = 0.5,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const titleEl = titleRef.current;
    if (!root || !titleEl) return;
    const update = () => root.style.setProperty("--th", `${titleEl.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(titleEl);
    return () => ro.disconnect();
  }, []);

  const style = { "--ov": overlap } as CSSProperties;

  return (
    <section id={id} ref={rootRef} style={style} className={`relative ${className}`}>
      <div style={{ height: "calc(var(--th, var(--section-title-h)) * (1 + var(--ov)))" }}>
        <div ref={titleRef} className="sticky top-0 z-0">
          {title}
        </div>
      </div>
      <div
        className={`relative z-10 ${contentClassName}`}
        style={{ marginTop: "calc(var(--th, var(--section-title-h)) * var(--ov) * -1)" }}
      >
        {children}
      </div>
    </section>
  );
}
