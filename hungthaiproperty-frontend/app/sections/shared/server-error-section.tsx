"use client";

import styles from "./server-error-section.module.css";

type ServerErrorSectionProps = {
  title?: string;
  message?: string;
};

export function ServerErrorSection({
  title = "Đang có lỗi máy chủ",
  message = "Hệ thống hiện chưa thể tải dữ liệu. Vui lòng thử lại sau ít phút.",
}: ServerErrorSectionProps) {
  return (
    <section className={styles.section}>
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.card}>
          <p className={styles.kicker}>Tạm thời gián đoạn</p>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
    </section>
  );
}
