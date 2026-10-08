import Link from "next/link";
import type { Project } from "@/types";
import { Header } from "@/components/layout/Header";
import { OverlapSection } from "@/components/ui/OverlapSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BEHANCE_PROFILE } from "@/content/links";
import { BACK_TO_WORKS } from "@/lib/routes";
import type { CSSProperties } from "react";

type Detail = { label: string; value?: string };

function DetailItem({ label, value }: Detail) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2 text-16 uppercase">
      <p className="text-grey-black">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}

/**
 * Figma "WorkPage" (62:567, frame 63:674).
 * Header → WorkPageTitle (Back + 200px title) → WorkPageContent
 * (1028px image column + 84px gap + 536px sticky info) → Contact.
 * WorkPageContent (top divider line) slides over the lower 50% of
 * WorkPageTitle on scroll.
 *
 * Entrance (same motion system as the homepage, off for reduced motion):
 * blocks come in from above one after another on load —
 *   0ms header · 150 back · 280 title · 450 first image · 550 info text ·
 *   670 details · 790 button —
 * further images come in from above when they scroll into view.
 */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;
export function WorkPage({ project }: { project: Project }) {
  const images = project.images ?? [];

  return (
    <div className="bg-black">
      <div className="enter-from-above site-container flex h-78 items-center py-20" style={delay(0)}>
        <Header variant="dark" />
      </div>

      <main>
        <OverlapSection
          className="bg-black"
          contentClassName="bg-black"
          title={
            <div className="site-container flex flex-col justify-center gap-12 pt-40 pb-80">
              {/* BackButton → homepage Works section (/#works).
                  Hover: text + icon → #66666B (icon drawn in currentColor). */}
              <Link
                href={BACK_TO_WORKS}
                className="enter-from-above relative z-10 flex w-fit items-center gap-4 py-10 text-14 whitespace-nowrap text-grey-black uppercase transition-colors duration-[250ms] ease-out hover:text-[#66666b] focus-visible:text-[#66666b]"
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
                className="enter-from-above w-full font-display text-200 leading-[0.9] font-normal text-white uppercase"
                style={delay(280)}
              >
                {project.title}
              </h1>
            </div>
          }
        >
          {/* Figma "Line" (79:675): 1px rgba(255,255,255,.2) along the top edge */}
          <SectionDivider />
          <div className="site-container flex items-start gap-84 pt-80 pb-100">
            {/* ImageGrid — three stacked 1028×830 images */}
            <div className="flex min-w-0 flex-1 flex-col gap-20">
              {images.map((src, i) => (
                // first image is on screen at load → plays with the page entrance;
                // the rest come in from above when they scroll into view
                <div
                  key={src}
                  {...(i > 0 ? { "data-reveal": "from-above" } : {})}
                  className={`relative w-full overflow-clip bg-placeholder ${i === 0 ? "enter-from-above" : ""}`}
                  style={{ ...(i === 0 ? delay(450) : {}), aspectRatio: "1028 / 830" }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* RightInfo — sticky */}
            <aside className="sticky top-40 flex w-536 shrink-0 flex-col gap-80">
              <div className="flex flex-col gap-32">
                <div className="enter-from-above flex flex-col gap-12" style={delay(550)}>
                  <p className="text-16 text-grey-black uppercase">Info</p>
                  {project.description && (
                    <p className="w-515 text-32 leading-[0.99] text-white uppercase">{project.description}</p>
                  )}
                </div>

                <div className="enter-from-above flex items-start gap-40" style={delay(670)}>
                  <div className="flex w-256 flex-col gap-21">
                    <DetailItem label="Areas" value={project.areas?.join(", ")} />
                    <DetailItem label="Tools Used" value={project.tools?.join(", ")} />
                  </div>
                  <div className="flex w-200 flex-col gap-17">
                    <DetailItem label="Year" value={project.year} />
                    <DetailItem label="Project Type" value={project.projectType} />
                  </div>
                </div>
              </div>

              <a
                href={project.behanceUrl ?? BEHANCE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                /* hover: fill → #000, text + icon → #FFF, 1px white stroke appears.
                   The 1px border is always there (white on white = invisible), so
                   the button's size never changes; padding is 1px less to keep the Figma 60px. */
                className="enter-from-above flex w-full items-center justify-center gap-4 border border-white bg-white py-[calc(var(--u)*20-1px)] text-center text-16 whitespace-nowrap text-black uppercase transition-colors duration-[250ms] ease-out hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
                style={delay(790)}
              >
                {/* Figma label applies once a case-study URL exists; until then the profile is linked */}
                {project.behanceUrl ? "the Full Case Study on Behance" : "View on Behance"}
                <span
                  aria-hidden
                  className="icon-mask size-20 shrink-0"
                  style={{ "--icon": "url(/icons/button-arrow.svg)" } as CSSProperties}
                />
              </a>
            </aside>
          </div>
        </OverlapSection>
      </main>

      <ContactSection />
    </div>
  );
}
