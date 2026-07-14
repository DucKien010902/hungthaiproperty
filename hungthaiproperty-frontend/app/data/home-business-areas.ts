import { getDriveImageUrl } from "../lib/drive-image";

export type BusinessArea = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  href: string;
  detail: string[];
};

const rawBusinessAreas: BusinessArea[] = [
  {
    id: "real-estate-investment-development",
    title: "Đầu tư và phát triển bất động sản",
    image: "https://drive.google.com/file/d/1Ryk3RVprMf-deWXt06858sKDF-dI2XhJ/view?usp=drive_link",
    subtitle: "Nghiên cứu, hoạch định và triển khai các dự án có giá trị dài hạn.",
    href: "",
    detail: [
      "Hưng Thái Property thực hiện nghiên cứu, hoạch định và triển khai các dự án bất động sản dựa trên phân tích kỹ lưỡng về thị trường, tiềm năng khu vực và nhu cầu thực tế của cộng đồng. Mỗi dự án được lựa chọn phát triển đều đảm bảo tính khả thi, pháp lý rõ ràng và tiềm năng gia tăng giá trị bền vững, mang lại lợi ích lâu dài cho khách hàng và nhà đầu tư.",
    ],
  },
  {
    id: "urban-residential-development",
    title: "Phát triển khu đô thị, khu dân cư",
    image: "https://drive.google.com/file/d/1EowH4qvnmY9e4LGtAbx0ERxb8ivjdM2U/view?usp=drive_link",
    subtitle: "Kiến tạo không gian sống đồng bộ về hạ tầng, tiện ích và cảnh quan.",
    href: "",
    detail: [
      "Công ty tập trung phát triển các khu đô thị, khu dân cư với quy hoạch đồng bộ về hạ tầng kỹ thuật, hạ tầng xã hội và không gian cảnh quan. Từ hệ thống giao thông nội khu đến tiện ích công cộng, mỗi yếu tố đều được hoạch định hài hòa nhằm kiến tạo môi trường sống chất lượng, an toàn và bền vững, đáp ứng nhu cầu an cư lâu dài của cư dân.",
    ],
  },
  {
    id: "commercial-service-real-estate",
    title: "Phát triển bất động sản thương mại, dịch vụ",
    image: "https://drive.google.com/file/d/1GWfpWiWjhOC_6mcg3Llpxgha5bNkMKeD/view?usp=drive_link",
    subtitle: "Phát triển các sản phẩm shophouse, trung tâm thương mại phù hợp với nhu cầu kinh doanh của cư dân và nhà đầu tư.",
    href: "",
    detail: [
      "Hưng Thái Property phát triển các sản phẩm bất động sản thương mại, shophouse và không gian dịch vụ gắn liền với các khu dân cư, đáp ứng nhu cầu kinh doanh và tiện ích sinh hoạt của cư dân. Định hướng này không chỉ tạo động lực kinh tế cho khu vực dự án mà còn gia tăng giá trị khai thác lâu dài cho nhà đầu tư.",
    ],
  },
  {
    id: "project-investment-cooperation",
    title: "Hợp tác đầu tư và phát triển dự án",
    image: "https://drive.google.com/file/d/1GZs5t5eXgyYZgN0N49uzRxfL01CKsrlH/view?usp=sharing",
    subtitle: "Mở rộng hệ sinh thái hợp tác cùng các đối tác tài chính, quy hoạch, xây dựng, phân phối.",
    href: "",
    detail: [
      "Công ty chủ động mở rộng hợp tác cùng các đối tác tài chính, đơn vị quy hoạch – thiết kế, tổng thầu xây dựng và đơn vị phân phối, nhằm nâng cao năng lực triển khai và đảm bảo chất lượng toàn diện cho từng dự án. Sự phối hợp chặt chẽ giữa các bên là nền tảng để Hưng Thái Property hiện thực hóa các cam kết với khách hàng và thị trường.",
    ],
  },
  {
    id: "real-estate-management-operation",
    title: "Quản lý, khai thác và gia tăng giá trị bất động sản",
    image: "https://drive.google.com/file/d/1ptM1wMP0JFxgBw4kH44cVo87Gazxlo2-/view?usp=drive_link",
    subtitle: "Đồng hành cùng dự án sau bàn giao để duy trì và nâng cao giá trị vận hành.",
    href: "",
    detail: [
      "Hưng Thái Property xác định trách nhiệm không dừng lại sau bàn giao. Công ty đồng hành cùng dự án trong giai đoạn vận hành, thực hiện công tác quản lý, bảo trì và khai thác nhằm duy trì chất lượng công trình và gia tăng giá trị theo thời gian, đảm bảo lợi ích bền vững cho cư dân, khách hàng và nhà đầu tư.",
    ],
  },
];

export const businessAreas: BusinessArea[] = rawBusinessAreas.map((area) => ({
  ...area,
  image: getDriveImageUrl(area.image),
}));
