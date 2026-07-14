"use client";

import { motion } from "framer-motion";

import type { FeaturedProject } from "@/app/lib/content-types";
import styles from "./project-facts-section.module.css";

type ProjectFactsSectionProps = {
  project: FeaturedProject;
};

const factLabels: Array<{
  key: keyof FeaturedProject;
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

export function ProjectFactsSection({ project }: ProjectFactsSectionProps) {
  const facts = factLabels
    .map((item) => {
      const value = project[item.key];
      return value ? { label: item.label, value } : null;
    })
    .filter((item): item is { label: string; value: string } => item !== null);

  return (
    <section className={styles.section}>
      <motion.div
        className="site-shell"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.header}>
          <p className={styles.eyebrow}>Thông tin chính</p>
          <h2 className={styles.title}>Chi tiết dự án</h2>
        </div>

        <div className={styles.grid}>
          {facts.map((fact) => (
            <article key={fact.label} className={styles.card}>
              <p className={styles.label}>{fact.label}</p>
              <p className={styles.value}>{fact.value}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
