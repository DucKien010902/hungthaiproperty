import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeContact } from "../sections/home/home-contact";
import { PartnersPageSection } from "../sections/partners/partners-page-section";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";

export default function PartnersPage() {
  return (
    <>
      <main>
        <PageBanner title="ĐỐI TÁC" />
        <PartnersPageSection />
      </main>
      <SiteFooter />
      <FloatingContactButtons />
    </>
  );
}
