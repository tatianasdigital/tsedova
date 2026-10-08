import Link from "next/link";
import { OverlapSection } from "@/components/ui/OverlapSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { AvatarCircle } from "@/components/ui/AvatarCircle";
import { MobileCareerTable } from "@/components/mobile/MobileCareerTable";
import { MobileExternalLinks } from "@/components/mobile/MobileExternalLinks";
import { aboutAvatar, aboutInfoCards, aboutText, aboutYears, careerIntro, contactContent } from "@/content/home";
import { careerHidden, careerVisible } from "@/content/career";
import { skillTags } from "@/content/skills";
import { works } from "@/content/works";
import { EMAIL } from "@/content/links";
import { projectHref } from "@/lib/routes";
import { reveal, STAGGER } from "@/lib/motion";

/**
 * Mobile section heading — Figma: Bebas 86, padding 20/16 (95:1176, 96:1351, 96:1388).
 * Line boxes follow the Figma text boxes: "about me" 94px, "works" 103px
 * (Figma "normal" = 1.2), "career journey" two lines at 0.9.
 */
export function MobileSectionTitle({ children, variant }: { children: string; variant: "about" | "works" | "career" }) {
  const box = { about: "h-94 leading-[1.2]", works: "leading-[1.2]", career: "leading-[0.9]" }[variant];
  return (
    <div className="m-container flex items-center overflow-clip py-20">
      <h2 className={`min-w-0 flex-1 font-display text-86 font-normal text-white uppercase ${box}`}>{children}</h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About — Figma 98:1602 (content 390 × 1386, absolute composition)     */
/* ------------------------------------------------------------------ */
export function MobileAbout() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black overflow-clip"
      title={<MobileSectionTitle variant="about">about me</MobileSectionTitle>}
    >
      <SectionDivider />
      <div className="relative mx-auto h-1386 w-full max-w-[calc(var(--u)*390)]">
        {/* Rings (830 / 470) + avatar (176) share one centre: x = 50%, y = 436 */}
        <div className="pointer-events-none absolute top-436 left-1/2 size-0" data-reveal-group>
          <img
            src="/images/rings-mobile.svg"
            alt=""
            aria-hidden
            {...reveal("ring", STAGGER)}
            className="absolute size-830 max-w-none -translate-x-1/2 -translate-y-1/2"
          />
          <AvatarCircle
            src={aboutAvatar.src}
            alt={aboutAvatar.alt}
            size={176}
            crop={{ left: -8, top: -24, width: 194, height: 200 }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
            reveal={reveal("fade", 0)}
          />
        </div>

        {/* Info cards — Figma 96:1219 (16, 20), full width, gap 8 */}
        <div className="absolute inset-x-16 top-20 flex flex-col gap-8" {...reveal("from-above", STAGGER)}>
          {aboutInfoCards.map((card) => (
            <div key={card.title} className="flex flex-col gap-2 bg-white p-12 text-14 uppercase">
              <p className="text-colorgrey">{card.title}</p>
              <p className="text-black">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Skill tags — Figma 98:1603 (16, 197) 350 × 578 */}
        <ul className="absolute top-197 left-16 h-578 w-350" {...reveal("from-above", STAGGER * 2)}>
          {skillTags.map((tag) => (
            <li
              key={tag.title}
              className="absolute flex items-start gap-12"
              style={{ left: `calc(var(--u) * ${tag.mx})`, top: `calc(var(--u) * ${tag.my})` }}
            >
              <img src="/icons/skill-dot.svg" alt="" aria-hidden className="size-16 shrink-0" />
              <div className="flex flex-col gap-2 text-14 whitespace-nowrap uppercase">
                <p className="text-white">{tag.text}</p>
                <p className="text-grey-black">{tag.title}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* About text — Figma 96:1260 (16, 871) */}
        <div className="absolute inset-x-16 top-871 flex flex-col gap-12" {...reveal("from-above", 0)}>
          <p className="text-12 text-grey-black uppercase">{aboutText.title}</p>
          <p className="text-24 leading-[0.99] text-white uppercase">{aboutText.text}</p>
        </div>

        {/* 11+ — Figma 96:1265 (16, 1169) */}
        <div className="absolute top-1169 left-16 flex h-161 items-start gap-12" {...reveal("from-above", STAGGER)}>
          <img src="/images/eleven-mobile.svg" alt="11" className="h-161 w-138" />
          <div className="flex h-161 w-208 flex-col gap-18">
            <img src="/images/plus-mobile.svg" alt="+" className="h-83 w-82" />
            <p className="w-full text-14 text-white uppercase">{aboutYears.text}</p>
          </div>
        </div>
      </div>
    </OverlapSection>
  );
}

/* ------------------------------------------------------------------ */
/* Works — Figma 98:1604: one column of square cards, gap 20            */
/* ------------------------------------------------------------------ */
export function MobileWorks() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black"
      title={<MobileSectionTitle variant="works">Works</MobileSectionTitle>}
    >
      <SectionDivider />
      <div className="m-container flex flex-col gap-20 pt-20 pb-56">
        {works.map((project) => (
          <Link key={project.slug} href={projectHref(project.slug)} className="flex flex-col">
            <div className="relative aspect-square w-full overflow-clip bg-placeholder">
              <img
                src={project.cardImageMobile ?? project.cardImage}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-12 py-10 text-14 text-white uppercase">
              <h3 className="min-w-0 font-medium">{project.title}</h3>
              <p className="shrink-0">{project.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </OverlapSection>
  );
}

/* ------------------------------------------------------------------ */
/* Career — Figma 98:1607                                               */
/* ------------------------------------------------------------------ */
export function MobileCareer() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black"
      title={<MobileSectionTitle variant="career">Career Journey</MobileSectionTitle>}
    >
      <SectionDivider />
      <div className="m-container flex flex-col gap-40 pt-20 pb-64">
        <div className="flex flex-col gap-10">
          <p className="text-14 text-grey-black uppercase">{careerIntro.title}</p>
          <p className="text-24 leading-[0.99] text-white uppercase">{careerIntro.text}</p>
        </div>
        <MobileCareerTable visible={careerVisible} hidden={careerHidden} />
      </div>
    </OverlapSection>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — Figma 96:1569 (also the project-page footer)               */
/* ------------------------------------------------------------------ */
export function MobileContact() {
  const [user, domain] = EMAIL.split("@");
  return (
    <footer className="bg-black">
      <div
        className="m-container flex flex-col items-center gap-56 pt-20 pb-[calc(var(--u)*56+env(safe-area-inset-bottom))]"
        data-reveal-group
      >
        <div className="flex w-full flex-col gap-12" {...reveal("from-above", 0)}>
          <p className="text-14 text-grey-black uppercase">{contactContent.title}</p>
          <a href={`mailto:${EMAIL}`} className="block font-display text-64 leading-[0.9] text-white uppercase">
            <span className="block">{user}</span>
            <span className="block">@{domain}</span>
          </a>
        </div>

        <div className="flex w-full flex-col items-center gap-20" {...reveal("from-above", STAGGER)}>
          <AvatarCircle
            src={contactContent.avatar.src}
            alt={contactContent.avatar.alt}
            size={150}
            crop={{ left: -11.39, top: -22.34, width: 172.37, height: 178.32 }}
          />
          <div className="flex flex-col items-center gap-4 text-center text-14 uppercase">
            <p className="text-white">{contactContent.credits}</p>
            <p className="text-grey-black">{contactContent.tools}</p>
            <p className="text-grey-black">{contactContent.year}</p>
          </div>
        </div>

        <div {...reveal("from-above", STAGGER * 2)}>
          <MobileExternalLinks />
        </div>
      </div>
    </footer>
  );
}
