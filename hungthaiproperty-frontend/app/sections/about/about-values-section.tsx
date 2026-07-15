
"use client";

import { motion } from "framer-motion";
import { siteIcons } from "../../data/site-icons";

import styles from "./about-values.module.css";

type AboutTextCard = {
  title: string;
  iconKey: "vision-goal" | "mission-handshake" | "core-values-queen";
  paragraphs: string[];
};

type AboutValueGroup = {
  label: string;
  lines: string[];
};

type AboutCoreValuesCard = {
  title: string;
  iconKey: "core-values-queen";
  values: AboutValueGroup[];
};

type AboutValueCard = AboutTextCard | AboutCoreValuesCard;

const aboutValuesImage =
  "https://drive.google.com/thumbnail?id=1CJr4ePhZC7YL3E121dBFR_Vn7_VaL_ez&sz=w2000";

const valueCards: AboutValueCard[] = [
  {
    title: "Tầm nhìn",
    iconKey: "vision-goal" as const,
    paragraphs: [
      "Trở thành thương hiệu đầu tư và phát triển bất động sản được tin tưởng lựa chọn, kiến tạo những không gian sống và không gian thương mại mang giá trị bền vững – nơi con người an cư lạc nghiệp và cộng đồng cùng phát triển thịnh vượng.",
    ],
  },
  {
    title: "Sứ mệnh",
    iconKey: "mission-handshake" as const,
    paragraphs: [
      "Mang lại giá trị đích thực cho khách hàng và cộng đồng thông qua việc phát triển những sản phẩm bất động sản thực chất – nơi pháp lý minh bạch, quy hoạch hợp lý và chất lượng bền vững hội tụ, phục vụ nhu cầu an cư, kinh doanh và đầu tư dài hạn.",
      
    ],
  },
  {
    title: "Giá trị cốt lõi",
    iconKey: "core-values-queen" as const,
    paragraphs: [
      "1. Giá trị thực Chúng tôi tin rằng giá trị của một dự án bất động sản không nằm ở lời quảng bá, mà ở chất lượng thực tế và khả năng đáp ứng nhu cầu sống lâu dài của cư dân.",
      "2. Trách nhiệm Mỗi cam kết của Hưng Thái Property với khách hàng, đối tác và cộng đồng đều được thực hiện với tinh thần trách nhiệm cao nhất, từ pháp lý đến chất lượng công trình.",
      "3. Chất lượng Chúng tôi kiểm soát chặt chẽ chất lượng trong từng khâu phát triển dự án – từ quy hoạch, thiết kế đến thi công và bàn giao.",
      "4. Đồng hành Hưng Thái Property xác định mối quan hệ với khách hàng và đối tác không kết thúc sau giao dịch, mà tiếp tục đồng hành trong suốt quá trình vận hành và khai thác giá trị.",
      "5. Phát triển bền vững Mỗi dự án được hoạch định với tầm nhìn dài hạn, hài hòa giữa lợi ích kinh tế, môi trường sống và giá trị cộng đồng.",
    ],
  },
];

export function AboutValuesSection() {
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
          <h2 className={styles.title}>
            Tầm nhìn - Sứ mệnh - Giá trị cốt lõi
          </h2>
        </div>

        <div className={styles.cards}>
          {valueCards.map((card, index) => {
            const Icon = siteIcons[card.iconKey];
            const cardLayoutClass = index === 2 ? styles.cardBottom : "";

            return (
              <article
                key={card.title}
                className={`${styles.card} ${cardLayoutClass}`.trim()}
              >
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>

                <h3 className={styles.cardTitle}>{card.title}</h3>

                {"paragraphs" in card ? (
                  <div className={styles.cardBody}>
                    {card.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className={styles.valueGroups}>
                    {card.values.map((value) => (
                      <div key={value.label} className={styles.valueGroup}>
                        <h4>{value.label}</h4>

                        {value.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className={styles.media}>
          <img
            className={styles.image}
            src={aboutValuesImage}
            alt="Tầm nhìn, sứ mệnh và giá trị cốt lõi Nam Sơn Land"
          />
        </div>
      </motion.div>
    </section>
  );
}

