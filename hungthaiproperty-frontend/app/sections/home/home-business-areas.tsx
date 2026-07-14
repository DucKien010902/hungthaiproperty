import { businessAreas } from "../../data/home-business-areas";
import styles from "./home-business-areas.module.css";

export function HomeBusinessAreas() {
  return (
    <section id="linh-vuc-hoat-dong" className={styles.section}>
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.header}>
          <h2 className={styles.heading}>LĨNH VỰC HOẠT ĐỘNG</h2>
        </div>

        <div className={styles.grid}>
          {businessAreas.map((area) => (
            <article key={area.id} className={styles.card}>
              <a href={area.href} className={styles.cardImageLink} aria-label={area.title}>
                <img
                  className={styles.cardImage}
                  src={area.image}
                  alt={area.title}
                />
              </a>

              <div className={styles.cardBodyWrap}>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{area.title}</h3>

                  <p className={styles.subtitle}>{area.subtitle}</p>

                  <a href="/linh-vuc" className={styles.link}>
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
