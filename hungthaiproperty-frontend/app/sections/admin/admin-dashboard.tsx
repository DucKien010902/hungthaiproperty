"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./admin-dashboard.module.css";
import { ArticlesEditor } from "./articles-editor";
import { ProjectsEditor } from "./projects-editor";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { useAdminAuth } from "./hooks/use-admin-auth";
import { useAdminContent } from "./hooks/use-admin-content";

type PendingDelete =
  | { kind: "project"; id: string; title: string }
  | { kind: "article"; id: string; title: string }
  | { kind: "project-image"; projectId: string; imageIndex: number; title: string }
  | { kind: "article-block"; articleId: string; blockIndex: number; title: string };

export function AdminDashboard() {
  const content = useAdminContent();
  const { loadContent, resetContentState } = content;
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const authOptions = useMemo(
    () => ({
      onAuthenticated: async (token: string) => {
        await loadContent(token);
      },
      onSignedOut: () => {
        resetContentState();
      },
    }),
    [loadContent, resetContentState],
  );
  const auth = useAdminAuth(authOptions);

  useEffect(() => {
    if (content.lastActionStatus !== "success" || !content.saveMessage) {
      return;
    }

    setSuccessModalMessage(content.saveMessage);
    const timeoutId = window.setTimeout(() => {
      setSuccessModalMessage("");
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [content.lastActionStatus, content.saveMessage]);

  function handleSelectProject(id: string) {
    if (content.isProjectDraft) {
      content.cancelProjectDraft();
    }

    content.setSelectedProjectId(id);
  }

  function handleSelectArticle(id: string) {
    if (content.isArticleDraft) {
      content.cancelArticleDraft();
    }

    content.setSelectedArticleId(id);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.kind === "project") {
      await content.removeProject(pendingDelete.id, auth.authToken);
    } else if (pendingDelete.kind === "article") {
      await content.removeArticle(pendingDelete.id, auth.authToken);
    } else if (pendingDelete.kind === "project-image") {
      content.removeProjectImage(pendingDelete.projectId, pendingDelete.imageIndex);
    } else {
      content.removeArticleItem(pendingDelete.articleId, pendingDelete.blockIndex);
    }

    setPendingDelete(null);
  }

  if (auth.isBootstrapping) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginPanel}>
          <p className={styles.kicker}>Nam Son Land Admin</p>
          <h1>Đang kiểm tra phiên đăng nhập</h1>
          <p className={styles.loginIntro}>Hệ thống đang xác thực với backend...</p>
        </section>
      </main>
    );
  }

  if (!auth.user) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginPanel} aria-labelledby="admin-login-title">
          <p className={styles.kicker}>Nam Son Land Admin</p>
          <h1 id="admin-login-title">Quản lý nội dung</h1>
          <p className={styles.loginIntro}>
            Đăng nhập bằng tài khoản backend để quản lý dự án và bài viết.
          </p>

          <form className={styles.loginForm} onSubmit={auth.handleLogin}>
            <label className={styles.loginField}>
              <span>Tài khoản</span>
              <input
                value={auth.loginEmail}
                onChange={(event) => auth.setLoginEmail(event.target.value)}
                type="email"
                placeholder="Nhập email quản trị"
              />
            </label>
            <label className={styles.loginField}>
              <span>Mật khẩu</span>
              <input
                value={auth.loginPassword}
                onChange={(event) => auth.setLoginPassword(event.target.value)}
                type="password"
                placeholder="Nhập mật khẩu"
              />
            </label>

            {auth.loginError ? <p className={styles.loginError}>{auth.loginError}</p> : null}

            <div className={styles.loginActions}>
              <button disabled={auth.isSigningIn} type="submit">
                {auth.isSigningIn ? "Đang đăng nhập..." : "Đăng nhập quản trị"}
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminShell}>
      <AdminSidebar
        activeSection={content.activeSection}
        articleCount={content.content.articles.length}
        projectCount={content.content.projects.length}
        user={auth.user}
        onSelectSection={content.setActiveSection}
        onSignOut={auth.handleSignOut}
      />

      <section className={styles.workspace}>
        <AdminTopbar
          activeSection={content.activeSection}
          items={
            content.activeSection === "projects"
              ? content.projectPickerItems
              : content.articlePickerItems
          }
          selectedId={
            content.activeSection === "projects"
              ? content.selectedProjectId
              : content.selectedArticleId
          }
          onSelectItem={(id) =>
            content.activeSection === "projects"
              ? handleSelectProject(id)
              : handleSelectArticle(id)
          }
          onCreate={() =>
            content.activeSection === "projects"
              ? content.addProject()
              : content.addArticle()
          }
        />

        <div className={styles.workspaceBody}>
          {content.isProjectDraft ? (
            <div className={styles.draftNotice}>
              <p className={styles.topbarIntro}>
                Bạn đang chỉnh sửa một dự án ở trạng thái nháp. Chỉ khi bấm Lưu thì dữ liệu
                mới được tạo trên backend.
              </p>
              <button
                className={styles.secondaryButton}
                onClick={content.cancelProjectDraft}
                type="button"
              >
                Hủy nháp dự án
              </button>
            </div>
          ) : null}

          {content.isArticleDraft ? (
            <div className={styles.draftNotice}>
              <p className={styles.topbarIntro}>
                Bạn đang chỉnh sửa một bài viết ở trạng thái nháp. Chỉ khi bấm Lưu thì dữ
                liệu mới được tạo trên backend.
              </p>
              <button
                className={styles.secondaryButton}
                onClick={content.cancelArticleDraft}
                type="button"
              >
                Hủy nháp bài viết
              </button>
            </div>
          ) : null}

          {content.isLoadingContent ? (
            <p className={styles.topbarIntro}>Đang tải nội dung từ backend...</p>
          ) : null}

          {content.activeSection === "projects" && content.selectedProject ? (
            <ProjectsEditor
              selectedProject={content.selectedProject}
              onSave={(project) => content.handleSaveProject(project, auth.authToken)}
              onRemoveProject={(projectId) => {
                if (content.isProjectDraft) {
                  content.cancelProjectDraft();
                  return;
                }

                setPendingDelete({
                  kind: "project",
                  id: projectId,
                  title: content.selectedProject?.title || "dự án này",
                });
              }}
              onUpdateProject={content.updateProject}
              onAddImage={content.addProjectImage}
              onUpdateImage={content.updateProjectImage}
              onRemoveImage={(projectId, imageIndex) =>
                setPendingDelete({
                  kind: "project-image",
                  projectId,
                  imageIndex,
                  title: `ảnh ${imageIndex + 1} của dự án`,
                })
              }
            />
          ) : null}

          {content.activeSection === "articles" && content.selectedArticle ? (
            <ArticlesEditor
              selectedArticle={content.selectedArticle}
              onSave={(article) => content.handleSaveArticle(article, auth.authToken)}
              onRemoveArticle={(articleId) => {
                if (content.isArticleDraft) {
                  content.cancelArticleDraft();
                  return;
                }

                setPendingDelete({
                  kind: "article",
                  id: articleId,
                  title: content.selectedArticle?.title || "bài viết này",
                });
              }}
              onUpdateArticle={content.updateArticle}
              onAddItem={content.addArticleItem}
              onUpdateItem={content.updateArticleItem}
              onRemoveItem={(articleId, blockIndex) =>
                setPendingDelete({
                  kind: "article-block",
                  articleId,
                  blockIndex,
                  title: `khối nội dung ${blockIndex + 1}`,
                })
              }
            />
          ) : null}

          {content.isSaving ? (
            <p className={styles.topbarIntro}>Đang đồng bộ lên backend...</p>
          ) : null}
          {content.saveMessage && content.lastActionStatus === "error" ? (
            <p className={styles.topbarIntro}>{content.saveMessage}</p>
          ) : null}
        </div>
      </section>

      {pendingDelete ? (
        <div className={styles.confirmModalOverlay} role="presentation">
          <div
            className={styles.confirmModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-delete-title"
          >
            <h2 id="admin-delete-title">Xác nhận xóa</h2>
            <p>
              Bạn có chắc muốn xóa <strong>{pendingDelete.title}</strong> không? Thao tác này
              sẽ áp dụng ngay trong phiên chỉnh sửa hiện tại.
            </p>

            <div className={styles.panelActions}>
              <button
                className={styles.secondaryButton}
                onClick={() => setPendingDelete(null)}
                type="button"
              >
                Hủy
              </button>
              <button
                className={styles.ghostDangerButton}
                onClick={() => void confirmDelete()}
                type="button"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {successModalMessage ? (
        <div className={styles.successModalOverlay} role="presentation">
          <div
            className={styles.successModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-success-title"
          >
            <div className={styles.successBadge}>OK</div>
            <h2 id="admin-success-title">Thành công</h2>
            <p>{successModalMessage}</p>
            <button
              className={styles.primaryButton}
              onClick={() => setSuccessModalMessage("")}
              type="button"
            >
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
