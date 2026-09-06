import type { Lesson, StudyItem } from './lessons';

export interface GrammarPoint {
  id: string;
  chapter: number;
  number: number;
  pattern: string;
  title: string;
  stars: number;
  formation: string;
  meaningJa: string;
  meaningVi: string;
  usageNote?: string;
  examples: Array<{
    ja: string;
    vi: string;
  }>;
  plusNote?: {
    title: string;
    formation?: string;
    meaningVi: string;
    examples: Array<{ ja: string; vi: string }>;
  };
}

export interface ChapterStory {
  chapter: number;
  titleJa: string;
  titleVi: string;
  canDoJa: string;
  canDoVi: string;
  textJa: string;
  textVi: string;
  grammarHighlights: Array<{
    text: string;
    grammarName: string;
    explanation: string;
  }>;
}

export const tryN3Chapter1Story: ChapterStory = {
  chapter: 1,
  titleJa: '1 初めての富士登山 (1)',
  titleVi: '1. Lần đầu leo núi Phú Sĩ (Phần 1)',
  canDoJa: '旅行などの初めての経験について、体験したことや考えたこと、感じたことが表現できる。',
  canDoVi: 'Bạn có thể nói lên những điều bạn đã trải nghiệm, suy nghĩ hay cảm nhận về kinh nghiệm lần đầu của mình, chẳng hạn như về chuyến đi du lịch của bạn.',
  textJa: `先週の日曜日、リンさんと富士山に登った。途中までバスで行って、そこから登り始めた。登る前に水を買った店で、酸素缶も持っていくように言われた。山の上は空気が少ないから、必要になるかもしれないそうだ。空気が薄いと病気になる人もいるということを思い出したが見富士山は小学生でも登れると聞いたので、大丈夫だろうと思った。だから買わなかった。
私は登山をしたことはないが、富士山はけわしい山じゃないし、それほど大変じゃなさそうだった。`,
  textVi: `Chủ nhật tuần trước, tôi và Lin đã đi leo núi Phú Sĩ. Chúng tôi đi xe buýt đến lưng chừng núi, và bắt đầu leo từ đó. Tại cửa hàng nơi chúng tôi mua nước trước khi leo, người ta dặn chúng tôi nên mang theo cả bình oxy. Nghe nói vì trên đỉnh núi không khí loãng nên có thể sẽ cần đến. Tôi nhớ ra việc có người bị ốm vì không khí loãng, nhưng nghe nói núi Phú Sĩ học sinh tiểu học cũng leo được nên tôi nghĩ chắc sẽ ổn thôi. Vì vậy tôi đã không mua.
Tôi chưa từng leo núi bao giờ, nhưng núi Phú Sĩ không phải là ngọn núi hiểm trở và trông có vẻ không đến mức quá vất vả.`,
  grammarHighlights: [
    {
      text: '登り始めた',
      grammarName: '〜始める',
      explanation: 'V-~~ます~~ ＋ 始める: Bắt đầu một hành động cần thời gian (Động từ chia thể ます, gạch bỏ ます: 登り~~ます~~ ➔ 登り始めた).'
    },
    {
      text: '持っていくように言われた',
      grammarName: '〜ように言う',
      explanation: 'V-る / V-ない ＋ ように言う: Truyền đạt lại lời dặn dò, chỉ thị (được dặn là hãy mang theo bình oxy).'
    },
    {
      text: '病気になる人もいるということ',
      grammarName: '〜ということ',
      explanation: 'Thể thông thường ＋ という ＋ Danh từ: Mô tả nội dung của một sự việc (nhớ ra sự việc rằng có người bị ốm).'
    },
    {
      text: '大丈夫だろうと思った',
      grammarName: '〜だろうと思う',
      explanation: 'Thể thông thường [N~~だ~~, なA~~だ~~ bỏ だ] ＋ だろうと思う: Bày tỏ suy nghĩ phán đoán không chắc chắn (nghĩ rằng có lẽ sẽ ổn thôi).'
    },
    {
      text: '大変じゃなさそうだった',
      grammarName: '〜なさそうだ',
      explanation: 'Tính từ な ＋ じゃなさそうだ: Nhìn cảm nhận rồi dự đoán rằng không vất vả đến thế.'
    }
  ]
};

