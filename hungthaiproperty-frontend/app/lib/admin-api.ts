import type { FeaturedProject, NewsArticle } from "./content-types";

const DEFAULT_API_BASE_URL = "http://localhost:5002/api";
const ADMIN_TOKEN_STORAGE_KEY = "namsonland_admin_token";

export type AdminRole = "super_admin" | "admin";

export type AdminUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive?: boolean;
};

export type AdminContentPayload = {
  projects: FeaturedProject[];
  articles: NewsArticle[];
};

type LoginResponse = {
  token: string;
  user: AdminUser;
};

type MeResponse = {
  user: AdminUser;
};

type ArticlesListResponse = {
  items: NewsArticle[];
};

type ArticleDetailResponse = {
  item: NewsArticle;
};

type ProjectsListResponse = {
  items: FeaturedProject[];
};

type ProjectDetailResponse = {
  item: FeaturedProject;
};

type ApiRequestOptions = {
  body?: unknown;
  token?: string;
};

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string };
    return data.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

async function adminRequest<T>(
  path: string,
  init: RequestInit,
  options: ApiRequestOptions = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : init.body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as T;
}

export function getStoredAdminToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function storeAdminToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearStoredAdminToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

export async function loginAdmin(email: string, password: string) {
  return adminRequest<LoginResponse>(
    "/auth/login",
    { method: "POST" },
    { body: { email, password } },
  );
}

export async function getAdminMe(token: string) {
  return adminRequest<MeResponse>("/auth/me", { method: "GET" }, { token });
}

export async function getAdminContent() {
  const [projectsResponse, articlesResponse] = await Promise.all([
    adminRequest<ProjectsListResponse>("/projects", { method: "GET" }),
    adminRequest<ArticlesListResponse>("/articles", { method: "GET" }),
  ]);

  return {
    projects: projectsResponse.items,
    articles: articlesResponse.items,
  } satisfies AdminContentPayload;
}

export async function createAdminProject(
  payload: FeaturedProject,
  token: string,
) {
  const response = await adminRequest<ProjectDetailResponse>(
    "/projects",
    { method: "POST" },
    { body: payload, token },
  );

  return response.item;
}

export async function updateAdminProject(
  routeId: string,
  payload: Partial<FeaturedProject>,
  token: string,
) {
  const response = await adminRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(routeId)}`,
    { method: "PATCH" },
    { body: payload, token },
  );

  return response.item;
}

export async function deleteAdminProject(routeId: string, token: string) {
  return adminRequest<{ ok: true }>(
    `/projects/${encodeURIComponent(routeId)}`,
    { method: "DELETE" },
    { token },
  );
}

export async function addAdminProjectImage(
  routeId: string,
  value: string,
  token: string,
) {
  const response = await adminRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(routeId)}/images`,
    { method: "POST" },
    { body: { value }, token },
  );

  return response.item;
}

export async function updateAdminProjectImage(
  routeId: string,
  imageIndex: number,
  value: string,
  token: string,
) {
  const response = await adminRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(routeId)}/images/${imageIndex}`,
    { method: "PATCH" },
    { body: { value }, token },
  );

  return response.item;
}

export async function deleteAdminProjectImage(
  routeId: string,
  imageIndex: number,
  token: string,
) {
  const response = await adminRequest<ProjectDetailResponse>(
    `/projects/${encodeURIComponent(routeId)}/images/${imageIndex}`,
    { method: "DELETE" },
    { token },
  );

  return response.item;
}

export async function createAdminArticle(
  payload: NewsArticle,
  token: string,
) {
  const response = await adminRequest<ArticleDetailResponse>(
    "/articles",
    { method: "POST" },
    { body: payload, token },
  );

  return response.item;
}

export async function updateAdminArticle(
  routeId: string,
  payload: Partial<NewsArticle>,
  token: string,
) {
  const response = await adminRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(routeId)}`,
    { method: "PATCH" },
    { body: payload, token },
  );

  return response.item;
}

export async function deleteAdminArticle(routeId: string, token: string) {
  return adminRequest<{ ok: true }>(
    `/articles/${encodeURIComponent(routeId)}`,
    { method: "DELETE" },
    { token },
  );
}

export async function addAdminArticleBlock(
  routeId: string,
  block: NewsArticle["contentBlocks"][number],
  index: number,
  token: string,
) {
  const response = await adminRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(routeId)}/blocks`,
    { method: "POST" },
    { body: { block, index }, token },
  );

  return response.item;
}

export async function updateAdminArticleBlock(
  routeId: string,
  blockIndex: number,
  block: Partial<NewsArticle["contentBlocks"][number]>,
  token: string,
) {
  const response = await adminRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(routeId)}/blocks/${blockIndex}`,
    { method: "PATCH" },
    { body: block, token },
  );

  return response.item;
}

export async function deleteAdminArticleBlock(
  routeId: string,
  blockIndex: number,
  token: string,
) {
  const response = await adminRequest<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(routeId)}/blocks/${blockIndex}`,
    { method: "DELETE" },
    { token },
  );

  return response.item;
}
