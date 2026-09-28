export type StudyItem = {
  id: string;
  question?: string;
  term?: string;
  answer: string;
  choices?: string[];
  meaning?: string;
  reading?: string;
  explanation?: string;
  example?: string;
  image?: string;
  exam?: string;          // e.g. "de1", "de2" — tag theo đề thi
  examOrder?: number;     // thứ tự câu trong đề (1, 2, 3...)
  qType?: 'theory' | 'calculation'; // phân loại lý thuyết vs tính toán
};

export type Section = {
  id: string;
  title: string;
  type: "vocabulary" | "multiple_choice";
  items: StudyItem[];
};

export type Lesson = {
  id: number;
  title: string;
  sections: Section[];
  hasTheory?: boolean;
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Bài 1 - Cơ bản về máy tính",
    hasTheory: true,
    sections: [
      {
        id: "lesson-1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l1-v-1",
            term: "EDSAC",
            reading: "Electronic Delay Storage Automatic Calculator",
            answer: "bộ tính toán tự động bộ nhớ trì hoãn điện tử",
            meaning: "bộ tính toán tự động bộ nhớ trì hoãn điện tử"
          },
          {
            id: "l1-v-2",
            term: "ENIAC (エニアック)",
            reading: "Electronic Numerical Integrator and Computer",
            answer: "máy tính ENIAC",
            meaning: "máy tính ENIAC"
          },
          {
            id: "l1-v-3",
            term: "USB メモリ",
            reading: "USB memory",
            answer: "bộ nhớ USB",
            meaning: "bộ nhớ USB"
          },
          {
            id: "l1-v-4",
            term: "アイコン",
            reading: "icon",
            answer: "biểu tượng",
            meaning: "biểu tượng"
          },
          {
            id: "l1-v-5",
            term: "アナログ",
            reading: "analog",
            answer: "analog",
            meaning: "analog"
          },
          {
            id: "l1-v-6",
            term: "アバカス",
            reading: "abacus",
            answer: "bàn tính",
            meaning: "bàn tính"
          },
          {
            id: "l1-v-7",
            term: "アプリケーション",
            reading: "application",
            answer: "ứng dụng",
            meaning: "ứng dụng"
          },
          {
            id: "l1-v-8",
            term: "エクスプローラ",
            reading: "explorer",
            answer: "cửa sổ trình duyệt",
            meaning: "cửa sổ trình duyệt"
          },
          {
            id: "l1-v-9",
            term: "カレントパス",
            reading: "current path",
            answer: "đường dẫn hiện hành",
            meaning: "đường dẫn hiện hành"
          },
          {
            id: "l1-v-10",
            term: "クリックする",
            reading: "click する",
            answer: "kích",
            meaning: "kích"
          },
          {
            id: "l1-v-11",
            term: "ジョン・エッカート",
            reading: "John Eckert",
            answer: "John Eckert",
            meaning: "John Eckert"
          },
          {
            id: "l1-v-12",
            term: "ジョン・モークリー",
            reading: "John Mauchly",
            answer: "John Mauchly",
            meaning: "John Mauchly"
          },
          {
            id: "l1-v-13",
            term: "スーパーコンピュータ",
            reading: "super computer",
            answer: "siêu máy tính",
            meaning: "siêu máy tính"
          },
          {
            id: "l1-v-14",
            term: "スマートフォン",
            reading: "smart phone",
            answer: "điện thoại thông minh",
            meaning: "điện thoại thông minh"
          },
          {
            id: "l1-v-15",
            term: "ダブルクリックする",
            reading: "double click する",
            answer: "kích đúp",
            meaning: "kích đúp"
          },
          {
            id: "l1-v-16",
            term: "ツール",
            reading: "tool",
            answer: "công cụ",
            meaning: "công cụ"
          },
          {
            id: "l1-v-17",
            term: "ディレクトリ構造",
            reading: "directory こうぞう",
            answer: "cấu trúc thư mục",
            meaning: "cấu trúc thư mục"
          },
          {
            id: "l1-v-18",
            term: "デジタルコンピュータ",
            reading: "digital computer",
            answer: "máy tính kỹ thuật số",
            meaning: "máy tính kỹ thuật số"
          },
          {
            id: "l1-v-19",
            term: "ドライブ",
            reading: "drive",
            answer: "ổ đĩa",
            meaning: "ổ đĩa"
          },
          {
            id: "l1-v-20",
            term: "ドライブ名",
            reading: "drive めい",
            answer: "tên ổ đĩa",
            meaning: "tên ổ đĩa"
          },
          {
            id: "l1-v-21",
            term: "ネットブック",
            reading: "netbook",
            answer: "netbook",
            meaning: "netbook"
          },
          {
            id: "l1-v-22",
            term: "ノイマン型コンピュータ",
            reading: "von Neumann がた computer",
            answer: "máy tính kiểu Neumann",
            meaning: "máy tính kiểu Neumann"
          },
          {
            id: "l1-v-23",
            term: "ハードディスク",
            reading: "harddisk",
            answer: "đĩa cứng",
            meaning: "đĩa cứng"
          },
          {
            id: "l1-v-24",
            term: "バックアップ",
            reading: "backup",
            answer: "sao lưu",
            meaning: "sao lưu"
          },
          {
            id: "l1-v-25",
            term: "パス",
            reading: "path",
            answer: "đường dẫn",
            meaning: "đường dẫn"
          },
          {
            id: "l1-v-26",
            term: "パスカルの計算機",
            reading: "Pascal のけいさんき",
            answer: "máy tính Pascal",
            meaning: "máy tính Pascal"
          },
          {
            id: "l1-v-27",
            term: "ピリオド",
            reading: "period",
            answer: "dấu chấm",
            meaning: "dấu chấm"
          },
          {
            id: "l1-v-28",
            term: "ファイル",
            reading: "file",
            answer: "tệp dữ liệu",
            meaning: "tệp dữ liệu"
          },
          {
            id: "l1-v-29",
            term: "フォルダオプション",
            reading: "folder option",
            answer: "chọn thư mục",
            meaning: "chọn thư mục"
          },
          {
            id: "l1-v-30",
            term: "フォン・ノイマン",
            reading: "John von Neumann",
            answer: "John von Neumann",
            meaning: "John von Neumann"
          },
          {
            id: "l1-v-31",
            term: "フロッピーディスク",
            reading: "floppy disk",
            answer: "đĩa mềm",
            meaning: "đĩa mềm"
          },
          {
            id: "l1-v-32",
            term: "プログラム内蔵方式",
            reading: "program ないぞうほうしき",
            answer: "chương trình được lưu trữ",
            meaning: "chương trình được lưu trữ"
          },
          {
            id: "l1-v-33",
            term: "ライプニッツの乗算機",
            reading: "Leibniz のじょうざんき",
            answer: "máy tính Leibniz",
            meaning: "máy tính Leibniz"
          },
          {
            id: "l1-v-34",
            term: "ワークステーション",
            reading: "workstation",
            answer: "trạm làm việc",
            meaning: "trạm làm việc"
          },
          {
            id: "l1-v-35",
            term: "右ボタンをクリックする",
            reading: "みぎ button を click する",
            answer: "kích phải chuột",
            meaning: "kích phải chuột"
          },
          {
            id: "l1-v-36",
            term: "閲覧する",
            reading: "えつらんする",
            answer: "xem, duyệt",
            meaning: "xem, duyệt"
          },
          {
            id: "l1-v-37",
            term: "画像",
            reading: "がぞう",
            answer: "hình ảnh",
            meaning: "hình ảnh"
          },
          {
            id: "l1-v-38",
            term: "階層構造",
            reading: "かいそうこうぞう",
            answer: "cấu trúc hình cây",
            meaning: "cấu trúc hình cây"
          },
          {
            id: "l1-v-39",
            term: "外部記憶装置",
            reading: "がいぶきおくそうち",
            answer: "thiết bị nhớ ngoài",
            meaning: "thiết bị nhớ ngoài"
          },
          {
            id: "l1-v-40",
            term: "拡張子",
            reading: "かくちょうし",
            answer: "đuôi file",
            meaning: "đuôi file"
          },
          {
            id: "l1-v-41",
            term: "記録媒体",
            reading: "きろくばいたい",
            answer: "phương tiện ghi",
            meaning: "phương tiện ghi"
          },
          {
            id: "l1-v-42",
            term: "起動",
            reading: "きどう",
            answer: "khởi động",
            meaning: "khởi động"
          },
          {
            id: "l1-v-43",
            term: "左ボタンをクリックする",
            reading: "ひだり button を click する",
            answer: "kích trái chuột",
            meaning: "kích trái chuột"
          },
          {
            id: "l1-v-44",
            term: "子供のフォルダ",
            reading: "こどもの folder",
            answer: "thư mục con",
            meaning: "thư mục con"
          },
          {
            id: "l1-v-45",
            term: "詳細設定",
            reading: "しょうさいせってい",
            answer: "cài đặt chi tiết",
            meaning: "cài đặt chi tiết"
          },
          {
            id: "l1-v-46",
            term: "親のフォルダ",
            reading: "おやの folder",
            answer: "thư mục mẹ",
            meaning: "thư mục mẹ"
          },
          {
            id: "l1-v-47",
            term: "専用計算機",
            reading: "せんようけいさんき",
            answer: "máy tính chuyên dụng",
            meaning: "máy tính chuyên dụng"
          },
          {
            id: "l1-v-48",
            term: "孫のフォルダ",
            reading: "まごの folder",
            answer: "thư mục cháu",
            meaning: "thư mục cháu"
          },
          {
            id: "l1-v-49",
            term: "大型汎用計算機",
            reading: "おおがたはんようけいさんき",
            answer: "máy tính đa dụng cỡ lớn",
            meaning: "máy tính đa dụng cỡ lớn"
          },
          {
            id: "l1-v-50",
            term: "電気機械式",
            reading: "でんききかいしき",
            answer: "máy tính cơ điện",
            meaning: "máy tính cơ điện"
          },
          {
            id: "l1-v-51",
            term: "電子式計算機",
            reading: "でんししきけいさんき",
            answer: "máy tính điện tử",
            meaning: "máy tính điện tử"
          },
          {
            id: "l1-v-52",
            term: "汎用計算機",
            reading: "はんようけいさんき",
            answer: "máy tính đa dụng",
            meaning: "máy tính đa dụng"
          },
          {
            id: "l1-v-53",
            term: "表計算",
            reading: "ひょうけいさん",
            answer: "tính toán bảng biểu",
            meaning: "tính toán bảng biểu"
          },
          {
            id: "l1-v-54",
            term: "表示",
            reading: "ひょうじ",
            answer: "biểu thị",
            meaning: "biểu thị"
          }
        ]
      },
      {
        id: "lesson-1-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l1-mc-1",
            question: "デジタルとは何ですか。",
            choices: [
              "数値化された量のこと",
              "連続的な量のこと",
              "数値化されたこと",
              "連続的なこと"
            ],
            answer: "数値化された量のこと"
          },
          {
            id: "l1-mc-2",
            question: "長さ，重さ，時間など身の回りの多くの物理量は何ですか。",
            choices: [
              "アナログ量",
              "デジタル時計",
              "デジタル量",
              "アナログ時計"
            ],
            answer: "アナログ量"
          },
          {
            id: "l1-mc-3",
            question: "電気機械式の計算機はいつ開発されましたか。",
            choices: [
              "紀元前",
              "1930年代",
              "7世紀",
              "1946年"
            ],
            answer: "1930年代"
          },
          {
            id: "l1-mc-4",
            question: "電子式計算機はいつ開発されましたか。",
            choices: [
              "紀元前",
              "1930年代",
              "17世紀",
              "1946年"
            ],
            answer: "1946年"
          },
          {
            id: "l1-mc-5",
            question: "コンピューターの機能は何ですか。",
            choices: [
              "記録と処理",
              "記憶と修理",
              "記憶と処理",
              "記録と修理"
            ],
            answer: "記憶と処理"
          },
          {
            id: "l1-mc-6",
            question: "ファイルについて正しくないものをえらんでください。",
            choices: [
              "一つのファイルにはファイル名と拡張子が含まれる",
              "拡張子はピリオドの後に付いた3文字程度のアルファベットだ",
              "ファイル操作の時点では拡張子を意識する必要はない",
              "保存するときにはいつも自分で拡張子を指定しなければならない"
            ],
            answer: "保存するときにはいつも自分で拡張子を指定しなければならない"
          },
          {
            id: "l1-mc-7",
            question: "最も高速に計算できるコンピュータは何ですか",
            choices: [
              "大型汎用計算機",
              "スーパーコンピュータ",
              "ワークステーション",
              "デスクトップPC"
            ],
            answer: "スーパーコンピュータ"
          },
          {
            id: "l1-mc-8",
            question: "現在使われているコンピュータはデジタルコンピュータです",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l1-mc-9",
            question: "デジタルコンピュータでは，どのような数字に近似して扱っています。",
            choices: [
              "一定単位の数字",
              "変動単位の数字",
              "不定単位の数字",
              "あいまいな単位の数字"
            ],
            answer: "一定単位の数字"
          },
          {
            id: "l1-mc-10",
            question: "17世紀には提案されたのはパスカルの計算機です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l1-mc-11",
            question: "スマートフォンはコンピューターの種類の一つです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l1-mc-12",
            question: "ドライブとは，ファイルを整理するための入れ物のことです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l1-mc-13",
            question: "フォルダを閲覧するためにはフォルダを順次クリックして開いていく。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2 - Sử dụng Internet",
    hasTheory: true,
    sections: [
      {
        id: "lesson-2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l2-v-1",
            term: "8 対 2 の法則",
            reading: "はちたいにのほうそく",
            answer: "quy luật 8/2",
            meaning: "quy luật 8/2"
          },
          {
            id: "l2-v-2",
            term: "ASP",
            reading: "Application Service Provider",
            answer: "nhà cung cấp dịch vụ ứng dụng",
            meaning: "nhà cung cấp dịch vụ ứng dụng"
          },
          {
            id: "l2-v-3",
            term: "Ajax",
            reading: "Asynchronous JavaScript and XML",
            answer: "JavaScript và XML không đồng bộ",
            meaning: "JavaScript và XML không đồng bộ"
          },
          {
            id: "l2-v-4",
            term: "Blog",
            reading: "web log",
            answer: "nhật kí cá nhân trên mạng",
            meaning: "nhật kí cá nhân trên mạng"
          },
          {
            id: "l2-v-5",
            term: "GPL",
            reading: "the GNU General Public License",
            answer: "giấy phép công cộng GNU",
            meaning: "giấy phép công cộng GNU"
          },
          {
            id: "l2-v-6",
            term: "RSS",
            reading: "Really Simple Syndication",
            answer: "định dạng tập tin",
            meaning: "định dạng tập tin"
          },
          {
            id: "l2-v-7",
            term: "SNS",
            reading: "Social Networking Service",
            answer: "dịch vụ mạng xã hội",
            meaning: "dịch vụ mạng xã hội"
          },
          {
            id: "l2-v-8",
            term: "SaaS",
            reading: "software as a Service",
            answer: "phần mềm dịch vụ",
            meaning: "phần mềm dịch vụ"
          },
          {
            id: "l2-v-9",
            term: "URL",
            reading: "Uniform Resource Location",
            answer: "định vị tài nguyên về mặt địa chỉ",
            meaning: "định vị tài nguyên về mặt địa chỉ"
          },
          {
            id: "l2-v-10",
            term: "エリック・シュミット",
            reading: "Eric Schmidt",
            answer: "Eric Schmidt",
            meaning: "Eric Schmidt"
          },
          {
            id: "l2-v-11",
            term: "キャラクター",
            reading: "Character",
            answer: "nhân vật",
            meaning: "nhân vật"
          },
          {
            id: "l2-v-12",
            term: "クラウドコンピューティング",
            reading: "cloud computing",
            answer: "điện toán đám mây",
            meaning: "điện toán đám mây"
          },
          {
            id: "l2-v-13",
            term: "グリッドコンピューティング",
            reading: "grid computing",
            answer: "điện toán lưới",
            meaning: "điện toán lưới"
          },
          {
            id: "l2-v-14",
            term: "シェアウェア",
            reading: "Shareware",
            answer: "phần mềm chia sẻ",
            meaning: "phần mềm chia sẻ"
          },
          {
            id: "l2-v-15",
            term: "ソースコード",
            reading: "source code",
            answer: "mã nguồn",
            meaning: "mã nguồn"
          },
          {
            id: "l2-v-16",
            term: "ティム・オライリー",
            reading: "Tim O'Reilly",
            answer: "tim O'Reilly",
            meaning: "tim O'Reilly"
          },
          {
            id: "l2-v-17",
            term: "ネチケット",
            reading: "netiquette",
            answer: "phép lịch sự xã giao khi sử dụng mạng",
            meaning: "phép lịch sự xã giao khi sử dụng mạng"
          },
          {
            id: "l2-v-18",
            term: "フリーウェア",
            reading: "Freeware",
            answer: "phần mềm miễn phí",
            meaning: "phần mềm miễn phí"
          },
          {
            id: "l2-v-19",
            term: "ブラウザ",
            reading: "Browser",
            answer: "trình duyệt",
            meaning: "trình duyệt"
          },
          {
            id: "l2-v-20",
            term: "ポータルサイト",
            reading: "portal site",
            answer: "cổng thông tin điện tử",
            meaning: "cổng thông tin điện tử"
          },
          {
            id: "l2-v-21",
            term: "レンタル権",
            reading: "Rental けん",
            answer: "quyền cho thuê",
            meaning: "quyền cho thuê"
          },
          {
            id: "l2-v-22",
            term: "意匠権",
            reading: "いしょうけん",
            answer: "quyền kiểu dáng công nghiệp",
            meaning: "quyền kiểu dáng công nghiệp"
          },
          {
            id: "l2-v-23",
            term: "一見",
            reading: "いっけん",
            answer: "nhìn qua",
            meaning: "nhìn qua"
          },
          {
            id: "l2-v-24",
            term: "吟味する",
            reading: "ぎんみする",
            answer: "tìm hiểu kỹ, xem xét kỹ",
            meaning: "tìm hiểu kỹ, xem xét kỹ"
          },
          {
            id: "l2-v-25",
            term: "携わる",
            reading: "たずさわる",
            answer: "làm việc trong...",
            meaning: "làm việc trong..."
          },
          {
            id: "l2-v-26",
            term: "検索",
            reading: "けんさく",
            answer: "tìm kiếm",
            meaning: "tìm kiếm"
          },
          {
            id: "l2-v-27",
            term: "個人情報",
            reading: "こじんじょうほう",
            answer: "thông tin cá nhân",
            meaning: "thông tin cá nhân"
          },
          {
            id: "l2-v-28",
            term: "公衆送信権",
            reading: "こうしゅうそうしんけん",
            answer: "quyền truyền tải công cộng",
            meaning: "quyền truyền tải công cộng"
          },
          {
            id: "l2-v-29",
            term: "工業所有権",
            reading: "こうぎょうしょゆうけん",
            answer: "quyền sở hữu công nghiệp",
            meaning: "quyền sở hữu công nghiệp"
          },
          {
            id: "l2-v-30",
            term: "実行ファイル",
            reading: "じっこう File",
            answer: "file thực thi",
            meaning: "file thực thi"
          },
          {
            id: "l2-v-31",
            term: "実用新案権",
            reading: "じつようしんあんけん",
            answer: "quyền giải pháp hữu ích",
            meaning: "quyền giải pháp hữu ích"
          },
          {
            id: "l2-v-32",
            term: "商標権",
            reading: "しょうひょうけん",
            answer: "quyền thương hiệu",
            meaning: "quyền thương hiệu"
          },
          {
            id: "l2-v-33",
            term: "肖像権",
            reading: "しょうぞうけん",
            answer: "quyền chân dung",
            meaning: "quyền chân dung"
          },
          {
            id: "l2-v-34",
            term: "触れ合う",
            reading: "ふれあう",
            answer: "tiếp xúc",
            meaning: "tiếp xúc"
          },
          {
            id: "l2-v-35",
            term: "即座",
            reading: "そくざ",
            answer: "ngay lập tức",
            meaning: "ngay lập tức"
          },
          {
            id: "l2-v-36",
            term: "知的財産",
            reading: "ちてきざいさん",
            answer: "tài sản trí tuệ",
            meaning: "tài sản trí tuệ"
          },
          {
            id: "l2-v-37",
            term: "知的所有権",
            reading: "ちてきしょゆうけん",
            answer: "quyền sở hữu trí tuệ",
            meaning: "quyền sở hữu trí tuệ"
          },
          {
            id: "l2-v-38",
            term: "著作権",
            reading: "ちょさくけん",
            answer: "bản quyền",
            meaning: "bản quyền"
          },
          {
            id: "l2-v-39",
            term: "著作者",
            reading: "ちょさくしゃ",
            answer: "tác giả",
            meaning: "tác giả"
          },
          {
            id: "l2-v-40",
            term: "著作財産権",
            reading: "ちょさくしゃざいさん",
            answer: "quyền tài sản",
            meaning: "quyền tài sản"
          },
          {
            id: "l2-v-41",
            term: "著作人格権",
            reading: "ちょさくじんかくけん",
            answer: "quyền nhân thân",
            meaning: "quyền nhân thân"
          },
          {
            id: "l2-v-42",
            term: "著作物",
            reading: "ちょさくぶつ",
            answer: "tác phẩm",
            meaning: "tác phẩm"
          },
          {
            id: "l2-v-43",
            term: "著作隣接権",
            reading: "ちょさくりんせつけん",
            answer: "quyền liên quan",
            meaning: "quyền liên quan"
          },
          {
            id: "l2-v-44",
            term: "特許権",
            reading: "とっきょけん",
            answer: "quyền sáng chế",
            meaning: "quyền sáng chế"
          },
          {
            id: "l2-v-45",
            term: "伴う",
            reading: "ともなう",
            answer: "cùng với",
            meaning: "cùng với"
          },
          {
            id: "l2-v-46",
            term: "不公平",
            reading: "ふこうへい",
            answer: "không công bằng",
            meaning: "không công bằng"
          },
          {
            id: "l2-v-47",
            term: "複製権",
            reading: "ふくせいけん",
            answer: "quyền sao chép",
            meaning: "quyền sao chép"
          },
          {
            id: "l2-v-48",
            term: "保護する",
            reading: "ほごする",
            answer: "bảo hộ",
            meaning: "bảo hộ"
          },
          {
            id: "l2-v-49",
            term: "放送権",
            reading: "ほうそうけん",
            answer: "quyền phát sóng",
            meaning: "quyền phát sóng"
          },
          {
            id: "l2-v-50",
            term: "利用形態",
            reading: "りようけいたい",
            answer: "hình thức sử dụng",
            meaning: "hình thức sử dụng"
          },
          {
            id: "l2-v-51",
            term: "倫理的",
            reading: "りんりてき",
            answer: "mang tính đạo đức",
            meaning: "mang tính đạo đức"
          },
          {
            id: "l2-v-52",
            term: "劣化する",
            reading: "れっかする",
            answer: "kém đi",
            meaning: "kém đi"
          },
          {
            id: "l2-v-53",
            term: "漏洩",
            reading: "ろうえい",
            answer: "rò rỉ",
            meaning: "rò rỉ"
          }
        ]
      },
      {
        id: "lesson-2-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l2-mc-1",
            question: "ホームページを見る場合には何を利用しますか。",
            choices: [
              "ブラウザ",
              "フリーウェア",
              "シェアウェア",
              "ウェブサイト"
            ],
            answer: "ブラウザ"
          },
          {
            id: "l2-mc-2",
            question: "URLとは何ですか",
            choices: [
              "入り口となるサイト",
              "ホームページのアドレス",
              "出口となるサイト",
              "コンピューターのアドレス"
            ],
            answer: "ホームページのアドレス"
          },
          {
            id: "l2-mc-3",
            question: "Web2.0とは何ですか",
            choices: [
              "一方向的なホームページ",
              "一方向的なアドレス",
              "双方向型のホームページ",
              "双方向型のアドレス"
            ],
            answer: "双方向型のホームページ"
          },
          {
            id: "l2-mc-4",
            question: "クラウドコンピューティングの概念はいつ提唱されましたか。",
            choices: [
              "2004",
              "2006",
              "2005",
              "2007"
            ],
            answer: "2006"
          },
          {
            id: "l2-mc-5",
            question: "著作権は何の権に属しますか。",
            choices: [
              "工業所有権",
              "著作者財産権",
              "著作人格権",
              "知的所有権"
            ],
            answer: "知的所有権"
          },
          {
            id: "l2-mc-6",
            question: "工業所有権はどんな権ですか。",
            choices: [
              "工業の進歩を保護する権利",
              "技術の進歩を保護する権利",
              "新規の技術についての権利を保護する権利",
              "製品のデザインについての権利"
            ],
            answer: "技術の進歩を保護する権利"
          },
          {
            id: "l2-mc-7",
            question: "インターネット利用形態の主なものに何がありますか。",
            choices: [
              "ホームページ閲覧とメール送受信",
              "ホームページ閲覧",
              "メール送受信",
              "ホームページ設定とメール閲覧"
            ],
            answer: "ホームページ閲覧とメール送受信"
          },
          {
            id: "l2-mc-8",
            question: "ポータルサイトは何でしょう。",
            choices: [
              "ホームページのアドレスのこと",
              "入り口となるサイトのこと",
              "簡単なアドレス",
              "複雑なアドレス"
            ],
            answer: "入り口となるサイトのこと"
          },
          {
            id: "l2-mc-9",
            question: "特許権はどの権に属しますか。",
            choices: [
              "著作権",
              "実用新案権",
              "工業所有権",
              "意匠権"
            ],
            answer: "工業所有権"
          },
          {
            id: "l2-mc-10",
            question: "インターネットについて正しくないものを一つ選びなさい",
            choices: [
              "インターネット利用形態の主なものにホームページ閲覧とメール送受信がある。",
              "インターネットは世界中の人たちと直接ふれあうことができる",
              "インターネットのおかげで、何でもできるようになった",
              "インターネットはコミュニケーションの道具である"
            ],
            answer: "インターネットのおかげで、何でもできるようになった"
          },
          {
            id: "l2-mc-11",
            question: "フリーウェアは有料です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l2-mc-12",
            question: "メールを送るとき、急な返事を求める。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l2-mc-13",
            question: "著作権は文化的な生産物や表現を保護する権利です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3 - Hiện trạng thiết bị IT",
    hasTheory: true,
    sections: [
      {
        id: "lesson-3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l3-v-1",
            term: "CMOS センサ",
            reading: "Complementary Metal Oxide Semiconductor image sensor",
            answer: "bộ cảm biến hình ảnh bằng chip",
            meaning: "bộ cảm biến hình ảnh bằng chip"
          },
          {
            id: "l3-v-2",
            term: "ICT",
            reading: "Information and Communication Technology",
            answer: "công nghệ thông tin và truyền thông",
            meaning: "công nghệ thông tin và truyền thông"
          },
          {
            id: "l3-v-3",
            term: "SED",
            reading: "Surface-conduction Electron-emitter Display",
            answer: "kỹ thuật phát xạ điện tử dẫn bề mặt",
            meaning: "kỹ thuật phát xạ điện tử dẫn bề mặt"
          },
          {
            id: "l3-v-4",
            term: "SIM",
            reading: "Subscriber Identity Module",
            answer: "mô đun nhận dạng thuê bao",
            meaning: "mô đun nhận dạng thuê bao"
          },
          {
            id: "l3-v-5",
            term: "コンテンツ",
            reading: "contents",
            answer: "các chức năng",
            meaning: "các chức năng"
          },
          {
            id: "l3-v-6",
            term: "サイマル放送",
            reading: "simultaneous ほうそう",
            answer: "phát sóng cùng một lúc",
            meaning: "phát sóng cùng một lúc"
          },
          {
            id: "l3-v-7",
            term: "セグメント",
            reading: "segment",
            answer: "phân đoạn",
            meaning: "phân đoạn"
          },
          {
            id: "l3-v-8",
            term: "ハイビジョン",
            reading: "Hi-vision",
            answer: "hình ảnh chất lượng cao",
            meaning: "hình ảnh chất lượng cao"
          },
          {
            id: "l3-v-9",
            term: "フィルタ",
            reading: "filter",
            answer: "bộ lọc",
            meaning: "bộ lọc"
          },
          {
            id: "l3-v-10",
            term: "ブロードバンド",
            reading: "broadband",
            answer: "băng rộng",
            meaning: "băng rộng"
          },
          {
            id: "l3-v-11",
            term: "ワンセグ放送",
            reading: "one segment ほうそう",
            answer: "phát sóng từng đoạn",
            meaning: "phát sóng từng đoạn"
          },
          {
            id: "l3-v-12",
            term: "液晶",
            reading: "えきしょう",
            answer: "tinh thể lỏng",
            meaning: "tinh thể lỏng"
          },
          {
            id: "l3-v-13",
            term: "画素",
            reading: "がそ",
            answer: "điểm ảnh",
            meaning: "điểm ảnh"
          },
          {
            id: "l3-v-14",
            term: "遮断",
            reading: "しゃだん",
            answer: "cản trở",
            meaning: "cản trở"
          },
          {
            id: "l3-v-15",
            term: "周波数帯域",
            reading: "ちゅうはすうたいいき",
            answer: "dải băng tần",
            meaning: "dải băng tần"
          },
          {
            id: "l3-v-16",
            term: "情報端末",
            reading: "じょうほうたんまつ",
            answer: "thiết bị cuối",
            meaning: "thiết bị cuối"
          },
          {
            id: "l3-v-17",
            term: "静電容量方式",
            reading: "せいでんようりょうほうしき",
            answer: "điện dung",
            meaning: "điện dung"
          },
          {
            id: "l3-v-18",
            term: "増幅器",
            reading: "ぞうふくき",
            answer: "âm li, bộ khuyết đại",
            meaning: "âm li, bộ khuyết đại"
          },
          {
            id: "l3-v-19",
            term: "抵抗膜方式",
            reading: "ていこうまくほうしき",
            answer: "phương thức màng điện trở",
            meaning: "phương thức màng điện trở"
          },
          {
            id: "l3-v-20",
            term: "電荷",
            reading: "でんか",
            answer: "điện tích",
            meaning: "điện tích"
          },
          {
            id: "l3-v-21",
            term: "盗聴",
            reading: "とうちょう",
            answer: "nghe trộm, nghe lén",
            meaning: "nghe trộm, nghe lén"
          },
          {
            id: "l3-v-22",
            term: "透過",
            reading: "とうか",
            answer: "xuyên qua",
            meaning: "xuyên qua"
          },
          {
            id: "l3-v-23",
            term: "発光体",
            reading: "はっこうたい",
            answer: "thể phát quang",
            meaning: "thể phát quang"
          },
          {
            id: "l3-v-24",
            term: "偏光",
            reading: "へんこう",
            answer: "ánh sáng phân cực",
            meaning: "ánh sáng phân cực"
          },
          {
            id: "l3-v-25",
            term: "有機 EL ディスプレイ",
            reading: "ゆうき eelectroluminescence display",
            answer: "màn hình phát quang hữu cơ",
            meaning: "màn hình phát quang hữu cơ"
          }
        ]
      },
      {
        id: "lesson-3-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l3-mc-1",
            question: "ITは日本語で何ですか。",
            choices: [
              "情報交換技術",
              "情報管理技術",
              "情報連絡技術",
              "情報通信技術"
            ],
            answer: "情報通信技術"
          },
          {
            id: "l3-mc-2",
            question: "放送に必要な電波について正しくないものを一つ選びなさい。",
            choices: [
              "限られた資源である",
              "無限資源である",
              "テレビ放送に使われる",
              "衛星通信に使われる"
            ],
            answer: "無限資源である"
          },
          {
            id: "l3-mc-3",
            question: "有機ELディスプレイについて正しくないものを一つ選びなさい。",
            choices: [
              "有機物の発光体によりカラー表示を行うもの",
              "液晶のバックライトなども同様の仕組み",
              "液晶よりさらに消費電力が多い",
              "液晶より明るい"
            ],
            answer: "液晶よりさらに消費電力が多い"
          },
          {
            id: "l3-mc-4",
            question: "出力用ハードウェアは何がありますか。",
            choices: [
              "プリンター",
              "タッチパネルセンサ",
              "カメラ",
              "キーボード"
            ],
            answer: "プリンター"
          },
          {
            id: "l3-mc-5",
            question: "電気を用いた通信は何に分類しますか。",
            choices: [
              "販売通信",
              "物理的な通信",
              "無線通信と有線通信",
              "WIFI"
            ],
            answer: "無線通信と有線通信"
          },
          {
            id: "l3-mc-6",
            question: "携帯電話の機能について正しくないものをえらんでください。",
            choices: [
              "電話",
              "ワンセグテレビ",
              "通信",
              "セグメント"
            ],
            answer: "セグメント"
          },
          {
            id: "l3-mc-7",
            question: "自発光型で，発光ダイオードの一種に分類される表示装置はどれか。",
            choices: [
              "CRTディスプレイ",
              "液晶ディスプレイ",
              "プラズマディスプレイ",
              "有機ELディスプレイ"
            ],
            answer: "有機ELディスプレイ"
          },
          {
            id: "l3-mc-8",
            question: "国際標準の携帯電話で利用できるアプリケーションを決定するのが(  )と呼ばれるソフトウェアです。",
            choices: [
              "オペレーティングシステム",
              "ios",
              "プログラム",
              "アプリケーション"
            ],
            answer: "オペレーティングシステム"
          },
          {
            id: "l3-mc-9",
            question: "オペレーティングシステムの代表的なものは何ですか。",
            choices: [
              "Symbian",
              "ワンセグテレビ",
              "電子マネー",
              "アプリケーション"
            ],
            answer: "Symbian"
          },
          {
            id: "l3-mc-10",
            question: "入力用ハードウェアとして，スマートフォンなどでは，何が使われていますか。",
            choices: [
              "タッチパネルのセンサ",
              "液晶のバックライト",
              "デジタルカメラ画面",
              "CMOSセンサ"
            ],
            answer: "タッチパネルのセンサ"
          },
          {
            id: "l3-mc-11",
            question: "ハイビジョン放送は従来のアナログ放送ほどたくさんの情報が必要ではない。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l3-mc-12",
            question: "音声の波をそのまま電波の波に置き換えて送受信するアナログ通信を特徴としているのは第2世代の携帯電話ですか。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l3-mc-13",
            question: "放送に必要な電波はテレビ放送の目的で使われる。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4 - Công nghệ truyền thông dữ liệu",
    hasTheory: true,
    sections: [
      {
        id: "lesson-4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l4-v-1",
            term: "ADSL",
            reading: "Asymmetric Digital Subscriber Line",
            answer: "đường dây thuê bao số bất đối xứng",
            meaning: "đường dây thuê bao số bất đối xứng"
          },
          {
            id: "l4-v-2",
            term: "CATV",
            reading: "Collective Antenna Television",
            answer: "truyền hình cáp dây dẫn",
            meaning: "truyền hình cáp dây dẫn"
          },
          {
            id: "l4-v-3",
            term: "FTTH",
            reading: "Fiber To The Home",
            answer: "cáp quang đến tận nhà",
            meaning: "cáp quang đến tận nhà"
          },
          {
            id: "l4-v-4",
            term: "IP 電話",
            reading: "IP でんわ",
            answer: "điện thoại IP (điện thoại giao thức internet)",
            meaning: "điện thoại IP (điện thoại giao thức internet)"
          },
          {
            id: "l4-v-5",
            term: "IrDA",
            reading: "Infrared Data Association",
            answer: "truyền dữ liệu bằng tia hồng ngoại",
            meaning: "truyền dữ liệu bằng tia hồng ngoại"
          },
          {
            id: "l4-v-6",
            term: "PLC",
            reading: "Power Line Communication",
            answer: "nối mạng qua hệ thống điện nhà",
            meaning: "nối mạng qua hệ thống điện nhà"
          },
          {
            id: "l4-v-7",
            term: "PLC アダプタ",
            reading: "PLC adapter",
            answer: "bộ chuyển đổi",
            meaning: "bộ chuyển đổi"
          },
          {
            id: "l4-v-8",
            term: "POS",
            reading: "Point of Sale",
            answer: "máy tính tiền",
            meaning: "máy tính tiền"
          },
          {
            id: "l4-v-9",
            term: "RFID",
            reading: "Radio Frequency Identification",
            answer: "công nghệ nhận dạng tần số Radio",
            meaning: "công nghệ nhận dạng tần số Radio"
          },
          {
            id: "l4-v-10",
            term: "アップロード 上り",
            reading: "upload のぼり",
            answer: "tải lên",
            meaning: "tải lên"
          },
          {
            id: "l4-v-11",
            term: "アンテナ",
            reading: "antenna",
            answer: "ăng ten",
            meaning: "ăng ten"
          },
          {
            id: "l4-v-12",
            term: "ケーブルテレビ",
            reading: "cable TV",
            answer: "truyền hình cáp",
            meaning: "truyền hình cáp"
          },
          {
            id: "l4-v-13",
            term: "ゲートウェイ",
            reading: "gateway",
            answer: "cổng nối",
            meaning: "cổng nối"
          },
          {
            id: "l4-v-14",
            term: "コスト削減",
            reading: "cost さくげん",
            answer: "cắt giảm chi phí",
            meaning: "cắt giảm chi phí"
          },
          {
            id: "l4-v-15",
            term: "コンセント",
            reading: "outlet",
            answer: "ổ cắm",
            meaning: "ổ cắm"
          },
          {
            id: "l4-v-16",
            term: "ダウンロード 下り",
            reading: "download くだり",
            answer: "tải xuống",
            meaning: "tải xuống"
          },
          {
            id: "l4-v-17",
            term: "ネットワークケーブル敷設",
            reading: "Network cable ふせつ",
            answer: "lắp đặt cáp mạng",
            meaning: "lắp đặt cáp mạng"
          },
          {
            id: "l4-v-18",
            term: "ノイズ",
            reading: "noise",
            answer: "tạp nhiễu",
            meaning: "tạp nhiễu"
          },
          {
            id: "l4-v-19",
            term: "ハンズフリー",
            reading: "hands-free",
            answer: "chế độ rảnh tay",
            meaning: "chế độ rảnh tay"
          },
          {
            id: "l4-v-20",
            term: "パケット",
            reading: "packet",
            answer: "gói tin",
            meaning: "gói tin"
          },
          {
            id: "l4-v-21",
            term: "ホットスポット",
            reading: "hotspot",
            answer: "điểm truy cập công cộng",
            meaning: "điểm truy cập công cộng"
          },
          {
            id: "l4-v-22",
            term: "ユビキタス",
            reading: "ubiquitous",
            answer: "có ở mọi nơi",
            meaning: "có ở mọi nơi"
          },
          {
            id: "l4-v-23",
            term: "ラストワンマイル問題",
            reading: "last one mile もんだい",
            answer: "vấn đề dặm cuối cùng",
            meaning: "vấn đề dặm cuối cùng"
          },
          {
            id: "l4-v-24",
            term: "ルータ",
            reading: "router",
            answer: "bộ định tuyến",
            meaning: "bộ định tuyến"
          },
          {
            id: "l4-v-25",
            term: "圧縮方法",
            reading: "あっしゅくほうほう",
            answer: "phương pháp nén",
            meaning: "phương pháp nén"
          },
          {
            id: "l4-v-26",
            term: "音声パケット",
            reading: "おんせい packet",
            answer: "gói âm thanh",
            meaning: "gói âm thanh"
          },
          {
            id: "l4-v-27",
            term: "回線",
            reading: "かいせん",
            answer: "đường dây",
            meaning: "đường dây"
          },
          {
            id: "l4-v-28",
            term: "基幹回線",
            reading: "きかんかいせん",
            answer: "đường truyền chính",
            meaning: "đường truyền chính"
          },
          {
            id: "l4-v-29",
            term: "享受する",
            reading: "きょうじゅする",
            answer: "hưởng",
            meaning: "hưởng"
          },
          {
            id: "l4-v-30",
            term: "金属線",
            reading: "きんぞくせん",
            answer: "cáp kim loại",
            meaning: "cáp kim loại"
          },
          {
            id: "l4-v-31",
            term: "互換性",
            reading: "ごかんせい",
            answer: "tính tương tác",
            meaning: "tính tương tác"
          },
          {
            id: "l4-v-32",
            term: "光ファイバ",
            reading: "ひかり fiber",
            answer: "cáp quang",
            meaning: "cáp quang"
          },
          {
            id: "l4-v-33",
            term: "更新",
            reading: "こうしん",
            answer: "cập nhật",
            meaning: "cập nhật"
          },
          {
            id: "l4-v-34",
            term: "高速通信",
            reading: "こうそくつうしん",
            answer: "truyền tốc độ cao",
            meaning: "truyền tốc độ cao"
          },
          {
            id: "l4-v-35",
            term: "高速路",
            reading: "こうそくろ",
            answer: "đường truyền tốc độ cao",
            meaning: "đường truyền tốc độ cao"
          },
          {
            id: "l4-v-36",
            term: "実時間",
            reading: "じつじかん",
            answer: "thời gian thực, cùng lúc",
            meaning: "thời gian thực, cùng lúc"
          },
          {
            id: "l4-v-37",
            term: "遮蔽物",
            reading: "しゃへいぶつ",
            answer: "vật chắn, vật cản",
            meaning: "vật chắn, vật cản"
          },
          {
            id: "l4-v-38",
            term: "手軽に",
            reading: "てがるに",
            answer: "một cách dễ dàng, đơn giản",
            meaning: "một cách dễ dàng, đơn giản"
          },
          {
            id: "l4-v-39",
            term: "受信機",
            reading: "じゅしんき",
            answer: "thiết bị thu",
            meaning: "thiết bị thu"
          },
          {
            id: "l4-v-40",
            term: "赤外線",
            reading: "せきがいせん",
            answer: "tia hồng ngoại",
            meaning: "tia hồng ngoại"
          },
          {
            id: "l4-v-41",
            term: "属する",
            reading: "ぞくする",
            answer: "thuộc vào",
            meaning: "thuộc vào"
          },
          {
            id: "l4-v-42",
            term: "長距離電話",
            reading: "ちょうきょりでんわ",
            answer: "điện thoại đường dài",
            meaning: "điện thoại đường dài"
          },
          {
            id: "l4-v-43",
            term: "通信衛星",
            reading: "つうしんえいせい",
            answer: "vệ tinh truyền thông",
            meaning: "vệ tinh truyền thông"
          },
          {
            id: "l4-v-44",
            term: "通信速度",
            reading: "つうしんそくど",
            answer: "tốc độ đường truyền",
            meaning: "tốc độ đường truyền"
          },
          {
            id: "l4-v-45",
            term: "低速通信",
            reading: "ていそくつうしん",
            answer: "truyền tốc độ thấp",
            meaning: "truyền tốc độ thấp"
          },
          {
            id: "l4-v-46",
            term: "電灯線通信",
            reading: "でんとうせんつうしん",
            answer: "hệ thống tải ba",
            meaning: "hệ thống tải ba"
          },
          {
            id: "l4-v-47",
            term: "電波干渉",
            reading: "でんぱかんしょう",
            answer: "nhiễu sóng",
            meaning: "nhiễu sóng"
          },
          {
            id: "l4-v-48",
            term: "電話局",
            reading: "でんわきょく",
            answer: "trạm điện thoại",
            meaning: "trạm điện thoại"
          },
          {
            id: "l4-v-49",
            term: "内蔵",
            reading: "ないぞう",
            answer: "gắn sẵn bên trong",
            meaning: "gắn sẵn bên trong"
          },
          {
            id: "l4-v-50",
            term: "発信機",
            reading: "はっしんき",
            answer: "thiết bị phát",
            meaning: "thiết bị phát"
          },
          {
            id: "l4-v-51",
            term: "非接触型 IC カード",
            reading: "ひ せっしょくがた IC card",
            answer: "thẻ vi mạch không tiếp xúc",
            meaning: "thẻ vi mạch không tiếp xúc"
          },
          {
            id: "l4-v-52",
            term: "非対称",
            reading: "ひたいしょう",
            answer: "không đối xứng",
            meaning: "không đối xứng"
          },
          {
            id: "l4-v-53",
            term: "放送衛星",
            reading: "ほうそうえいせい",
            answer: "vệ tinh phát sóng",
            meaning: "vệ tinh phát sóng"
          },
          {
            id: "l4-v-54",
            term: "無線通信",
            reading: "むせんつうしん",
            answer: "truyền dữ liệu không dây",
            meaning: "truyền dữ liệu không dây"
          },
          {
            id: "l4-v-55",
            term: "有線通信",
            reading: "ゆうせんつうしん",
            answer: "truyền dữ liệu có dây",
            meaning: "truyền dữ liệu có dây"
          },
          {
            id: "l4-v-56",
            term: "余裕",
            reading: "よゆう",
            answer: "dư thừa",
            meaning: "dư thừa"
          }
        ]
      },
      {
        id: "lesson-4-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l4-mc-1",
            question: "IrDAとは，Infrared Data Associationという赤外線通信の規格で，家電製品用のリモコンや携帯電話の個人（　）などで利用されています",
            choices: [
              "データ交換",
              "データ変更",
              "データ削除",
              "データ制御"
            ],
            answer: "データ交換"
          },
          {
            id: "l4-mc-2",
            question: "金属線や光ファイバなどのケーブルで接続できる通信手段について正しくないものを選びなさい。",
            choices: [
              "CATV",
              "FTTH",
              "ADSL",
              "IrDA"
            ],
            answer: "IrDA"
          },
          {
            id: "l4-mc-3",
            question: "無線通信手段は何ですか。",
            choices: [
              "CATV",
              "FTTH",
              "ADSL",
              "IrDA"
            ],
            answer: "IrDA"
          },
          {
            id: "l4-mc-4",
            question: "FTTHはADSLとどう違いますか。",
            choices: [
              "ノイズの影響を受けやすい",
              "ADSLの方が安定である",
              "よりおそく通信を行う",
              "専用の光ファイバーを使"
            ],
            answer: "専用の光ファイバーを使"
          },
          {
            id: "l4-mc-5",
            question: "一般 of 電話線を利用するのは何ですか。", // Wait, let's keep the exact original first: "一般の電話線を利用するのは何ですか。"
            choices: [
              "IrDA",
              "FTTH",
              "ADSL",
              "Bluetooth"
            ],
            answer: "ADSL"
          },
          {
            id: "l4-mc-6",
            question: "専用線を使うのは何ですか。",
            choices: [
              "IrDA",
              "ADSL",
              "FTTH",
              "Bluetooth"
            ],
            answer: "FTTH"
          },
          {
            id: "l4-mc-7",
            question: "JRのSuicaなどで使われているのは何ですか。",
            choices: [
              "IrDA",
              "非接触型ICカード",
              "FTTH",
              "Bluetoot"
            ],
            answer: "非接触型ICカード"
          },
          {
            id: "l4-mc-8",
            question: "携帯電話，パソコン，カーナビ，マウス，キーボード，ヘッドホンなどに搭載されている通信規格は何ですか。",
            choices: [
              "IrDA",
              "非接触型ICカード",
              "FTTH",
              "Bluetooth"
            ],
            answer: "Bluetooth"
          },
          {
            id: "l4-mc-9",
            question: "IrDAについて正しいものをえらんでください。",
            choices: [
              "外部線通信の規格",
              "赤外線通信の規格",
              "短い距離での通信に利用できな",
              "カーナビ搭載されている通信規格"
            ],
            answer: "赤外線通信の規格"
          },
          {
            id: "l4-mc-10",
            question: "下がりのことについては正しくないものをえらんでください。",
            choices: [
              "上流から下流の方向",
              "下流から上流の方向",
              "ファイルを取ってくる",
              "ホームページを見る"
            ],
            answer: "下流から上流の方向"
          },
          {
            id: "l4-mc-11",
            question: "ADSLは非対称デジタル加入者線と訳されますか。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l4-mc-12",
            question: "ホームページを見るのは上りです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l4-mc-13",
            question: "ファイルを取ってくるのは下りです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l4-mc-14",
            question: "LANは無線通信手段です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l4-mc-15",
            question: "IrDAは有線接続です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Bài 5 - Mạng máy tính",
    hasTheory: true,
    sections: [
      {
        id: "lesson-5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l5-v-1",
            term: "DMZ / 緩衝地帯 / 非武装地帯",
            reading: "DeMilitarized Zone / かんしょうちたい / ひぶそうちたい",
            answer: "vùng phi quân sự",
            meaning: "vùng phi quân sự"
          },
          {
            id: "l5-v-2",
            term: "LAN",
            reading: "Local Area Network",
            answer: "mạng máy tính cục bộ",
            meaning: "mạng máy tính cục bộ"
          },
          {
            id: "l5-v-3",
            term: "WAN",
            reading: "Wide Area Network",
            answer: "mạng diện rộng",
            meaning: "mạng diện rộng"
          },
          {
            id: "l5-v-4",
            term: "WWW",
            reading: "World Wide Web",
            answer: "mạng toàn cầu",
            meaning: "mạng toàn cầu"
          },
          {
            id: "l5-v-5",
            term: "カスケード状",
            reading: "Cascade じょう",
            answer: "sắp xếp theo tầng",
            meaning: "sắp xếp theo tầng"
          },
          {
            id: "l5-v-6",
            term: "クライアントサーバ",
            reading: "client server",
            answer: "server khách",
            meaning: "server khách"
          },
          {
            id: "l5-v-7",
            term: "スター型",
            reading: "star がた",
            answer: "cấu hình sao",
            meaning: "cấu hình sao"
          },
          {
            id: "l5-v-8",
            term: "セキュリティ",
            reading: "Security",
            answer: "bảo mật",
            meaning: "bảo mật"
          },
          {
            id: "l5-v-9",
            term: "ネームサーバ",
            reading: "name server",
            answer: "máy chủ tên miền",
            meaning: "máy chủ tên miền"
          },
          {
            id: "l5-v-10",
            term: "バス型",
            reading: "bus がた",
            answer: "cấu hình kênh",
            meaning: "cấu hình kênh"
          },
          {
            id: "l5-v-11",
            term: "ピアツーピア",
            reading: "peer to peer",
            answer: "mạng đồng đẳng",
            meaning: "mạng đồng đẳng"
          },
          {
            id: "l5-v-12",
            term: "ファイアウォール / 防火壁",
            reading: "firewall / ぼうかへき",
            answer: "bức tường lửa",
            meaning: "bức tường lửa"
          },
          {
            id: "l5-v-13",
            term: "ファイルサーバ",
            reading: "file server",
            answer: "máy chủ tập tin",
            meaning: "máy chủ tập tin"
          },
          {
            id: "l5-v-14",
            term: "ホストコンピュータ",
            reading: "host computer",
            answer: "máy tính chủ",
            meaning: "máy tính chủ"
          },
          {
            id: "l5-v-15",
            term: "ポータブルオーディオ",
            reading: "portable audio",
            answer: "thiết bị nghe nhìn di động",
            meaning: "thiết bị nghe nhìn di động"
          },
          {
            id: "l5-v-16",
            term: "ユーザ端末",
            reading: "user たんまつ",
            answer: "người dùng cuối cùng",
            meaning: "người dùng cuối cùng"
          },
          {
            id: "l5-v-17",
            term: "リング型",
            reading: "ring がた",
            answer: "cấu hình vòng",
            meaning: "cấu hình vòng"
          },
          {
            id: "l5-v-18",
            term: "遠隔操作",
            reading: "えんかくそうさ",
            answer: "điều khiển từ xa",
            meaning: "điều khiển từ xa"
          },
          {
            id: "l5-v-19",
            term: "緩衝地帯",
            reading: "かんしょうちたい",
            answer: "vùng đệm",
            meaning: "vùng đệm"
          },
          {
            id: "l5-v-20",
            term: "局所的",
            reading: "きょくしょてき",
            answer: "tính cục bộ",
            meaning: "tính cục bộ"
          },
          {
            id: "l5-v-21",
            term: "攻撃",
            reading: "こうげき",
            answer: "tấn công",
            meaning: "tấn công"
          },
          {
            id: "l5-v-22",
            term: "集線装置",
            reading: "しゅうせんそうち",
            answer: "thiết bị tập trung đường truyền",
            meaning: "thiết bị tập trung đường truyền"
          },
          {
            id: "l5-v-23",
            term: "集中処理システム",
            reading: "しゅうちゅうしょり system",
            answer: "hệ thống xử lý tập trung",
            meaning: "hệ thống xử lý tập trung"
          },
          {
            id: "l5-v-24",
            term: "衝突",
            reading: "しょうとつ",
            answer: "xung đột",
            meaning: "xung đột"
          },
          {
            id: "l5-v-25",
            term: "接続形態",
            reading: "せつぞくけいたい",
            answer: "dạng kết nối",
            meaning: "dạng kết nối"
          },
          {
            id: "l5-v-26",
            term: "対等",
            reading: "たいとう",
            answer: "đồng đẳng",
            meaning: "đồng đẳng"
          },
          {
            id: "l5-v-27",
            term: "大域的",
            reading: "たいいきてき",
            answer: "toàn cục",
            meaning: "toàn cục"
          },
          {
            id: "l5-v-28",
            term: "中核",
            reading: "ちゅうかく",
            answer: "cốt lõi, trung tâm",
            meaning: "cốt lõi, trung tâm"
          },
          {
            id: "l5-v-29",
            term: "犯罪的行為",
            reading: "はんざいてきこうい",
            answer: "hành vi phạm tội",
            meaning: "hành vi phạm tội"
          },
          {
            id: "l5-v-30",
            term: "負荷",
            reading: "ふか",
            answer: "phụ tải, nạp vào",
            meaning: "phụ tải, nạp vào"
          },
          {
            id: "l5-v-31",
            term: "分散処理システム",
            reading: "ぶんさんしょり system",
            answer: "hệ thống xử lý phân tán",
            meaning: "hệ thống xử lý phân tán"
          },
          {
            id: "l5-v-32",
            term: "網目状",
            reading: "あみめじょう",
            answer: "mạng kiểu lưới",
            meaning: "mạng kiểu lưới"
          }
        ]
      },
      {
        id: "lesson-5-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l5-mc-1",
            question: "国と国との間のように，もっと広い範囲でのネットワークとして一般的に使われているのが（　）です。",
            choices: [
              "ホームページ",
              "ネット",
              "WAN",
              "インターネット"
            ],
            answer: "インターネット"
          },
          {
            id: "l5-mc-2",
            question: "ハブと呼ばれる集線装置を中心に複数台のコンピュータが接続されたものは何ですか。",
            choices: [
              "スター型",
              "バス型",
              "リング型",
              "ネット型"
            ],
            answer: "スター型"
          },
          {
            id: "l5-mc-3",
            question: "サーバとなっているコンピュータにはどんな情報が記録されますか。",
            choices: [
              "普通の情報",
              "重要な情報",
              "誰でも見える情報",
              "3つの選択肢の全て"
            ],
            answer: "重要な情報"
          },
          {
            id: "l5-mc-4",
            question: "ファイアウォールは，誰が何のサービスを受けるかを（　）する機器です。",
            choices: [
              "制限",
              "制御",
              "回避",
              "検査"
            ],
            answer: "制御"
          },
          {
            id: "l5-mc-5",
            question: "ネットワークの形態については何がもっともよく使われますか。",
            choices: [
              "バス型",
              "スター型",
              "リング型",
              "ネット型"
            ],
            answer: "スター型"
          },
          {
            id: "l5-mc-6",
            question: "集中処理システムについて正しくないものをえらんでください。",
            choices: [
              "管理し，ユーザ端末は入出力のみを行うような構成である",
              "集中処理システムではプログラムやデータを一元管理できる",
              "保守性が向上する",
              "集中処理システムでは，それぞれのコンピュータの負荷が分散される"
            ],
            answer: "集中処理システムでは，それぞれのコンピュータの負荷が分散される"
          },
          {
            id: "l5-mc-7",
            question: "WANについて正しいものをえらんでください",
            choices: [
              "歩いて機器の状態をチェックできない程度の範囲",
              "局所的につながるネットワークのこと",
              "大域的につながるネットワークのこと",
              "ネットワークを結んだネットワークのこと"
            ],
            answer: "大域的につながるネットワークのこと"
          },
          {
            id: "l5-mc-8",
            question: "ネットワークにおいて，外部からの不正アクセスを防ぐために内部ネットワークと外部ネットワークの間に置かれるものはどれか。",
            choices: [
              "DNSサーバ",
              "サーチエンジン",
              "スイッチングハブ",
              "ファイアウォール"
            ],
            answer: "ファイアウォール"
          },
          {
            id: "l5-mc-9",
            question: "集中処理システムとは，(　) となるコンピュータが中核となる処理すべてを管理し，ユーザ端末は入出力のみを行うような構成です。",
            choices: [
              "中心",
              "中間",
              "集中",
              "仲間"
            ],
            answer: "中心"
          },
          {
            id: "l5-mc-10",
            question: "コンピュータネットワークとは，電子機器同士が電気的にデータの（　）をできるようにしたものです。",
            choices: [
              "送信",
              "送受信",
              "受信",
              "自信"
            ],
            answer: "送受信"
          },
          {
            id: "l5-mc-11",
            question: "サーバはサービスを提供するコンピュータのことです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l5-mc-12",
            question: "クライantはユーザに対して，サービスを受けるコンピュータのことです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l5-mc-13",
            question: "バス型は，1本の通信ケーブルに複数台のコンピュータが接続されたものです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l5-mc-14",
            question: "リング型は，開いたケーブルに複数台のコンピュータが接続されたものです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l5-mc-15",
            question: "分散処理システムは，処理を複数のコンピュータで分散して管理する構成です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Bài 6 - Công nghệ Internet",
    hasTheory: true,
    sections: [
      {
        id: "lesson-6-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l6-v-1",
            term: "2 進数",
            reading: "にしんすう",
            answer: "hệ nhị phân",
            meaning: "hệ nhị phân"
          },
          {
            id: "l6-v-2",
            term: "CGI",
            reading: "Common Gateway Interface",
            answer: "giao tiếp cổng chung",
            meaning: "giao tiếp cổng chung"
          },
          {
            id: "l6-v-3",
            term: "DNS",
            reading: "Domain Name System",
            answer: "hệ thống tên miền",
            meaning: "hệ thống tên miền"
          },
          {
            id: "l6-v-4",
            term: "HTML",
            reading: "Hyper Text Markup Language",
            answer: "ngôn ngữ đánh dấu siêu văn bản",
            meaning: "ngôn ngữ đánh dấu siêu văn bản"
          },
          {
            id: "l6-v-5",
            term: "HTTP",
            reading: "Hyper Text Transfer Protocol",
            answer: "giao thức truyền tải siêu văn bản",
            meaning: "giao thức truyền tải siêu văn bản"
          },
          {
            id: "l6-v-6",
            term: "IP",
            reading: "Internet Protocol",
            answer: "giao thức mạng",
            meaning: "giao thức mạng"
          },
          {
            id: "l6-v-7",
            term: "IP アドレス",
            reading: "IP address",
            answer: "địa chỉ IP",
            meaning: "địa chỉ IP"
          },
          {
            id: "l6-v-8",
            term: "ISP",
            reading: "Internet Service Provider",
            answer: "nhà cung cấp dịch vụ Internet",
            meaning: "nhà cung cấp dịch vụ Internet"
          },
          {
            id: "l6-v-9",
            term: "OSI",
            reading: "Open System Interconnection",
            answer: "mô hình kết nối hệ thống mở",
            meaning: "mô hình kết nối hệ thống mở"
          },
          {
            id: "l6-v-10",
            term: "SEM",
            reading: "Search Engine Marketing",
            answer: "tiếp thị bằng công cụ tìm kiếm",
            meaning: "tiếp thị bằng công cụ tìm kiếm"
          },
          {
            id: "l6-v-11",
            term: "SEO",
            reading: "Search Engine Optimization",
            answer: "tối ưu hóa công cụ tìm kiếm",
            meaning: "tối ưu hóa công cụ tìm kiếm"
          },
          {
            id: "l6-v-12",
            term: "TCP",
            reading: "Transmission Control Protocol",
            answer: "giao thức điều khiển truyền vận",
            meaning: "giao thức điều khiển truyền vận"
          },
          {
            id: "l6-v-13",
            term: "アクセスポイント",
            reading: "access point",
            answer: "điểm truy cập",
            meaning: "điểm truy cập"
          },
          {
            id: "l6-v-14",
            term: "アプリケーションソフト",
            reading: "application software",
            answer: "phần mềm ứng dụng",
            meaning: "phần mềm ứng dụng"
          },
          {
            id: "l6-v-15",
            term: "アプリケーション層",
            reading: "application そう",
            answer: "lớp ứng dụng",
            meaning: "lớp ứng dụng"
          },
          {
            id: "l6-v-16",
            term: "グラフィック",
            reading: "graphic",
            answer: "đồ họa",
            meaning: "đồ họa"
          },
          {
            id: "l6-v-17",
            term: "コネクタ",
            reading: "connector",
            answer: "bộ kết nối",
            meaning: "bộ kết nối"
          },
          {
            id: "l6-v-18",
            term: "サブネットマスク",
            reading: "subnet mask",
            answer: "mặt nạ mạng con",
            meaning: "mặt nạ mạng con"
          },
          {
            id: "l6-v-19",
            term: "スタイルシート",
            reading: "style sheet",
            answer: "bảng mẫu",
            meaning: "bảng mẫu"
          },
          {
            id: "l6-v-20",
            term: "セッション層",
            reading: "session そう",
            answer: "lớp phiên",
            meaning: "lớp phiên"
          },
          {
            id: "l6-v-21",
            term: "タグ",
            reading: "tag",
            answer: "thẻ, từ khóa",
            meaning: "thẻ, từ khóa"
          },
          {
            id: "l6-v-22",
            term: "データリンク層",
            reading: "data link そう",
            answer: "lớp liên kết dữ liệu",
            meaning: "lớp liên kết dữ liệu"
          },
          {
            id: "l6-v-23",
            term: "トランスポート層",
            reading: "transport そう",
            answer: "lớp giao vận",
            meaning: "lớp giao vận"
          },
          {
            id: "l6-v-24",
            term: "ドメイン名",
            reading: "domain めい",
            answer: "tên miền",
            meaning: "tên miền"
          },
          {
            id: "l6-v-25",
            term: "ドメイン名紛争",
            reading: "domain めいふんそう",
            answer: "tranh chấp tên miền",
            meaning: "tranh chấp tên miền"
          },
          {
            id: "l6-v-26",
            term: "ネットワーク層",
            reading: "network そう",
            answer: "lớp mạng",
            meaning: "lớp mạng"
          },
          {
            id: "l6-v-27",
            term: "バケツリレー",
            reading: "bucket relay",
            answer: "truyền theo chặng",
            meaning: "truyền theo chặng"
          },
          {
            id: "l6-v-28",
            term: "ピリオド",
            reading: "period",
            answer: "dấu chấm",
            meaning: "dấu chấm"
          },
          {
            id: "l6-v-29",
            term: "プレゼンテーション層",
            reading: "presentation そう",
            answer: "lớp trình diễn",
            meaning: "lớp trình diễn"
          },
          {
            id: "l6-v-30",
            term: "プロキシサーバ",
            reading: "proxy server",
            answer: "máy chủ trung gian",
            meaning: "máy chủ trung gian"
          },
          {
            id: "l6-v-31",
            term: "プロトコル",
            reading: "protocol",
            answer: "giao thức",
            meaning: "giao thức"
          },
          {
            id: "l6-v-32",
            term: "プロバイダ",
            reading: "provider",
            answer: "nhà cung cấp dịch vụ",
            meaning: "nhà cung cấp dịch vụ"
          },
          {
            id: "l6-v-33",
            term: "暗号化する",
            reading: "あんごうかする",
            answer: "mã hóa",
            meaning: "mã hóa"
          },
          {
            id: "l6-v-34",
            term: "一覧表",
            reading: "いちらんひょう",
            answer: "bảng kê",
            meaning: "bảng kê"
          },
          {
            id: "l6-v-35",
            term: "割り当てる",
            reading: "わりあてる",
            answer: "chia đều",
            meaning: "chia đều"
          },
          {
            id: "l6-v-36",
            term: "記述言語",
            reading: "きじゅつげんご",
            answer: "ngôn ngữ đánh dấu",
            meaning: "ngôn ngữ đánh dấu"
          },
          {
            id: "l6-v-37",
            term: "区切る",
            reading: "くぎる",
            answer: "chia, ngắt",
            meaning: "chia, ngắt"
          },
          {
            id: "l6-v-38",
            term: "経路制御機器",
            reading: "けいろせいぎょきき",
            answer: "thiết bị kiểm soát đường truyền",
            meaning: "thiết bị kiểm soát đường truyền"
          },
          {
            id: "l6-v-39",
            term: "検索エンジン",
            reading: "けんさく engine",
            answer: "động cơ tìm kiếm",
            meaning: "động cơ tìm kiếm"
          },
          {
            id: "l6-v-40",
            term: "見出し",
            reading: "みだし",
            answer: "tiêu đề",
            meaning: "tiêu đề"
          },
          {
            id: "l6-v-41",
            term: "斜体 (イタリック)",
            reading: "しゃたい",
            answer: "chữ nghiêng",
            meaning: "chữ nghiêng"
          },
          {
            id: "l6-v-42",
            term: "周辺機器",
            reading: "しゅうへんきき",
            answer: "thiết bị ngoại vi",
            meaning: "thiết bị ngoại vi"
          },
          {
            id: "l6-v-43",
            term: "出力結果",
            reading: "しゅつりょくけっか",
            answer: "kết quả xuất ra",
            meaning: "kết quả xuất ra"
          },
          {
            id: "l6-v-44",
            term: "処理言語",
            reading: "しょりげんご",
            answer: "ngôn ngữ xử lý",
            meaning: "ngôn ngữ xử lý"
          },
          {
            id: "l6-v-45",
            term: "人工言語",
            reading: "じんこうげんご",
            answer: "ngôn ngữ nhân tạo",
            meaning: "ngôn ngữ nhân tạo"
          },
          {
            id: "l6-v-46",
            term: "数字の並び",
            reading: "すうじのならび",
            answer: "bộ số",
            meaning: "bộ số"
          },
          {
            id: "l6-v-47",
            term: "整合性",
            reading: "せいごうせい",
            answer: "tính nhất quán",
            meaning: "tính nhất quán"
          },
          {
            id: "l6-v-48",
            term: "組み合わせる",
            reading: "くみあわせる",
            answer: "ghép",
            meaning: "ghép"
          },
          {
            id: "l6-v-49",
            term: "損なう",
            reading: "そこなう",
            answer: "làm tổn hại",
            meaning: "làm tổn hại"
          },
          {
            id: "l6-v-50",
            term: "太字 (ボールド)",
            reading: "ふとじ",
            answer: "chữ đậm",
            meaning: "chữ đậm"
          },
          {
            id: "l6-v-51",
            term: "大幅に",
            reading: "おおはばに",
            answer: "lớn",
            meaning: "lớn"
          },
          {
            id: "l6-v-52",
            term: "抽出する",
            reading: "ちゅうしゅつする",
            answer: "truy xuất",
            meaning: "truy xuất"
          },
          {
            id: "l6-v-53",
            term: "定める",
            reading: "さだめる",
            answer: "quy định",
            meaning: "quy định"
          },
          {
            id: "l6-v-54",
            term: "適当な",
            reading: "てきとうな",
            answer: "phù hợp",
            meaning: "phù hợp"
          },
          {
            id: "l6-v-55",
            term: "転送",
            reading: "てんそう",
            answer: "chuyển tiếp",
            meaning: "chuyển tiếp"
          },
          {
            id: "l6-v-56",
            term: "動画",
            reading: "どうが",
            answer: "ảnh động",
            meaning: "ảnh động"
          },
          {
            id: "l6-v-57",
            term: "不足",
            reading: "ふそく",
            answer: "thiếu",
            meaning: "thiếu"
          },
          {
            id: "l6-v-58",
            term: "物理層",
            reading: "ぶつりそう",
            answer: "lớp vật lý",
            meaning: "lớp vật lý"
          },
          {
            id: "l6-v-59",
            term: "文字列",
            reading: "もじれつ",
            answer: "chuỗi ký tự",
            meaning: "chuỗi ký tự"
          },
          {
            id: "l6-v-60",
            term: "有利な",
            reading: "ゆうりな",
            answer: "có lợi",
            meaning: "có lợi"
          },
          {
            id: "l6-v-61",
            term: "隣接装置",
            reading: "りんせつそうち",
            answer: "thiết bị lân cận",
            meaning: "thiết bị lân cận"
          }
        ]
      },
      {
        id: "lesson-6-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l6-mc-1",
            question: "HTTPはハイパーテキスト(文字，図，音，表など)を送るためのアプリケーション層の（　）の1つです。",
            choices: [
              "転送プロトコル",
              "放送プロトコル",
              "転送テキスト",
              "放送テキスト"
            ],
            answer: "転送プロトコル"
          },
          {
            id: "l6-mc-2",
            question: "IPアドレスとドメイン名の変換を行うサーバを何と言いますか。",
            choices: [
              "DNSサーバ",
              "クライアントサーバ",
              "ホストサーバ",
              "ISPサーバ"
            ],
            answer: "DNSサーバ"
          },
          {
            id: "l6-mc-3",
            question: "ホームページを見るときも，ウェブサーバから何を経由してコンテンツ情報が送られてきますか。",
            choices: [
              "メール",
              "バケツリレー",
              "ルータ",
              "アクセスポイント"
            ],
            answer: "ルータ"
          },
          {
            id: "l6-mc-4",
            question: "途中にあるサーバが故障していると，どのようなことが起こりますか。",
            choices: [
              "メールが故障しない",
              "ホームページ閲覧ができる",
              "サーバの管理者は情報が把握できない",
              "メールが送られない"
            ],
            answer: "メールが送られない"
          },
          {
            id: "l6-mc-5",
            question: "インターネット経由のメールは，どんな程度の安全性ですか。",
            choices: [
              "手紙",
              "はがき",
              "秘密",
              "機密"
            ],
            answer: "はがき"
          },
          {
            id: "l6-mc-6",
            question: "「.com」のように種別だけで国名がないのはどこのドメイン名ですか。",
            choices: [
              "ベトナム",
              "イギリス",
              "フランス",
              "アメリカ"
            ],
            answer: "アメリカ"
          },
          {
            id: "l6-mc-7",
            question: "IPアドレスについて正しくないものをえらんでください。",
            choices: [
              "コンピュータの住所にあたる名前である",
              "ネットワーク層のIPプロトコルに従って番号が割り当てられている",
              "桁数の多い数字の並びである",
              "覚えやすい"
            ],
            answer: "覚えやすい"
          },
          {
            id: "l6-mc-8",
            question: "プロトコルとは何ですか。",
            choices: [
              "コンピュータを接続したもの",
              "コンピュータが従うべきデータ転送規約のこと",
              "情報の送受信をするためのもの",
              "標準規約を定めるもの"
            ],
            answer: "コンピュータが従うべきデータ転送規約のこと"
          },
          {
            id: "l6-mc-9",
            question: "HTMLは，「<」と「>」で囲まれた中の（　）という標識によって情報を記述します。",
            choices: [
              "ビット",
              "スタイルシート",
              "タイトル",
              "タグ"
            ],
            answer: "タグ"
          },
          {
            id: "l6-mc-10",
            question: "IPアドレスは入力間違いが多い",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l6-mc-11",
            question: "ドメイン名は覚えにくい。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l6-mc-12",
            question: "インターネットには世界中のコンピュータが接続されるので，メールを送ったりホームページにアクセスしたりする先のコンピュータを正しく指定しなければなりません",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Bài 7 - Sử dụng Internet trong kinh doanh",
    hasTheory: true,
    sections: [
      {
        id: "lesson-7-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l7-v-1",
            term: "BtoB / 企業間",
            reading: "Business to Business / きぎょうかん",
            answer: "giao dịch giữa doanh nghiệp với doanh nghiệp",
            meaning: "giao dịch giữa doanh nghiệp với doanh nghiệp"
          },
          {
            id: "l7-v-2",
            term: "BtoC / 企業対消費者",
            reading: "Business to Consumer / きぎょうたいしょうひしゃ",
            answer: "doanh nghiệp với người tiêu dùng",
            meaning: "doanh nghiệp với người tiêu dùng"
          },
          {
            id: "l7-v-3",
            term: "CALS",
            reading: "Commerce At Light Speed",
            answer: "thương mại tốc độ ánh sáng",
            meaning: "thương mại tốc độ ánh sáng"
          },
          {
            id: "l7-v-4",
            term: "CRM",
            reading: "Customer Relationship Management",
            answer: "quản trị quan hệ khách hàng",
            meaning: "quản trị quan hệ khách hàng"
          },
          {
            id: "l7-v-5",
            term: "CtoC / 消費者間",
            reading: "Consumer to Consumer / しょうひしゃかん",
            answer: "người tiêu dùng với người tiêu dùng",
            meaning: "người tiêu dùng với người tiêu dùng"
          },
          {
            id: "l7-v-6",
            term: "EDI",
            reading: "Electronic Data Interchange",
            answer: "trao đổi dữ liệu điện tử",
            meaning: "trao đổi dữ liệu điện tử"
          },
          {
            id: "l7-v-7",
            term: "EOS",
            reading: "Electronic Ordering System",
            answer: "hệ thống đặt hàng điện tử",
            meaning: "hệ thống đặt hàng điện tử"
          },
          {
            id: "l7-v-8",
            term: "e コマース",
            reading: "e-commerce",
            answer: "thương mại điện tử",
            meaning: "thương mại điện tử"
          },
          {
            id: "l7-v-9",
            term: "を介する",
            reading: "をかいする",
            answer: "thông qua",
            meaning: "thông qua"
          },
          {
            id: "l7-v-10",
            term: "オープンループ型",
            reading: "open loop がた",
            answer: "kiểu mở",
            meaning: "kiểu mở"
          },
          {
            id: "l7-v-11",
            term: "オリジネータ",
            reading: "originator",
            answer: "người khởi đầu, người sáng tạo",
            meaning: "người khởi đầu, người sáng tạo"
          },
          {
            id: "l7-v-12",
            term: "オンラインショッピング",
            reading: "online shopping",
            answer: "mua hàng trực tuyến",
            meaning: "mua hàng trực tuyến"
          },
          {
            id: "l7-v-13",
            term: "クローズドループ型",
            reading: "closed loop がた",
            answer: "kiểu khép kín",
            meaning: "kiểu khép kín"
          },
          {
            id: "l7-v-14",
            term: "チャージする",
            reading: "charge する",
            answer: "nạp tiền",
            meaning: "nạp tiền"
          },
          {
            id: "l7-v-15",
            term: "データマイニング",
            reading: "data mining",
            answer: "khai thác dữ liệu",
            meaning: "khai thác dữ liệu"
          },
          {
            id: "l7-v-16",
            term: "ネットオークション",
            reading: "net auction",
            answer: "đấu giá qua mạng",
            meaning: "đấu giá qua mạng"
          },
          {
            id: "l7-v-17",
            term: "バリュー",
            reading: "value",
            answer: "giá trị",
            meaning: "giá trị"
          },
          {
            id: "l7-v-18",
            term: "遠方",
            reading: "えんぽう",
            answer: "xa",
            meaning: "xa"
          },
          {
            id: "l7-v-19",
            term: "受注",
            reading: "じゅちゅう",
            answer: "nhận đơn hàng",
            meaning: "nhận đơn hàng"
          },
          {
            id: "l7-v-20",
            term: "商品開発",
            reading: "しょうひんかいはつ",
            answer: "nghiên cứu sản phẩm",
            meaning: "nghiên cứu sản phẩm"
          },
          {
            id: "l7-v-21",
            term: "中間マージン",
            reading: "ちゅうかん margin",
            answer: "hoa hồng",
            meaning: "hoa hồng"
          },
          {
            id: "l7-v-22",
            term: "電子マネー",
            reading: "でんし money",
            answer: "tiền điện tử",
            meaning: "tiền điện tử"
          },
          {
            id: "l7-v-23",
            term: "電子商取引",
            reading: "でんししょうとりひき",
            answer: "giao dịch thương mại điện tử",
            meaning: "giao dịch thương mại điện tử"
          },
          {
            id: "l7-v-24",
            term: "匿名",
            reading: "とくめい",
            answer: "nặc danh",
            meaning: "nặc danh"
          },
          {
            id: "l7-v-25",
            term: "発注",
            reading: "はっちゅう",
            answer: "đặt hàng",
            meaning: "đặt hàng"
          },
          {
            id: "l7-v-26",
            term: "抜き出す",
            reading: "ぬきだす",
            answer: "nhổ ra, ngắt",
            meaning: "nhổ ra, ngắt"
          },
          {
            id: "l7-v-27",
            term: "流通過程",
            reading: "りゅうつうかてい",
            answer: "quá trình lưu thông",
            meaning: "quá trình lưu thông"
          }
        ]
      },
      {
        id: "lesson-7-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l7-mc-1",
            question: "（　）とは，オンラインで販売時点のデータを管理するシステムのことです。",
            choices: [
              "EOS",
              "CALS",
              "POS",
              "EDI"
            ],
            answer: "POS"
          },
          {
            id: "l7-mc-2",
            question: "消費者間取引のことは何ですか。",
            choices: [
              "CtoC",
              "BtoB",
              "BtoC",
              "CtoB"
            ],
            answer: "CtoC"
          },
          {
            id: "l7-mc-3",
            question: "EDIは何ですか。",
            choices: [
              "オンラインの受発注システムのこと",
              "文書，図面，取引情報などが扱われること",
              "製造業における全製造過程(開発，製造，納入，保守)の電子化についての標準化のこと",
              "ネットワークを使った電子データ交換の標準化のこと"
            ],
            answer: "ネットワークを使った電子データ交換の標準化のこと"
          },
          {
            id: "l7-mc-4",
            question: "ウェブサイトに対するID情報を記憶させ，再度そのサイトにアクセスしたときには自分が誰かを自動的に伝えるのは何という仕組みですか。",
            choices: [
              "CRM",
              "クッキー",
              "ブラウザ",
              "データマイニング"
            ],
            answer: "クッキー"
          },
          {
            id: "l7-mc-5",
            question: "電子商取引は何を介した取引プロセスの電子化のことですか。",
            choices: [
              "電気",
              "電荷",
              "ネットワーク",
              "eコマース"
            ],
            answer: "ネットワーク"
          },
          {
            id: "l7-mc-6",
            question: "VISAキャッシュはどんな型の電子マネーですか。",
            choices: [
              "オープンループ型",
              "クローズドループ型",
              "バリュー型",
              "インターネットを使った型"
            ],
            answer: "クローズドループ型"
          },
          {
            id: "l7-mc-7",
            question: "電子商取引情報の標準化 であるEOSについて正しいものをえらんでください。",
            choices: [
              "ネットワークを使った電子データ交換の標準化",
              "オンラインの受発注システム",
              "製造業における全製造過程の電子化についての標準化",
              "企業間でも同じデータで取引できるように策定された標準化"
            ],
            answer: "オンラインの受発注システム"
          },
          {
            id: "l7-mc-8",
            question: "取引プロセスとは，受注，発注，（　）以外にも商品案内や配送などの処理，さらには商品開発まで含めます。",
            choices: [
              "決済",
              "注文",
              "計算",
              "開発"
            ],
            answer: "決済"
          },
          {
            id: "l7-mc-9",
            question: "BtoCは企業対消費者取引のことです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l7-mc-10",
            question: "BtoBは消費者間取引のことです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l7-mc-11",
            question: "コンピュータ化によって顧客についての多様な情報をまとめて管理することが容易になり，コピーして複製を残すことが容易になりました。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          },
          {
            id: "l7-mc-12",
            question: "クローズドループ型の代表的なものはMaster CardのMondexです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai"
          },
          {
            id: "l7-mc-13",
            question: "電子化し，ネットワークを利用することで，コスト削減につながります。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Bài 8 - Mã hóa",
    hasTheory: true,
    sections: [
      {
        id: "lesson-8-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l8-v-1",
            term: "DES",
            reading: "Data Encryption Standard",
            answer: "tiêu chuẩn mã hóa dữ liệu",
            meaning: "tiêu chuẩn mã hóa dữ liệu"
          },
          {
            id: "l8-v-2",
            term: "RSA",
            reading: "Rivest, Shamir, Adleman",
            answer: "hệ thống mật mã khóa công khai RSA",
            meaning: "hệ thống mật mã khóa công khai RSA"
          },
          {
            id: "l8-v-3",
            term: "ずらす",
            reading: "",
            answer: "xê dịch",
            meaning: "xê dịch"
          },
          {
            id: "l8-v-4",
            term: "なりすまし",
            reading: "",
            answer: "giả mạo, đánh lừa",
            meaning: "giả mạo, đánh lừa"
          },
          {
            id: "l8-v-5",
            term: "シーザー暗号",
            reading: "Caesar あんごう",
            answer: "mã hóa thay thế",
            meaning: "mã hóa thay thế"
          },
          {
            id: "l8-v-6",
            term: "スキュタレー暗号",
            reading: "Scytale あんごう",
            answer: "mã hóa hoán vị",
            meaning: "mã hóa hoán vị"
          },
          {
            id: "l8-v-7",
            term: "デジタル証明書",
            reading: "digital しょうめいしょ",
            answer: "chứng nhận kỹ thuật số",
            meaning: "chứng nhận kỹ thuật số"
          },
          {
            id: "l8-v-8",
            term: "ペア",
            reading: "pair",
            answer: "một cặp",
            meaning: "một cặp"
          },
          {
            id: "l8-v-9",
            term: "暗号化",
            reading: "あんごうか",
            answer: "mã hóa",
            meaning: "mã hóa"
          },
          {
            id: "l8-v-10",
            term: "円筒",
            reading: "えんとう",
            answer: "hình trụ",
            meaning: "hình trụ"
          },
          {
            id: "l8-v-11",
            term: "換字式暗号",
            reading: "かんじしきあんごう",
            answer: "mã thay thế",
            meaning: "mã thay thế"
          },
          {
            id: "l8-v-12",
            term: "肝心",
            reading: "かんじん",
            answer: "điểm quan trọng",
            meaning: "điểm quan trọng"
          },
          {
            id: "l8-v-13",
            term: "関数",
            reading: "かんすう",
            answer: "hàm số",
            meaning: "hàm số"
          },
          {
            id: "l8-v-14",
            term: "紀元前",
            reading: "きげんぜん",
            answer: "trước công nguyên",
            meaning: "trước công nguyên"
          },
          {
            id: "l8-v-15",
            term: "偽る",
            reading: "いつわる",
            answer: "giả mạo",
            meaning: "giả mạo"
          },
          {
            id: "l8-v-16",
            term: "共通鍵",
            reading: "きょうつうかぎ",
            answer: "mã khóa chung",
            meaning: "mã khóa chung"
          },
          {
            id: "l8-v-17",
            term: "共通鍵方式",
            reading: "きょうつうかぎ ほうしき",
            answer: "phương thức khóa chung",
            meaning: "phương thức khóa chung"
          },
          {
            id: "l8-v-18",
            term: "古典的",
            reading: "こてんてき",
            answer: "mang tính cổ điển",
            meaning: "mang tính cổ điển"
          },
          {
            id: "l8-v-19",
            term: "公開鍵",
            reading: "こうかいかぎ",
            answer: "mã khóa công khai",
            meaning: "mã khóa công khai"
          },
          {
            id: "l8-v-20",
            term: "公開鍵方式",
            reading: "こうかいかぎほうしき",
            answer: "phương thức khóa công khai",
            meaning: "phương thức khóa công khai"
          },
          {
            id: "l8-v-21",
            term: "錠",
            reading: "じょう",
            answer: "khóa",
            meaning: "khóa"
          },
          {
            id: "l8-v-22",
            term: "整える",
            reading: "ととのえる",
            answer: "hoàn thiện",
            meaning: "hoàn thiện"
          },
          {
            id: "l8-v-23",
            term: "生成する",
            reading: "せいせいする",
            answer: "hình thành, tạo thành",
            meaning: "hình thành, tạo thành"
          },
          {
            id: "l8-v-24",
            term: "素因数",
            reading: "そいんすう",
            answer: "thừa số nguyên tố",
            meaning: "thừa số nguyên tố"
          },
          {
            id: "l8-v-25",
            term: "直径",
            reading: "ちょっけい",
            answer: "đường kính",
            meaning: "đường kính"
          },
          {
            id: "l8-v-26",
            term: "転置式",
            reading: "てんちしき",
            answer: "kiểu hoán vị",
            meaning: "kiểu hoán vị"
          },
          {
            id: "l8-v-27",
            term: "当人",
            reading: "とうにん",
            answer: "bản thân người đó",
            meaning: "bản thân người đó"
          },
          {
            id: "l8-v-28",
            term: "認証",
            reading: "にんしょう",
            answer: "xác thực, chứng nhận",
            meaning: "xác thực, chứng nhận"
          },
          {
            id: "l8-v-29",
            term: "認証局",
            reading: "にんしょうきょく",
            answer: "cục chứng nhận",
            meaning: "cục chứng nhận"
          },
          {
            id: "l8-v-30",
            term: "秘密鍵",
            reading: "ひみつかぎ",
            answer: "mã khóa bí mật",
            meaning: "mã khóa bí mật"
          },
          {
            id: "l8-v-31",
            term: "秘密鍵方式",
            reading: "ひみつかぎほうしき",
            answer: "phương thức khóa bí mật",
            meaning: "phương thức khóa bí mật"
          },
          {
            id: "l8-v-32",
            term: "復元する",
            reading: "ふくげんする",
            answer: "phục hồi",
            meaning: "phục hồi"
          },
          {
            id: "l8-v-33",
            term: "復号化",
            reading: "ふくごうか",
            answer: "giải mã",
            meaning: "giải mã"
          },
          {
            id: "l8-v-34",
            term: "乱数表",
            reading: "らんすうひょう",
            answer: "bảng số ngẫu nhiên",
            meaning: "bảng số ngẫu nhiên"
          }
        ]
      },
      {
        id: "lesson-8-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l8-mc-1",
            question: "暗号化について正しいものを選びなさい。",
            choices: [
              "与えられた原文が推測できないように変換すること",
              "与えられた原文が推測できるように変換すること",
              "与えられた原文に戻すこと",
              "機械だけで原文に戻すこと"
            ],
            answer: "与えられた原文が推測できないように変換すること",
            explanation: "Mã hóa (暗号化) là việc biến đổi bản rõ ban đầu (原文) thành bản mã sao cho không thể suy đoán hay đọc hiểu được nội dung nếu không có khóa giải mã."
          },
          {
            id: "l8-mc-2",
            question: "（　）とは，送られてきた文書が確かに本人のものであるかどうかを確かめることです。",
            choices: [
              "確認",
              "認証",
              "認識",
              "正確"
            ],
            answer: "認証",
            explanation: "Xác thực (認証 - Authentication) là việc xác nhận xem tài liệu gửi đến có thực sự là của chính người đó gửi hay không."
          },
          {
            id: "l8-mc-3",
            question: "換字式の暗号方式について正しいものをえらんでください",
            choices: [
              "機械を使って暗号化する",
              "受け取る側では何文字ずらしたかを知らなくても復号化ができる",
              "文字を何文字かずらすことで暗号化する",
              "最近の暗号方式である"
            ],
            answer: "文字を何文字かずらすことで暗号化する",
            explanation: "Mật mã thay thế (換字式暗号), ví dụ điển hình là mật mã Caesar, hoạt động bằng cách dịch chuyển các chữ cái đi một số vị trí cố định trong bảng chữ cái."
          },
          {
            id: "l8-mc-4",
            question: "錠のアイコンは，入力された情報が何によって暗号化されている状態であることを表しますか。",
            choices: [
              "HTTPS",
              "DES",
              "RSA",
              "SSL"
            ],
            answer: "SSL",
            explanation: "Biểu tượng ổ khóa (錠のアイコン) trên trình duyệt biểu thị rằng thông tin nhập vào đang được truyền tải an toàn bằng cách mã hóa qua giao thức SSL (hoặc TLS)."
          },
          {
            id: "l8-mc-5",
            question: "鍵を第三者にも知らせてしまう暗号化方式を何と呼びますか。",
            choices: [
              "秘密鍵方式",
              "公開鍵方式",
              "共通鍵方式",
              "展開鍵方式"
            ],
            answer: "公開鍵方式",
            explanation: "Phương thức mã hóa khóa công khai (公開鍵方式 - Public Key Cryptography) là phương thức mà trong đó khóa mã hóa (khóa công khai) được công khai rộng rãi cho bất kỳ ai (kể cả bên thứ ba) biết."
          },
          {
            id: "l8-mc-6",
            question: "暗号化して送る側と，受け取って復号化する側は，共通の鍵を持ち，他人に知られないようにして通信している暗号化方式は何ですか。",
            choices: [
              "秘密鍵方式",
              "公開鍵方式",
              "機密鍵方式",
              "展開鍵方式"
            ],
            answer: "秘密鍵方式",
            explanation: "Phương thức mã hóa khóa bí mật (秘密鍵方式 / 共通鍵方式) sử dụng cùng một khóa chung bí mật để cả người gửi tiến hành mã hóa và người nhận thực hiện giải mã."
          },
          {
            id: "l8-mc-7",
            question: "機械を使う（　）の暗号化の1つであるスキュタレー暗号では，円筒にリボンを巻き付けて，リボンに文字を横に書いて送ります。",
            choices: [
              "換字式",
              "転置式",
              "暗号式",
              "復号式"
            ],
            answer: "転置式",
            explanation: "Mật mã Scytale (スキュタレー暗号) hoạt động bằng cách quấn ruy-băng quanh ống trụ tròn, viết văn bản dọc theo ống rồi tháo ruy-băng ra làm thay đổi vị trí (thứ tự) các chữ cái, nên đây là loại mã hóa hoán vị (転置式)."
          },
          {
            id: "l8-mc-8",
            question: "換字式の暗号方式について正しくないものをえらんでください。",
            choices: [
              "文字を何文字かずらすことで暗号化する",
              "規則的にずらすのではない",
              "通信者同士が共通に持つ乱数表などを使う",
              "受け取る側では何文字ずらしたかを知らなくても復号化ができる"
            ],
            answer: "受け取る側では何文字ずらしたかを知らなくても復号化ができる",
            explanation: "Phát biểu sai: Người nhận bắt buộc phải biết quy tắc xê dịch bao nhiêu ký tự (khóa giải mã) mới có thể giải mã thành công bản rõ."
          },
          {
            id: "l8-mc-9",
            question: "最近の暗号では，何を使って暗号化，復号化を行いますか。",
            choices: [
              "機械",
              "電子",
              "ネットワーク",
              "コンピューター"
            ],
            answer: "コンピューター",
            explanation: "Trong mật mã hiện đại ngày nay, việc mã hóa và giải mã được thực hiện bằng sức mạnh tính toán của máy tính (コンピューター)."
          },
          {
            id: "l8-mc-10",
            question: "公開鍵方式について正しくないものをえらんでください。",
            choices: [
              "鍵を第三者にも公開してしまう暗号化方式",
              "今の暗号化の主流となっている",
              "公開するのは暗号化の鍵だけである",
              "鍵を第三者に公開しない暗号化方式"
            ],
            answer: "鍵を第三者に公開しない暗号化方式",
            explanation: "Phát biểu sai: Phương thức khóa công khai (公開鍵方式) bắt buộc phải công khai khóa mã hóa (khóa công khai) cho tất cả mọi người (kể cả bên thứ ba), chỉ giữ bí mật duy nhất khóa giải mã (khóa bí mật)."
          },
          {
            id: "l8-mc-11",
            question: "共通鍵方式はハガキ程度の安全性しかない",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai",
            explanation: "Phát biểu sai: Phương thức khóa chung (共通鍵方式) cực kỳ an toàn nếu giữ bí mật được khóa. Trái lại, việc gửi dữ liệu không mã hóa mới được ví như viết trên bưu thiếp (ハガキ) ai cũng đọc được."
          },
          {
            id: "l8-mc-12",
            question: "原文に戻すことを復号化と言います",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: Quá trình chuyển đổi từ bản mã trở lại bản rõ ban đầu (原文) được gọi là giải mã (復号化)."
          },
          {
            id: "l8-mc-13",
            question: "HTTPSは公開鍵方式と秘密鍵方式により暗号化した状態で情報通信を行うことを示します．",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai",
            explanation: "Phát biểu sai: HTTPS thực hiện truyền thông tin được mã hóa bằng SSL/TLS, sử dụng kết hợp phương thức khóa công khai (公開鍵方式) và phương thức khóa chung (共通鍵/秘密鍵方式) chứ không phải phương thức khóa bí mật (秘密鍵方式 - vốn chỉ dùng trong mật mã đối xứng độc lập)."
          },
          {
            id: "l8-mc-14",
            question: "X さんは，Y さんにインターネットを使って電子メールを送ろうとしている．電子メールの内容を秘密にする必要があるので，公開鍵暗号方式を用いて暗号化して送信したい．電子メールの内容を暗号化するのに使用する鍵はどれか．",
            choices: [
              "(ア) Xさんの公開鍵",
              "(イ) Xさんの秘密鍵",
              "(ウ) Yさんの公開鍵",
              "(エ) Yさんの秘密鍵"
            ],
            answer: "(ウ) Yさんの公開鍵",
            explanation: "Để gửi thư bảo mật cho Y bằng phương thức khóa công khai, X cần dùng Khóa công khai của người nhận Y (Yさんの公開鍵). Chỉ có Y mới sở hữu khóa bí mật tương ứng (Yさんの秘密鍵) để giải mã bức thư này."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Bài 9 - An toàn thông tin",
    hasTheory: true,
    sections: [
      {
        id: "lesson-9-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l9-v-1",
            term: "DoS",
            reading: "Denial of Services",
            answer: "tấn công từ chối dịch vụ",
            meaning: "tấn công từ chối dịch vụ"
          },
          {
            id: "l9-v-2",
            term: "RAID",
            reading: "Random Array of Inexpensive Disks",
            answer: "các dãy đĩa cứng dư thừa độc lập",
            meaning: "các dãy đĩa cứng dư thừa độc lập"
          },
          {
            id: "l9-v-3",
            term: "ウィルス",
            reading: "virus",
            answer: "vi rút",
            meaning: "vi rút"
          },
          {
            id: "l9-v-4",
            term: "コンパクトフラッシュ",
            reading: "compact flash",
            answer: "một loại thẻ nhớ nhỏ",
            meaning: "một loại thẻ nhớ nhỏ"
          },
          {
            id: "l9-v-5",
            term: "スカベンジング",
            reading: "scavenging",
            answer: "thủ thuật scaveging",
            meaning: "thủ thuật scaveging"
          },
          {
            id: "l9-v-6",
            term: "スパムメール",
            reading: "spam mail",
            answer: "thư rác",
            meaning: "thư rác"
          },
          {
            id: "l9-v-7",
            term: "デバイスドライバ",
            reading: "device driver",
            answer: "driver thiết bị",
            meaning: "driver thiết bị"
          },
          {
            id: "l9-v-8",
            term: "トロイの木馬",
            reading: "trojan のもくば",
            answer: "ngựa thành Troa (chương trình độc hại giấu mình dưới dạng chương trình hữu ích)",
            meaning: "ngựa thành Troa (chương trình độc hại giấu mình dưới dạng chương trình hữu ích)"
          },
          {
            id: "l9-v-9",
            term: "バスタブ曲線",
            reading: "bath tub きょくせん",
            answer: "đường cong hình bồn tắm",
            meaning: "đường cong hình bồn tắm"
          },
          {
            id: "l9-v-10",
            term: "バックアップ",
            reading: "back up",
            answer: "sao lưu",
            meaning: "sao lưu"
          },
          {
            id: "l9-v-11",
            term: "パターンファイル",
            reading: "pattern file",
            answer: "một phần mềm đặc biệt của Trend Micro giúp bảo vệ máy tính",
            meaning: "một phần mềm đặc biệt của Trend Micro giúp bảo vệ máy tính"
          },
          {
            id: "l9-v-12",
            term: "フィッシング",
            reading: "phishing",
            answer: "trò lừa phishing",
            meaning: "trò lừa phishing"
          },
          {
            id: "l9-v-13",
            term: "ブラウザ",
            reading: "browser",
            answer: "trình duyệt",
            meaning: "trình duyệt"
          },
          {
            id: "l9-v-14",
            term: "プログラムミス / バグ",
            reading: "program miss / bug",
            answer: "lỗi chương trình",
            meaning: "lỗi chương trình"
          },
          {
            id: "l9-v-15",
            term: "ワーム",
            reading: "worm",
            answer: "sâu (vi rút máy tính)",
            meaning: "sâu (vi rút máy tính)"
          },
          {
            id: "l9-v-16",
            term: "ワクチン",
            reading: "vaccine",
            answer: "vắc xin",
            meaning: "vắc xin"
          },
          {
            id: "l9-v-17",
            term: "悪用する",
            reading: "あくようする",
            answer: "dùng với mục đích xấu",
            meaning: "dùng với mục đích xấu"
          },
          {
            id: "l9-v-18",
            term: "宛先",
            reading: "あてさき",
            answer: "người nhận",
            meaning: "người nhận"
          },
          {
            id: "l9-v-19",
            term: "可動部分",
            reading: "かどうぶぶん",
            answer: "phần có thể tháo rời",
            meaning: "phần có thể tháo rời"
          },
          {
            id: "l9-v-20",
            term: "稼働率",
            reading: "かどうりつ",
            answer: "tỷ lệ hoạt động",
            meaning: "tỷ lệ hoạt động"
          },
          {
            id: "l9-v-21",
            term: "改ざんする",
            reading: "かいざんする",
            answer: "sửa đổi",
            meaning: "sửa đổi"
          },
          {
            id: "l9-v-22",
            term: "感染経路",
            reading: "かんせんけいろ",
            answer: "con đường lây nhiễm",
            meaning: "con đường lây nhiễm"
          },
          {
            id: "l9-v-23",
            term: "起動不能",
            reading: "きどうふのう",
            answer: "không thể khởi động",
            meaning: "không thể khởi động"
          },
          {
            id: "l9-v-24",
            term: "挙動",
            reading: "きょどう",
            answer: "cử động",
            meaning: "cử động"
          },
          {
            id: "l9-v-25",
            term: "攻撃対象",
            reading: "こうげきたいしょう",
            answer: "đối tượng tấn công",
            meaning: "đối tượng tấn công"
          },
          {
            id: "l9-v-26",
            term: "詐欺紛い",
            reading: "さぎまがい",
            answer: "lừa đảo",
            meaning: "lừa đảo"
          },
          {
            id: "l9-v-27",
            term: "最新版",
            reading: "さいしんばん",
            answer: "phiên bản mới nhất",
            meaning: "phiên bản mới nhất"
          },
          {
            id: "l9-v-28",
            term: "指紋",
            reading: "しもん",
            answer: "vân tay",
            meaning: "vân tay"
          },
          {
            id: "l9-v-29",
            term: "磁性体",
            reading: "じせいたい",
            answer: "từ tính",
            meaning: "từ tính"
          },
          {
            id: "l9-v-30",
            term: "手口",
            reading: "てぐち",
            answer: "thủ đoạn",
            meaning: "thủ đoạn"
          },
          {
            id: "l9-v-31",
            term: "商用アプリケーション",
            reading: "しょうよう application",
            answer: "phần mềm ứng dụng dùng trong thương mại",
            meaning: "phần mềm ứng dụng dùng trong thương mại"
          },
          {
            id: "l9-v-32",
            term: "消耗する",
            reading: "しょうもうする",
            answer: "tiêu hao",
            meaning: "tiêu hao"
          },
          {
            id: "l9-v-33",
            term: "衝撃",
            reading: "しょうげき",
            answer: "va chạm",
            meaning: "va chạm"
          },
          {
            id: "l9-v-34",
            term: "常時",
            reading: "じょうじ",
            answer: "thông thường",
            meaning: "thông thường"
          },
          {
            id: "l9-v-35",
            term: "信頼度成長曲線",
            reading: "しんらいどせいちょうきょくせん",
            answer: "đường cong độ tin cậy",
            meaning: "đường cong độ tin cậy"
          },
          {
            id: "l9-v-36",
            term: "新種",
            reading: "しんしゅ",
            answer: "kiểu mới, loại mới",
            meaning: "kiểu mới, loại mới"
          },
          {
            id: "l9-v-37",
            term: "人為的",
            reading: "じんいてき",
            answer: "mang tính nhân tạo",
            meaning: "mang tính nhân tạo"
          },
          {
            id: "l9-v-38",
            term: "生体認証 / バイオメトリクス",
            reading: "せいたいにんしょう / biometrics",
            answer: "nhận dạng sinh trắc học",
            meaning: "nhận dạng sinh trắc học"
          },
          {
            id: "l9-v-39",
            term: "静脈",
            reading: "じょうみゃく",
            answer: "tĩnh mạch",
            meaning: "tĩnh mạch"
          },
          {
            id: "l9-v-40",
            term: "窃盗",
            reading: "せっとう",
            answer: "trộm cắp",
            meaning: "trộm cắp"
          },
          {
            id: "l9-v-41",
            term: "潜伏期間",
            reading: "せんぷくきかん",
            answer: "thời gian ủ bệnh",
            meaning: "thời gian ủ bệnh"
          },
          {
            id: "l9-v-42",
            term: "狙う",
            reading: "ねらう",
            answer: "nhắm tới, nhằm vào",
            meaning: "nhắm tới, nhằm vào"
          },
          {
            id: "l9-v-43",
            term: "装う",
            reading: "よそおう",
            answer: "ngụy trang",
            meaning: "ngụy trang"
          },
          {
            id: "l9-v-44",
            term: "増殖する",
            reading: "ぞうしょくする",
            answer: "nhân bản",
            meaning: "nhân bản"
          },
          {
            id: "l9-v-45",
            term: "即座に",
            reading: "そくざに",
            answer: "ngay tức thời",
            meaning: "ngay tức thời"
          },
          {
            id: "l9-v-46",
            term: "注意深い",
            reading: "ちゅういぶかい",
            answer: "đặc biệt chú ý",
            meaning: "đặc biệt chú ý"
          },
          {
            id: "l9-v-47",
            term: "直列システム",
            reading: "ちょくれつ system",
            answer: "hệ thống nối tiếp",
            meaning: "hệ thống nối tiếp"
          },
          {
            id: "l9-v-48",
            term: "伝染",
            reading: "でんせん",
            answer: "truyền nhiễm",
            meaning: "truyền nhiễm"
          },
          {
            id: "l9-v-49",
            term: "盗み取る",
            reading: "ぬすみとる",
            answer: "lấy cắp",
            meaning: "lấy cắp"
          },
          {
            id: "l9-v-50",
            term: "踏み台",
            reading: "ふみだい",
            answer: "bệ đỡ, giá đỡ, bước đệm",
            meaning: "bệ đỡ, giá đỡ, bước đệm"
          },
          {
            id: "l9-v-51",
            term: "入力画面",
            reading: "にゅうりょくがめん",
            answer: "màn hình nhập",
            meaning: "màn hình nhập"
          },
          {
            id: "l9-v-52",
            term: "不正侵入",
            reading: "ふせいしんにゅう",
            answer: "xâm nhập bất hợp pháp",
            meaning: "xâm nhập bất hợp pháp"
          },
          {
            id: "l9-v-53",
            term: "復活",
            reading: "ふっかつ",
            answer: "khôi phục",
            meaning: "khôi phục"
          },
          {
            id: "l9-v-54",
            term: "平均故障間隔 / MTBF",
            reading: "へいきんこしょうかんかく / Mean Time Between Failures",
            answer: "thời gian trung bình giữa những lần hỏng",
            meaning: "thời gian trung bình giữa những lần hỏng"
          },
          {
            id: "l9-v-55",
            term: "平均修理時間 / MTTR",
            reading: "へいきんしゅうりじかん / Mean Time To Repair",
            answer: "thời gian trung bình để sửa chữa",
            meaning: "thời gian trung bình để sửa chữa"
          },
          {
            id: "l9-v-56",
            term: "並列システム",
            reading: "へいれつ system",
            answer: "hệ thống song song",
            meaning: "hệ thống song song"
          },
          {
            id: "l9-v-57",
            term: "放置する",
            reading: "ほうちする",
            answer: "bỏ mặc",
            meaning: "bỏ mặc"
          },
          {
            id: "l9-v-58",
            term: "未承諾",
            reading: "みしょうだく",
            answer: "chưa được cho phép",
            meaning: "chưa được cho phép"
          },
          {
            id: "l9-v-59",
            term: "予備",
            reading: "よび",
            answer: "dự phòng",
            meaning: "dự phòng"
          },
          {
            id: "l9-v-60",
            term: "予防法",
            reading: "よぼうほう",
            answer: "phương pháp phòng chống",
            meaning: "phương pháp phòng chống"
          },
          {
            id: "l9-v-61",
            term: "落雷",
            reading: "らくらい",
            answer: "sét",
            meaning: "sét"
          },
          {
            id: "l9-v-62",
            term: "埃",
            reading: "ほこり",
            answer: "bụi",
            meaning: "bụi"
          }
        ]
      },
      {
        id: "lesson-9-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l9-mc-1",
            question: "（　）に入る言葉は何ですか。（　）は複数箇所にデータのコピーを残すことです。",
            choices: [
              "ウィルスワクチン",
              "スカベンジング",
              "バッグアップ",
              "フィッシング"
            ],
            answer: "バッグアップ",
            explanation: "Sự sao lưu (バックアップ / バッグアップ) là việc tạo ra và lưu trữ các bản sao của dữ liệu ở nhiều vị trí khác nhau để phòng ngừa sự cố mất mát."
          },
          {
            id: "l9-mc-2",
            question: "コンピューターのウィルスについて正しいものを選びなさい。",
            choices: [
              "個人のパソコンをねらった犯罪である",
              "機械的に作成されたプログラムである",
              "感染経路はいろいろない",
              "人に感染する可能性がある"
            ],
            answer: "個人のパソコンをねらった犯罪である",
            explanation: "Phát biểu đúng: Virus máy tính là các chương trình độc hại do con người viết ra nhằm mục đích phá hoại hoặc thực hiện hành vi tội phạm nhắm vào máy tính của cá nhân/tổ chức."
          },
          {
            id: "l9-mc-3",
            question: "未承諾の広告，詐欺紛いの内容などの迷惑メールのことを何と言いますか。",
            choices: [
              "スパムメール",
              "フリーメール",
              "プロバイダメール",
              "ウェブメール"
            ],
            answer: "スパムメール",
            explanation: "Thư rác (スパムメール - Spam Mail) là các email quảng cáo chưa được sự đồng ý của người nhận, hoặc chứa nội dung lừa đảo gây phiền toái."
          },
          {
            id: "l9-mc-4",
            question: "コンピューターがあえる事故は何ですか。",
            choices: [
              "故障とバグ",
              "ウィルス",
              "攻撃",
              "パスワード窃盗"
            ],
            answer: "故障とバグ",
            explanation: "Tai nạn/sự cố khách quan mà hệ thống máy tính tự thân gặp phải (không do tấn công bên ngoài) chính là hỏng hóc phần cứng (故障) và lỗi phần mềm (バグ)."
          },
          {
            id: "l9-mc-5",
            question: "最近のパスワード窃盗方法は何ですか。",
            choices: [
              "トロイの木馬",
              "スカベンジング",
              "データマイニング",
              "スパムメール"
            ],
            answer: "スカベンジング",
            explanation: "Phương pháp đánh cắp mật mã thời gian gần đây là Scavenging (Lục lọi thông tin thừa trong đĩa cứng hoặc bộ nhớ của hệ thống đã chia sẻ để khôi phục mật khẩu)."
          },
          {
            id: "l9-mc-6",
            question: "スカベンジングといって，残された個人情報を（　）する犯罪もあります。",
            choices: [
              "収集",
              "管理",
              "削除",
              "整理"
            ],
            answer: "収集",
            explanation: "Scavenging là hành vi tội phạm nhằm thu thập (収集) các thông tin cá nhân còn sót lại trong hệ thống máy tính."
          },
          {
            id: "l9-mc-7",
            question: "データーを守る方法について正しくないものを選びなさい。",
            choices: [
              "バックアップ",
              "ワクチン(ウィルス対策)ソフトを購入すること",
              "スパムメールを送ること",
              "予備のハードディスクなどを利用すること"
            ],
            answer: "スパムメールを送ること",
            explanation: "Phát biểu sai: Gửi thư rác (スパムメールを送ること) không phải là biện pháp bảo vệ dữ liệu mà là hành vi phát tán tin nhắn rác."
          },
          {
            id: "l9-mc-8",
            question: "スカベンジングで情報を窃盗する方法について正しいものを選びなさい。",
            choices: [
              "共用で使っているコンピュータで削除したファイルをディスクから復活する",
              "キーボードの入力履歴を管理する",
              "メモリ内に残った内容を管理する",
              "共用で使っているコンピュータで削除したファイルをディスクから管理する"
            ],
            answer: "共用で使っているコンピュータで削除したファイルをディスクから復活する",
            explanation: "Phương pháp đánh cắp thông tin bằng Scavenging là việc khôi phục (復活) các tệp tin đã bị xóa khỏi đĩa từ của các máy tính dùng chung."
          },
          {
            id: "l9-mc-9",
            question: "特に，exe，vbs，scr，pifなどの拡張子を持つ添付ファイルがある場合には即座に開いてください．",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai",
            explanation: "Phát biểu sai: Các tệp đính kèm có đuôi thực thi như .exe, .vbs, .scr, .pif có nguy cơ chứa virus/mã độc cực cao, tuyệt đối KHÔNG được mở ngay lập tức."
          },
          {
            id: "l9-mc-10",
            question: "銀行などの重要なサイトを装ってクレジットカード番号や暗証番号を盗み取るフィッシング(Phishing)という詐欺もあります．",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: Phishing là thủ đoạn giả mạo trang web của các ngân hàng hoặc tổ chức lớn để dụ người dùng nhập số thẻ tín dụng và mật khẩu rồi đánh cắp."
          },
          {
            id: "l9-mc-11",
            question: "会社などの組織で最も重要な情報を持っているサーバは攻撃対象となりやすいです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: Các máy chủ lưu trữ thông tin quan trọng nhất của doanh nghiệp luôn là mục tiêu hàng đầu của các cuộc tấn công mạng."
          },
          {
            id: "l9-mc-12",
            question: "プログラムミスはバグです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: Lỗi lập trình (Program miss) chính là lỗi chương trình, thường được gọi là Bug (バグ)."
          },
          {
            id: "l9-mc-13",
            question: "ロイの木馬は現代的なパスワード窃盗方法です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai",
            explanation: "Phát biểu sai: Trojan Horse (ロイの木馬 / トロイの木馬) là phương thức phát tán phần mềm độc hại (malware) chứ không phải là phương pháp đánh cắp mật khẩu trực tiếp."
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Bài 10 - Cấu trúc máy tính",
    hasTheory: true,
    sections: [
      {
        id: "lesson-10-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l10-v-1",
            term: "3 次元ゲーム",
            reading: "さんじげん game",
            answer: "game 3 chiều (3D)",
            meaning: "game 3 chiều (3D)"
          },
          {
            id: "l10-v-2",
            term: "(～に)直交する",
            reading: "(～に)ちょっこうする",
            answer: "vuông góc với ~",
            meaning: "vuông góc với ~"
          },
          {
            id: "l10-v-3",
            term: "DRAM",
            reading: "dynamic RAM",
            answer: "ram động",
            meaning: "ram động"
          },
          {
            id: "l10-v-4",
            term: "FLOPS",
            reading: "FLoating point number Operations Per Second",
            answer: "số lần tính số thực trong 1 giây",
            meaning: "số lần tính số thực trong 1 giây"
          },
          {
            id: "l10-v-5",
            term: "MIPS",
            reading: "Million Instructions Per Second",
            answer: "triệu lệnh trên giây",
            meaning: "triệu lệnh trên giây"
          },
          {
            id: "l10-v-6",
            term: "MPU",
            reading: "Micro Processing Unit",
            answer: "bộ vi xử lý",
            meaning: "bộ vi xử lý"
          },
          {
            id: "l10-v-7",
            term: "RAM",
            reading: "Random Access Memory",
            answer: "bộ nhớ truy xuất ngẫu nhiên",
            meaning: "bộ nhớ truy xuất ngẫu nhiên"
          },
          {
            id: "l10-v-8",
            term: "ROM",
            reading: "Read Only Memory",
            answer: "bộ nhớ chỉ đọc",
            meaning: "bộ nhớ chỉ đọc"
          },
          {
            id: "l10-v-9",
            term: "SRAM",
            reading: "Static RAM",
            answer: "ram tĩnh",
            meaning: "ram tĩnh"
          },
          {
            id: "l10-v-10",
            term: "USB",
            reading: "Universal System Bus",
            answer: "USB (Bus hệ thống vạn năng)",
            meaning: "USB (Bus hệ thống vạn năng)"
          },
          {
            id: "l10-v-11",
            term: "VRAM",
            reading: "Video RAM",
            answer: "Bộ nhớ của Card tăng tốc đồ họa hay Card màn hình máy tính",
            meaning: "Bộ nhớ của Card tăng tốc đồ họa hay Card màn hình máy tính"
          },
          {
            id: "l10-v-12",
            term: "アーム",
            reading: "arm",
            answer: "cần",
            meaning: "cần"
          },
          {
            id: "l10-v-13",
            term: "アドレスジャンプ",
            reading: "address jump",
            answer: "chuyển địa chỉ",
            meaning: "chuyển địa chỉ"
          },
          {
            id: "l10-v-14",
            term: "キャッシュ",
            reading: "cache",
            answer: "vùng nhớ đệm, cạc nhớ",
            meaning: "vùng nhớ đệm, cạc nhớ"
          },
          {
            id: "l10-v-15",
            term: "グラフィックプロセッサ",
            reading: "graphic processor",
            answer: "đơn vị xử lý đồ họa",
            meaning: "đơn vị xử lý đồ họa"
          },
          {
            id: "l10-v-16",
            term: "グラフィック描画",
            reading: "graphic びょうが",
            answer: "đồ họa",
            meaning: "đồ họa"
          },
          {
            id: "l10-v-17",
            term: "クロック",
            reading: "clock",
            answer: "xung nhịp",
            meaning: "xung nhịp"
          },
          {
            id: "l10-v-18",
            term: "セクタ",
            reading: "sector",
            answer: "cung từ",
            meaning: "cung từ"
          },
          {
            id: "l10-v-19",
            term: "チップセット",
            reading: "chip set",
            answer: "bộ chip",
            meaning: "bộ chip"
          },
          {
            id: "l10-v-20",
            term: "デフラグメンテーション",
            reading: "defragmentation",
            answer: "chống phân mảnh",
            meaning: "chống phân mảnh"
          },
          {
            id: "l10-v-21",
            term: "トラック",
            reading: "track",
            answer: "rãnh ghi",
            meaning: "rãnh ghi"
          },
          {
            id: "l10-v-22",
            term: "バーコードリーダー",
            reading: "barcode reader",
            answer: "đầu đọc mã vạch",
            meaning: "đầu đọc mã vạch"
          },
          {
            id: "l10-v-23",
            term: "バス",
            reading: "bus",
            answer: "kênh",
            meaning: "kênh"
          },
          {
            id: "l10-v-24",
            term: "プロジェクタ",
            reading: "projector",
            answer: "máy chiếu",
            meaning: "máy chiếu"
          },
          {
            id: "l10-v-25",
            term: "ヘッド",
            reading: "dead",
            answer: "đầu đọc",
            meaning: "đầu đọc"
          },
          {
            id: "l10-v-26",
            term: "ベンチマークテスト",
            reading: "benchmark test",
            answer: "kiểm chuẩn",
            meaning: "kiểm chuẩn"
          },
          {
            id: "l10-v-27",
            term: "マイクロプロセッサ",
            reading: "microprocessor",
            answer: "bộ vi xử lý",
            meaning: "bộ vi xử lý"
          },
          {
            id: "l10-v-28",
            term: "マザーボード",
            reading: "motherboard",
            answer: "bo mạch chủ",
            meaning: "bo mạch chủ"
          },
          {
            id: "l10-v-29",
            term: "メモリ空間",
            reading: "memory くうかん",
            answer: "không gian ghi nhớ",
            meaning: "không gian ghi nhớ"
          },
          {
            id: "l10-v-30",
            term: "中央演算処理装置",
            reading: "ちゅうおうえんざんしょりそうち",
            answer: "thiết bị xử lý tính toán trung tâm",
            meaning: "thiết bị xử lý tính toán trung tâm"
          },
          {
            id: "l10-v-31",
            term: "主記憶装置",
            reading: "しゅきおくそうち",
            answer: "thiết bị nhớ chính",
            meaning: "thiết bị nhớ chính"
          },
          {
            id: "l10-v-32",
            term: "先端",
            reading: "せんたん",
            answer: "đầu",
            meaning: "đầu"
          },
          {
            id: "l10-v-33",
            term: "入力装置",
            reading: "にゅうりょくそうち",
            answer: "thiết bị vào",
            meaning: "thiết bị vào"
          },
          {
            id: "l10-v-34",
            term: "内部バス",
            reading: "ないぶ bus",
            answer: "bus trong CPU",
            meaning: "bus trong CPU"
          },
          {
            id: "l10-v-35",
            term: "円板",
            reading: "えんばん",
            answer: "đĩa",
            meaning: "đĩa"
          },
          {
            id: "l10-v-36",
            term: "出力装置",
            reading: "しゅつりょくそうち",
            answer: "thiết bị ra",
            meaning: "thiết bị ra"
          },
          {
            id: "l10-v-37",
            term: "制御装置",
            reading: "せいぎょそうち",
            answer: "thiết bị điều khiển",
            meaning: "thiết bị điều khiển"
          },
          {
            id: "l10-v-38",
            term: "反比例",
            reading: "はんぴれい",
            answer: "tỷ lệ nghịch",
            meaning: "tỷ lệ nghịch"
          },
          {
            id: "l10-v-39",
            term: "命令セット",
            reading: "めいれい set",
            answer: "tập lệnh",
            meaning: "tập lệnh"
          },
          {
            id: "l10-v-40",
            term: "基板",
            reading: "きばん",
            answer: "bảng mạch",
            meaning: "bảng mạch"
          },
          {
            id: "l10-v-41",
            term: "外部インタフェース",
            reading: "がいぶ interface",
            answer: "Cổng giao tiếp bên ngoài",
            meaning: "Cổng giao tiếp bên ngoài"
          },
          {
            id: "l10-v-42",
            term: "実数",
            reading: "じっすう",
            answer: "Số thực",
            meaning: "Số thực"
          },
          {
            id: "l10-v-43",
            term: "密閉する",
            reading: "みっぺいする",
            answer: "Đóng kín",
            meaning: "Đóng kín"
          },
          {
            id: "l10-v-44",
            term: "寿命",
            reading: "じゅみょう",
            answer: "Tập lệnh",
            meaning: "Tập lệnh"
          },
          {
            id: "l10-v-45",
            term: "帯電",
            reading: "たいでん",
            answer: "Nhiễm điện",
            meaning: "Nhiễm điện"
          },
          {
            id: "l10-v-46",
            term: "感電",
            reading: "かでん",
            answer: "Số điện",
            meaning: "Số điện"
          },
          {
            id: "l10-v-47",
            term: "放熱板",
            reading: "ほうねつばん",
            answer: "Tấm tản nhiệt",
            meaning: "Tấm tản nhiệt"
          },
          {
            id: "l10-v-48",
            term: "整数",
            reading: "せいすう",
            answer: "Số nguyên",
            meaning: "Số nguyên"
          },
          {
            id: "l10-v-49",
            term: "書き換える",
            reading: "かきかえる",
            answer: "Ghi đè",
            meaning: "Ghi đè"
          },
          {
            id: "l10-v-50",
            term: "消去する",
            reading: "しょうきょする",
            answer: "Xóa bỏ",
            meaning: "Xóa bỏ"
          },
          {
            id: "l10-v-51",
            term: "演算装置",
            reading: "えんざんそうち",
            answer: "Thiết bị tính toán",
            meaning: "Thiết bị tính toán"
          },
          {
            id: "l10-v-52",
            term: "等分割",
            reading: "とうぶんかつ",
            answer: "Chia đều",
            meaning: "Chia đều"
          },
          {
            id: "l10-v-53",
            term: "色数",
            reading: "いろかず",
            answer: "Số màu",
            meaning: "Số màu"
          },
          {
            id: "l10-v-54",
            term: "蓋",
            reading: "ふた",
            answer: "Nắp",
            meaning: "Nắp"
          },
          {
            id: "l10-v-55",
            term: "補助記憶装置",
            reading: "ほじょきおくそうち",
            answer: "Thiết bị ghi nhớ bổ trợ",
            meaning: "Thiết bị ghi nhớ bổ trợ"
          },
          {
            id: "l10-v-56",
            term: "解像度",
            reading: "かいぞうど",
            answer: "Độ phân giải",
            meaning: "Độ phân giải"
          },
          {
            id: "l10-v-57",
            term: "記憶アドレス",
            reading: "きおく address",
            answer: "Địa chỉ bộ nhớ",
            meaning: "Địa chỉ bộ nhớ"
          },
          {
            id: "l10-v-58",
            term: "記憶容量",
            reading: "きおくようりょう",
            answer: "Dung lượng ghi",
            meaning: "Dung lượng ghi"
          },
          {
            id: "l10-v-59",
            term: "論理回路",
            reading: "ろんりかいろ",
            answer: "Mạch lô gic",
            meaning: "Mạch lô gic"
          },
          {
            id: "l10-v-60",
            term: "足し算",
            reading: "たしざん",
            answer: "Tính cộng",
            meaning: "Tính cộng"
          },
          {
            id: "l10-v-61",
            term: "軌跡",
            reading: "きせき",
            answer: "Quỹ tích",
            meaning: "Quỹ tích"
          }
        ]
      },
      {
        id: "lesson-10-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l10-mc-1",
            question: "コンピュータは，演算装置，（　），御装置, 入力装置，出力装置 of 5要素からなります。",
            choices: [
              "記憶装置制",
              "管理装置",
              "援助装置",
              "制限装置"
            ],
            answer: "記憶装置制",
            explanation: "Năm yếu tố cơ bản của máy tính gồm: Thiết bị điều khiển (制御装置 - trong câu hỏi ghi nhầm thành 御装置), Thiết bị tính toán (演算装置), Thiết bị bộ nhớ (記憶装置 - tùy chọn ghi là 記憶装置制), Thiết bị nhập (入力装置) và Thiết bị xuất (出力装置)."
          },
          {
            id: "l10-mc-2",
            question: "マザーボード上でのCPU，メモリ間などの電気の通り道のこと何と言いますか。",
            choices: [
              "チップセット",
              "バス",
              "CPU",
              "GPU"
            ],
            answer: "バス",
            explanation: "Đường truyền dữ liệu vật lý (đường dẫn tín hiệu điện) giữa CPU, bộ nhớ và các thiết bị khác trên bo mạch chủ được gọi là Bus (バス)."
          },
          {
            id: "l10-mc-3",
            question: "キャッシュについて正しくない内容を選びなさい。",
            choices: [
              "記憶装置である",
              "データのアクセス速度が最も高速である",
              "記憶容量が非常に大きい",
              "記憶容量がちいさい"
            ],
            answer: "記憶容量が非常に大きい",
            explanation: "Phát biểu sai: Bộ nhớ đệm (キャッシュメモリ - Cache Memory) có đặc điểm là tốc độ cực nhanh nhưng dung lượng lưu trữ rất nhỏ (chứ không phải cực kỳ lớn)."
          },
          {
            id: "l10-mc-4",
            question: "ハードディスクについて正しくない内容を選びなさい。",
            choices: [
              "記憶装置の一つである",
              "大容量の記憶が可能である",
              "記憶容量が非常に大きい",
              "記憶容量が小さい"
            ],
            answer: "記憶容量が小さい",
            explanation: "Phát biểu sai: Ổ đĩa cứng (HDD) là thiết bị lưu trữ thứ cấp có đặc điểm là dung lượng lớn (大容量) chứ không phải dung lượng nhỏ."
          },
          {
            id: "l10-mc-5",
            question: "CPUには何と呼ばれる単純な演算処理，制御処理が実行できますか。",
            choices: [
              "命令セット",
              "マイクロプロセッサ",
              "クロック周波数",
              "ベンチマークテスト"
            ],
            answer: "命令セット",
            explanation: "Tập hợp các chỉ thị lệnh cơ bản mà CPU có thể thực thi trực tiếp được gọi là Tập lệnh (命令セット - Instruction Set)."
          },
          {
            id: "l10-mc-6",
            question: "パソコン内で大きな面積を占めるメインとなる基板は何ですか。",
            choices: [
              "CPU",
              "マザーボード",
              "IC",
              "ハードディスク"
            ],
            answer: "マザーボード",
            explanation: "Bo mạch chính chiếm diện tích lớn nhất bên trong máy tính, là nơi kết nối tất cả linh kiện được gọi là Bo mạch chủ (マザーボード - Motherboard)."
          },
          {
            id: "l10-mc-7",
            question: "出力装置は何がありますか。",
            choices: [
              "キーボードやマウス",
              "CPU",
              "ディスプレイやプリンタ",
              "メモリやハードディスク"
            ],
            answer: "ディスプレイやプリンタ",
            explanation: "Thiết bị xuất (出力装置) gồm màn hình hiển thị (ディスプレイ) và máy in (プリンタ). Phím và chuột là thiết bị nhập. RAM/HDD là thiết bị bộ nhớ."
          },
          {
            id: "l10-mc-8",
            question: "RAMについて正しくないものをえらんでください。",
            choices: [
              "電源が切れるとデータも消えてしまう",
              "短期的な記憶に使う",
              "電源が切れるとデータが残る",
              "読み書き専用の半導体メモリ"
            ],
            answer: "電源が切れるとデータが残る",
            explanation: "Phát biểu sai: RAM là bộ nhớ bốc hơi (揮発性メモリ), khi mất điện thì dữ liệu sẽ bị xóa hoàn toàn (chứ không giữ lại)."
          },
          {
            id: "l10-mc-9",
            question: "最も高いデータのアクセス速度があるのは何でしょう。",
            choices: [
              "ハードディスク",
              "メモリ",
              "RAM",
              "キャッシュ"
            ],
            answer: "キャッシュ",
            explanation: "Trong số các thiết bị lưu trữ, bộ nhớ đệm (キャッシュ) nằm gần nhân CPU nhất nên có tốc độ truy xuất nhanh nhất."
          },
          {
            id: "l10-mc-10",
            question: "CPUについて正しいものを選びなさい。",
            choices: [
              "処理の中心となる部品である",
              "パソコン内で大きな面積を占めるメインとなる基板のこと",
              "CPUの中には演算装置機能だけが組み込まれている",
              "バスを流れるデータや外部機器とのデータを制御する"
            ],
            answer: "処理の中心となる部品である",
            explanation: "Phát biểu đúng: CPU (Central Processing Unit) là bộ vi xử lý trung tâm, đóng vai trò là não bộ và bộ phận điều hành trung tâm của toàn bộ máy tính."
          },
          {
            id: "l10-mc-11",
            question: "マザーボードとケーブルで接続された箱CPUです。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Sai",
            explanation: "Phát biểu sai: CPU là con chip xử lý được lắp trực tiếp lên socket trên bo mạch chủ (Motherboard) chứ không phải là cái thùng máy kết nối qua dây cáp."
          },
          {
            id: "l10-mc-12",
            question: "CPUは処理の中心となる部品です。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: CPU thực hiện chức năng giải mã và thi hành các lệnh chương trình, đóng vai trò là cơ quan đầu não xử lý của toàn bộ hệ thống máy tính."
          },
          {
            id: "l10-mc-13",
            question: "記憶装置はメモリやハードディスクが該当します。",
            choices: [
              "Đúng",
              "Sai"
            ],
            answer: "Đúng",
            explanation: "Phát biểu đúng: Thiết bị lưu trữ/bộ nhớ (記憶装置) của máy tính bao gồm cả bộ nhớ chính (RAM) và bộ nhớ phụ (HDD, SSD)."
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Bài 11 - Máy Turing, mạch logic, IC",
    hasTheory: true,
    sections: [
      {
        id: "lesson-11-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l11-v-1",
            term: "AND回路",
            reading: "ANDかいろ",
            answer: "mạch AND",
            meaning: "mạch AND",
            explanation: "Thực hiện phép toán nhân logic (論理積 - AND)."
          },
          {
            id: "l11-v-2",
            term: "NOT回路",
            reading: "NOTかいろ",
            answer: "mạch NOT",
            meaning: "mạch NOT",
            explanation: "Thực hiện phép toán phủ định logic (否定 - NOT)."
          },
          {
            id: "l11-v-3",
            term: "OR回路",
            reading: "ORかいろ",
            answer: "mạch OR",
            meaning: "mạch OR",
            explanation: "Thực hiện phép toán cộng logic (論理和 - OR)."
          },
          {
            id: "l11-v-4",
            term: "オートマトン",
            reading: "Automaton",
            answer: "máy tự động",
            meaning: "máy tự động (mô hình toán học đại diện cho hệ tính toán tự động)"
          },
          {
            id: "l11-v-5",
            term: "シリコン",
            reading: "Silicon",
            answer: "si li con",
            meaning: "si li con (chất bán dẫn phổ biến nhất dùng làm chip vi mạch)"
          },
          {
            id: "l11-v-6",
            term: "ダイオード",
            reading: "Diode",
            answer: "đi ốt",
            meaning: "đi ốt (linh kiện bán dẫn cho dòng điện đi qua một chiều)"
          },
          {
            id: "l11-v-7",
            term: "チューリングマシン",
            reading: "Turing machine",
            answer: "máy turing",
            meaning: "máy turing (mô hình tính toán lý thuyết nền tảng của tin học)"
          },
          {
            id: "l11-v-8",
            term: "トランジスタ",
            reading: "Transistor",
            answer: "bóng bán dẫn",
            meaning: "bóng bán dẫn (linh kiện bán dẫn thế hệ thứ 2 để khuếch đại/đóng ngắt dòng điện)"
          },
          {
            id: "l11-v-9",
            term: "ヒータ",
            reading: "Heater",
            answer: "sợi đốt",
            meaning: "sợi đốt (phát nhiệt trong bóng chân không)"
          },
          {
            id: "l11-v-10",
            term: "マス目",
            reading: "ますめ",
            answer: "nấc / ô vuông",
            meaning: "nấc, ô vuông (trên băng giấy của máy Turing)"
          },
          {
            id: "l11-v-11",
            term: "ミクロン",
            reading: "Micron",
            answer: "một phần triệu m (10⁻⁶ mét)",
            meaning: "một phần triệu m, 10⁻⁶ mét (đơn vị đo kích cỡ vi mạch)"
          },
          {
            id: "l11-v-12",
            term: "一方通行",
            reading: "いっぽうつうこう",
            answer: "lưu thông một chiều",
            meaning: "lưu thông một chiều (đặc tính dòng điện qua đi-ốt)"
          },
          {
            id: "l11-v-13",
            term: "挟み込む",
            reading: "はさみこむ",
            answer: "kẹp vào giữa",
            meaning: "kẹp vào giữa (thao tác ghép tấm bán dẫn)"
          },
          {
            id: "l11-v-14",
            term: "削る",
            reading: "けずる",
            answer: "khoét, đục",
            meaning: "khoét, đục, khắc (khắc axit trên tấm silicon)"
          },
          {
            id: "l11-v-15",
            term: "仕組み",
            reading: "しくみ",
            answer: "cơ cấu, cấu tạo",
            meaning: "cơ cấu, cấu tạo, cơ chế hoạt động"
          },
          {
            id: "l11-v-16",
            term: "四方",
            reading: "しほう",
            answer: "bốn cạnh, tứ giác",
            meaning: "bốn cạnh, bốn hướng, tứ giác"
          },
          {
            id: "l11-v-17",
            term: "集積回路 (IC)",
            reading: "しゅうせきかいろ / Integrated Circuit",
            answer: "mạch tích hợp",
            meaning: "mạch tích hợp (IC - Integrated Circuit)"
          },
          {
            id: "l11-v-18",
            term: "真空管",
            reading: "しんくうかん",
            answer: "ống chân không",
            meaning: "ống chân không (linh kiện điện tử thế hệ thứ nhất)"
          },
          {
            id: "l11-v-19",
            term: "世代",
            reading: "せだい",
            answer: "thế hệ",
            meaning: "thế hệ (các giai đoạn phát triển phần cứng máy tính)"
          },
          {
            id: "l11-v-20",
            term: "大規模集積回路 (LSI)",
            reading: "だいきぼしゅうせきかいろ / Large Scale Integration",
            answer: "mạch tích hợp cỡ lớn",
            meaning: "mạch tích hợp cỡ lớn (LSI - thế hệ thứ 4)"
          },
          {
            id: "l11-v-21",
            term: "単結晶",
            reading: "たんけっしょう",
            answer: "đơn kết tinh",
            meaning: "đơn kết tinh (mạng tinh thể silicon đồng nhất)"
          },
          {
            id: "l11-v-22",
            term: "単純な",
            reading: "たんじゅんな",
            answer: "đơn thuần, đơn giản",
            meaning: "đơn thuần, đơn giản"
          },
          {
            id: "l11-v-23",
            term: "断面",
            reading: "だんめん",
            answer: "mặt cắt",
            meaning: "mặt cắt, thiết diện"
          },
          {
            id: "l11-v-24",
            term: "電球",
            reading: "でんきゅう",
            answer: "bóng điện",
            meaning: "bóng điện tròn"
          },
          {
            id: "l11-v-25",
            term: "電極",
            reading: "でんきょく",
            answer: "điện cực",
            meaning: "điện cực (anốt & catốt)"
          },
          {
            id: "l11-v-26",
            term: "電源ランプ",
            reading: "でんげんランプ / Power indicator lamp",
            answer: "đèn nguồn điện",
            meaning: "đèn nguồn điện, đèn báo nguồn"
          },
          {
            id: "l11-v-27",
            term: "電流",
            reading: "でんりゅう",
            answer: "điện lưu (dòng điện)",
            meaning: "điện lưu, dòng điện"
          },
          {
            id: "l11-v-28",
            term: "動作原理",
            reading: "どうさげんり",
            answer: "nguyên lý hoạt động",
            meaning: "nguyên lý hoạt động"
          },
          {
            id: "l11-v-29",
            term: "熱する",
            reading: "ねっする",
            answer: "phát nhiệt",
            meaning: "phát nhiệt, làm nóng"
          },
          {
            id: "l11-v-30",
            term: "発光ダイオード (LED)",
            reading: "はっこうダイオード / Light Emitting Diode",
            answer: "đi ốt phát quang",
            meaning: "đi ốt phát quang (LED)"
          },
          {
            id: "l11-v-31",
            term: "半導体",
            reading: "はんどうたい",
            answer: "bán dẫn",
            meaning: "chất bán dẫn"
          },
          {
            id: "l11-v-32",
            term: "反対方向",
            reading: "はんたいほうこう",
            answer: "chiều ngược lại",
            meaning: "chiều ngược lại, hướng đối diện"
          },
          {
            id: "l11-v-33",
            term: "変遷",
            reading: "へんせん",
            answer: "sự thăng trầm, quá trình phát triển",
            meaning: "sự thăng trầm, chuyển biến, quá trình biến đổi lịch sử"
          },
          {
            id: "l11-v-34",
            term: "余る",
            reading: "あまる (amaru)",
            answer: "thừa",
            meaning: "thừa thãi, dư thừa"
          },
          {
            id: "l11-v-35",
            term: "論理積",
            reading: "ろんりせき (ronriseki)",
            answer: "lô gic tích (AND)",
            meaning: "phép nhân logic, lô gic tích (phép toán logic AND)"
          },
          {
            id: "l11-v-36",
            term: "論理素子",
            reading: "ろんりそし (ronrisoshi)",
            answer: "mạch lô gic / phần tử logic",
            meaning: "mạch lô gic, phần tử logic (linh kiện logic cơ bản chế tạo CPU)"
          },
          {
            id: "l11-v-37",
            term: "論理和",
            reading: "ろんりわ (ronriwa)",
            answer: "lô gic hợp (OR)",
            meaning: "phép cộng logic, lô gic hợp (phép toán logic OR)"
          }
        ]
      },
      {
        id: "lesson-11-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l11-mc-1",
            question: "チューリングマシンは何からなりますか。",
            choices: [
              "テープ、ヘッド、メモリ",
              "テープ、ヘッド",
              "テープ、ヘッド、メモリ、CPU",
              "テープ、ヘッド、マス目"
            ],
            answer: "テープ、ヘッド、メモリ"
          },
          {
            id: "l11-mc-2",
            question: "空気を抜いたガラス管の中にヒータと電極を閉じこめたものは何ですか。",
            choices: [
              "真空管",
              "ダイオード",
              "トランジスタ",
              "大規模集積回路"
            ],
            answer: "真空管"
          },
          {
            id: "l11-mc-3",
            question: "コンピューターの基本回路に何がありますか。",
            choices: [
              "OR回路、AND回路",
              "OR回路、AND回路、NOT回路",
              "OR回路、NOT回路",
              "OR回路、AND回路、NO回路"
            ],
            answer: "OR回路、AND回路、NOT回路"
          },
          {
            id: "l11-mc-4",
            question: "ICについて正しいものをえらんでください。",
            choices: [
              "大規模集積回路である",
              "第2世代の論理素子である",
              "ヒータで熱すると電極から電子が飛び出しやすい",
              "集積回路である"
            ],
            answer: "集積回路である"
          },
          {
            id: "l11-mc-5",
            question: "真空管の機能は何ですか。",
            choices: [
              "電流を二方通行にすること",
              "電流を一方通行にすること",
              "逆向きに電流を流すこと",
              "電極から電子を出すこと"
            ],
            answer: "電流を一方通行にすること"
          },
          {
            id: "l11-mc-6",
            question: "CPUの動作原理は何に基づいていますか。",
            choices: [
              "オートマトン",
              "ダイオード",
              "トランジスタ",
              "チューリングマシン"
            ],
            answer: "チューリングマシン"
          },
          {
            id: "l11-mc-7",
            question: "大規模集積回路は何世代の論理素子でしょう。",
            choices: [
              "第1世代",
              "第2世代",
              "第3世代",
              "第4世代"
            ],
            answer: "第4世代"
          },
          {
            id: "l11-mc-8",
            question: "OR回路とは，スイッチが（　　　）に並んだ回路としてモデル化されます。",
            choices: [
              "直列",
              "平行",
              "並列",
              "直接"
            ],
            answer: "並列"
          },
          {
            id: "l11-tf-1",
            question: "真空管は第２世代の論理素子である。",
            choices: ["Đúng", "Sai"],
            answer: "Sai",
            explanation: "真空管は第1世代の論理素子 (真空管 = Thế hệ 1, Transistor = Thế hệ 2, IC = Thế hệ 3, LSI = Thế hệ 4)."
          },
          {
            id: "l11-tf-2",
            question: "AND回路の演算のことを論理和と言います",
            choices: ["Đúng", "Sai"],
            answer: "Sai",
            explanation: "AND回路は論理積 (Conjunction) です. 論理和 (Disjunction) はOR回路です."
          },
          {
            id: "l11-tf-3",
            question: "OR回路の演算のことを論理和と言います",
            choices: ["Đúng", "Sai"],
            answer: "Đúng",
            explanation: "OR回路は論理和 (Disjunction) です."
          },
          {
            id: "l11-tf-4",
            question: "LSIは大規模集積回路です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng",
            explanation: "LSI viết tắt của Large Scale Integration, nghĩa là mạch tích hợp quy mô lớn (大規模集積回路)."
          },
          {
            id: "l11-tf-5",
            question: "チューリングマシンはヘッド、メモリから構造されますか。",
            choices: ["Đúng", "Sai"],
            answer: "Sai",
            explanation: "チューリングマシンはテープ (Tape), ヘッド (Head), メモリ (Memory - bảng trạng thái) từ 3 yếu tố này cấu tạo thành."
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Bài 12 - Xử lý tính toán",
    hasTheory: true,
    sections: [
      {
        id: "lesson-12-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l12-v-1",
            term: "10 進数",
            reading: "じっしんすう",
            answer: "hệ thập phân",
            meaning: "hệ thập phân"
          },
          {
            id: "l12-v-2",
            term: "16 進数",
            reading: "じゅうろくしんすう",
            answer: "hệ cơ số 16",
            meaning: "hệ cơ số 16"
          },
          {
            id: "l12-v-3",
            term: "8 進数",
            reading: "はっしんすう",
            answer: "hệ cơ số 8",
            meaning: "hệ cơ số 8"
          },
          {
            id: "l12-v-4",
            term: "べき乗",
            reading: "べきじょう",
            answer: "lũy thừa",
            meaning: "lũy thừa"
          },
          {
            id: "l12-v-5",
            term: "テイラー展開",
            reading: "Taylor てんかい",
            answer: "công thức Taylor",
            meaning: "công thức Taylor"
          },
          {
            id: "l12-v-6",
            term: "ビットシフト",
            reading: "bit shift",
            answer: "dịch chuyển bít",
            meaning: "dịch chuyển bít"
          },
          {
            id: "l12-v-7",
            term: "囲む",
            reading: "かこむ",
            answer: "bao quanh",
            meaning: "bao quanh"
          },
          {
            id: "l12-v-8",
            term: "右辺",
            reading: "うへん",
            answer: "vế phải",
            meaning: "vế phải"
          },
          {
            id: "l12-v-9",
            term: "演算処理",
            reading: "えんざんしょり",
            answer: "xử lý tính toán",
            meaning: "xử lý tính toán"
          },
          {
            id: "l12-v-10",
            term: "加減乗除",
            reading: "かげんじょうじょ",
            answer: "cộng trừ nhân chia",
            meaning: "cộng trừ nhân chia"
          },
          {
            id: "l12-v-11",
            term: "階乗",
            reading: "かいじょう",
            answer: "giai thừa",
            meaning: "giai thừa"
          },
          {
            id: "l12-v-12",
            term: "割り切れる",
            reading: "わりきれる",
            answer: "chia hết",
            meaning: "chia hết"
          },
          {
            id: "l12-v-13",
            term: "丸め誤差",
            reading: "まるめごさ",
            answer: "sai số do làm tròn",
            meaning: "sai số do làm tròn"
          },
          {
            id: "l12-v-14",
            term: "基数",
            reading: "きすう",
            answer: "cơ số",
            meaning: "cơ số"
          },
          {
            id: "l12-v-15",
            term: "記号",
            reading: "きごう",
            answer: "ký hiệu",
            meaning: "ký hiệu"
          },
          {
            id: "l12-v-16",
            term: "近似する",
            reading: "きんじする",
            answer: "xấp xỉ",
            meaning: "xấp xỉ"
          },
          {
            id: "l12-v-17",
            term: "誤差",
            reading: "ごさ",
            answer: "sai số",
            meaning: "sai số"
          },
          {
            id: "l12-v-18",
            term: "合計する",
            reading: "ごうけいする",
            answer: "tổng cộng",
            meaning: "tổng cộng"
          },
          {
            id: "l12-v-19",
            term: "左辺",
            reading: "さへん",
            answer: "vế trái",
            meaning: "vế trái"
          },
          {
            id: "l12-v-20",
            term: "三角関数",
            reading: "さんかくかんすう",
            answer: "hàm số lượng giác",
            meaning: "hàm số lượng giác"
          },
          {
            id: "l12-v-21",
            term: "指数関数",
            reading: "しすうかんすう",
            answer: "hàm số mũ",
            meaning: "hàm số mũ"
          },
          {
            id: "l12-v-22",
            term: "書き並べる",
            reading: "かきならべる",
            answer: "viết lần lượt",
            meaning: "viết lần lượt"
          },
          {
            id: "l12-v-23",
            term: "商",
            reading: "しょう",
            answer: "thương",
            meaning: "thương"
          },
          {
            id: "l12-v-24",
            term: "小数",
            reading: "しょうすう",
            answer: "phân số thập phân",
            meaning: "phân số thập phân"
          },
          {
            id: "l12-v-25",
            term: "数学関数",
            reading: "すうがくかんすう",
            answer: "hàm số toán học",
            meaning: "hàm số toán học"
          },
          {
            id: "l12-v-26",
            term: "精度",
            reading: "せいど",
            answer: "độ chính xác",
            meaning: "độ chính xác"
          },
          {
            id: "l12-v-27",
            term: "多項式",
            reading: "たこうしき",
            answer: "đa thức",
            meaning: "đa thức"
          },
          {
            id: "l12-v-28",
            term: "対応表",
            reading: "たいおうひょう",
            answer: "bảng đối ứng",
            meaning: "bảng đối ứng"
          },
          {
            id: "l12-v-29",
            term: "対数関数",
            reading: "たいすうかんすう",
            answer: "phương trình lôgarit",
            meaning: "phương trình lôgarit"
          },
          {
            id: "l12-v-30",
            term: "置き換える",
            reading: "おきかえる",
            answer: "thay thế",
            meaning: "thay thế"
          },
          {
            id: "l12-v-31",
            term: "電子",
            reading: "でんし",
            answer: "điện tử",
            meaning: "điện tử"
          },
          {
            id: "l12-v-32",
            term: "電卓",
            reading: "でんたく",
            answer: "máy tính",
            meaning: "máy tính"
          },
          {
            id: "l12-v-33",
            term: "途中",
            reading: "とちゅう",
            answer: "giữa chừng",
            meaning: "giữa chừng"
          },
          {
            id: "l12-v-34",
            term: "任意",
            reading: "にんい",
            answer: "tùy ý",
            meaning: "tùy ý"
          },
          {
            id: "l12-v-35",
            term: "筆算",
            reading: "ひっさん",
            answer: "tính toán bằng cách viết ra giấy",
            meaning: "tính toán bằng cách viết ra giấy"
          },
          {
            id: "l12-v-36",
            term: "符号ビット",
            reading: "ふごう bit",
            answer: "bít dấu",
            meaning: "bít dấu"
          },
          {
            id: "l12-v-37",
            term: "負",
            reading: "ふ",
            answer: "số âm",
            meaning: "số âm"
          },
          {
            id: "l12-v-38",
            term: "変換する",
            reading: "へんかんする",
            answer: "biến đổi",
            meaning: "biến đổi"
          },
          {
            id: "l12-v-39",
            term: "補数",
            reading: "ほすう",
            answer: "phần bù",
            meaning: "phần bù"
          },
          {
            id: "l12-v-40",
            term: "無限",
            reading: "むげん",
            answer: "vô hạn, vô tận",
            meaning: "vô hạn, vô tận"
          },
          {
            id: "l12-v-41",
            term: "余り",
            reading: "あまり",
            answer: "phần dư",
            meaning: "phần dư"
          },
          {
            id: "l12-v-42",
            term: "類推",
            reading: "るいすい",
            answer: "suy ra",
            meaning: "suy ra"
          },
          {
            id: "l12-v-43",
            term: "枠",
            reading: "わく",
            answer: "khung",
            meaning: "khung"
          }
        ]
      },
      {
        id: "lesson-12-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l12-mc-1",
            question: "10進数の12は，2進数，8進数，16進数で表現するとどうなりますか。",
            choices: [
              "2進数: 1100, 8進数: 14, 16進数: c",
              "2進数: 1010, 8進数: 12, 16進数: a",
              "2進数: 1111, 8進数: 16, 16進数: f",
              "2進数: 1100, 8進数: 15, 16進数: d"
            ],
            answer: "2進数: 1100, 8進数: 14, 16進数: c",
            explanation: "10 tiến trình số 12 chia cho cơ số: Hệ nhị phân là 1100, Hệ bát phân là 14, Hệ thập lục phân là c."
          },
          {
            id: "l12-mc-2",
            question: "2進数の11010001を10進数に変換するとどうなりますか。",
            choices: [
              "193",
              "209",
              "225",
              "241"
            ],
            answer: "209",
            explanation: "2^7 + 2^6 + 2^4 + 2^0 = 128 + 64 + 16 + 1 = 209."
          },
          {
            id: "l12-mc-3",
            question: "コンピュータで小数を扱う際に生じる、実際の数値とのわずかな差を何と呼びますか。",
            choices: [
              "丸め誤差",
              "桁落ち誤差",
              "情報落ち誤差",
              "オーバーフロー"
            ],
            answer: "丸め誤差",
            explanation: "Sai số do làm tròn (丸め誤差 - Roundoff error) là sự chênh lệch xuất hiện khi biểu diễn một số thực vô hạn dưới dạng số nhị phân có giới hạn số chữ số hiệu dụng."
          },
          {
            id: "l12-mc-4",
            question: "コンピュータで負の数を表現する際、一般的に用いられる表現法は何ですか。",
            choices: [
              "1の補数",
              "2の補数",
              "符号絶対値",
              "バイアス表現"
            ],
            answer: "2の補数",
            explanation: "Hệ thống máy tính hiện đại sử dụng mã bù 2 (2の補数 - Two's complement) để biểu diễn số âm, tránh việc tồn tại hai giá trị +0 và -0 như ở mã bù 1."
          },
          {
            id: "l12-mc-5",
            question: "データを左または右に dịch chuyển (dịch bit) tương ứng với phép nhân hoặc chia cho 2^n được gọi là gì?",
            choices: [
              "ビットシフト",
              "論理積",
              "丸め",
              "テイラー展開"
            ],
            answer: "ビットシフト",
            explanation: "Phép dịch chuyển bit (ビットシフト - Bit Shift) dịch các bit sang trái (nhân với 2^n) hoặc sang phải (chia cho 2^n) cực kỳ nhanh ở tầng CPU."
          },
          {
            id: "l12-mc-6",
            question: "2進数1.101を10進数で表現したものはどれか。",
            choices: [
              "(ア) 1.2",
              "(イ) 1.5",
              "(ウ) 1.505",
              "(エ) 1.625"
            ],
            answer: "(エ) 1.625",
            explanation: "1 + 1*2^-1 + 0*2^-2 + 1*2^-3 = 1 + 0.5 + 0 + 0.125 = 1.625."
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Bài 13 - Mã chữ, Hệ điều hành & Đơn vị đo",
    hasTheory: true,
    sections: [
      {
        id: "lesson-13-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l13-v-1",
            term: "ASCII コード",
            reading: "ASCII code",
            answer: "bảng mã ASCII",
            meaning: "bảng mã ASCII"
          },
          {
            id: "l13-v-2",
            term: "アスキー",
            reading: "ASCII",
            answer: "bảng mã ASCII (phiên âm tiếng Nhật)",
            meaning: "bảng mã ASCII"
          },
          {
            id: "l13-v-3",
            term: "EBCDIC コード",
            reading: "EBCDIC code",
            answer: "bảng mã EBCDIC",
            meaning: "bảng mã EBCDIC (dùng cho máy tính lớn IBM)"
          },
          {
            id: "l13-v-4",
            term: "EUCコード",
            reading: "EUC code",
            answer: "bảng mã EUC",
            meaning: "bảng mã EUC (mã chữ tiếng Nhật dùng nhiều trên UNIX)"
          },
          {
            id: "l13-v-5",
            term: "JIS コード",
            reading: "JIS code",
            answer: "bảng mã chuẩn công nghiệp Nhật Bản",
            meaning: "bảng mã chuẩn công nghiệp Nhật Bản (Japan Industrial Standards)"
          },
          {
            id: "l13-v-6",
            term: "感嘆符 (かんたんふ)",
            reading: "かんたんふ",
            answer: "dấu chấm than ！",
            meaning: "dấu chấm than ！"
          },
          {
            id: "l13-v-7",
            term: "エクスクラメーションマーク",
            reading: "Exclamation mark",
            answer: "dấu chấm than ！",
            meaning: "dấu chấm than ！"
          },
          {
            id: "l13-v-8",
            term: "ダラー",
            reading: "Dollar",
            answer: "ký hiệu đô la ＄",
            meaning: "ký hiệu đô la ＄"
          },
          {
            id: "l13-v-9",
            term: "ドル",
            reading: "Dollar",
            answer: "đô la / ký hiệu đô la ＄",
            meaning: "tiền đô la, ký hiệu đô la ＄"
          },
          {
            id: "l13-v-10",
            term: "ドルマーク",
            reading: "Dollar mark",
            answer: "ký hiệu đô la ＄",
            meaning: "ký hiệu đô la ＄"
          },
          {
            id: "l13-v-11",
            term: "シャープ",
            reading: "Sharp",
            answer: "Thăng ＃",
            meaning: "ký tự Thăng ＃"
          },
          {
            id: "l13-v-12",
            term: "井桁 (いげた)",
            reading: "いげた",
            answer: "Thăng ＃",
            meaning: "ký tự Thăng ＃ (hình cái giếng gỗ)"
          },
          {
            id: "l13-v-13",
            term: "オペレーティングシステム",
            reading: "Operating System",
            answer: "hệ điều hành",
            meaning: "hệ điều hành (OS)"
          },
          {
            id: "l13-v-14",
            term: "キロバイト",
            reading: "Kilobyte",
            answer: "kilobyte",
            meaning: "đơn vị đo bộ nhớ kilobyte (KB)"
          },
          {
            id: "l13-v-15",
            term: "コード体系",
            reading: "コードたいけい",
            answer: "hệ thống mã",
            meaning: "hệ thống mã hóa, cấu trúc mã chữ"
          },
          {
            id: "l13-v-16",
            term: "シフトJISコード",
            reading: "Shift-JIS code",
            answer: "mã Shift-JIS chuyển dịch",
            meaning: "mã Shift-JIS chuyển dịch (chuẩn mã hóa tiếng Nhật phổ biến)"
          },
          {
            id: "l13-v-17",
            term: "テラバイト",
            reading: "Terabyte",
            answer: "terabyte",
            meaning: "đơn vị đo bộ nhớ terabyte (TB)"
          },
          {
            id: "l13-v-18",
            term: "バイト",
            reading: "Byte",
            answer: "byte",
            meaning: "đơn vị đo bộ nhớ byte (B = 8 bits)"
          },
          {
            id: "l13-v-19",
            term: "ビット",
            reading: "Bit",
            answer: "bit",
            meaning: "đơn vị đo nhỏ nhất bit (0 hoặc 1)"
          },
          {
            id: "l13-v-20",
            term: "メガバイト",
            reading: "Megabyte",
            answer: "megabyte",
            meaning: "đơn vị đo bộ nhớ megabyte (MB)"
          },
          {
            id: "l13-v-21",
            term: "解釈する",
            reading: "かいしゃくする",
            answer: "lý giải, hiểu",
            meaning: "lý giải, giải nghĩa, thông dịch"
          },
          {
            id: "l13-v-22",
            term: "改行コード",
            reading: "かいぎょうコード",
            answer: "mã xuống dòng",
            meaning: "mã xuống dòng (ký tự CR, LF biểu thị xuống dòng)"
          },
          {
            id: "l13-v-23",
            term: "客観的",
            reading: "きゃっかんてき",
            answer: "mang tính khách quan",
            meaning: "mang tính khách quan"
          },
          {
            id: "l13-v-24",
            term: "区別する",
            reading: "くべつする",
            answer: "phân biệt",
            meaning: "phân biệt, phân chia"
          },
          {
            id: "l13-v-25",
            term: "行を変える",
            reading: "ぎょうをかえる",
            answer: "xuống dòng",
            meaning: "đổi dòng, xuống dòng mới"
          },
          {
            id: "l13-v-26",
            term: "最小単位",
            reading: "さいしょうたんい",
            answer: "đơn vị nhỏ nhất",
            meaning: "đơn vị cơ bản nhỏ nhất"
          },
          {
            id: "l13-v-27",
            term: "指摘する",
            reading: "してきする",
            answer: "chỉ ra, chỉ trích",
            meaning: "chỉ ra, xác định lỗi hoặc điểm trọng yếu"
          },
          {
            id: "l13-v-28",
            term: "主観的",
            reading: "しゅかんてき",
            answer: "mang tính chủ quan",
            meaning: "mang tính cá nhân, chủ quan"
          },
          {
            id: "l13-v-29",
            term: "性能",
            reading: "せいのう",
            answer: "tính năng / hiệu năng",
            meaning: "tính năng, hiệu năng hoạt động của thiết bị"
          },
          {
            id: "l13-v-30",
            term: "測る",
            reading: "はかる",
            answer: "đo",
            meaning: "đo đạc, cân đo đong đếm"
          },
          {
            id: "l13-v-31",
            term: "統一的",
            reading: "とういつてき",
            answer: "tính thống nhất",
            meaning: "mang tính thống nhất, đồng bộ"
          },
          {
            id: "l13-v-32",
            term: "避ける",
            reading: "さける",
            answer: "tránh",
            meaning: "tránh né, ngăn chặn"
          },
          {
            id: "l13-v-33",
            term: "文字化け",
            reading: "もじばけ",
            answer: "lỗi phông chữ",
            meaning: "lỗi hiển thị phông chữ, chữ bị biến dạng mã hóa"
          }
        ]
      },
      {
        id: "lesson-13-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l13-mc-1",
            question: "2.情報量の最小単位は何ですか。",
            choices: ["ビット", "バイト", "ギガバイト", "テラバイト"],
            answer: "ビット"
          },
          {
            id: "l13-mc-2",
            question: "1.日本語の場合には，英文字よりも情報量がどうなりますか。",
            choices: ["大幅に数が減る", "小幅に数が減る", "小幅に数が増える", "大幅に数が増える"],
            answer: "大幅に数が増える"
          },
          {
            id: "l13-mc-3",
            question: "4．アルファベット1文字の情報量はどうなりますか。",
            choices: ["8 bit = 1 byte", "16 bit = 2 byte", "8 bit = 2 byte", "16 bit = 1 byte"],
            answer: "8 bit = 1 byte"
          },
          {
            id: "l13-mc-4",
            question: "3.情報量の最大単位は何ですか。",
            choices: ["ビット", "バイト", "ギガバイト", "テラバイト"],
            answer: "テラバイト"
          },
          {
            id: "l13-mc-5",
            question: "6.コンピュータのデータは何の並びで表現された数字ですか。",
            choices: ["00と11", "01と10", "0と1", "0と10"],
            answer: "0と1"
          },
          {
            id: "l13-mc-6",
            question: "5.データの数字と文字の対応を決めているのは何ですか。",
            choices: ["文字コード", "数字コード", "漢字コード", "エンコード"],
            answer: "文字コード"
          },
          {
            id: "l13-mc-7",
            question: "8.日本語でのコードではないのは何ですか。",
            choices: ["JISコード", "ASCIIコード", "シフトJISコード", "EUCコード"],
            answer: "ASCIIコード"
          },
          {
            id: "l13-mc-8",
            question: "7.現在、日本語にはひらがな、カタカナ、漢字などを含めていくつの文字にコード番号が割り当てられていますか。",
            choices: ["63,536", "65,535", "63,535", "65,536"],
            answer: "65,536"
          },
          {
            id: "l13-mc-9",
            question: "データを解釈するときには，どの文字コードを使うべきなのかを知れば正しく表示できます。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l13-mc-10",
            question: "9.日本語1文字を表す情報量はどうなりますか。",
            choices: ["2バイト", "1バイト", "24ビット", "8ビット"],
            answer: "2バイト"
          },
          {
            id: "l13-mc-11",
            question: "片面1層記録のDVD-Rは約4.7Gバイトの記憶容量をもつ．1ページ当たり日本語700文字が印刷されている本の場合，約何万ページ分をこの DVD-R に保存できるか．ここで，日本語 1文字を表現するのに 2 バイトが必要であるとし，1Gバイトは10億バイトとする。",
            choices: [
              "(ア) 42",
              "(イ) 71",
              "(ウ) 336",
              "(エ) 671"
            ],
            answer: "(ウ) 336",
            explanation: "Một trang sách chứa 700 ký tự tiếng Nhật. Mỗi ký tự cần 2 byte, vậy 1 trang = 1400 byte. Dung lượng đĩa DVD-R = 4.7 GB = 4.7 tỷ byte. Số trang sách có thể lưu trữ được là: 4,700,000,000 / 1400 = 3,357,142 trang ≈ 336 vạn trang (336万ページ)."
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Bài 14 - Biểu diễn Âm thanh & Hình ảnh",
    hasTheory: true,
    sections: [
      {
        id: "lesson-14-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l14-v-1",
            term: "DPI (Dot Per Inch)",
            reading: "DPI",
            answer: "đơn vị chỉ số lượng điểm trên một inch",
            meaning: "đơn vị mật độ điểm ảnh chỉ số lượng điểm (dot) trên một inch"
          },
          {
            id: "l14-v-2",
            term: "MIDI (Musical Instrument Digital Interface)",
            reading: "MIDI",
            answer: "giao diện kỹ thuật số dành cho nhạc cụ",
            meaning: "giao diện kỹ thuật số dành cho nhạc cụ (chuẩn truyền tin nhạc cụ)"
          },
          {
            id: "l14-v-3",
            term: "VGA (Video Graphics Array)",
            reading: "VGA",
            answer: "chuẩn hiển thị đồ họa máy tính",
            meaning: "chuẩn hiển thị đồ họa máy tính đời cũ"
          },
          {
            id: "l14-v-4",
            term: "きめ細かい",
            reading: "きめこまかい",
            answer: "tỉ mỉ / mịn màng",
            meaning: "tỉ mỉ, mịn màng, chi tiết"
          },
          {
            id: "l14-v-5",
            term: "インクジェットプリンタ",
            reading: "Inkjet printer",
            answer: "máy in phun",
            meaning: "máy in phun mực"
          },
          {
            id: "l14-v-6",
            term: "カーキ色",
            reading: "カーキいろ",
            answer: "màu đất / màu kaki",
            meaning: "màu đất, màu kaki"
          },
          {
            id: "l14-v-7",
            term: "サンプリング周波数",
            reading: "サンプリングしゅうはすう",
            answer: "tần số lấy mẫu",
            meaning: "tần số lấy mẫu (tần số lượng tử hóa âm thanh)"
          },
          {
            id: "l14-v-8",
            term: "パラパラ漫画",
            reading: "パラパラまんが",
            answer: "truyện tranh động",
            meaning: "truyện tranh lật trang tạo chuyển động động"
          },
          {
            id: "l14-v-9",
            term: "ピクセル",
            reading: "Pixel",
            answer: "điểm ảnh",
            meaning: "điểm ảnh (pixel)"
          },
          {
            id: "l14-v-10",
            term: "ヘルツ",
            reading: "Hertz",
            answer: "héc (đơn vị đo tần số)",
            meaning: "héc (đơn vị tần số Hz)"
          },
          {
            id: "l14-v-11",
            term: "モジュレーション",
            reading: "Modulation",
            answer: "biến điệu, chuyển điệu",
            meaning: "biến điệu âm thanh, chuyển điệu nhạc"
          },
          {
            id: "l14-v-12",
            term: "音源",
            reading: "おんげん",
            answer: "nguồn âm thanh",
            meaning: "nguồn phát âm thanh, chip âm thanh"
          },
          {
            id: "l14-v-13",
            term: "音声",
            reading: "おんせい",
            answer: "âm thanh / giọng nói",
            meaning: "âm thanh, giọng nói phát ra"
          },
          {
            id: "l14-v-14",
            term: "音符",
            reading: "おんぷ",
            answer: "nốt nhạc",
            meaning: "nốt nhạc, ký hiệu âm nhạc"
          },
          {
            id: "l14-v-15",
            term: "強弱",
            reading: "きょうじゃく",
            answer: "mạnh yếu",
            meaning: "cường độ mạnh yếu"
          },
          {
            id: "l14-v-16",
            term: "原色",
            reading: "げんしょく",
            answer: "màu chính / màu gốc",
            meaning: "màu chính, màu nguyên bản (gốc)"
          },
          {
            id: "l14-v-17",
            term: "縦横",
            reading: "たてよこ",
            answer: "ngang dọc / dọc ngang",
            meaning: "chiều dọc và chiều ngang"
          },
          {
            id: "l14-v-18",
            term: "静止画像",
            reading: "せいしがぞう",
            answer: "hình ảnh tĩnh",
            meaning: "hình ảnh tĩnh (ảnh không chuyển động)"
          },
          {
            id: "l14-v-19",
            term: "接続端子",
            reading: "せつぞくたんし",
            answer: "đầu dây nối",
            meaning: "đầu kết nối, cổng cắm kết nối"
          },
          {
            id: "l14-v-20",
            term: "走査線",
            reading: "そうさせん",
            answer: "đường quét",
            meaning: "đường quét hình ảnh trên màn hình"
          },
          {
            id: "l14-v-21",
            term: "短冊",
            reading: "たんざく",
            answer: "mảnh giấy nhỏ, dài",
            meaning: "mảnh giấy nhỏ và dài"
          },
          {
            id: "l14-v-22",
            term: "着信メロディ",
            reading: "ちゃくしんメロディ",
            answer: "nhạc chuông",
            meaning: "nhạc chuông cuộc gọi đến"
          },
          {
            id: "l14-v-23",
            term: "動画像",
            reading: "どうがぞう",
            answer: "hình ảnh động",
            meaning: "hình ảnh chuyển động, video"
          },
          {
            id: "l14-v-24",
            term: "特殊なコード",
            reading: "とくしゅなコード",
            answer: "mã đặc trưng / mã đặc biệt",
            meaning: "mã hóa đặc trưng, mã đặc trưng"
          },
          {
            id: "l14-v-25",
            term: "量子化数",
            reading: "りょうしかすう",
            answer: "số lượng tử hóa",
            meaning: "số lượng tử hóa tín hiệu âm thanh"
          }
        ]
      },
      {
        id: "lesson-14-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l14-mc-1",
            question: "映画では1秒に何回の書き換えを行っていますか。",
            choices: ["12", "24", "48", "36"],
            answer: "24"
          },
          {
            id: "l14-mc-2",
            question: "デジタル画像は横に並んだ点の集まりとして表現されています。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l14-mc-3",
            question: "1画素の情報量は何ビットとなりますか。",
            choices: ["8", "16", "24", "48"],
            answer: "24"
          },
          {
            id: "l14-mc-4",
            question: "（　　　　　）を構成する点をピクセルと言います。",
            choices: ["音符", "音声", "画面", "画像"],
            answer: "画像"
          },
          {
            id: "l14-mc-5",
            question: "画素数が小さいほどきれいな画像が得られます。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l14-mc-6",
            question: "（　　　　　）のことをサンプリング周波数と言います。",
            choices: ["時間計算", "時間計画", "時間間隔", "時間割合"],
            answer: "時間間隔"
          },
          {
            id: "l14-mc-7",
            question: "パソコンや携帯電話の液晶画面では何色の小さな短冊が集まっていますか。",
            choices: ["3", "2", "5", "6"],
            answer: "3"
          },
          {
            id: "l14-mc-8",
            question: "着信メロディは高音質な楽曲再生が可能です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l14-mc-9",
            question: "アナログ量である波をデジタル化するために，一定の細かい時間間隔で何を測りますか。",
            choices: ["波の高さ", "波の長さ", "情報の高さ", "音の長さ"],
            answer: "波の高さ"
          },
          {
            id: "l14-mc-10",
            question: "画素数が多いほど、ぎざぎざが多い。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l14-mc-11",
            question: "量子化数が大きいと情報量がどうなりますか。",
            choices: ["少なくなります", "多くなります", "広くなります", "小さくなります"],
            answer: "多くなります"
          },
          {
            id: "l14-mc-12",
            question: "1 kHz=10,000Hz",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l14-mc-13",
            question: "ヘルツは1秒あたりの波（音）の高さの測定回数を表します。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l14-mc-14",
            question: "MIDIはどんなコードですか。",
            choices: [
              "画像のための特殊なコードです",
              "音楽のための簡単なコードです",
              "画像のための簡単なコードです",
              "音楽のための特殊なコードです"
            ],
            answer: "音楽のための特殊なコードです"
          },
          {
            id: "l14-mc-15",
            question: "画素は画像を構成する点です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l14-mc-16",
            question: "PCの画面表示の設定で，解像度を1,280×960ピクセルの全画面表示から1,024×768ピクセルの全画面表示に変更したとき，ディスプレイの表示状態はどのように変化するか。",
            choices: [
              "(ア) MPEG動画の再生速度が速くなる。",
              "(イ) 画面に表示される文字が大きくなる。",
              "(ウ) 縮小しないと表示できなかったJPEG画像が縮小なしで表示できるようになる。",
              "(エ) ディスプレイの表示色数が少なくなる。"
            ],
            answer: "(イ) 画面に表示される文字が大きくなる。",
            explanation: "Khi giảm độ phân giải màn hình từ cao (1,280×960) xuống thấp hơn (1,024×768) trên cùng một màn hình vật lý, số lượng pixel giảm đi khiến cho kích thước vật lý của mỗi pixel tăng lên. Do các ký tự văn bản chiếm một số lượng pixel cố định, chúng sẽ hiển thị với kích thước thực tế to hơn trên màn hình (Tương ứng đáp án **イ**)."
          }
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Bài 15 - Nén dữ liệu & Truyền dữ liệu",
    hasTheory: true,
    sections: [
      {
        id: "lesson-15-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l15-v-1",
            term: "BPS (Bit Per Second)",
            reading: "BPS",
            answer: "bit trên giây",
            meaning: "bit trên giây (đơn vị đo tốc độ truyền dữ liệu)"
          },
          {
            id: "l15-v-2",
            term: "CRC (Cyclic Redundancy Check)",
            reading: "CRC",
            answer: "kiểm tra độ dư vòng",
            meaning: "Cyclic Redundancy Check (thuật toán kiểm tra lỗi truyền tin)"
          },
          {
            id: "l15-v-3",
            term: "巡回冗長検査",
            reading: "じゅんかいじょうちょうけんさ",
            answer: "kiểm tra độ dư vòng (CRC)",
            meaning: "kiểm tra độ dư vòng (Cyclic Redundancy Check)"
          },
          {
            id: "l15-v-4",
            term: "GIF形式",
            reading: "GIFけいしき",
            answer: "định dạng GIF",
            meaning: "định dạng GIF (Graphics Interchange Format, hỗ trợ ảnh động nhẹ)"
          },
          {
            id: "l15-v-5",
            term: "JPEG形式",
            reading: "JPEGけいしき",
            answer: "định dạng JPEG",
            meaning: "định dạng JPEG (Joint Photographic Experts Group, nén ảnh tĩnh có hao hao)"
          },
          {
            id: "l15-v-6",
            term: "MPEG形式",
            reading: "MPEGけいしき",
            answer: "định dạng MPEG",
            meaning: "định dạng MPEG (Motion Picture Experts Group, chuẩn nén video)"
          },
          {
            id: "l15-v-7",
            term: "アスキー形式",
            reading: "アスキーけいしき",
            answer: "dạng văn bản ASCII",
            meaning: "chuẩn truyền/lưu dữ liệu văn bản ASCII"
          },
          {
            id: "l15-v-8",
            term: "コネクタ端子",
            reading: "コネクタたんし",
            answer: "đầu cắm kết nối",
            meaning: "đầu cắm kết nối, đầu dây nối"
          },
          {
            id: "l15-v-9",
            term: "スムーズ",
            reading: "Smooth",
            answer: "trôi chảy / mượt mà",
            meaning: "trôi chảy, mượt mà"
          },
          {
            id: "l15-v-10",
            term: "トレードオフ",
            reading: "Trade-off",
            answer: "sự cân bằng đánh đổi",
            meaning: "sự đánh đổi, cân bằng giữa lợi và hại"
          },
          {
            id: "l15-v-11",
            term: "バイナリ形式",
            reading: "バイナリけいしき",
            answer: "định dạng nhị phân",
            meaning: "định dạng nhị phân (binary, không thể đọc trực tiếp bằng text editor)"
          },
          {
            id: "l15-v-12",
            term: "パリティチェック",
            reading: "Parity check",
            answer: "kiểm tra chẵn lẻ",
            meaning: "phương pháp kiểm tra lỗi chẵn lẻ (Parity check)"
          },
          {
            id: "l15-v-13",
            term: "パリティビット",
            reading: "Parity bit",
            answer: "bit chẵn lẻ / bit bậc",
            meaning: "bit chẵn lẻ dùng để phát hiện lỗi"
          },
          {
            id: "l15-v-14",
            term: "フーリエ変換",
            reading: "フーリエへんかん",
            answer: "biến đổi Fourier",
            meaning: "biến đổi Fourier (chuyển đổi tín hiệu sang miền tần số)"
          },
          {
            id: "l15-v-15",
            term: "プロセッサー",
            reading: "Processor",
            answer: "bộ xử lý",
            meaning: "bộ xử lý trung tâm (CPU, vi xử lý)"
          },
          {
            id: "l15-v-16",
            term: "ランレングス圧縮",
            reading: "ランレングスあっしゅく",
            answer: "phương pháp mã hoá độ dài loạt (RLE)",
            meaning: "phương pháp nén mã hoá độ dài loạt (Run-Length Encoding)"
          },
          {
            id: "l15-v-17",
            term: "奇数パリティ",
            reading: "きすうパリティ",
            answer: "bậc kiểm tra lẻ /奇数 parity",
            meaning: "kiểm chẵn lẻ dạng lẻ (số lượng bit 1 là số lẻ)"
          },
          {
            id: "l15-v-18",
            term: "偽色",
            reading: "ぎしょく",
            answer: "màu sai / màu giả",
            meaning: "màu sai lệch, màu giả xuất hiện do nén ảnh"
          },
          {
            id: "l15-v-19",
            term: "狭帯域",
            reading: "きょうたいいき",
            answer: "dải tần hẹp",
            meaning: "băng thông hẹp, dải hẹp"
          },
          {
            id: "l15-v-20",
            term: "ナローバンド",
            reading: "Narrowband",
            answer: "dải hẹp / băng thông hẹp",
            meaning: "băng thông hẹp, dải hẹp (Narrowband)"
          },
          {
            id: "l15-v-21",
            term: "偶数パリティ",
            reading: "ぐうすうパリティ",
            answer: "bậc kiểm tra chẵn / 偶数 parity",
            meaning: "kiểm chẵn lẻ dạng chẵn (số lượng bit 1 là số chẵn)"
          },
          {
            id: "l15-v-22",
            term: "検出",
            reading: "けんしゅつ",
            answer: "tìm ra / phát hiện",
            meaning: "tìm ra, dò tìm, phát hiện ra lỗi"
          },
          {
            id: "l15-v-23",
            term: "広帯域",
            reading: "こうたいいき",
            answer: "băng thông rộng",
            meaning: "băng thông rộng, dải rộng"
          },
          {
            id: "l15-v-24",
            term: "ブロードバンド",
            reading: "Broadband",
            answer: "băng thông rộng / dải rộng",
            meaning: "mạng băng thông rộng (Broadband)"
          },
          {
            id: "l15-v-25",
            term: "差分",
            reading: "さぶん",
            answer: "phần khác nhau / độ chênh lệch",
            meaning: "phần khác biệt, độ chênh lệch dữ liệu giữa 2 phiên bản"
          },
          {
            id: "l15-v-26",
            term: "車線",
            reading: "しゃせん",
            answer: "làn xe / làn đường",
            meaning: "làn xe chạy trên đường"
          },
          {
            id: "l15-v-27",
            term: "瞬間",
            reading: "しゅんかん",
            answer: "khoảnh khắc / chốc lát",
            meaning: "khoảnh khắc, giây lát, tức thời"
          },
          {
            id: "l15-v-28",
            term: "正弦波",
            reading: "せいげんは",
            answer: "sóng hình sin",
            meaning: "sóng hình sin (sóng tuần hoàn cơ bản)"
          },
          {
            id: "l15-v-29",
            term: "損なう",
            reading: "そこなう",
            answer: "làm tổn hại / làm hỏng",
            meaning: "làm tổn hại, làm hư hỏng, đánh mất"
          },
          {
            id: "l15-v-30",
            term: "体感",
            reading: "たいかん",
            answer: "cảm nhận thực tế",
            meaning: "cảm nhận cơ thể, cảm giác thực tế của người dùng"
          },
          {
            id: "l15-v-31",
            term: "判定",
            reading: "はんてい",
            answer: "sự phán đoán / sự phân định",
            meaning: "sự phán đoán, phân định, đánh giá đúng sai"
          },
          {
            id: "l15-v-32",
            term: "汎用性",
            reading: "はんようせい",
            answer: "tính đa dụng / tính phổ quát",
            meaning: "tính vạn năng, tính đa dụng, dễ tương thích rộng rãi"
          },
          {
            id: "l15-v-33",
            term: "微細",
            reading: "びさい",
            answer: "rất nhỏ / vi mô",
            meaning: "vô cùng nhỏ, tinh vi, vi mô"
          },
          {
            id: "l15-v-34",
            term: "不可逆",
            reading: "ふかぎゃく",
            answer: "không thể đảo ngược",
            meaning: "không thể đảo ngược (phương pháp nén có hao tổn dữ liệu)"
          },
          {
            id: "l15-v-35",
            term: "付着",
            reading: "ふちゃく",
            answer: "kèm theo / bám dính",
            meaning: "bám dính, kèm theo"
          }
        ]
      },
      {
        id: "lesson-15-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l15-mc-1",
            question: "圧縮・解凍ソフトによってファイルを圧縮すると，圧縮方式に応じてファイル名の拡張子は何になりますか。",
            choices: ["RAR", "XLSX", "DOC", "PDF"],
            answer: "RAR"
          },
          {
            id: "l15-mc-2",
            question: "音声を圧縮するには，（　　　　）の波としての性質を使います。",
            choices: ["電気", "色", "音", "動画"],
            answer: "音"
          },
          {
            id: "l15-mc-3",
            question: "ランレングス圧縮は最も単純な画像圧縮方式の1つです。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l15-mc-4",
            question: "通信速度のような転送レートを測るときには、1秒あたりのbit数で数え、何を使いますか。",
            choices: ["Mbps", "Pbs", "Kbps", "Bps"],
            answer: "Bps"
          },
          {
            id: "l15-mc-5",
            question: "一般に100 Kbps～1 Mbps以上の通信速度をブロードバンドと言います。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l15-mc-6",
            question: "100メガの光ファイバなどと宣伝されているのは，正確には通信速度が最大100 Mbpsという意味です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l15-mc-7",
            question: "帯域が広いほどデータがどう流れますか。",
            choices: ["高速に流れます", "低速に流れます", "スムーズに流れます", "きれいに流れます"],
            answer: "高速に流れます"
          },
          {
            id: "l15-mc-8",
            question: "動画像情報圧縮では，何がよく用いられますか。",
            choices: ["GIF", "MPEG", "JPEG", "MP3"],
            answer: "MPEG"
          },
          {
            id: "l15-mc-9",
            question: "（　　　）を圧縮するには，音の波としての性質を使います。",
            choices: ["波長", "画像情報", "音声", "通信情報"],
            answer: "音声"
          },
          {
            id: "l15-mc-10",
            question: "誤り検出・訂正機構の中で，最も単純で基本的なのがパリティチェックによる誤り検出ですか。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l15-mc-11",
            question: "圧縮を伴う画像形式にはどのような形式がよく用いられますか。正しくないものを選びなさい。",
            choices: ["JPEG", "GIF", "PNG", "MPEG"],
            answer: "MPEG"
          },
          {
            id: "l15-mc-12",
            question: "低い周波数(波長が長い)の波は何を表しますか。",
            choices: ["元の波の小さな性質", "元の波の大きな性質", "元の波の詳細", "元の波の大まか"],
            answer: "元の波の大きな性質"
          },
          {
            id: "l15-mc-13",
            question: "ランレングス圧縮は色がいくつ並ぶかを記述する圧縮方式です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l15-mc-14",
            question: "5×5 画素の図が 'BBBBB BWWWW BBBBW BWWWW BWWWW' で表されるとき，同じ手法（ランレングス圧縮）で表現すると，圧縮率は何%か。",
            choices: [
              "(ア) 48.0",
              "(イ) 52.0",
              "(ウ) 76.0",
              "(エ) 88.0"
            ],
            answer: "(イ) 52.0",
            explanation: "Chuỗi ban đầu có độ dài 25 ký tự: 'BBBBBBWWWWBBBBWBWWWWWBWWWW'. Khi nén theo cơ chế Run-Length: 6B liên tiếp ➔ B6 (2 ký tự); 4W liên tiếp ➔ W4 (2 ký tự); 4B liên tiếp ➔ B4 (2 ký tự); 1W ➔ W (1 ký tự); 1B ➔ B (1 ký tự); 4W liên tiếp ➔ W4 (2 ký tự); 1B ➔ B (1 ký tự); 4W liên tiếp ➔ W4 (2 ký tự). Tổng độ dài chuỗi sau nén = 2+2+2+1+1+2+1+2 = 13 ký tự. Tỷ lệ nén = 13 / 25 = 52.0% (Tương ứng đáp án **イ**)."
          }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Bài 16 - Lịch sử Hệ điều hành & Phần mềm",
    hasTheory: true,
    sections: [
      {
        id: "lesson-16-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l16-v-1",
            term: "グラフィカル ユーザインタフェース",
            reading: "Graphical User Interface",
            answer: "giao diện đồ họa người sử dụng",
            meaning: "giao diện đồ họa người sử dụng (GUI)"
          },
          {
            id: "l16-v-2",
            term: "BIOS",
            reading: "BIOS",
            answer: "hệ thống nhập, xuất cơ bản",
            meaning: "hệ thống nhập xuất cơ bản (Basic Input/Output System)"
          },
          {
            id: "l16-v-3",
            term: "バイオス",
            reading: "BIOS",
            answer: "hệ thống nhập, xuất cơ bản (phiên âm)",
            meaning: "hệ thống nhập xuất cơ bản (BIOS)"
          },
          {
            id: "l16-v-4",
            term: "GUI (Graphical User Interface)",
            reading: "GUI",
            answer: "hệ giao tiếp đồ họa",
            meaning: "giao diện đồ họa người dùng (Graphical User Interface)"
          },
          {
            id: "l16-v-5",
            term: "UNIX",
            reading: "UNIX",
            answer: "hệ điều hành UNIX",
            meaning: "hệ điều hành đa nhiệm đa người dùng phát triển từ thập niên 1970"
          },
          {
            id: "l16-v-6",
            term: "ユニックス",
            reading: "UNIX",
            answer: "hệ điều hành UNIX (phiên âm)",
            meaning: "hệ điều hành UNIX"
          },
          {
            id: "l16-v-7",
            term: "つかさどる",
            reading: "つかさどる",
            answer: "đảm nhiệm / quản lý",
            meaning: "đảm nhiệm, quản lý, điều khiển"
          },
          {
            id: "l16-v-8",
            term: "アプリケーションソフトウェア",
            reading: "Application Software",
            answer: "phần mềm ứng dụng",
            meaning: "phần mềm ứng dụng (phần mềm phục vụ tác vụ cụ thể của người dùng)"
          },
          {
            id: "l16-v-9",
            term: "ガレージ",
            reading: "Garage",
            answer: "vùng chứa",
            meaning: "vùng chứa"
          },
          {
            id: "l16-v-10",
            term: "スケジューリング",
            reading: "Scheduling",
            answer: "lập lịch / lập chương trình",
            meaning: "lập lịch tiến trình của hệ điều hành (Scheduling)"
          },
          {
            id: "l16-v-11",
            term: "スティーブ・ウォズニアック",
            reading: "Steve Wozniak",
            answer: "Steven Gary Wozniak",
            meaning: "nhà đồng sáng lập Apple cùng Steve Jobs"
          },
          {
            id: "l16-v-12",
            term: "スティーブ・ジョブズ",
            reading: "Steve Jobs",
            answer: "Steven Jobs",
            meaning: "nhà đồng sáng lập kiêm cựu CEO huyền thoại của Apple"
          },
          {
            id: "l16-v-13",
            term: "スワッピング",
            reading: "Swapping",
            answer: "hoán đổi bộ nhớ",
            meaning: "kỹ thuật hoán đổi dữ liệu giữa RAM và bộ nhớ ảo trên đĩa cứng (Swapping)"
          },
          {
            id: "l16-v-14",
            term: "LINUX",
            reading: "Linux",
            answer: "hệ điều hành Linux",
            meaning: "hệ điều hành nguồn mở nhân Linux phát triển bởi Linus Torvalds"
          },
          {
            id: "l16-v-15",
            term: "リナックス",
            reading: "Linux",
            answer: "hệ điều hành Linux (phiên âm)",
            meaning: "hệ điều hành Linux"
          },
          {
            id: "l16-v-16",
            term: "フィンランド",
            reading: "Finland",
            answer: "Phần Lan",
            meaning: "nước Phần Lan (quê hương của Linus Torvalds)"
          },
          {
            id: "l16-v-17",
            term: "ブート",
            reading: "Boot",
            answer: "khởi động hệ thống",
            meaning: "khởi động hệ thống máy tính (Booting)"
          },
          {
            id: "l16-v-18",
            term: "プロセス",
            reading: "Process",
            answer: "tiến trình / quy trình",
            meaning: "tiến trình chương trình đang chạy trong bộ nhớ"
          },
          {
            id: "l16-v-19",
            term: "ベンチャー企業",
            reading: "ベンチャーきぎょう",
            answer: "doanh nghiệp tiên phong / khởi nghiệp",
            meaning: "doanh nghiệp khởi nghiệp, công nghiệp mạo hiểm"
          },
          {
            id: "l16-v-20",
            term: "マルチタスク",
            reading: "Multitask",
            answer: "đa nhiệm",
            meaning: "khả năng chạy nhiều tác vụ đồng thời của hệ điều hành"
          },
          {
            id: "l16-v-21",
            term: "マルチユーザ",
            reading: "Multi-user",
            answer: "đa người dùng",
            meaning: "hệ thống cho phép nhiều người sử dụng đồng thời"
          },
          {
            id: "l16-v-22",
            term: "ミドルウェア",
            reading: "Middleware",
            answer: "phần mềm trung gian",
            meaning: "phần mềm trung gian kết nối ứng dụng với hệ điều hành (Middleware)"
          },
          {
            id: "l16-v-23",
            term: "ミニコン",
            reading: "Minicomputer",
            answer: "máy tính mini",
            meaning: "máy tính cỡ trung (Minicomputer, phổ biến những năm 60-70)"
          },
          {
            id: "l16-v-24",
            term: "ユーザインターフェース",
            reading: "User Interface",
            answer: "giao diện người sử dụng",
            meaning: "giao diện người dùng (UI)"
          },
          {
            id: "l16-v-25",
            term: "リーナス・トーバルズ",
            reading: "Linus Torvalds",
            answer: "Linus Torvalds",
            meaning: "nhà khoa học máy tính người Phần Lan, cha đẻ của Linux"
          },
          {
            id: "l16-v-26",
            term: "一長一短",
            reading: "いっちょういったん",
            answer: "ưu điểm và nhược điểm",
            meaning: "có ưu điểm và nhược điểm song hành"
          },
          {
            id: "l16-v-27",
            term: "仮想記憶",
            reading: "かそうきおく",
            answer: "lưu trữ ảo / bộ nhớ ảo",
            meaning: "bộ nhớ ảo dùng đĩa cứng mở rộng cho RAM"
          },
          {
            id: "l16-v-28",
            term: "画期的",
            reading: "かっきてき",
            answer: "bước ngoặt / đột phá",
            meaning: "mang tính bước ngoặt, mở ra kỷ nguyên mới"
          },
          {
            id: "l16-v-29",
            term: "吸収する",
            reading: "きゅうしゅうする",
            answer: "hấp thu / tiếp thu",
            meaning: "hấp thu, tiếp nhận hoàn toàn"
          },
          {
            id: "l16-v-30",
            term: "巨大企業",
            reading: "きょだいきぎょう",
            answer: "doanh nghiệp lớn / tập đoàn khổng lồ",
            meaning: "tập đoàn khổng lồ, doanh nghiệp cực lớn"
          },
          {
            id: "l16-v-31",
            term: "競う",
            reading: "きそう",
            answer: "cạnh tranh / thi đua",
            meaning: "cạnh tranh, tranh đua lẫn nhau"
          },
          {
            id: "l16-v-32",
            term: "興す",
            reading: "おこす",
            answer: "phục hồi / chấn hưng",
            meaning: "phục hồi, chấn hưng, khởi nghiệp dựng cơ đồ"
          },
          {
            id: "l16-v-33",
            term: "参入する",
            reading: "さんにゅうする",
            answer: "gia nhập / hội nhập",
            meaning: "gia nhập thị trường, tham gia lĩnh vực mới"
          },
          {
            id: "l16-v-34",
            term: "実装",
            reading: "じっそう",
            answer: "lập trình / triển khai",
            meaning: "mã hóa, lập trình, triển khai thực tế trên phần cứng/phần mềm"
          },
          {
            id: "l16-v-35",
            term: "若干",
            reading: "じゃっかん",
            answer: "một chút / ít nhiều",
            meaning: "một vài, một ít, ít nhiều"
          },
          {
            id: "l16-v-36",
            term: "相違",
            reading: "そうい",
            answer: "sự khác nhau / độ chênh lệch",
            meaning: "sự khác biệt, sai khác lẫn nhau"
          },
          {
            id: "l16-v-37",
            term: "中身",
            reading: "なかみ",
            answer: "nội dung / thực chất",
            meaning: "nội dung bên trong, thực chất vấn đề"
          },
          {
            id: "l16-v-38",
            term: "仲介",
            reading: "ちゅうかい",
            answer: "trung gian / môi giới",
            meaning: "đóng vai trò trung gian, cầu nối"
          },
          {
            id: "l16-v-39",
            term: "搭載する",
            reading: "とうさいする",
            answer: "trang bị sẵn / lắp đặt kèm theo",
            meaning: "tích hợp sẵn, trang bị kèm theo thiết bị"
          },
          {
            id: "l16-v-40",
            term: "飛躍的に",
            reading: "ひやくてきに",
            answer: "tiến xa / nhảy vọt",
            meaning: "tiến bộ nhảy vọt, tiến xa một cách đột biến"
          },
          {
            id: "l16-v-41",
            term: "本質的な",
            reading: "ほんしつてきな",
            answer: "tính căn bản / bản chất",
            meaning: "thuộc về bản chất, mang tính nền tảng"
          },
          {
            id: "l16-v-42",
            term: "無償奉仕",
            reading: "むしょうほうし",
            answer: "cung cấp miễn phí / phục vụ phi lợi nhuận",
            meaning: "cống hiến miễn phí, làm việc tình nguyện"
          },
          {
            id: "l16-v-43",
            term: "迷う",
            reading: "まよう",
            answer: "băn khoăn / lạc đường",
            meaning: "băn khoăn không biết chọn gì, lạc lối"
          }
        ]
      },
      {
        id: "lesson-16-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l16-mc-1",
            question: "アプリケーションソフトとOSの中間的な位置付けとして、何と呼びますか。",
            choices: ["システムソフトウェア", "アプリケーションソフトウェア", "ミドルウェア", "ハードウェア"],
            answer: "ミドルウェア"
          },
          {
            id: "l16-mc-2",
            question: "OSの機能に属しないのは何ですか。",
            choices: ["ユーザインタフェース", "アプリケーション", "ソフトとハードの仲介", "記憶管理"],
            answer: "アプリケーション"
          },
          {
            id: "l16-mc-3",
            question: "マウスやキーボードの操作の仕方，ウィンドウの見え方，ファイルの扱い方などを決定するのは何ですか。",
            choices: ["ユーザインタフェース", "ソフトとハードの仲介", "アプリケーション", "記憶管理"],
            answer: "ユーザインタフェース"
          },
          {
            id: "l16-mc-4",
            question: "複数ユーザが利用するときには，ユーザ毎に利用環境を保存し，他人のファイルや情報へのアクセスを制限する（　　　　）機能が必要です。",
            choices: ["ユーザインタフェース", "ソフトとハードの仲介", "アプリケーション", "ユーザ管理"],
            answer: "ユーザ管理"
          },
          {
            id: "l16-mc-5",
            question: "OSの機能は何ですか。",
            choices: ["操作性を決めること", "記録の管理", "ハードウェアの相違を管理すること", "アプリケーシの管理"],
            answer: "操作性を決めること"
          },
          {
            id: "l16-mc-6",
            question: "OSの種類にビジネス用OSがあります。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l16-mc-7",
            question: "OSはパソコンだけでなく，ハードディスクレコーダ，カーナビ，ゲーム機などの（　　　）にも組み込まれています。",
            choices: ["家電製品", "企業の電気製品", "学校の電気製品", "家具製品"],
            answer: "家電製品"
          },
          {
            id: "l16-mc-8",
            question: "複数のプログラムが同時に動くように管理することをマルチユーザと呼んでいます。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l16-mc-9",
            question: "ソフトとハードの仲介という機能について正しいものをえらんでください。",
            choices: [
              "CPUの機能",
              "ハードウェアの相違を吸収します",
              "操作性を決めます",
              "マウスやキーボードの操作の仕方，ウィンドウの見え方，ファイルの扱い方などを決定します"
            ],
            answer: "ハードウェアの相違を吸収します"
          },
          {
            id: "l16-mc-10",
            question: "プロセス管理という機能について正しいものをえらんでください。",
            choices: ["CPUの機能", "ソフトウェアの作成を管理します", "操作性を決めます", "ソフトウェアの処理を管理します"],
            answer: "ソフトウェアの処理を管理します"
          },
          {
            id: "l16-mc-11",
            question: "Linuxについて正しくないものを選びなさい。",
            choices: ["OSの種類", "内部の情報が公開されない", "無償で使える", "企業のサーバ等に使われている"],
            answer: "内部の情報が公開されない"
          },
          {
            id: "l16-mc-12",
            question: "家電製品用のOSは販売台数が少ない。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l16-mc-13",
            question: "システムソフトウェアはアプリケーションソフト以外のソフトウェアのことです。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          }
        ]
      }
    ]
  },
  {
    id: 17,
    title: "Bài 17 - Lý thuyết cơ sở dữ liệu",
    hasTheory: true,
    sections: [
      {
        id: "lesson-17-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l17-v-1",
            term: "たどる",
            reading: "たどる",
            answer: "đến nơi",
            meaning: "đến nơi"
          },
          {
            id: "l17-v-2",
            term: "エドガー・フランク・コッド",
            reading: "Edgar Frank Codd",
            answer: "nhà khoa học máy tính người Anh, trong khi làm việc cho IBM, phát minh ra mô hình quản lý cơ sở dữ liệu quan hệ, cơ sở lý thuyết cho cơ sở dữ liệu quan hệ.",
            meaning: "nhà khoa học máy tính người Anh, trong khi làm việc cho IBM, phát minh ra mô hình quản lý cơ sở dữ liệu quan hệ, cơ sở lý thuyết cho cơ sở dữ liệu quan hệ."
          },
          {
            id: "l17-v-3",
            term: "ツリー構造",
            reading: "tree こうぞう",
            answer: "loại phân cấp",
            meaning: "loại phân cấp"
          },
          {
            id: "l17-v-4",
            term: "フィールド名",
            reading: "field めい",
            answer: "tên trường dữ liệu",
            meaning: "tên trường dữ liệu"
          },
          {
            id: "l17-v-5",
            term: "リレーショナル表現",
            reading: "relational ひょうげん",
            answer: "loại quan hệ",
            meaning: "loại quan hệ"
          },
          {
            id: "l17-v-6",
            term: "レコード",
            reading: "record",
            answer: "đĩa/ bản ghi",
            meaning: "đĩa/ bản ghi"
          },
          {
            id: "l17-v-7",
            term: "一貫性",
            reading: "いっかんせい",
            answer: "tính thống nhất",
            meaning: "tính thống nhất"
          },
          {
            id: "l17-v-8",
            term: "階層的表現",
            reading: "かいそうてきひょうげん",
            answer: "phân cấp dạng cây",
            meaning: "phân cấp dạng cây"
          },
          {
            id: "l17-v-9",
            term: "学籍簿",
            reading: "がくせきぼ",
            answer: "danh sách sinh viên",
            meaning: "danh sách sinh viên"
          },
          {
            id: "l17-v-10",
            term: "完備性",
            reading: "かんびせい",
            answer: "tính toàn vẹn",
            meaning: "tính toàn vẹn"
          },
          {
            id: "l17-v-11",
            term: "関係的表現",
            reading: "かんけいてきひょうげん",
            answer: "loại quan hệ",
            meaning: "loại quan hệ"
          },
          {
            id: "l17-v-12",
            term: "急激",
            reading: "きゅうげき",
            answer: "mạnh mẽ, gấp gáp",
            meaning: "mạnh mẽ, gấp gáp"
          },
          {
            id: "l17-v-13",
            term: "共通部分",
            reading: "きょうつうぶぶん",
            answer: "phép giao",
            meaning: "phép giao"
          },
          {
            id: "l17-v-14",
            term: "結合",
            reading: "けつごう",
            answer: "kết hợp",
            meaning: "kết hợp"
          },
          {
            id: "l17-v-15",
            term: "戸籍",
            reading: "こせき",
            answer: "sổ hộ khẩu",
            meaning: "sổ hộ khẩu"
          },
          {
            id: "l17-v-16",
            term: "合併",
            reading: "がっぺい",
            answer: "phép hợp",
            meaning: "phép hợp"
          },
          {
            id: "l17-v-17",
            term: "根/ルート",
            reading: "ね/root",
            answer: "rễ, gốc",
            meaning: "rễ, gốc"
          },
          {
            id: "l17-v-18",
            term: "差",
            reading: "さ",
            answer: "phép trừ",
            meaning: "phép trừ"
          },
          {
            id: "l17-v-19",
            term: "索引",
            reading: "さくいん",
            answer: "chỉ mục",
            meaning: "chỉ mục"
          },
          {
            id: "l17-v-20",
            term: "指定券",
            reading: "していけん",
            answer: "vé chỉ định",
            meaning: "vé chỉ định"
          },
          {
            id: "l17-v-21",
            term: "自然な結合",
            reading: "しぜんなけつごう",
            answer: "nối tự nhiên",
            meaning: "nối tự nhiên"
          },
          {
            id: "l17-v-22",
            term: "実用性",
            reading: "じつようせい",
            answer: "tính ứng dụng",
            meaning: "tính ứng dụng"
          },
          {
            id: "l17-v-23",
            term: "射影",
            reading: "しゃえい",
            answer: "phép chiếu",
            meaning: "phép chiếu"
          },
          {
            id: "l17-v-24",
            term: "集合演算",
            reading: "しゅうごうえんざん",
            answer: "phép tính tập hợp",
            meaning: "phép tính tập hợp"
          },
          {
            id: "l17-v-25",
            term: "住所録",
            reading: "じゅうしょろく",
            answer: "sổ địa chỉ, danh bạ",
            meaning: "sổ địa chỉ, danh bạ"
          },
          {
            id: "l17-v-26",
            term: "場当たり的",
            reading: "ばあたりてき",
            answer: "lung tung, không rõ rang",
            meaning: "lung tung, không rõ rang"
          },
          {
            id: "l17-v-27",
            term: "親子構造",
            reading: "おやここうぞう",
            answer: "cấu trúc mẹ con",
            meaning: "cấu trúc mẹ con"
          },
          {
            id: "l17-v-28",
            term: "節/ノード",
            reading: "せつ/node",
            answer: "nhánh",
            meaning: "nhánh"
          },
          {
            id: "l17-v-29",
            term: "直観的",
            reading: "ちょっかんてき",
            answer: "tính trực quan",
            meaning: "tính trực quan"
          },
          {
            id: "l17-v-30",
            term: "直積",
            reading: "ちょくせき",
            answer: "tích đề các",
            meaning: "tích đề các"
          },
          {
            id: "l17-v-31",
            term: "当てはまる",
            reading: "あてはまる",
            answer: "áp dụng vào",
            meaning: "áp dụng vào"
          },
          {
            id: "l17-v-32",
            term: "二重登録",
            reading: "にじゅうとうろく",
            answer: "đăng ký trùng",
            meaning: "đăng ký trùng"
          },
          {
            id: "l17-v-33",
            term: "保つ",
            reading: "たもつ",
            answer: "bảo đảm",
            meaning: "bảo đảm"
          },
          {
            id: "l17-v-34",
            term: "網的表現",
            reading: "あみてきひょうげん",
            answer: "loại dạng lưới",
            meaning: "loại dạng lưới"
          },
          {
            id: "l17-v-35",
            term: "木構造",
            reading: "きこうぞう",
            answer: "cấu trúc cây",
            meaning: "cấu trúc cây"
          },
          {
            id: "l17-v-36",
            term: "履修する",
            reading: "りしゅうする",
            answer: "đăng ký học",
            meaning: "đăng ký học"
          }
        ]
      },
      {
        id: "lesson-17-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l17-mc-1",
            question: "データベースとは大量のデータを（　）、管理でき、データの検索、書き換えが容易に行えるものです。",
            choices: ["保存", "報告", "整理", "保留"],
            answer: "保存"
          },
          {
            id: "l17-mc-2",
            question: "完備性とは，変更や削除などのデータ操作を行ってもデータの（　）が保たれることを意味します。",
            choices: ["整理性", "整合性", "正解性", "合理性"],
            answer: "整合性"
          },
          {
            id: "l17-mc-3",
            question: "大量のデータを扱うために，検索時の速度が重要です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l17-mc-4",
            question: "データベースのデータを表す単位は何ですか。",
            choices: ["ルート", "ノード", "レコード", "フィールド"],
            answer: "レコード"
          },
          {
            id: "l17-mc-5",
            question: "階層的表現とは，データを（　）のような階層構造に並べます。",
            choices: ["親，子", "子，孫", "親，孫", "親，子，孫"],
            answer: "親，子，孫"
          },
          {
            id: "l17-mc-6",
            question: "関係的表現について正しいものをえらんでください",
            choices: [
              "複数の関係を表す表を元にデータを記述します",
              "表をたどって必要な情報を処理します",
              "個別の関係を表す表を元にデータを記述します",
              "図をたどって必要な情報を集めます"
            ],
            answer: "個別の関係を表す表を元にデータを記述します"
          },
          {
            id: "l17-mc-7",
            question: "網的表現について正しいものを選びなさい。",
            choices: [
              "データを親，子，孫のような階層構造に並べ，最上位の親からたどることによって検索する表現法",
              "直観的に分かりやすい",
              "完備性に問題がある",
              "データを親子構造に並べ，この構造を順次たどることによって検索する表現法"
            ],
            answer: "データを親子構造に並べ，この構造を順次たどることによって検索する表現法"
          },
          {
            id: "l17-mc-8",
            question: "階層構造は直観的に分かりやすい",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l17-mc-9",
            question: "階層構造は直観的に分かりやすいのですが、検索時間がかかるという欠点があります。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l17-mc-10",
            question: "集合演算と呼ばれるデータ操作には３つの操作があります。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l17-mc-11",
            question: "「部署コード」「部署名」のフィールドを持つ'部署'表と，「都道府県コード」「都道府県名」のフィールドを持つ'都道府県'表，および'社員'表の 3 つの表を結合して，次のフィールドを持つ表を作成した：「社員番号」「社員名」「部署名」「都道府県名」「年齢」。結合した'社員'表はどれか。",
            choices: [
              "(ア) 「社員番号」「社員名」「年齢」",
              "(イ) 「社員番号」「社員名」「年齢」「都道府県コード」",
              "(ウ) 「社員番号」「社員名」「年齢」「部署コード」",
              "(エ) 「社員番号」「社員名」「年齢」「部署コード」「都道府県コード」"
            ],
            answer: "(エ) 「社員番号」「社員名」「年齢」「部署コード」「都道府県コード」",
            explanation: "Để có được '部署名' (Tên bộ phận) từ bảng '部署', bảng '社員' cần có khóa ngoại là '部署コード' (Mã bộ phận). Để có được '都道府県名' (Tên tỉnh thành) từ bảng '都道府県', bảng '社員' cần có khóa ngoại là '都道府県コード' (Mã tỉnh thành). Do đó, bảng '社員' ban đầu bắt buộc phải chứa cả hai cột khóa ngoại này để thực hiện liên kết (Tương ứng đáp án **エ**)."
          }
        ]
      }
    ]
  },
  {
    id: 18,
    title: "Bài 18 - Ngôn ngữ SQL",
    hasTheory: true,
    sections: [
      {
        id: "lesson-18-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l18-v-1",
            term: "SQL",
            reading: "Structured Query Language",
            answer: "ngôn ngữ SQL (ngôn ngữ hỏi đáp có cấu trúc/ ngôn ngữ truy vấn có cấu trúc)",
            meaning: "ngôn ngữ SQL (ngôn ngữ hỏi đáp có cấu trúc/ ngôn ngữ truy vấn có cấu trúc)"
          },
          {
            id: "l18-v-2",
            term: "データ制御",
            reading: "data せいぎょ",
            answer: "điều khiển dữ liệu",
            meaning: "điều khiển dữ liệu"
          },
          {
            id: "l18-v-3",
            term: "ワイルドカード",
            reading: "wildcard",
            answer: "ký tự đại diện",
            meaning: "ký tự đại diện"
          },
          {
            id: "l18-v-4",
            term: "更新",
            reading: "こうしん",
            answer: "cập nhật",
            meaning: "cập nhật"
          },
          {
            id: "l18-v-5",
            term: "構文",
            reading: "こうぶん",
            answer: "cú pháp",
            meaning: "cú pháp"
          },
          {
            id: "l18-v-6",
            term: "降順",
            reading: "こうじゅん",
            answer: "thứ tự giảm dần",
            meaning: "thứ tự giảm dần"
          },
          {
            id: "l18-v-7",
            term: "削除",
            reading: "さくじょ",
            answer: "xóa",
            meaning: "xóa"
          },
          {
            id: "l18-v-8",
            term: "昇順",
            reading: "しょうじゅん",
            answer: "thứ tự tăng dần",
            meaning: "thứ tự tăng dần"
          },
          {
            id: "l18-v-9",
            term: "照会",
            reading: "しょうかい",
            answer: "truy vấn",
            meaning: "truy vấn"
          },
          {
            id: "l18-v-10",
            term: "挿入",
            reading: "そうにゅう",
            answer: "chèn vào",
            meaning: "chèn vào"
          },
          {
            id: "l18-v-11",
            term: "直訳する",
            reading: "ちょくやくする",
            answer: "trực dịch",
            meaning: "trực dịch"
          },
          {
            id: "l18-v-12",
            term: "頭文字",
            reading: "かしらもじ",
            answer: "chữ cái đầu",
            meaning: "chữ cái đầu"
          },
          {
            id: "l18-v-13",
            term: "抜き出す",
            reading: "ぬきだす",
            answer: "truy xuất",
            meaning: "truy xuất"
          },
          {
            id: "l18-v-14",
            term: "文字列",
            reading: "もじれつ",
            answer: "chuỗi ký tự",
            meaning: "chuỗi ký tự"
          },
          {
            id: "l18-v-15",
            term: "並べ替える",
            reading: "ならべかえる",
            answer: "sắp xếp, phân loại",
            meaning: "sắp xếp, phân loại"
          },
          {
            id: "l18-v-16",
            term: "要素名",
            reading: "ようそめい",
            answer: "tên phần tử/ yếu tố",
            meaning: "tên phần tử/ yếu tố"
          }
        ]
      },
      {
        id: "lesson-18-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l18-mc-1",
            question: "SQLは人工的な言語であり、何が定義されますか。",
            choices: ["構文、単語など", "構成、単語など", "構文、単位など", "構成、単位など"],
            answer: "構文、単語など"
          },
          {
            id: "l18-mc-2",
            question: "SQLはデータベースを操作するための命令の集まりであり，（　）データベースを基本としています。",
            choices: ["完成", "合成", "関係", "整合"],
            answer: "関係"
          },
          {
            id: "l18-mc-3",
            question: "SQLについて正しくないものをえらんでください。",
            choices: ["人工的な言語", "データベースを操作するための命令の集まり", "構文や単語が定義されている", "機械的な言語"],
            answer: "機械的な言語"
          },
          {
            id: "l18-mc-4",
            question: "射影の結果を並べ替えるには何を使いますか。",
            choices: ["ORDER BYという単語", "SELECTという単語", "WHEREという単語", "FROMという単語"],
            answer: "ORDER BYという単語"
          },
          {
            id: "l18-mc-5",
            question: "SQLとは構造化された問い合わせ用の（　）ということになります。",
            choices: ["プログラム", "言語", "システム", "ソフト"],
            answer: "言語"
          },
          {
            id: "l18-mc-6",
            question: "結合の操作はいくつかの表を使いますか。",
            choices: ["1つ以上の表", "3つ以上の表", "2つ以上の表", "4つ以上の表"],
            answer: "2つ以上の表"
          },
          {
            id: "l18-mc-7",
            question: "表の削除はデータ定義という操作に属する。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l18-mc-8",
            question: "データ制御に照会、挿入、更新、消去が含まれる。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l18-mc-9",
            question: "条件の部分にはANDやORやBETWEEN ANDで簡単な条件を書くことができます",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l18-mc-10",
            question: "ASCは下るという意味です。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l18-mc-11",
            question: "「業者コード」「業者名」のフィールドを持つ'業者'表，「伝票番号」「枝番」「日付」「商品コード」「数量」のフィールドを持つ'仕入明細'表，「商品コード」「商品名」「業者コード」「単価」のフィールドを持つ'商品'表の 3 つの表が関係データベースで管理されている．新たな業者から新たな商品を仕入れた場合，表にデータを追加する順序のうち，適切なものはどれか。",
            choices: [
              "(ア) (1)'業者'表 (2)'仕入明細'表 (3)'商品'表",
              "(イ) (1)'業者'表 (2)'商品'表 (3)'仕入明細'表",
              "(ウ) (1)'仕入明細'表 (2)'商品'表 (3)'業者'表",
              "(エ) (1)'商品'表 (2)'業者'表 (3)'仕入明細'表"
            ],
            answer: "(イ) (1)'業者'表 (2)'商品'表 (3)'仕入明細'表",
            explanation: "Để thêm một hàng vào bảng '商品' (Sản phẩm), cột '業者コード' (Mã nhà cung cấp) phải tồn tại trong bảng '業者' (Nhà cung cấp) trước. Tương tự, để thêm một hàng vào bảng '仕入明細' (Chi tiết mua hàng), cột '商品コード' (Mã sản phẩm) phải tồn tại trong bảng '商品' trước. Vì vậy thứ tự thêm dữ liệu đúng phải là: (1) Bảng '業者' -> (2) Bảng '商品' -> (3) Bảng '仕入明細' (Đáp án **イ**)."
          }
        ]
      }
    ]
  },
  {
    id: 19,
    title: "Bài 19 - Cơ bản về lập trình",
    hasTheory: true,
    sections: [
      {
        id: "lesson-19-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l19-v-1",
            term: "C++言語",
            reading: "C++げんご",
            answer: "ngôn ngữ C++",
            meaning: "ngôn ngữ C++"
          },
          {
            id: "l19-v-2",
            term: "HTML 言語",
            reading: "HTML げんご",
            answer: "ngôn ngữ HTML",
            meaning: "ngôn ngữ HTML"
          },
          {
            id: "l19-v-3",
            term: "JavaScript 言語",
            reading: "JavaScript げんご",
            answer: "ngôn ngữ Javascript",
            meaning: "ngôn ngữ Javascript"
          },
          {
            id: "l19-v-4",
            term: "Java 言語",
            reading: "Java げんご",
            answer: "ngôn ngữ Java",
            meaning: "ngôn ngữ Java"
          },
          {
            id: "l19-v-5",
            term: "XML 言語",
            reading: "XML げんご",
            answer: "ngôn ngữ XML",
            meaning: "ngôn ngữ XML"
          },
          {
            id: "l19-v-6",
            term: "インスタンス",
            reading: "instance",
            answer: "đối tượng",
            meaning: "đối tượng"
          },
          {
            id: "l19-v-7",
            term: "オブジェクト指向",
            reading: "object しこう",
            answer: "hướng đối tượng",
            meaning: "hướng đối tượng"
          },
          {
            id: "l19-v-8",
            term: "カプセル化",
            reading: "capsule か",
            answer: "sự đóng gói",
            meaning: "sự đóng gói"
          },
          {
            id: "l19-v-9",
            term: "クラス",
            reading: "class",
            answer: "lớp",
            meaning: "lớp"
          },
          {
            id: "l19-v-10",
            term: "コンパイラ",
            reading: "compiler",
            answer: "trình biên dịch",
            meaning: "trình biên dịch"
          },
          {
            id: "l19-v-11",
            term: "プログラムの生成",
            reading: "ぷろぐらむのせいせい",
            answer: "tạo ra chương trình",
            meaning: "tạo ra chương trình"
          },
          {
            id: "l19-v-12",
            term: "メソッド",
            reading: "method",
            answer: "phương thức",
            meaning: "phương thức"
          },
          {
            id: "l19-v-13",
            term: "演算子",
            reading: "えんざんし",
            answer: "toán tử",
            meaning: "toán tử"
          },
          {
            id: "l19-v-14",
            term: "下位",
            reading: "かい",
            answer: "vị trí bên dưới",
            meaning: "vị trí bên dưới"
          },
          {
            id: "l19-v-15",
            term: "科学技術計算",
            reading: "かがくぎじゅつけいさん",
            answer: "tính toán khoa học kỹ thuật",
            meaning: "tính toán khoa học kỹ thuật"
          },
          {
            id: "l19-v-16",
            term: "基本処理",
            reading: "きほんしょり",
            answer: "xử lý cơ bản",
            meaning: "xử lý cơ bản"
          },
          {
            id: "l19-v-17",
            term: "機械語",
            reading: "きかいご",
            answer: "ngôn ngữ máy tính",
            meaning: "ngôn ngữ máy tính"
          },
          {
            id: "l19-v-18",
            term: "継承する",
            reading: "けいしょうする",
            answer: "kế thừa",
            meaning: "kế thừa"
          },
          {
            id: "l19-v-19",
            term: "固有",
            reading: "こゆう",
            answer: "vốn có, sẵn có",
            meaning: "vốn có, sẵn có"
          },
          {
            id: "l19-v-20",
            term: "考案する",
            reading: "こうあんする",
            answer: "đưa ra phương án",
            meaning: "đưa ra phương án"
          },
          {
            id: "l19-v-21",
            term: "高級言語",
            reading: "こうきゅうげんご",
            answer: "ngôn ngữ bậc cao",
            meaning: "ngôn ngữ bậc cao"
          },
          {
            id: "l19-v-22",
            term: "四則演算",
            reading: "しそくえんざん",
            answer: "bốn phép toán số học cơ bản (cộng, trừ, nhân, chia)",
            meaning: "bốn phép toán số học cơ bản (cộng, trừ, nhân, chia)"
          },
          {
            id: "l19-v-23",
            term: "事務処理",
            reading: "じむしょり",
            answer: "xử lý văn phòng",
            meaning: "xử lý văn phòng"
          },
          {
            id: "l19-v-24",
            term: "実体",
            reading: "じったい",
            answer: "phiên bản",
            meaning: "phiên bản"
          },
          {
            id: "l19-v-25",
            term: "手続型言語",
            reading: "てつづきがたげんご",
            answer: "ngôn ngữ thủ tục",
            meaning: "ngôn ngữ thủ tục"
          },
          {
            id: "l19-v-26",
            term: "人工知能",
            reading: "じんこうちのう",
            answer: "trí tuệ nhân tạo",
            meaning: "trí tuệ nhân tạo"
          },
          {
            id: "l19-v-27",
            term: "属する",
            reading: "ぞくする",
            answer: "thuộc vào loại, thuộc vào nhóm",
            meaning: "thuộc vào loại, thuộc vào nhóm"
          },
          {
            id: "l19-v-28",
            term: "代入",
            reading: "だいにゅう",
            answer: "gán",
            meaning: "gán"
          },
          {
            id: "l19-v-29",
            term: "蓄える",
            reading: "たくわえる",
            answer: "tích trữ",
            meaning: "tích trữ"
          },
          {
            id: "l19-v-30",
            term: "逐次的に",
            reading: "ちくじてきに",
            answer: "một cách tuần tự",
            meaning: "một cách tuần tự"
          },
          {
            id: "l19-v-31",
            term: "低級言語",
            reading: "ていきゅうげんご",
            answer: "ngôn ngữ bậc thấp",
            meaning: "ngôn ngữ bậc thấp"
          },
          {
            id: "l19-v-32",
            term: "定型的な",
            reading: "ていけいてき",
            answer: "dạng cố định",
            meaning: "dạng cố định"
          },
          {
            id: "l19-v-33",
            term: "添え字",
            reading: "そえじ",
            answer: "chỉ số dưới",
            meaning: "chỉ số dưới"
          },
          {
            id: "l19-v-34",
            term: "動作",
            reading: "どうさ",
            answer: "hoạt động, động tác",
            meaning: "hoạt động, động tác"
          },
          {
            id: "l19-v-35",
            term: "読み込む",
            reading: "よみこむ",
            answer: "đọc vào",
            meaning: "đọc vào"
          },
          {
            id: "l19-v-36",
            term: "内部動作",
            reading: "ないぶどうさ",
            answer: "hoạt động bên trong",
            meaning: "hoạt động bên trong"
          },
          {
            id: "l19-v-37",
            term: "配列",
            reading: "はいれつ",
            answer: "mảng (trong ngôn ngữ lập trình)",
            meaning: "mảng (trong ngôn ngữ lập trình)"
          },
          {
            id: "l19-v-38",
            term: "汎用性",
            reading: "はんようせい",
            answer: "đa dụng, đa năng",
            meaning: "đa dụng, đa năng"
          },
          {
            id: "l19-v-39",
            term: "非手続型言語",
            reading: "ひてつづきがたげんご",
            answer: "ngôn ngữ phi thủ tục",
            meaning: "ngôn ngữ phi thủ tục"
          },
          {
            id: "l19-v-40",
            term: "変数",
            reading: "へんすう",
            answer: "biến số",
            meaning: "biến số"
          },
          {
            id: "l19-v-41",
            term: "哺乳類",
            reading: "ほにゅうるい",
            answer: "động vật có vú",
            meaning: "động vật có vú"
          }
        ]
      },
      {
        id: "lesson-19-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l19-mc-1",
            question: "プログラミング言語はどのような規則を持ちますか。",
            choices: ["コンピューターの文法規則", "人工的な文法規則", "機械的な文法規則", "3つの選択肢全て"],
            answer: "人工的な文法規則"
          },
          {
            id: "l19-mc-2",
            question: "プログラミング言語とは何ですか。",
            choices: [
              "コンピュータに対する命令記述の集まりである",
              "ソフトに対する命令記述の集まりである",
              "ハードウェアに対する命令記述の集まりである",
              "コンピュータに対する内容記述の集まりである"
            ],
            answer: "コンピュータに対する命令記述の集まりである"
          },
          {
            id: "l19-mc-3",
            question: "オブジェクト指向について正しいものをえらんでください。",
            choices: ["「もの」を中心にする", "「こと」を中心にする", "一度作成したプログラムの再利用は難しい"],
            answer: "「もの」を中心にする"
          },
          {
            id: "l19-mc-4",
            question: "メモリに蓄えられているプログラムは，CPUの種類に依存した機械語と呼ばれる（　）です。",
            choices: ["高級言語", "コンパイラ言語", "低級言語", "プログラミング言語"],
            answer: "低級言語"
          },
          {
            id: "l19-mc-5",
            question: "プログラミング言語の文法の基礎は代入，・配列，四則演算，条件判断，繰り返しがあります。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l19-mc-6",
            question: "低級言語は，汎用性や読みやすさに問題がない。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l19-mc-7",
            question: "プログラムの作成には何が用いられますか。",
            choices: ["低級言語", "高級言語"],
            answer: "高級言語"
          },
          {
            id: "l19-mc-8",
            question: "JavaやC++は高級言語です。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l19-mc-9",
            question: "CPUは何をしますか。",
            choices: [
              "CPUはメモリ上のデータを読み込み，逐次的に処理を継続します",
              "CPUはメモリ上のデータをアドレスに従って1つずつ読み込みますが、逐次的に処理を継続しません。",
              "CPUはメモリ上のデータをアドレスに従って1つずつ読み込むだけです。",
              "CPUはメモリ上のデータの処理を継続するだけです。"
            ],
            answer: "CPUはメモリ上のデータを読み込み，逐次的に処理を継続します"
          },
          {
            id: "l19-mc-10",
            question: "非手続型言語は，（　）かを記述することで解を得る言語です。",
            choices: ["何をどうする", "何をしたい", "どうしてする", "何でする"],
            answer: "何をしたい"
          },
          {
            id: "l19-mc-11",
            question: "高級言語について正しいものをえらんでください",
            choices: [
              "メモリに蓄えられているプログラム",
              "JavaやC++",
              "CPUの種類に依存した機械語",
              "汎用性や読みやすさに問題があります"
            ],
            answer: "JavaやC++"
          },
          {
            id: "l19-mc-12",
            question: "手続型言語は，処理の手順を与えて，何をどうするか(How)を詳細に記述する言語である。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l19-mc-13",
            question: "Java言語はコンピュータの機種やOSに依存するソフトウェアが開発できる，オブジェクト指向型の言語である．",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          }
        ]
      }
    ]
  },
  {
    id: 20,
    title: "Bài 20 - Thuật toán",
    hasTheory: true,
    sections: [
      {
        id: "lesson-20-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          {
            id: "l20-v-1",
            term: "エラー対策",
            reading: "error たいさく",
            answer: "biện pháp xử lý lỗi",
            meaning: "biện pháp xử lý lỗi"
          },
          {
            id: "l20-v-2",
            term: "カスタマイズ",
            reading: "customize",
            answer: "tùy chỉnh",
            meaning: "tùy chỉnh"
          },
          {
            id: "l20-v-3",
            term: "クイックソート",
            reading: "quick sort",
            answer: "sắp xếp nhanh",
            meaning: "sắp xếp nhanh"
          },
          {
            id: "l20-v-4",
            term: "シェルソート",
            reading: "shell sort",
            answer: "sắp xếp chèn cải tiến",
            meaning: "sắp xếp chèn cải tiến"
          },
          {
            id: "l20-v-5",
            term: "ショートカット",
            reading: "shortcut",
            answer: "biểu tượng tắt",
            meaning: "biểu tượng tắt"
          },
          {
            id: "l20-v-6",
            term: "ソーティング",
            reading: "sorting",
            answer: "phân loại, sắp xếp",
            meaning: "phân loại, sắp xếp"
          },
          {
            id: "l20-v-7",
            term: "バブルソート",
            reading: "bubble sort",
            answer: "sắp xếp nổi bọt",
            meaning: "sắp xếp nổi bọt"
          },
          {
            id: "l20-v-8",
            term: "ヒューマン インタフェース",
            reading: "human interface",
            answer: "giao diện người máy",
            meaning: "giao diện người máy"
          },
          {
            id: "l20-v-9",
            term: "フローチャート",
            reading: "flowchart",
            answer: "lưu đồ, sơ đồ chu trình",
            meaning: "lưu đồ, sơ đồ chu trình"
          },
          {
            id: "l20-v-10",
            term: "プロトタイピング",
            reading: "prototyping",
            answer: "sự tạo nguyên mẫu",
            meaning: "sự tạo nguyên mẫu"
          },
          {
            id: "l20-v-11",
            term: "ベン・シュナイダーマン",
            reading: "Ben Shneiderman",
            answer: "Ben Shneiderman",
            meaning: "Ben Shneiderman"
          },
          {
            id: "l20-v-12",
            term: "マージソート",
            reading: "merge sort",
            answer: "sắp xếp trộn",
            meaning: "sắp xếp trộn"
          },
          {
            id: "l20-v-13",
            term: "マルチ画面",
            reading: "multi がめん",
            answer: "đa màn hình",
            meaning: "đa màn hình"
          },
          {
            id: "l20-v-14",
            term: "ループ",
            reading: "loop",
            answer: "vòng lặp",
            meaning: "vòng lặp"
          },
          {
            id: "l20-v-15",
            term: "金銭",
            reading: "きんせん",
            answer: "tiền bạc",
            meaning: "tiền bạc"
          },
          {
            id: "l20-v-16",
            term: "試行錯誤",
            reading: "しこうさくご",
            answer: "lỗi phát hiện khi thử",
            meaning: "lỗi phát hiện khi thử"
          },
          {
            id: "l20-v-17",
            term: "書き下す",
            reading: "かきくだす",
            answer: "viết từ trên xuống",
            meaning: "viết từ trên xuống"
          },
          {
            id: "l20-v-18",
            term: "触覚装置",
            reading: "しょっかくそうち",
            answer: "thiết bị cảm ứng xúc giác",
            meaning: "thiết bị cảm ứng xúc giác"
          },
          {
            id: "l20-v-19",
            term: "身振り",
            reading: "みぶり",
            answer: "điệu bộ, cử chỉ",
            meaning: "điệu bộ, cử chỉ"
          },
          {
            id: "l20-v-20",
            term: "挿入ソート",
            reading: "そうにゅう sort",
            answer: "sắp xếp kiểu chèn",
            meaning: "sắp xếp kiểu chèn"
          },
          {
            id: "l20-v-21",
            term: "逐一",
            reading: "ちくいち",
            answer: "cụ thể/chi tiết",
            meaning: "cụ thể/chi tiết"
          },
          {
            id: "l20-v-22",
            term: "投入",
            reading: "とうにゅう",
            answer: "đầu tư",
            meaning: "đầu tư"
          },
          {
            id: "l20-v-23",
            term: "頻繁",
            reading: "ひんぱん",
            answer: "thường xuyên, tấp nập",
            meaning: "thường xuyên, tấp nập"
          },
          {
            id: "l20-v-24",
            term: "没入型表示装置",
            reading: "ぼつにゅうがた ひょうじそうち",
            answer: "màn hình sử dụng trong không gian ảo",
            meaning: "màn hình sử dụng trong không gian ảo"
          },
          {
            id: "l20-v-25",
            term: "嗅覚装置",
            reading: "きゅうかくそうち",
            answer: "thiết bị cảm ứng khứu giác",
            meaning: "thiết bị cảm ứng khứu giác"
          }
        ]
      },
      {
        id: "lesson-20-multiple-choice",
        title: "Trắc nghiệm",
        type: "multiple_choice",
        items: [
          {
            id: "l20-mc-1",
            question: "プログラムの基本的な処理の（　）をアルゴリズムと言います",
            choices: ["方法", "手順", "プロセス", "管理法"],
            answer: "手順"
          },
          {
            id: "l20-mc-2",
            question: "アルゴリズムを図形と矢印で表現したものを何と言いますか。",
            choices: ["フローチャート", "ソーティング", "マルチモーダル", "プロトタイピング"],
            answer: "フローチャート"
          },
          {
            id: "l20-mc-3",
            question: "アルゴリズムの目的は何を明確にすることですか。",
            choices: ["出力、処理手順", "入力、処理手順", "入力、出力、処理手順", "入力、出力、管理手順"],
            answer: "入力、出力、処理手順"
          },
          {
            id: "l20-mc-4",
            question: "小さいものから順に，または逆に大きいものから順にデータを並べ替えることは何ですか。",
            choices: ["アルゴリズム", "マルチモーダル", "プロトタイピング", "ソーティング"],
            answer: "ソーティング"
          },
          {
            id: "l20-mc-5",
            question: "新たなプログラムを作成するときに，効率的な内部処理とともに考慮しなければならない重要な要素は何ですか。",
            choices: ["ボディーインタフェース", "インタフェース", "ヒューマンインタフェース", "ヒューマンリソース"],
            answer: "ヒューマンインタフェース"
          },
          {
            id: "l20-mc-6",
            question: "ユーザからの入力は何から行えますか。正しいものをえらんでください。",
            choices: ["キーボードやマウス", "プリンター", "ディスプレイ", "画面"],
            answer: "キーボードやマウス"
          },
          {
            id: "l20-mc-7",
            question: "選択法はソーティングアルゴリズムに属する。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l20-mc-8",
            question: "フローチャートは直観的な理解のために使われます。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l20-mc-9",
            question: "アルゴリズムに基づき，代入，条件判断，繰り返しなどの基本的な（　）を組み合わせて実際のプログラムを実現します．",
            choices: ["性質", "要素", "機能", "特徴"],
            answer: "要素"
          },
          {
            id: "l20-mc-10",
            question: "フローチャートはプログラムよりも詳細な流れを把握するのに使われます。",
            choices: ["Đúng", "Sai"],
            answer: "Sai"
          },
          {
            id: "l20-mc-11",
            question: "ユーザインタフェースとは，ユーザに対するコンピュータなどの機械の使い勝手のことを言います。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l20-mc-12",
            question: "カメラによってユーザの身振りや表情を入力できるようになった。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          },
          {
            id: "l20-mc-13",
            question: "出力は音声，触覚装置という方法が提案されます。",
            choices: ["Đúng", "Sai"],
            answer: "Đúng"
          }
        ]
      }
    ]
  }
];
