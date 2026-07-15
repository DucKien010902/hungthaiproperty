export type FooterContactItem = {
  id: string;
  label: string;
  lines: string[];
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
};

export type FooterSocialLink = {
  id: string;
  label: string;
  href: string;
  shortLabel: string;
};

export const footerContactItems: FooterContactItem[] = [
  {
    id: "address",
    label: "Địa chỉ",
    lines: ["Tầng 2, Tòa nhà CT3, Khu ĐTM Nghĩa Đô, Phường Nghĩa Đô, TP Hà Nội, Việt Nam"],
  },
  {
    id: "phone-email",
    label: "Số điện thoại & Email",
    lines: ["097 727 5146", "hungthaipropertyjsc@gmail.com"],
  },
  {
    id: "hours",
    label: "Giờ làm việc",
    lines: ["Thứ 2 - Thứ 7", "08:00 - 17:30"],
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
  id: "projects",
  title: "Dự án",
  links: [
    { id: "the-star-city", label: "The Star City", href: "#du-an" },
    { id: "star-avenue", label: "Star Avenue", href: "#du-an" },
  ],
},
  {
    id: "quick-links",
    title: "Liên kết",
    links: [
      { id: "gioi-thieu", label: "Giới thiệu", href: "/gioi-thieu" },
      { id: "du-an", label: "Dự án nổi bật", href: "/du-an-noi-bat" },
      { id: "dich-vu", label: "Lĩnh vực", href: "/linh-vuc" },
      { id: "tin-tuc", label: "Tin tức", href: "/tin-tuc" },
      { id: "lien-he", label: "Liên hệ", href: "/lien-he" },
    ],
  },
];

export const footerSocialLinks: FooterSocialLink[] = [
  { id: "facebook", label: "Facebook", href: "#", shortLabel: "f" },
  { id: "youtube", label: "YouTube", href: "#", shortLabel: "Yt" },
  { id: "zalo", label: "Zalo", href: "#", shortLabel: "Z" },
];
