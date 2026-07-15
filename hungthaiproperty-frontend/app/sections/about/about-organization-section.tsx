"use client";

import { motion } from "framer-motion";

import styles from "./about-organization-section.module.css";

const aboutOrganizationImage = "https://res.cloudinary.com/da6f4dmql/image/upload/v1784083236/ChatGPT_Image_09_06_22_15_thg_7_2026_qkvks2.png";

export function AboutOrganizationSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>Sơ đồ tổ chức</h2>

          <p>
Sơ đồ tổ chức <span className={styles.companyName}>
              Hưng Thái Property
            </span>{" "} được xây dựng theo mô hình quản trị tinh gọn, phân cấp rõ ràng và vận hành chuyên nghiệp. Dưới sự định hướng của Hội đồng quản trị và Tổng Giám đốc, các khối chức năng phối hợp chặt chẽ, bảo đảm hiệu quả trong kinh doanh, tài chính, truyền thông, nhân sự và quản lý dự án. Cơ cấu này tạo nền tảng vững chắc cho sự minh bạch, linh hoạt và phát triển bền vững của doanh nghiệp. 
          </p>
        </div>

        <div className={styles.media}>
          {aboutOrganizationImage ? (
            <img
              className={styles.image}
              src={aboutOrganizationImage}
              alt="Sơ đồ tổ chức Nam Sơn Land"
            />
          ) : (
            <div className={styles.placeholder}>
              Dán link ảnh sơ đồ tổ chức vào `aboutOrganizationImage`
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
