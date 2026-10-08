import type { CSSProperties } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { HeroLabel } from "@/components/hero/HeroLabel";
import { HeroGallery } from "@/components/hero/HeroGallery";
import { HeroTitleMarquee } from "@/components/hero/HeroTitleMarquee";
import { AdaptiveContrast } from "@/components/ui/AdaptiveContrast";
import { BLANK_SRC, MOBILE_MEDIA } from "@/components/layout/Responsive";
import { heroAwards, heroFeatures, heroGallery, heroLabel, heroPortrait, heroTitle } from "@/content/home";
import { homeAnchor, SECTION_IDS } from "@/lib/routes";

/**
 * Figma "NewFirstScreen" (81:678) — reference frame 1920 × 1080.
 *
 * Height = the visible viewport (100dvh); 1080 is only the proportion
 * reference. All geometry below is in Figma px of that frame, multiplied
 * by one of these fluid units (set on the root element):
 *
 *   --fu  width unit   = clamp(1024px, 100vw, 2560px) / 1920
 *   --vu  height unit  = 100dvh / 1080
 *   --s   min(fu, vu)  — things that must fit both directions:
 *                        gallery, vertical offsets of the middle row,
 *                        Scroll Down / gallery bottom offsets.
 *   --t   min(fu, 1.15·vu) — title + Open-for-work label: follows the width,
 *                        but cannot grow disproportionately on short windows.
 *   --p   min(vu, 1.15·fu) — portrait: follows the available height (so it
 *                        takes the same share of the screen as in Figma),
 *                        but cannot outgrow the width.
 *
 * On a 16:9 window all units are equal → exact Figma composition.
 *
 * Paint order is the Figma layer order: title → portrait → header →
 * middle row → scroll down → gallery → label. The header colour adapts to
 * what is really behind it (AdaptiveContrast); the header itself keeps the
 * site-wide size and layout.
 *
 * Entrance (once on load, CSS only, off for reduced motion — globals.css).
 * The portrait comes in alone first and is practically opaque (~97%) before
 * anything else starts, so no half-transparent text ever sits on a
 * half-transparent photo:
 *   0ms     portrait      from below
 *   750ms   header        from above
 *   850ms   title         from above → marquee starts at 1.8s
 *   950ms   middle row    from below
 *   1000ms  scroll down   from below
 *   1050ms  gallery       from below
 *   1150ms  Open-for-work label from above
 */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

const ROOT_UNITS = {
  "--fu": "calc(clamp(1024px, 100vw, 2560px) / 1920)",
  "--vu": "calc(100dvh / 1080)",
  "--s": "min(var(--fu), var(--vu))",
  "--t": "min(var(--fu), calc(var(--vu) * 1.15))",
  "--p": "min(var(--vu), calc(var(--fu) * 1.15))",
} as CSSProperties;

