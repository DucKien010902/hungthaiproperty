"use client";

import type { AdminSection, AdminUser } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function AdminSidebar({
  activeSection,
  projectCount,
  articleCount,
  user,
  onSelectSection,
  onSignOut,
}: {
  activeSection: AdminSection;
  projectCount: number;
  articleCount: number;
  user: AdminUser;
  onSelectSection: (section: AdminSection) => void;
  onSignOut: () => void;
}) {
  return (
    <aside className={styles.sidebar} aria-label="Admin sidebar">
      <div className={styles.sidebarInner}>
        <div className={styles.brandBlock}>
          <span>NS</span>
          <div>
            <strong>Hưng Thái Admin</strong>
            <small>{user.role === "super_admin" ? "Super admin" : "Admin"}</small>
          </div>
        </div>

        <div className={styles.navGroup}>
          <button
            className={activeSection === "projects" ? styles.activeNav : ""}
            onClick={() => onSelectSection("projects")}
            type="button"
          >
            <span>Dự án</span>
            <small>{projectCount} mục</small>
          </button>
          <button
            className={activeSection === "articles" ? styles.activeNav : ""}
            onClick={() => onSelectSection("articles")}
            type="button"
          >
            <span>Tin tức</span>
            <small>{articleCount} bài</small>
          </button>
        </div>

        <div className={styles.sidebarFooter}>
          <button className={styles.sidebarSignOut} onClick={onSignOut} type="button">
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
}
