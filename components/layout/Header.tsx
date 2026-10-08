import type { CSSProperties } from "react";
import Link from "next/link";
import { navItems } from "@/content/links";
import { homeAnchor } from "@/lib/routes";
import { ExternalLinks } from "@/components/ui/ExternalLinks";

type Props = {
  /** "light" = black text on #e5e5ee (homepage), "dark" = white text on black (project pages) */
  variant: "light" | "dark";
  /**
   * Let logo, navigation and external links switch between black and white
   * depending on what is painted behind them. Requires an <AdaptiveContrast />
   * inside the surrounding `data-contrast-scope`. Layout is unchanged.
   */
  adaptive?: boolean;
};

const ADAPTIVE = "transition-[color] duration-300 ease-out";

/**
 * Adaptive text is evaluated per word, so a label that is half over the
 * portrait and half over the grey background still gets the right colour
 * for each part. Layout is identical (spaces are kept as text).
 */
function AdaptiveWords({ text, underline = false }: { text: string; underline?: boolean }) {
  const words = text.split(" ");
  const per = 360 / words.length; // the whole stroke takes ~360ms, left → right
  return (
    <>
      {words.map((w, i) => (
        // word + its trailing space form one colour/underline segment, so the
        // underline is continuous across words and always in the word's colour
        <span
          key={i}
          data-adaptive-contrast
          className={underline ? "u-line" : ADAPTIVE}
          style={
            underline
              ? ({
                  "--u-delay": `${Math.round(i * per * 0.6)}ms`,
                  "--u-delay-out": `${Math.round((words.length - 1 - i) * per * 0.4)}ms`,
                } as CSSProperties)
              : undefined
          }
        >
          {w}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** Site header. Not sticky by design. */
export function Header({ variant, adaptive = false }: Props) {
  const text = variant === "light" ? "text-black" : "text-white";
  const label = (t: string, underline = false) => (adaptive ? <AdaptiveWords text={t} underline={underline} /> : t);

  return (
    <header className={`relative z-20 flex w-full items-center justify-between ${text}`}>
      <Link href="/" className="h-38 font-display text-32 leading-normal whitespace-nowrap uppercase">
        {label("Tatiana — Sedova")}
      </Link>

      <nav aria-label="Main">
        <ul className="flex items-center gap-34 text-14 whitespace-nowrap uppercase">
          {navItems.map((item) => (
            <li key={item.anchor}>
              {/* hover: underline drawn left → right in the text colour */}
              <Link href={homeAnchor(item.anchor)} className={adaptive ? "u-trigger" : "u-trigger u-line"}>
                {label(item.label, true)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ExternalLinks tone={variant === "light" ? "dark" : "light"} adaptive={adaptive} underline />
    </header>
  );
}
