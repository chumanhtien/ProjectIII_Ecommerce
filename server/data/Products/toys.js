const toysProducts = [
    {
      // _id: "1",
      category: "toys",
      name: "Con Vịt vặn dây cót",
      image: "/images/toys/2023_1.png",
      description: `Đồ chơi có thiết kế hình chú vịt con dễ thương đi xe máy.
      Điều thú vị và độc đáo là bé chỉ cần nhấn vô đầu vịt, thả tay ra và chu vịt sẽ chạy về phía trước.
      Chất liệu nhựa ABS, thiết kế cao cấp, bề mặt trơn bóng, rất an toàn để cho bé chơi.
      Khả năng giảm stress cao, đặt trong xe hơi, bàn học, bàn làm việc... bạn có thể giải tỏa căng thẳng bất cứ lúc nào.
      `,
      productInfoDetail:{
        origin: "Trung Quốc",
        size: "10x10x13(Cao) (cm)",
        material: "Nhựa an toàn không độc hại",
        applicationAge: "1-5 tuổi",
      },
      price: 89,
      countInStock: 300,
      rating: 4,
      numReviews: 4,
    },
    {
      // _id: "2",
      category: "toys",
      name: "Ô tô đồ chơi địa hình",
      image: "/images/toys/2023_2.png",
      description: `Là dòng địa hình siêu khỏe dù chạy bằng đà đẩy. 
      Vượt mọi địa hình tốc độ mạnh mẽ.
      Sản phẩm cực kì đáng tiền nhất trong các dòng xe shop bán.
      Nhựa PU chịu lực thách thức mọi va đập nên khả năng bền rất cao. 
      Bé xíu cũng chơi được - dành cho mọi lứa tuổi. 
      Trên thân xe màu hiphop traffiti bắt mắt. 
      `,
      productInfoDetail:{
        origin: "Trung Quốc",
        size: "8x8, 5x9 (cm)",
        material: "Nhựa PU",
        applicationAge: "Lớn hơn 3 tuổi",
      },
      price: 99,
      countInStock: 10,
      rating: 2,
      numReviews: 2,
    },
    {
      // _id: "3",
      category: "toys",
      name: "Mô hình OnePiece Luffy",
      image: "/images/toys/2023_3.png",
      description: `Mô hình One Piece nhân vật Luffy phiên bản Battle Ver đồ chơi mô hình nhân vật One Piece để bàn trang trí.
      Mô hình nhân vật Luffy, Zoro, Sanji, Ace không thể thiếu cho những fan hâm mộ anime, đặc biệt là bộ truyện tranh One Piece.`,
        productInfoDetail:{
          origin: "Trung Quốc",
          size: "18cm (Cao)",
          material: "Nhựa PVC cao cấp",
          applicationAge: "Lớn hơn 4 tuổi",
        },
      price: 59,
      countInStock: 10,
      rating: 3.5,
      numReviews: 3,
    },
    {
      // _id: "4",
      category: "toys",
      name: "Mô hình OnePiece Sanji",
      image: "/images/toys/2023_4.png",
      description: `Mô hình One Piece nhân vật Sanji phiên bản Battle Ver đồ chơi mô hình nhân vật One Piece để bàn trang trí.
      Mô hình nhân vật Luffy, Zoro, Sanji, Ace không thể thiếu cho những fan hâm mộ anime, đặc biệt là bộ truyện tranh One Piece.`,
        productInfoDetail:{
          origin: "Trung Quốc",
          size: "17cm (Cao)",
          material: "Nhựa PVC cao cấp",
          applicationAge: "Lớn hơn 4 tuổi",
        },
      price: 29,
      countInStock: 10,
      rating: 5,
      numReviews: 9,
    },
    {
      // _id: "5",
      category: "toys",
      name: "Mô hình OnePiece Zoro",
      image: "/images/toys/2023_5.png",
      description: `Mô hình One Piece nhân vật Zoro phiên bản Battle Ver đồ chơi mô hình nhân vật One Piece để bàn trang trí. \n Mô hình nhân vật Luffy, Zoro, Sanji, Ace không thể thiếu cho những fan hâm mộ anime, đặc biệt là bộ truyện tranh One Piece.`,
      productInfoDetail: {
        origin: "Trung Quốc",
        size: "18cm (Cao)",
        material: "Nhựa PVC cao cấp",
        applicationAge: "Lớn hơn 4 tuổi",
      },
      price: 29,
      countInStock: 7,
      rating: 2,
      numReviews: 2,
    },
    {
      // _id: "6",
      category: "toys",
      name: "Mô hình OnePiece Ace",
      image: "/images/toys/2023_6.png",
      description: `Mô hình One Piece nhân vật Ace phiên bản Battle Ver đồ chơi mô hình nhân vật One Piece để bàn trang trí.
      Mô hình nhân vật Luffy, Zoro, Sanji, Ace không thể thiếu cho những fan hâm mộ anime, đặc biệt là bộ truyện tranh One Piece.`,
        productInfoDetail:{
          origin: "Trung Quốc",
          size: "15cm (Cao)",
          material: "Nhựa PVC cao cấp",
          applicationAge: "Lớn hơn 4 tuổi",
        },
      price: 49,
      countInStock: 100,
      rating: 0,
      numReviews: 0,
    },
    {
        // _id: "7",
        category: "toys",
        name: "Xe thả hình khối",
        image: "/images/toys/2023_7.png",
        description: `Xe thả hình được làm từ gỗ quế tự nhiên, lớp sơn tĩnh điện an toàn cho bé trong quá trình sử dụng.
        Với các khối hình khác nhau, và các màu sắc quy định cho từng khối hình khác nhau giúp bé phân biệt các khối hình và màu sắc khác nhau một cách nhanh nhất, thông minh nhất và chính xác nhất.
        Xe thả hình là đồ đồ chơi trẻ em bằng gỗ hàng Việt Nam chất lượng cao, đây sẽ là món quà ý nghĩa vừa tiết kiệm kinh tế vừa có tác dụng giáo dục dành cho thiên thần đáng yêu của bạn làm quen với toán học.`,
        productInfoDetail:{
          origin: "Việt Nam",
          size: "23x12x10 (cm) - 700g",
          material: "Gỗ",
          applicationAge: "1-3 tuổi",
        },
        price: 29,
        countInStock: 100,
        rating: 0,
        numReviews: 0,
      },
  ];
  
  export default toysProducts;
  