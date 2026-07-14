import Link from "next/link";
import {
  footerContactItems,
  footerLinkGroups,
  footerSocialLinks,
} from "../../data/site-footer";
import styles from "./home-footer.module.css";

const contactIcons = {
  address: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.75a6.25 6.25 0 0 0-6.25 6.25c0 4.54 5.2 10.13 5.42 10.37a1.12 1.12 0 0 0 1.66 0c.22-.24 5.42-5.83 5.42-10.37A6.25 6.25 0 0 0 12 2.75Zm0 8.5A2.25 2.25 0 1 1 12 6.75a2.25 2.25 0 0 1 0 4.5Z"
      />
    </svg>
  ),
  "phone-email": (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 3.75h2.76c.4 0 .76.27.87.66l.83 2.95a.94.94 0 0 1-.24.93l-1.56 1.56a13.2 13.2 0 0 0 4.97 4.97l1.56-1.56a.94.94 0 0 1 .93-.24l2.95.83c.39.11.66.47.66.87v2.76c0 .5-.4.9-.9.9A16.58 16.58 0 0 1 3.75 4.65c0-.5.4-.9.87-.9Z"
      />
    </svg>
  ),
  hours: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.25A8.75 8.75 0 1 0 20.75 12 8.76 8.76 0 0 0 12 3.25Zm.75 4.25v4.19l3.08 1.85-.77 1.27-3.53-2.12a.76.76 0 0 1-.38-.65V7.5h1.6Z"
      />
    </svg>
  ),
} as const;

const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.22c0-.81.23-1.36 1.39-1.36H16.4V5.35c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.77V11H8v2.8h2.53V21h2.97Z"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.62 4.6 12 4.6 12 4.6s-5.62 0-7.48.48a2.98 2.98 0 0 0-2.1 2.11C2 9.06 2 12 2 12s0 2.94.42 4.81a2.98 2.98 0 0 0 2.1 2.11c1.86.48 7.48.48 7.48.48s5.62 0 7.48-.48a2.98 2.98 0 0 0 2.1-2.11C22 14.94 22 12 22 12s0-2.94-.42-4.81ZM9.75 15.03V8.97L15.5 12l-5.75 3.03Z"
      />
    </svg>
  ),
  zalo: <span className={styles.zaloBadge}>Zalo</span>,
} as const;

const socialClassNames = {
  facebook: styles.socialFacebook,
  youtube: styles.socialYoutube,
  zalo: styles.socialZalo,
} as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`site-shell ${styles.inner}`}>
        <div className={`${styles.brandBlock} ${styles.brandBlockNoLogo}`}>
          <div className={styles.contactList}>
            {footerContactItems.map((item) => (
              <div key={item.id} className={styles.contactItem}>
                <div className={styles.contactLabelRow}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    {contactIcons[item.id as keyof typeof contactIcons] ?? "..."}
                  </span>
                  <span className={styles.contactLabel}>{item.label}:</span>
                </div>

                <div className={styles.contactLines}>
                  {item.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.linksArea}>
          {footerLinkGroups.map((group) => (
            <div key={group.id} className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{group.title}</h3>

              <ul className={styles.linkList}>
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Mạng xã hội</h3>

            <div className={styles.socialList}>
              {footerSocialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`${styles.socialLink} ${socialClassNames[link.id as keyof typeof socialClassNames] ?? ""}`}
                  aria-label={link.label}
                >
                  {socialIcons[link.id as keyof typeof socialIcons] ??
                    link.shortLabel}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
