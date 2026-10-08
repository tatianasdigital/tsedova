import type { HeroLabelData } from "@/types";

const u = (n: number) => `calc(var(--u) * ${n})`;

/**
 * "Open for work" badge. The icon comes from data (`iconSrc`), so it can
 * be swapped for any SVG/PNG without touching this component. Static icon.
 */
export function HeroLabel({ text, iconSrc, iconSize, className = "" }: HeroLabelData & { className?: string }) {
  // Figma 81:705: padding 20/12, gap 44, 20px icon, 14px label (height 44)
  return (
    <div className={`flex items-center gap-44 bg-accent px-20 py-12 ${className}`}>
      <img
        src={iconSrc}
        alt=""
        aria-hidden
        className="shrink-0"
        style={{ width: u(iconSize), height: u(iconSize) }}
      />
      {/* width in em (Figma 116.57 / 14) so it follows the text if the legibility minimum kicks in */}
      <p className="w-[8.33em] text-14 whitespace-nowrap text-white uppercase">{text}</p>
    </div>
  );
}
