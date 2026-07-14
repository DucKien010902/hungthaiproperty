import { BusinessAreasDetailSection } from "../sections/business-areas/business-areas-detail-section";
import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeBusinessAreas } from "../sections/home/home-business-areas";
import { HomeContact } from "../sections/home/home-contact";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";

export default function BusinessAreasPage() {
  return (
    <>
      <main>
        <PageBanner title="LĨNH VỰC" />
        {/* <HomeBusinessAreas /> */}
        <BusinessAreasDetailSection />
        <HomeContact />
      </main>
      <SiteFooter />
      <FloatingContactButtons />
    </>
  );
}
