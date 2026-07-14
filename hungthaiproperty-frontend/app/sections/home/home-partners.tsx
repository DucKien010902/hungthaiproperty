import { partnerLogos } from "../../data/home-partners";
import styles from "./home-partners.module.css";

export function HomePartners() {
  return (
    <section id="doi-tac" className={styles.section}>
      <div className={styles.overlay} />

      <div className={`site-shell ${styles.inner}`}>
        <h2 className={styles.heading}>ĐỐI TÁC</h2>

        <div className={styles.content}>
          <div className={styles.grid}>
            {partnerLogos.map((partner) => (
              <a
                key={partner.id}
                href={partner.href}
                className={styles.card}
                aria-label={partner.name}
              >
                <span
                  className={styles.logo}
                  aria-hidden="true"
                  style={{ backgroundImage: `url("${partner.image}")` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
