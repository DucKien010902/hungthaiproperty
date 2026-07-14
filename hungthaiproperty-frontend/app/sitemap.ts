import type { MetadataRoute } from "next";

const siteUrl = "https://www.nsland.com.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gioi-thieu",
    "/linh-vuc",
    "/du-an-noi-bat",
    "/doi-tac",
    "/tin-tuc",
    "/lien-he",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