export const tryN3GrammarPoints: GrammarPoint[] = [
  {
    id: 'try-n3-c1-g1',
    chapter: 1,
    number: 1,
    pattern: '〜始める',
    title: '登り始めた',
    stars: 3,
    formation: 'V-~~ます~~ ＋ 始める (Động từ thể ます gạch bỏ ます ＋ 始める)',
    meaningJa: '「〜始める」は、時間がかかることが始まるということをはっきり言うときに使う。',
    meaningVi: 'Sử dụng khi bạn nói rõ về sự bắt đầu của một việc làm gì đó mà cần có thời gian.',
    usageNote: 'Đi kèm với các động từ chỉ hành động diễn ra trong một khoảng thời gian nhất định (như học, nở, rơi mưa, viết,...).',
    examples: [
      {
        ja: '日本語を習い始めたのは半年前です。',
        vi: 'Tôi bắt đầu học tiếng Nhật là từ nửa năm trước (習い~~ます~~ ➔ 習い始める).'
      },
      {
        ja: '桜の花が咲き始めましたね。',
        vi: 'Hoa anh đào đã bắt đầu nở rồi nhỉ (咲き~~ます~~ ➔ 咲き始める).'
      },
      {
        ja: 'そこから登り始めた。',
        vi: 'Chúng tôi bắt đầu leo núi từ chỗ đó (登り~~ます~~ ➔ 登り始める).'
      }
    ],
    plusNote: {
      title: 'Plus: 〜終わる (Kết thúc)',
      formation: 'V-~~ます~~ ＋ 終わる (Động từ thể ます gạch bỏ ます ＋ 終わる)',
      meaningVi: 'Sử dụng khi bạn nói rõ về sự kết thúc của một việc gì đó.',
      examples: [
        {
          ja: 'その本、読み終わったら貸してもらえませんか。',
          vi: 'Cuốn sách đó, khi bạn đọc xong thì cho tôi mượn được không? (読み~~ます~~ ➔ 読み終わる)'
        },
        {
          ja: '晩ご飯を食べ終わってから、みんなでゲームをした。',
          vi: 'Sau khi ăn tối xong, mọi người cùng nhau chơi game (食べ~~ます~~ ➔ 食べ終わる).'
        }
      ]
    }
  },
  {
    id: 'try-n3-c1-g2',
    chapter: 1,
    number: 2,
    pattern: '〜ように言う',
    title: '持っていくように言われた',
    stars: 2,
    formation: 'V-る / V-ない ＋ ように言う',
    meaningJa: '「〜ように言う」は、「しろ・するな」「してください」「したほうがいい」などの命令・禁止・指示・助言の内容を伝えるときに使う。',
    meaningVi: 'Sử dụng khi bạn truyền đạt lại nội dung của một mệnh lệnh, nghiêm cấm, chỉ thị hay lời khuyên như "hãy làm/đừng làm", "xin hãy làm", "nên làm".',
    usageNote: 'Ngoài 「言う」 (nói), ta cũng thường dùng với các động từ: 「注意する」(nhắc nhở), 「頼む」(nhờ vả), 「伝える」(nhắn lại),...',
    examples: [
      {
        ja: '先生に宿題を忘れないように注意された。',
        vi: 'Tôi bị giáo viên nhắc nhở là không được quên bài tập về nhà.'
      },
      {
        ja: '医者にお酒を飲まないように言われました。',
        vi: 'Tôi được bác sĩ dặn là không được uống rượu bia.'
      },
      {
        ja: 'お母さんからも勉強するように言ってください。',
        vi: 'Nhờ mẹ cũng nói thêm với nó là hãy chịu khó học bài đi nhé.'
      },
      {
        ja: '私は佐藤さんに、会議の前に資料をコピーしておくように頼みました。',
        vi: 'Tôi đã nhờ anh Sato photocopy sẵn tài liệu trước giờ họp.'
      }
    ]
  },
  {
    id: 'try-n3-c1-g3',
    chapter: 1,
    number: 3,
    pattern: '〜ということ',
    title: '病気になる人もいるということ',
    stars: 3,
    formation: 'Thể thông thường (Pl) ＋ という ＋ N (こと / ニュース / 話 / うわさ / 結果...)',
    meaningJa: '「〜という」は、「台風が来るというニュース」のように、内容を言うときによく使う。',
    meaningVi: 'Thường được sử dụng khi bạn mô tả cụ thể nội dung của một danh từ (tin tức, câu chuyện, lời đồn, kết quả, sự việc...).',
    usageNote: 'Dùng cấu trúc "A という B" nghĩa là "B có nội dung là A". Đôi khi cụm "A ということは、B ということです" được dùng để giải thích ý nghĩa (A có nghĩa là B).',
    examples: [
      {
        ja: '彼が有名な音楽家だということはあまり知られていない。',
        vi: 'Việc anh ấy là một nhạc sĩ nổi tiếng thì không được nhiều người biết đến.'
      },
      {
        ja: '最近は大学を卒業しても就職が難しいという話を聞きました。',
        vi: 'Gần đây tôi có nghe câu chuyện rằng dù tốt nghiệp đại học nhưng tìm việc vẫn rất khó khăn.'
      },
      {
        ja: '背が伸びるということは、骨が伸びるということです。',
        vi: 'Việc chiều cao tăng lên có nghĩa là xương đang dài ra.'
      },
      {
        ja: '画面に「圏外」という文字が出たら、今電波が届かないところにいるということです。',
        vi: 'Nếu trên màn hình hiện chữ "ngoài vùng phủ sóng", điều đó có nghĩa là bạn đang ở nơi không có sóng điện thoại.'
      }
    ]
  },
  {
    id: 'try-n3-c1-g4',
    chapter: 1,
    number: 4,
    pattern: '〜だろうと思う',
    title: '大丈夫だろうと思った',
    stars: 2,
    formation: 'Thể thông thường (Pl) ＋ だろうと思う\n* [なA~~だ~~ / N~~だ~~] ➔ Tính từ đuôi な và Danh từ gạch bỏ [だ] (なAだろう / Nだろう)',
    meaningJa: '「〜だろう」は「〜でしょう」の普通形で、はっきりわからないがたぶんそうだと考えた内容をほかの人に伝えるときに使う。',
    meaningVi: '「〜だろう」là thể thông thường của「〜でしょう」. Sử dụng khi bạn nói với người khác về điều mà bạn nghĩ có lẽ là như thế nhưng không chắc chắn lắm.',
    usageNote: 'Diễn tả phỏng đoán mang tính chủ quan của người nói. Khi nói trong quá khứ dùng 「〜だろうと思った」 (Tôi đã nghĩ chắc là...).',
    examples: [
      {
        ja: 'たぶんこの雨は1時間ぐらいでやむだろうと思います。',
        vi: 'Tôi nghĩ có lẽ cơn mưa này khoảng 1 tiếng nữa là tạnh.'
      },
      {
        ja: '外国で一人暮らしをするのはきっとさびしいだろうと思う。',
        vi: 'Tôi nghĩ sống một mình ở nước ngoài chắc chắn là cô đơn lắm.'
      },
      {
        ja: '沖縄は暑いだろうと思っていたが、毎日雨で寒くて泳げなかった。',
        vi: 'Tôi cứ ngỡ Okinawa sẽ nóng bức lắm, ai dè ngày nào cũng mưa rét không bơi được.'
      }
    ]
  },
  {
    id: 'try-n3-c1-g5',
    chapter: 1,
    number: 5,
    pattern: '〜なさそうだ',
    title: '大変じゃなさそうだった',
    stars: 3,
    formation: '・Tính từ đuôi い: いA gạch bỏ [~~い~~] ＋ くなさそうだ (おいし~~い~~ ➔ おいしくなさそう)\n・Tính từ đuôi な: なA ＋ じゃなさそうだ (大変 ➔ 大変じゃなさそう)\n・Danh từ: N ＋ じゃなさそうだ (日本人 ➔ 日本人じゃなさそう)',
    meaningJa: '「〜なさそうだ」は、何かを見て感じたり、予想して「〜ではない」と思ったときに使う。',
    meaningVi: 'Sử dụng khi bạn nhìn vào một sự vật, hiện tượng rồi cảm nhận, dự đoán và nghĩ rằng "trông có vẻ không...".',
    usageNote: 'Lưu ý: Tính từ [いい/よい] biến đổi thành [よくなさそうだ]. Với Động từ, ta KHÔNG dùng V-なさそうだ mà dùng [V-~~ます~~ + そうもない / そうにない / そうにもない].',
    examples: [
      {
        ja: 'このカレーはあまり辛くなさそうですね。',
        vi: 'Món cà ri này trông có vẻ không cay lắm nhỉ (辛~~い~~ ➔ 辛くなさそう).'
      },
      {
        ja: 'この仕事はそんなに大変じゃなさそうだ。',
        vi: 'Công việc này trông có vẻ không đến mức quá vất vả.'
      },
      {
        ja: 'A:「この電子辞書、安いけどあまりかわいくないかなあ。」\nB:「でも、性能は悪くなさそうよ。」',
        vi: 'A: "Cái kim từ điển này rẻ nhưng trông không dễ thương lắm nhỉ."\nB: "Nhưng tính năng thì trông có vẻ không tồi đâu."'
      },
      {
        ja: 'A:「Lサイズがあるかどうか、あの人に聞いてみようか。」\nB:「でも、あの人はお店の人じゃなさそうよ。」',
        vi: 'A: "Hay là ra hỏi người kia xem có size L không nhé?"\nB: "Nhưng trông người đó không có vẻ là nhân viên quán đâu."'
      }
    ],
    plusNote: {
      title: 'Lưu ý động từ: V-~~ます~~ ＋ そうもない / そうにない / そうにもない',
      formation: 'V-~~ます~~ ＋ そうもない / そうにない / そうにもない (Động từ thể ます gạch bỏ ます)',
      meaningVi: 'Với động từ, khi diễn tả "khó lòng mà / hầu như không thể diễn ra", ta dùng cấu trúc này.',
      examples: [
        {
          ja: 'こんな難しそうな本、１週間では読めそうもない。',
          vi: 'Quyển sách trông khó nhằn thế này, trong 1 tuần thì khó lòng mà đọc xong nổi (読め~~ます~~ ➔ 読めそうもない).'
        },
        {
          ja: '忙しいので、しばらく残業は減りそうもない。',
          vi: 'Vì đang bận rộn nên thời gian tới việc làm thêm giờ khó mà giảm bớt được (減り~~ます~~ ➔ 減りそうもない).'
        },
        {
          ja: '安くなったら買おうと思ったが、これ以上安くなりそうにないから、あきらめた。',
          vi: 'Tôi tính khi nào giảm giá thì mua, nhưng thấy khó mà rẻ hơn được nữa nên đã từ bỏ (安くなり~~ます~~ ➔ 安くなりそうにない).'
        },
        {
          ja: '荷物が多くて、かばんに全部入りそうにない。',
          vi: 'Hành lý nhiều quá, trông khó lòng mà nhét hết vào trong túi được (入り~~ます~~ ➔ 入りそうにない).'
        }
      ]
    }
  }
];

