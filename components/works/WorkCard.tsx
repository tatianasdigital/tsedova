import Link from "next/link";
import type { Project, WorkCardShape } from "@/types";
import { projectHref } from "@/lib/routes";
import { FollowCursor } from "@/components/motion/FollowCursor";
import { BLANK_SRC, MOBILE_MEDIA } from "@/components/layout/Responsive";

type Props = {
  project: Project;
  /** square = 814×814 (left column), tall = 814×1082 (right column) */
  shape: WorkCardShape;
};

/**
 * Figma "WorkCard". Image frame clips the image; details row below.
 * Over the card the system cursor is replaced by the Figma cursor-button
 * (89:1078), which follows the pointer.
 */
export function WorkCard({ project, shape }: Props) {
  return (
    <FollowCursor src="/icons/cursor-view.svg">
      <Link href={projectHref(project.slug)} className="group flex flex-col gap-8">
        <div
          className="relative w-full overflow-clip bg-placeholder"
          style={{ aspectRatio: shape === "square" ? "1 / 1" : "814 / 1082" }}
        >
          {/* <picture>: phones (mobile cards use cardImageMobile) don't download this file */}
          <picture>
            <source media={MOBILE_MEDIA} srcSet={BLANK_SRC} />
            <img
              src={project.cardImage}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
        </div>
        <div className="flex h-39 items-center justify-between py-10 text-16 text-white uppercase">
          <h3 className="font-medium">{project.title}</h3>
          <p>{project.year}</p>
        </div>
      </Link>
    </FollowCursor>
  );
}
