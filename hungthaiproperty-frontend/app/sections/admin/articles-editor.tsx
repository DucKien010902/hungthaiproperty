"use client";

import { useState } from "react";

import { ArraySection, Field, PanelHeader, TextArea } from "./admin-form-controls";
import type { ContentBlock, NewsArticle } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function ArticlesEditor({
  selectedArticle,
  onSave,
  onRemoveArticle,
  onUpdateArticle,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: {
  selectedArticle: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onRemoveArticle: (articleId: string) => void;
  onUpdateArticle: (
    articleId: string,
    field: keyof NewsArticle,
    value: string | ContentBlock[],
  ) => void;
  onAddItem: (
    articleId: string,
    insertAfterIndex: number,
    blockType: ContentBlock["type"],
  ) => void;
  onUpdateItem: (
    articleId: string,
    itemIndex: number,
    field: "content" | "src" | "alt",
    value: string,
  ) => void;
  onRemoveItem: (articleId: string, itemIndex: number) => void;
}) {
  const [openBlockMenuIndex, setOpenBlockMenuIndex] = useState<number | null>(null);

  function handleAddBlock(index: number, blockType: ContentBlock["type"]) {
    onAddItem(selectedArticle.id, index, blockType);
    setOpenBlockMenuIndex(null);
  }

  return (
    <div className={styles.editorGrid}>
      <div className={styles.formPanel}>
        <PanelHeader
          title={selectedArticle.title || "Bài viết chưa đặt tên"}
          description="Biên tập thông tin tổng quan và các khối nội dung trong bài."
          onSave={() => onSave(selectedArticle)}
          onRemove={() => onRemoveArticle(selectedArticle.id)}
          removeLabel="Xóa bài viết"
        />

        <div className={styles.formGrid}>
          <Field
            label="ID"
            value={selectedArticle.id}
            onChange={(value) => onUpdateArticle(selectedArticle.id, "id", value)}
          />
          <Field
            label="Tiêu đề"
            value={selectedArticle.title}
            onChange={(value) => onUpdateArticle(selectedArticle.id, "title", value)}
          />
          <Field
            label="Ngày đăng"
            value={selectedArticle.date}
            onChange={(value) => onUpdateArticle(selectedArticle.id, "date", value)}
          />
          <Field
            label="Đường dẫn"
            value={selectedArticle.href}
            onChange={(value) => onUpdateArticle(selectedArticle.id, "href", value)}
          />
          <Field
            label="Ảnh đại diện"
            value={selectedArticle.image}
            previewHref={selectedArticle.image}
            onChange={(value) => onUpdateArticle(selectedArticle.id, "image", value)}
          />
        </div>

        <TextArea
          label="Tóm tắt"
          rows={4}
          value={selectedArticle.excerpt}
          onChange={(value) => onUpdateArticle(selectedArticle.id, "excerpt", value)}
        />

        <ArraySection title="Các khối nội dung" description="">
          {selectedArticle.contentBlocks.map((block, index) => (
            <section className={styles.subItem} key={`${selectedArticle.id}-block-${index}`}>
              <div className={styles.subItemHeader}>
                <div className={styles.blockLabel}>
                  <h3>Khối {index + 1}</h3>
                  <p>{block.type === "text" ? "Đoạn văn" : "Hình ảnh"}</p>
                </div>

                <div className={styles.blockActions}>
                  <div className={styles.addBlockMenu}>
                    <button
                      className={styles.secondaryButton}
                      onClick={() =>
                        setOpenBlockMenuIndex(openBlockMenuIndex === index ? null : index)
                      }
                      type="button"
                    >
                      Thêm khối
                    </button>

                    {openBlockMenuIndex === index ? (
                      <div className={styles.addBlockChoices}>
                        <button onClick={() => handleAddBlock(index, "text")} type="button">
                          Đoạn văn
                        </button>
                        <button onClick={() => handleAddBlock(index, "image")} type="button">
                          Hình ảnh
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <button
                    className={styles.ghostDangerButton}
                    onClick={() => onRemoveItem(selectedArticle.id, index)}
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </div>

              {block.type === "text" ? (
                <TextArea
                  label="Nội dung"
                  rows={5}
                  value={block.content}
                  onChange={(value) =>
                    onUpdateItem(selectedArticle.id, index, "content", value)
                  }
                />
              ) : (
                <>
                  <Field
                    label="Ảnh"
                    value={block.src}
                    previewHref={block.src}
                    onChange={(value) => onUpdateItem(selectedArticle.id, index, "src", value)}
                  />
                  <Field
                    label="Chú thích ảnh"
                    value={block.alt ?? ""}
                    onChange={(value) => onUpdateItem(selectedArticle.id, index, "alt", value)}
                  />
                </>
              )}
            </section>
          ))}
        </ArraySection>
      </div>
    </div>
  );
}
