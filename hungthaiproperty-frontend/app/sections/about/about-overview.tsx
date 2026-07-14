
"use client";

import { motion } from "framer-motion";

import styles from "./about-overview.module.css";

const aboutCoverImage =
  "https://drive.google.com/thumbnail?id=1tMeiZ7w-BzYnL1C2mHV00DGM7kXDMy1B&sz=w2000";

export function AboutOverview() {
  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.brandBlock}>
          <span className={styles.line} aria-hidden="true" />
          <div className={styles.logoMark} aria-hidden="true" />
          <span className={styles.line} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            A Happy Approach to Real Estate Sales
          </h2>

          <p className={styles.description}>
            Nam Sơn Land tự hào là đơn vị phân phối và tư vấn bất động sản
            chuyên sâu, không ngừng kiến tạo những không gian an cư và cơ hội
            đầu tư lý tưởng.
          </p>
        </div>

        <div className={styles.media}>
          <img
            className={styles.image}
            src={aboutCoverImage}
            alt="Ảnh bìa giới thiệu Nam Sơn Land"
          />
        </div>
      </motion.div>
    </section>
  );
}
