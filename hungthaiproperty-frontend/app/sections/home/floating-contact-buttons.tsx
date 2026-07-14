import styles from "./floating-contact-buttons.module.css";

const contactButtons = [
  {
    id: "messenger",
    href: "#",
    label: "Messenger",
    className: styles.messenger,
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.5C6.75 2.5 2.5 6.44 2.5 11.3c0 2.77 1.38 5.24 3.55 6.85V21.5l3.23-1.78c.86.24 1.77.38 2.72.38 5.25 0 9.5-3.94 9.5-8.8S17.25 2.5 12 2.5Zm.94 11.77-2.42-2.58-4.72 2.58 5.19-5.51 2.47 2.58 4.66-2.58-5.18 5.51Z"
        />
      </svg>
    ),
  },
  {
    id: "zalo",
    href: "https://zalo.me/0938619339",
    label: "Zalo",
    className: styles.zalo,
    icon: <span className={styles.zaloText}>Zalo</span>,
  },
  {
    id: "phone",
    href: "tel:0938619339",
    label: "Gọi ngay",
    className: styles.phone,
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.24 3.5c.46 0 .87.31.98.76l.84 3.44a1 1 0 0 1-.25.94l-1.58 1.58a14.45 14.45 0 0 0 6.55 6.55l1.58-1.58a1 1 0 0 1 .94-.25l3.44.84c.45.11.76.52.76.98V20a1 1 0 0 1-1 1C10.18 21 3 13.82 3 5.5a1 1 0 0 1 1-1h3.24Z"
        />
      </svg>
    ),
  },
];

export function FloatingContactButtons() {
  return (
    <div className={styles.dock} aria-label="Liên hệ nhanh">
      {contactButtons.map((button) => (
        <div key={button.id} className={`${styles.item} ${button.className}`}>
          <a
            href={button.href}
            className={styles.button}
            aria-label={button.label}
            target={button.href.startsWith("http") ? "_blank" : undefined}
            rel={button.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {button.icon}
          </a>
        </div>
      ))}
    </div>
  );
}
