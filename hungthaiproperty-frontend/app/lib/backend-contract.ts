import type { FeaturedProject, NewsArticle } from "./content-types";

export type ArticlesListResponse = {
  items: NewsArticle[];
};

export type ArticleDetailResponse = {
  item: NewsArticle;
};

export type ProjectsListResponse = {
  items: FeaturedProject[];
};

export type ProjectDetailResponse = {
  item: FeaturedProject;
};

export const backendEndpoints = {
  health: "/health",
  articles: "/api/articles",
  articleById: (id: string) => `/api/articles/${encodeURIComponent(id)}`,
  projects: "/api/projects",
  projectById: (id: string) => `/api/projects/${encodeURIComponent(id)}`,
} as const;
