"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { businessAreas } from "@/app/data/home-business-areas";
import styles from "./business-areas-detail-section.module.css";

const motionEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: motionEase,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: motionEase },
  },
};

export function BusinessAreasDetailSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className="site-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <div className={styles.stack}>
          {businessAreas.map((area, index) => (
            <motion.article
              key={area.id}
              className={`${styles.card} ${index % 2 === 1 ? styles.cardReverse : ""}`}
              variants={cardVariants}
            >
              <div className={styles.mediaWrap}>
                <img
                  className={styles.media}
                  src={area.image}
                  alt={area.title}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <p className={styles.index}>0{index + 1}</p>
                  <h3 className={styles.cardTitle}>{area.title}</h3>
                </div>

                {area.subtitle ? (
                  <p className={styles.subtitle}>{area.subtitle}</p>
                ) : null}

                <div className={styles.detail}>
                  {area.detail.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