export function FirstScreen() {
  return (
    <div
      data-contrast-scope
      data-contrast-base="#e5e5ee"
      className="relative overflow-hidden bg-bg-light"
      style={{ ...ROOT_UNITS, height: "100dvh" }}
    >
      {/* Composition box: full width up to 2560px, centred above that.
          Inside it Tailwind units (`--u`) are Figma-1920 px. */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2"
        style={{ width: "min(100%, calc(var(--fu) * 1920))", "--u": "var(--fu)" } as CSSProperties}
      >
        {/* Hero title — marquee, clipped to the composition width */}
        <HeroTitleMarquee
          text={heroTitle}
          delay={1.8}
          className="enter-from-above absolute inset-x-0 flex items-center font-display leading-normal text-black uppercase"
          style={{
            ...delay(850),
            top: "calc(var(--t) * 82)",
            height: "calc(var(--t) * 304)",
            fontSize: "calc(var(--t) * 376)",
          }}
        />

        {/* Portrait — Figma 81:681: 1603×1659 at (159, −400) in the 1920 frame,
            i.e. centre − 801; mirrored. File = the Figma crop of the 1536×2048
            source (rows 0–1590), so it is shown at ~1:1 at 1920px.
            Its bottom never rises above the Figma bleed (1259 − 1080 = 179).
            <picture>: phones (< 768px, mobile layout) get a 1px placeholder
            instead of downloading this desktop-only image. */}
        <picture>
          <source media={MOBILE_MEDIA} srcSet={BLANK_SRC} />
          <img
            src={heroPortrait.src}
            alt={heroPortrait.alt}
            data-contrast-layer
            data-contrast-flip
            className="enter-from-below pointer-events-none absolute -scale-x-100 object-fill select-none"
            style={{
              ...delay(0),
              width: "calc(var(--p) * 1603)",
              height: "calc(var(--p) * 1659)",
              left: "calc(50% - var(--p) * 801)",
              top: "max(calc(var(--p) * -400), calc(100% - var(--p) * 1480))",
            }}
          />
        </picture>
      </div>

      {/* Header — unchanged site header; colour adapts to the background */}
      <div className="enter-from-above site-container relative z-20 pt-20" style={delay(750)}>
        <Header variant="light" adaptive />
      </div>
      <AdaptiveContrast />

      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 -translate-x-1/2"
        style={{ width: "min(100%, calc(var(--fu) * 1920))", "--u": "var(--fu)" } as CSSProperties}
      >
        {/* Middle row — Figma centre at 50% + 53; kept between title and gallery.
            Column widths are in em (Figma 396/257/180 ÷ 20px) so they grow with
            the text when the 15px legibility minimum applies. */}
        <div
          className="enter-from-below absolute inset-x-40 flex -translate-y-1/2 items-start justify-between"
          style={{
            ...delay(950),
            top: "clamp(calc(var(--t) * 380 + var(--fu) * 56), calc(50% + var(--s) * 53), calc(100% - var(--s) * 396 - var(--fu) * 66))",
          }}
        >
          <div className="flex w-[19.8em] flex-col gap-12 text-20">
            <p className="text-20 text-colorgrey uppercase">{heroFeatures.title}</p>
            <div className="flex items-start gap-20">
              <ul className="flex w-[12.85em] flex-col gap-2 text-20 text-black uppercase">
                {heroFeatures.columns[0].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ul className="flex w-[9em] flex-col text-20 text-black uppercase">
                {heroFeatures.columns[1].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex w-[12.85em] flex-col items-end gap-12 text-right text-20 uppercase">
            <p className="text-colorgrey">{heroAwards.title}</p>
            {heroAwards.items.map((a) => (
              <p key={a} className="text-black">
                {a}
              </p>
            ))}
          </div>
        </div>

        {/* Scroll Down — bottom-left, anchored to the bottom edge.
            Hover: text + icon → #7D84A1, icon slides down and back in from above
            (the whole button is the hover area; the text never moves). */}
        <Link
          href={homeAnchor(SECTION_IDS.about)}
          className="scroll-down enter-from-below pointer-events-auto absolute left-40 flex items-end gap-4 py-10 text-16 whitespace-nowrap text-colorgrey uppercase"
          style={{ ...delay(1000), bottom: "calc(var(--s) * 28)" }}
        >
          scroll down
          <span aria-hidden className="block size-20 shrink-0 overflow-hidden">
            <span
              className="scroll-down-icon icon-mask size-20"
              style={{ "--icon": "url(/icons/scroll-down.svg)" } as CSSProperties}
            />
          </span>
        </Link>

        {/* Gallery — bottom-right, 442×356 */}
        <HeroGallery
          items={heroGallery}
          // each image holds 2.5s, then a 0.6s cross-fade (was 4.5s + 0.7s)
          interval={2500}
          fade={600}
          unit="--s"
          width={442}
          height={356}
          className="enter-from-below absolute right-40"
          style={{ ...delay(1050), bottom: "calc(var(--s) * 40)" }}
        />

        {/* Open for work — Figma 81:705 at (436, 185) + 40px right → (476, 185), i.e.
            centre − 484; same unit as the title so it stays attached to it */}
        <div
          className="enter-from-above pointer-events-auto absolute"
          style={{ ...delay(1150), left: "calc(50% - var(--t) * 484)", top: "calc(var(--t) * 185)", "--u": "var(--t)" } as CSSProperties}
        >
          <HeroLabel {...heroLabel} />
        </div>
      </div>
    </div>
  );
}
