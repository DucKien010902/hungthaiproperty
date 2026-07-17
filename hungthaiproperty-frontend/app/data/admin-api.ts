import {
  featuredProjects,
  type FeaturedProject,
} from "./home-featured-projects";
import { newsArticles, type NewsArticle } from "./home-news";

export type AdminRole = "super_admin" | "admin";

export type AdminUser = {
  id: string;
  name: string;
  role: AdminRole;
};

export type AdminContentPayload = {
  projects: FeaturedProject[];
  articles: NewsArticle[];
};

export const mockAdminUser: AdminUser = {
  id: "hungthai-admin",
  name: "Admin Hưng Thái",
  role: "super_admin",
};

export async function getAdminContent(): Promise<AdminContentPayload> {
  return {
    projects: featuredProjects,
    articles: newsArticles,
  };
}
