import styles from "./contact-page-section.module.css";

const mapQuery =
  "Tầng 2, Tòa nhà CT3, Khu ĐTM Nghĩa Đô, Phường Nghĩa Đô, TP Hà Nội, Việt Nam";

export function ContactPageSection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.mapCard}>
          <iframe
            title="Bản đồ Nam Son Land"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5746590481826!2d105.79059527503206!3d21.049698380604895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7ab07df9fd%3A0xa4894ce03534c510!2zQ2h1bmcgY8awIENUMyBOZ2jEqWEgxJDDtA!5e0!3m2!1svi!2s!4v1783657889509!5m2!1svi!2s`}
            className={styles.mapFrame}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className={styles.formCard}>
          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <span className={styles.contactCardLabel}>Hotline</span>
              <strong className={styles.contactCardValue}>097 727 5146</strong>
            </div>

            <div className={styles.contactCard}>
              <span className={styles.contactCardLabel}>Email</span>
              <strong className={styles.contactCardValue}>
                hungthaipropertyjsc@gmail.com
              </strong>
            </div>
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

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.visuallyHidden}>Số điện thoại</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.visuallyHidden}>Chủ đề</span>
                <input type="text" name="subject" placeholder="Chủ đề" />
              </label>
            </div>

            <label className={`${styles.field} ${styles.fullWidth}`}>
              <span className={styles.visuallyHidden}>Nội dung liên hệ</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Nội dung liên hệ"
              />
            </label>

            <div className={styles.actionWrap}>
              <button type="submit" className={styles.submitButton}>
                GỬI YÊU CẦU
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
