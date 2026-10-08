import { AvatarCircle } from "@/components/ui/AvatarCircle";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { contactContent } from "@/content/home";
import { EMAIL } from "@/content/links";
import { reveal, STAGGER } from "@/lib/motion";
import { FollowCursor } from "@/components/motion/FollowCursor";

/** Figma "ContactSection" (62:506) — also used as the project-page footer. */
export function ContactSection() {
  return (
    <footer className="relative bg-black">
      <SectionDivider />
      <div className="site-container flex flex-col gap-127 pt-80 pb-50" data-reveal-group>
        <div className="flex flex-col" {...reveal("from-above", 0)}>
          <p className="text-14 text-grey-black uppercase">{contactContent.title}</p>
          {/* Same cursor-button as the work cards (Figma 89:1078, blurred backdrop)
              follows the pointer over the email.
              -mt-26: halves the visual gap title → email (52 → 26 Figma px;
              the gap is the Bebas line's internal top space). */}
          <FollowCursor src="/icons/cursor-view.svg" className="-mt-26 w-fit">
            <a
              href={`mailto:${EMAIL}`}
              className="block font-display text-160 leading-normal whitespace-nowrap text-white uppercase"
            >
              {EMAIL}
            </a>
          </FollowCursor>
        </div>

        <div className="flex items-end justify-between" {...reveal("from-below", STAGGER)}>
          <div className="flex items-end gap-20">
            <AvatarCircle
              src={contactContent.avatar.src}
              alt={contactContent.avatar.alt}
              size={150}
              crop={{ left: -11.39, top: -22.34, width: 172.37, height: 178.32 }}
            />
            <div className="flex flex-col justify-center gap-4 text-14 uppercase">
              <p className="w-187 text-white">{contactContent.credits}</p>
              <p className="whitespace-nowrap text-grey-black">{contactContent.tools}</p>
              <p className="whitespace-nowrap text-grey-black">{contactContent.year}</p>
            </div>
          </div>
          <ExternalLinks tone="light" underline />
        </div>
      </div>
    </footer>
  );
}
