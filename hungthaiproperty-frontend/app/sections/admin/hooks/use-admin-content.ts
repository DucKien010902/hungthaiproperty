"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createAdminArticle,
  createAdminProject,
  deleteAdminArticle,
  deleteAdminProject,
  getAdminContent,
  updateAdminArticle,
  updateAdminProject,
} from "@/app/lib/admin-api";
import {
  createEmptyArticle,
  createEmptyImageBlock,
  createEmptyProject,
  createEmptyTextBlock,
} from "../admin-utils";
import type {
  AdminContentPayload,
  AdminSection,
  ContentBlock,
  FeaturedProject,
  NewsArticle,
} from "../admin-types";

type SourceIdMap = Record<string, string>;
type ActionStatus = "idle" | "success" | "error";

function buildSourceIdMap(items: Array<{ id: string }>): SourceIdMap {
  return Object.fromEntries(items.map((item) => [item.id, item.id]));
}

function renameSourceIdKey(map: SourceIdMap, previousId: string, nextId: string) {
  const nextMap = { ...map };
  const sourceId = nextMap[previousId] ?? previousId;
  delete nextMap[previousId];
  nextMap[nextId] = sourceId;
  return nextMap;
}

export function useAdminContent() {
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastActionStatus, setLastActionStatus] = useState<ActionStatus>("idle");
  const [activeSection, setActiveSection] = useState<AdminSection>("projects");
  const [content, setContent] = useState<AdminContentPayload>({
    projects: [],
    articles: [],
  });
  const [projectSourceIds, setProjectSourceIds] = useState<SourceIdMap>({});
  const [articleSourceIds, setArticleSourceIds] = useState<SourceIdMap>({});
  const [persistedProjectIds, setPersistedProjectIds] = useState<Record<string, true>>({});
  const [persistedArticleIds, setPersistedArticleIds] = useState<Record<string, true>>({});
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [projectEditor, setProjectEditor] = useState<FeaturedProject | null>(null);
  const [articleEditor, setArticleEditor] = useState<NewsArticle | null>(null);
  const [projectDraft, setProjectDraft] = useState<FeaturedProject | null>(null);
  const [articleDraft, setArticleDraft] = useState<NewsArticle | null>(null);
  const [saveMessage, setSaveMessage] = useState("");

  const selectedProject =
    projectDraft ??
    projectEditor ??
    content.projects.find((project) => project.id === selectedProjectId) ??
    content.projects[0] ??
    null;

  const selectedArticle =
    articleDraft ??
    articleEditor ??
    content.articles.find((article) => article.id === selectedArticleId) ??
    content.articles[0] ??
    null;

  const projectPickerItems = useMemo(
    () =>
      content.projects.map((project) => ({
        id: project.id,
        title: project.title || "Chưa đặt tên",
        subtitle: project.location || "Chưa có vị trí",
      })),
    [content.projects],
  );

  const articlePickerItems = useMemo(
    () =>
      content.articles.map((article) => ({
        id: article.id,
        title: article.title || "Chưa đặt tiêu đề",
        subtitle: article.date || "Chưa có ngày đăng",
      })),
    [content.articles],
  );

  const resetContentState = useCallback(() => {
    setContent({ projects: [], articles: [] });
    setProjectSourceIds({});
    setArticleSourceIds({});
    setPersistedProjectIds({});
    setPersistedArticleIds({});
    setSelectedProjectId("");
    setSelectedArticleId("");
    setProjectEditor(null);
    setArticleEditor(null);
    setProjectDraft(null);
    setArticleDraft(null);
    setSaveMessage("");
    setLastActionStatus("idle");
  }, []);

  useEffect(() => {
    if (projectDraft) return;

    const sourceProject =
      content.projects.find((project) => project.id === selectedProjectId) ??
      content.projects[0] ??
      null;

    setProjectEditor(
      sourceProject
        ? {
            ...sourceProject,
            images: [...sourceProject.images],
          }
        : null,
    );
  }, [content.projects, projectDraft, selectedProjectId]);

  useEffect(() => {
    if (articleDraft) return;

    const sourceArticle =
      content.articles.find((article) => article.id === selectedArticleId) ??
      content.articles[0] ??
      null;

    setArticleEditor(
      sourceArticle
        ? {
            ...sourceArticle,
            contentBlocks: sourceArticle.contentBlocks.map((block) => ({ ...block })),
          }
        : null,
    );
  }, [articleDraft, content.articles, selectedArticleId]);

  const loadContent = useCallback(
    async (
      token?: string,
      nextSelection?: {
        projectId?: string;
        articleId?: string;
      },
    ) => {
      setIsLoadingContent(true);
      setSaveMessage("");

      try {
        const nextContent = await getAdminContent();
        setContent(nextContent);
        setProjectSourceIds(buildSourceIdMap(nextContent.projects));
        setArticleSourceIds(buildSourceIdMap(nextContent.articles));
        setPersistedProjectIds(
          Object.fromEntries(nextContent.projects.map((project) => [project.id, true])),
        );
        setPersistedArticleIds(
          Object.fromEntries(nextContent.articles.map((article) => [article.id, true])),
        );
        setSelectedProjectId(
          nextSelection?.projectId ??
            ((current) => current || nextContent.projects[0]?.id || "")(selectedProjectId),
        );
        setSelectedArticleId(
          nextSelection?.articleId ??
            ((current) => current || nextContent.articles[0]?.id || "")(selectedArticleId),
        );
        setProjectEditor(null);
        setArticleEditor(null);
        setProjectDraft(null);
        setArticleDraft(null);

        if (!token) {
          setSaveMessage("Đã tải nội dung từ backend.");
          setLastActionStatus("idle");
        }
      } catch (error) {
        setLastActionStatus("error");
        setSaveMessage(error instanceof Error ? error.message : "Không thể tải nội dung.");
      } finally {
        setIsLoadingContent(false);
      }
    },
    [selectedArticleId, selectedProjectId],
  );

  const updateProject = useCallback(
    (projectId: string, field: keyof FeaturedProject, value: string | string[]) => {
      if (field === "id" && typeof value === "string" && value !== projectId) {
        if (projectDraft?.id === projectId) {
          setProjectDraft({ ...projectDraft, id: value });
          return;
        }

        if (projectEditor?.id === projectId) {
          setProjectEditor({ ...projectEditor, id: value });
          setSelectedProjectId(value);
          return;
        }

        setContent((current) => ({
          ...current,
          projects: current.projects.map((project) =>
            project.id === projectId ? { ...project, id: value } : project,
          ),
        }));
        setProjectSourceIds((current) => renameSourceIdKey(current, projectId, value));
        setPersistedProjectIds((current) => {
          if (!current[projectId]) {
            return current;
          }

          const next = { ...current };
          delete next[projectId];
          next[value] = true;
          return next;
        });
        setSelectedProjectId(value);
        return;
      }

      if (projectDraft?.id === projectId) {
        setProjectDraft({ ...projectDraft, [field]: value });
        return;
      }

      if (projectEditor?.id === projectId) {
        setProjectEditor({ ...projectEditor, [field]: value });
        return;
      }

      setProjectEditor((current) =>
        current && current.id === projectId ? { ...current, [field]: value } : current,
      );
    },
    [projectDraft, projectEditor],
  );

  const updateArticle = useCallback(
    (articleId: string, field: keyof NewsArticle, value: string | ContentBlock[]) => {
      if (field === "id" && typeof value === "string" && value !== articleId) {
        if (articleDraft?.id === articleId) {
          setArticleDraft({ ...articleDraft, id: value });
          return;
        }

        if (articleEditor?.id === articleId) {
          setArticleEditor({ ...articleEditor, id: value });
          setSelectedArticleId(value);
          return;
        }

        setContent((current) => ({
          ...current,
          articles: current.articles.map((article) =>
            article.id === articleId ? { ...article, id: value } : article,
          ),
        }));
        setArticleSourceIds((current) => renameSourceIdKey(current, articleId, value));
        setPersistedArticleIds((current) => {
          if (!current[articleId]) {
            return current;
          }

          const next = { ...current };
          delete next[articleId];
          next[value] = true;
          return next;
        });
        setSelectedArticleId(value);
        return;
      }

      if (articleDraft?.id === articleId) {
        setArticleDraft({ ...articleDraft, [field]: value });
        return;
      }

      if (articleEditor?.id === articleId) {
        setArticleEditor({ ...articleEditor, [field]: value });
        return;
      }

      setArticleEditor((current) =>
        current && current.id === articleId ? { ...current, [field]: value } : current,
      );
    },
    [articleDraft, articleEditor],
  );

  const addProject = useCallback(() => {
    const nextProject = createEmptyProject();
    setProjectDraft(nextProject);
    setArticleDraft(null);
    setActiveSection("projects");
    setLastActionStatus("idle");
    setSaveMessage("Đã tạo nháp dự án mới. Bấm Lưu để đẩy lên backend hoặc Hủy để bỏ.");
  }, []);

  const removeProject = useCallback(
    async (projectId: string, authToken: string | null) => {
      if (projectDraft?.id === projectId) {
        setProjectDraft(null);
        setLastActionStatus("idle");
        setSaveMessage("Đã hủy nháp dự án.");
        return;
      }

      const routeId = projectSourceIds[projectId];
      const hasServerRecord = Boolean(persistedProjectIds[projectId]);

      try {
        if (authToken && hasServerRecord) {
          await deleteAdminProject(routeId, authToken);
        }
        await loadContent(authToken ?? undefined, {
          projectId: content.projects.find((project) => project.id !== projectId)?.id,
        });
        setLastActionStatus("success");
        setSaveMessage("Đã xóa dự án trên backend.");
      } catch (error) {
        setLastActionStatus("error");
        setSaveMessage(error instanceof Error ? error.message : "Không thể xóa dự án.");
      }
    },
    [content.projects, loadContent, persistedProjectIds, projectDraft, projectSourceIds],
  );

  const addProjectImage = useCallback(
    (projectId: string) => {
      if (projectDraft?.id === projectId) {
        updateProject(projectId, "images", [...projectDraft.images, ""]);
        return;
      }
      if (projectEditor?.id === projectId) {
        updateProject(projectId, "images", [...projectEditor.images, ""]);
      }
    },
    [projectDraft, projectEditor, updateProject],
  );

  const updateProjectImage = useCallback(
    (projectId: string, index: number, value: string) => {
      if (projectDraft?.id === projectId) {
        updateProject(
          projectId,
          "images",
          projectDraft.images.map((image, imageIndex) => (imageIndex === index ? value : image)),
        );
        return;
      }
      if (projectEditor?.id === projectId) {
        updateProject(
          projectId,
          "images",
          projectEditor.images.map((image, imageIndex) => (imageIndex === index ? value : image)),
        );
      }
    },
    [projectDraft, projectEditor, updateProject],
  );

  const removeProjectImage = useCallback(
    (projectId: string, index: number) => {
      if (projectDraft?.id === projectId) {
        const nextImages = projectDraft.images.filter((_, imageIndex) => imageIndex !== index);
        updateProject(projectId, "images", nextImages.length ? nextImages : [""]);
        return;
      }
      if (projectEditor?.id === projectId) {
        const nextImages = projectEditor.images.filter((_, imageIndex) => imageIndex !== index);
        updateProject(projectId, "images", nextImages.length ? nextImages : [""]);
      }
    },
    [projectDraft, projectEditor, updateProject],
  );

  const addArticle = useCallback(() => {
    const nextArticle = createEmptyArticle();
    setArticleDraft(nextArticle);
    setProjectDraft(null);
    setActiveSection("articles");
    setLastActionStatus("idle");
    setSaveMessage("Đã tạo nháp bài viết mới. Bấm Lưu để đẩy lên backend hoặc Hủy để bỏ.");
  }, []);

  const removeArticle = useCallback(
    async (articleId: string, authToken: string | null) => {
      if (articleDraft?.id === articleId) {
        setArticleDraft(null);
        setLastActionStatus("idle");
        setSaveMessage("Đã hủy nháp bài viết.");
        return;
      }

      const routeId = articleSourceIds[articleId];
      const hasServerRecord = Boolean(persistedArticleIds[articleId]);

      try {
        if (authToken && hasServerRecord) {
          await deleteAdminArticle(routeId, authToken);
        }
        await loadContent(authToken ?? undefined, {
          articleId: content.articles.find((article) => article.id !== articleId)?.id,
        });
        setLastActionStatus("success");
        setSaveMessage("Đã xóa bài viết trên backend.");
      } catch (error) {
        setLastActionStatus("error");
        setSaveMessage(error instanceof Error ? error.message : "Không thể xóa bài viết.");
      }
    },
    [articleDraft, articleSourceIds, content.articles, loadContent, persistedArticleIds],
  );

  const addArticleItem = useCallback(
    (articleId: string, insertAfterIndex: number, blockType: ContentBlock["type"]) => {
      const nextBlock = blockType === "image" ? createEmptyImageBlock() : createEmptyTextBlock();

      if (articleDraft?.id === articleId) {
        const nextBlocks = [...articleDraft.contentBlocks];
        nextBlocks.splice(insertAfterIndex + 1, 0, nextBlock);
        updateArticle(articleId, "contentBlocks", nextBlocks);
        return;
      }
      if (articleEditor?.id === articleId) {
        const nextBlocks = [...articleEditor.contentBlocks];
        nextBlocks.splice(insertAfterIndex + 1, 0, nextBlock);
        updateArticle(articleId, "contentBlocks", nextBlocks);
      }
    },
    [articleDraft, articleEditor, updateArticle],
  );

  const updateArticleItem = useCallback(
    (
      articleId: string,
      itemIndex: number,
      field: "content" | "src" | "alt",
      value: string,
    ) => {
      if (articleDraft?.id === articleId) {
        updateArticle(
          articleId,
          "contentBlocks",
          articleDraft.contentBlocks.map((item, index) =>
            index === itemIndex ? { ...item, [field]: value } : item,
          ),
        );
        return;
      }
      if (articleEditor?.id === articleId) {
        updateArticle(
          articleId,
          "contentBlocks",
          articleEditor.contentBlocks.map((item, index) =>
            index === itemIndex ? { ...item, [field]: value } : item,
          ),
        );
      }
    },
    [articleDraft, articleEditor, updateArticle],
  );

  const removeArticleItem = useCallback(
    (articleId: string, itemIndex: number) => {
      if (articleDraft?.id === articleId) {
        const nextItems = articleDraft.contentBlocks.filter((_, index) => index !== itemIndex);
        updateArticle(
          articleId,
          "contentBlocks",
          nextItems.length ? nextItems : [createEmptyTextBlock()],
        );
        return;
      }
      if (articleEditor?.id === articleId) {
        const nextItems = articleEditor.contentBlocks.filter((_, index) => index !== itemIndex);
        updateArticle(
          articleId,
          "contentBlocks",
          nextItems.length ? nextItems : [createEmptyTextBlock()],
        );
      }
    },
    [articleDraft, articleEditor, updateArticle],
  );

  const handleSaveProject = useCallback(
    async (project: FeaturedProject, authToken: string | null) => {
      if (!authToken) {
        setLastActionStatus("error");
        setSaveMessage("Bạn cần đăng nhập để lưu dự án.");
        return;
      }

      setIsSaving(true);

      try {
        const routeId = projectSourceIds[project.id] ?? project.id;
        const existsOnServer = Boolean(persistedProjectIds[project.id]);
        const savedProject = existsOnServer
          ? await updateAdminProject(routeId, project, authToken)
          : await createAdminProject(project, authToken);
        await loadContent(authToken ?? undefined, { projectId: savedProject.id });
        setLastActionStatus("success");
        setSaveMessage(`Đã lưu dự án "${savedProject.title}" lên backend.`);
      } catch (error) {
        setLastActionStatus("error");
        setSaveMessage(error instanceof Error ? error.message : "Không thể lưu dự án.");
      } finally {
        setIsSaving(false);
      }
    },
    [loadContent, persistedProjectIds, projectSourceIds],
  );

  const handleSaveArticle = useCallback(
    async (article: NewsArticle, authToken: string | null) => {
      if (!authToken) {
        setLastActionStatus("error");
        setSaveMessage("Bạn cần đăng nhập để lưu bài viết.");
        return;
      }

      setIsSaving(true);

      try {
        const routeId = articleSourceIds[article.id] ?? article.id;
        const existsOnServer = Boolean(persistedArticleIds[article.id]);
        const savedArticle = existsOnServer
          ? await updateAdminArticle(routeId, article, authToken)
          : await createAdminArticle(article, authToken);
        await loadContent(authToken ?? undefined, { articleId: savedArticle.id });
        setLastActionStatus("success");
        setSaveMessage(`Đã lưu bài viết "${savedArticle.title}" lên backend.`);
      } catch (error) {
        setLastActionStatus("error");
        setSaveMessage(error instanceof Error ? error.message : "Không thể lưu bài viết.");
      } finally {
        setIsSaving(false);
      }
    },
    [articleSourceIds, loadContent, persistedArticleIds],
  );

  const cancelProjectDraft = useCallback(() => {
    setProjectDraft(null);
    setLastActionStatus("idle");
    setSaveMessage("Đã hủy nháp dự án.");
  }, []);

  const cancelArticleDraft = useCallback(() => {
    setArticleDraft(null);
    setLastActionStatus("idle");
    setSaveMessage("Đã hủy nháp bài viết.");
  }, []);

  return {
    activeSection,
    addArticle,
    addArticleItem,
    addProject,
    addProjectImage,
    articlePickerItems,
    content,
    handleSaveArticle,
    handleSaveProject,
    isArticleDraft: Boolean(articleDraft),
    isLoadingContent,
    isProjectDraft: Boolean(projectDraft),
    isSaving,
    lastActionStatus,
    loadContent,
    projectPickerItems,
    removeArticle,
    removeArticleItem,
    removeProject,
    removeProjectImage,
    resetContentState,
    cancelArticleDraft,
    cancelProjectDraft,
    saveMessage,
    selectedArticle,
    selectedArticleId,
    selectedProject,
    selectedProjectId,
    setActiveSection,
    setSelectedArticleId,
    setSelectedProjectId,
    updateArticle,
    updateArticleItem,
    updateProject,
    updateProjectImage,
  };
}
