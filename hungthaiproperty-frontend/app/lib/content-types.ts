export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt?: string };

export type NewsArticle = {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  href: string;
  contentBlocks: ContentBlock[];
};

export type FeaturedProject = {
  id: string;
  title: string;
  images: string[];
  href: string;
  developer: string;
  location: string;
  totalArea?: string;
  scale?: string;
  apartmentCount?: string;
  startDate?: string;
  businessDeveloper?: string;
  description: string;
};
