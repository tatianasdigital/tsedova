import { OverlapSection } from "@/components/ui/OverlapSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { AvatarCircle } from "@/components/ui/AvatarCircle";
import { SkillTagItem } from "@/components/about/SkillTagItem";
import { aboutAvatar, aboutInfoCards, aboutText, aboutYears } from "@/content/home";
import { skillTags } from "@/content/skills";
import { reveal, STAGGER } from "@/lib/motion";

/**
 * Figma "AboutSection" (62:304).
 * Rings + avatar share one centre: 566 Figma px below the content top,
 * horizontally centred. The bottom block (11+ / ABOUT) is drawn over the
 * rings, and the content block itself slides over the section title.
 *
 * Entrances (each once, when it scrolls into view): avatar fades in, rings
 * fade + draw clockwise, info cards and skill tags come from above, the
 * bottom block from below.
 */
export function AboutSection() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black overflow-clip"
      title={<SectionTitle>about me</SectionTitle>}
    >
      <SectionDivider />

      {/* Concentric rings + avatar (Figma "BackgroundImage"), all centred on
          one point 566 Figma px below the content top. The 0×0 wrapper at that
          centre is the reveal group, so the entrance starts when the middle of
          the composition — not its top edge — scrolls into view. */}
      <div className="pointer-events-none absolute top-566 left-1/2 size-0" data-reveal-group>
        {/* fade + clockwise reveal (conic mask): avatar, then outer, then inner ring */}
        <img
          src="/images/ring-outer.svg"
          alt=""
          aria-hidden
          {...reveal("ring", STAGGER)}
          className="absolute size-1506 max-w-none -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="/images/ring-inner.svg"
          alt=""
          aria-hidden
          {...reveal("ring", STAGGER * 2)}
          className="absolute size-914 max-w-none -translate-x-1/2 -translate-y-1/2"
        />
        <AvatarCircle
          src={aboutAvatar.src}
          alt={aboutAvatar.alt}
          size={376}
          crop={{ left: -28.54, top: -56, width: 432.08, height: 447 }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          reveal={reveal("fade", 0)}
        />
      </div>

      <div className="site-container relative pt-80 pb-160">
        <div className="flex flex-col gap-2">
          {/* Info cards */}
          <div className="flex items-center gap-12" {...reveal("from-above", STAGGER)}>
            {aboutInfoCards.map((card) => (
              <div key={card.title} className="flex w-257 flex-col gap-4 bg-white p-16 text-16 uppercase">
                <p className="text-colorgrey">{card.title}</p>
                <p className="whitespace-nowrap text-black">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Skill tags, positioned from the ring centre so they stay on the rings */}
          <ul className="relative h-736 w-full" {...reveal("from-above", STAGGER * 2)}>
            {skillTags.map((tag) => (
              <SkillTagItem key={tag.title} tag={tag} />
            ))}
          </ul>

          {/* Bottom: 11+ and About text */}
          <div className="flex w-full items-end justify-between" {...reveal("from-below", 0)}>
            <div className="flex items-center gap-32">
              <img src={aboutYears.numberGraphic} alt="11" className="h-243 w-208" />
              <div className="flex h-243 w-303 flex-col gap-18">
                <img src={aboutYears.plusGraphic} alt="+" className="h-125 w-124" />
                <div className="flex h-100 items-center py-10">
                  <p className="w-248 text-16 text-white uppercase">{aboutYears.text}</p>
                </div>
              </div>
            </div>

            <div className="flex w-536 flex-col gap-20">
              <p className="text-16 text-grey-black uppercase">{aboutText.title}</p>
              <p className="text-36 leading-[0.99] text-white uppercase">{aboutText.text}</p>
            </div>
          </div>
        </div>
      </div>
    </OverlapSection>
  );
}
