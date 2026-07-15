import type { SiteIconKey } from "./site-icons";

export type HomeIntroItem = {
  title: string;
  description: string;
  href: string;
  iconKey: SiteIconKey;
};

export const homeIntroHeading = "TỔNG QUAN";

export const homeIntroItems: HomeIntroItem[] = [
  {
    title: "TẦM NHÌN",
    description:
    "Trở thành thương hiệu đầu tư và phát triển bất động sản được tin tưởng lựa chọn, kiến tạo những không gian sống và không gian thương mại mang giá trị bền vững – nơi con người an cư lạc nghiệp và cộng đồng cùng phát triển thịnh vượng.",
    href: "/gioi-thieu",
    iconKey: "vision-goal",
  },
  {
    title: "SỨ MỆNH",
    description:
      "Giá trị đích thực là tiêu chuẩn xuyên suốt trong từng quyết định đầu tư của Hưng Thái Property – từ lựa chọn vị trí, hoạch định quy hoạch, kiểm soát chất lượng xây dựng đến minh bạch pháp lý và đồng hành cùng khách hàng sau bàn giao. Chúng tôi tạo ra những sản phẩm phục vụ thực chất nhu cầu an cư, kinh doanh và đầu tư dài hạn – giá trị được cảm nhận bằng trải nghiệm sống thực tế ",
    href: "/gioi-thieu",
    iconKey: "mission-handshake",
  },
  {
    title: "GIÁ TRỊ CỐT LÕI",
    description:
      "Năm giá trị cốt lõi là kim chỉ nam xuyên suốt mọi quyết định của Hưng Thái Property – từ giá trị thực, trách nhiệm, chất lượng đến sự đồng hành và phát triển bền vững, cùng hướng đến một mục tiêu: mang lại lợi ích lâu dài và thực chất cho cộng đồng.",
    href: "/gioi-thieu",
    iconKey: "core-values-queen",
  },
];
