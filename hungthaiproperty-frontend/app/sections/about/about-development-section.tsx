"use client";

import { motion } from "framer-motion";

import styles from "./about-development-section.module.css";

const developmentCapabilities = [
  <>
    Năng lực nghiên cứu và lựa chọn vị trí{" "}
    <span className={styles.companyName}>Hưng Thái Property</span> đầu tư
    nghiêm túc vào công tác nghiên cứu thị trường, quy hoạch và hạ tầng khu
    vực trước khi quyết định phát triển dự án, nhằm đảm bảo tiềm năng phát
    triển bền vững và lợi ích lâu dài cho khách hàng.
  </>,
  <>
    Năng lực quy hoạch và phát triển sản phẩm Công ty chú trọng hoạch định quy
    hoạch tổng thể hợp lý, đồng bộ về hạ tầng, tiện ích và cảnh quan, đảm bảo
    sản phẩm phát triển phù hợp với nhu cầu thực tế của thị trường.
  </>,
  <>
    Năng lực tài chính và huy động nguồn lực Với nền tảng từ các tổ chức và cá
    nhân sáng lập có tiềm lực tài chính,{" "}
    <span className={styles.companyName}>Hưng Thái Property</span> có khả năng
    chủ động trong việc hoạch định và huy động nguồn lực cho các dự án.
  </>,
  <>
    Năng lực phối hợp đối tác Công ty xây dựng mạng lưới hợp tác cùng các đơn
    vị tư vấn, thiết kế, tổng thầu xây dựng, tổ chức tài chính và đơn vị phân
    phối, nhằm đảm bảo dự án được triển khai đồng bộ và hiệu quả.
  </>,
  <>
    Năng lực triển khai, quản lý tiến độ và chất lượng{" "}
    <span className={styles.companyName}>Hưng Thái Property</span> áp dụng quy
    trình quản lý dự án chặt chẽ, kiểm soát tiến độ và chất lượng thi công theo
    tiêu chuẩn, đảm bảo cam kết với khách hàng và đối tác.
  </>,
  <>
    Năng lực vận hành và gia tăng giá trị sau đầu tư Sau giai đoạn bàn giao,
    công ty tiếp tục đồng hành trong công tác quản lý, vận hành nhằm duy trì và
    gia tăng giá trị bất động sản theo thời gian.
  </>,
];

export function AboutDevelopmentSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={`site-shell ${styles.inner}`}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Năng lực phát triển dự án</h2>
        </div>

        <div className={styles.list}>
          {developmentCapabilities.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.badge}>{index + 1}</span>
              <p className={styles.description}>{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
