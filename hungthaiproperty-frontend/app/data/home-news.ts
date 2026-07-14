// Định nghĩa lại Type đơn giản và linh hoạt hơn
export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt?: string };

export type NewsArticle = {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  href: string;
  contentBlocks: ContentBlock[]; // Thay items bằng contentBlocks
};

type RawNewsArticle = NewsArticle;

/**
 * Hàm tự động chuyển đổi link Google Drive sang Link trực tiếp
 */
export function getDriveDirectLink(url: string): string {
  if (!url) return '';
  // Hỗ trợ cả link file dạng /file/d/ID và link folder/file dạng ?id=ID hoặc d/ID
  const regex = /(?:\/d\/|id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
  }
  return url;
}

function normalizeContentBlock(block: ContentBlock): ContentBlock {
  if (block.type === "image") {
    return {
      ...block,
      src: getDriveDirectLink(block.src),
    };
  }

  return block;
}

function normalizeNewsArticle(article: RawNewsArticle): NewsArticle {
  return {
    ...article,
    image: getDriveDirectLink(article.image),
    contentBlocks: article.contentBlocks.map(normalizeContentBlock),
  };
}

const rawNewsArticles: RawNewsArticle[] = [
  {
    id: "dieu-nam-son-land-can-chung-minh-la-dang-tin",
    title: "Điều Nam Sơn Land cần chứng minh không phải là mình lớn, mà là mình đáng tin.",
    image: "https://drive.google.com/file/d/1N7_B3KJBiowSKyPDkA4hOFv7J-qtuCo7/view?usp=drive_link", // Lấy ảnh 1.2 làm ảnh đại diện bài viết
    excerpt: "Trong bất động sản, niềm tin luôn là tài sản khó xây dựng nhất. Khách hàng thận trọng hơn và cần những doanh nghiệp có trách nhiệm hơn trong cách phát triển, truyền tải và đồng hành cùng thị trường.",
    date: "13/07/2026",
    href: "#",
    contentBlocks: [
      {
        type: "text",
        content: "Trong bất động sản, niềm tin luôn là tài sản khó xây dựng nhất. Một dự án có thể thu hút sự chú ý bằng vị trí, thiết kế, chính sách bán hàng hay kỳ vọng tăng trưởng. Nhưng để khách hàng thật sự tin tưởng, lựa chọn và tiếp tục đồng hành, điều họ cần không chỉ là một lời giới thiệu hấp dẫn mà điều họ cần là cảm giác được cung cấp thông tin rõ ràng, được tư vấn đúng nhu cầu và được tôn trọng trong một quyết định tài chính quan trọng."
      },
      {
        type: "text",
        content: "Đây cũng là bối cảnh mà Nam Sơn Land bắt đầu hành trình xây dựng thương hiệu trong lĩnh vực bất động sản. Là một thương hiệu mới, Nam Sơn Land không bước ra thị trường bằng câu chuyện về quy mô hay những tuyên bố lớn. Điều cần thiết hơn ở giai đoạn khởi nguồn là tiếp cận một cách đủ rõ ràng: lấy giá trị thực làm nền, lấy minh bạch làm nguyên tắc và lấy sự đồng hành cùng khách hàng làm trọng tâm."
      },
      {
        type: "image",
        src: "https://drive.google.com/file/d/1N7_B3KJBiowSKyPDkA4hOFv7J-qtuCo7/view?usp=drive_link", // ID ảnh 1.1 thực tế trong folder của bạn
        alt: "Hành trình xây dựng thương hiệu Nam Sơn Land"
      },
      {
        type: "text",
        content: "Thị trường bất động sản sau nhiều giai đoạn biến động đã thay đổi đáng kể cách người mua ra quyết định. Khách hàng ngày nay không chỉ hỏi dự án nằm ở đâu, giá bao nhiêu, chính sách thế nào. Họ quan tâm nhiều hơn đến tính phù hợp của sản phẩm, mức độ rõ ràng của thông tin, khả năng khai thác thực tế, yếu tố pháp lý cần kiểm chứng và mức độ an toàn của quyết định đầu tư. Nói cách khác, người mua bất động sản đang thận trọng hơn, tỉnh táo hơn và cần những doanh nghiệp bất động sản có trách nhiệm hơn trong cách phát triển, truyền tải và đồng hành cùng thị trường."
      },
      {
        type: "text",
        content: "Với Nam Sơn Land, sự đáng tin trước hết bắt đầu từ việc xác định đúng vai trò của mình. Trong vai trò một doanh nghiệp bất động sản đang xây dựng hệ sinh thái hoạt động, Nam Sơn Land định hướng phát triển trên ba trụ cột quan trọng: phân phối dự án bất động sản, tư vấn dự án và kết nối đầu tư. Đây không chỉ là các mảng dịch vụ, mà còn là ba điểm chạm quan trọng trong hành trình khách hàng tiếp cận, đánh giá và lựa chọn sản phẩm bất động sản."
      },
      {
        type: "text",
        content: "Ở vai trò phân phối bất động sản, Nam Sơn Land không nên chỉ được nhìn như một đơn vị giới thiệu sản phẩm ra thị trường. Giá trị của một đơn vị phân phối nằm ở khả năng đưa thông tin đến đúng người, đúng nhu cầu và đúng bối cảnh. Một sản phẩm bất động sản chỉ thật sự có ý nghĩa khi khách hàng hiểu rõ mình đang mua gì, vì sao sản phẩm đó phù hợp và đâu là những yếu tố cần cân nhắc trước khi ra quyết định."
      },
      {
        type: "image",
        src: "https://drive.google.com/file/d/1rGOIm8_I6MGq7Wnzj3cz6wNds7Cs9fqt", // ID ảnh 1.2
        alt: "Ba trụ cột chiến lược của Nam Sơn Land"
      },
      {
        type: "text",
        content: "Ở vai trò tư vấn dự án, điều quan trọng không phải là nói thật nhiều về ưu điểm, mà là giúp khách hàng nhìn bất động sản một cách đầy đủ hơn. Một người mua để ở sẽ có hệ tiêu chí khác với một nhà đầu tư. Một khách hàng tích sản dài hạn sẽ quan tâm khác với người tìm kiếm cơ hội khai thác dòng tiền. Nếu tư vấn chỉ dừng lại ở thông tin bề mặt, giao dịch có thể diễn ra nhanh, nhưng niềm tin khó có thể đi xa."
      },
      {
        type: "text",
        content: "Ở vai trò kết nối đầu tư, Nam Sơn Land hướng đến việc đưa sản phẩm, cơ hội và nhu cầu thị trường về gần nhau hơn. Trong bất động sản, một cơ hội tốt không chỉ nằm ở bản thân sản phẩm, mà còn nằm ở việc sản phẩm đó có được đặt đúng vào nhu cầu của khách hàng hay không. Bởi vậy, giá trị của sự kết nối không nằm ở việc tạo ra cảm xúc hứng khởi trong ngắn hạn, mà ở khả năng đưa chủ đầu tư, nhà đầu tư và người mua đến gần nhau hơn trên cơ sở thông tin minh bạch, nhu cầu phù hợp và kỳ vọng được đặt đúng chỗ."
      },
      {
        type: "text",
        content: "Từ những định hướng đầu tiên, Nam Sơn Land đang lựa chọn một cách tiếp cận thận trọng nhưng cần thiết: không bắt đầu bằng những tuyên bố về vị thế, mà bắt đầu bằng các giá trị nền như giá trị thực, minh bạch, thấu hiểu và đồng hành. Trong bất động sản, đây không phải là những khái niệm mới. Nhưng với một thương hiệu đang ở giai đoạn khởi nguồn, chúng chỉ có ý nghĩa khi được chứng minh qua từng việc cụ thể: cách cung cấp thông tin dự án, cách tư vấn theo đúng nhu cầu, cách giải thích chính sách, cách nói đúng mức về những yếu tố cần kiểm chứng và cách tiếp tục đồng hành cùng khách hàng sau mỗi giao dịch."
      },
      {
        type: "image",
        src: "https://drive.google.com/file/d/1n7p0Bd0Wo0xuNPIHNk0-z_kL0j2DWyZj/view?usp=drive_link", // ID ảnh 1.3 thực tế trong folder của bạn
        alt: "Sự minh bạch và đồng hành cùng khách hàng"
      },
      {
        type: "text",
        content: "Điều đó cũng đặt ra một yêu cầu rõ ràng cho Nam Sơn Land trong hành trình phía trước. Thương hiệu không thể xây dựng niềm tin chỉ bằng ngôn từ. Niềm tin cần được tích lũy qua từng điểm chạm: từ nội dung truyền thông, danh mục dự án, quy trình tư vấn, chất lượng thông tin đến trải nghiệm thực tế của khách hàng. Với một doanh nghiệp mới trong ngành bất động sản, đây là con đường không nhanh, nhưng là con đường bền."
      },
      {
        type: "text",
        content: "Sau cùng, điều Nam Sơn Land cần chứng minh không phải là mình lớn. Điều cần chứng minh là mình đáng tin. Bởi trong bất động sản, một thương hiệu có thể được biết đến nhờ truyền thông, nhưng chỉ có thể được lựa chọn lâu dài khi khách hàng cảm thấy họ được lắng nghe, được hiểu đúng và được đồng hành bằng sự minh bạch, trách nhiệm và tử tế."
      }
    ]
  },
  {
  id: "gia-tri-thuc-nen-mong-dau-tien-cua-nam-son-land",
  title: "Giá trị thực: nền móng đầu tiên trong cách Nam Sơn Land bước vào thị trường",
  image: "https://drive.google.com/file/d/1EjWJG2Yu-LiSGfjBgiTmLa9AjkNhOh_P/view?usp=drive_link",
  excerpt:
    "Sau nhiều biến động của thị trường, người mua bất động sản ngày càng thận trọng hơn. Giá trị thực vì thế trở thành nền tảng để Nam Sơn Land phát triển sản phẩm, truyền tải thông tin và tư vấn khách hàng một cách rõ ràng, thực tế và có trách nhiệm.",
  date: "13/07/2026",
  href: "#",
  contentBlocks: [
    {
      type: "text",
      content:
        "Trong bất động sản, giá trị của một tài sản không chỉ nằm ở vị trí, thiết kế hay những kỳ vọng tăng trưởng được nhắc đến trong các tài liệu bán hàng. Sau nhiều biến động của thị trường, người mua ngày càng thận trọng hơn trong cách tiếp cận thông tin. Họ không chỉ muốn biết một dự án có gì, mà còn muốn hiểu rõ hơn: giá trị đó có thật không, sản phẩm có phù hợp với nhu cầu của mình không, pháp lý cần kiểm chứng những gì, khả năng khai thác ra sao và quyết định xuống tiền có đang dựa trên dữ liệu hay chỉ là cảm xúc nhất thời."
    },
    {
      type: "text",
      content:
        "Trong bối cảnh ấy, việc Nam Sơn Land lựa chọn “giá trị thực” làm một trong những nền móng đầu tiên cho hành trình thương hiệu là một hướng đi cần thiết. Với một thương hiệu mới trong lĩnh vực bất động sản, điều quan trọng không phải là tạo ra những tuyên bố lớn ngay từ đầu, mà là xác lập một nguyên tắc phát triển đủ bền: mọi sản phẩm, mọi thông tin và mọi hoạt động tư vấn đều cần được đặt trên nền tảng rõ ràng, thực tế và có trách nhiệm với khách hàng."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1EjWJG2Yu-LiSGfjBgiTmLa9AjkNhOh_P/view?usp=drive_link",
      alt: "Giá trị thực là nền móng trong hành trình phát triển của Nam Sơn Land"
    },
    {
      type: "text",
      content:
        "“Giá trị thực” trong bất động sản không phải là một khái niệm xa lạ, nhưng lại là điều không dễ giữ vững trong một thị trường nhiều kỳ vọng. Một sản phẩm có giá trị thực cần được nhìn nhận từ nhiều lớp: vị trí có tạo ra kết nối thuận tiện hay không, pháp lý và thông tin dự án cần được kiểm tra ở mức nào, nhu cầu ở thực hoặc khai thác có hiện hữu hay không, mức giá có phù hợp với mặt bằng thị trường và khả năng tài chính của khách hàng hay không. Đó là những câu hỏi cơ bản, nhưng cũng là những câu hỏi giúp người mua tránh rơi vào quyết định vội vàng."
    },
    {
      type: "text",
      content:
        "Với một doanh nghiệp bất động sản, giá trị thực không chỉ nằm ở danh mục dự án được giới thiệu, mà còn nằm ở cách sản phẩm được lựa chọn, phát triển, phân tích và truyền tải đến thị trường. Điều quan trọng hơn là giúp khách hàng nhìn rõ giá trị thật của từng sản phẩm: vì sao sản phẩm đó đáng được xem xét, phù hợp với nhóm nhu cầu nào và đâu là những yếu tố cần kiểm chứng trước khi đưa ra quyết định."
    },
    {
      type: "text",
      content:
        "Ở góc độ tư vấn, giá trị thực cũng đòi hỏi sự thấu hiểu nhu cầu. Một khách hàng mua nhà để ở sẽ quan tâm nhiều đến môi trường sống, kết nối, tiện ích và sự ổn định lâu dài. Một nhà đầu tư sẽ nhìn sâu hơn vào dòng tiền, tính thanh khoản, tiềm năng khai thác và chu kỳ thị trường. Một người mua tích sản lại cần sự an toàn, tính bền vững và khả năng giữ giá trong dài hạn. Nếu mọi khách hàng đều được tư vấn bằng cùng một kịch bản, giao dịch có thể diễn ra nhanh hơn, nhưng chưa chắc đã tạo ra niềm tin lâu dài."
    },
    {
      type: "text",
      content:
        "Bởi vậy, khi Nam Sơn Land đặt giá trị thực làm nền móng, đó không nên chỉ là một thông điệp truyền thông. Giá trị này cần được chuyển hóa thành cách làm cụ thể: thông tin dự án được trình bày rõ ràng, lợi thế được phân tích đúng mức, những yếu tố cần kiểm chứng không bị bỏ qua, chính sách được giải thích dễ hiểu và khách hàng được hỗ trợ để hiểu đúng tài sản trước khi quyết định."
    },
    {
      type: "text",
      content:
        "Trong thị trường bất động sản, minh bạch và giá trị thực luôn đi cùng nhau. Minh bạch không có nghĩa là chỉ cung cấp nhiều thông tin, mà là cung cấp thông tin có ích, đúng trọng tâm và không tạo ra kỳ vọng vượt quá cơ sở hiện có. Một dự án có thể có tiềm năng, nhưng tiềm năng cần được nhìn trong điều kiện cụ thể. Một khu vực có thể có dư địa phát triển, nhưng dư địa đó cần được đánh giá cùng hạ tầng, nhu cầu dân cư, hoạt động thương mại và khả năng hấp thụ thực tế."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/171Fq2TFiGXih4irrXkBmCtrcYvfBBZq4/view?usp=drive_link",
      alt: "Minh bạch và giá trị thực trong hoạt động tư vấn bất động sản"
    },
    {
      type: "text",
      content:
        "Đối với một thương hiệu mới như Nam Sơn Land, chọn giá trị thực cũng là chọn một con đường dài hơn. Đây không phải là cách nhanh nhất để tạo tiếng vang, nhưng là cách phù hợp để xây dựng niềm tin. Bởi trong bất động sản, khách hàng có thể bị thu hút bởi truyền thông ban đầu, nhưng họ chỉ ở lại với thương hiệu khi cảm thấy mình được tư vấn đúng, được cung cấp thông tin rõ và được tôn trọng trong từng quyết định."
    },
    {
      type: "text",
      content:
        "Sau cùng, “giá trị thực” không phải là khẩu hiệu để Nam Sơn Land nói về mình, mà là tiêu chuẩn để thương hiệu này tự kiểm chứng trong từng hoạt động. Từ phân phối dự án, tư vấn dự án đến kết nối đầu tư, nếu Nam Sơn Land giữ được nguyên tắc ấy một cách nhất quán, thương hiệu sẽ có cơ sở để từng bước xây dựng vị trí của mình trên thị trường bất động sản bằng điều quan trọng nhất: niềm tin của khách hàng."
    }
  ]
},
{
  id: "phan-phoi-minh-bach-trong-bat-dong-san-nam-son-land-chon-cach-di-nao",
  title: "Phân phối minh bạch trong bất động sản: Nam Sơn Land chọn cách đi nào?",
  image: "https://drive.google.com/file/d/1PKtizYPPN7V7XeP6B-ZjOIcNDJryzIX2/view?usp=drive_link",
  excerpt:
    "Trong thị trường bất động sản, với Nam Sơn Land việc phân phối bất động sản không được nhìn như một hoạt động tách rời, mà là một cấu phần trong hệ sinh thái doanh nghiệp: từ tư duy phát triển sản phẩm, lựa chọn dự án, tổ chức thông tin đến kết nối sản phẩm với thị trường.",
  date: "13/07/2026",
  href: "#",
  contentBlocks: [
    {
      type: "text",
      content:
        "Trong thị trường bất động sản, với Nam Sơn Land việc phân phối bất động sản không được nhìn như một hoạt động tách rời, mà là một cấu phần trong hệ sinh thái doanh nghiệp: từ tư duy phát triển sản phẩm, lựa chọn dự án, tổ chức thông tin đến kết nối sản phẩm với thị trường. Đây là mắt xích đưa sản phẩm từ chủ đầu tư đến gần hơn với thị trường, giúp khách hàng tiếp cận thông tin, hiểu hơn về dự án và có thêm cơ sở để đưa ra quyết định. Tuy nhiên, khi thị trường bước qua những giai đoạn biến động, vai trò của một đơn vị phân phối bất động sản cũng không còn dừng lại ở việc giới thiệu sản phẩm hay truyền tải chính sách bán hàng. Điều được đặt ra nhiều hơn là cách doanh nghiệp tổ chức thông tin, lựa chọn sản phẩm và xây dựng niềm tin với thị trường."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1PKtizYPPN7V7XeP6B-ZjOIcNDJryzIX2/view?usp=drive_link",
      alt: "Hoạt động phân phối bất động sản minh bạch của Nam Sơn Land"
    },
    {
      type: "text",
      content:
        "Trong bối cảnh đó, Nam Sơn Land đang từng bước định hình vai trò của mình như một doanh nghiệp bất động sản hướng đến sự rõ ràng, thực tế và trách nhiệm. Là một thương hiệu ở giai đoạn khởi nguồn, Nam Sơn Land không chọn cách xuất hiện bằng những tuyên bố quá lớn. Thay vào đó, doanh nghiệp đặt trọng tâm vào những giá trị nền tảng: giá trị thực, sự minh bạch và khả năng đồng hành cùng thị trường bằng thông tin có cơ sở."
    },
    {
      type: "text",
      content:
        "Ở góc nhìn dài hạn, một đơn vị phân phối bất động sản không chỉ được đánh giá bằng số lượng dự án giới thiệu ra thị trường. Điều quan trọng hơn nằm ở chất lượng của những sản phẩm được lựa chọn, cách thông tin được truyền tải và mức độ phù hợp giữa sản phẩm với nhu cầu thực tế của khách hàng. Một bất động sản có thể sở hữu vị trí tốt, quy hoạch hấp dẫn hoặc dư địa phát triển đáng chú ý, nhưng những yếu tố đó chỉ thật sự có giá trị khi được đặt trong một bức tranh đầy đủ hơn: pháp lý, hạ tầng, nhu cầu sử dụng, khả năng khai thác và tiềm năng phát triển dài hạn."
    },
    {
      type: "text",
      content:
        "Đó là lý do “giá trị thực” trở thành một tiêu chí quan trọng trong định hướng phát triển của Nam Sơn Land. Giá trị thực không phải là một cụm từ để làm đẹp cho thông điệp truyền thông. Trong bất động sản, giá trị thực cần được thể hiện qua cách nhìn nhận sản phẩm một cách toàn diện: sản phẩm đó nằm ở đâu, phục vụ nhóm nhu cầu nào, có khả năng tạo giá trị sử dụng ra sao, những yếu tố nào đã rõ ràng và những yếu tố nào cần tiếp tục được kiểm chứng. Khi tiếp cận thị trường bằng góc nhìn này, hoạt động phân phối không chỉ tạo ra sự chú ý nhất thời, mà còn góp phần giúp người mua và nhà đầu tư hiểu đúng hơn về tài sản mà họ đang quan tâm."
    },
    {
      type: "text",
      content:
        "Song hành với giá trị thực là sự minh bạch. Trong một thị trường không thiếu dự án và cũng không thiếu những lời giới thiệu hấp dẫn, sự rõ ràng của thông tin dần trở thành tiêu chuẩn quan trọng hơn bao giờ hết. Người mua hôm nay không chỉ cần biết một sản phẩm đang được chào bán, mà cần hiểu sản phẩm ấy đang được đặt trong bối cảnh nào, giá trị nào là hiện hữu, giá trị nào còn cần thời gian kiểm chứng và đâu là cơ sở để đưa ra một quyết định đủ tỉnh táo."
    },
    {
      type: "text",
      content:
        "Với Nam Sơn Land, minh bạch không nên được hiểu đơn giản là cung cấp nhiều thông tin. Minh bạch là cung cấp thông tin đúng trọng tâm, đúng giới hạn và đúng khả năng kiểm chứng. Một khu vực có thể có dư địa phát triển, nhưng dư địa đó cần được nhìn cùng tiến độ hạ tầng, dòng dân cư, hoạt động thương mại và khả năng hấp thụ thực tế. Một dự án có thể có nhiều lợi thế, nhưng lợi thế ấy chỉ trở thành giá trị khi được phân tích trong điều kiện cụ thể, thay vì được đẩy lên thành những kỳ vọng vượt quá cơ sở hiện có."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1c5-Aw-z4ah0DxzsGry3VQr6Bm-Pzc3GY/view?usp=drive_link",
      alt: "Giá trị thực và sự minh bạch trong phân phối bất động sản"
    },
    {
      type: "text",
      content:
        "Từ góc độ doanh nghiệp, định hướng phân phối bất động sản dựa trên giá trị thực và minh bạch cũng là cách Nam Sơn Land xây dựng nền móng thương hiệu. Với một thương hiệu mới, niềm tin không thể hình thành chỉ qua lời giới thiệu. Niềm tin cần được tích lũy qua từng điểm chạm: cách doanh nghiệp lựa chọn sản phẩm, cách giới thiệu dự án, cách truyền tải thông tin, cách làm rõ những yếu tố cần kiểm chứng và cách duy trì trách nhiệm với thị trường."
    },
    {
      type: "text",
      content:
        "Điều này cũng cho thấy Nam Sơn Land không nên được nhìn đơn thuần như một đơn vị đưa sản phẩm ra thị trường. Vai trò lớn hơn của doanh nghiệp nằm ở khả năng kết nối giữa sản phẩm, chủ đầu tư, nhà đầu tư và người mua trên nền tảng thông tin rõ ràng hơn. Khi sự kết nối ấy được xây dựng đúng cách, hoạt động phân phối không còn là khâu bán hàng cuối cùng, mà trở thành một phần trong quá trình tạo dựng giá trị cho toàn bộ chuỗi bất động sản."
    },
    {
      type: "text",
      content:
        "Trong giai đoạn khởi nguồn, con đường của Nam Sơn Land chắc chắn cần thêm thời gian để được thị trường kiểm chứng. Nhưng chính vì vậy, lựa chọn đi từ giá trị thực và minh bạch lại càng có ý nghĩa. Đây không phải là cách nhanh nhất để tạo tiếng vang, nhưng là cách phù hợp để một doanh nghiệp bất động sản xây dựng niềm tin một cách bền vững."
    },
    {
      type: "text",
      content:
        "Sau cùng, một đơn vị phân phối bất động sản muốn đi đường dài không chỉ cần sản phẩm tốt, mà cần một cách làm đủ rõ ràng và nhất quán. Với Nam Sơn Land, việc hướng đến giá trị thực và minh bạch không chỉ là định hướng hoạt động, mà còn là lời nhắc về con đường thương hiệu cần kiên trì: phát triển bằng trách nhiệm thông tin, bằng sự cẩn trọng trong từng sản phẩm và bằng niềm tin được xây dựng từ những điều có thể kiểm chứng."
    }
  ]
},
{
  id: "khi-tu-van-tro-thanh-mot-nang-luc-thuong-hieu-cua-nam-son-land",
  title: "Khi tư vấn trở thành một năng lực thương hiệu của Nam Sơn Land",
  image: "https://drive.google.com/file/d/1MvY8LV4nKWzGYvHR5Sm3u8g20RmX2N2P/view?usp=drive_link",
  excerpt:
    "Trong bất động sản, khi thị trường ngày càng thận trọng, vai trò của tư vấn không còn là phần hỗ trợ phía sau hoạt động bán hàng, mà dần trở thành một năng lực quan trọng của doanh nghiệp bất động sản.",
  date: "13/07/2026",
  href: "#",
  contentBlocks: [
    {
      type: "text",
      content:
        "Trong bất động sản, không phải mọi quyết định đều bắt đầu từ câu hỏi “sản phẩm này có gì?”. Rất nhiều quyết định thực chất bắt đầu từ những băn khoăn sâu hơn: sản phẩm này có phù hợp không, giá trị nào đã rõ, yếu tố nào cần kiểm chứng, kỳ vọng nào có cơ sở và đâu là rủi ro cần được nhìn nhận trước khi đi xa hơn. Khi thị trường ngày càng thận trọng, vai trò của tư vấn vì thế không còn là phần hỗ trợ phía sau hoạt động bán hàng, mà dần trở thành một năng lực quan trọng của doanh nghiệp bất động sản."
    },
    {
      type: "text",
      content:
        "Với Nam Sơn Land, tư vấn không chỉ dừng ở việc truyền tải thông tin dự án. Đó còn là năng lực giúp doanh nghiệp hiểu đúng sản phẩm, hiểu đúng nhu cầu thị trường và kết nối các cơ hội bất động sản trên nền tảng rõ ràng, thực tế và có trách nhiệm."
    },
    {
      type: "text",
      content:
        "Một sản phẩm bất động sản có thể được giới thiệu bằng nhiều lợi thế: vị trí, quy hoạch, tiện ích, chính sách, khả năng khai thác hoặc tiềm năng dài hạn. Nhưng nếu những lợi thế ấy chỉ được truyền tải như các điểm cộng riêng lẻ, người mua rất dễ tiếp cận sản phẩm bằng cảm xúc nhất thời. Tư vấn có chiều sâu đòi hỏi một cách nhìn khác: đặt sản phẩm vào bối cảnh đầy đủ hơn, từ hạ tầng, pháp lý cần kiểm chứng, nhu cầu sử dụng, khả năng tài chính đến mục tiêu nắm giữ tài sản của từng nhóm khách hàng."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1MvY8LV4nKWzGYvHR5Sm3u8g20RmX2N2P/view?usp=drive_link",
      alt: "Hoạt động tư vấn bất động sản tại Nam Sơn Land"
    },
    {
      type: "text",
      content:
        "Đó cũng là điểm khiến tư vấn trở thành một năng lực thương hiệu, chứ không chỉ là kỹ năng giao tiếp của đội ngũ bán hàng. Một doanh nghiệp bất động sản có năng lực tư vấn cần biết cách đặt câu hỏi trước khi đưa ra khuyến nghị. Khách hàng mua để ở sẽ quan tâm đến môi trường sống, kết nối, tiện ích và sự ổn định lâu dài. Nhà đầu tư quan tâm nhiều hơn đến khả năng khai thác, tính thanh khoản, biên độ kỳ vọng và chu kỳ thị trường. Người mua tích sản lại cần sự an toàn, tính bền vững và khả năng giữ giá trong dài hạn. Mỗi nhóm nhu cầu khác nhau cần một cách phân tích khác nhau."
    },
    {
      type: "text",
      content:
        "Với Nam Sơn Land, xây dựng vai trò tư vấn cũng là cách để doanh nghiệp tạo sự khác biệt trong giai đoạn khởi nguồn thương hiệu. Thay vì chỉ xuất hiện như một đơn vị đưa sản phẩm ra thị trường, Nam Sơn Land có thể từng bước định hình mình như một doanh nghiệp giúp thị trường hiểu sản phẩm đúng hơn. Điều này đặc biệt quan trọng trong bối cảnh bất động sản không còn là cuộc chơi của những kỳ vọng ngắn hạn, mà ngày càng đòi hỏi sự tỉnh táo, dữ liệu và khả năng kiểm chứng."
    },
    {
      type: "text",
      content:
        "Tư vấn tốt không có nghĩa là làm cho sản phẩm trở nên hoàn hảo trong mắt người mua. Ngược lại, tư vấn có trách nhiệm là giúp khách hàng nhìn thấy cả điểm mạnh, điều kiện phù hợp và những yếu tố cần tìm hiểu kỹ hơn. Một khu vực có thể có dư địa phát triển, nhưng dư địa đó cần được đặt cạnh tiến độ hạ tầng, mật độ dân cư, sức mua và hoạt động thương mại thực tế. Một dự án có thể có nhiều lợi thế, nhưng lợi thế chỉ thật sự có giá trị khi phù hợp với nhu cầu và năng lực tài chính của người sở hữu."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1gCeUfpCwFGZu8V4C9ULWnPcaqtl4lYNh/view?usp=drive_link",
      alt: "Tư vấn bất động sản dựa trên giá trị thực và trách nhiệm"
    },
    {
      type: "text",
      content:
        "Từ góc nhìn thương hiệu, đây là con đường không nhanh nhưng bền. Niềm tin trong bất động sản không được tạo ra chỉ bằng thông điệp đẹp, mà bằng cách doanh nghiệp lặp lại những việc đúng trong từng điểm chạm: cung cấp thông tin rõ ràng, phân tích đúng mức, không biến tiềm năng thành cam kết và không đẩy kỳ vọng vượt quá cơ sở hiện có. Khi những nguyên tắc ấy được duy trì, tư vấn không còn là một hoạt động phụ trợ, mà trở thành một phần trong bản sắc vận hành của doanh nghiệp."
    },
    {
      type: "text",
      content:
        "Sau cùng, điều Nam Sơn Land cần xây không chỉ là khả năng phân phối sản phẩm, mà là năng lực giúp thị trường tiếp cận bất động sản một cách rõ ràng và tỉnh táo hơn. Khi tư vấn được đặt đúng vị trí, doanh nghiệp không chỉ kết nối sản phẩm với người mua, mà còn góp phần xây dựng niềm tin bằng sự thấu hiểu, trách nhiệm thông tin và giá trị thực. Đó cũng là nền tảng để Nam Sơn Land từng bước khẳng định hình ảnh một doanh nghiệp bất động sản đáng tin trong hành trình phát triển dài hạn."
    }
  ]
},
{
  id: "giua-chu-dau-tu-nha-dau-tu-va-nguoi-mua-nam-son-land-dung-o-dau",
  title: "Giữa chủ đầu tư, nhà đầu tư và người mua, Nam Sơn Land đứng ở đâu?",
  image: "https://drive.google.com/file/d/1rrbkhReOB1ZR_rqWYLgXoUUMpt_TSdPv/view?usp=drive_link",
  excerpt:
    "Trong bất động sản, mỗi sản phẩm khi bước ra thị trường đều nằm trong một chuỗi quan hệ rộng hơn. Với Nam Sơn Land, vai trò của doanh nghiệp không chỉ là phân phối, mà còn là kết nối giữa chủ đầu tư, nhà đầu tư và người mua trên nền tảng giá trị thực và sự minh bạch.",
  date: "13/07/2026",
  href: "#",
  contentBlocks: [
    {
      type: "text",
      content:
        "Trong bất động sản, mỗi sản phẩm khi bước ra thị trường đều nằm trong một chuỗi quan hệ rộng hơn. Phía sau một dự án là tư duy phát triển, nguồn lực triển khai, định hướng quy hoạch và kỳ vọng của chủ đầu tư. Phía trước dự án là nhu cầu của người mua, khẩu vị của nhà đầu tư, khả năng hấp thụ của thị trường và những tiêu chuẩn ngày càng cao về thông tin, pháp lý, công năng và giá trị sử dụng."
    },
    {
      type: "text",
      content:
        "Chính vì vậy, câu hỏi đặt ra cho một doanh nghiệp bất động sản không chỉ là “đang bán sản phẩm gì”, mà còn là “đang đứng ở đâu trong chuỗi giá trị đó”. Với Nam Sơn Land, vai trò này cần được nhìn rộng hơn một hoạt động phân phối đơn thuần. Doanh nghiệp đang từng bước xây dựng vị trí của mình như một điểm kết nối giữa sản phẩm, chủ đầu tư, nhà đầu tư và người mua trên nền tảng thông tin rõ ràng, kỳ vọng phù hợp và giá trị thực."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1rrbkhReOB1ZR_rqWYLgXoUUMpt_TSdPv/view?usp=drive_link",
      alt: "Nam Sơn Land kết nối chủ đầu tư, nhà đầu tư và người mua"
    },
    {
      type: "text",
      content:
        "Ở phía chủ đầu tư, điều quan trọng không chỉ là đưa sản phẩm ra thị trường, mà là đưa sản phẩm đến đúng nhóm nhu cầu, đúng bối cảnh và đúng cách tiếp cận. Một dự án có thể sở hữu nhiều lợi thế, nhưng nếu thông tin được truyền tải thiếu trọng tâm, thị trường sẽ khó hiểu đúng giá trị. Ngược lại, khi sản phẩm được phân tích trong mối liên hệ với quy hoạch, hạ tầng, nhu cầu sử dụng và khả năng khai thác, giá trị của dự án sẽ được tiếp nhận một cách rõ ràng hơn."
    },
    {
      type: "text",
      content:
        "Ở phía nhà đầu tư, bất động sản không chỉ là tài sản để mua, mà còn là một quyết định cần được cân nhắc trong dòng vốn, thời gian nắm giữ và kỳ vọng sinh lời. Nhà đầu tư ngày nay không còn dễ bị thuyết phục bởi những lời hứa tăng trưởng chung chung. Họ cần hiểu đâu là giá trị hiện hữu, đâu là dư địa cần thời gian kiểm chứng, đâu là yếu tố có thể tạo thanh khoản và đâu là rủi ro phải tính trước. Đây là lúc vai trò kết nối đầu tư cần đi cùng năng lực phân tích và trách nhiệm thông tin."
    },
    {
      type: "text",
      content:
        "Ở phía người mua để ở, câu chuyện lại khác. Một sản phẩm phù hợp không chỉ nằm ở giá bán hay chính sách thanh toán, mà còn ở khả năng phục vụ cuộc sống thực tế: vị trí có thuận tiện không, môi trường sống có đủ ổn định không, tiện ích có đáp ứng nhu cầu gia đình không và tài sản đó có tạo cảm giác an tâm trong dài hạn hay không. Nếu nhà đầu tư quan tâm đến hiệu quả tài sản, người mua để ở lại cần nhiều hơn một nơi có thể gắn bó."
    },
    {
      type: "text",
      content:
        "Giữa những nhu cầu khác nhau đó, Nam Sơn Land không nên được nhìn như một bên đứng giữa để truyền thông tin một chiều. Vai trò đúng hơn là tổ chức điểm gặp giữa các bên: giúp sản phẩm được đặt trong đúng bối cảnh, giúp nhà đầu tư tiếp cận cơ hội bằng dữ liệu rõ hơn, giúp người mua hiểu tài sản bằng nhu cầu thật hơn và giúp thị trường nhìn nhận bất động sản một cách tỉnh táo hơn."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1c3_-5FBdnkI_o4FrqIYfeclkua1LjWf9/view?usp=drive_link",
      alt: "Nam Sơn Land tạo giá trị kết nối trong hệ sinh thái bất động sản"
    },
    {
      type: "text",
      content:
        "Điều này đòi hỏi doanh nghiệp phải giữ được sự cân bằng. Nếu chỉ nói theo góc nhìn của sản phẩm, bài toán thị trường dễ bị một chiều. Nếu chỉ chạy theo kỳ vọng của nhà đầu tư, giá trị sử dụng thực tế có thể bị xem nhẹ. Nếu chỉ tập trung vào cảm xúc của người mua, những yếu tố cần kiểm chứng như pháp lý, hạ tầng, thanh khoản hay khả năng khai thác lại dễ bị bỏ qua. Một vai trò kết nối có trách nhiệm cần dung hòa được cả ba phía đó."
    },
    {
      type: "text",
      content:
        "Với Nam Sơn Land, đây cũng là một phần trong quá trình xây dựng niềm tin thương hiệu. Là một doanh nghiệp bất động sản đang ở giai đoạn khởi nguồn, Nam Sơn Land cần được thị trường nhận diện không bằng những tuyên bố về quy mô, mà bằng cách doanh nghiệp tổ chức thông tin, lựa chọn sản phẩm, phân tích cơ hội và kết nối các bên bằng sự minh bạch. Niềm tin không đến từ việc đứng ở vị trí trung gian, mà đến từ việc tạo ra giá trị thực trong từng điểm kết nối."
    },
    {
      type: "text",
      content:
        "Sau cùng, giữa chủ đầu tư, nhà đầu tư và người mua, Nam Sơn Land không chỉ đứng ở vai trò cầu nối. Điều quan trọng hơn là doanh nghiệp cần từng bước chứng minh khả năng làm cho sự kết nối ấy trở nên có giá trị: rõ ràng hơn về thông tin, thực tế hơn về kỳ vọng và bền vững hơn trong cách tiếp cận thị trường bất động sản. Đó là nền tảng để Nam Sơn Land xây dựng hình ảnh một doanh nghiệp bất động sản đáng tin trong hành trình dài hạn."
    }
  ]
},
{
  id: "truoc-trong-va-sau-giao-dich-nam-son-land-dong-hanh-the-nao",
  title: "Trước, trong và sau giao dịch, Nam Sơn Land đồng hành thế nào?",
  image: "https://drive.google.com/file/d/1JIVe4HN4gNQC-84-HWbKvORMKTkINkmw/view?usp=drive_link",
  excerpt:
    "Trong bất động sản, một giao dịch không bắt đầu ở thời điểm ký hợp đồng và cũng không kết thúc ngay sau khi sản phẩm được lựa chọn. Với Nam Sơn Land, sự đồng hành cùng khách hàng cần được đặt trong cả ba giai đoạn: trước, trong và sau giao dịch.",
  date: "13/07/2026",
  href: "#",
  contentBlocks: [
    {
      type: "text",
      content:
        "Trong bất động sản, một giao dịch không bắt đầu ở thời điểm ký hợp đồng và cũng không kết thúc ngay sau khi sản phẩm được lựa chọn. Phía sau mỗi quyết định là cả một quá trình tìm hiểu, cân nhắc, so sánh, kiểm chứng và đặt niềm tin. Với những tài sản có giá trị lớn, khách hàng không chỉ cần một sản phẩm phù hợp, mà còn cần cảm giác được đồng hành đủ rõ ràng trong suốt hành trình ra quyết định."
    },
    {
      type: "text",
      content:
        "Đây cũng là lý do vai trò của một doanh nghiệp bất động sản ngày nay không nên chỉ được nhìn ở khoảnh khắc bán hàng. Thị trường đã thay đổi, khách hàng cũng thận trọng hơn. Họ quan tâm nhiều hơn đến thông tin dự án, pháp lý cần kiểm chứng, tính phù hợp với nhu cầu, khả năng khai thác, dòng tiền, môi trường sống và những yếu tố có thể ảnh hưởng đến giá trị tài sản trong dài hạn."
    },
    {
      type: "text",
      content:
        "Với Nam Sơn Land, hành trình đồng hành cùng khách hàng cần được đặt trong một cấu trúc rộng hơn: trước giao dịch, trong giao dịch và sau giao dịch. Đây không chỉ là quy trình chăm sóc khách hàng, mà còn là cách một doanh nghiệp bất động sản xây dựng niềm tin bằng trách nhiệm, sự thấu hiểu nhu cầu và khả năng hỗ trợ thông tin giúp khách hàng nhìn tài sản một cách tỉnh táo hơn."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/1JIVe4HN4gNQC-84-HWbKvORMKTkINkmw/view?usp=drive_link",
      alt: "Nam Sơn Land đồng hành cùng khách hàng trước giao dịch"
    },
    {
      type: "text",
      content:
        "Trước giao dịch, điều quan trọng nhất là giúp khách hàng hiểu đúng bối cảnh. Một người mua để ở sẽ cần những dữ liệu khác với một nhà đầu tư. Một người mua tích sản dài hạn sẽ quan tâm khác với người tìm kiếm cơ hội khai thác thương mại. Nếu mọi khách hàng đều được tiếp cận bằng cùng một cách nói, thông tin có thể nhiều nhưng chưa chắc đã có ích. Vì vậy, đồng hành ở giai đoạn đầu không phải là thúc đẩy quyết định nhanh hơn, mà là giúp khách hàng đặt đúng câu hỏi: mình mua để làm gì, sản phẩm nào phù hợp, yếu tố nào đã rõ và yếu tố nào cần tìm hiểu kỹ hơn."
    },
    {
      type: "text",
      content:
        "Trong giao dịch, sự đồng hành cần được thể hiện ở tính rõ ràng và nhất quán. Bất động sản là lĩnh vực có nhiều lớp thông tin: chính sách bán hàng, tiến độ thanh toán, hồ sơ pháp lý, quy trình đặt cọc, ký kết, quyền lợi và nghĩa vụ của các bên. Nếu thông tin được truyền tải thiếu hệ thống, khách hàng dễ rơi vào cảm giác mơ hồ, dù sản phẩm có thể vẫn đáng quan tâm. Với Nam Sơn Land, đây là giai đoạn mà sự minh bạch cần được đặt lên hàng đầu: giải thích đúng mức, cung cấp thông tin đúng trọng tâm và không biến kỳ vọng thành cam kết khi chưa có cơ sở kiểm chứng."
    },
    {
      type: "text",
      content:
        "Sau giao dịch, sự đồng hành lại mang một ý nghĩa khác. Khách hàng không chỉ cần được hỗ trợ để hoàn tất thủ tục, mà còn cần tiếp tục được cập nhật, hướng dẫn và kết nối với những thông tin liên quan đến tài sản của mình. Với người mua để ở, đó có thể là quá trình chuẩn bị nhận bàn giao, hoàn thiện không gian sống hoặc nắm bắt các tiện ích vận hành. Với nhà đầu tư, đó có thể là việc theo dõi thị trường, đánh giá khả năng khai thác hoặc nhìn lại hiệu quả của quyết định đã đưa ra. Dù ở nhóm nhu cầu nào, sự đồng hành sau giao dịch đều góp phần kéo dài niềm tin vượt ra ngoài một lần mua bán."
    },
    {
      type: "image",
      src: "https://drive.google.com/file/d/18CRtWMlSirXZ66VV4N9IO0bDYggYIvcK/view?usp=drive_link",
      alt: "Nam Sơn Land đồng hành cùng khách hàng sau giao dịch"
    },
    {
      type: "text",
      content:
        "Điều đáng nói là, đồng hành không có nghĩa là thay khách hàng quyết định. Một doanh nghiệp bất động sản có trách nhiệm không nên tạo cảm giác mọi sản phẩm đều phù hợp với mọi người. Ngược lại, giá trị của sự đồng hành nằm ở việc giúp khách hàng hiểu rõ hơn lựa chọn của mình: đâu là lợi thế, đâu là điều kiện phù hợp, đâu là rủi ro cần cân nhắc và đâu là kỳ vọng cần được đặt đúng chỗ."
    },
    {
      type: "text",
      content:
        "Với một thương hiệu đang ở giai đoạn khởi nguồn như Nam Sơn Land, hành trình trước, trong và sau giao dịch cũng là hành trình tự xây dựng uy tín. Niềm tin không thể được tạo ra chỉ bằng hình ảnh thương hiệu hay những lời giới thiệu đẹp. Niềm tin cần được tích lũy qua từng điểm chạm nhỏ: một thông tin được giải thích rõ, một chính sách được làm sáng nghĩa, một nhu cầu được lắng nghe đúng và một kỳ vọng được cân chỉnh kịp thời."
    },
    {
      type: "text",
      content:
        "Sau cùng, đồng hành cùng khách hàng trong bất động sản không phải là một khẩu hiệu chăm sóc. Đó là cách doanh nghiệp chứng minh mình hiểu giá trị của mỗi quyết định tài sản. Khi Nam Sơn Land đặt sự đồng hành vào cả ba giai đoạn trước, trong và sau giao dịch, thương hiệu không chỉ hướng đến việc kết nối sản phẩm với khách hàng, mà còn hướng đến việc xây dựng một mối quan hệ dài hạn dựa trên sự rõ ràng, trách nhiệm và niềm tin."
    }
  ]
}
];

export const newsArticles: NewsArticle[] = rawNewsArticles.map(normalizeNewsArticle);

export const featuredNews: NewsArticle = newsArticles[0];
export const secondaryNews: NewsArticle[] = newsArticles.slice(1, 5);

export function getNewsArticleById(id: string) {
  return newsArticles.find((article) => article.id === id) ?? null;
}

export function getNewsArticleHref(id: string) {
  return `/tin-tuc?article=${id}`;
}
