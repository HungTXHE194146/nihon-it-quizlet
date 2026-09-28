import type { Lesson, StudyItem } from './lessons';

export interface GrammarPoint {
  id: string;
  chapter: number;
  number: number;
  pattern: string;
  title: string;
  stars: number;
  formation: string;
  translationVi: string;
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
    translationVi?: string;
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
    translation?: string;
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
      translation: 'Bắt đầu leo',
      explanation: 'V-~~ます~~ ＋ 始める: Bắt đầu một hành động cần thời gian (Động từ chia thể ます, gạch ~~ます~~: 登り~~ます~~ ➔ 登り始めた).'
    },
    {
      text: '持っていくように言われた',
      grammarName: '〜ように言う',
      translation: 'Được dặn là hãy mang theo',
      explanation: 'V-る / V-ない ＋ ように言う: Truyền đạt lại lời dặn dò, chỉ thị (được dặn là hãy mang theo bình oxy).'
    },
    {
      text: '病気になる人もいるということ',
      grammarName: '〜ということ',
      translation: 'Việc rằng cũng có người bị ốm',
      explanation: 'Thể thông thường ＋ という ＋ Danh từ: Mô tả nội dung của một sự việc (nhớ ra sự việc rằng có người bị ốm).'
    },
    {
      text: '大丈夫だろうと思った',
      grammarName: '〜だろうと思う',
      translation: 'Nghĩ rằng chắc sẽ ổn thôi',
      explanation: 'Thể thông thường [N~~だ~~ / なA~~だ~~] ＋ だろうと思う: Bày tỏ suy nghĩ phán đoán không chắc chắn (nghĩ rằng có lẽ sẽ ổn thôi).'
    },
    {
      text: '大変じゃなさそうだった',
      grammarName: '〜なさそうだ',
      translation: 'Trông có vẻ không đến mức quá vất vả',
      explanation: 'Tính từ な ＋ じゃなさそうだ: Nhìn cảm nhận rồi dự đoán rằng không vất vả đến thế.'
    }
  ]
};

export const tryN3Chapter1Part2Story: ChapterStory = {
  chapter: 1,
  titleJa: '1 初めての富士登山 (2)',
  titleVi: '1. Lần đầu leo núi Phú Sĩ (Phần 2)',
  canDoJa: '旅行などの初めての経験について、体験したことや考えたこと、感じたことが表現できる。',
  canDoVi: 'Bạn có thể nói lên những điều bạn đã trải nghiệm, suy nghĩ hay cảm nhận về kinh nghiệm lần đầu của mình, chẳng hạn như về chuyến đi du lịch của bạn.',
  textJa: `でも、登ってみると、本当に大変だった。途中で立っているのもつらいほど足が重くなった。もうやめたいと思ったが、前を見ると、どんどん登っていくリンさんが見えた。リンさんががんばっているのに、あきらめるのはくやしいから、私も登り続けた。
あとで聞いたら、リンさんも途中でやめようと思ったけど、私が後ろから登ってくるのが見えたからがんばったと言っていた。大変だったが、一番上まで行けて本当によかった。だから、もしこれから富士山に登る人がいたら、上まで行きたいなら、友だちと一緒に行くことをおすすめしたい。もちろん酸素缶も持っていったほうがいい。
でも、もう一度行きたいかと聞かれたら、もう二度とあんな大変なことはしたくないと答えるだろう。富士山は遠くから見るほうがずっといいと思う。`,
  textVi: `Nhưng khi thử leo rồi thì mới thấy thật sự rất vất vả. Giữa chừng, chân tôi trở nên nặng trĩu đến mức chỉ đứng thôi cũng thấy khổ sở. Tôi đã nghĩ là muốn bỏ cuộc rồi, nhưng nhìn ra phía trước lại thấy bạn Lin cứ thoăn thoắt leo tiếp lên. Lin đang cố gắng như vậy, nếu mình bỏ cuộc thì tiếc và ấm ức lắm, nên tôi cũng tiếp tục leo.
Sau này hỏi ra mới biết, Lin cũng từng tính bỏ cuộc giữa chừng, nhưng vì thấy tôi đang leo từ phía sau tới nên mới có động lực cố gắng. Dù rất vất vả, nhưng lên được tới đỉnh núi thì thật sự tuyệt vời. Vì vậy, nếu sau này có ai định leo núi Phú Sĩ, nếu muốn lên tận đỉnh thì tôi khuyên các bạn nên đi cùng bạn bè. Tất nhiên là cũng nên mang theo cả bình oxy nữa.
Thế nhưng, nếu được hỏi có muốn đi thêm lần nữa không, chắc tôi sẽ trả lời rằng không bao giờ muốn làm điều vất vả như thế lần thứ hai. Tôi nghĩ núi Phú Sĩ ngắm nhìn từ xa thì vẫn đẹp và tốt hơn nhiều.`,
  grammarHighlights: [
    {
      text: '登ってみると',
      grammarName: '〜と',
      translation: 'Vừa mới thử leo thì nhận ra',
      explanation: 'V-る ＋ と: Nhận ra điều trước đó mình chưa biết sau một hành động (登ってみる ➔ 登ってみると).'
    },
    {
      text: '立っているのもつらいほど',
      grammarName: '〜ほど',
      translation: 'Đến mức đứng thôi cũng khổ sở',
      explanation: '[V-る / V-ない / N] ＋ ほど: Biểu thị mức độ phi thường, bất thường bằng một ví dụ cụ thể.'
    },
    {
      text: 'どんどん登っていく',
      grammarName: '〜ていく',
      translation: 'Càng ngày càng leo lên xa',
      explanation: 'V-て ＋ いく: Diễn tả sự việc di chuyển ngày càng ra xa hoặc tiếp diễn về phía tương lai.'
    },
    {
      text: '登り続けた',
      grammarName: '〜続ける',
      translation: 'Tiếp tục leo kiên trì',
      explanation: 'V-~~ます~~ ＋ 続ける: Nhấn mạnh sự tiếp tục duy trì liên tục một hành động.'
    },
    {
      text: '登ってくる',
      grammarName: '〜てくる',
      translation: 'Leo lại gần về phía mình',
      explanation: 'V-て ＋ くる: Di chuyển tiến lại gần hoặc tiếp diễn từ quá khứ đến hiện tại.'
    },
    {
      text: '上まで行きたいなら',
      grammarName: '〜なら',
      translation: 'Nếu muốn lên tận đỉnh núi',
      explanation: '[V-る(の) / N] ＋ なら: Giới hạn phạm vi trường hợp để đưa ra lời khuyên hoặc gợi ý.'
    }
  ]
};

export const tryN3Chapter2Story: ChapterStory = {
  chapter: 1,
  titleJa: '3 ぼくの犬、クロ (1)',
  titleVi: '3. Kuro, chú cún của tôi (Phần 3)',
  canDoJa: 'ペットや家族を簡単に紹介したり、自分との関係を説明したりすることができる。',
  canDoVi: 'Bạn có thể giới thiệu về gia đình hoặc là thú cưng một cách đơn giản, và giải thích mối quan hệ giữa họ và bạn.',
  textJa: `ぼくはいつも夜、クロを散歩に連れていく。クロを飼い始めたのは3年前だ。
色が黒いから、クロって名前をつけた。
最初、両親は犬を飼うことに反対だったが、何度も頼んで、やっと飼わせてもらった。そのかわり、雨の日も風の日も毎日必ず散歩すると約束させられた。だからクロの散歩はぼくの日課だ。
ぼくがうちに帰ると、クロは早く散歩に行きたがって「クーンクーン」と鳴く。ぼくがひもを持つと、ぼくのところへ来て、うれしそうにしっぽをふる。そして、ひもをつけて、玄関を出たとたん、クロは全速力で走り出す。`,
  textVi: `Tôi luôn dắt Kuro đi dạo vào mỗi buổi tối. Tôi bắt đầu nuôi Kuro từ 3 năm trước.
Vì lông nó màu đen, nên tôi đặt tên cho nó là Kuro.
Ban đầu, bố mẹ tôi phản đối việc nuôi chó, nhưng tôi đã năn nỉ xin nhiều lần và cuối cùng cũng được bố mẹ cho phép nuôi. Đổi lại, tôi bị bố mẹ bắt phải hứa là dù ngày mưa hay ngày gió thì ngày nào cũng nhất định phải dắt nó đi dạo. Vì vậy dắt Kuro đi dạo là công việc hàng ngày của tôi.
Hễ tôi về đến nhà là Kuro lại tỏ vẻ muốn đi dạo sớm và kêu "Ẳng... ẳng...". Khi tôi cầm sợi dây xích lên, nó liền chạy lại chỗ tôi và mừng rỡ vẫy đuôi. Rồi sau khi tôi móc dây xích vào, ngay vừa khi bước chân ra khỏi cửa, Kuro liền phi hết tốc lực lao vụt đi.`,
  grammarHighlights: [
    {
      text: 'クロって名前',
      grammarName: '〜って',
      translation: 'Tên là Kuro',
      explanation: 'N1 ＋ って ＋ N2: Văn nói thân mật thay cho「〜という」để nói tên người, vật hoặc sự việc.'
    },
    {
      text: '飼わせてもらった',
      grammarName: '〜させてもらう',
      translation: 'Được bố mẹ cho phép nuôi',
      explanation: 'V-させる て ＋ もらう: Sử dụng khi xin phép người khác cho mình làm gì và cảm ơn vì đã được cho phép.'
    },
    {
      text: '約束させられた',
      grammarName: '〜させられる',
      translation: 'Bị bắt phải hứa',
      explanation: 'V-させられる (Thể bị sai khiến): Bị người khác bảo làm việc mình không muốn nhưng phải làm.'
    },
    {
      text: '行きたがって',
      grammarName: '〜がる',
      translation: 'Tỏ vẻ muốn đi dạo',
      explanation: 'V-~~ます~~ た~~い~~ ＋ がる: Cảm xúc, mong muốn của người khác (hoặc động vật) thể hiện rõ ra bên ngoài.'
    },
    {
      text: '玄関を出たとたん',
      grammarName: '〜たとたん',
      translation: 'Ngay vừa khi bước ra cửa',
      explanation: 'V-た ＋ とたん: Sự việc sau xảy ra ngay tức thì, bất ngờ sau khi vừa hoàn thành việc trước.'
    },
    {
      text: '走り出す',
      grammarName: '〜出す',
      translation: 'Bất thình lình lao vụt đi',
      explanation: 'V-~~ます~~ ＋ 出す: Diễn tả một hành động đột nhiên bộc phát hoặc bất ngờ bắt đầu nhanh chóng.'
    }
  ]
};

export const tryN3Chapter2Part2Story: ChapterStory = {
  chapter: 2,
  titleJa: '4 ぼくの犬、クロ (2)',
  titleVi: '4. Kuro, chú cún của tôi (Phần 4)',
  canDoJa: 'ペットや家族との生活や、自分との関係を説明したりすることができる。',
  canDoVi: 'Giải thích về cuộc sống của bạn cùng với gia đình hoặc là thú cưng, cũng như mối liên hệ của bạn với họ.',
  textJa: `近くの公園を1周するのが、いつもの散歩コースだ。帰ろうとするといやがって動こうとしない。そんなときのために、いつもぼくのズボンのポケットには、クロが好きなクッキーが入れてある。クッキーを取り出すと、クロは喜んでぼくのところへ来る。
ときどき、帰りにコンビニに寄ることもある。クロをコンビニの前で待たせておいて、買い物する。戻ってくると、クロは大喜びだ。ぼくは顔中なめられてしまう。なめられるとくすぐったいが、クロは本当にかわいい。`,
  textVi: `Đi một vòng quanh công viên gần nhà là cung đường đi dạo quen thuộc. Khi tôi định đi về thì nó lại khó chịu và nhất quyết không chịu nhúc nhích. Cho những lúc như vậy, trong túi quần của tôi luôn có sẵn bánh quy mà Kuro thích. Vừa lấy bánh quy ra một cái là Kuro mừng rỡ chạy lại chỗ tôi.
Thỉnh thoảng, trên đường về tôi cũng có ghé vào cửa hàng tiện lợi. Tôi để Kuro chờ trước cửa hàng tiện lợi rồi vào mua sắm. Khi tôi quay trở lại, Kuro mừng rỡ khôn xiết. Nó liếm láp khắp mặt tôi. Bị liếm thì buồn buồn nhồn nhột, nhưng Kuro thật sự rất đáng yêu.`,
  grammarHighlights: [
    {
      text: '帰ろうとすると',
      grammarName: '〜ようとする',
      translation: 'Định đi về',
      explanation: 'V-よう ＋ とする: Định làm gì đó / Đang cố gắng làm việc gì đó.'
    },
    {
      text: '動こうとしない',
      grammarName: '〜ようとしない',
      translation: 'Nhất quyết không chịu nhúc nhích',
      explanation: 'V-よう ＋ としない: Bộc lộ cảm xúc phàn nàn, chỉ trích khi ai đó/con vật không chịu làm việc gì.'
    },
    {
      text: '寄ることもある',
      grammarName: '〜こともある',
      translation: 'Thỉnh thoảng cũng ghé vào',
      explanation: 'V-る / V-ない ＋ こともある: Thỉnh thoảng, đôi khi có lúc làm gì đó.'
    },
    {
      text: '待たせておいて',
      grammarName: '〜させておく',
      translation: 'Cứ để cho chờ',
      explanation: 'V-させる て ＋ おく: Chỉ thị tiếp tục hành động hoặc để yên như thế không can thiệp.'
    },
    {
      text: 'なめられてしまう',
      grammarName: '〜られてしまう',
      translation: 'Bị liếm khắp mặt (chịu thiệt hại)',
      explanation: 'V-られる て ＋ しまう: Thể bị động bị hại, diễn tả cảm giác phiền phức hoặc đáng tiếc trước hành động của người khác/con vật.'
    }
  ]
};

export const tryN3ChapterStories: ChapterStory[] = [
  tryN3Chapter1Story,
  tryN3Chapter1Part2Story,
  tryN3Chapter2Story,
  tryN3Chapter2Part2Story
];

