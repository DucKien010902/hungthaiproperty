"use client";

import type { ContentListItem } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function AdminContentList({
  items,
  selectedId,
  actionLabel,
  onSelect,
}: {
  items: ContentListItem[];
  selectedId: string;
  actionLabel: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className={styles.contentList}>
      <div className={styles.contentListHeader}>
        <h2>Danh sách nội dung</h2>
        <span>{actionLabel}</span>
      </div>

      <div className={styles.contentListBody}>
        {items.map((item) => (
          <button
            className={item.id === selectedId ? styles.selectedItem : ""}
            key={item.id}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
