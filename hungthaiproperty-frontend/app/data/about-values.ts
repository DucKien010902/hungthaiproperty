import type { SiteIconKey } from "./site-icons";

export type AboutValueItem = {
  title: string;
  iconKey: SiteIconKey;
  items: string[];
};

export const aboutValues: AboutValueItem[] = [
  {
    title: "Thương hiệu",
    iconKey: "brand-ribbon",
    items: [
      "Nam Sơn Land được hình thành từ khát vọng mang đến những sản phẩm bất động sản có giá trị thực và xây dựng chuẩn mực dịch vụ dựa trên sự thấu hiểu.",
      "Chúng tôi sở hữu một tập thể gắn kết, nhiệt huyết, được dẫn dắt bởi đội ngũ lãnh đạo bản lĩnh và giàu kinh nghiệm.",
      "Với lý tưởng “Xây nhà đẹp - Dựng đời lành”, Nam Sơn Land cam kết đồng hành bền vững cùng khách hàng, đối tác và sự phát triển của cộng đồng xã hội.",
      "Phân phối bất động sản không phải là đích đến mà là bước khởi đầu để kiến tạo những cộng đồng thịnh vượng và những giá trị bền vững cho tương lai.",
    ],
  },
  {
    title: "Sứ mệnh",
    iconKey: "mission-handshake",
    items: [
      "Đặt khách hàng ở vị trí trung tâm trong mọi hoạt động và xem sự hài lòng của khách hàng là động lực phát triển thương hiệu.",
      "Cung cấp những sản phẩm và dịch vụ bất động sản minh bạch, chất lượng, mang giá trị thực và góp phần định hình các chuẩn mực mới cho thị trường.",
      "Lấy chính trực làm nền tảng, không ngừng đổi mới, tăng cường hợp tác và hướng tới sự phát triển bền vững.",
      "Đồng hành cùng khách hàng trước, trong và sau khi sử dụng dịch vụ nhằm mang lại trải nghiệm trọn vẹn và đóng góp tích cực cho cộng đồng.",
    ],
  },
  {
    title: "Tầm nhìn",
    iconKey: "vision-goal",
    items: [
      "Đến năm 2030, Nam Sơn Land hướng tới trở thành thương hiệu bất động sản uy tín hàng đầu trên thị trường Việt Nam.",
      "Trở thành đối tác bền vững, chuyên nghiệp và đáng tin cậy của các chủ đầu tư và nhà đầu tư.",
      "Là người bạn đồng hành dài lâu, chân thành cùng khách hàng trên hành trình lựa chọn bất động sản và xây dựng tổ ấm.",
    ],
  },
  {
    title: "Giá trị cốt lõi",
    iconKey: "core-values-queen",
    items: [
      "Chính trực: Công bố thông tin rõ ràng, báo cáo tiến độ minh bạch, trung thực trong giao tiếp và hành động, giữ vững uy tín với khách hàng và đối tác.",
      "Đổi mới và sáng tạo: Liên tục cập nhật thông tin thị trường, nhanh chóng nắm bắt nhu cầu và linh hoạt ứng dụng các giải pháp mới để nâng cao chất lượng dịch vụ.",
      "Trách nhiệm: Tận tâm nghiên cứu, tìm hiểu thông tin và thấu hiểu tường tận từng dự án trước khi giới thiệu đến khách hàng.",
      "Đảm bảo đầy đủ quyền lợi, giá trị đã cam kết với khách hàng, đối tác và tích cực đóng góp vào sự thịnh vượng chung của cộng đồng.",
    ],
  },
];
