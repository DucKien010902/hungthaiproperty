"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { getNewsArticleHref } from "@/app/lib/content-routes";
import type { NewsArticle } from "@/app/lib/content-types";
import styles from "./news-grid-section.module.css";

type NewsGridSectionProps = {
  articles: NewsArticle[];
};

const motionEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: motionEase,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: motionEase },
  },
};

export function NewsGridSection({ articles }: NewsGridSectionProps) {
  return (
    <section className={styles.section}>
      <motion.div
        className="site-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <div className={styles.grid}>
          {articles.map((article) => (
            <motion.article
              key={article.id}
              className={styles.card}
              variants={cardVariants}
            >
              <Link
                href={getNewsArticleHref(article.id)}
                className={styles.imageLink}
                aria-label={article.title}
              >
                <span
                  className={styles.image}
                  aria-hidden="true"
                  style={{ backgroundImage: `url("${article.image}")` }}
                />
              </Link>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Link href={getNewsArticleHref(article.id)} className={styles.titleLink}>
                    {article.title}
                  </Link>
                </h3>

                <p className={styles.excerpt}>{article.excerpt}</p>

                <div className={styles.meta}>
                  <span className={styles.date}>{article.date}</span>
                  <Link href={getNewsArticleHref(article.id)} className={styles.readMore}>
                    Đọc thêm
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
