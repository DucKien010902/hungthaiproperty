"use client";

import { motion } from "framer-motion";
import { homeIntroHeading, homeIntroItems } from "../../data/home-intro";
import { siteIcons } from "../../data/site-icons";

import styles from "./home-intro.module.css";

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const cardVariants = {
  hidden: {
    y: 72,
    scale: 0.98,
  },
  visible: {
    y: 0,
    scale: 1,
  },
};

export function HomeIntro() {
  return (
    <section id="gioi-thieu" className={styles.section}>
      <div className="site-shell">
        <motion.div
          className={styles.headingWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.01,
            margin: "0px 0px 0px 0px",
          }}
          variants={headingVariants}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h2 className={styles.heading}>{homeIntroHeading}</h2>
        </motion.div>

        <motion.div
          className={styles.summary}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
            margin: "0px 0px -80px 0px",
          }}
          variants={headingVariants}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* <p className={styles.summaryEyebrow}>A Happy Approach to Real Estate Sales</p> */}
          <p className={styles.summaryText}>
            <span className={styles.summaryHighlight}>
              CÔNG TY CỔ PHẦN ĐẦU TƯ HƯNG THÁI PROPERTY
            </span>{" "}
            được thành lập từ khát vọng kiến tạo những giá trị sống thực chất cho cộng đồng.
            Với nền tảng là đội ngũ sáng lập có kinh nghiệm điều hành, tiềm lực tài chính và tư
            duy phát triển dài hạn, Hưng Thái Property lựa chọn con đường đi chậm mà chắc:
            nghiên cứu kỹ, chuẩn bị kỹ và triển khai một cách nghiêm túc từng dự án mà chúng tôi
            theo đuổi. Chúng tôi tin rằng, một chủ đầu tư đáng tin cậy không được đo bằng số
            lượng dự án công bố, mà bằng sự nhất quán trong cam kết và chất lượng thực tế mang
            lại cho khách hàng.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {homeIntroItems.map((item, index) => {
            const Icon = siteIcons[item.iconKey];

            return (
              <motion.article
                key={item.title}
                className={styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.18,
                  margin: "0px 0px -80px 0px",
                }}
                variants={cardVariants}
                transition={{
                  duration: 0.95,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.iconWrap}>
                  <Icon className={styles.iconVector} />
                </div>

                <h3 className={styles.title}>{item.title}</h3>

                <p className={styles.description}>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
