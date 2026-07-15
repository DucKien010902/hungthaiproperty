"use client";

import { motion } from "framer-motion";

import styles from "./about-leadership-message-section.module.css";

const leadershipMessage = [
  "Chúng tôi thành lập Hưng Thái Property không phải để trở thành một chủ đầu tư có nhiều dự án nhất, mà để trở thành một thương hiệu được tin tưởng vì làm thật và làm đến cùng những gì đã cam kết.",
  "Chúng tôi hiểu rằng, niềm tin của khách hàng và đối tác không đến từ những tuyên bố, mà đến từ sự nhất quán trong hành động - từ việc lựa chọn vị trí phát triển dự án một cách cẩn trọng, đến việc đảm bảo pháp lý minh bạch và chất lượng công trình bền vững.",
  "Trên hành trình phía trước, Hưng Thái Property cam kết phát triển từng dự án bằng sự nghiêm túc, trách nhiệm và khát vọng đóng góp vào sự phát triển đô thị của địa phương, mang lại giá trị đích thực cho cộng đồng.",
];

export function AboutLeadershipMessageSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Thông điệp từ Ban lãnh đạo</h2>
        </div>

        <blockquote className={styles.quote}>
          {leadershipMessage.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>

        <p className={styles.signature}>
          Nguyễn Ngọc Anh
          <span>Tổng giám đốc Công ty Cổ phần Đầu tư Hưng Thái Property</span>
        </p>
      </motion.div>
    </section>
  );
}
