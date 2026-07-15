
"use client";

import { motion } from "framer-motion";

import styles from "./about-brand-section.module.css";

const aboutCoverImage =
  "https://drive.google.com/thumbnail?id=1tMeiZ7w-BzYnL1C2mHV00DGM7kXDMy1B&sz=w2000";

export function AboutBrandSection() {
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
          <h2 className={styles.title}>
            Định vị thương hiệu
          </h2>

          <p className={styles.description}>
            <span className={styles.companyName}>
              Hưng Thái Property
            </span>{" "} định vị là chủ đầu tư theo đuổi giá trị thực trong từng dự án: chú trọng quy hoạch hợp lý, chất lượng sản phẩm đồng bộ, tính pháp lý minh bạch và khả năng khai thác lâu dài. Chúng tôi không đặt mục tiêu trở thành chủ đầu tư có quy mô lớn nhất trong thời gian ngắn, mà hướng đến việc trở thành một thương hiệu được khách hàng và đối tác tin tưởng nhờ sự nhất quán giữa lời nói và hành động.
            <br/> Mỗi dự án của <span className={styles.companyName}>
              Hưng Thái Property
            </span>{" "}, dù ở quy mô nào, đều được nghiên cứu và phát triển với cùng một tiêu chuẩn: mang lại lợi ích thực chất và lâu dài cho cư dân, khách hàng và đối tác.

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
