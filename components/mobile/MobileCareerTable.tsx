"use client";

import { useId, useState, type CSSProperties } from "react";
import type { CareerItem } from "@/types";
import { reveal, STAGGER } from "@/lib/motion";

type Motion = { "data-reveal"?: string; className?: string; style?: CSSProperties };

/** "2021-2022" → "2021 - 2022" (mobile Figma spacing) */
const formatYears = (y: string) => y.replace(/\s*-\s*/g, " - ");

/**
 * One timeline row — Figma 96:1446: 123px circle (year, PP Neue Montreal 14),
 * marker on its lower edge, 32px gap, then role (white) + company and
 * industry (grey); industry is omitted when it repeats the company
 * (as in the Figma "Self-employed" row). Followed by a 20px connector.
 */
function Row({ item, motion }: { item: CareerItem; motion: Motion }) {
  return (
    <div {...motion} className={`flex flex-col ${motion.className ?? ""}`}>
      <div className="flex items-center gap-32">
        <div className="relative flex size-123 shrink-0 items-center justify-center rounded-full border border-divider bg-black p-12">
          <p className="text-14 whitespace-nowrap text-white uppercase">{formatYears(item.years)}</p>
          <img
            src="/icons/timeline-marker.svg"
            alt=""
            aria-hidden
            className="absolute top-[calc(var(--u)*120)] left-[calc(var(--u)*59)] size-5"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col text-14 uppercase">
          {item.role && <p className="text-white">{item.role}</p>}
          <p className="text-grey-black">{item.company}</p>
          {item.industry.toLowerCase() !== item.company.toLowerCase() && (
            <p className="text-grey-black">{item.industry}</p>
          )}
        </div>
      </div>
      <div aria-hidden className="relative h-20">
        <span className="absolute top-0 h-full w-px bg-divider" style={{ left: "calc(var(--u) * 61.5 - 0.5px)" }} />
      </div>
    </div>
  );
}

/** Timeline with "show all" — same data and behaviour as desktop, mobile layout. */
export function MobileCareerTable({ visible, hidden }: { visible: CareerItem[]; hidden: CareerItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const extraId = useId();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col" data-reveal-group>
        {visible.map((item, i) => (
          <Row key={item.years + item.company} item={item} motion={reveal("from-above", i * STAGGER)} />
        ))}
        <div id={extraId} hidden={!expanded} className="flex flex-col">
          {hidden.map((item, i) => (
            <Row
              key={item.years + item.company}
              item={item}
              motion={{
                className: "enter-from-above",
                style: { "--enter-delay": `${i * STAGGER}ms` } as CSSProperties,
              }}
            />
          ))}
        </div>
      </div>

      {hidden.length > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={extraId}
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-center gap-4 border border-divider bg-black px-16 py-12 text-14 whitespace-nowrap text-white uppercase"
        >
          {expanded ? "show less" : "show all"}
          <span
            aria-hidden
            className={`icon-mask size-20 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            style={{ "--icon": "url(/icons/arrow-down.svg)" } as CSSProperties}
          />
        </button>
      )}
    </div>
  );
}
