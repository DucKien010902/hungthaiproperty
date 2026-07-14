import Link from "next/link";

import { getNewsArticleHref } from "../../lib/content-routes";
import type { NewsArticle } from "../../lib/content-types";
import styles from "./home-news.module.css";

type HomeNewsProps = {
  featuredNews: NewsArticle;
  secondaryNews: NewsArticle[];
};

export function HomeNews({ featuredNews, secondaryNews }: HomeNewsProps) {
  return (
    <section id="tin-tuc" className={styles.section}>
      <div className="site-shell">
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>TIN TỨC</h2>
        </div>

        <div className={styles.layout}>
          <Link
            href={getNewsArticleHref(featuredNews.id)}
            className={`${styles.card} ${styles.featuredCard}`}
          >
            <span
              className={styles.image}
              aria-hidden="true"
              style={{ backgroundImage: `url("${featuredNews.image}")` }}
            />
            <span className={styles.overlay} />
            <span className={styles.content}>
              <span className={styles.date}>{featuredNews.date}</span>
              <span className={styles.title}>{featuredNews.title}</span>
              <span className={styles.excerpt}>{featuredNews.excerpt}</span>
              <span className={styles.readMore}>Xem thêm</span>
            </span>
          </Link>

          <div className={styles.sideGrid}>
            {secondaryNews.map((article) => (
              <Link
                key={article.id}
                href={getNewsArticleHref(article.id)}
                className={styles.card}
              >
                <span
                  className={styles.image}
                  aria-hidden="true"
                  style={{ backgroundImage: `url("${article.image}")` }}
                />
                <span className={styles.overlay} />
                <span className={styles.content}>
                  <span className={styles.date}>{article.date}</span>
                  <span className={styles.smallTitle}>{article.title}</span>
                  <span className={styles.readMore}>Xem thêm</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.actionWrap}>
          <Link href="/tin-tuc" className={styles.actionButton}>
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  );
}
