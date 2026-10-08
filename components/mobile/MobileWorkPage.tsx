import type { CSSProperties } from "react";
import Link from "next/link";
import type { Project } from "@/types";
import { OverlapSection } from "@/components/ui/OverlapSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileContact } from "@/components/mobile/MobileSections";
import { BEHANCE_PROFILE } from "@/content/links";
import { BACK_TO_WORKS } from "@/lib/routes";
import { BLANK_SRC, DESKTOP_MEDIA } from "@/components/layout/Responsive";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2 text-14 uppercase">
      <p className="text-grey-black">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}

/**
 * Mobile project page — Figma 98:1851. Same project data as desktop.
 * Order: header → title (Back + Bebas 86) → info, details, Behance button →
 * images (358 × 289) → contact. Title/content overlap and the "from above"
 * entrance are the same behaviours as on desktop.
 */
export function MobileWorkPage({ project }: { project: Project }) {
  const images = project.imagesMobile ?? project.images ?? [];

  return (
    <div className="bg-black">
      {/* Header — Figma 98:1696: padding 20/16, white */}
      <div className="enter-from-above m-container relative z-20 py-20" style={delay(0)}>
        <MobileHeader tone="dark" />
      </div>

      <main>
        <OverlapSection
          className="bg-black"
          contentClassName="bg-black"
          title={
            <div className="m-container flex flex-col justify-center gap-20 py-20">
              {/* Back — Figma 98:1713, ~44px tap target via padding */}
              <Link
                href={BACK_TO_WORKS}
                className="enter-from-above relative z-10 -my-12 flex w-fit items-center gap-4 py-12 text-14 whitespace-nowrap text-grey-black uppercase"
                style={delay(150)}
              >
                <span
                  aria-hidden
                  className="icon-mask size-16 shrink-0 rotate-90"
                  style={{ "--icon": "url(/icons/back.svg)" } as CSSProperties}
                />
                Back
              </Link>
              <h1
                className="enter-from-above font-display text-86 leading-[0.9] font-normal text-white uppercase"
                style={delay(280)}
              >
                {project.title}
              </h1>
            </div>
          }
        >
          <SectionDivider />
          <div className="m-container flex flex-col pt-20 pb-56">
            {/* Info + details — Figma 98:1772 */}
            <div className="flex flex-col gap-32">
              <div className="enter-from-above flex flex-col gap-8" style={delay(450)}>
                <p className="text-14 text-grey-black uppercase">Info</p>
                {project.description && (
                  <p className="text-24 leading-[0.99] whitespace-pre-line text-white uppercase">{project.description}</p>
                )}
              </div>

              <div className="enter-from-above flex items-start gap-20" style={delay(570)}>
                <div className="flex min-w-0 flex-1 flex-col gap-20">
                  <Detail label="Areas" value={project.areas?.join(", ")} />
                  <Detail label="Tools Used" value={project.tools?.join(", ")} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-20">
                  <Detail label="Year" value={project.year} />
                  <Detail label="Project Type" value={project.projectType} />
                </div>
              </div>
            </div>

            {/* ImageGrid (118:2571: 358 × 289 images, gap 20), 56px below the
                InfoBlock (Figma: RIghtInfo → ImageGrid). */}
            <div className="mt-56 flex flex-col gap-20">
              {images.map((src, i) => (
                <div
                  key={src}
                  // only the first image comes in from above; the rest have no animation
                  {...(i === 0 ? { "data-reveal": "from-above" } : {})}
                  className="relative aspect-[358/289] w-full overflow-clip bg-placeholder"
                >
                  {/* <picture>: desktop gets its own set instead of these files */}
                  <picture>
                    <source media={DESKTOP_MEDIA} srcSet={BLANK_SRC} />
                    <img
                      src={src}
                      alt={`${project.title} — image ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* Primary button (Figma 98:1802: white, py 20, 16px label + 20px icon).
                Its place is under the last image (24px gap); `position: sticky`
                with bottom 24px keeps it docked at the bottom of the screen from
                the moment the page opens until the end of the ImageGrid, where
                it comes to rest under the images. Browser-native → no jitter. */}
            <div className="m-cta-dock mt-24">
              <div className="enter-from-above" style={delay(690)}>
                <a
                  href={project.behanceUrl ?? BEHANCE_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-4 bg-white py-20 text-center text-16 whitespace-nowrap text-black uppercase"
                >
                  View on Behance
                  <span
                    aria-hidden
                    className="icon-mask size-20 shrink-0"
                    style={{ "--icon": "url(/icons/button-arrow.svg)" } as CSSProperties}
                  />
                </a>
              </div>
            </div>
          </div>
        </OverlapSection>
      </main>

      <MobileContact />
    </div>
  );
}
