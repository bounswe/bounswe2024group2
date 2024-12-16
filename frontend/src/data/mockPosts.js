const mockPosts = [
  {
    "post-id": 10000,
    user: "Alice Johnson",
    title: "The Future of AI in Finance",
    content: [
      {
        type: "plain-text",
        "plain-text":
          "As we move further into 2024, AI continues to revolutionize the finance sector. From predictive analytics to automated trading, AI technologies are reshaping how we invest and manage our finances. The implications for personal and institutional investors are profound.",
      },
      {
        type: "graph",
        "graph-url": "https://www.example.com/ai-finance-trends.jpg",
        "graph-alt": "AI Trends in Finance",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Bob Lee",
        comment:
          "AI is truly changing the landscape of finance. Excited to see where it goes!",
      },
      {
        "comment-id": 2,
        user: "Carol White",
        comment: "The potential for improved decision-making is huge!",
      },
    ],
    likes: 52,
    tags: [],
    "publication-date": "2024-02-10",
  },
  {
    "post-id": 10001,
    user: "Michael Brown",
    title: "Understanding Market Trends Through Data",
    content: [
      {
        type: "news",
        "news-link": "https://www.example.com/data-market-trends",
        "news-title": "Data Analysis in Market Trends",
        "news-description":
          "This article explores how data analysis is vital for understanding and predicting market trends.",
      },
      {
        type: "plain-text",
        "plain-text":
          "In today's fast-paced market, data analysis has become crucial for success. Investors must adapt to rapidly changing environments and leverage data to make informed decisions.",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Diana Grey",
        comment: "Great insights! Data truly is the new oil.",
      },
      {
        "comment-id": 2,
        user: "Evan Black",
        comment: "I agree! Understanding trends is key to investment success.",
      },
    ],
    likes: 37,
    tags: [],
    "publication-date": "2024-08-15",
  },
  {
    "post-id": 10003,
    user: "Sarah Parker",
    title: "Exploring Global Market Opportunities",
    content: [
      {
        type: "image",
        "image-url":
          "https://1finance.co.in/magazine/wp-content/uploads/2024/01/Blog-5-b-scaled.jpg",
        "image-alt": "Global Market Opportunities",
      },
      {
        type: "plain-text",
        "plain-text":
          "As the world becomes increasingly interconnected, investors have more opportunities than ever to explore markets beyond their borders. This post delves into emerging markets and potential areas for investment that could yield significant returns.",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "George King",
        comment:
          "Emerging markets have so much potential. I'm keen to learn more!",
      },
      {
        "comment-id": 2,
        user: "Hannah Stone",
        comment: "This is exactly what I’ve been looking for!",
      },
    ],
    likes: 28,
    tags: [],
    "publication-date": "2024-07-20",
  },
  {
    "post-id": 10004,
    user: "Kevin Smith",
    title: "Navigating the Stock Market: Tips for New Investors",
    content: [
      {
        type: "plain-text",
        "plain-text":
          "For those new to the stock market, the journey can be overwhelming. However, understanding the basics is key to navigating this complex landscape. In this post, we will cover essential tips that can help you get started, including the importance of research, risk management, and staying informed.",
      },
      {
        type: "news",
        "news-link": "https://www.example.com/investment-tips",
        "news-title": "Investment Tips for Beginners",
        "news-description": "A comprehensive guide for novice investors.",
      },
      {
        type: "image",
        "image-url":
          "https://1finance.co.in/magazine/wp-content/uploads/2024/01/Blog-5-b-scaled.jpg",
        "image-alt": "Investment Tips",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Linda Green",
        comment:
          "This is super helpful! I wish I had this advice when I started.",
      },
      {
        "comment-id": 2,
        user: "Michael Gray",
        comment: "Great tips! I will definitely follow this advice.",
      },
    ],
    likes: 45,
    tags: [],
    "publication-date": "2024-06-12",
  },
  {
    "post-id": 10005,
    user: "Laura White",
    title: "Essential Tools for Stock Market Analysis",
    content: [
      {
        type: "plain-text",
        "plain-text":
          "As a trader, having the right tools at your disposal is crucial. In this post, we will explore some essential tools for stock market analysis, from charting software to news aggregators. Being equipped with the right resources can significantly enhance your trading strategy.",
      },
      {
        type: "graph",
        "graph-url": "https://www.example.com/tool-effectiveness.jpg",
        "graph-alt": "Effectiveness of Trading Tools",
      },
      {
        type: "image",
        "image-url":
          "https://1finance.co.in/magazine/wp-content/uploads/2024/01/Blog-5-b-scaled.jpg",
        "image-alt": "Trading Tools",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Sam Blue",
        comment: "I can't wait to implement these tools!",
      },
      {
        "comment-id": 2,
        user: "Emma Red",
        comment: "Fantastic post! I'm always looking for new tools.",
      },
    ],
    likes: 63,
    tags: [],
    "publication-date": "2024-09-25",
  },
  {
    "post-id": 10006,
    user: "Ahmet Yılmaz",
    title: "THY Hisseleri: Yükseliş Beklentisi",
    content: [
      {
        type: "plain-text",
        "plain-text":
          "Türk Hava Yolları (THY) hisseleri son dönemde güçlü bir toparlanma sürecine girdi. Pandemi sonrası seyahat talebinin artması, bilet fiyatlarının yükselmesi ve yeni uçuş hatlarının eklenmesi, THY'nin gelirlerini artıracak unsurlar arasında. Ayrıca, uluslararası seyahatlerin yeniden başlaması ile birlikte, şirketin gelirlerinin büyük bir bölümünü oluşturan iş seyahatleri de artış göstermektedir. Bu faktörler göz önüne alındığında, THY'nin hisselerinin önümüzdeki dönemde değer kazanmasını bekliyoruz.",
      },
      {
        type: "graph",
        "graph-url": "https://www.example.com/thy-stock-trend.jpg",
        "graph-alt": "THY Hisse Fiyat Trendleri",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Mehmet Kaya",
        comment:
          "Bütün bu gelişmeler çok heyecan verici! Yükseliş beklediğim hisselerden biri.",
      },
      {
        "comment-id": 2,
        user: "Fatma Çelik",
        comment: "Evet, seyahat talebinin artması gerçekten olumlu bir işaret.",
      },
    ],
    likes: 75,
    tags: [],
    "publication-date": "2024-10-10",
  },
  {
    "post-id": 10007,
    user: "Elif Demir",
    title: "BIMAS Hisseleri: Düşüş Beklentisi",
    content: [
      {
        type: "plain-text",
        "plain-text":
          "BİM (BİM Mağazaları) hisseleri son zamanlarda zorlu bir dönem geçiriyor. Artan maliyetler, yüksek enflasyon ve tüketici harcamalarındaki azalma, şirketin kâr marjlarını olumsuz etkileyebilir. Ayrıca, rakiplerin agresif pazarlama stratejileri, BİM'in pazar payını tehdit edebilir. Bu nedenle, BİM hisselerinin önümüzdeki süreçte değer kaybetmesini bekliyoruz. Uzun vadede bu durum, yatırımcılar için fırsatlar sunabilir.",
      },
      {
        type: "graph",
        "graph-url": "https://www.example.com/bimas-stock-trend.jpg",
        "graph-alt": "BIMAS Hisse Fiyat Trendleri",
      },
    ],
    comments: [
      {
        "comment-id": 1,
        user: "Cem Yıldız",
        comment:
          "Gerçekten endişe verici bir durum. Bu süreçte dikkatli olmak lazım.",
      },
      {
        "comment-id": 2,
        user: "Aylin Arslan",
        comment:
          "Düşüş beklentisi mantıklı görünüyor. Alternatif hisselere yönelmekte fayda var.",
      },
    ],
    likes: 80,
    tags: [],
    "publication-date": "2024-10-12",
  },
];

export default mockPosts;
