import type { SkillTag } from "@/types";

/** Figma cloud is 1648 wide; positions are kept relative to its centre (824). */
export function SkillTagItem({ tag }: { tag: SkillTag }) {
  return (
    <li
      className="absolute flex items-start gap-12"
      style={{ left: `calc(50% + var(--u) * ${tag.x - 824})`, top: `calc(var(--u) * ${tag.y})` }}
    >
      <img src="/icons/skill-dot.svg" alt="" aria-hidden className="size-16 shrink-0" />
      <div className="flex flex-col gap-4 text-16 uppercase">
        <p className="whitespace-nowrap text-white">{tag.text}</p>
        <p className="whitespace-nowrap text-grey-black">{tag.title}</p>
      </div>
    </li>
  );
}
