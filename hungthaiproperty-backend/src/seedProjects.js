import "dotenv/config";
import { connectDB } from "./db.js";
import Project from "./models/Project.model.js"; // Thay đổi đường dẫn nếu model đặt ở chỗ khác

// =========================================================================
// 🏢 DÁN TẤT CẢ CÁC OBJECT DỰ ÁN TỪ GIAO DIỆN CỦA BẠN VÀO TRONG MẢNG NÀY
// =========================================================================
const rawProjects = [
  {
  id: "star-avenue",
  title: "Star Avenue",
  images: [
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658864/PH%E1%BB%90_dludgl.jpg",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658863/2_naymlf.jpg",
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658865/5_ipkiib.jpg",
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658867/1_xnxtgh.jpg",
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1783658877/G%C3%93C_FLY_CAM_PH%E1%BB%90_4_jpzvyj.jpg",
],
  href: "/du-an-noi-bat?project=star-avenue",
  developer:
    "Liên danh Công ty Cổ phần Hạ tầng Đông Hải Số 1 & Công ty Cổ phần Đầu tư Hưng Thái Property",
  location:
    "782 Đường Lý Bôn, phường Thái Bình, tỉnh Hưng Yên",
  totalArea: "8,73 ha",
  scale:
    "Khu đô thị thương mại với 251 căn nhà phố thương mại 5 tầng, công viên cảnh quan và trung tâm thương mại AVENUE 5 tầng diện tích 3.000 m²",
  apartmentCount: "251 căn nhà phố thương mại",
  startDate: "Đang cập nhật",
  description:
    "STAR AVENUE được kiến tạo như một biểu tượng thương mại – dịch vụ hiện đại tại khu vực phát triển năng động của phường Thái Bình. Dự án hướng tới không gian mua sắm, giải trí, dịch vụ, kinh doanh và đầu tư được kết nối trong cùng một điểm đến mang đậm bản sắc. Với kiến trúc hiện đại, hệ tiện ích thương mại đồng bộ cùng trung tâm thương mại AVENUE quy mô 5 tầng, STAR AVENUE không chỉ góp phần kiến tạo diện mạo đô thị mới mà còn mở ra tiềm năng khai thác kinh doanh và gia tăng giá trị bền vững cho nhà đầu tư cũng như cộng đồng cư dân.",
},
  
  {
  id: "the-star-city",
  title: "The Star City",
  images: [
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659168/Photorealistic_real-estate_hero_render__16_9__202606250823_xi1a2t.jpg",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659165/IMAGE_1___the_EXACT_202606261017_hizlzo.jpg",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659163/SAU_%C4%90%C3%80I_PHUN_N%C6%AF%E1%BB%9AC_rj9rik.png",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659171/M%E1%BA%AAU_NH%C3%80-08_e4ejhc.png",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659180/Photorealistic_slightly_elevated_three-quarter_perspective_202606241641_ketdmr.jpg",
    "https://res.cloudinary.com/da6f4dmql/image/upload/v1783659178/Gemini_Generated_Image_tnvx7ltnvx7ltnvx_1_pasqtj.png",
  ], 
  href: "/du-an-noi-bat?project=the-star-city",
  developer: "Công ty Cổ phần Đầu tư Hưng Thái Property",
  location:
    "Thôn Lương Đống, xã Bắc Đông Quan, tỉnh Hưng Yên (huyện Đông Hưng, tỉnh Thái Bình cũ)",
  totalArea: "6,89 ha",
  scale: "Khu đô thị biệt thự shophouse gồm 250 căn shophouse liền kề VIP",
  apartmentCount: "250 căn shophouse liền kề VIP",
  startDate: "Đang cập nhật",
  description:
    "The Star City tọa lạc tại trung tâm Bắc Đông Quan – khu vực đang phát triển mạnh mẽ nhờ hạ tầng đồng bộ và tốc độ đô thị hóa nhanh. Được quy hoạch như một khu đô thị hiện đại với mật độ xây dựng thấp, dự án dành phần lớn diện tích cho công viên, cảnh quan và không gian sinh hoạt cộng đồng, mang đến môi trường sống xanh, thông thoáng và văn minh. Sở hữu vị trí chiến lược, quy hoạch bài bản cùng 250 căn shophouse liền kề VIP, The Star City vừa đáp ứng nhu cầu an cư chất lượng vừa mở ra cơ hội đầu tư hấp dẫn, hướng tới trở thành biểu tượng đô thị mới tại Bắc Đông Quan.",
},
  
];

async function run() {
  await connectDB();

  console.log(`⏳ Đang bắt đầu seed ${rawProjects.length} dự án...`);

  // Duyệt qua từng dự án để cập nhật hoặc thêm mới (dựa vào trường unique `id`)
  for (const project of rawProjects) {
    await Project.updateOne(
      { id: project.id }, // Điều kiện tìm kiếm theo ID độc nhất
      {
        $set: {
          title: project.title,
          images: project.images || [],
          href: project.href || "#",
          developer: project.developer || "",
          location: project.location || "",
          totalArea: project.totalArea || "",
          scale: project.scale || "",
          apartmentCount: project.apartmentCount || "",
          startDate: project.startDate || "",
          businessDeveloper: project.businessDeveloper || "",
          description: project.description || "",
        },
      },
      { upsert: true } // Chưa có thì tạo, có rồi thì ghi đè bản mới
    );
  }

  console.log("✅ Đã tạo/cập nhật toàn bộ dữ liệu dự án thành công!");
  process.exit(0);
}

run().catch((error) => {
  console.error("❌ Lỗi khi chạy seed dự án:", error);
  process.exit(1);
});