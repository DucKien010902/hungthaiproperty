import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { ContactPageSection } from "../sections/contact/contact-page-section";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";

export default function ContactPage() {
  return (
    <>
      <main>
        <PageBanner title="LIÊN HỆ" />
        <ContactPageSection />
      </main>
      <SiteFooter />
      <FloatingContactButtons />
    </>
  );
}
