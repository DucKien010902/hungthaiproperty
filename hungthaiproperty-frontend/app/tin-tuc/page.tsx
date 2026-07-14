import { notFound } from "next/navigation";

import { getAllArticles, getArticleById } from "../lib/content-api";
import { FloatingContactButtons } from "../sections/home/floating-contact-buttons";
import { HomeContact } from "../sections/home/home-contact";
import { NewsArticleDetailSection } from "../sections/news/news-article-detail-section";
import { NewsGridSection } from "../sections/news/news-grid-section";
import { SiteFooter } from "../sections/site/site-footer";
import { PageBanner } from "../sections/shared/page-banner";
import { ServerErrorSection } from "../sections/shared/server-error-section";

type NewsPageProps = {
  searchParams: Promise<{
    article?: string | string[];
  }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const resolvedSearchParams = await searchParams;
  const articleId = Array.isArray(resolvedSearchParams.article)
    ? resolvedSearchParams.article[0]
    : resolvedSearchParams.article;

  try {
    const article = articleId ? await getArticleById(articleId) : null;
    const articles = article ? [] : await getAllArticles();

    if (articleId && !article) {
      notFound();
    }

    return (
      <>
        <main>
          <PageBanner title={article ? "" : "TIN TỨC"} />
          {article ? (
            <NewsArticleDetailSection article={article} />
          ) : (
            <NewsGridSection articles={articles} />
          )}
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
          <PageBanner title="TIN TỨC" />
          <ServerErrorSection message="Hệ thống đang gặp lỗi máy chủ khi tải danh sách tin tức. Vui lòng thử lại sau ít phút." />
          <HomeContact />
        </main>
        <SiteFooter />
        <FloatingContactButtons />
      </>
    );
  }
}
