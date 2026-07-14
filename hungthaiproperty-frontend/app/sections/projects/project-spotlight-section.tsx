"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { FeaturedProject } from "@/app/lib/content-types";
import styles from "./project-spotlight-section.module.css";

type ProjectSpotlightSectionProps = {
  project: FeaturedProject;
};

export function ProjectSpotlightSection({
  project,
}: ProjectSpotlightSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = project.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((value) => (value + 1) % project.images.length);
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasMultipleImages, project.images.length]);

  const goPrev = () => {
    setCurrentImageIndex((value) =>
      value === 0 ? project.images.length - 1 : value - 1,
    );
  };

  const goNext = () => {
    setCurrentImageIndex((value) => (value + 1) % project.images.length);
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.mediaWrap}>
          <div className={styles.mediaFrame}>
            <div
              className={styles.mediaTrack}
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {project.images.map((image, index) => (
                <div key={`${project.id}-${index}`} className={styles.mediaSlide}>
                  <div
                    className={styles.media}
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url("${image}")`,
                    }}
                  />
                </div>
              ))}
            </div>

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.prevButton}`}
                  aria-label="Ảnh trước"
                  onClick={goPrev}
                >
                  ‹
                </button>

                <button
                  type="button"
                  className={`${styles.navButton} ${styles.nextButton}`}
                  aria-label="Ảnh tiếp theo"
                  onClick={goNext}
                >
                  ›
                </button>

                <div className={styles.dots}>
                  {project.images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      className={`${styles.dot} ${index === currentImageIndex ? styles.dotActive : ""}`}
                      aria-label={`Xem ảnh ${index + 1}`}
                      aria-pressed={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Tổng quan dự án</p>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.actions}>
            <Link href="/du-an-noi-bat" className={styles.backLink}>
              Quay lại danh sách dự án
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