export const tryN3GrammarPoints: GrammarPoint[] = [
  {
    id: 'try-n3-c1-g1',
    chapter: 1,
    number: 1,
    pattern: '〜始める',
    title: '登り始めた',
    stars: 3,
    formation: 'V-~~ます~~ ＋ 始める',
    translationVi: 'Bắt đầu làm gì (cần thời gian)',
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
      formation: 'V-~~ます~~ ＋ 終わる',
      translationVi: 'Làm xong / Kết thúc việc gì',
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
    translationVi: 'Bảo / Dặn / Nhắc nhở ai làm gì',
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
    formation: '普通形 ＋ という ＋ N',
    translationVi: 'Việc rằng... / Có nghĩa là...',
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
    formation: '普通形 ＋ だろうと思う\n(※ なA~~だ~~ / N~~だ~~)',
    translationVi: 'Nghĩ rằng có lẽ là... / Chắc là...',
    meaningJa: '「〜だろう」は「〜でしょう」の普通形で、はっきりわからないがたぶんそうだと考えた内容をほかの人に伝えるときに使う。',
    meaningVi: '「〜だろう」là thể thông thường của「〜でしょう」. Sử dụng khi bạn nói với người khác về điều mà bạn nghĩ có lẽ là như thế nhưng không chắc chắn lắm.',
    usageNote: 'Diễn tả phỏng đoán mang tính chủ quan của người nói. Lưu ý: Tính từ đuôi な và Danh từ (Ví dụ: 大丈夫~~だ~~ ➔ 大丈夫だろう, 暇~~だ~~ ➔ 暇だろう, 雨~~だ~~ ➔ 雨だろう).',
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
    formation: 'いA-~~い~~ ＋ くなさそうだ\nなA / N ＋ じゃなさそうだ',
    translationVi: 'Trông có vẻ không...',
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
      formation: 'V-~~ます~~ ＋ そうもない / そうにない / そうにもない',
      translationVi: 'Khó lòng mà... / Trông khó có thể...',
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
  },
  {
    id: 'try-n3-c1-g6',
    chapter: 1,
    number: 6,
    pattern: '〜と',
    title: '登ってみると',
    stars: 2,
    formation: 'V-る ＋ と',
    translationVi: 'Vừa mới... thì nhận ra / Khi... thì thấy',
    meaningJa: '「〜と、…」は、今まで気づかなかったことに気づいたときに使う。意外に思ったことに使われることが多く、また「気づいたこと」なので文末は過去形になることが多い。',
    meaningVi: 'Sử dụng khi bạn nhận ra điều mà trước đó mình không nhận ra. Thường dùng cho điều bất ngờ và vế sau thường ở thì quá khứ (đã nhận ra).',
    usageNote: 'Lưu ý: Vế sau của câu thường chia ở thì quá khứ (た形) vì là sự việc đã nhận thấy. Không dùng vế sau là câu ý chí, mệnh lệnh hay rủ rê.',
    examples: [
      {
        ja: '気がつくと、外はすっかり暗くなっていた。',
        vi: 'Khi nhận ra thì trời bên ngoài đã tối om rồi.'
      },
      {
        ja: '待ち合わせの場所に着くと、友だちはもう来ていた。',
        vi: 'Khi đến chỗ hẹn thì bạn tôi đã đến từ trước rồi.'
      },
      {
        ja: '昔住んでいたところに行ってみると、大きいビルが建っていた。',
        vi: 'Khi thử đến chỗ ngày xưa từng sống thì thấy có một tòa nhà lớn đã mọc lên.'
      },
      {
        ja: '国から届いた荷物を開けると、大好きな菓子が入っていた。',
        vi: 'Khi mở bưu kiện gửi từ quê nhà sang thì thấy có món bánh kẹo tôi vô cùng yêu thích.'
      }
    ],
    plusNote: {
      title: 'Plus: 〜たら (Cũng có cách dùng tương tự)',
      formation: 'V-たら',
      translationVi: 'Sau khi... thì thấy / nhận ra',
      meaningVi: '「〜たら」cũng có cách dùng tương tự như「〜と」để diễn tả sau khi làm gì thì bất ngờ phát hiện, nhận ra một sự việc.',
      examples: [
        {
          ja: '屋上に上がったら、東京スカイツリーが見えた。',
          vi: 'Khi lên sân thượng thì thấy được cả tháp Tokyo Skytree.'
        },
        {
          ja: '発車のベルが鳴っているので飛び乗ったら、反対方向の電車だった。',
          vi: 'Vì chuông báo tàu chạy vang lên nên tôi vội nhảy lên, ai dè lại là tàu chạy ngược hướng.'
        },
        {
          ja: '就職試験の結果の連絡だと思って急いで電話に出たら、間違い電話だった。',
          vi: 'Cứ ngỡ là điện thoại thông báo kết quả thi tuyển việc làm nên vội vàng nghe máy, hoá ra là nhầm số.'
        }
      ]
    }
  },
  {
    id: 'try-n3-c1-g7',
    chapter: 1,
    number: 7,
    pattern: '〜ほど',
    title: '立っているのもつらいほど',
    stars: 3,
    formation: 'V-る / V-ない ＋ ほど\nN ＋ ほど',
    translationVi: 'Đến mức... / Đến độ...',
    meaningJa: '「〜ほど…」は、「歩けないほど強い風」のように、「…」の状態・程度が普通ではないことを、「〜」の例を使って表すときに使う。',
    meaningVi: 'Sử dụng khi bạn dùng một ví dụ cụ thể để nói lên trạng thái hoặc mức độ của sự việc là vô cùng cao, không bình thường.',
    usageNote: 'Cũng rất hay đi kèm với thể muốn「V-たい ＋ ほど」 (Ví dụ: 死にたいほど - mệt muốn chết, 泣きたいほど - buồn muốn khóc).',
    examples: [
      {
        ja: '富士山に登って、下りてきたときは、もう一歩も歩けないほど疲れていた。',
        vi: 'Lúc leo núi Phú Sĩ rồi xuống núi, tôi mệt đến mức không thể bước nổi thêm một bước nào.'
      },
      {
        ja: 'あの双子は両親も間違えるほどよく似ている。',
        vi: 'Cặp song sinh đó giống nhau đến độ chính bố mẹ cũng bị nhầm lẫn.'
      },
      {
        ja: '年末は、猫の手も借りたいほど忙しくなる。',
        vi: 'Dịp cuối năm bận đến mức muốn mượn cả chân mèo để đỡ việc (thành ngữ chỉ bận tối mắt tối mũi).'
      },
      {
        ja: 'ランチタイムのレストランは、目が回るほど忙しい。',
        vi: 'Nhà hàng vào giờ ăn trưa bận đến mức hoa cả mắt chóng cả mặt.'
      },
      {
        ja: '今週中にやらなければならない仕事が山ほどある。',
        vi: 'Công việc phải làm trong tuần này nhiều như núi (nhiều chất đống).'
      }
    ]
  },
  {
    id: 'try-n3-c1-g8',
    chapter: 1,
    number: 8,
    pattern: '〜ていく',
    title: 'どんどん登っていく',
    stars: 3,
    formation: 'V-て ＋ いく',
    translationVi: 'Càng ngày càng... / Tiếp diễn về tương lai / Đi ra xa',
    meaningJa: '「〜ていく」は、「歩いていく」のように、ある動作をしながら遠くへ移動するときや、「買っていく」のように、ある動作をしてから次の場所へ行くことを表すときに使う。将来に向かって続いていくことを言うときにも使う。',
    meaningVi: 'Sử dụng khi nói về sự di chuyển ngày càng ra xa, hoặc làm xong một việc rồi đi tiếp nơi khác, hoặc diễn tả một sự việc/thay đổi sẽ tiếp tục diễn tiến hướng tới tương lai.',
    examples: [
      {
        ja: '冬になると渡り鳥は南のほうへ飛んでいく。',
        vi: 'Hễ mùa đông đến là đàn chim di cư lại bay dần về phương Nam xa xôi.'
      },
      {
        ja: 'A:「もしもし、今からそっちへ行くけど、何か買っていこうか。」\nB:「じゃ、ジュース買ってきて。」',
        vi: 'A: "Alo, giờ tớ qua chỗ cậu đây, có cần tớ mua gì mang qua không?"\nB: "Thế mua nước trái cây đem lại đây nhé."'
      },
      {
        ja: 'これからも日本語の勉強を続けていくつもりです。',
        vi: 'Từ nay về sau tôi vẫn dự định tiếp tục duy trì việc học tiếng Nhật.'
      },
      {
        ja: 'これから、日本の会社でも外国人社員は増えていくと思います。',
        vi: 'Tôi nghĩ từ nay trở đi nhân viên người nước ngoài ở các công ty Nhật cũng sẽ ngày càng tăng lên.'
      }
    ],
    plusNote: {
      title: 'Plus: 〜てくる (Ngược lại với 〜ていく)',
      formation: 'V-て ＋ くる',
      translationVi: 'Tiến lại gần / Tiếp diễn từ quá khứ đến hiện tại',
      meaningVi: 'Ngược lại với「〜ていく」, dùng「〜てくる」khi một cái gì đó tiến gần tới mình, hoặc diễn tả một hành động/sự thay đổi tiếp diễn từ quá khứ đến hiện tại.',
      examples: [
        {
          ja: '申し込みのときに、身分証明書を持ってきてください。',
          vi: 'Khi đến đăng ký, xin vui lòng mang theo giấy tờ tuỳ thân lại đây.'
        },
        {
          ja: '棚から本が落ちてきて、おどろいた。',
          vi: 'Quyển sách từ trên giá rơi xuống về phía tôi làm tôi giật mình.'
        },
        {
          ja: '日本人は昔から魚を食べてきました。',
          vi: 'Người Nhật từ xưa tới nay vẫn luôn duy trì thói quen ăn cá.'
        },
        {
          ja: '私はこの町で4年間、環境調査を続けてきました。',
          vi: 'Tôi đã liên tục tiến hành điều tra môi trường ở thị trấn này suốt 4 năm qua.'
        }
      ]
    }
  },
  {
    id: 'try-n3-c1-g9',
    chapter: 1,
    number: 9,
    pattern: '〜続ける',
    title: '登り続けた',
    stars: 3,
    formation: 'V-~~ます~~ ＋ 続ける',
    translationVi: 'Tiếp tục làm V / Duy trì liên tục',
    meaningJa: '「〜続ける」は、動作をずっと続けることや、習慣としてくり返すことを強調して言うときに使う。',
    meaningVi: 'Sử dụng khi nhấn mạnh sự duy trì liên tục một hành động suốt một khoảng thời gian, hoặc lặp đi lặp lại như một thói quen.',
    examples: [
      {
        ja: 'あの人は歯医者に1年以上通い続けているそうです。',
        vi: 'Nghe nói người đó đã kiên trì đi khám nha khoa liên tục suốt hơn 1 năm nay.'
      },
      {
        ja: '犬のハチ公は、主人の帰りを待ち続けた。',
        vi: 'Chú chó Hachiko đã kiên trì chờ đợi chủ nhân trở về suốt nhiều năm ròng.'
      },
      {
        ja: 'この薬は途中でやめないで、1週間飲み続けてください。',
        vi: 'Thuốc này xin đừng bỏ dở giữa chừng mà hãy uống liên tục trong 1 tuần nhé.'
      }
    ]
  },
  {
    id: 'try-n3-c1-g10',
    chapter: 1,
    number: 10,
    pattern: '〜なら',
    title: '上まで行きたいなら',
    stars: 3,
    formation: '[ V-る(の) / N ] ＋ なら\n(※ ほしいなら / 〜たいなら)',
    translationVi: 'Nếu là... / Trong trường hợp... thì (khuyên/đề nghị)',
    meaningJa: '「〜なら、…」は、「〜の場合は」と範囲を限定して、アドバイスをしたり申し出をしたりするときに使う。',
    meaningVi: 'Giới hạn phạm vi như "trong trường hợp là ~" rồi đưa ra lời khuyên (advice), lời đề nghị hoặc sự giúp đỡ.',
    usageNote: 'Rất hay dùng với「〜たいなら」(nếu muốn làm gì) hoặc「ほしいなら」(nếu muốn có gì). Vế sau thường là lời khuyên, đề nghị (〜ほうがいい, 〜はいかがですか, 〜しましょうか).',
    examples: [
      {
        ja: '台湾へ旅行に行くなら、11月がいちばんいいと思いますよ。',
        vi: 'Nếu đi du lịch Đài Loan thì tôi nghĩ tháng 11 là tuyệt vời nhất đấy.'
      },
      {
        ja: 'A:「論文を書くので、いろいろ調べなければならないんです。」\nB:「論文の資料なら、国会図書館にたくさんありますよ。」',
        vi: 'A: "Vì đang viết luận văn nên tôi phải tra cứu rất nhiều tài liệu."\nB: "Nếu là tài liệu luận văn thì ở thư viện Quốc hội có nhiều lắm đấy."'
      },
      {
        ja: 'A:「今度アメリカへ行くんです。」\nB:「それなら、大きいかばんを貸しましょうか。」',
        vi: 'A: "Sắp tới tớ đi Mỹ đấy."\nB: "Nếu thế thì để tớ cho mượn cái vali to nhé?"'
      },
      {
        ja: 'N3に合格したいなら、この本をよく勉強したほうがいいよ。',
        vi: 'Nếu muốn đỗ N3 thì bạn nên chăm chỉ học thật kỹ cuốn sách này.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g11',
    chapter: 2,
    number: 11,
    pattern: '〜って',
    title: 'クロって名前',
    stars: 1,
    formation: 'N1 ＋ って ＋ N2',
    translationVi: 'Tên là... / Mang tên là...',
    meaningJa: '「〜って」は、名前を表す「〜という」のかわりに使う。会話でよく使われる親しいくだけた表現。',
    meaningVi: 'Sử dụng thay cho「〜という」để nói tên của người hoặc vật, sự việc nào đó. Là cách nói thân mật hay dùng trong hội thoại hàng ngày.',
    examples: [
      {
        ja: 'さっき、上田さんって人が訪ねてきましたよ。お知り合いですか。',
        vi: 'Vừa nãy có người tên là Ueda đến tìm gặp đấy. Có phải người quen của bạn không?'
      },
      {
        ja: '花粉症って病気、アレルギーが原因なんだよね。',
        vi: 'Căn bệnh gọi là dị ứng phấn hoa (Kafunsho), nguyên nhân là do dị ứng nhỉ.'
      },
      {
        ja: 'A:「長野県の戸隠ってところ、知ってる？」\nB:「うん。最近人気だって聞いたよ。」',
        vi: 'A: "Cậu có biết địa danh tên là Togakushi ở tỉnh Nagano không?"\nB: "Có chứ. Gần đây tớ nghe nói nơi đó nổi tiếng lắm."'
      }
    ]
  },
  {
    id: 'try-n3-c2-g12',
    chapter: 2,
    number: 12,
    pattern: '〜させてもらう / させてくれる',
    title: '飼わせてもらった',
    stars: 3,
    formation: 'V-させる て ＋ もらう / くれる\n(※ 使役 chia て: させて)',
    translationVi: 'Được (ai đó) cho phép làm gì / Cho phép tôi làm gì',
    meaningJa: '「〜させてもらう」は、自分がすることのためにほかの人の許可を取るときに使う。許可してくれたことに感謝するときにも使う。「〜させてくれる」の形もよく使われる。',
    meaningVi: 'Sử dụng khi xin phép người khác cho mình làm việc gì đó, hoặc bày tỏ lòng biết ơn khi người ta đã cho phép mình làm. Thể「〜させてくれる」cũng rất hay dùng.',
    examples: [
      {
        ja: 'この会社は自分の意見を自由に言わせてくれる。',
        vi: 'Công ty này luôn cho phép nhân viên tự do nói lên ý kiến của bản thân.'
      },
      {
        ja: '高校生のとき、アルバイトをしたいと父に言ったが、させてもらえなかった。',
        vi: 'Hồi học cấp 3, tôi xin bố cho đi làm thêm nhưng bố không cho phép.'
      },
      {
        ja: '上司は何事も経験だと言って、私を海外研修に行かせてくれた。',
        vi: 'Cấp trên nói việc gì cũng là trải nghiệm quý giá nên đã tạo điều kiện cho tôi đi tu nghiệp nước ngoài.'
      },
      {
        ja: 'ここに荷物を置かせてもらってもいいですか。',
        vi: 'Tôi có thể xin phép đặt hành lý ở đây được không ạ?'
      }
    ]
  },
  {
    id: 'try-n3-c2-g13',
    chapter: 2,
    number: 13,
    pattern: '〜させられる',
    title: '約束させられた',
    stars: 2,
    formation: 'V-させられる\n(※ 使役受身: Bị sai khiến)',
    translationVi: 'Bị (ai đó) bắt phải làm gì',
    meaningJa: '「〜させられる」は、自分がしたくないと思っていることを、他人からするように言われて、しなければならないときに使う。',
    meaningVi: 'Sử dụng khi bị người khác ép buộc, sai khiến làm việc mà bản thân không muốn làm nhưng bắt buộc phải làm.',
    usageNote: 'Quy tắc chia Thể bị sai khiến (使役受身):\n・Nhóm I: 飲む ➔ 飲まされる / 飲ませられる, 走る ➔ 走らされる. Riêng âm「す」luôn là「させられる」: 話す ➔ 話させられる.\n・Nhóm II: 食べる ➔ 食べさせられる.\n・Nhóm III: 来る ➔ 来させられる, する ➔ させられる.',
    examples: [
      {
        ja: '子どものときテストの成績が悪いと、父にトイレそうじをさせられた。',
        vi: 'Hồi bé hễ điểm thi kém là tôi lại bị bố bắt dọn dẹp nhà vệ sinh.'
      },
      {
        ja: '中学生のとき、先生にグラウンドを何周も走らされた。',
        vi: 'Hồi học cấp 2, tôi bị thầy giáo bắt phạt chạy quanh sân vận động bao nhiêu vòng.'
      },
      {
        ja: '学生のとき、いつも先輩に飲み物を買いに行かされた。',
        vi: 'Thời sinh viên, tôi luôn bị các đàn anh bắt chạy đi mua đồ uống.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g14',
    chapter: 2,
    number: 14,
    pattern: '〜がる',
    title: '散歩に行きたがって',
    stars: 2,
    formation: '[ いA~~い~~ / なA / V-~~ます~~ た~~い~~ ] ＋ がる',
    translationVi: 'Có vẻ muốn / Thấy có vẻ / Biểu lộ ra là muốn làm gì (ngôi thứ 3)',
    meaningJa: '「〜がる」は、その人の気持ちなどが様子や言葉に表れているときに使う。自分の気持ちを言うときは使わないのが普通。',
    meaningVi: 'Sử dụng khi cảm xúc, mong muốn của người khác (hoặc động vật) thể hiện rõ ràng qua nét mặt, cử chỉ, lời nói. Thông thường không dùng cho cảm xúc của chính mình.',
    examples: [
      {
        ja: '彼は試合に負けてくやしがっている。',
        vi: 'Anh ấy thua trận đấu nên nét mặt lộ rõ vẻ ấm ức, tiếc nuối.'
      },
      {
        ja: 'わからない言葉があったら、面倒がらないですぐに調べなさい。',
        vi: 'Nếu có từ vựng không hiểu thì đừng có ngại phiền hà mà hãy tra cứu ngay đi.'
      },
      {
        ja: '妹は車をほしがっているが、父は絶対許さないと言っている。',
        vi: 'Em gái tôi đang rất muốn có xe hơi, nhưng bố kiên quyết nói không cho.'
      },
      {
        ja: '田中さんは人気スターのファッションを何でも真似したがる。',
        vi: 'Anh Tanaka chuyện gì cũng thích bắt chước theo phong cách của ngôi sao nổi tiếng.'
      },
      {
        ja: '寒い日は猫も外へ出たがらない。',
        vi: 'Những ngày trời rét thì loài mèo cũng chẳng hề muốn ra ngoài.'
      }
    ],
    plusNote: {
      title: 'Plus: Danh từ tính cách 〜がり (暑がり・寒がり・こわがり)',
      formation: '[ いA~~い~~ / なA ] ＋ がり',
      translationVi: 'Người hay sợ... / Người nhạy cảm với... (sợ rét, sợ nóng, nhát gan)',
      meaningVi: 'Biến đổi thành danh từ chỉ người thường xuyên có cảm giác hoặc có tính cách đó (ví dụ: 寒がり là người rất sợ lạnh/chịu rét kém, 暑がり là người sợ nóng, こわがり là người nhát gan).',
      examples: [
        {
          ja: '私は寒がりだから、冬が苦手だ。',
          vi: 'Vì tôi là người rất sợ lạnh nên cực kỳ ghét mùa đông.'
        }
      ]
    }
  },
  {
    id: 'try-n3-c2-g15',
    chapter: 2,
    number: 15,
    pattern: '〜たとたん',
    title: '玄関を出たとたん',
    stars: 3,
    formation: 'V-た ＋ とたん (に)',
    translationVi: 'Ngay vừa khi... thì lập tức / Vừa mới... một cái là...',
    meaningJa: '「〜たとたん…」は、「〜」のあとすぐ「…」が起こったという状況を説明するときに使う。',
    meaningVi: 'Sử dụng khi giải thích tình huống rằng sự việc sau xảy ra ngay tức thì sau khi vừa làm sự việc trước.',
    usageNote: 'Lưu ý: Vế sau mang tính bất ngờ, biến đổi khách quan. KHÔNG dùng vế sau là câu dự định hay ý chí của người nói (Không nói: 学校を出たとたん、走るつもりだ ❌).',
    examples: [
      {
        ja: '立ち上がったとたん、目の前が暗くなった。',
        vi: 'Vừa mới đứng phắt dậy một cái là hoa mắt tối sầm mặt lại.'
      },
      {
        ja: '彼女はさっきまで元気がなかったのに、ご飯を食べたとたん元気になった。',
        vi: 'Cô ấy nãy còn ủ rũ thế mà vừa ăn cơm xong cái là tươi tỉnh hẳn lên ngay.'
      },
      {
        ja: '彼は、相手が社長だと知ったとたん、急にていねいに話し始めた。',
        vi: 'Anh ta vừa mới biết đối phương là giám đốc một cái là ngay lập tức đổi giọng nói năng cực kỳ lễ phép.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g16',
    chapter: 2,
    number: 16,
    pattern: '〜出す',
    title: '全速力で走り出す',
    stars: 2,
    formation: 'V-~~ます~~ ＋ 出す',
    translationVi: 'Đột nhiên bắt đầu làm gì / Bất thình lình bộc phát...',
    meaningJa: '「〜出す」は、何かが急に起きたときや、急に始まったと言うときに使われる。',
    meaningVi: 'Sử dụng khi một hành động hoặc sự việc đột nhiên xảy ra, bất thình lình bắt đầu diễn ra một cách nhanh chóng.',
    examples: [
      {
        ja: 'さっきまで笑っていた赤ちゃんが急に泣き出した。',
        vi: 'Em bé nãy còn cười đùa thế mà bỗng nhiên bật khóc nức nở.'
      },
      {
        ja: '突然大雨が降り出し、人々はあわてて建物の中に入った。',
        vi: 'Trời bất chợt đổ mưa rào khiến mọi người nháo nhào chạy vào trong toà nhà trú mưa.'
      },
      {
        ja: '彼は短気で急に怒り出すから、付き合いにくい。',
        vi: 'Anh ta tính tình nóng nảy bất thình lình nổi cơn lôi đình nên rất khó chơi cùng.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g17',
    chapter: 2,
    number: 17,
    pattern: '〜ようとする',
    title: '帰ろうとする',
    stars: 3,
    formation: 'V-よう ＋ とする\nV-よう ＋ としない',
    translationVi: 'Định làm gì / Nhất quyết không chịu làm gì',
    meaningJa: '「〜ようとする」は、今から〜しようと思う、〜しようとがんばっていると言いたいときに使う。「〜ようとしない」は相手が〜しないことを批判する気持ちを表す。',
    meaningVi: '「〜ようとする」sử dụng khi muốn nói rằng bạn đang cố gắng hết sức để làm gì đó hoặc bây giờ tính làm gì đó.\n「〜ようとしない」bộc lộ cảm xúc chỉ trích, phàn nàn khi ai đó không chịu làm gì đó.',
    usageNote: 'V-よう là thể ý chí (意向形). Dạng phủ định「〜ようとしない」thường dùng cho ngôi thứ 3 (người khác hoặc động vật) để phàn nàn.',
    examples: [
      {
        ja: '小さい子どもが道を渡ろうとしているよ。一人でどこへ行くのかな。',
        vi: 'Đứa bé con đang định băng qua đường kìa. Không biết nó đi đâu một mình thế nhỉ?'
      },
      {
        ja: '生まれたばかりの馬の赤ちゃんが、一生けんめい立とうとしている。',
        vi: 'Chú ngựa con vừa mới sinh đang gắng hết sức để gượng đứng dậy.'
      },
      {
        ja: '昔の友だちの名前を思い出そうとしたが、どうしても思い出せない。',
        vi: 'Tôi đã cố gắng nhớ lại tên người bạn cũ nhưng dù thế nào cũng không thể nhớ ra.'
      },
      {
        ja: 'リンさんは試験が近いのに、ぜんぜん勉強しようとしない。',
        vi: 'Lin sắp thi đến nơi rồi mà chẳng chịu học hành gì cả.'
      }
    ],
    plusNote: {
      title: 'Plus: V-ようとしたら (Vừa định... thì bất ngờ...)',
      formation: 'V-よう ＋ としたら / とき',
      translationVi: 'Vừa định làm gì thì (bất ngờ xảy ra việc khác)',
      meaningVi: 'Cũng sử dụng khi điều gì đó không ngờ tới đã xảy ra ngay trước khi bạn làm một động tác gì đó.',
      examples: [
        {
          ja: '出かけようとしたら雨が降ってきた。',
          vi: 'Vừa định bước chân ra ngoài thì trời đổ cơn mưa.'
        }
      ]
    }
  },
  {
    id: 'try-n3-c2-g18',
    chapter: 2,
    number: 18,
    pattern: '〜ことがある / こともある',
    title: 'コンビニに寄ることもある',
    stars: 3,
    formation: 'V-る / V-ない ＋ ことがある\nV-る / V-ない ＋ こともある',
    translationVi: 'Thỉnh thoảng / Đôi khi có lúc làm gì',
    meaningJa: '「〜ことがある」は、ときどき、またはたまに〜すると言うときに使う。',
    meaningVi: 'Sử dụng khi nói rằng thỉnh thoảng, đôi khi làm chuyện gì đó. Khi nhấn mạnh có thể dùng「〜こともある」.',
    examples: [
      {
        ja: 'この地方では4月でも雪が降ることがある。',
        vi: 'Ở vùng này ngay cả tháng 4 thỉnh thoảng cũng có tuyết rơi.'
      },
      {
        ja: '私の大学は横浜にもキャンパスがあって、ときどきそちらに行かなければならないことがあるんです。',
        vi: 'Trường đại học của tôi có cơ sở ở cả Yokohama, nên thỉnh thoảng cũng có lúc tôi phải đến đó.'
      },
      {
        ja: 'ふだんはよく寝られるんですが、ストレスがたまって眠れないこともあります。',
        vi: 'Bình thường tôi ngủ rất ngon, nhưng khi bị stress dồn nén thì cũng có lúc mất ngủ.'
      },
      {
        ja: 'あの店の営業時間は5時までですが、昼過ぎに全部売れてしまうこともあります。',
        vi: 'Giờ mở cửa của cửa hàng đó là đến 5 giờ, nhưng thỉnh thoảng cũng có khi vừa quá trưa đã bán hết sạch.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g19',
    chapter: 2,
    number: 19,
    pattern: '〜させておく',
    title: '待たせておいて',
    stars: 1,
    formation: 'V-させ~~る~~ て ＋ おく',
    translationVi: 'Cứ để mặc cho làm gì / Để yên như thế',
    meaningJa: '「〜させておく」は、相手に「〜」の動作をずっと続けるよう指示することを表す。また、相手の行動を変えさせたりやめさせたりしないで、そのままにしておくことを表すこともある。自分より下の人や動物に使うことが多い。',
    meaningVi: 'Chỉ thị ai đó cứ tiếp tục hành động "~". Cũng có khi sử dụng để nói là cứ để nguyên như thế mà không làm thay đổi hoặc buộc phải dừng lại hành động của ai đó. Thường sử dụng cho động vật hoặc những người dưới mình.',
    examples: [
      {
        ja: '夏に車の中で子どもを待たせておくのは危険ですよ。',
        vi: 'Vào mùa hè mà cứ để trẻ con ngồi chờ trong xe ô tô là nguy hiểm lắm đấy.'
      },
      {
        ja: '家事をしている間、子どもをおもちゃで遊ばせておく。',
        vi: 'Trong lúc làm việc nhà, tôi để cho con chơi với đồ chơi.'
      },
      {
        ja: '息子は何を言っても聞かないので、自分のしたいことを勝手にさせておくことにした。',
        vi: 'Con trai nói gì cũng không nghe nên tôi quyết định cứ để mặc nó tự do làm những gì nó muốn.'
      }
    ]
  },
  {
    id: 'try-n3-c2-g20',
    chapter: 2,
    number: 20,
    pattern: '〜られてしまう',
    title: '顔中なめられてしまう',
    stars: 3,
    formation: 'V-られ~~る~~ て ＋ しまう',
    translationVi: 'Bị (ai đó làm phiền, chịu thiệt hại đáng tiếc)',
    meaningJa: '「〜られてしまう」は、ほかの人がしたことを迷惑だ、残念だと思うときに使う。',
    meaningVi: 'Sử dụng khi bạn cảm thấy việc người khác làm thật khó chịu, phiền phức hoặc thật đáng tiếc (thể bị động bị hại).',
    examples: [
      {
        ja: '片思いの彼を映画に誘ったが、断られてしまった。',
        vi: 'Tôi rủ chàng trai mình thầm thương đi xem phim nhưng đã bị anh ấy từ chối mất rồi.'
      },
      {
        ja: 'あとで食べようと思っていたケーキを妹に食べられてしまった。',
        vi: 'Miếng bánh ngọt tôi định để lát ăn thì đã bị em gái ăn mất tiêu.'
      },
      {
        ja: 'ハイキングをしていたら、はちに刺されてしまった。',
        vi: 'Đang đi leo núi dã ngoại thì bị ong đốt.'
      },
      {
        ja: '言葉が足りないと、誤解されてしまうことがある。',
        vi: 'Nếu diễn đạt không đủ lời thì đôi khi sẽ bị hiểu lầm.'
      }
    ]
  }
];

// Flashcard items for Chapter 1
const chapter1FlashcardItems: StudyItem[] = [
  {
    id: 'try-n3-c1-fc-1',
    term: '〜始める',
    reading: 'V-~~ます~~ ＋ はじめる',
    answer: 'Bắt đầu làm gì (cần thời gian)',
    meaning: 'Bắt đầu làm một hành động cần có thời gian',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ 始める\n(Động từ chia thể ます, gạch ~~ます~~ rồi ghép với「始める」)\nVí dụ: 登り~~ます~~ ➔ 登り始めた (bắt đầu leo núi).\n★ Sử dụng khi bạn nói rõ về sự bắt đầu của một việc làm gì đó mà cần có thời gian.',
    example: '① 日本語を習い始めたのは半年前です。(Tôi bắt đầu học tiếng Nhật là từ nửa năm trước: 習い~~ます~~ ➔ 習い始める).\n② 桜の花が咲き始めましたね。(Hoa anh đào đã bắt đầu nở rộ rồi nhỉ: 咲き~~ます~~ ➔ 咲き始める).'
  },
  {
    id: 'try-n3-c1-fc-2',
    term: '〜終わる',
    reading: 'V-~~ます~~ ＋ おわる',
    answer: 'Làm xong / kết thúc việc gì',
    meaning: 'Kết thúc, hoàn thành trọn vẹn một hành động',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ 終わる\n(Động từ chia thể ます, gạch ~~ます~~ rồi ghép với「終わる」)\nVí dụ: 読み~~ます~~ ➔ 読み終わったら (sau khi đọc xong).\n★ Sử dụng khi nói rõ về sự kết thúc, hoàn tất của một việc gì đó.',
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
    explanation: '★ Cấu trúc: Pl + だろうと思う\n★ Lưu ý trong sách: Tính từ đuôi な và Danh từ gạch bỏ chữ「だ」(なA~~だ~~ / N~~だ~~ ➔ なAだろう / Nだろう).\nVí dụ: 大丈夫~~だ~~ ➔ 大丈夫だろう (大丈夫だろうと思った).',
    example: '① たぶんこの雨は1時間ぐらいでやむだろうと思います。(Tôi nghĩ có lẽ 1 tiếng nữa mưa sẽ tạnh.)\n② 外国で一人暮らしをするのはきっとさびしいだろうと思う。(Tôi nghĩ sống một mình ở nước ngoài chắc chắn là cô đơn lắm.)'
  },
  {
    id: 'try-n3-c1-fc-6',
    term: '〜なさそうだ',
    reading: 'いA~~い~~ ＋ くなさそうだ / なA・N ＋ じゃなさそうだ',
    answer: 'Trông có vẻ không...',
    meaning: 'Nhìn trực tiếp hoặc cảm nhận rồi phán đoán rằng không...',
    explanation: '★ Quy tắc biến đổi chuẩn TRY! N3:\n・Tính từ đuôi い: いA~~い~~ ➔ くなさそうだ (辛~~い~~ ➔ 辛くなさそう)\n・Tính từ đuôi な: なA ＋ じゃなさそうだ (大変 ➔ 大変じゃなさそう)\n・Danh từ: N ＋ じゃなさそうだ (日本人 ➔ 日本人じゃなさそう)\n★ Trong bài: それほど大変じゃなさそうだった (Trông có vẻ không đến mức quá vất vả).',
    example: '① このカレーはあまり辛くなさそうですね。(Món cà ri này trông không cay lắm nhỉ.)\n② この仕事はそんなに大変じゃなさそうだ。(Công việc này trông không vất vả đến thế đâu.)'
  },
  {
    id: 'try-n3-c1-fc-7',
    term: '〜そうもない / そうにない',
    reading: 'V-~~ます~~ ＋ そうもない / そうにない',
    answer: 'Khó lòng mà... / Trông khó có thể...',
    meaning: 'Dùng cho ĐỘNG TỪ để diễn tả một việc khó lòng mà xảy ra được',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ そうもない / そうにない\n(Động từ chia ở thể ます, gạch ~~ます~~).\nVí dụ: 読め~~ます~~ ➔ 読めそうもない, 入り~~ます~~ ➔ 入りそうにない.\n★ Dành cho ĐỘNG TỪ khi muốn diễn tả việc khó lòng mà xảy ra được (KHÔNG dùng V-なさそうだ).',
    example: '① こんな難しそうな本、１週間では読めそうもない。(Sách khó thế này trong 1 tuần khó lòng mà đọc xong: 読め~~ます~~ ➔ 読めそうもない).\n② 荷物が多くて、かばんに全部入りそうにない。(Hành lý nhiều quá, trông khó lòng nhét hết vào túi: 入り~~ます~~ ➔ 入りそうにない).'
  },
  {
    id: 'try-n3-c1-fc-8',
    term: '〜と',
    reading: 'V-る ＋ と',
    answer: 'Vừa mới... thì nhận ra / Khi... thì thấy',
    meaning: 'Nhận ra một điều trước đó chưa biết (thường là điều bất ngờ, ngạc nhiên)',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-る ＋ と\n★ Sử dụng khi bạn nhận ra điều mà trước đó mình không nhận ra. Thường dùng cho điều bất ngờ và vế sau thường ở thì quá khứ (đã nhận ra).\n★ Trong bài đọc: 登ってみると、本当に大変だった (Khi thử leo lên thì thấy thật sự rất vất vả).',
    example: '① 気がつくと、外はすっかり暗くなっていた。(Khi nhận ra thì trời ngoài đã tối om rồi).\n② 待ち合わせの場所に着くと、友だちはもう来ていた。(Khi đến chỗ hẹn thì bạn tôi đã đến rồi).'
  },
  {
    id: 'try-n3-c1-fc-9',
    term: '〜たら',
    reading: 'V-たら',
    answer: 'Sau khi... thì thấy / nhận ra',
    meaning: 'Sau khi làm gì thì bất ngờ phát hiện, nhận ra một điều mới (Plus của 〜と)',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-たら\n★「〜たら」cũng có cách dùng tương tự như「〜と」để diễn tả sau khi làm gì thì bất ngờ phát hiện, nhận ra một sự việc.\n★ Trong bài: あとで聞いたら、リンさんも途中でやめようと思った (Sau này hỏi ra mới biết, Lin cũng từng tính bỏ cuộc).',
    example: '① 屋上に上がったら、東京スカイツリーが見えた。(Khi lên sân thượng thì thấy được tháp Skytree).\n② 就職試験の結果の連絡だと思って急いで電話に出たら、間違い電話だった。(Vội nghe máy thì hoá ra là nhầm số).'
  },
  {
    id: 'try-n3-c1-fc-10',
    term: '〜ほど',
    reading: '[V-る / V-ない / N] ＋ ほど (hoặc V-たい)',
    answer: 'Đến mức... / Đến độ...',
    meaning: 'Đưa ra ví dụ cụ thể để biểu thị mức độ, trạng thái cao bất thường',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: [V-る / V-ない / N] ＋ ほど (hoặc V-たい ＋ ほど)\n★ Sử dụng khi bạn dùng một ví dụ cụ thể để nói lên trạng thái hoặc mức độ của sự việc là vô cùng cao, không bình thường.\n★ Trong bài: 途中で立っているのもつらいほど足が重くなった (Chân nặng trĩu đến mức chỉ đứng thôi cũng thấy khổ sở).',
    example: '① もう一歩も歩けないほど疲れていた。(Mệt đến mức không bước nổi một bước nào).\n② あの双子は両親も間違えるほどよく似ている。(Cặp sinh đôi giống nhau đến độ bố mẹ cũng nhầm).'
  },
  {
    id: 'try-n3-c1-fc-11',
    term: '〜ていく',
    reading: 'V-て ＋ いく',
    answer: 'Càng ngày càng... / Tiếp diễn về tương lai / Đi ra xa',
    meaning: 'Di chuyển ngày càng ra xa, hoặc hành động tiếp diễn hướng tới tương lai',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-て ＋ いく\n★ Di chuyển ra xa hoặc diễn tả một sự việc, thay đổi tiếp tục phát triển hướng tới tương lai.\n★ Trong bài: どんどん登っていくリンさんが見えた (Nhìn thấy Lin cứ thoăn thoắt leo tiếp lên phía xa).',
    example: '① 冬になると渡り鳥は南のほうへ飛んでいく。(Mùa đông chim di cư lại bay về phương Nam).\n② これからも日本語の勉強を続けていくつもりです。(Từ nay về sau tôi vẫn sẽ tiếp tục học tiếng Nhật).'
  },
  {
    id: 'try-n3-c1-fc-12',
    term: '〜てくる',
    reading: 'V-て ＋ くる',
    answer: 'Tiến lại gần / Tiếp diễn từ quá khứ đến hiện tại',
    meaning: 'Di chuyển tiến lại gần mình, hoặc hành động tiếp diễn từ quá khứ đến hiện tại (Plus của 〜ていく)',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-て ＋ くる\n★ Ngược lại với「〜ていく」, dùng「〜てくる」khi một cái gì đó tiến gần tới mình, hoặc thay đổi tiếp diễn từ quá khứ đến hiện tại.\n★ Trong bài: 私が後ろから登ってくるのが見えた (Thấy tôi đang từ phía sau leo tiến lại gần).',
    example: '① 日本人は昔から魚を食べてきました。(Người Nhật từ xưa tới nay vẫn duy trì ăn cá).\n② 私はこの町で4年間、環境調査を続けてきました。(Tôi đã liên tục điều tra môi trường ở đây suốt 4 năm qua).'
  },
  {
    id: 'try-n3-c1-fc-13',
    term: '〜続ける',
    reading: 'V-~~ます~~ ＋ つづける',
    answer: 'Tiếp tục làm V / Duy trì liên tục',
    meaning: 'Duy trì liên tục một hành động hoặc lặp đi lặp lại như một thói quen',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-~~ます~~ ＋ 続ける\n(Động từ chia thể ます, gạch ~~ます~~ rồi ghép với「続ける」)\n★ Nhấn mạnh sự duy trì liên tục một hành động suốt một khoảng thời gian hoặc thói quen lặp lại.\n★ Trong bài: あきらめるのはくやしいから、私も登り続けた (Nếu bỏ cuộc thì ấm ức lắm nên tôi cũng tiếp tục leo).',
    example: '① あの人は歯医者に1年以上通い続けているそうです。(Người đó kiên trì đi nha khoa hơn 1 năm nay).\n② 犬のハチ公は、主人の帰りを待ち続けた。(Chú chó Hachiko đã kiên trì đợi chủ suốt nhiều năm).'
  },
  {
    id: 'try-n3-c1-fc-14',
    term: '〜なら',
    reading: '[V-る(の) / N] ＋ なら (hoặc ほしいなら / 〜たいなら)',
    answer: 'Nếu là... / Trong trường hợp... thì (khuyên/đề nghị)',
    meaning: 'Giới hạn phạm vi trường hợp để đưa ra lời khuyên, đề xuất hoặc gợi ý',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: [V-る(の) / N] ＋ なら\n(Thường dùng ほしいなら / 〜たいなら)\n★ Giới hạn phạm vi như "trong trường hợp là ~" rồi đưa ra lời khuyên, đề nghị.\n★ Trong bài: 上まで行きたいなら、友だちと一緒に行くことをおすすめしたい (Nếu muốn lên tận đỉnh núi thì tôi khuyên nên đi cùng bạn bè).',
    example: '① 台湾へ旅行に行くなら、11月がいちばんいいと思いますよ。(Nếu đi Đài Loan thì tháng 11 là tuyệt nhất).\n② N3に合格したいなら、この本をよく勉強したほうがいいよ。(Nếu muốn đỗ N3 thì nên học kỹ sách này).'
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

// Exercises for Chapter 1 Part 2 (Pages 23-26)
export const chapter1Part2ExerciseItems: StudyItem[] = [
  {
    id: 'try-n3-c1-p2-q-1',
    question: '冷蔵庫を開けると（＿＿＿＿＿＿）。',
    answer: 'ケーキがあった',
    choices: ['ケーキがあった', 'ケーキを買ってきた', 'ケーキを食べた', 'ケーキを作ろう'],
    explanation: 'Theo sách TRY! N3 trang 23: Cấu trúc V-ると dùng khi mở tủ lạnh ra thì phát hiện/nhận ra sự việc bất ngờ (có bánh kem bên trong) ➔ ケーキがあった.'
  },
  {
    id: 'try-n3-c1-p2-q-2',
    question: '日曜日、目が覚めると（＿＿＿＿＿＿）。',
    answer: '12時だった',
    choices: ['12時だった', '12時に起きた', '12時になる', '12時だそうだ'],
    explanation: 'Theo sách TRY! N3 trang 23: Vừa mở mắt tỉnh giấc thì nhận ra sự việc bất ngờ là đã 12 giờ trưa rồi ➔ 12時だった.'
  },
  {
    id: 'try-n3-c1-p2-q-3',
    question: '窓を開けると（＿＿＿＿＿＿）。',
    answer: '雪が降っていた',
    choices: ['雪が降っていた', '雪が降った', '雪が降るだろう', '雪が降るなら'],
    explanation: 'Theo sách TRY! N3 trang 23: Mở cửa sổ ra thì phát hiện trạng thái tuyết đang rơi bên ngoài ➔ 雪が降っていた.'
  },
  {
    id: 'try-n3-c1-p2-q-4',
    question: '昨日見学した工場は＿＿＿＿＿＿ほどうるさかった。',
    answer: '説明が聞こえない',
    choices: ['説明が聞こえない', 'おなかが痛くなる', '専門家でも答えられない', '立っているのもつらい'],
    explanation: 'Theo sách TRY! N3 trang 24: Nhà máy đi tham quan ồn ào đến mức không nghe thấy cả lời giải thích ➔ 説明が聞こえない.'
  },
  {
    id: 'try-n3-c1-p2-q-5',
    question: 'コメディー映画を見て、＿＿＿＿＿＿ほど笑った。',
    answer: 'おなかが痛くなる',
    choices: ['おなかが痛くなる', '説明が聞こえない', '専門家でも答えられない', '歩けない'],
    explanation: 'Theo sách TRY! N3 trang 24: Xem phim hài rồi cười đến mức đau cả bụng ➔ おなかが痛くなる.'
  },
  {
    id: 'try-n3-c1-p2-q-6',
    question: 'これは＿＿＿＿＿＿ほど難しい問題だ。',
    answer: '専門家でも答えられない',
    choices: ['専門家でも答えられない', 'おなかが痛くなる', '説明が聞こえない', '目が回る'],
    explanation: 'Theo sách TRY! N3 trang 24: Vấn đề khó đến mức ngay cả chuyên gia cũng không trả lời nổi ➔ 専門家でも答えられない.'
  },
  {
    id: 'try-n3-c1-p2-q-7',
    question: 'この会社で30年がんばって働いて＿＿＿＿＿が、今日でこの仕事も終わりだ。',
    answer: 'きた',
    choices: ['きた', 'いった', 'いく', 'こない'],
    explanation: 'Theo sách TRY! N3 trang 24: Làm việc nỗ lực suốt 30 năm kéo dài từ quá khứ đến hiện tại ➔ V-て + きた (働いてきた).'
  },
  {
    id: 'try-n3-c1-p2-q-8',
    question: '来週のパーティーにどのくつをはいて＿＿＿＿＿いいと思う？',
    answer: 'いったら',
    choices: ['いったら', 'きたら', 'くるなら', 'いくと'],
    explanation: 'Theo sách TRY! N3 trang 24: Đi giày di chuyển từ chỗ mình đến bữa tiệc trong tương lai tuần sau ➔ V-て + いったら (はいていったら).'
  },
  {
    id: 'try-n3-c1-p2-q-9',
    question: '私たちの力で伝統文化を守って＿＿＿＿＿と思っています。',
    answer: 'いこう',
    choices: ['いこう', 'こよう', 'きた', 'いくと'],
    explanation: 'Theo sách TRY! N3 trang 24: Tiếp tục bảo tồn văn hoá truyền thống tiếp diễn hướng tới tương lai ➔ 守っていこう (thể ý chí của 〜ていく).'
  },
  {
    id: 'try-n3-c1-p2-q-10',
    question: 'マラソンが好きなので、何歳になっても＿＿＿＿＿＿続けるつもりです。',
    answer: '走り',
    choices: ['走り', '守り', '見', '働き'],
    explanation: 'Theo sách TRY! N3 trang 25: Vì thích marathon nên dù bao nhiêu tuổi tôi vẫn dự định tiếp tục chạy ➔ 走り続ける.'
  },
  {
    id: 'try-n3-c1-p2-q-11',
    question: 'あのレストランは、伝統の味を＿＿＿＿＿＿続けている。',
    answer: '守り',
    choices: ['守り', '走り', '見', '働き'],
    explanation: 'Theo sách TRY! N3 trang 25: Nhà hàng đó vẫn tiếp tục gìn giữ hương vị truyền thống ➔ 守り続けている.'
  },
  {
    id: 'try-n3-c1-p2-q-12',
    question: 'パソコンの画面を＿＿＿＿＿＿続けていたら、目が痛くなった。',
    answer: '見',
    choices: ['見', '走り', '守り', '働き'],
    explanation: 'Theo sách TRY! N3 trang 25: Cứ dán mắt nhìn liên tục vào màn hình máy tính thì bị đau mắt ➔ 見続けていたら.'
  },
  {
    id: 'try-n3-c1-p2-q-13',
    question: '長い時間＿＿＿＿＿＿続けるより、少し休んだほうがいい仕事ができますよ。',
    answer: '働き',
    choices: ['働き', '見', '走り', '守り'],
    explanation: 'Theo sách TRY! N3 trang 25: Thay vì làm việc liên tục suốt thời gian dài, nghỉ ngơi một chút sẽ hiệu quả hơn ➔ 働き続けるより.'
  },
  {
    id: 'try-n3-c1-p2-q-14',
    question: 'A:「明日から出張で北海道に行ってきます。」\nB:「北海道へ＿＿＿＿＿＿、コートを持っていったほうがいいよ。4月でもまだ寒いから。」',
    answer: '行くなら',
    choices: ['行くなら', '行ったら', '行くと', '行けば'],
    explanation: 'Theo sách TRY! N3 trang 25: Đưa ra lời khuyên cho hành động sắp tới "nếu đi Hokkaido thì..." ➔ dùng 行くなら.'
  },
  {
    id: 'try-n3-c1-p2-q-15',
    question: 'A:「新しいゲームソフトがほしいんですが…。」\nB:「ゲームソフトを＿＿＿＿＿＿、駅前の店が安いですよ。」',
    answer: '買うなら',
    choices: ['買うなら', '買えば', '買ったら', '買うと'],
    explanation: 'Theo sách TRY! N3 trang 26: Giới hạn phạm vi và đưa ra lời khuyên "nếu định mua game thì..." ➔ 買うなら.'
  },
  {
    id: 'try-n3-c1-p2-q-16',
    question: 'このボタンを＿＿＿＿＿＿、お茶が出ます。',
    answer: '押すと',
    choices: ['押すと', '押すなら', '押したら', '押せば'],
    explanation: 'Theo sách TRY! N3 trang 26: Diễn tả quy luật máy móc tự nhiên (hễ ấn nút là trà chảy ra) ➔ 押すと (không dùng なら vì không phải lời khuyên).'
  },
  {
    id: 'try-n3-c1-p2-q-17',
    question: '＿＿＿＿＿＿、次の電車に乗れますよ。',
    answer: '急げば',
    choices: ['急げば', '急ぐなら', '急ぐと', '急ぎ続ける'],
    explanation: 'Theo sách TRY! N3 trang 26: Diễn tả điều kiện giả định (nếu nhanh chân thì kịp chuyến tàu) ➔ dùng thể điều kiện 急げば.'
  }
];

// Check 2 items from page 25 (Check 📖 Phần 2 - 6 questions)
export const chapter1Part2CheckItems: StudyItem[] = [
  {
    id: 'try-n3-c1-p2-chk-1',
    question: '1000円しか当たったことがないんですが、これからも宝くじを＿＿＿＿＿＿つもりです。',
    answer: '買い続ける',
    choices: ['買い続ける', '買ってくる', '買っていく', '買ったなら'],
    explanation: 'Theo bài Check trang 25: Mới chỉ trúng 1000 yên thôi nhưng sau này vẫn dự định tiếp tục mua vé số ➔ 買い続ける.'
  },
  {
    id: 'try-n3-c1-p2-chk-2',
    question: 'ごめん。ジュースを＿＿＿＿＿＿から、ちょっとここで待っていて。',
    answer: '買ってくる',
    choices: ['買ってくる', '買っていく', '買い続ける', '買ったと'],
    explanation: 'Theo bài Check trang 25: Đi mua nước rồi quay lại đây nên hãy đợi một chút ➔ 買ってくる.'
  },
  {
    id: 'try-n3-c1-p2-chk-3',
    question: '友だちのうちへ行くときは、いつもケーキを＿＿＿＿＿＿ことにしています。',
    answer: '買っていく',
    choices: ['買っていく', '買ってくる', '買い続ける', '買うなら'],
    explanation: 'Theo bài Check trang 25: Khi đến nhà bạn chơi, luôn mua bánh kem đem đến đó ➔ 買っていく.'
  },
  {
    id: 'try-n3-c1-p2-chk-4',
    question: 'テレビをつける＿＿＿＿＿＿、ちょうど好きな歌手が歌うところだった。',
    answer: 'と',
    choices: ['と', 'なら', 'ほど', 'ように'],
    explanation: 'Theo bài Check trang 25: Vừa mới bật tivi lên thì bất ngờ thấy đúng lúc ca sĩ mình thích đang hát ➔ V-る + と.'
  },
  {
    id: 'try-n3-c1-p2-chk-5',
    question: '留学する＿＿＿＿＿＿、行く前にその国の言葉を勉強したほうがいいですよ。',
    answer: 'なら',
    choices: ['なら', 'と', 'ほど', 'ように'],
    explanation: 'Theo bài Check trang 25: Nếu định đi du học thì trước khi đi nên học ngôn ngữ nước đó ➔ V-る + なら (đưa ra lời khuyên).'
  },
  {
    id: 'try-n3-c1-p2-chk-6',
    question: '急に背中をたたかれて息が止まる＿＿＿＿＿＿おどろいた。',
    answer: 'ほど',
    choices: ['ほど', 'なら', 'と', 'ように'],
    explanation: 'Theo bài Check trang 25: Bất ngờ bị đập vào lưng, giật mình đến mức nghẹt thở ➔ 息が止まる + ほど.'
  }
];

// Review / Exam items from pages 26-28 (まとめ問題 - 15 questions)
export const chapter1MatomeItems: StudyItem[] = [
  // 問題1 〈文法形式の判断〉 (8 câu)
  {
    id: 'try-n3-c1-matome-1',
    question: 'あの２人はさっきから１時間以上話し（＿＿＿＿＿＿）いますね。',
    answer: '続けて',
    choices: ['続けて', '始めて', '終わって', '休んで'],
    explanation: 'Theo まとめ問題 trang 26: Hai người kia nói chuyện liên tục hơn 1 tiếng đồng hồ từ nãy đến giờ ➔ 話し続けています.'
  },
  {
    id: 'try-n3-c1-matome-2',
    question: '先生に、休むときは必ず連絡する（＿＿＿＿＿＿）言われた。',
    answer: 'ように',
    choices: ['ように', 'らしい', 'かと', 'ほしい'],
    explanation: 'Theo まとめ問題 trang 26: Được thầy cô dặn dò là khi nghỉ thì nhất định phải liên lạc ➔ V-る + ように言われた.'
  },
  {
    id: 'try-n3-c1-matome-3',
    question: '残念だけど、忙しくて今日の飲み会、（＿＿＿＿＿＿）んだ。',
    answer: '行けそうにない',
    choices: ['行けそうにない', '行けるかと思う', '行けるだろうと思う', '行けそうな'],
    explanation: 'Theo まとめ問題 trang 26: Động từ 行ける đi với そうにない để diễn tả sự việc khó lòng tham gia được ➔ 行けそうにないんだ.'
  },
  {
    id: 'try-n3-c1-matome-4',
    question: 'プレゼントの箱を（＿＿＿＿＿＿）、婚約指輪が入っていた。',
    answer: '開けると',
    choices: ['開けると', '開けて', '開けても', '開ければ'],
    explanation: 'Theo まとめ問題 trang 26: Mở hộp quà ra thì bất ngờ nhận thấy có nhẫn đính hôn bên trong ➔ 開けると.'
  },
  {
    id: 'try-n3-c1-matome-5',
    question: '妹は冬でも毎日（＿＿＿＿＿＿）、アイスクリームが好きです。',
    answer: '食べるほど',
    choices: ['食べるほど', '食べると', '食べ始める', '食べるなら'],
    explanation: 'Theo まとめ問題 trang 26: Thích kem đến mức mùa đông ngày nào cũng ăn ➔ 食べるほど.'
  },
  {
    id: 'try-n3-c1-matome-6',
    question: '最近ドラマの内容がわかるようになって（＿＿＿＿＿＿）、うれしい。',
    answer: 'きて',
    choices: ['きて', 'いって', '始めて', '続けて'],
    explanation: 'Theo まとめ問題 trang 26: Dần hiểu được nội dung phim truyền hình, sự thay đổi tích luỹ từ trước đến nay ➔ わかるようになってきて.'
  },
  {
    id: 'try-n3-c1-matome-7',
    question: 'テストのときは答えを（＿＿＿＿＿＿）、もう一度見て、チェックしてください。',
    answer: '書き終わったら',
    choices: ['書き終わったら', '書き始めたら', '書いてきたら', '書いていったら'],
    explanation: 'Theo まとめ問題 trang 26: Sau khi viết xong đáp án thì hãy xem lại kiểm tra nhé ➔ 書き終わったら.'
  },
  {
    id: 'try-n3-c1-matome-8',
    question: '今週末、海へ泳ぎに行く予定ですが、天気があまり（＿＿＿＿＿＿）なので、心配しています。',
    answer: 'よくなさそう',
    choices: ['よくなさそう', 'よさそう', 'よくなかったそう', 'よかったそう'],
    explanation: 'Theo まとめ問題 trang 26: Tính từ いい/よい chuyển thành よくなさそう (trông có vẻ không tốt) ➔ 天気があまりよくなさそうなので.'
  },

  // 問題2 〈文の組み立て ★〉 (3 câu sắp xếp)
  {
    id: 'try-n3-c1-matome-9',
    question: '【Sắp xếp tìm sao ★】\n医者に ＿＿＿ ＿＿＿ ★ ＿＿＿ 言われた。\n(1: たばこと / 2: やめる / 3: お酒を / 4: ように)',
    answer: 'やめる',
    choices: ['やめる', 'たばこと', 'お酒を', 'ように'],
    explanation: 'Theo まとめ問題 trang 27: Thứ tự sắp xếp câu: 医者に [たばこと(1)] [お酒を(3)] ★[やめる(2)] [ように(4)] 言われた.\n➔ Vị trí ngôi sao ★ là: やめる (2).\nDịch: Bác sĩ dặn tôi phải cai thuốc lá và rượu.'
  },
  {
    id: 'try-n3-c1-matome-10',
    question: '【Sắp xếp tìm sao ★】\nほしいものを安く ＿＿＿ ＿＿＿ ★ ＿＿＿ インターネットで値段を調べたほうがいいよ。\n(1: 買う / 2: なら / 3: 前に / 4: 買いたい)',
    answer: '買う',
    choices: ['買う', 'なら', '前に', '買いたい'],
    explanation: 'Theo まとめ問題 trang 27: Thứ tự sắp xếp câu: ほしいものを安く [買いたい(4)] [なら(2)] ★[買う(1)] [前に(3)] インターネットで値段を調べたほうがいいよ.\n➔ Vị trí ngôi sao ★ là: 買う (1).\nDịch: Nếu muốn mua đồ mong muốn với giá rẻ, trước khi mua nên tra cứu giá trên internet.'
  },
  {
    id: 'try-n3-c1-matome-11',
    question: '【Sắp xếp tìm sao ★】\n友だちが来月 ＿＿＿ ＿＿＿ ★ ＿＿＿ 聞いて、びっくりした。\n(1: という / 2: 辞める / 3: 会社を / 4: 話を)',
    answer: 'という',
    choices: ['という', '辞める', '会社を', '話を'],
    explanation: 'Theo まとめ問題 trang 27: Thứ tự sắp xếp câu: 友だちが来月 [会社を(3)] [辞める(2)] ★[という(1)] [話を(4)] 聞いて、びっくりした.\n➔ Vị trí ngôi sao ★ là: という (1).\nDịch: Tôi giật mình khi nghe câu chuyện bạn mình tháng sau sẽ nghỉ việc ở công ty.'
  },

  // 問題3 〈文章の文法 - Đoạn văn Shiroiruka〉 (4 câu)
  {
    id: 'try-n3-c1-matome-12',
    question: '【Đọc hiểu Shiroiruka - Điền [ 1 ]】\nシロイルカは色が白いからシロイルカ [ 1 ] 名前がついている。',
    answer: 'という',
    choices: ['という', 'らしい', 'ように', 'なら'],
    explanation: 'Theo đoạn văn trang 27: Mang cái tên là "Shiroiruka" vì nó màu trắng ➔ Cấu trúc: N1 + という + N2 (シロイルカという名前).'
  },
  {
    id: 'try-n3-c1-matome-13',
    question: '【Đọc hiểu Shiroiruka - Điền [ 2 ]】\nでも、赤ちゃんを [ 2 ]、白くなかったのでびっくりした。',
    answer: '見ると',
    choices: ['見ると', '見れば', '見なければ', '見ないと'],
    explanation: 'Theo đoạn văn trang 27: Nhưng vừa nhìn em bé cá heo thì bất ngờ nhận ra nó không hề có màu trắng (màu xám) ➔ V-ると (赤ちゃんを見ると).'
  },
  {
    id: 'try-n3-c1-matome-14',
    question: '【Đọc hiểu Shiroiruka - Điền [ 3 ]】\nとてもかわいかった。私たちのほうへ [ 3 ] ので、うれしかった。',
    answer: '泳いできた',
    choices: ['泳いできた', '泳いでいった', '泳いでいかなかった', '泳いでこなかった'],
    explanation: 'Theo đoạn văn trang 27: Em bé cá heo bơi lại gần về phía chúng tôi ➔ V-てくる (私たちのほうへ泳いできたので).'
  },
  {
    id: 'try-n3-c1-matome-15',
    question: '【Đọc hiểu Shiroiruka - Điền [ 4 ]】\n写真を撮ろうとしたら、フラッシュを使わない [ 4 ] 言われた。',
    answer: 'ように',
    choices: ['ように', 'という', 'のに', 'なら'],
    explanation: 'Theo đoạn văn trang 27: Khi định chụp ảnh thì được nhắc nhở không được dùng đèn flash ➔ V-ない + ように言われた.'
  }
];

// Chapter 2 Flashcards (Mẫu 11 ➔ 16)
export const chapter2FlashcardItems: StudyItem[] = [
  {
    id: 'try-n3-c2-fc-11',
    term: '〜って',
    reading: 'N1 ＋ って ＋ N2',
    answer: 'Tên là... / Mang tên là...',
    meaning: 'Cách nói thân mật trong văn nói thay cho「〜という」để gọi tên người, sự vật hoặc sự việc',
    explanation: '★ Cấu trúc chuẩn TRY! N3: N1 ＋ って ＋ N2\n★ Là cách nói thân mật, suồng sã trong giao tiếp hàng ngày thay thế cho mẫu「〜という」.\n★ Trong bài đọc: 色が黒いから、クロって名前をつけた (Vì lông nó màu đen nên tôi đặt tên cho nó là Kuro).',
    example: '①「田中さんって人から電話があったよ。」(Có người tên là Tanaka gọi điện cho bạn đấy).\n②「これは『桜』って花です。」(Đây là loài hoa mang tên là Sakura).'
  },
  {
    id: 'try-n3-c2-fc-12',
    term: '〜させてもらう / させてくれる',
    reading: 'V-させる (て形) ＋ もらう / くれる',
    answer: 'Được cho phép làm gì / Cho phép tôi làm gì',
    meaning: 'Sử dụng khi xin phép đối phương cho mình làm việc gì đó và bày tỏ sự biết ơn',
    explanation: '★ Cấu trúc: Động từ chia sang thể sai khiến (使役形) rồi chuyển sang thể て ＋ もらう / くれる\n・Nhóm 1: 書く ➔ 書かせる ➔ 書かせてもらう\n・Nhóm 2: 食べる ➔ 食べさせる ➔ 食べさせてもらう\n・Nhóm 3: する ➔ させる ➔ させてもらう / 来る ➔ 来させる ➔ 来させてもらう\n★ Trong bài đọc: 何度も頼んで、やっと飼わせてもらった (Tôi năn nỉ nhiều lần và cuối cùng cũng được bố mẹ cho phép nuôi).',
    example: '①「すみません、体調が悪いので、今日は早く帰らせてもらえませんか。」(Xin lỗi, em thấy không khỏe nên hôm nay cho phép em về sớm được không ạ?)\n②「部長が私の企画を採用させてくれた。」(Trưởng phòng đã cho phép áp dụng bản kế hoạch của tôi).'
  },
  {
    id: 'try-n3-c2-fc-13',
    term: '〜させられる',
    reading: 'V-させられる (Thể bị sai khiến - 使役受身)',
    answer: 'Bị (ai đó) bắt phải làm gì',
    meaning: 'Sử dụng khi người khác bảo làm một việc mà bản thân không muốn làm nhưng buộc phải làm',
    explanation: '★ Cấu trúc thể bị sai khiến (使役受身形):\n・Nhóm 1: V-あ + せられる / される (待つ ➔ 待たされる, 行く ➔ 行かされる, 話す ➔ 話させられる)\n・Nhóm 2: V-~~ます~~ ＋ させられる (食べる ➔ 食べさせられる)\n・Nhóm 3: する ➔ させられる, 来る ➔ こさせられる\n★ Trong bài đọc: 毎日必ず散歩すると約束させられた (Tôi bị bố mẹ bắt phải hứa là ngày nào cũng phải dắt chó đi dạo).',
    example: '①「子どものころ、母にピーマンを無理やり食べさせられた。」(Hồi bé tôi bị mẹ ép phải ăn ớt chuông).\n②「待ち合わせで友だちに1時間も待たされた。」(Tôi bị bạn bắt đợi suốt cả tiếng đồng hồ ở điểm hẹn).'
  },
  {
    id: 'try-n3-c2-fc-14',
    term: '〜がる',
    reading: '[ いA~~い~~ / なA / V-~~ます~~ た~~い~~ ] ＋ がる',
    answer: 'Có vẻ muốn... / Biểu lộ ra là muốn / Thể hiện cảm xúc...',
    meaning: 'Diễn tả cảm xúc, mong muốn của người khác (ngôi thứ 3) hoặc động vật biểu lộ rõ ràng ra bên ngoài',
    explanation: '★ Cấu trúc chuẩn 100% sách giáo trình TRY! N3:\n・[ いA~~い~~ / なA / V-~~ます~~ た~~い~~ ] ＋ がる\n  - いA~~い~~ ＋ がる (寒~~い~~ ➔ 寒がる, 欲し~~い~~ ➔ 欲しがる)\n  - なA ＋ がる (面倒 ➔ 面倒がる, 嫌 ➔ 嫌がる)\n  - V-~~ます~~ た~~い~~ ＋ がる (行き~~ます~~ ➔ 行きたがる, 食べ~~ます~~ ➔ 食べたがる)\n★ Khi diễn tả trạng thái đang bộc lộ, thường dùng dạng tiếp diễn「〜がっている」.\n★ Plus: 〜がり (Người có tính hay... / người sợ lạnh, sợ nóng, nhút nhát):\n- [ いA~~い~~ / なA ] ＋ がり (寒がり, 暑がり, 恥ずかしがり).\n★ Trong bài đọc: クロは早く散歩に行きたがって「クーンクーン」と鳴く (Kuro tỏ vẻ sốt ruột muốn đi dạo sớm nên kêu rên ư ử).',
    example: '①「妹は新しいおもちゃを欲しがっている。」(Em gái tôi đang biểu lộ vẻ rất muốn có món đồ chơi mới).\n②「彼は怖がりだから、お化け屋敷に入りたがらない。」(Anh ấy vốn tính nhát gan nên chẳng bao giờ muốn vào nhà ma).'
  },
  {
    id: 'try-n3-c2-fc-15',
    term: '〜たとたん (に)',
    reading: 'V-た ＋ とたん (に)',
    answer: 'Ngay vừa khi... thì lập tức / Vừa mới... một cái là...',
    meaning: 'Giải thích tình huống rằng sự việc sau xảy ra ngay tức thì, bất ngờ sau khi vừa xong việc trước',
    explanation: '★ Cấu trúc: V-た ＋ とたん (に)\n★ Vế sau diễn tả sự việc xảy ra bất ngờ, biến đổi khách quan. KHÔNG dùng vế sau là ý chí, mong muốn hay lời mời mọc của người nói.\n★ Trong bài đọc: 玄関を出たとたん、クロは全速力で走り出す (Ngay vừa khi bước ra khỏi cửa, Kuro phi hết tốc lực lao vụt đi).',
    example: '①「立ち上がったとたん、目の前が暗くなった。」(Vừa mới đứng phắt dậy một cái là hoa mắt tối sầm lại).\n②「窓を開けたとたん、冷たい風が入ってきた。」(Vừa mới mở cửa sổ ra một cái là gió lạnh ùa vào ngay lập tức).'
  },
  {
    id: 'try-n3-c2-fc-16',
    term: '〜出す',
    reading: 'V-~~ます~~ ＋ 出す',
    answer: 'Đột nhiên bắt đầu làm gì / Bất thình lình bộc phát...',
    meaning: 'Diễn tả một hành động hoặc sự việc đột nhiên xảy ra, bất thình lình bộc phát một cách nhanh chóng',
    explanation: '★ Cấu trúc: V-~~ます~~ ＋ 出す (Động từ chia thể ます, gạch ~~ます~~ rồi ghép với「出す」).\n★ Khác với「〜始める」ở chỗ nhấn mạnh vào tính bất ngờ, đột ngột bộc phát ngoài dự tính.\n★ Trong bài đọc: クロは全速力で走り出す (Kuro bất thình lình lao vụt đi với toàn bộ tốc lực).',
    example: '①「さっきまで笑っていた赤ちゃんが急に泣き出した。」(Em bé nãy còn cười đùa bỗng nhiên bật khóc nức nở).\n②「突然大雨が降り出した。」(Trời bất chợt đổ mưa rào).'
  }
];

// Chapter 2 Part 2 Flashcards (Mẫu 17 ➔ 20)
export const chapter2Part2FlashcardItems: StudyItem[] = [
  {
    id: 'try-n3-c2-fc-17',
    term: '〜ようとする / 〜ようとしない',
    reading: 'V-よう ＋ とする / としない',
    answer: 'Định làm gì / Nhất quyết không chịu làm gì',
    meaning: 'Cố gắng hết sức để làm gì, tính làm gì (〜ようとする); hoặc chỉ trích đối phương không chịu làm gì (〜ようとしない)',
    explanation: '★ Cấu trúc: V-よう ＋ とする (Động từ chia thể ý chí + とする)\n- Phủ định: V-よう ＋ としない (Không chịu làm gì, nhất quyết không làm).\n★ Plus: V-ようとしたら (Vừa định làm gì thì việc bất ngờ khác ập đến).\n★ Trong bài đọc: 帰ろうとするといやがって動こうとしない (Khi tôi định đi về thì nó khó chịu và nhất quyết không chịu nhúc nhích).',
    example: '①「小さい子どもが道を渡ろうとしているよ。」(Đứa bé con đang định băng qua đường kìa).\n②「リンさんは試験が近いのに、ぜんぜん勉強しようとしない。」(Lin sắp thi đến nơi rồi mà chẳng chịu học hành gì cả).\n③「出かけようとしたら雨が降ってきた。」(Vừa định bước chân ra ngoài thì trời đổ cơn mưa).'
  },
  {
    id: 'try-n3-c2-fc-18',
    term: '〜ことがある / こともある',
    reading: 'V-る / V-ない ＋ ことがある / こともある',
    answer: 'Thỉnh thoảng / Đôi khi có lúc làm gì',
    meaning: 'Diễn tả tần suất thỉnh thoảng, đôi khi có lúc làm một chuyện gì đó (không thường xuyên)',
    explanation: '★ Cấu trúc: [ V-る / V-ない ] ＋ ことがある / こともある\n★ Khác với「〜たことがある」(đã từng có trải nghiệm trong quá khứ).\n★ Trong bài đọc: ときどき、帰りにコンビニに寄ることもある (Thỉnh thoảng trên đường về tôi cũng có ghé vào cửa hàng tiện lợi).',
    example: '①「この地方では4月でも雪が降ることがある。」(Ở vùng này ngay cả tháng 4 thỉnh thoảng cũng có tuyết rơi).\n②「ふだんはよく寝られるんですが、ストレスがたまって眠れないこともあります。」(Bình thường tôi ngủ rất ngon, nhưng khi bị căng thẳng thì cũng có lúc mất ngủ).'
  },
  {
    id: 'try-n3-c2-fc-19',
    term: '〜させておく',
    reading: 'V-させ~~る~~ て ＋ おく',
    answer: 'Cứ để mặc cho làm gì / Để yên như thế',
    meaning: 'Chỉ thị ai đó cứ tiếp tục làm một hành động, hoặc để nguyên như thế không can thiệp (thường dùng cho người dưới hoặc động vật)',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-させ~~る~~ て ＋ おく (Động từ chia thể sai khiến 使役形, bỏ「る」thay bằng「て」➔ させておく).\n★ Trong bài đọc: クロをコンビニの前で待たせておいて、買い物する (Tôi để Kuro đợi trước cửa hàng tiện lợi rồi vào mua sắm).',
    example: '①「夏に車の中で子どもを待たせておくのは危険ですよ。」(Vào mùa hè mà cứ để trẻ con chờ trong xe ô tô là nguy hiểm lắm đấy).\n②「家事をしている間、子どもをおもちゃで遊ばせておく。」(Trong lúc làm việc nhà, tôi để cho con chơi với đồ chơi).'
  },
  {
    id: 'try-n3-c2-fc-20',
    term: '〜られてしまう',
    reading: 'V-られ~~る~~ て ＋ しまう',
    answer: 'Bị (ai đó làm phiền, chịu thiệt hại đáng tiếc)',
    meaning: 'Thể bị động bị hại (迷惑の受身), thể hiện sự phiền phức, khó chịu hoặc đáng tiếc trước hành động của người khác',
    explanation: '★ Cấu trúc chuẩn sách TRY! N3: V-られ~~る~~ て ＋ しまう (Động từ chia thể bị động 受身形, bỏ「る」thay bằng「て」➔ られてしまう).\n★ Trong bài đọc: ぼくは顔中なめられてしまう (Tôi bị nó liếm láp khắp cả mặt).',
    example: '①「片思いの彼を映画に誘ったが、断られてしまった。」(Tôi rủ người mình thầm thương đi xem phim nhưng bị anh ấy từ chối mất rồi).\n②「あとで食べようと思っていたケーキを妹に食べられてしまった。」(Miếng bánh ngọt tôi định để lát ăn thì đã bị em gái ăn mất tiêu).'
  },
  {
    id: 'try-n3-c2-fc-21',
    term: '〜ようとしたら',
    reading: 'V-よう ＋ としたら / とき',
    answer: 'Vừa định làm gì thì (bất ngờ...)',
    meaning: 'Một sự việc bất ngờ xảy ra ngay trước khi bạn chuẩn bị thực hiện hành động',
    explanation: '★ Cấu trúc: V-よう ＋ としたら (Thể ý chí + としたら)\n★ Ghi chú kẹp giấy 📎 trong sách trang 34: 動作をするすぐ前の状態のときに、予想しなかったことが起きたときにも使う。',
    example: '①「出かけようとしたら雨が降ってきた。」(Vừa định ra ngoài thì trời đổ mưa).\n②「寝ようとしたとき、宿題があったことを思い出した。」(Lúc vừa định đi ngủ thì nhớ ra còn bài tập).'
  }
];

// Chapter 2 Exercises (Mẫu 12 ➔ 16 từ trang 30-33)
export const chapter2ExerciseItems: StudyItem[] = [
  // Mẫu 12: 〜させてもらう / させてくれる (4 câu trang 30)
  {
    id: 'try-n3-c2-q-1',
    question: 'A:「英語を（習います ➔ ＿＿＿＿＿）もらえませんか。」\nB:「いいですよ。」',
    answer: '習わせて',
    choices: ['習わせて', '習って', '習われて', '習わせられて'],
    explanation: 'Theo bài やっみよう! trang 30: Xin phép người khác cho mình được học (được học tiếng Anh) ➔ V-させる (thể sai khiến) + てもらう ➔ 習わせて.'
  },
  {
    id: 'try-n3-c2-q-2',
    question: 'A:「パソコンを（直します ➔ ＿＿＿＿＿）くれませんか。」\nB:「いいですよ。」',
    answer: '直して',
    choices: ['直して', '直させて', '直されて', '直させられて'],
    explanation: 'Theo bài やっみよう! trang 30: Nhờ đối phương sửa giúp máy tính của mình (không phải xin phép cho mình sửa) ➔ dùng thể nhờ vả bình thường V-てくれる ➔ 直して.'
  },
  {
    id: 'try-n3-c2-q-3',
    question: 'A:「私に（払います ➔ ＿＿＿＿＿）ください。」\nB:「いいえ、私が払いますよ。」',
    answer: '払わせて',
    choices: ['払わせて', '払って', '払われて', '払わせられて'],
    explanation: 'Theo bài やっみよう! trang 30: Xin đối phương cho phép mình được thanh toán tiền ➔ 払う chia thể sai khiến + てください ➔ 払わせて.'
  },
  {
    id: 'try-n3-c2-q-4',
    question: 'A:「写真を1枚（撮ります ➔ ＿＿＿＿＿）いただけませんか。」\nB:「ええ、いいですよ。」',
    answer: '撮らせて',
    choices: ['撮らせて', '撮って', '撮られて', '撮らせられて'],
    explanation: 'Theo bài やっみよう! trang 30: Xin phép người khác cho phép mình chụp 1 tấm ảnh của họ ➔ 撮る chia thể sai khiến + ていただけませんか ➔ 撮らせて.'
  },

  // Mẫu 13: 〜させられる (4 câu trang 31)
  {
    id: 'try-n3-c2-q-5',
    question: '待ち合わせの場所で、友だちに1時間も（待つ ➔ ＿＿＿＿＿）。',
    answer: '待たされた',
    choices: ['待たされた', '待たせられた', '待たせた', '待たして'],
    explanation: 'Theo bài やっみよう! trang 31: Bị bạn bắt chờ suốt 1 tiếng đồng hồ ở điểm hẹn ➔ Thể bị sai khiến rút gọn của nhóm 1 (待つ ➔ 待たせる ➔ 待たされる / 待たされた).'
  },
  {
    id: 'try-n3-c2-q-6',
    question: '子どものころ、母にピーマンを無理やり（食べる ➔ ＿＿＿＿＿）。',
    answer: '食べさせられた',
    choices: ['食べさせられた', '食べられた', '食べさせた', '食べさせていた'],
    explanation: 'Theo bài やっみよう! trang 31: Hồi bé bị mẹ bắt ép phải ăn ớt chuông ➔ Động từ nhóm 2 食べる chia thể bị sai khiến ➔ 食べさせられた.'
  },
  {
    id: 'try-n3-c2-q-7',
    question: '先生にすすめられた本を（読む ➔ ＿＿＿＿＿）いただいた。',
    answer: '読ませて',
    choices: ['読ませて', '読まされて', '読まれて', '読んで'],
    explanation: 'Theo bài やっみよう! trang 31: Đọc sách được thầy giáo giới thiệu một cách tôn kính / khiêm nhường ➔ 読ませていただいた.'
  },
  {
    id: 'try-n3-c2-q-8',
    question: '引っ越しの手伝いで、重い荷物をたくさん（運ぶ ➔ ＿＿＿＿＿）疲れた。',
    answer: '運ばされて',
    choices: ['運ばされて', '運ばせて', '運ばれて', '運んで'],
    explanation: 'Theo bài やっみよう! trang 31: Giúp chuyển nhà, bị bắt phải khiêng vác rất nhiều đồ nặng nên mệt nhoài ➔ 運ぶ chia thể bị sai khiến: 運ばされる ➔ 運ばされて.'
  },

  // Mẫu 14: 〜がる (3 câu trang 31-32)
  {
    id: 'try-n3-c2-q-9',
    question: 'A:「旅行に行きたい？」\nB:「うん、私は＿＿＿＿＿。でも妹は＿＿＿＿＿。」',
    answer: '行きたい／行きたがらない',
    choices: [
      '行きたい／行きたがらない',
      '行きたがる／行きたくない',
      '行きたい／行きたくない',
      '行きたがる／行きたがらない'
    ],
    explanation: 'Theo bài やっみよう! trang 31: Bản thân mình (ngôi thứ nhất) dùng 行きたい. Em gái (ngôi thứ 3) không muốn đi và biểu lộ ra dùng 行きたがらない.'
  },
  {
    id: 'try-n3-c2-q-10',
    question: '注射のとき、平気な顔をしている子もいるが、弟は注射を（こわがる ➔ ＿＿＿＿＿）大泣きした。',
    answer: 'こわがって',
    choices: ['こわがって', 'こわくて', 'こわいので', 'こわがりで'],
    explanation: 'Theo bài やっみよう! trang 32: Em trai biểu lộ sự sợ hãi kim tiêm ra ngoài và khóc thét lên ➔ こわ~~い~~ ＋ がる chia thể て ➔ こわがって.'
  },
  {
    id: 'try-n3-c2-q-11',
    question: 'みんなの前でスピーチするときは、＿＿＿＿＿堂々と話してください。',
    answer: '恥ずかしがらないで',
    choices: [
      '恥ずかしがらないで',
      '恥ずかしくないで',
      '恥ずかしがって',
      '恥ずかしいで'
    ],
    explanation: 'Theo bài やっみよう! trang 32: Khi phát biểu trước mọi người, đừng biểu lộ sự ngượng ngùng rụt rè mà hãy tự tin nói ➔ 恥ずかしがる chia phủ định thể て ➔ 恥ずかしがらないで.'
  },

  // Mẫu 15: 〜たとたん (3 câu trang 32)
  {
    id: 'try-n3-c2-q-12',
    question: 'チラシを配ったとたん、（＿＿＿＿＿＿）。',
    answer: '予約の電話がたくさんかかってきた',
    choices: [
      '予約の電話がたくさんかかってきた',
      '予約の電話をかけようと思う',
      '予約の電話をかけてください',
      'チラシを集めた'
    ],
    explanation: 'Theo bài やっみよう! trang 32: V-た + とたん (ngay khi... thì lập tức) đi với vế sau là biến đổi khách quan bất ngờ ➔ 予約の電話がたくさんかかってきた.'
  },
  {
    id: 'try-n3-c2-q-13',
    question: '先生が教室に入ってきたとたん、（＿＿＿＿＿＿）。',
    answer: '教室が静かになった',
    choices: [
      '教室が静かになった',
      '教室を静かにしよう',
      '静かに勉強してください',
      '黒板を消した'
    ],
    explanation: 'Theo bài やっみよう! trang 32: Thầy giáo vừa bước vào phòng học một cái thì cả lớp lập tức trở nên trật tự yên lặng ➔ 教室が静かになった.'
  },
  {
    id: 'try-n3-c2-q-14',
    question: 'パソコンのエンターキーを押したとたん、（＿＿＿＿＿＿）。',
    answer: '画面がフリーズしてしまった',
    choices: [
      '画面がフリーズしてしまった',
      '画面をフリーズさせよう',
      '電源を切ってください',
      'キーボードを掃除した'
    ],
    explanation: 'Theo bài やっみよう! trang 32: Vừa bấm phím Enter một cái thì màn hình máy tính lập tức bị đơ đóng băng ➔ 画面がフリーズしてしまった.'
  },

  // Mẫu 16: 〜出す (4 câu trang 33)
  {
    id: 'try-n3-c2-q-15',
    question: '医者に言われて、運動嫌いの父がスポーツクラブに（＿＿＿＿＿＿）。',
    answer: '通い出した',
    choices: ['通い出した', '通い続けた', '通うなら', '通ったとたん'],
    explanation: 'Theo bài やっみよう! trang 33: Người bố vốn ghét thể dục thể thao bỗng nhiên đột ngột bắt đầu đi tập gym ➔ 通い出した (V-ます + 出す).'
  },
  {
    id: 'try-n3-c2-q-16',
    question: '仕事に夢中だと思っていた娘が、急に結婚すると（＿＿＿＿＿＿）。',
    answer: '言い出した',
    choices: ['言い出した', '言い続けた', '言うと', '言うなら'],
    explanation: 'Theo bài やっみよう! trang 33: Cô con gái đột ngột thốt lên nói sẽ kết hôn ➔ 言い出した.'
  },
  {
    id: 'try-n3-c2-q-17',
    question: 'コンサートが終わると、観客はいっせいに駅に向かって（＿＿＿＿＿＿）。',
    answer: '歩き出した',
    choices: ['歩き出した', '歩き続けた', '歩くなら', '歩いたと'],
    explanation: 'Theo bài やっみよう! trang 33: Buổi biểu diễn ca nhạc kết thúc, khán giả đồng loạt rảo bước túa ra đi về phía nhà ga ➔ 歩き出した.'
  },
  {
    id: 'try-n3-c2-q-18',
    question: 'ベルが鳴ってドアが閉まると、電車はゆっくり（＿＿＿＿＿＿）。',
    answer: '動き出した',
    choices: ['動き出した', '動き続けた', '動くなら', '動いたと'],
    explanation: 'Theo bài やっみよう! trang 33: Chuông reo cửa đóng lại, đoàn tàu từ từ chuyển bánh bắt đầu lăn bánh ➔ 動き出した.'
  }
];

// Check 📖 items for Chapter 2 from page 33 (5 questions)
export const chapter2CheckItems: StudyItem[] = [
  {
    id: 'try-n3-c2-chk-1',
    question: '就職したら、父に頼んで、一人暮らしを ＿＿＿＿＿＿ つもりだ。',
    answer: 'させてもらう',
    choices: ['させてもらう', 'させられる', 'したがる', 'したとたん'],
    explanation: 'Theo bài Check trang 33: Khi đi làm, tôi dự định xin phép bố cho phép tôi được ra sống riêng một mình ➔ 一人暮らしをさせてもらう.'
  },
  {
    id: 'try-n3-c2-chk-2',
    question: '一人暮らしをしても、１週間に１回は必ずうちへ帰るように、父に約束 ＿＿＿＿＿＿。',
    answer: 'させられた',
    choices: ['させられた', 'させてもらった', 'したがった', 'し出した'],
    explanation: 'Theo bài Check trang 33: Dù ra sống riêng nhưng tôi bị bố bắt phải hứa mỗi tuần phải về nhà 1 lần ➔ 約束させられた (thể bị sai khiến).'
  },
  {
    id: 'try-n3-c2-chk-3',
    question: '高橋さんはいつも政治や経済などの難しい話を ＿＿＿＿＿＿ のでちょっと困る。',
    answer: 'したがる',
    choices: ['したがる', 'したい', 'させられる', 'し出す'],
    explanation: 'Theo bài Check trang 33: Takahashi (ngôi thứ 3) lúc nào cũng tỏ vẻ thích bàn về chuyện chính trị kinh tế khó nhằn ➔ したがる.'
  },
  {
    id: 'try-n3-c2-chk-4',
    question: '人気俳優が舞台に登場 ＿＿＿＿＿＿、観客はいっせいに彼のほうを見た。',
    answer: 'したとたん',
    choices: ['したとたん', 'し出すと', 'させられて', 'したがると'],
    explanation: 'Theo bài Check trang 33: Ngay vừa khi diễn viên nổi tiếng xuất hiện trên sân khấu thì khán giả đồng loạt hướng mắt nhìn về phía anh ấy ➔ 登場したとたん.'
  },
  {
    id: 'try-n3-c2-chk-5',
    question: 'いつもそうじしない息子が、急にそうじを ＿＿＿＿＿＿ ので、変だと思ったら、明日彼女が来るからだった。',
    answer: 'し出した',
    choices: ['し出した', 'し続けた', 'したとたん', 'させてもらった'],
    explanation: 'Theo bài Check trang 33: Đứa con trai lười biếng bỗng nhiên bất thình lình cắm cúi dọn dẹp phòng ➔ そうじをし出した (V-ます + 出す).'
  }
];

// Chapter 2 Part 2 Exercises (Mẫu 17 ➔ 20 từ trang 34-37)
export const chapter2Part2ExerciseItems: StudyItem[] = [
  // Mẫu 17: 〜ようとする / 〜ようとしない (4 câu trang 34-35)
  {
    id: 'try-n3-c2-p2-q-1',
    question: 'レジでお金を払おうとしたら、（＿＿＿＿＿＿）。',
    answer: '財布がなかった',
    choices: ['財布がなかった', 'クレジットカードを使った', 'お金をもらった', 'お釣りを待った'],
    explanation: 'Theo bài やっみよう! trang 35: Khi vừa định trả tiền ở quầy thu ngân thì nhận ra không có mang theo ví ➔ 財布がなかった (V-ようとしたら).'
  },
  {
    id: 'try-n3-c2-p2-q-2',
    question: 'さっき紹介していただいた方のお名前、思い出そうとしても（＿＿＿＿＿＿）。',
    answer: '思い出せないんです',
    choices: ['思い出せないんです', '教えてください', 'すぐ思い出しました', '覚えています'],
    explanation: 'Theo bài やっみよう! trang 35: Dù đã rất cố gắng nhớ lại tên người vừa được giới thiệu lúc nãy nhưng không tài nào nhớ nổi ➔ 思い出せないんです (V-ようとしても).'
  },
  {
    id: 'try-n3-c2-p2-q-3',
    question: '地震のとき、急いで逃げようとして（＿＿＿＿＿＿）。',
    answer: '転んでけがをした',
    choices: ['転んでけがをした', 'ドアを開けてください', '外へ出られた', '机の下に隠れた'],
    explanation: 'Theo bài やっみよう! trang 35: Lúc xảy ra động đất, trong lúc vội vàng định tháo chạy thoát thân thì bị vấp ngã bị thương ➔ 転んでけがをした (V-ようとして).'
  },
  {
    id: 'try-n3-c2-p2-q-4',
    question: '寝ようとしたとき（＿＿＿＿＿＿）。',
    answer: '宿題があったことを思い出した',
    choices: [
      '宿題があったことを思い出した',
      '宿題をする',
      'ぐっすり眠った',
      '歯を磨こう'
    ],
    explanation: 'Theo bài やっみよう! trang 35: Đúng lúc vừa định đi ngủ thì sực nhớ ra vẫn còn bài tập về nhà ➔ 宿題があったことを思い出した (V-ようとしたとき).'
  },

  // Mẫu 18: 〜ことがある / こともある (4 câu trang 36)
  {
    id: 'try-n3-c2-p2-q-5',
    question: '私はたいてい、うちでご飯を（＿＿＿＿＿＿）。',
    answer: '食べます',
    choices: ['食べます', '食べることがあります', '食べたことがある', '食べることもある'],
    explanation: 'Theo bài やっみよう! trang 36: Vì có phó từ「たいてい」(thông thường/hầu như luôn) chỉ thói quen cố định nên dùng thể lịch sự bình thường ➔ 食べます (không dùng ことがある).'
  },
  {
    id: 'try-n3-c2-p2-q-6',
    question: '図書館は、本の整理のために休館日以外も（＿＿＿＿＿＿）ので、気をつけてください。',
    answer: '閉まっていることがある',
    choices: [
      '閉まっていることがある',
      '閉まっている',
      '閉まりそうだ',
      '閉まるだろう'
    ],
    explanation: 'Theo bài やっみよう! trang 36: Thư viện ngoài những ngày nghỉ định kỳ thì thỉnh thoảng cũng có khi đóng cửa để sắp xếp sách ➔ 閉まっていることがある.'
  },
  {
    id: 'try-n3-c2-p2-q-7',
    question: '疲れていると、目覚まし時計が鳴っても、（＿＿＿＿＿＿）ことがある。',
    answer: '起きられない',
    choices: ['起きられない', '起きられる', '起きようとする', '起きておく'],
    explanation: 'Theo bài やっみよう! trang 36: Khi cơ thể quá mệt mỏi thì dù chuông báo thức có reo thỉnh thoảng cũng có lúc không dậy nổi ➔ 起きられないことがある.'
  },
  {
    id: 'try-n3-c2-p2-q-8',
    question: 'いつも駅まで歩いて行くが、たまに自転車で（＿＿＿＿＿＿）こともある。',
    answer: '行く',
    choices: ['行く', '行かない', '行こうとする', '行かせる'],
    explanation: 'Theo bài やっみよう! trang 36: Bình thường tôi đi bộ ra ga nhưng thi thoảng (たまに) cũng có khi đi bằng xe đạp ➔ 行くこともある.'
  },

  // Mẫu 20: 〜られてしまう (4 câu trang 37)
  {
    id: 'try-n3-c2-p2-q-9',
    question: 'ライバルのB社に（＿＿＿＿＿＿）。',
    answer: 'わが社の新製品の企画を知られてしまった',
    choices: [
      'わが社の新製品の企画を知られてしまった',
      '大雨に降られてしまった',
      '先生にもっと勉強するように言われてしまった',
      'ほかの人に取られてしまった'
    ],
    explanation: 'Theo bài nối câu やっみよう! trang 37: Bị công ty đối thủ B biết mất kế hoạch sản phẩm mới của công ty chúng tôi ➔ わが社の新製品の企画を知られてしまった.'
  },
  {
    id: 'try-n3-c2-p2-q-10',
    question: '試験の成績が悪かったので、（＿＿＿＿＿＿）。',
    answer: '先生にもっと勉強するように言われてしまった',
    choices: [
      '先生にもっと勉強するように言われてしまった',
      'わが社の新製品の企画を知られてしまった',
      '大雨に降られてしまった',
      'ほかの人に取られてしまった'
    ],
    explanation: 'Theo bài nối câu やっみよう! trang 37: Vì kết quả bài thi kém nên tôi bị thầy giáo nhắc nhở bảo phải học nhiều hơn nữa ➔ 先生にもっと勉強するように言われてしまった.'
  },
  {
    id: 'try-n3-c2-p2-q-11',
    question: 'バーゲン会場でほしいと思ったバッグを（＿＿＿＿＿＿）。',
    answer: 'ほかの人に取られてしまった',
    choices: [
      'ほかの人に取られてしまった',
      'わが社の新製品の企画を知られてしまった',
      '先生にもっと勉強するように言われてしまった',
      '大雨に降られてしまった'
    ],
    explanation: 'Theo bài nối câu やっみよう! trang 37: Chiếc túi mà tôi nhắm thích ở khu vực giảm giá đã bị người khác nẫng tay trên mất ➔ ほかの人に取られてしまった.'
  },
  {
    id: 'try-n3-c2-p2-q-12',
    question: '昨日、帰る途中で（＿＿＿＿＿＿）。',
    answer: '大雨に降られてしまった',
    choices: [
      '大雨に降られてしまった',
      'ほかの人に取られてしまった',
      'わが社の新製品の企画を知られてしまった',
      '先生にもっと勉強するように言われてしまった'
    ],
    explanation: 'Theo bài nối câu やっみよう! trang 37: Hôm qua trên đường trở về nhà tôi đã bị dính trận mưa rào lớn ➔ 大雨に降られてしまった (雨に降られる).'
  }
];

// Check 📖 items for Chapter 2 Part 2 from page 37 (3 questions)
export const chapter2Part2CheckItems: StudyItem[] = [
  {
    id: 'try-n3-c2-p2-chk-1',
    question: '弟は部屋が汚くてもそうじ ＿＿＿＿＿＿。',
    answer: 'しようとしない',
    choices: ['しようとしない', 'することもある', 'されてしまった', 'させておく'],
    explanation: 'Theo bài Check trang 37: Em trai dù phòng bẩn thỉu nhưng nhất quyết không chịu dọn dẹp ➔ そうじしようとしない (〜ようとしない: phàn nàn ngôi thứ 3 không chịu làm).'
  },
  {
    id: 'try-n3-c2-p2-chk-2',
    question: '人間だから失敗 ＿＿＿＿＿＿ よ。また今度がんばればいいよ。元気出して。',
    answer: 'することもある',
    choices: ['することもある', 'しようとしない', 'されてしまった', 'させておく'],
    explanation: 'Theo bài Check trang 37: Đã là con người thì thỉnh thoảng thất bại cũng là chuyện bình thường ➔ 失敗することもあるよ (〜こともある: thỉnh thoảng có lúc).'
  },
  {
    id: 'try-n3-c2-p2-chk-3',
    question: '友だちとけんかした翌日、「おはよう」と言ったが、無視 ＿＿＿＿＿＿。',
    answer: 'されてしまった',
    choices: ['されてしまった', 'しようとしない', 'することもある', 'させておいた'],
    explanation: 'Theo bài Check trang 37: Hôm sau khi cãi nhau với bạn, tôi cất lời chào nhưng lại bị phớt lờ chịu ấm ức ➔ 無視されてしまった (〜られてしまう: bị hại, phiền toái).'
  }
];

// Review / Exam items for Chapter 2 (Chương 2: ぼくの犬、クロ) from pages 38-39 (まとめ問題 - 15 questions)
export const chapter2MatomeItems: StudyItem[] = [
  // 問題1 〈文法形式の判断〉 (8 câu)
  {
    id: 'try-n3-c2-matome-1',
    question: 'このバスは安全のため急停車（＿＿＿＿＿＿）のでご注意ください。',
    answer: 'することがあります',
    choices: ['しようとします', 'することがあります', 'していることがあります', 'させてもらいます'],
    explanation: 'Theo まとめ問題 trang 38: Xe buýt vì lý do an toàn nên thỉnh thoảng có lúc phanh gấp, xin quý khách chú ý ➔ 急停車することがあります.'
  },
  {
    id: 'try-n3-c2-matome-2',
    question: 'A:「かわいいウサギですね。写真を（＿＿＿＿＿＿）いいですか。」\nB:「ええ、どうぞ。名前はピョンちゃんって言うんです。」',
    answer: '撮らせてもらっても',
    choices: ['撮らせてくれても', '撮らせてもらっても', '撮られても', '撮られてしまっても'],
    explanation: 'Theo まとめ問題 trang 38: Xin phép người đối diện cho mình được chụp ảnh ➔ 使役形 + てもらう ➔ 撮らせてもらってもいいですか.'
  },
  {
    id: 'try-n3-c2-matome-3',
    question: '仕事が終わってうちへ（＿＿＿＿＿＿）、部長に新しい仕事を頼まれた。',
    answer: '帰ろうとしたら',
    choices: ['帰ろうとしたら', '帰りたがったら', '帰らせたら', '帰ったとたん'],
    explanation: 'Theo まとめ問題 trang 38: Đúng lúc vừa định đi về nhà thì bị sếp giao thêm việc mới ➔ 帰ろうとしたら (V-ようとしたら).'
  },
  {
    id: 'try-n3-c2-matome-4',
    question: '空港でだれかにスーツケースを（＿＿＿＿＿＿）しまって、困ったことがある。',
    answer: '間違えられて',
    choices: ['間違えて', '間違えさせて', '間違えられて', '間違えさせられて'],
    explanation: 'Theo まとめ問題 trang 38: Bị ai đó cầm nhầm va li của mình ở sân bay (thể bị động bị hại) ➔ スーツケースを間違えられてしまって.'
  },
  {
    id: 'try-n3-c2-matome-5',
    question: '私は（＿＿＿＿＿＿）なので、いつもくつ下を2枚はいています。',
    answer: '寒がり',
    choices: ['暑がり', '寒がり', '痛がり', 'こわがり'],
    explanation: 'Theo まとめ問題 trang 38: Vì tôi là người rất sợ lạnh / chịu rét kém nên lúc nào cũng đi 2 đôi tất ➔ 寒がり.'
  },
  {
    id: 'try-n3-c2-matome-6',
    question: '家族で食事しているときでも携帯メールを（＿＿＿＿＿＿）子どもが増えているそうです。',
    answer: 'やめようとしない',
    choices: ['しようとしない', 'させておく', 'やめさせない', 'やめようとしない'],
    explanation: 'Theo まとめ問題 trang 38: Trẻ con dù trong bữa cơm gia đình cũng không chịu ngừng nhắn tin điện thoại ➔ やめようとしない.'
  },
  {
    id: 'try-n3-c2-matome-7',
    question: 'サッカーの練習のときにコーチに毎回ランニングを（＿＿＿＿＿＿）、大変でしたが、だんだん慣れて速く走れるようになりました。',
    answer: 'させられて',
    choices: ['させられて', 'されて', 'させて', 'させようとして'],
    explanation: 'Theo まとめ問題 trang 39: Bị huấn luyện viên bắt phải chạy bộ mỗi buổi tập bóng đá (thể bị sai khiến 使役受身) ➔ ランニングをさせられて.'
  },
  {
    id: 'try-n3-c2-matome-8',
    question: '散歩から帰ってきた（＿＿＿＿＿＿）、大つぶの雨が降り始めた。',
    answer: 'とたん',
    choices: ['ように', 'なら', 'とたん', 'ほど'],
    explanation: 'Theo まとめ問題 trang 39: Vừa mới đi dạo về đến nhà một cái thì lập tức cơn mưa hạt to đổ xuống ➔ 帰ってきたとたん (V-た + とたん).'
  },

  // 問題2 〈文の組み立て ★〉 (3 câu sắp xếp dấu sao)
  {
    id: 'try-n3-c2-matome-9',
    question: '【Sắp xếp tìm sao ★】\nパックの牛乳は横を強く ＿＿＿ ＿＿＿ ★ ＿＿＿ ので気をつけてください。\n(1: ことがある / 2: 持つと / 3: こぼれる / 4: 中身が)',
    answer: 'こぼれる',
    choices: ['こぼれる', 'ことがある', '持つと', '中身が'],
    explanation: 'Theo まとめ問題 trang 39: Thứ tự câu: パックの牛乳は横を強く [持つと(2)] [中身が(4)] ★[こぼれる(3)] [ことがある(1)] ので気をつけてください。\n➔ Vị trí ngôi sao ★ là: こぼれる (3).\nDịch: Hộp sữa nếu bóp mạnh hai bên sườn thì thỉnh thoảng sữa bên trong có thể bị trào ra nên hãy cẩn thận.'
  },
  {
    id: 'try-n3-c2-matome-10',
    question: '【Sắp xếp tìm sao ★】\n仕事中に頭痛が ＿＿＿ ＿＿＿ ★ ＿＿＿ 、病院へ行った。\n(1: もらって / 2: 早退させて / 3: ので / 4: ひどくなった)',
    answer: '早退させて',
    choices: ['早退させて', 'もらって', 'ので', 'ひどくなった'],
    explanation: 'Theo まとめ問題 trang 39: Thứ tự câu: 仕事中に頭痛が [ひどくなった(4)] [ので(3)] ★[早退させて(2)] [もらって(1)] 、病院へ行った。\n➔ Vị trí ngôi sao ★ là: 早退させて (2).\nDịch: Trong lúc làm việc vì cơn đau đầu trở nặng nên tôi xin phép về sớm và tới bệnh viện.'
  },
  {
    id: 'try-n3-c2-matome-11',
    question: '【Sắp xếp tìm sao ★】\n友だちが ＿＿＿ ＿＿＿ ★ ＿＿＿ から、びっくりした。\n(1: 見た / 2: メールを / 3: とたん / 4: 泣き出した)',
    answer: 'とたん',
    choices: ['とたん', '見た', 'メールを', '泣き出した'],
    explanation: 'Theo まとめ問題 trang 39: Thứ tự câu: 友だちが [メールを(2)] [見た(1)] ★[とたん(3)] [泣き出した(4)] から、びっくりした。\n➔ Vị trí ngôi sao ★ là: とたん (3).\nDịch: Bạn tôi vừa mới xem tin nhắn một cái là lập tức bật khóc nức nở khiến tôi giật cả mình.'
  },

  // 問題3 〈文章の文法 - Đoạn văn Công viên giải trí 遊園地〉 (4 câu)
  {
    id: 'try-n3-c2-matome-12',
    question: '【Đoạn văn 遊園地 - Điền [ 1 ]】\nうちの子は遊園地が大好きだ。今週も [ 1 ] から、連れていくことにした。',
    answer: '行きたがった',
    choices: ['行った', '行きたかった', '行ったばかりだ', '行きたがった'],
    explanation: 'Theo đoạn văn trang 39: Con tôi (ngôi thứ 3) tuần này cũng biểu lộ rất muốn đi công viên giải trí ➔ 行きたがった (V-たい ➔ がる).'
  },
  {
    id: 'try-n3-c2-matome-13',
    question: '【Đoạn văn 遊園地 - Điền [ 2 ]】\n「連れていって！」と [ 2 ] と、なかなか（いやとは言えない）。',
    answer: '頼まれてしまう',
    choices: ['頼まれてもらう', '頼まれてしまう', '頼んでしまう', '頼んでもらう'],
    explanation: 'Theo đoạn văn trang 39: Bị con bé nài nỉ xin dắt đi một cách tha thiết khó từ chối ➔ 頼まれてしまう (thể bị động bị hại).'
  },
  {
    id: 'try-n3-c2-matome-14',
    question: '【Đoạn văn 遊園地 - Điền [ 3 ]】\n遊園地に入った [ 3 ]、娘はうれしそうに好きな乗り物に向かって走り出した。',
    answer: 'とたん',
    choices: ['ばかりで', 'そうで', 'とたん', 'らしい'],
    explanation: 'Theo đoạn văn trang 39: Vừa mới bước chân vào công viên giải trí một cái thì con bé lập tức chạy vụt về phía trò chơi yêu thích ➔ 遊園地に入ったとたん.'
  },
  {
    id: 'try-n3-c2-matome-15',
    question: '【Đoạn văn 遊園地 - Điền [ 4 ]】\nメリーゴーラウンドには一人で乗ってもらおうとしたが、結局、一緒に [ 4 ]。',
    answer: '乗らされた',
    choices: ['乗らされた', '乗らせてもらった', '乗られた', '乗られてしまった'],
    explanation: 'Theo đoạn văn trang 39: Tôi tính để con bé chơi đu quay một mình nhưng rốt cuộc bị nó bắt phải ngồi cùng ➔ 一緒に乗らされた (thể bị sai khiến 乗る ➔ 乗らされる ➔ 乗らされた).'
  }
];

export const allTryN3FlashcardItems: StudyItem[] = [
  ...chapter1FlashcardItems,
  ...chapter2FlashcardItems,
  ...chapter2Part2FlashcardItems
];

export const tryN3Lessons: Lesson[] = [
  {
    id: 1,
    title: 'TRY! N3: Ngữ Pháp Trọng Tâm (Phần 1 ➔ 4)',
    hasTheory: true,
    sections: [
      {
        id: 'try-n3-flashcard-all',
        title: 'Flashcard Toàn bộ 20 Mẫu Ngữ Pháp & Điểm Plus (25 thẻ)',
        type: 'vocabulary',
        items: allTryN3FlashcardItems
      },
      {
        id: 'try-n3-c1-flashcard',
        title: 'Flashcard Phần 1 & 2 (14 thẻ)',
        type: 'vocabulary',
        items: chapter1FlashcardItems
      },
      {
        id: 'try-n3-c2-flashcard',
        title: 'Flashcard Phần 3 (6 thẻ)',
        type: 'vocabulary',
        items: chapter2FlashcardItems
      },
      {
        id: 'try-n3-c2-p2-flashcard',
        title: 'Flashcard Phần 4 (5 thẻ)',
        type: 'vocabulary',
        items: chapter2Part2FlashcardItems
      },
      {
        id: 'try-n3-c1-exercises',
        title: 'Trắc nghiệm やっみよう! Phần 1 (23 câu)',
        type: 'multiple_choice',
        items: chapter1ExerciseItems
      },
      {
        id: 'try-n3-c1-exercises-p2',
        title: 'Trắc nghiệm やっみよう! Phần 2 (17 câu)',
        type: 'multiple_choice',
        items: chapter1Part2ExerciseItems
      },
      {
        id: 'try-n3-c2-exercises',
        title: 'Trắc nghiệm やっみよう! Phần 3 (18 câu)',
        type: 'multiple_choice',
        items: chapter2ExerciseItems
      },
      {
        id: 'try-n3-c2-exercises-p2',
        title: 'Trắc nghiệm やっみよう! Phần 4 (12 câu)',
        type: 'multiple_choice',
        items: chapter2Part2ExerciseItems
      },
      {
        id: 'try-n3-c1-check',
        title: 'Kiểm tra Check 📖 Phần 1 (6 câu)',
        type: 'multiple_choice',
        items: chapter1CheckItems
      },
      {
        id: 'try-n3-c1-check-p2',
        title: 'Kiểm tra Check 📖 Phần 2 (6 câu)',
        type: 'multiple_choice',
        items: chapter1Part2CheckItems
      },
      {
        id: 'try-n3-c2-check',
        title: 'Kiểm tra Check 📖 Phần 3 (5 câu)',
        type: 'multiple_choice',
        items: chapter2CheckItems
      },
      {
        id: 'try-n3-c2-check-p2',
        title: 'Kiểm tra Check 📖 Phần 4 (3 câu)',
        type: 'multiple_choice',
        items: chapter2Part2CheckItems
      },
      {
        id: 'try-n3-c1-matome',
        title: '🏆 Tổng ôn Chương 1: 富士登山 (15 câu chuẩn JLPT)',
        type: 'multiple_choice',
        items: chapter1MatomeItems
      },
      {
        id: 'try-n3-c2-matome',
        title: '🏆 Tổng ôn Chương 2: ぼくの犬、クロ (15 câu chuẩn JLPT)',
        type: 'multiple_choice',
        items: chapter2MatomeItems
      }
    ]
  }
];
