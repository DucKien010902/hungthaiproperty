import { AboutBrandStorySection } from "../sections/about/about-brand-story-section";
import { AboutOverview } from "../sections/about/about-overview";
import { AboutOrganizationSection } from "../sections/about/about-organization-section";
import { AboutValuesSection } from "../sections/about/about-values-section";
import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeContact } from "../sections/home/home-contact";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";

export default function AboutPage() {
  return (
    <>
      <main>
        <PageBanner title="GIỚI THIỆU" />
        <AboutOverview />
        <AboutBrandStorySection />
        <AboutValuesSection />
        <AboutOrganizationSection />
        <HomeContact />
      </main>
      <SiteFooter />
      <FloatingContactButtons />
    </>
  );
}
