"use client";

import { motion } from "framer-motion";

import styles from "./about-brand-story-section.module.css";

const aboutStoryImage =
  "https://drive.google.com/thumbnail?id=1-Lxk5Cr-TvQBOzcOSLXBvZ0t1E7HFbdx&sz=w2000";

export function AboutBrandStorySection() {
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
            <h2 className={styles.title}>Câu chuyện thương hiệu</h2>
            <p className={styles.subtitle}>
              Hành trình đi tìm &quot;Hạnh phúc trong từng giao dịch&quot;
            </p>
          </div>

          <p>
            Giữa một thị trường bất động sản không ngừng biến động, nhiều người
            vẫn nghĩ những bản hợp đồng chỉ là sự trao đổi lợi ích mang tính
            thời điểm. Nhưng với Nam Sơn Land, chúng tôi chọn một lối đi khác,
            bắt đầu từ một khát vọng kiên định: mang đến những sản phẩm có giá
            trị thực và định hình lại chuẩn mực dịch vụ bằng sự thấu hiểu.
          </p>

          <p>
            Nam Sơn Land tự hào sở hữu một tập thể gắn kết, nhiệt huyết, được
            dẫn dắt bởi &quot;vị thuyền trưởng&quot; bản lĩnh và giàu kinh
            nghiệm. Hơn thế, với lý tưởng &quot;Xây nhà đẹp - Dựng đời
            lành&quot;, mỗi dấu chân Nam Sơn Land đi qua đều gắn liền với cam
            kết đồng hành bền vững cùng sự phát triển của cộng đồng xã hội.
          </p>

          <p>
            Với Nam Sơn Land, phân phối bất động sản không phải là đích đến, mà
            là bước khởi đầu. Chúng tôi tự hào được cùng bạn xác lập những
            chuẩn mực sống mới, kiến tạo nên các cộng đồng thịnh vượng và bảo
            chứng cho những giá trị thực chất, bền vững của tương lai.
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
