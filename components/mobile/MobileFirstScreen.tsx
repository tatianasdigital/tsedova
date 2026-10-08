import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroTitleMarquee } from "@/components/hero/HeroTitleMarquee";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { BLANK_SRC, DESKTOP_MEDIA } from "@/components/layout/Responsive";
import { heroAwards, heroFeatures, heroLabel, heroPortraitMobile, heroTitle } from "@/content/home";
import { homeAnchor, SECTION_IDS } from "@/lib/routes";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Mobile first screen — Figma "NewFirstScreen" 90:1089 (390 × 844).
 *
 * Height = the visible phone viewport (100svh, so the browser UI never hides
 * the bottom row); 844 is only the reference. Top group (header, title,
 * label, portrait) is anchored to the top, bottom group (UX + UI, features,
 * scroll icon) to the bottom, at their Figma distances.
 *
 * Entrance (same timeline as desktop): portrait first, then header, title
 * (marquee starts after it), bottom group and the Open-for-work badge —
 * on mobile every element enters from above.
 */
export function MobileFirstScreen() {
  return (
    <div
      className="relative overflow-hidden bg-bg-light"
      style={{ height: "100svh", minHeight: "calc(var(--u) * 560)" }}
    >
      <div className="relative mx-auto h-full w-full max-w-[calc(var(--u)*390)]">
        {/* Hero title — Figma 98:1624: Bebas 200 / 0.81, text starts at (16, 64).
            First in the paint order: the portrait (next) is drawn above the marquee. */}
        <HeroTitleMarquee
          text={heroTitle}
          duration={32}
          delay={1.8}
          className="hero-marquee--start enter-from-above absolute inset-x-0 top-64 flex h-162 items-center pl-16 font-display text-200 leading-[0.81] text-black uppercase"
          style={delay(850)}
        />

        {/* Portrait — Figma 95:1141: 644×879, centred (+1.5), top 51, mirrored, cover */}
        <picture>
          <source media={DESKTOP_MEDIA} srcSet={BLANK_SRC} />
          <img
            src={heroPortraitMobile.src}
            alt={heroPortraitMobile.alt}
            className="enter-from-above pointer-events-none absolute top-51 -scale-x-100 object-cover select-none"
            style={{
              ...delay(0),
              width: "calc(var(--u) * 644)",
              height: "calc(var(--u) * 879)",
              left: "calc(50% - var(--u) * 320.5)",
            }}
          />
        </picture>

        {/* Soft fade at the bottom so the text stays readable — Figma 95:1166 */}
        <div
          aria-hidden
          className="enter-from-above pointer-events-none absolute bottom-0 h-379 w-600"
          style={{
            ...delay(0),
            left: "calc(50% - var(--u) * 357.5)",
            backgroundImage: "linear-gradient(to bottom, rgba(229,229,238,0) 9.865%, rgba(229,229,238,0.79) 131.84%)",
          }}
        />

        {/* Header — Figma 92:1135 */}
        <div className="enter-from-above absolute inset-x-16 top-16 z-20" style={delay(750)}>
          <MobileHeader tone="light" />
        </div>

        {/* Open for work — Figma 95:1142 (16, 114) */}
        <div
          className="enter-from-above absolute top-114 left-16 flex items-center gap-24 bg-accent py-8 pr-10 pl-8"
          style={delay(1150)}
        >
          <span
            aria-hidden
            className="icon-mask size-16 shrink-0 text-white"
            style={{ "--icon": `url(${heroLabel.mobileIconSrc})` } as CSSProperties}
          />
          <p className="text-12 whitespace-nowrap text-white uppercase">{heroLabel.text}</p>
        </div>

        {/* UX + UI — Figma 95:1158 (top 660 → 167 from the bottom) */}
        <p
          className="enter-from-above absolute left-16 text-14 whitespace-nowrap text-black uppercase"
          style={{ ...delay(950), bottom: "calc(var(--u) * 167)" }}
        >
          {heroFeatures.columns[1][0]}
        </p>

        {/* What I do / Awards — Figma 95:1150 (top 707 → 61 from the bottom) */}
        <div
          className="enter-from-above absolute inset-x-16 flex items-start gap-20"
          style={{ ...delay(1000), bottom: "calc(var(--u) * 61)" }}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="text-14 text-[#787b9d] uppercase">{heroFeatures.title}</p>
            <ul className="flex flex-col gap-2 text-14 text-black uppercase">
              {heroFeatures.columns[0].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-end gap-4 text-right">
            <p className="w-full text-14 text-[#787b9d] uppercase">{heroAwards.title}</p>
            {heroAwards.items.map((a) => (
              <p key={a} className="w-131 text-14 text-black uppercase">
                {a}
              </p>
            ))}
          </div>
        </div>

        {/* Scroll down icon — Figma 96:1184 (16, 808 → 16 from the bottom) */}
        <Link
          href={homeAnchor(SECTION_IDS.about)}
          aria-label="Scroll down"
          className="enter-from-above absolute -m-12 block p-12"
          style={{
            ...delay(1050),
            left: "calc(var(--u) * 16)",
            bottom: "calc(var(--u) * 16 + env(safe-area-inset-bottom))",
          }}
        >
          <img src="/icons/scroll-down-mobile.svg" alt="" aria-hidden className="size-20" />
        </Link>
      </div>
    </div>
  );
}
