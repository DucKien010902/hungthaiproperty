"use client";

import { motion } from "framer-motion";

import styles from "./about-organization-section.module.css";

const aboutOrganizationImage = "https://res.cloudinary.com/da6f4dmql/image/upload/v1783672320/ChatGPT_Image_14_55_29_10_thg_7_2026_hvyeoe.png";

export function AboutOrganizationSection() {
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
          <h2 className={styles.title}>Sơ đồ tổ chức</h2>

          <p>
            Bộ máy tổ chức của Nam Sơn Land được xây dựng trên nền tảng quản trị
            hiện đại, tinh gọn và hiệu quả, phản ánh định hướng phát triển bền
            vững của một đơn vị phân phối bất động sản chuyên nghiệp.Cơ cấu tổ chức được thiết lập theo nguyên tắc phân tầng rõ ràng,
            phân quyền minh bạch và phối hợp linh hoạt giữa các khối chức năng
            trọng yếu, bao gồm Kinh doanh, Marketing, Vận hành và Dự
            án/Sản phẩm.
          </p>

          <p>
            Mỗi bộ phận giữ một vai trò chiến lược trong chuỗi giá trị hoạt
            động, từ nghiên cứu sản phẩm, triển khai truyền thông, phát triển
            nguồn khách hàng, tư vấn bán hàng đến chăm sóc và đồng hành cùng
            khách hàng sau giao dịch.Thông qua mô hình tổ chức khoa học, Nam Sơn Land hướng tới việc
            nâng cao năng lực vận hành, tối ưu hiệu suất đội ngũ, gia tăng chất
            lượng dịch vụ và khẳng định vị thế thương hiệu trên thị trường bất
            động sản. Đây cũng là nền tảng quan trọng giúp doanh nghiệp thích
            ứng linh hoạt, phát triển ổn định và mở rộng quy mô trong tương
            lai.
          </p>
        </div>

        <div className={styles.media}>
          {aboutOrganizationImage ? (
            <img
              className={styles.image}
              src={aboutOrganizationImage}
              alt="Sơ đồ tổ chức Nam Sơn Land"
            />
          ) : (
            <div className={styles.placeholder}>
              Dán link ảnh sơ đồ tổ chức vào `aboutOrganizationImage`
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
