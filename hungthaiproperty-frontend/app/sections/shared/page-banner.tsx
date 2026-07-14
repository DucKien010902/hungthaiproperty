 "use client";

import { motion } from "framer-motion";

import styles from "./page-banner.module.css";

type PageBannerProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export function PageBanner({ title, eyebrow, description }: PageBannerProps) {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay} />

      <div className={`site-shell ${styles.inner}`}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <motion.h1
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
            margin: "0px 0px -40px 0px",
          }}
          variants={titleVariants}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {title}
        </motion.h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
    </section>
  );
}
