import { HomeHero } from "./sections/home/home-hero";
import { HomeIntro } from "./sections/home/home-intro";
import { HomeBusinessAreas } from "./sections/home/home-business-areas";
import { getAllProjects, getFeaturedNewsContent } from "./lib/content-api";
import { HomeFeaturedProjects } from "./sections/home/home-featured-projects";
import { HomeVideo } from "./sections/home/home-video";
import { HomeNews } from "./sections/home/home-news";
import { HomePartners } from "./sections/home/home-partners";
import { HomeContact } from "./sections/home/home-contact";
import { SiteFooter } from "./sections/site/site-footer";
import { FloatingContactButtons } from "./sections/home/floating-contact-buttons";
import { ServerErrorSection } from "./sections/shared/server-error-section";

export default async function Home() {
  try {
    const [projects, newsContent] = await Promise.all([
      getAllProjects(),
      getFeaturedNewsContent(),
    ]);

    return (
      <>
        <main>
          <HomeHero />
          <HomeIntro />
          <HomeVideo />
          <HomeFeaturedProjects projects={projects} />
          <HomeBusinessAreas />
          <HomePartners />
          <HomeNews
            featuredNews={newsContent.featuredNews}
            secondaryNews={newsContent.secondaryNews}
          />
          <HomeContact />
        </main>
        <SiteFooter />
        <FloatingContactButtons />
      </>
    );
  } catch {
    return (
      <>
        <main>
          <HomeHero />
          <HomeIntro />
          <ServerErrorSection message="Hệ thống đang gặp lỗi máy chủ khi tải dữ liệu trang chủ. Vui lòng thử lại sau ít phút." />
          <HomeContact />
        </main>
        <SiteFooter />
        <FloatingContactButtons />
      </>
    );
  }
}
