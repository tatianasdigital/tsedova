import { OverlapSection } from "@/components/ui/OverlapSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CareerTable } from "@/components/career/CareerTable";
import { careerHidden, careerVisible } from "@/content/career";
import { careerIntro } from "@/content/home";

/** Figma "CareerSection" (62:428). */
export function CareerSection() {
  return (
    <OverlapSection
      className="bg-black"
      contentClassName="bg-black"
      title={<SectionTitle>Career Journey</SectionTitle>}
    >
      <SectionDivider />
      <div className="site-container flex items-start justify-between pt-100 pb-140">
        <div className="flex w-531 flex-col gap-10">
          <p className="text-16 text-grey-black uppercase">{careerIntro.title}</p>
          <p className="w-533 text-36 leading-[0.99] text-white uppercase">{careerIntro.text}</p>
        </div>
        <CareerTable visible={careerVisible} hidden={careerHidden} />
      </div>
    </OverlapSection>
  );
}
