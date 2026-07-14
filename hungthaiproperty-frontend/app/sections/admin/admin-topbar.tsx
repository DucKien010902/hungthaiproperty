"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { AdminSection } from "./admin-types";
import styles from "./admin-dashboard.module.css";

type PickerItem = {
  id: string;
  title: string;
  subtitle: string;
};

export function AdminTopbar({
  activeSection,
  items,
  selectedId,
  onSelectItem,
  onCreate,
}: {
  activeSection: AdminSection;
  items: PickerItem[];
  selectedId: string;
  onSelectItem: (id: string) => void;
  onCreate: () => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const source = normalizedQuery
      ? items.filter((item) =>
          `${item.title} ${item.subtitle}`.toLowerCase().includes(normalizedQuery),
        )
      : items;

    return source.slice(0, 10);
  }, [items, query]);

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarPicker}>
        <p className={styles.kicker}>
          {activeSection === "projects" ? "Danh sách dự án" : "Danh sách bài viết"}
        </p>

        <div className={styles.pickerBox} ref={pickerRef}>
          <div className={styles.pickerField}>
            <input
              className={styles.pickerInput}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={
                activeSection === "projects"
                  ? "Tìm và chọn dự án"
                  : "Tìm và chọn bài viết"
              }
              value={query}
            />

            {isOpen ? (
              <div className={styles.pickerDropdown}>
                {filteredItems.length ? (
                  filteredItems.map((item) => (
                    <button
                      className={item.id === selectedId ? styles.pickerActiveItem : ""}
                      key={item.id}
                      onClick={() => {
                        onSelectItem(item.id);
                        setQuery("");
                        setIsOpen(false);
                      }}
                      type="button"
                    >
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </button>
                  ))
                ) : (
                  <div className={styles.pickerEmpty}>Không có kết quả phù hợp.</div>
                )}
              </div>
            ) : null}
          </div>

          {selectedItem && !query ? (
            <p className={styles.pickerHint}>
              Đang chọn: <strong>{selectedItem.title}</strong>
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.topbarActions}>
        <button className={styles.primaryButton} onClick={onCreate} type="button">
          {activeSection === "projects" ? "Thêm dự án" : "Thêm bài viết"}
        </button>
      </div>
    </header>
  );
}
