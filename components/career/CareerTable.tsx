"use client";

import { useId, useState, type CSSProperties } from "react";
import type { CareerItem } from "@/types";
import { reveal, STAGGER } from "@/lib/motion";

type Props = {
  visible: CareerItem[];
  hidden: CareerItem[];
};

type Motion = { "data-reveal"?: string; className?: string; style?: CSSProperties };

/** One timeline row + its connector line, animated as one unit. */
function CareerRow({ item, motion }: { item: CareerItem; motion: Motion }) {
  return (
    <div {...motion} className={`flex flex-col ${motion.className ?? ""}`}>
      <div className="flex items-center gap-74">
        {/* Year circle with marker on its lower edge */}
        <div className="relative flex size-216 shrink-0 items-center justify-center rounded-full border border-divider bg-black">
          <p className="font-display text-40 leading-normal whitespace-nowrap text-white uppercase">{item.years}</p>
          <img
            src="/icons/timeline-marker.svg"
            alt=""
            aria-hidden
            className="absolute top-212 left-104 size-5"
          />
        </div>
        <dl className="grid flex-1 grid-cols-[calc(var(--u)*170)_calc(var(--u)*170)_1fr] items-start gap-56 text-16 text-white uppercase">
          <div>
            <dt className="sr-only">Role</dt>
            <dd>{item.role ?? ""}</dd>
          </div>
          <div>
            <dt className="sr-only">Company</dt>
            <dd>{item.company}</dd>
          </div>
          <div>
            <dt className="sr-only">Industry</dt>
            <dd className="w-170">{item.industry}</dd>
          </div>
        </dl>
      </div>
      {/* Connector line between circles */}
      <div aria-hidden className="relative h-40 w-full overflow-clip">
        <img src="/icons/timeline-line.svg" alt="" className="absolute -top-4 left-68 h-56 w-40" />
      </div>
    </div>
  );
}

/** Timeline table with "show all" expansion. */
export function CareerTable({ visible, hidden }: Props) {
  const [expanded, setExpanded] = useState(false);
  const extraId = useId();

  return (
    <div className="flex w-955 shrink-0 flex-col">
      {/* Rows enter from above one after another when the table scrolls into view */}
      <div className="flex flex-col" data-reveal-group>
        {visible.map((item, i) => (
          <CareerRow key={item.years + item.company} item={item} motion={reveal("from-above", i * STAGGER)} />
        ))}
        {/* Extra rows: same entrance, played when "show all" reveals them */}
        <div id={extraId} hidden={!expanded} className="flex flex-col">
          {hidden.map((item, i) => (
            <CareerRow
              key={item.years + item.company}
              item={item}
              motion={{ className: "enter-from-above", style: { "--enter-delay": `${i * STAGGER}ms` } as CSSProperties }}
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
          /* hover: only the stroke turns white (fill and size unchanged) */
          className="flex w-216 cursor-pointer items-center justify-center gap-4 rounded-8 border border-divider bg-black px-16 py-12 text-16 whitespace-nowrap text-white uppercase transition-[border-color] duration-[250ms] ease-out hover:border-white focus-visible:border-white"
        >
          {expanded ? "show less" : "show all"}
          <span
            aria-hidden
            className={`icon-mask size-24 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            style={{ "--icon": "url(/icons/arrow-down.svg)" } as CSSProperties}
          />
        </button>
      )}
    </div>
  );
}
