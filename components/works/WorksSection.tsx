import { OverlapSection } from "@/components/ui/OverlapSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { WorkCard } from "@/components/works/WorkCard";
import { works } from "@/content/works";

/**
 * Figma "WorksSection" (62:387) — 2×2 staggered grid.
 * Left column: square cards. Right column: tall cards. Each row is
 * top-aligned, so the left card ends early (staggered look).
 * Geometry from Figma metadata: 814 + 20 + 814, rows 1129 tall, 39 apart,
 * 100 top / 140 bottom padding.
 */
export function WorksSection() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black"
      title={<SectionTitle>Works</SectionTitle>}
    >
      <SectionDivider />
      <div className="site-container grid grid-cols-2 items-start gap-x-20 gap-y-39 pt-100 pb-140">
        {works.map((project, i) => (
          <WorkCard key={project.slug} project={project} shape={i % 2 === 0 ? "square" : "tall"} />
        ))}
      </div>
    </OverlapSection>
  );
}
