import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkPage } from "@/components/works/WorkPage";
import { MobileWorkPage } from "@/components/mobile/MobileWorkPage";
import { DesktopOnly, MobileOnly } from "@/components/layout/Responsive";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getProject, works } from "@/content/works";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — Tatiana Sedova` : "Tatiana Sedova" };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  // A real block wrapper: the router's scroll-to-segment logic skips
  // zero-size boxes (display: contents / none), so without it the page
  // could open scrolled down. ScrollToTop guarantees an instant start at 0.
  return (
    <div>
      <ScrollToTop />
      <DesktopOnly>
        <WorkPage project={project} />
      </DesktopOnly>
      <MobileOnly>
        <MobileWorkPage project={project} />
      </MobileOnly>
    </div>
  );
}
