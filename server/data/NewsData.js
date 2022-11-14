const newsData = [
    {
        source: {
          id: "engadget",
          name: "Engadget"
        },
        author: "Kris Holt",
        title: "New York passes a bill to limit bitcoin mining",
        description: "New York lawmakers have passed a bill\r\n that would temporarily ban new bitcoin\r\n mining operations. Early on Friday, state senators voted 36-27 to pass the legislation. It's now bound for the desk of Governor Kathy Hochul, who will sign it into law or veto th…",
        url: "https://www.engadget.com/new-york-cryptocurrency-bill-bitcoin-mining-climate-change-161126292.html",
        urlToImage: "https://s.yimg.com/os/creatr-uploaded-images/2021-05/a8217250-bdfa-11eb-bfc4-2663225cea83",
        publishedAt: "2022-06-03T16:11:26Z",
        content: "New York lawmakers have passed a bill\r\n that would temporarily ban new bitcoin\r\n mining operations. Early on Friday, state senators voted 36-27 to pass the legislation. It's now bound for the desk of… [+2036 chars]"
    },
    {
      source: {
        id: "noibo",
        name: "Nội bộ"
      },
      author: "EcommerceShop",
      title: "Siêu Sales ngày 6.6",
      description: "Chào đón ngày hội mua sắm 6/6/2022\r\n Có rất nhiều mặt hàng khuyến mãi lớn đang chờ bạn…",
      url: "/news/noibo",
      urlToImage: "https://mypromo.my/wp-content/uploads/2020/05/Screenshot_2020-05-27-Shopee-Malaysia-Free-Shipping-Across-Malaysia.png",
      content: "Siêu sales 6.6 - Đại hội mua sắm\r\n Tới đây, từ ngày 5.6.2022 đến ngày 6.6.2022, Ecommerce Shop giảm giá rất nhiều mặt hàng.\r\n Quý khách hãy vào Trang chủ và đặt những đơn hàng yêu thích với khuyến mại lớn nào!"
    },
    {
      source: {
        id: "noibo",
        name: "Nội bộ"
      },
      author: "EcommerceShop",
      title: "Siêu Sales ngày 7.7",
      description: "Chào đón ngày hội mua sắm 7/7/2022\r\n Có rất nhiều mặt hàng khuyến mãi lớn đang chờ bạn…",
      url: "/news/noibo",
      urlToImage: "https://th.bing.com/th/id/OIP.-BacI6rEmeYq3hJ5JCSIcAHaEU?pid=ImgDet&rs=1",
      content: "Siêu sales 7.7 - Đại hội mua sắm\r\n Tới đây, từ ngày 5.7.2022 đến ngày 7.7.2022, Ecommerce Shop giảm giá rất nhiều mặt hàng khác nhau.\r\n Quý khách hãy vào Trang chủ và đặt những đơn hàng yêu thích với khuyến mại lớn nào! Kính chúc quý khách mạnh khỏe, hạnh phúc"
    },
    {
      source: {
        id: "noibo",
        name: "Nội bộ"
      },
      author: "EcommerceShop",
      title: "Chúc mừng ngày Lễ Tết Đoan Ngọ 5.5 Âm lịch",
      description: "Chào đón ngày Lễ Tết Nguyên Tiêu\r\n Có rất nhiều mặt hàng khuyến mãi lớn đang chờ bạn…",
      url: "/news/noibo",
      urlToImage: "https://hanngutracviet.com/uploads/tai-lieu/2021_06/4d005838e84c1c12455d.jpg",
      content: "Tết Đoan Ngọ 5.5 Âm lịch\r\n Tới đây, từ ngày 5.6.2022 đến ngày 7.6.2022, Ecommerce Shop giảm giá Tất cả các mặt hàng Mẹ và Bé để hưởng ứng ngày lễ hội Tết Đoan Ngọ. Đặc biệt tất cả các sản phẩm có nguồn gốc từ Trung Quốc sẽ được giảm giá 40%\r\n Quý khách hãy vào Trang chủ và đặt những đơn hàng yêu thích với khuyến mại lớn nào! Kính chúc quý khách mạnh khỏe, hạnh phúc"
    },
    {
        source: {
          id: "wired",
          name: "Wired"
        },
        author: "Arielle Pardes",
        title: "Miami’s Bitcoin Conference Left a Trail of Harassment",
        description: "For some women, inappropriate conduct from other conference-goers continued to haunt them online.",
        url: "https://www.wired.com/story/bitcoin-2022-conference-harassment/",
        urlToImage: "https://media.wired.com/photos/627a89e3e37e715cb7d760d2/191:100/w_1280,c_limit/Bitcoin_Miami_Biz_GettyImages-1239817123.jpg",
        publishedAt: "2022-05-10T16:59:46Z",
        content: "Now, even though there are a number of women-focused crypto spaces, Odeniran says women are still underrepresented. Ive been in spaces where Im the only Black person, or the only woman, or the only B… [+3828 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "https://www.facebook.com/bbcnews",
        title: "Why the Central African Republic adopted Bitcoin",
        description: "Some 90% of people in the Central African Republic lack access to the internet, needed to use Bitcoin.",
        url: "https://www.bbc.co.uk/news/world-africa-61565485",
        urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/394F/production/_125017641_gettyimages-1320532557.jpg",
        publishedAt: "2022-06-05T23:03:49Z",
        content: "Image caption, President Faustin-Archange Touadéra wants to rethink his country's economic philosophy\r\nThe Central African Republic's decision to adopt Bitcoin as legal tender came as a surprise to m… [+8881 chars]"
      },
      {
        source: {
          "id": "engadget",
          "name": "Engadget"
        },
        autho: "Mariella Moon",
        title: "Chipotle now accepts cryptocurrency payments",
        description: "You can now reportedly pay for your burritos and tacos with Bitcoin and other digital currencies, in case you don't mind spending your coins directly instead of going through exchanges first. Flexa has announced that the Mexican fast food chain can now accept…",
        url: "https://www.engadget.com/chipotle-accepts-cryptocurrency-payments-123013632.html",
        urlToImage: "https://s.yimg.com/os/creatr-images/2019-11/62e01e20-0493-11ea-bffd-0d62f5b23b7c",
        publishedAt: "2022-06-02T12:30:13Z",
        content: "You can now reportedly pay for your burritos and tacos with Bitcoin and other digital currencies, in case you don't mind spending your coins directly instead of going through exchanges first. Flexa h… [+1428 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "https://www.facebook.com/bbcnews",
        title: "Bitcoin value drops by 50% since November peak",
        description: "The slide in the value of cryptocurrencies comes as stock markets around the world have also fallen.",
        url: "https://www.bbc.co.uk/news/business-61375152",
        urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/8362/production/_124643633_gettyimages-1384896168.jpg",
        publishedAt: "2022-05-09T03:04:37Z",
        content: "Image source, Getty Images\r\nThe value of Bitcoin continued to fall over the weekend as it dropped below $34,000 (£27,630), according to the Coinbase cryptocurrency exchange.\r\nThe world's largest cryp… [+2164 chars]"
      },
      {
        source: {
          id: "gizmodo",
          name: "Gizmodo.com"
        },
        author: "Kyle Barr",
        title: "Luna Foundation Tried to Prop Up Terra’s Crumbling Base With Billions in Bitcoin, But It Still Failed",
        description: "As a kid, I remember when my father tried to use a broom handle in a last ditch effort to support a roof that was collapsing from the weight of nearly three feet of snow. You can guess how well that went. In a similar vein, Terra blockchain reportedly spent $…",
        url: "https://gizmodo.com/luna-foundation-terra-bitcoin-crypto-lfg-1848933191",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/f8f25ce9a57b3454932cdead4c3278b6.jpg",
        publishedAt: "2022-05-16T20:45:00Z",
        content: "As a kid, I remember when my father tried to use a broom handle in a last ditch effort to support a roof that was collapsing from the weight of nearly three feet of snow. You can guess how well that … [+3390 chars]"
      },
      {
        source: {
          id: "gizmodo",
          name: "Gizmodo.com"
        },
        author: "Matt Novak",
        title: "Chipotle Lovers Can Now Buy Burritos With Bitcoin, Ether, and More: Report",
        description: "Customers at Chipotle will now be able to pay for their burritos with cryptocurrencies, including bitcoin, ether, and dogecoin, in a move that could help crypto become more mainstream, according to trade publication Restaurant Business. But there’s just one i…",
        url: "https://gizmodo.com/chipotle-bitcoin-ethereum-dogecoin-crypto-burritos-paym-1849006239",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/a06df2b7927727af38b388d72e721dce.jpg",
        publishedAt: "2022-06-02T10:00:00Z",
        content: "Customers at Chipotle will now be able to pay for their burritos with cryptocurrencies, including bitcoin, ether, and dogecoin, in a move that could help crypto become more mainstream, according to t… [+3130 chars]"
      },
      {
        source: {
          id: "gizmodo",
          name: "Gizmodo.com"
        },
        author: "Lauren Leffer",
        title: "Fidelity Wants to Include Bitcoin in 401(k) Plans; Elizabeth Warren and the Labor Department Have Concerns",
        description: "The nation's largest retirement plan provider is getting pushback for allowing investors to put a portion of their savings into cryptocurrency.",
        url: "https://gizmodo.com/fidelity-wants-bitcoin-added-to-401-k-retirement-plans-1848885502",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/2413ade0375c0f5b3affe4029f35315c.jpg",
        publishedAt: "2022-05-05T18:10:00Z",
        content: "If youve ever felt like introducing some Vegas-style odds into your retirement plan, youre finally in luck.\r\nLast week, Fidelity Investments announced that it would allow investors to put part of the… [+3239 chars]"
      },
      {
        source: {
          id: "engadget",
          name: "Engadget"
        },
        author: "Jon Fingas",
        title: "US Treasury issues first-ever sanctions against a cryptocurrency mixer",
        description: "Cryptocurrency mixers are sometimes used to help online criminals launder their stolen money by hiding its true origins, and the US Treasury is now ready to clamp down on them when hostile governments are involved. The department has issued its first sanction…",
        url: "https://www.engadget.com/us-treasury-sanctions-virtual-currency-mixer-north-korea-203502517.html",
        urlToImage: "https://s.yimg.com/os/creatr-uploaded-images/2021-11/0db21000-4246-11ec-a8de-edfca39c0e00",
        publishedAt: "2022-05-06T20:35:02Z",
        content: "Cryptocurrency mixers are sometimes used to help online criminals launder their stolen money by hiding its true origins, and the US Treasury is now ready to clamp down on them when hostile government… [+1432 chars]"
      },
      {
        source: {
          id: "the-verge",
          name: "The Verge"
        },
        author: "Nilay Patel",
        title: "How Ukraine’s wide use of cryptocurrency is playing out during the war",
        description: "Michael Chobanian, the president of the Blockchain Association of Ukraine, discusses how cryptocurrency and blockchain could reshape the Ukrainian government.",
        url: "https://www.theverge.com/23138465/decoder-ukraine-war-cryptocurrency-michael-chobanian-interview-bitcoin-usdt",
        urlToImage: "https://cdn.vox-cdn.com/thumbor/hyxIGAl42Cl6sDQJzy2cD3X4tEg=/0x148:2050x1221/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23583410/VRG_ILLO_Decoder_Michael_Chobanian.jpg",
        publishedAt: "2022-05-24T15:23:59Z",
        content: "Photo Illustration by Grayson Blackmon / The Verge; Photo by Oliyarnyk / CC-BY-SA-4.0\r\n\n \n\n\n With Michael Chobanian, the president of the Blockchain Association of Ukraine The terrible, unprovoked wa… [+52103 chars]"
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Reuters Editorial",
        title: "Cryptoverse: rising interest hurts Bitcoin - Reuters",
        description: "From Bitcoin's dramatic drop to a new way to pay for your luxury Gucci handbag, we round up the week's big stories in cryptocurrencies. Kristy Kilburn reports.",
        url: "https://www.reuters.com/video/watch/idOV695710052022RP1",
        urlToImage: "https://static.reuters.com/resources/r/?d=20220510&i=OV695710052022RP1&r=OV695710052022RP1&t=2",
        publishedAt: "2022-05-10T18:29:04Z",
        content: "Posted \r\nFrom Bitcoin's dramatic drop to a new way to pay for your luxury Gucci handbag, we round up the week's big stories in cryptocurrencies. Kristy Kilburn reports."
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Jane Zhang",
        title: "Bitcoin falls 7.2% to $28758 - Reuters.com",
        description: "Bitcoin fell 7.23% to $28,758.29 at 22:05 GMT on Wednesday, losing $2,241.68 from its previous close.",
        url: "https://www.reuters.com/business/bitcoin-falls-72-28758-2022-05-11/",
        urlToImage: "https://www.reuters.com/resizer/lEay-or8c9TPjZOEmIjrJf3ylQk=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/3RKTTS2CRVM2BEEDCB2ZIPV3L4.jpg",
        publishedAt: "2022-05-11T22:18:00Z",
        content: "May 11 (Reuters) - Bitcoin fell 7.23% to $28,758.29 at 22:05 GMT on Wednesday, losing $2,241.68 from its previous close.\r\nBitcoin, the world's biggest and best-known cryptocurrency, is down 40.4% fro… [+361 chars]"
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Wang Li",
        title: "Bitcoin last up 5.7% at $39862.84 - Reuters.com",
        description: "Bitcoin rose 5.7% to $39,862.84, on Wednesday, adding $2,102.94 to its previous close.",
        url: "https://www.reuters.com/business/bitcoin-last-up-57-3986284-2022-05-04/",
        urlToImage: "https://www.reuters.com/resizer/BWWUiBev3PUU7DomJJXE2-Iqz30=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/OZ6CVP422VIJ5A6UACI72VHUSY.jpg",
        publishedAt: "2022-05-04T20:16:00Z",
        content: "May 4 (Reuters) - Bitcoin rose 5.7% to $39,862.84, on Wednesday, adding $2,102.94 to its previous close.\r\nBitcoin, the world's biggest and best-known cryptocurrency, is up 20.9% from the year's low o… [+337 chars]"
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Ta Wei",
        title: "Bitcoin falls 7.8% to $31333 - Reuters",
        description: "Bitcoin dropped 7.81% to $31,333.41 at 20:03 GMT on Monday, losing $2,655.98 from its previous close.",
        url: "https://www.reuters.com/business/bitcoin-falls-78-31333-2022-05-09/",
        urlToImage: "https://www.reuters.com/resizer/BWWUiBev3PUU7DomJJXE2-Iqz30=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/OZ6CVP422VIJ5A6UACI72VHUSY.jpg",
        publishedAt: "2022-05-09T20:11:00Z",
        content: "May 9 (Reuters) - Bitcoin dropped 7.81% to $31,333.41 at 20:03 GMT on Monday, losing $2,655.98 from its previous close.\r\nBitcoin, the world's biggest and best-known cryptocurrency, is down 35% from t… [+351 chars]"
      },
      {
        source: {
          id: "bitcoin",
          name: "Bitcoin.com"
        },
        author: "Zhou Meng Jin",
        title: "Bitcoin, Ethereum Technical Analysis: BTC Slips to 10-Month Low, Below $33000 – Market Updates Bitcoin News - Bitcoin News",
        description: "<ol><li>Bitcoin, Ethereum Technical Analysis: BTC Slips to 10-Month Low, Below $33000 – Market Updates Bitcoin News  Bitcoin News\r\n</li><li>Bitcoin drops 50% from peak, near lowest levels in last one year  Economic Times\r\n</li><li>Crypto Crash: Why is cryptoc…",
        url: "https://news.bitcoin.com/bitcoin-ethereum-technical-analysis-btc-slips-to-10-month-low-below-33000/",
        urlToImage: "https://static.news.bitcoin.com/wp-content/uploads/2022/05/shutterstock_1978798856-1.jpg",
        publishedAt: "2022-05-09T13:45:30Z",
        content: "BTC fell to its lowest level since last July, as prices dropped below $33,000 to start the week. The selloff in cryptocurrency started last week, following the Fed’s decision to hike interest rates b… [+2651 chars]"
      },
      {
        source: {
          id: "wired",
          name: "Wired"
        },
        author: "Gian M. Volpicelli",
        title: "Terra’s Crypto Meltdown Was Inevitable",
        description: "An epic crash in algorithmic stablecoins spells trouble for the entire industry.",
        url: "https://www.wired.com/story/terra-luna-collapse/",
        urlToImage: "https://media.wired.com/photos/627d5bac0c454f12d5142672/191:100/w_1280,c_limit/Terra-Luna-Stable-Coins-Business-1382597134.jpg",
        publishedAt: "2022-05-12T19:14:35Z",
        content: "At a Mexican restaurant in North London a few weeks ago, a handful of small-time but remarkably discerning retail cryptocurrency investors predicted that terra and luna would crash. Several of them w… [+2779 chars]"
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Cao Cao",
        title: "Cryptoverse: Is the end of the bitcoin winter nigh? - Reuters.com",
        description: "The crypto winter is into its ninth week and bitcoin can't shake the chills.",
        url: "https://www.reuters.com/markets/europe/cryptoverse-is-end-bitcoin-winter-nigh-2022-05-24/",
        urlToImage: "https://www.reuters.com/resizer/tskc85lFRu_oQwAPvUhDH1JIOVU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/FNX6RIL72VISZBW5RI2INPQ2YA.jpg",
        publishedAt: "2022-05-24T05:30:00Z",
        content: "May 24 (Reuters) - The crypto winter is into its ninth week and bitcoin can't shake the chills.\r\nFrom technicals to turnover, market indicators are flashing red or amber for the biggest cryptocurrenc… [+3967 chars]"
      },
      {
        source: {
          id: "reuters",
          name: "Reuters"
        },
        author: "Huang Li Lin",
        title: "Cryptoverse: Buying the dip? Bitcoin's a rates rookie - Reuters",
        description: "Bitcoin has scant experience with rising interest rates, posing perils for investors looking to capitalize on its dramatic drop.",
        url: "https://www.reuters.com/business/finance/cryptoverse-buying-dip-bitcoins-rates-rookie-2022-05-10/",
        urlToImage: "https://www.reuters.com/resizer/mhnlNnjhE1y-CQ7JRZnTaDhnC_s=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/5O2YCJEQRNIP3KJAD2CMYQT3HM.jpg",
        publishedAt: "2022-05-10T05:17:00Z",
        content: "May 10 (Reuters) - Bitcoin has scant experience with rising interest rates, posing perils for investors looking to capitalize on its dramatic drop.\r\nThe cryptocurrency has tanked along with other ris… [+4315 chars]"
      },
      {
        source: {
          id: "cnet",
          name: "CNET"
        },
        author: "Julian Dossett",
        title: "Terra 2.0 Launch Planned Following Luna Meltdown. This Week's Top Bitcoin and Crypto News - CNET",
        description: "All the bitcoin, cryptocurrency and NFT news for the week ending May 27.",
        url: "https://www.cnet.com/personal-finance/crypto/terra-2-0-launch-planned-following-luna-meltdown-this-weeks-top-bitcoin-and-crypto-news/",
        urlToImage: "https://www.cnet.com/a/img/resize/941676ec40a5f484a5a3421c0fab4fc66d83adf2/2022/04/23/ddcb4d2b-32be-43f0-b48f-f6d31e44bec9/crypto-story-1.png?auto=webp&fit=crop&height=630&width=1200",
        publishedAt: "2022-05-28T17:36:26Z",
        content: "Terra is launching a new blockchain with a new luna token. Seth Green's animated show starring his stolen NFT is up in the air. The largest stablecoin issuer in the world launched a token for the Mex… [+3792 chars]"
      },
      {
        source: {
          id: "cnet",
          name: "CNET"
        },
        author: "Julian Dossett",
        title: "Terra 2.0 Is Now Live, Following Luna Meltdown. This Week's Top Bitcoin and Crypto News - CNET",
        description: "All the bitcoin, cryptocurrency and NFT news for the week ending May 27.",
        url: "https://www.cnet.com/personal-finance/crypto/terra-2-0-launched-today-following-luna-meltdown-this-weeks-top-bitcoin-and-crypto-news/",
        urlToImage: "https://www.cnet.com/a/img/resize/941676ec40a5f484a5a3421c0fab4fc66d83adf2/2022/04/23/ddcb4d2b-32be-43f0-b48f-f6d31e44bec9/crypto-story-1.png?auto=webp&fit=crop&height=630&width=1200",
        publishedAt: "2022-05-28T20:57:40Z",
        content: "Terra launched a new blockchain with a new luna token, today. Seth Green's animated show starring his stolen NFT is up in the air. The largest stablecoin issuer in the world launched a token for the … [+3854 chars]"
      }
]

export default newsData;