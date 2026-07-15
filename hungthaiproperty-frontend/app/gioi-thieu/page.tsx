import { AboutHistorySection } from "../sections/about/about-history-story-section";
import { AboutLeadershipMessageSection } from "../sections/about/about-leadership-message-section";
import { AboutOverview } from "../sections/about/about-overview";
import { AboutOrganizationSection } from "../sections/about/about-organization-section";
import { AboutValuesSection } from "../sections/about/about-values-section";
import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeContact } from "../sections/home/home-contact";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";
import { AboutBrandSection } from "../sections/about/about-brand-section";
import { AboutDevelopmentSection } from "../sections/about/about-development-section";

export default function AboutPage() {
  return (
    <>
      <main>
        <PageBanner title="GIỚI THIỆU" />
        <AboutOverview />
        <AboutHistorySection />
        <AboutBrandSection />
        <AboutValuesSection />
        <AboutLeadershipMessageSection />
        <AboutDevelopmentSection />
        <AboutOrganizationSection />
        <HomeContact />
      </main>
      <SiteFooter />
      <FloatingContactButtons />
    </>
  );
}
