import type { ContentBlock, FeaturedProject, NewsArticle } from "./admin-types";

const createId = () =>
  `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const createEmptyProject = (): FeaturedProject => ({
  id: createId(),
  title: "Dự án mới",
  images: [""],
  href: "#",
  developer: "",
  location: "",
  totalArea: "",
  scale: "",
  apartmentCount: "",
  startDate: "",
  businessDeveloper: "",
  description: "",
});

export const createEmptyTextBlock = (): ContentBlock => ({
  type: "text",
  content: "",
});

export const createEmptyImageBlock = (): ContentBlock => ({
  type: "image",
  src: "",
  alt: "",
});

export const createEmptyArticle = (): NewsArticle => ({
  id: createId(),
  title: "Bài viết mới",
  image: "",
  excerpt: "",
  date: "",
  href: "#",
  contentBlocks: [createEmptyTextBlock()],
});
