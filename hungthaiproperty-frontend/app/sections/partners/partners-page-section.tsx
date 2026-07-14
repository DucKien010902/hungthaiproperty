import { partnerLogos } from "../../data/home-partners";
import styles from "./partners-page-section.module.css";

export function PartnersPageSection() {
  return (
    <section className={styles.section}>
      <div className={`site-shell ${styles.inner}`}>
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
    </section>
  );
}