// Flashcard items for Chapter 1
const chapter1FlashcardItems: StudyItem[] = [
  {
    id: 'try-n3-c1-fc-1',
    term: '〜始める',
    reading: 'V-~~ます~~ ＋ はじめる (V bỏ ます)',
    answer: 'Bắt đầu làm gì (cần thời gian)',
    meaning: 'Bắt đầu làm một hành động cần có thời gian',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ 始める\n(Động từ chia thể ます, gạch bỏ chữ「ます」rồi ghép với「始める」)\nVí dụ: 登り~~ます~~ ➔ 登り始めた (bắt đầu leo núi).\n★ Sử dụng khi bạn nói rõ về sự bắt đầu của một việc làm gì đó mà cần có thời gian.',
    example: '① 日本語を習い始めたのは半年前です。(Tôi bắt đầu học tiếng Nhật là từ nửa năm trước: 習い~~ます~~ ➔ 習い始める).\n② 桜の花が咲き始めましたね。(Hoa anh đào đã bắt đầu nở rộ rồi nhỉ: 咲き~~ます~~ ➔ 咲き始める).'
  },
  {
    id: 'try-n3-c1-fc-2',
    term: '〜終わる',
    reading: 'V-~~ます~~ ＋ おわる (V bỏ ます)',
    answer: 'Làm xong / kết thúc việc gì',
    meaning: 'Kết thúc, hoàn thành trọn vẹn một hành động',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ 終わる\n(Động từ chia thể ます, gạch bỏ chữ「ます」rồi ghép với「終わる」)\nVí dụ: 読み~~ます~~ ➔ 読み終わったら (sau khi đọc xong).\n★ Sử dụng khi nói rõ về sự kết thúc, hoàn tất của một việc gì đó.',
    example: '① その本、読み終わったら貸してもらえませんか。(Cuốn sách đó, bạn đọc xong thì cho tôi mượn được không?)\n② 晩ご飯を食べ終わってから、みんなでゲームをした。(Sau khi ăn tối xong, cả nhóm cùng chơi trò chơi.)'
  },
  {
    id: 'try-n3-c1-fc-3',
    term: '〜ように言う',
    reading: 'V-る / V-ない ＋ ようにいう',
    answer: 'Nói / Nhắc nhở / Nhờ vả ai làm gì',
    meaning: 'Truyền đạt lại mệnh lệnh, chỉ thị, nghiêm cấm hoặc lời khuyên gián tiếp',
    explanation: '★ Cấu trúc: V-る / V-ない + ように言う\n★ Có thể thay thế「言う」bằng「注意する」(nhắc nhở),「頼む」(nhờ vả),「伝える」(nhắn lại).\n★ Trong bài đọc: 酸素缶も持っていくように言われた (Được dặn là hãy mang theo cả bình oxy).',
    example: '① 先生に宿題を忘れないように注意された。(Bị giáo viên nhắc nhở không được quên bài tập.)\n② 医者にお酒を飲まないように言われました。(Bác sĩ dặn tôi không được uống rượu bia.)\n③ お母さんからも勉強するように言ってください。(Nhờ mẹ nói nó hãy học bài đi.)'
  },
  {
    id: 'try-n3-c1-fc-4',
    term: '〜ということ',
    reading: 'Thể thông thường (Pl) ＋ ということ',
    answer: 'Việc rằng... / Có nghĩa là...',
    meaning: 'Diễn giải nội dung cụ thể của một danh từ hoặc định nghĩa ý nghĩa',
    explanation: '★ Cấu trúc: Pl + という + N (こと / ニュース / 話 / うわさ / 結果)\n★ Thường dùng để nêu nội dung cụ thể của một danh từ.\n★ Cụm「A ということは、B ということです」: A có nghĩa là B.\n★ Trong bài: 空気が薄いと病気になる人もいるということを思い出した (Nhớ lại sự việc rằng có người bị ốm do thiếu oxy).',
    example: '① 彼が有名な音楽家だということはあまり知られていない。(Việc anh ấy là nhạc sĩ nổi tiếng ít ai biết.)\n② 背が伸びるということは、骨が伸びるということです。(Chiều cao tăng có nghĩa là xương dài ra.)'
  },
  {
    id: 'try-n3-c1-fc-5',
    term: '〜だろうと思う',
    reading: 'Thể thông thường (Pl) ＋ だろうとおもう',
    answer: 'Nghĩ rằng có lẽ là...',
    meaning: 'Bày tỏ phỏng đoán, suy nghĩ chủ quan nhưng chưa chắc chắn 100%',
    explanation: '★ Cấu trúc: Pl + だろうと思う\n★ Lưu ý trong sách: Tính từ đuôi な và Danh từ GẠCH BỎ chữ「だ」(なA~~だ~~ / N~~だ~~ ➔ なAだろう / Nだろう).\nVí dụ: 大丈夫~~だ~~ ➔ 大丈夫だろう (大丈夫だろうと思った).',
    example: '① たぶんこの雨は1時間ぐらいでやむだろうと思います。(Tôi nghĩ có lẽ 1 tiếng nữa mưa sẽ tạnh.)\n② 外国で一人暮らしをするのはきっとさびしいだろうと思う。(Tôi nghĩ sống một mình ở nước ngoài chắc chắn là cô đơn lắm.)'
  },
  {
    id: 'try-n3-c1-fc-6',
    term: '〜なさそうだ',
    reading: 'いA bỏ ~~い~~ ＋ くなさそうだ / なA・N ＋ じゃなさそうだ',
    answer: 'Trông có vẻ không...',
    meaning: 'Nhìn trực tiếp hoặc cảm nhận rồi phán đoán rằng không...',
    explanation: '★ Quy tắc biến đổi chuẩn TRY! N3:\n・Tính từ đuôi い: Gạch bỏ [~~い~~] ➔ くなさそうだ (辛~~い~~ ➔ 辛くなさそう)\n・Tính từ đuôi な: なA ＋ じゃなさそうだ (大変 ➔ 大変じゃなさそう)\n・Danh từ: N ＋ じゃなさそうだ (日本人 ➔ 日本人じゃなさそう)\n★ Trong bài: それほど大変じゃなさそうだった (Trông có vẻ không đến mức quá vất vả).',
    example: '① このカレーはあまり辛くなさそうですね。(Món cà ri này trông không cay lắm nhỉ.)\n② この仕事はそんなに大変じゃなさそうだ。(Công việc này trông không vất vả đến thế đâu.)'
  },
  {
    id: 'try-n3-c1-fc-7',
    term: '〜そうもない / そうにない',
    reading: 'V-~~ます~~ ＋ そうもない / そうにない (V bỏ ます)',
    answer: 'Khó lòng mà... / Trông khó có thể...',
    meaning: 'Dùng cho ĐỘNG TỪ để diễn tả một việc khó lòng mà xảy ra được',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ そうもない / そうにない\n(Động từ chia ở thể ます, gạch bỏ chữ「ます」).\nVí dụ: 読め~~ます~~ ➔ 読めそうもない, 入り~~ます~~ ➔ 入りそうにない.\n★ Dành cho ĐỘNG TỪ khi muốn diễn tả việc khó lòng mà xảy ra được (KHÔNG dùng V-なさそうだ).',
    example: '① こんな難しそうな本、１週間では読めそうもない。(Sách khó thế này trong 1 tuần khó lòng mà đọc xong: 読め~~ます~~ ➔ 読めそうもない).\n② 荷物が多くて、かばんに全部入りそうにない。(Hành lý nhiều quá, trông khó lòng nhét hết vào túi: 入り~~ます~~ ➔ 入りそうにない).'
  }
];

