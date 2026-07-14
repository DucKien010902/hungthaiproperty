
"use client";

import { motion } from "framer-motion";
import { siteIcons } from "../../data/site-icons";

import styles from "./about-values.module.css";

type AboutTextCard = {
  title: string;
  iconKey: "vision-goal" | "mission-handshake";
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
      "Với tầm nhìn đến năm 2030, Nam Sơn Land hướng tới trở thành thương hiệu bất động sản uy tín hàng đầu trên thị trường Việt Nam; là đối tác bền vững, đáng tin cậy của các nhà đầu tư; là người bạn đồng hành dài lâu và chân thành cùng khách hàng trên hành trình xây dựng tổ ấm.",
    ],
  },
  {
    title: "Sứ mệnh",
    iconKey: "mission-handshake" as const,
    paragraphs: [
      "Trải qua nhiều khó khăn và thử thách, Nam Sơn Land nhận ra rằng: Sức mạnh và sự phát triển của thương hiệu bắt nguồn từ việc luôn đặt khách hàng ở vị trí trung tâm trong mọi hoạt động.",
      "Với động lực ấy, Nam Sơn Land không ngừng theo đuổi sứ mệnh cung cấp những sản phẩm và dịch vụ bất động sản minh bạch, chất lượng, mang giá trị thực, góp phần định hình các chuẩn mực mới cho thị trường.",
      "Để hiện thực hóa mục tiêu đó, Nam Sơn Land lấy chính trực làm nền tảng, không ngừng đổi mới và hợp tác, phát triển bền vững, đồng thời cam kết đồng hành cùng khách hàng ở cả trước, trong và sau khi sử dụng dịch vụ nhằm mang lại trải nghiệm trọn vẹn, đóng góp tích cực cho cộng đồng.",
    ],
  },
  {
    title: "Giá trị cốt lõi",
    iconKey: "core-values-queen" as const,
    values: [
      {
        label: "CHÍNH TRỰC",
        lines: [
          "Công bố thông tin rõ ràng, báo cáo tiến độ minh bạch.",
          "Trung thực trong giao tiếp và hành động, giữ vững uy tín với khách hàng, đối tác.",
        ],
      },
      {
        label: "ĐỔI MỚI & SÁNG TẠO",
        lines: [
          "Liên tục cập nhật các thông tin mới trên thị trường và nắm bắt nhanh chóng nhu cầu.",
          "Sáng tạo và ứng dụng linh hoạt những giải pháp mới nhằm nâng cao chất lượng dịch vụ.",
        ],
      },
      {
        label: "TRÁCH NHIỆM",
        lines: [
          "Tận tâm nghiên cứu, tìm hiểu thông tin, thấu hiểu tường tận từng dự án.",
          "Đảm bảo đầy đủ quyền lợi, giá trị đã cam kết với đối tác, khách hàng.",
          "Tích cực đóng góp vào sự thịnh vượng chung cho cộng đồng.",
        ],
      },
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
            const topCardClass = index === 0 ? styles.cardTop : "";

            return (
              <article
                key={card.title}
                className={`${styles.card} ${topCardClass}`.trim()}
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

