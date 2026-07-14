"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { FeaturedProject } from "@/app/lib/content-types";
import styles from "./projects-catalog-section.module.css";

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

type ProjectsCatalogSectionProps = {
  currentPage?: number;
  projects: FeaturedProject[];
};

const projectsPerPage = 9;

const projectMetaLabels: ReadonlyArray<{
  key: ProjectMetaKey;
  label: string;
}> = [
  { key: "developer", label: "Chủ đầu tư" },
  { key: "businessDeveloper", label: "Đơn vị phát triển kinh doanh" },
  { key: "location", label: "Vị trí" },
  { key: "totalArea", label: "Tổng diện tích" },
  { key: "scale", label: "Quy mô" },
  { key: "apartmentCount", label: "Sản phẩm" },
  { key: "startDate", label: "Thời điểm triển khai" },
];

function normalizePage(page: number, totalPages: number) {
  if (!Number.isFinite(page)) return 1;

  return Math.min(Math.max(Math.trunc(page), 1), totalPages);
}

export function ProjectsCatalogSection({
  currentPage = 1,
  projects,
}: ProjectsCatalogSectionProps) {
  const totalPages = Math.max(
    Math.ceil(projects.length / projectsPerPage),
    1,
  );
  const safePage = normalizePage(currentPage, totalPages);
  const startIndex = (safePage - 1) * projectsPerPage;
  const visibleProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  return (
    <section className={styles.section}>
      <motion.div
        className="site-shell"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.grid}>
          {visibleProjects.map((project) => {
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

                return {
                  label,
                  value,
                };
              })
              .filter((item): item is ProjectMetaItem => item !== null);

            return (
              <article key={project.id} className={styles.card}>
                <span
                  className={styles.image}
                  aria-hidden="true"
                  style={{ backgroundImage: `url("${project.images[0]}")` }}
                />

                <span className={styles.body}>
                  <span className={styles.name}>{project.title}</span>

                  <span className={styles.metaList}>
                    {projectMetaItems.map((item) => (
                      <span key={item.label} className={styles.metaItem}>
                        <strong>{item.label}:</strong> {item.value}
                      </span>
                    ))}
                  </span>

                  <Link href={project.href} className={styles.detailButton}>
                    Xem chi tiết
                  </Link>
                </span>
              </article>
            );
          })}
        </div>

        {totalPages > 1 ? (
          <nav className={styles.pagination} aria-label="Phân trang dự án">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === safePage;

              return (
                <Link
                  key={pageNumber}
                  href={
                    pageNumber === 1
                      ? "/du-an-noi-bat"
                      : `/du-an-noi-bat?page=${pageNumber}`
                  }
                  className={`${styles.pageButton} ${
                    isActive ? styles.pageButtonActive : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </motion.div>
    </section>
  );
}
