"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import type { NewsArticle } from "@/app/lib/content-types";
import styles from "./news-article-detail-section.module.css";

type NewsArticleDetailSectionProps = {
  article: NewsArticle;
};

const motionEase = [0.16, 1, 0.3, 1] as const;

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: motionEase,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: motionEase },
  },
};

export function NewsArticleDetailSection({
  article,
}: NewsArticleDetailSectionProps) {
  return (
    <article className={styles.article}>
      <section className={styles.section}>
        <motion.div
          className={`site-shell ${styles.inner}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={contentVariants}
        >
          <main className={styles.content}>
            <motion.header className={styles.header} variants={itemVariants}>
              <Link href="/tin-tuc" className={styles.backButton}>
                Quay lại
              </Link>

              <h1 className={styles.heroTitle}>{article.title}</h1>

              <div className={styles.heroMeta}>
                <span>{article.date}</span>
              </div>
            </motion.header>

            <motion.p className={styles.intro} variants={itemVariants}>
              {article.excerpt}
            </motion.p>

            <div className={styles.stack}>
              {article.contentBlocks.map((block, index) => (
                <motion.section
                  key={`${article.id}-${index}`}
                  className={styles.block}
                  variants={itemVariants}
                >
                  {block.type === "text" ? (
                    <p className={styles.blockDescription}>{block.content}</p>
                  ) : (
                    <figure className={styles.figure}>
                      <img
                        className={styles.image}
                        src={block.src}
                        alt={block.alt || article.title}
                      />

                      {block.alt ? (
                        <figcaption className={styles.caption}>{block.alt}</figcaption>
                      ) : null}
                    </figure>
                  )}
                </motion.section>
              ))}
            </div>

            <motion.div className={styles.actions} variants={itemVariants}>
              <Link href="/tin-tuc" className={styles.backLink}>
                Quay lại tất cả bài viết
              </Link>
            </motion.div>
          </main>
        </motion.div>
      </section>
    </article>
  );
}
