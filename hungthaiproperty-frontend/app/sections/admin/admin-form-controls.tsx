"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

import styles from "./admin-dashboard.module.css";

export function Field({
  label,
  value,
  onChange,
  previewHref,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  previewHref?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <div className={styles.fieldInputWrap}>
        <input value={value} onChange={createInputHandler(onChange)} />
        {previewHref ? <PreviewButton href={previewHref} label={label} /> : null}
      </div>
    </label>
  );
}

export function TextArea({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <textarea rows={rows} value={value} onChange={createInputHandler(onChange)} />
    </label>
  );
}

export function PanelHeader({
  title,
  description,
  onSave,
  onRemove,
  removeLabel,
}: {
  title: string;
  description: string;
  onSave: () => void;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <div className={styles.panelHeader}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.panelActions}>
        <button className={styles.ghostDangerButton} onClick={onRemove} type="button">
          {removeLabel}
        </button>
        <button className={styles.primaryButton} onClick={onSave} type="button">
          Lưu
        </button>
      </div>
    </div>
  );
}

export function ArraySection({
  title,
  description,
  addLabel,
  onAdd,
  children,
}: {
  title: string;
  description: string;
  addLabel?: string;
  onAdd?: () => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.arraySection}>
      <div className={styles.arraySectionHeader}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {onAdd && addLabel ? (
          <button className={styles.secondaryButton} onClick={onAdd} type="button">
            {addLabel}
          </button>
        ) : null}
      </div>

      <div className={styles.arrayStack}>{children}</div>
    </section>
  );
}

export function ArrayRow({
  label,
  value,
  onChange,
  onRemove,
  removeLabel,
  previewHref,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  removeLabel: string;
  previewHref?: string;
}) {
  return (
    <div className={styles.arrayRow}>
      <label className={styles.field}>
        <span>{label}</span>
        <div className={styles.fieldInputWrap}>
          <input value={value} onChange={createInputHandler(onChange)} />
          {previewHref ? <PreviewButton href={previewHref} label={label} /> : null}
        </div>
      </label>
      <button className={styles.ghostDangerButton} onClick={onRemove} type="button">
        {removeLabel}
      </button>
    </div>
  );
}

function PreviewButton({ href, label }: { href: string; label: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={styles.fieldPreviewButton}
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label={`Xem preview ${label.toLowerCase()}`}
        title="Xem preview ảnh"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
          <path
            d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </button>

      {isOpen ? (
        <div
          className={styles.imagePreviewModal}
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className={styles.imagePreviewDialog}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${label.toLowerCase()}`}
          >
            <button
              className={styles.imagePreviewClose}
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Đóng preview"
            >
              ×
            </button>

            <img className={styles.imagePreviewAsset} src={href} alt={label} />
          </div>
        </div>
      ) : null}
    </>
  );
}

function createInputHandler(onChange: (value: string) => void) {
  return (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
}
