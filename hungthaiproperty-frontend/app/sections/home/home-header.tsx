"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./home-header.module.css";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  // { label: "Dự án nổi bật", href: "/du-an-noi-bat" },
  { label: "Lĩnh vực", href: "/linh-vuc" },
  { label: "Đối tác", href: "/doi-tac" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function HomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 72);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -188 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <div className={`site-shell ${styles.inner}`}>
        <Link
          href="/"
          className={styles.logoCard}
          aria-label="Nam Sơn Land"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className={styles.logoShiner}>
            <Image
              src="/Logo-1.png"
              alt="Nam Sơn Land"
              width={156}
              height={156}
              quality={100}
              className={styles.logoImage}
              priority
            />
            <motion.span
              className={styles.logoSweep}
              aria-hidden="true"
              animate={{ backgroundPositionX: ["220%", "-120%"] }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          <div className={styles.links}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a href="tel:+84938619339" className={styles.hotline}>
            <span>Liên hệ:</span>
            <strong>093 861 9339</strong>
          </a>

          <button
            className={`${styles.menuButton} ${
              isMobileMenuOpen ? styles.menuButtonOpen : ""
            }`}
            type="button"
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-header-menu"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              focusable="false"
              className={styles.menuIcon}
            >
              <path
                d="M4 6.5h16M4 12h16M4 17.5h16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.4"
              />
            </svg>
          </button>
        </nav>

        <div
          id="mobile-header-menu"
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${
                  isActive ? styles.mobileLinkActive : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
