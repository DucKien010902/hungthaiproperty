"use client";

import { motion } from "framer-motion";

import styles from "./about-history-story-section.module.css";

const aboutStoryImage =
  "https://drive.google.com/thumbnail?id=1-Lxk5Cr-TvQBOzcOSLXBvZ0t1E7HFbdx&sz=w2000";

export function AboutHistorySection() {
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
          <div className={styles.heading}>
            <h2 className={styles.title}>Lịch sử hình thành</h2>
          </div>
          
          <p>
           <span className={styles.companyName}>
              Hưng Thái Property
            </span>{" "} được thành lập trong bối cảnh thị trường bất động sản Việt Nam đang bước vào giai đoạn đòi hỏi sự chuyên nghiệp, minh bạch và bền vững hơn từ các chủ đầu tư. Công ty được sáng lập bởi các tổ chức và cá nhân có uy tín, sở hữu tiềm lực tài chính vững vàng cùng kinh nghiệm điều hành, triển khai các dự án bất động sản.
            <br/> Ngay từ những ngày đầu, <span className={styles.companyName}>
              Hưng Thái Property
            </span>{" "} xác định rõ hướng đi của mình: không vội vàng chạy theo số lượng dự án, mà tập trung xây dựng nền tảng vững chắc về năng lực, quy trình và đội ngũ – để mỗi dự án được triển khai sau này đều phản ánh đúng tinh thần "Mang lại giá trị đích thực".
          </p>
        </div>

        <div className={styles.media}>
          <img
            className={styles.image}
            src={aboutStoryImage}
            alt="Câu chuyện thương hiệu Nam Sơn Land"
          />
        </div>
      </motion.div>
    </section>
  );
}
