import { featuredProjects } from "../data/home-featured-projects";
import {
  featuredNews as mockFeaturedNews,
  getNewsArticleById as getMockNewsArticleById,
  newsArticles,
  secondaryNews as mockSecondaryNews,
} from "../data/home-news";
import type {
  ArticleDetailResponse,
  ArticlesListResponse,
  ProjectDetailResponse,
  ProjectsListResponse,
} from "./backend-contract";
import type { FeaturedProject, NewsArticle } from "./content-types";
import { getNewsArticleHref, getProjectHref } from "./content-routes";
import { getDriveImageUrl } from "./drive-image";

const DEFAULT_API_BASE_URL = "http://localhost:5003/api";
const DEFAULT_CONTENT_SOURCE = "api";

type ContentSourceMode = "api" | "mock";
type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiError = {
  message: string;
  status: number;
};

type ApiRequestOptions = {
  body?: unknown;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

function getContentSourceMode(): ContentSourceMode {
  const value =
    process.env.NEXT_PUBLIC_CONTENT_SOURCE?.toLowerCase() ||
    DEFAULT_CONTENT_SOURCE;

  if (value === "api" || value === "mock") {
    return value;
  }

  return DEFAULT_CONTENT_SOURCE;
}

function shouldUseMockData() {
  return getContentSourceMode() === "mock";
}

function getPublicFetchOptions() {
  return shouldUseMockData()
    ? { next: { revalidate: 60 as const } }
    : { cache: "no-store" as const };
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string };

    return {
      message: data.message || `Request failed with status ${response.status}`,
      status: response.status,
    } satisfies ApiError;
  } catch {
    return {
      message: `Request failed with status ${response.status}`,
      status: response.status,
    } satisfies ApiError;
  }
}

async function apiRequest<T>(
  path: string,
  method: HttpMethod = "GET",
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: options.cache,
    next: options.next,
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function apiRequestOrNull<T>(
  path: string,
  method: HttpMethod = "GET",
  options: ApiRequestOptions = {},
): Promise<T | null> {
  try {
    return await apiRequest<T>(path, method, options);
  } catch {
    return null;
  }
}

function normalizeProject(project: FeaturedProject): FeaturedProject {
  return {
    ...project,
    href: project.href?.trim() || getProjectHref(project.id),
    images: Array.isArray(project.images)
      ? project.images.filter(Boolean).map(getDriveImageUrl)
      : [],
  };
}

function normalizeArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    image: getDriveImageUrl(article.image),
    href: article.href?.trim() || getNewsArticleHref(article.id),
    contentBlocks: Array.isArray(article.contentBlocks)
      ? article.contentBlocks.map((block) =>
          block.type === "image"
            ? {
                ...block,
                src: getDriveImageUrl(block.src),
              }
            : block,
        )
      : [],
  };
}

function getMockProjectById(id: string) {
  return featuredProjects.find((project) => project.id === id) ?? null;
}

export async function checkBackendHealth() {
  const baseUrl = getApiBaseUrl().replace(/\/api\/?$/, "");
  try {
    const response = await fetch(`${baseUrl}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as { ok: boolean; service: string };
  } catch {
    return null;
  }
}

export async function listArticles() {
  const response = await apiRequest<ArticlesListResponse>(
    "/articles",
    "GET",
    getPublicFetchOptions(),
  );

  return response.items.map(normalizeArticle);
}

export async function getArticle(id: string) {
  const response = await apiRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(id)}`,
    "GET",
    getPublicFetchOptions(),
  );

  return normalizeArticle(response.item);
}

export async function createArticle(payload: NewsArticle) {
  const response = await apiRequest<ArticleDetailResponse>("/articles", "POST", {
    body: payload,
  });

  return normalizeArticle(response.item);
}

export async function updateArticle(id: string, payload: Partial<NewsArticle>) {
  const response = await apiRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(id)}`,
    "PATCH",
    { body: payload },
  );

  return normalizeArticle(response.item);
}

export async function deleteArticle(id: string) {
  return apiRequest<{ ok: true }>(`/articles/${encodeURIComponent(id)}`, "DELETE");
}

export async function listProjects() {
  const response = await apiRequest<ProjectsListResponse>(
    "/projects",
    "GET",
    getPublicFetchOptions(),
  );

  return response.items.map(normalizeProject);
}

export async function getProject(id: string) {
  const response = await apiRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(id)}`,
    "GET",
    getPublicFetchOptions(),
  );

  return normalizeProject(response.item);
}

export async function createProject(payload: FeaturedProject) {
  const response = await apiRequest<ProjectDetailResponse>("/projects", "POST", {
    body: payload,
  });

  return normalizeProject(response.item);
}

export async function updateProject(
  id: string,
  payload: Partial<FeaturedProject>,
) {
  const response = await apiRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(id)}`,
    "PATCH",
    { body: payload },
  );

  return normalizeProject(response.item);
}

export async function deleteProject(id: string) {
  return apiRequest<{ ok: true }>(`/projects/${encodeURIComponent(id)}`, "DELETE");
}

export async function getAllArticles() {
  if (shouldUseMockData()) {
    return newsArticles;
  }

  const items = await apiRequest<ArticlesListResponse>(
    "/articles",
    "GET",
    getPublicFetchOptions(),
  );

  return items.items.map(normalizeArticle);
}

export async function getArticleById(id: string) {
  if (shouldUseMockData()) {
    return getMockNewsArticleById(id);
  }

  const response = await apiRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(id)}`,
    "GET",
    getPublicFetchOptions(),
  );

  if (response.item) {
    return normalizeArticle(response.item);
  }

  return null;
}

export async function getFeaturedNewsContent() {
  const articles = await getAllArticles();

  return {
    featuredNews: articles[0] ?? mockFeaturedNews,
    secondaryNews: articles.slice(1, 5).length
      ? articles.slice(1, 5)
      : mockSecondaryNews,
  };
}

export async function getAllProjects() {
  if (shouldUseMockData()) {
    return featuredProjects;
  }

  const items = await apiRequest<ProjectsListResponse>(
    "/projects",
    "GET",
    getPublicFetchOptions(),
  );

  return items.items.map(normalizeProject);
}

export async function getProjectById(id: string) {
  if (shouldUseMockData()) {
    return getMockProjectById(id);
  }

  const response = await apiRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(id)}`,
    "GET",
    getPublicFetchOptions(),
  );

  if (response.item) {
    return normalizeProject(response.item);
  }

  return null;
}
