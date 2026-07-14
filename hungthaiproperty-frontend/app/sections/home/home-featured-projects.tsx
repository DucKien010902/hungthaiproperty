"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { FeaturedProject } from "../../lib/content-types";
import styles from "./home-featured-projects.module.css";

type HomeFeaturedProjectsProps = {
  projects: FeaturedProject[];
};

type ProjectMetaKey =
  | "developer"
  | "businessDeveloper"
  | "location"
  | "totalArea"
  | "scale"
  | "apartmentCount"
  | "startDate";

type ProjectMetaItem = {
  label: string;
  value: string | number;
};

const projectMetaLabels: ReadonlyArray<{
  key: ProjectMetaKey;
  label: string;
}> = [
  { key: "developer", label: "Chủ đầu tư" },
  {
    key: "businessDeveloper",
    label: "Đơn vị Tổng Đại lý phát triển kinh doanh",
  },
  { key: "location", label: "Vị trí" },
  { key: "totalArea", label: "Tổng diện tích" },
  { key: "scale", label: "Quy mô" },
  { key: "apartmentCount", label: "Sản phẩm" },
  { key: "startDate", label: "Thời điểm triển khai" },
];

function getVisibleCards(width: number) {
  if (width <= 640) return 1;
  if (width <= 980) return 2;
  return 2;
}

export function HomeFeaturedProjects({
  projects,
}: HomeFeaturedProjectsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => {
      setViewportWidth(viewport.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, []);

  const visibleCards = getVisibleCards(viewportWidth);
  const maxIndex = Math.max(projects.length - visibleCards, 0);
  const safeIndex = Math.min(currentIndex, maxIndex);
  const cardWidth = visibleCards > 0 ? viewportWidth / visibleCards : 0;

  const goPrev = () => {
    setCurrentIndex((value) => Math.max(value - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((value) => Math.min(value + 1, maxIndex));
  };

  return (
    <section id="du-an" className={styles.section}>
      <div className={styles.overlay} />

      <div className={`site-shell ${styles.inner}`}>
        <h2 className={styles.heading}>DỰ ÁN NỔI BẬT</h2>

        <div className={styles.slider}>
          {projects.length > visibleCards && (
            <motion.button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Xem các dự án trước"
              onClick={goPrev}
              disabled={safeIndex === 0}
              whileHover={{ scale: safeIndex === 0 ? 1 : 1.04 }}
              whileTap={{ scale: safeIndex === 0 ? 1 : 0.97 }}
            >
              <span aria-hidden="true">‹</span>
            </motion.button>
          )}

          <div ref={viewportRef} className={styles.scroller}>
            <motion.div
              className={styles.grid}
              animate={{ x: -(safeIndex * cardWidth) }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {projects.map((project) => {
                const projectRecord = project as unknown as Record<
                  ProjectMetaKey,
                  string | number | null | undefined
                >;

                const projectMetaItems: ProjectMetaItem[] = projectMetaLabels
                  .map(({ key, label }) => {
                    const value = projectRecord[key];

                    if (value === null || value === undefined || value === "") {
                      return null;
                    }

                    return { label, value };
                  })
                  .filter((item): item is ProjectMetaItem => item !== null);

                return (
                  <a
                    key={project.id}
                    href={project.href}
                    className={styles.card}
                    style={{ width: cardWidth || undefined }}
                  >
                    <span
                      className={styles.cardImage}
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url("${project.images[0]}")`,
                      }}
                    />

                    <span className={styles.cardBody}>
                      <span className={styles.cardTitle}>{project.title}</span>

                      <span className={styles.cardMetaList}>
                        {projectMetaItems.map((item) => (
                          <span
                            key={item.label}
                            className={styles.cardMetaItem}
                          >
                            <strong>{item.label}:</strong>{" "}
                            {item.value}
                          </span>
                        ))}
                      </span>
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </div>

          {projects.length > visibleCards && (
            <motion.button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Xem các dự án tiếp theo"
              onClick={goNext}
              disabled={safeIndex === maxIndex}
              whileHover={{ scale: safeIndex === maxIndex ? 1 : 1.04 }}
              whileTap={{ scale: safeIndex === maxIndex ? 1 : 0.97 }}
            >
              <span aria-hidden="true">›</span>
            </motion.button>
          )}
        </div>

        <div className={styles.actionWrap}>
          <a href="/du-an-noi-bat" className={styles.actionButton}>
            Xem tất cả dự án
          </a>
        </div>
      </div>
    </section>
  );
}
