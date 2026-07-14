"use client";

import {
  ArrayRow,
  ArraySection,
  Field,
  PanelHeader,
  TextArea,
} from "./admin-form-controls";
import type { FeaturedProject } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function ProjectsEditor({
  selectedProject,
  onSave,
  onRemoveProject,
  onUpdateProject,
  onAddImage,
  onUpdateImage,
  onRemoveImage,
}: {
  selectedProject: FeaturedProject;
  onSave: (project: FeaturedProject) => void;
  onRemoveProject: (projectId: string) => void;
  onUpdateProject: (
    projectId: string,
    field: keyof FeaturedProject,
    value: string | string[],
  ) => void;
  onAddImage: (projectId: string) => void;
  onUpdateImage: (projectId: string, index: number, value: string) => void;
  onRemoveImage: (projectId: string, index: number) => void;
}) {
  return (
    <div className={styles.editorGrid}>
      <div className={styles.formPanel}>
        <PanelHeader
          title={selectedProject.title || "Dự án chưa đặt tên"}
          description="Biên tập toàn bộ thông tin dự án và danh sách ảnh trình bày."
          onSave={() => onSave(selectedProject)}
          onRemove={() => onRemoveProject(selectedProject.id)}
          removeLabel="Xóa dự án"
        />

        <div className={styles.formGrid}>
          <Field
            label="ID"
            value={selectedProject.id}
            onChange={(value) => onUpdateProject(selectedProject.id, "id", value)}
          />
          <Field
            label="Tên dự án"
            value={selectedProject.title}
            onChange={(value) => onUpdateProject(selectedProject.id, "title", value)}
          />
          <Field
            label="Đường dẫn"
            value={selectedProject.href}
            onChange={(value) => onUpdateProject(selectedProject.id, "href", value)}
          />
          <Field
            label="Chủ đầu tư"
            value={selectedProject.developer}
            onChange={(value) => onUpdateProject(selectedProject.id, "developer", value)}
          />
          <Field
            label="Vị trí"
            value={selectedProject.location}
            onChange={(value) => onUpdateProject(selectedProject.id, "location", value)}
          />
          <Field
            label="Tổng diện tích"
            value={selectedProject.totalArea ?? ""}
            onChange={(value) => onUpdateProject(selectedProject.id, "totalArea", value)}
          />
          <Field
            label="Quy mô"
            value={selectedProject.scale ?? ""}
            onChange={(value) => onUpdateProject(selectedProject.id, "scale", value)}
          />
          <Field
            label="Số lượng sản phẩm"
            value={selectedProject.apartmentCount ?? ""}
            onChange={(value) => onUpdateProject(selectedProject.id, "apartmentCount", value)}
          />
          <Field
            label="Thời gian mở bán"
            value={selectedProject.startDate ?? ""}
            onChange={(value) => onUpdateProject(selectedProject.id, "startDate", value)}
          />
          <Field
            label="Đơn vị phát triển kinh doanh"
            value={selectedProject.businessDeveloper ?? ""}
            onChange={(value) =>
              onUpdateProject(selectedProject.id, "businessDeveloper", value)
            }
          />
        </div>

        <TextArea
          label="Mô tả"
          rows={6}
          value={selectedProject.description}
          onChange={(value) => onUpdateProject(selectedProject.id, "description", value)}
        />

        <ArraySection
          title="Thư viện ảnh dự án"
          description=""
          onAdd={() => onAddImage(selectedProject.id)}
          addLabel="Thêm ảnh"
        >
          {selectedProject.images.map((image, index) => (
            <ArrayRow
              key={`${selectedProject.id}-image-${index}`}
              label={`Ảnh ${index + 1}`}
              value={image}
              previewHref={image}
              onChange={(value) => onUpdateImage(selectedProject.id, index, value)}
              onRemove={() => onRemoveImage(selectedProject.id, index)}
              removeLabel="Xóa"
            />
          ))}
        </ArraySection>
      </div>
    </div>
  );
}
