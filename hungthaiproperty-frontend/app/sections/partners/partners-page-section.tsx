"use client";

import { motion } from "framer-motion";

import { partnerLogos } from "../../data/home-partners";
import styles from "./partners-page-section.module.css";

export function PartnersPageSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.intro}>
          <span className={styles.companyName}>Hưng Thái Property</span> tin
          rằng, những giá trị bền vững chỉ có thể được kiến tạo trọn vẹn khi có
          sự đồng hành của những đối tác cùng chung tầm nhìn và chuẩn mực. Chúng
          tôi chủ động xây dựng hệ sinh thái hợp tác đa dạng và bền chặt, từ các
          tổ chức tài chính, đơn vị quy hoạch - thiết kế, tổng thầu xây dựng đến
          các đối tác phân phối và vận hành uy tín. Mỗi mối quan hệ hợp tác đều
          được thiết lập trên nền tảng minh bạch, tin cậy và cùng hướng đến một
          mục tiêu chung: mang lại giá trị đích thực cho từng dự án.
        </p>

        <div className={styles.grid}>
          {partnerLogos.map((partner) => (
            <a
              key={partner.id}
              href={partner.href}
              className={styles.card}
              aria-label={partner.name}
            >
              <span
                className={styles.logo}
                aria-hidden="true"
                style={{ backgroundImage: `url("${partner.image}")` }}
              />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
