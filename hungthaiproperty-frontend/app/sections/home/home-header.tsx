"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { featuredProjects } from "../../data/home-featured-projects";
import styles from "./home-header.module.css";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  {
    label: "Dự án nổi bật",
    href: "/du-an-noi-bat",
    children: featuredProjects.map((project) => ({
      label: project.title,
      href: project.href,
    })),
  },
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
          aria-label="Hưng Thái Property"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/Logo-1.png"
            alt="Hưng Thái Property"
            width={156}
            height={156}
            quality={100}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          <div className={styles.links}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const hasChildren = Boolean(item.children?.length);

              return (
                <div
                  key={item.href}
                  className={`${styles.navItem} ${
                    hasChildren ? styles.navItemWithDropdown : ""
                  }`}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={`${styles.link} ${styles.dropdownTrigger} ${
                          isActive ? styles.linkActive : ""
                        }`}
                      >
                        {item.label}
                        <span className={styles.dropdownCaret} aria-hidden="true" />
                      </button>
                      <div className={styles.dropdownMenu}>
                        <div className={styles.dropdownPanel}>
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={styles.dropdownLink}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <a href="tel:+84977275146" className={styles.hotline}>
            <span>Liên hệ:</span>
            <strong>097 727 5146</strong>
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
            const hasChildren = Boolean(item.children?.length);

            return (
              <div key={item.href} className={styles.mobileNavItem}>
                {hasChildren ? (
                  <>
                    <span
                      className={`${styles.mobileLink} ${
                        isActive ? styles.mobileLinkActive : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <div className={styles.mobileSubmenu}>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${
                      isActive ? styles.mobileLinkActive : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