// Multiple choice exercises for Chapter 1
const chapter1ExerciseItems: StudyItem[] = [
  {
    id: 'try-n3-c1-q-1',
    question: '「いただきます」と言って、みんな一緒に食べ＿＿＿＿＿ました。',
    answer: '始め',
    choices: ['始め', '終わり', 'そうにない', 'だろう'],
    explanation: 'Theo sách TRY! N3 trang 17: Sau khi nói câu chúc ngon miệng "Itadakimasu" thì mọi người cùng bắt đầu ăn cơm ➔ dùng 食べ始めました.'
  },
  {
    id: 'try-n3-c1-q-2',
    question: '作文を書き＿＿＿＿＿人は出してください。',
    answer: '終わった',
    choices: ['終わった', '始めた', '始まらない', 'なさそうな'],
    explanation: 'Theo sách TRY! N3 trang 17: Những ai đã viết bài luận xong thì hãy nộp lên ➔ 書き終わった (viết xong).'
  },
  {
    id: 'try-n3-c1-q-3',
    question: 'A:「これ、借りてもいいですか。」\nB:「ええ、どうぞ。使い＿＿＿＿＿ら、元のところに戻してくださいね。」',
    answer: '終わった',
    choices: ['終わった', '始めた', 'なさそう', 'という'],
    explanation: 'Theo sách TRY! N3 trang 17: "Dùng xong thì hãy để lại chỗ cũ nhé" ➔ 使い終わったら (sau khi dùng xong).'
  },
  {
    id: 'try-n3-c1-q-4',
    question: '先生に「教室で走らないでください」と＿＿＿＿＿＿。',
    answer: '走らないように注意されました',
    choices: [
      '走らないように注意されました',
      '走るように言われました',
      '走るということでした',
      '走らないだろうと思いました'
    ],
    explanation: 'Theo tranh minh hoạ やっみよう! trang 18: Thầy cô nhắc nhở không được chạy trong phòng học ➔ V-ない + ように注意された.'
  },
  {
    id: 'try-n3-c1-q-5',
    question: '母に「パンを買ってきて」と＿＿＿＿＿＿。',
    answer: 'パンを買ってくるように頼まれました',
    choices: [
      'パンを買ってくるように頼まれました',
      'パンを買わないように言われました',
      'パンを買うということでした',
      'パンを買うだろうと思いました'
    ],
    explanation: 'Theo tranh やっみよう! trang 18: Mẹ nhờ mua bánh mì về ➔ パンを買ってくるように頼まれました (Được mẹ nhờ đi mua bánh mì).'
  },
  {
    id: 'try-n3-c1-q-6',
    question: '母に「部屋を散らかさないでちゃんと片付けなさい」と＿＿＿＿＿＿。',
    answer: '部屋を片付けるように言われました',
    choices: [
      '部屋を片付けるように言われました',
      '部屋を片付けないように言われました',
      '部屋を片付けるということでした',
      '部屋を片付けるだろうと思いました'
    ],
    explanation: 'Theo tranh やっみよう! trang 18: Mẹ bảo dọn dẹp phòng ốc bừa bộn ➔ 部屋を片付けるように言われました.'
  },
  {
    id: 'try-n3-c1-q-7',
    question: '先生から入学試験の日は学校が休みになるという＿＿＿＿＿があった。',
    answer: '連絡',
    choices: ['連絡', 'こと', 'うわさ', '結果'],
    explanation: 'Theo sách TRY! N3 trang 19: Nhận được "thông báo" (連絡) từ thầy cô rằng ngày thi trường sẽ nghỉ học.'
  },
  {
    id: 'try-n3-c1-q-8',
    question: '調査で、不景気でも消費者のニーズに合う商品は売れるという＿＿＿＿＿が出た。',
    answer: '結果',
    choices: ['結果', '連絡', 'うわさ', 'こと'],
    explanation: 'Theo sách TRY! N3 trang 19: Qua khảo sát, đưa ra "kết quả" (結果) rằng sản phẩm đáp ứng nhu cầu khách hàng vẫn bán chạy dù kinh tế khó khăn.'
  },
  {
    id: 'try-n3-c1-q-9',
    question: 'リンさんが来月帰国するという＿＿＿＿＿は本当ですか。',
    answer: 'うわさ',
    choices: ['うわさ', '連絡', '結果', '始まり'],
    explanation: 'Theo sách TRY! N3 trang 19: "Tin đồn" (うわさ) rằng bạn Lin tháng sau về nước có thật không?'
  },
  {
    id: 'try-n3-c1-q-10',
    question: 'ミリオンセラーというのは100万枚以上売れたという＿＿＿＿＿です。',
    answer: 'こと',
    choices: ['こと', '連絡', 'うわさ', '結果'],
    explanation: 'Theo sách TRY! N3 trang 19: Cấu trúc giải thích định nghĩa "A というのは ... ということです" ➔ đáp án là こと.'
  },
  {
    id: 'try-n3-c1-q-11',
    question: '今度の試験は難しいだろうと思っていたが、＿＿＿＿＿＿。',
    answer: '意外に簡単だった',
    choices: [
      '意外に簡単だった',
      'だれにも会えなかった',
      '２時間もかかってしまった',
      'ちゃんと準備をしておいたほうがいいよ'
    ],
    explanation: 'Theo bài nối câu trang 19: "Cứ ngỡ kỳ thi lần này khó lắm, nhưng ngược lại bất ngờ là lại khá dễ" ➔ 意外に簡単だった.'
  },
  {
    id: 'try-n3-c1-q-12',
    question: 'テレビ局へ行けば有名人に会えるだろうと思っていたのに、＿＿＿＿＿＿。',
    answer: 'だれにも会えなかった',
    choices: [
      'だれにも会えなかった',
      '意外に簡単だった',
      '２時間もかかってしまった',
      'ちゃんと準備をしておいたほうがいいよ'
    ],
    explanation: 'Theo bài nối câu trang 19: "Cứ tưởng đến đài truyền hình sẽ gặp được người nổi tiếng, thế mà lại chẳng gặp được ai cả" ➔ だれにも会えなかった.'
  },
  {
    id: 'try-n3-c1-q-13',
    question: 'タクシーならすぐ着くだろうと思ったが、＿＿＿＿＿＿。',
    answer: '２時間もかかってしまった',
    choices: [
      '２時間もかかってしまった',
      '意外に簡単だった',
      'だれにも会えなかった',
      'ちゃんと準備をしておいたほうがいいよ'
    ],
    explanation: 'Theo bài nối câu trang 19: "Tưởng đi taxi thì sẽ tới ngay, ai ngờ mất toi tận 2 tiếng đồng hồ" ➔ ２時間もかかってしまった.'
  },
  {
    id: 'try-n3-c1-q-14',
    question: 'やらなくても大丈夫だろうと思わないで、＿＿＿＿＿＿。',
    answer: 'ちゃんと準備をしておいたほうがいいよ',
    choices: [
      'ちゃんと準備をしておいたほうがいいよ',
      '意外に簡単だった',
      'だれにも会えなかった',
      '２時間もかかってしまった'
    ],
    explanation: 'Theo bài nối câu trang 19: "Đừng nghĩ là không làm cũng chẳng sao, hãy chuẩn bị thật chu đáo đi nhé" ➔ ちゃんと準備をしておいたほうがいいよ.'
  },
  {
    id: 'try-n3-c1-q-15',
    question: 'この刺身、ちょっと古くて＿＿＿＿＿ね。',
    answer: 'おいしくなさそう',
    choices: ['おいしくなさそう', 'おいしそう', 'おいしいだろう', 'おいしいということ'],
    explanation: 'Theo ví dụ mẫu trang 20: Món cá sống này hơi cũ nên trông có vẻ không ngon ➔ おいしい (Aい) bỏ い + なさそう ➔ おいしくなさそう.'
  },
  {
    id: 'try-n3-c1-q-16',
    question: 'ちょっと熱があるんですが、＿＿＿＿＿ですから、大丈夫です。',
    answer: 'インフルエンザじゃなさそう',
    choices: [
      'インフルエンザじゃなさそう',
      'インフルエンザだろう',
      'インフルエンザということ',
      'インフルエンザになり始め'
    ],
    explanation: 'Theo bài やっみよう! trang 20: Tôi hơi sốt nhưng trông có vẻ không phải cúm đâu nên không sao ➔ Danh từ + じゃなさそう.'
  },
  {
    id: 'try-n3-c1-q-17',
    question: '新しいアルバイトの人、おしゃべりが好きだし、遅刻するし、＿＿＿＿＿よ。',
    answer: 'まじめじゃなさそう',
    choices: [
      'まじめじゃなさそう',
      'まじめそう',
      'まじめだろう',
      'まじめということ'
    ],
    explanation: 'Theo bài やっみよう! trang 20: Người làm thêm mới thích tán gẫu lại hay đi muộn, trông có vẻ không nghiêm túc ➔ まじめ (Aな) + じゃなさそう.'
  },
  {
    id: 'try-n3-c1-q-18',
    question: '相手のチームはそんなに＿＿＿＿＿だから、勝てると思う。',
    answer: '強くなさそう',
    choices: [
      '強くなさそう',
      '強いだろう',
      '強いということ',
      '強くなり始め'
    ],
    explanation: 'Theo bài やっみよう! trang 20: Đội đối thủ trông có vẻ không mạnh lắm nên tôi nghĩ chúng ta có thể thắng ➔ 強い (Aい) bỏ い + なさそう ➔ 強くなさそう.'
  },
  {
    id: 'try-n3-c1-q-19',
    question: 'こんな難しそうな専門書、１週間では＿＿＿＿＿＿。',
    answer: '読めそうもない',
    choices: [
      '読めそうもない',
      '読めなさそうだ',
      '読み始めない',
      '読み終わるだろう'
    ],
    explanation: 'Theo phần Plus trang 20: Với động từ, diễn tả "khó lòng mà / không có vẻ gì là làm được", ta dùng V-~~ます~~ + そうもない / そうにない (không dùng V-なさそうだ) ➔ 読めそうもない.'
  },
  {
    id: 'try-n3-c1-q-20',
    question: '安くなったら買おうと思ったが、これ以上＿＿＿＿＿から、あきらめた。',
    answer: '安くなりそうにない',
    choices: [
      '安くなりそうにない',
      '安くならなさそう',
      '安くならなそう',
      '安くなるだろう'
    ],
    explanation: 'Theo phần Plus trang 20: Động từ 安くなる bỏ ます thành 安くなり + そうにない ➔ 安くなりそうにない (khó lòng mà giảm giá thêm).'
  },
  {
    id: 'try-n3-c1-q-21',
    question: 'A:「がんばって作ったんだから、全部食べてね。」\nB:「えー！ こんなにたくさん＿＿＿＿＿よ。」',
    answer: '食べられそうもない',
    choices: [
      '食べられそうもない',
      '食べそうもない',
      '食べなさそう',
      '食べ始めない'
    ],
    explanation: 'Theo bài やっみよう! trang 21: Diễn tả khả năng bản thân khó lòng ăn hết được ngần này đồ ăn ➔ Dùng động từ thể khả năng 食べられる bỏ ます + そうもない ➔ 食べられそうもない.'
  },
  {
    id: 'try-n3-c1-q-22',
    question: 'A:「電車、まだ＿＿＿＿＿ね。」\nB:「雪だから、遅れるのはしょうがないよ。」',
    answer: '来そうもない',
    choices: [
      '来そうもない',
      '来られそうもない',
      '来なさそう',
      '来始めない'
    ],
    explanation: 'Theo bài やっみよう! trang 21: Chủ ngữ là phương tiện 電車 (tàu điện) ➔ Tàu khó lòng mà tới được do tuyết ➔ Động từ thường 来る bỏ ます thành 来 (ki) + そうもない ➔ 来そうもない (きそうもない). Không dùng thể khả năng cho chủ ngữ tàu điện.'
  },
  {
    id: 'try-n3-c1-q-23',
    question: '一人じゃ＿＿＿＿＿から、手伝ってくれる？',
    answer: '運べそうもない',
    choices: [
      '運べそうもない',
      '運びそうもない',
      '運ばなさそう',
      '運び始めた'
    ],
    explanation: 'Theo bài やっみよう! trang 21: Diễn tả khả năng bản thân một mình khó lòng mà khiêng vác nổi ➔ Động từ thể khả năng 運べる bỏ ます + そうもない ➔ 運べそうもない.'
  }
];

