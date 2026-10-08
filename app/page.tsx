import { FirstScreen } from "@/components/hero/FirstScreen";
import { AboutSection } from "@/components/about/AboutSection";
import { WorksSection } from "@/components/works/WorksSection";
import { CareerSection } from "@/components/career/CareerSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { DesktopOnly, MobileOnly } from "@/components/layout/Responsive";
import { MobileFirstScreen } from "@/components/mobile/MobileFirstScreen";
import { MobileAbout, MobileCareer, MobileContact, MobileWorks } from "@/components/mobile/MobileSections";
import { SECTION_IDS } from "@/lib/routes";

/**
 * Desktop (≥ 768px): the approved desktop components, unchanged.
 * Mobile (< 768px): dedicated components from the mobile Figma (390 × 844).
 * Section anchors live on the shared wrappers so #about / #works / #career /
 * #contact work in both layouts.
 */
export default function HomePage() {
  return (
    <>
      <main>
        <DesktopOnly>
          <FirstScreen />
        </DesktopOnly>
        <MobileOnly>
          <MobileFirstScreen />
        </MobileOnly>

        <div id={SECTION_IDS.about}>
          <DesktopOnly>
            <AboutSection />
          </DesktopOnly>
          <MobileOnly>
            <MobileAbout />
          </MobileOnly>
        </div>

        <div id={SECTION_IDS.works}>
          <DesktopOnly>
            <WorksSection />
          </DesktopOnly>
          <MobileOnly>
            <MobileWorks />
          </MobileOnly>
        </div>

        <div id={SECTION_IDS.career}>
          <DesktopOnly>
            <CareerSection />
          </DesktopOnly>
          <MobileOnly>
            <MobileCareer />
          </MobileOnly>
        </div>
      </main>

      <div id={SECTION_IDS.contact}>
        <DesktopOnly>
          <ContactSection />
        </DesktopOnly>
        <MobileOnly>
          <MobileContact />
        </MobileOnly>
      </div>
    </>
  );
}
