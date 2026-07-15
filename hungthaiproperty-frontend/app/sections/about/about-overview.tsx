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
          <h2 className={styles.title}>Tổng quan doanh nghiệp</h2>

          <p className={styles.description}>
            <span className={styles.companyName}>
              CÔNG TY CỔ PHẦN ĐẦU TƯ HƯNG THÁI PROPERTY
            </span>{" "}
            là đơn vị hoạt động trong lĩnh vực đầu tư và phát triển bất động sản,
            định hướng kiến tạo các khu đô thị, khu dân cư và không gian sống có
            giá trị thực cho cộng đồng. Ra đời với khát vọng xây dựng một thương
            hiệu bất động sản làm thật, phát triển thật và hướng đến những giá trị
            lâu dài, Hưng Thái Property lựa chọn cách tiếp cận thận trọng, bài
            bản trong từng bước đi - từ nghiên cứu thị trường, hoạch định quy
            hoạch, đến triển khai và vận hành dự án.
            <br /> Chúng tôi tin rằng một doanh nghiệp bất động sản bền vững cần
            được xây dựng trên nền tảng của sự trung thực, năng lực thực chất và
            tầm nhìn dài hạn - không phải những cam kết mang tính hình thức.
          </p>
        </div>

        <div className={styles.media}>
          <img
            className={styles.image}
            src={aboutCoverImage}
            alt="Ảnh bìa giới thiệu Hưng Thái Property"
          />
        </div>
      </motion.div>
    </section>
  );
}
