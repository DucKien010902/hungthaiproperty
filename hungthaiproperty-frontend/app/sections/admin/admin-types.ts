import type { AdminContentPayload, AdminUser } from "../../lib/admin-api";
import type { FeaturedProject, ContentBlock, NewsArticle } from "../../lib/content-types";

export type { AdminContentPayload, AdminUser, ContentBlock, FeaturedProject, NewsArticle };

export type AdminSection = "projects" | "articles";

export type ContentListItem = {
  id: string;
  title: string;
  subtitle: string;
};