// Check test items from page 21 (Check 📖 - 6 questions)
export const chapter1CheckItems: StudyItem[] = [
  {
    id: 'try-n3-c1-check-1',
    question: '6時半になって、やっと東の空が明るくなり＿＿＿＿＿＿。',
    answer: '始めた',
    choices: ['始めた', 'ように言われた', 'だろうと思う', 'なさそう'],
    explanation: 'Theo bài Check trang 21: Đến 6 giờ rưỡi, cuối cùng thì bầu trời phía đông cũng bắt đầu sáng dần lên ➔ 明るくなり始めた (V-ます + 始める).'
  },
  {
    id: 'try-n3-c1-check-2',
    question: '先生に、夜一人で帰るときは気をつけて帰る＿＿＿＿＿＿。',
    answer: 'ように言われた',
    choices: ['ように言われた', '始めた', 'だろうと思う', 'ということ'],
    explanation: 'Theo bài Check trang 21: Được thầy cô dặn dò là khi về một mình ban đêm thì hãy cẩn thận ➔ V-る + ように言われた.'
  },
  {
    id: 'try-n3-c1-check-3',
    question: '教師の仕事は授業の準備や宿題のチェックなどがあって、きっと大変＿＿＿＿＿＿。',
    answer: 'だろうと思う',
    choices: ['だろうと思う', '始めた', 'ように言われた', 'なさそう'],
    explanation: 'Theo bài Check trang 21: Công việc giáo viên phải soạn bài rồi chấm bài tập, chắc chắn là vất vả lắm ➔ Tính từ な bỏ だ + だろうと思う (大変だろうと思う).'
  },
  {
    id: 'try-n3-c1-check-4',
    question: 'すみません。電車が遅れて、約束の時間に間に合い＿＿＿＿＿＿んです。',
    answer: 'そうもない',
    choices: ['そうもない', 'なさそう', 'という', 'だろう'],
    explanation: 'Theo bài Check trang 21: Xin lỗi, tàu bị trễ nên khó lòng mà kịp giờ hẹn được ➔ 間に合う bỏ ます + そうもない ➔ 間に合いそうもない (Động từ khó lòng xảy ra).'
  },
  {
    id: 'try-n3-c1-check-5',
    question: '彼女が初めて作ったケーキはあまりおいしく＿＿＿＿＿＿だった。',
    answer: 'なさそう',
    choices: ['なさそう', 'そうもない', 'という', '始めた'],
    explanation: 'Theo bài Check trang 21: Bánh kem cô ấy làm lần đầu trông có vẻ không ngon lắm ➔ Tính từ おいしい bỏ い + なさそう ➔ おいしくなさそうだった.'
  },
  {
    id: 'try-n3-c1-check-6',
    question: 'この町は昔、漁業が盛んだった＿＿＿＿＿＿話です。',
    answer: 'という',
    choices: ['という', 'なさそう', 'そうもない', 'ように言う'],
    explanation: 'Theo bài Check trang 21: Nghe kể câu chuyện rằng thị trấn này ngày xưa ngành đánh bắt cá rất phát triển ➔ Thể thông thường + という + N (盛んだったという話).'
  }
];

export const tryN3Lessons: Lesson[] = [
  {
    id: 1,
    title: 'Chương 1: 初めての富士登山 (1) - Lần đầu leo núi Phú Sĩ (1)',
    hasTheory: true,
    sections: [
      {
        id: 'try-n3-c1-flashcard',
        title: 'Flashcard 5 Mẫu Ngữ Pháp & Điểm Plus',
        type: 'vocabulary',
        items: chapter1FlashcardItems
      },
      {
        id: 'try-n3-c1-exercises',
        title: 'Trắc nghiệm やっみよう! Củng cố Ngữ pháp',
        type: 'multiple_choice',
        items: chapter1ExerciseItems
      },
      {
        id: 'try-n3-c1-check',
        title: 'Kiểm tra Check Tổng kết Chương 1 (Check 📖)',
        type: 'multiple_choice',
        items: chapter1CheckItems
      }
    ]
  }
];
