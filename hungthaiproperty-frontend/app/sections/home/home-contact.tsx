import styles from "./home-contact.module.css";

export function HomeContact() {
  return (
    <section id="lien-he" className={styles.section}>
      <div className={styles.overlay} />

      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>LIÊN HỆ</h2>
        </div>

        <form className={styles.form} action="#">
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.visuallyHidden}>Họ và tên</span>
              <input type="text" name="name" placeholder="Họ và tên" />
            </label>

            <label className={styles.field}>
              <span className={styles.visuallyHidden}>Email</span>
              <input type="email" name="email" placeholder="Email" />
            </label>
          </div>

          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span className={styles.visuallyHidden}>Số điện thoại</span>
            <input type="tel" name="phone" placeholder="Số điện thoại" />
          </label>

          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span className={styles.visuallyHidden}>Nội dung</span>
            <textarea name="message" rows={5} placeholder="Nội dung liên hệ" />
          </label>

          <div className={styles.actionWrap}>
            <button type="submit" className={styles.submitButton}>
              GỬI YÊU CẦU
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
