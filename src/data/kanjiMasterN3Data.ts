import type { Lesson } from './lessons';

export interface KanjiChar {
  char: string;
  hanViet: string;
  strokes: number;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  examples: { word: string; reading: string; meaning: string }[];
}

export const kanjiMasterN3Lessons: Lesson[] = [
  {
    id: 101,
    title: "Chương 1 - Bài 1: 生活 1 (起, 寝, 浴, 湯)",
    sections: [
      {
        id: "km-n3-c1-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c1-l1-1", "term": "起きる", "reading": "おきる", "answer": "Thức dậy (Tự động từ)", "meaning": "Thức dậy (Tự động từ)", "example": "休日はいつもより遅く起きる。\n(Ngày nghỉ thường thức dậy muộn hơn mọi khi.)" },
          { "id": "km-n3-c1-l1-2", "term": "起こる", "reading": "おこる", "answer": "Xảy ra (sự cố, động đất...)", "meaning": "Xảy ra (sự cố, động đất...)", "example": "昨夜、小さなじしんが起こった。\n(Đêm qua đã xảy ra một trận động đất nhỏ.)" },
          { "id": "km-n3-c1-l1-3", "term": "起こす", "reading": "おこす", "answer": "Đánh thức ai dậy (Tha động từ)", "meaning": "Đánh thức ai dậy (Tha động từ)", "example": "毎朝、母に起こしてもらっている。\n(Mỗi sáng tôi đều được mẹ đánh thức dậy.)" },
          { "id": "km-n3-c1-l1-4", "term": "寝室", "reading": "しんしつ", "answer": "Phòng ngủ", "meaning": "Phòng ngủ", "example": "寝室に新しいベッドを置いた。\n(Đặt chiếc giường mới vào phòng ngủ.)" },
          { "id": "km-n3-c1-l1-5", "term": "寝台車", "reading": "しんだいしゃ", "answer": "Toa xe giường nằm (tàu hoả)", "meaning": "Toa xe giường nằm (tàu hoả)", "example": "寝台車を利用して旅をする。\n(Đi du lịch bằng toa xe giường nằm.)" },
          { "id": "km-n3-c1-l1-6", "term": "浴びる", "reading": "あびる", "answer": "Tắm (vòi sen), hứng chịu", "meaning": "Tắm (vòi sen), hứng chịu", "example": "ジョギング後にシャワーを浴びる。\n(Tắm vòi sen sau khi chạy bộ.)" },
          { "id": "km-n3-c1-l1-7", "term": "日光浴", "reading": "にっこうよく", "answer": "Tắm nắng", "meaning": "Tắm nắng", "example": "ベランダで日光浴をする。\n(Tắm nắng ngoài ban công.)" },
          { "id": "km-n3-c1-l1-8", "term": "浴室", "reading": "よくしつ", "answer": "Phòng tắm", "meaning": "Phòng tắm", "example": "浴室のリフォームに百万円かかった。\n(Tốn một triệu yên để sửa chữa phòng tắm.)" },
          { "id": "km-n3-c1-l1-9", "term": "お湯", "reading": "おゆ", "answer": "Nước nóng, nước sôi", "meaning": "Nước nóng, nước sôi", "example": "お湯をわかしてコーヒーを入れる。\n(Đun nước sôi rồi pha cà phê.)" },
          { "id": "km-n3-c1-l1-10", "term": "熱湯", "reading": "ねっとう", "answer": "Nước sôi sùng sục", "meaning": "Nước sôi sùng sục", "example": "熱湯を入れて３分待ってください。\n(Hãy rót nước sôi vào và đợi 3 phút.)" },
          { "id": "km-n3-c1-l1-11", "term": "早起き", "reading": "はやおき", "answer": "Dậy sớm", "meaning": "Dậy sớm", "example": "早起きするのは気持ちがいい。\n(Dậy sớm thật là sảng khoái.)" },
          { "id": "km-n3-c1-l1-12", "term": "再起動", "reading": "さいきどう", "answer": "Khởi động lại (máy vi tính)", "meaning": "Khởi động lại (máy vi tính)", "example": "パソコンを再起動する。\n(Khởi động lại máy vi tính.)" },
          { "id": "km-n3-c1-l1-13", "term": "昼寝", "reading": "ひるね", "answer": "Ngủ trưa", "meaning": "Ngủ trưa", "example": "子どもが昼寝をする。\n(Đứa trẻ ngủ trưa.)" },
          { "id": "km-n3-c1-l1-14", "term": "寝かす", "reading": "ねかす", "answer": "Ru ngủ, cho ngủ (Tha động từ)", "meaning": "Ru ngủ, cho ngủ (Tha động từ)", "example": "子どもを寝かすのは私の役目だ。\n(Cho con ngủ là nhiệm vụ của tôi.)" },
          { "id": "km-n3-c1-l1-15", "term": "水浴び", "reading": "みずあび", "answer": "Tắm mát, vầy nước", "meaning": "Tắm mát, vầy nước", "example": "川で水浴びをする。\n(Tắm mát ở dưới sông.)" },
          { "id": "km-n3-c1-l1-16", "term": "冷水を浴びせる", "reading": "れいすいをあびせる", "answer": "Dội gáo nước lạnh (làm mất hứng)", "meaning": "Dội gáo nước lạnh (làm mất hứng)", "example": "クリスマス気分に冷水を浴びせる。\n(Dội một gáo nước lạnh vào không khí Giáng sinh.)" },
          { "id": "km-n3-c1-l1-17", "term": "海水浴", "reading": "かいすいよく", "answer": "Tắm biển", "meaning": "Tắm biển", "example": "家族で海水浴に行く。\n(Cả nhà đi tắm biển.)" },
          { "id": "km-n3-c1-l1-18", "term": "湯船", "reading": "ゆぶね", "answer": "Bồn tắm nước nóng", "meaning": "Bồn tắm nước nóng", "example": "ゆっくりと湯船につかる。\n(Thư thả ngâm mình trong bồn tắm.)" },
          { "id": "km-n3-c1-l1-19", "term": "浴衣", "reading": "ゆかた", "answer": "Áo yukata (Kimono mùa hè)", "meaning": "Áo yukata (Kimono mùa hè)", "example": "とくべつな言葉: 浴衣\n(Áo yukata - áo kimono mùa hè mỏng bằng vải cotton.)" },
          { "id": "km-n3-c1-l1-20", "term": "寝る", "reading": "ねる", "answer": "Ngủ (Tự động từ)", "meaning": "Ngủ (Tự động từ)", "example": "疲れたので早く寝る。\n(Vì mệt nên đi ngủ sớm.)" },
          { "id": "km-n3-c1-l1-21", "term": "浴びせる", "reading": "あびせる", "answer": "Dội, trút lên (Tha động từ)", "meaning": "Dội, trút lên (Tha động từ)", "example": "冷水を浴びせる / 質問を浴びせる。\n(Dội gáo nước lạnh / Dồn dập trút câu hỏi lên.)" }
        ]
      }
    ]
  },
  {
    id: 102,
    title: "Chương 1 - Bài 2: 生活 2 (洗, 濯, 干, 活)",
    sections: [
      {
        id: "km-n3-c1-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c1-l2-1", "term": "洗う", "reading": "あらう", "answer": "Rửa, giặt", "meaning": "Rửa, giặt", "example": "食器をきれいに洗う。\n(Rửa bát đĩa thật sạch sẽ.)" },
          { "id": "km-n3-c1-l2-2", "term": "洗剤", "reading": "せんざい", "answer": "Chất tẩy rửa, nước rửa chén, xà phòng", "meaning": "Chất tẩy rửa, nước rửa chén, xà phòng", "example": "新発売の洗剤が安く売っていた。\n(Loại chất tẩy rửa mới ra mắt đang được bán rẻ.)" },
          { "id": "km-n3-c1-l2-3", "term": "水洗", "reading": "すいせん", "answer": "Xả nước (bồn cầu tự xả)", "meaning": "Xả nước (bồn cầu tự xả)", "example": "昔は水洗トイレがめずらしかった。\n(Ngày xưa bồn cầu tự xả nước rất hiếm.)" },
          { "id": "km-n3-c1-l2-4", "term": "洗濯", "reading": "せんたく", "answer": "Giặt giũ", "meaning": "Giặt giũ", "example": "週に三回、洗濯する。\n(Giặt quần áo một tuần 3 lần.)" },
          { "id": "km-n3-c1-l2-5", "term": "干物", "reading": "ひもの", "answer": "Đồ khô (cá khô, mực khô...)", "meaning": "Đồ khô (cá khô, mực khô...)", "example": "つった魚で干物を作る。\n(Làm cá khô từ cá vừa câu được.)" },
          { "id": "km-n3-c1-l2-6", "term": "若干名", "reading": "じゃっかんめい", "answer": "Một vài người, một số ít", "meaning": "Một vài người, một số ít", "example": "社員を若干名さいようする。\n(Tuyển dụng một vài nhân viên.)" },
          { "id": "km-n3-c1-l2-7", "term": "生活", "reading": "せいかつ", "answer": "Cuộc sống, sinh hoạt", "meaning": "Cuộc sống, sinh hoạt", "example": "生活のため、アルバイトをする。\n(Đi làm thêm để trang trải cuộc sống.)" },
          { "id": "km-n3-c1-l2-8", "term": "活動", "reading": "かつどう", "answer": "Hoạt động", "meaning": "Hoạt động", "example": "富士山の火山活動を調査する。\n(Điều tra hoạt động núi lửa của núi Phú Sĩ.)" },
          { "id": "km-n3-c1-l2-9", "term": "活発な", "reading": "かっぱつな", "answer": "Hoạt bát, năng động, sôi nổi", "meaning": "Hoạt bát, năng động, sôi nổi", "example": "赤ちゃんが活発に動きまわる。\n(Em bé bò khắp nơi một cách hiếu động.)" },
          { "id": "km-n3-c1-l2-10", "term": "手洗い", "reading": "てあらい", "answer": "Rửa tay, nhà vệ sinh", "meaning": "Rửa tay, nhà vệ sinh", "example": "毎日うがいと手洗いをしている。\n(Ngày nào tôi cũng súc họng và rửa tay.)" },
          { "id": "km-n3-c1-l2-11", "term": "洗面所", "reading": "せんめんじょ", "answer": "Chỗ/bồn rửa mặt", "meaning": "Chỗ/bồn rửa mặt", "example": "洗面所で歯をみがく。\n(Đánh răng ở chỗ bồn rửa mặt.)" },
          { "id": "km-n3-c1-l2-12", "term": "洗濯物", "reading": "せんたくもの", "answer": "Quần áo giặt", "meaning": "Quần áo giặt", "example": "洗濯物をたたむ。\n(Gấp quần áo giặt.)" },
          { "id": "km-n3-c1-l2-13", "term": "干す", "reading": "ほす", "answer": "Phơi khô", "meaning": "Phơi khô", "example": "シャツのしわをのばして干す。\n(Vuốt phẳng nếp nhăn áo sơ mi rồi đem phơi.)" },
          { "id": "km-n3-c1-l2-14", "term": "食生活", "reading": "しょくせいかつ", "answer": "Thói quen ăn uống, đời sống ẩm thực", "meaning": "Thói quen ăn uống, đời sống ẩm thực", "example": "食生活に気をつける。\n(Chú ý đến chế độ ăn uống hằng ngày.)" },
          { "id": "km-n3-c1-l2-15", "term": "活気", "reading": "かっき", "answer": "Sôi nổi, tràn đầy sức sống", "meaning": "Sôi nổi, tràn đầy sức sống", "example": "活気のある職場。\n(Nơi làm việc tràn đầy năng lượng sôi nổi.)" },
          { "id": "km-n3-c1-l2-16", "term": "活用", "reading": "かつよう", "answer": "Vận dụng, tận dụng", "meaning": "Vận dụng, tận dụng", "example": "通学の時間を活用して単語を覚える。\n(Tận dụng thời gian đi học để ghi nhớ từ vựng.)" },
          { "id": "km-n3-c1-l2-17", "term": "干渉", "reading": "かんしょう", "answer": "Can thiệp, xen vào", "meaning": "Can thiệp, xen vào", "example": "とくべつな言葉: 干渉\n(Can thiệp, xen vào chuyện của người khác.)" },
          { "id": "km-n3-c1-l2-18", "term": "干る", "reading": "ひる", "answer": "Khô cạn, rút cạn (nước triều, ráo nước mắt...)", "meaning": "Khô cạn, rút cạn (nước triều, ráo nước mắt...)", "example": "潮が干る。\n(Thủy triều rút cạn.)" }
        ]
      }
    ]
  },
  {
    id: 103,
    title: "Chương 1 - Bài 3: ゴミ (拾, 捨, 燃, 袋)",
    sections: [
      {
        id: "km-n3-c1-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c1-l3-1", "term": "拾う", "reading": "ひろう", "answer": "Nhặt, lượm", "meaning": "Nhặt, lượm", "example": "海岸で貝を拾う。\n(Nhặt vỏ sò ở bờ biển.)" },
          { "id": "km-n3-c1-l3-2", "term": "拾得物", "reading": "しゅうとくぶつ", "answer": "Đồ nhặt được, vật rơi", "meaning": "Đồ nhặt được, vật rơi", "example": "拾得物を交番にとどけた。\n(Mang đồ nhặt được nộp cho bốt cảnh sát.)" },
          { "id": "km-n3-c1-l3-3", "term": "拾万円", "reading": "じゅうまんえん", "answer": "Mười vạn yên (100.000 yên)", "meaning": "Mười vạn yên (100.000 yên)", "example": "結婚祝いのつつみに拾万円と書く。\n(Viết 10 vạn yên lên phong bì mừng cưới.)" },
          { "id": "km-n3-c1-l3-4", "term": "捨てる", "reading": "すてる", "answer": "Vứt bỏ, ném bỏ", "meaning": "Vứt bỏ, ném bỏ", "example": "いらなくなった書類を捨てる。\n(Vứt bỏ những tài liệu không còn cần thiết.)" },
          { "id": "km-n3-c1-l3-5", "term": "四捨五入", "reading": "ししゃごにゅう", "answer": "Làm tròn số (4 bỏ 5 vào)", "meaning": "Làm tròn số (4 bỏ 5 vào)", "example": "小数点第一位を四捨五入する。\n(Làm tròn số ở chữ số thập phân thứ nhất.)" },
          { "id": "km-n3-c1-l3-6", "term": "燃える", "reading": "もえる", "answer": "Bốc cháy (Tự động từ)", "meaning": "Bốc cháy (Tự động từ)", "example": "火事でとなりのアパートが燃えた。\n(Căn hộ bên cạnh bốc cháy vì hỏa hoạn.)" },
          { "id": "km-n3-c1-l3-7", "term": "燃す", "reading": "もす", "answer": "Đốt (Tha động từ)", "meaning": "Đốt (Tha động từ)", "example": "落ち葉を集めて燃す。\n(Gom lá rụng lại rồi đốt.)" },
          { "id": "km-n3-c1-l3-8", "term": "燃料", "reading": "ねんりょう", "answer": "Nhiên liệu", "meaning": "Nhiên liệu", "example": "燃料を補給する。\n(Nạp thêm nhiên liệu.)" },
          { "id": "km-n3-c1-l3-9", "term": "袋", "reading": "ふくろ", "answer": "Cái túi, bao bì", "meaning": "Cái túi, bao bì", "example": "買った商品を袋に入れてもらう。\n(Nhờ nhân viên cho hàng đã mua vào túi.)" },
          { "id": "km-n3-c1-l3-10", "term": "紙袋", "reading": "かみぶくろ", "answer": "Túi giấy", "meaning": "Túi giấy", "example": "雨にぬれて紙袋がやぶれそうだ。\n(Túi giấy bị ướt mưa trông như sắp rách.)" },
          { "id": "km-n3-c1-l3-11", "term": "ゴミ拾い", "reading": "ゴミひろい", "answer": "Nhặt rác", "meaning": "Nhặt rác", "example": "近所のゴミ拾いをする。\n(Nhặt rác quanh khu vực sống.)" },
          { "id": "km-n3-c1-l3-12", "term": "タクシーを拾う", "reading": "タクシーをひろう", "answer": "Bắt taxi trên đường", "meaning": "Bắt taxi trên đường", "example": "道でタクシーを拾った。\n(Bắt taxi ở trên đường.)" },
          { "id": "km-n3-c1-l3-13", "term": "投げ捨て", "reading": "なげすて", "answer": "Vứt rác bừa bãi", "meaning": "Vứt rác bừa bãi", "example": "空き缶の投げ捨て禁止。\n(Cấm vứt vỏ lon nước rỗng bừa bãi.)" },
          { "id": "km-n3-c1-l3-14", "term": "燃やす", "reading": "もやす", "answer": "Đốt, nhen nhóm (tinh thần cạnh tranh)", "meaning": "Đốt, nhen nhóm (tinh thần cạnh tranh)", "example": "彼にライバル心を燃やす。\n(Nhen nhóm tinh thần cạnh tranh, xem anh ấy như đối thủ.)" },
          { "id": "km-n3-c1-l3-15", "term": "手袋", "reading": "てぶくろ", "answer": "Găng tay, bao tay", "meaning": "Găng tay, bao tay", "example": "寒い日は手袋をはめて出かける。\n(Ngày lạnh đeo găng tay rồi ra ngoài.)" },
          { "id": "km-n3-c1-l3-16", "term": "ビニール袋", "reading": "ビニールぶくろ", "answer": "Túi nilon", "meaning": "Túi nilon", "example": "ビニール袋にぬれたかさを入れた。\n(Cho cây dù bị ướt vào túi nilon.)" },
          { "id": "km-n3-c1-l3-17", "term": "足袋", "reading": "たび", "answer": "Tất xỏ ngón truyền thống Nhật (Tabi)", "meaning": "Tất xỏ ngón truyền thống Nhật (Tabi)", "example": "とくべつな言葉: 足袋\n(Tất xỏ ngón tabi đi cùng kimono/geta.)" },
          { "id": "km-n3-c1-l3-18", "term": "風袋", "reading": "ふうたい", "answer": "Trọng lượng bao bì (trừ bì)", "meaning": "Trọng lượng bao bì (trừ bì)", "example": "とくべつな言葉: 風袋\n(Vỏ bì, trọng lượng bao bì đóng gói sản phẩm.)" }
        ]
      }
    ]
  },
  {
    id: 104,
    title: "Chương 1 - Bài 4: カレンダー 1 (曜, 末, 昨, 翌)",
    sections: [
      {
        id: "km-n3-c1-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c1-l4-1", "term": "日曜日", "reading": "にちようび", "answer": "Chủ Nhật", "meaning": "Chủ Nhật", "example": "休みは日曜日しかない。\n(Ngày nghỉ chỉ có độc mỗi Chủ Nhật.)" },
          { "id": "km-n3-c1-l4-2", "term": "火曜日", "reading": "かようび", "answer": "Thứ Ba", "meaning": "Thứ Ba", "example": "都合がいいのは火曜日だ。\n(Thời gian thuận tiện nhất là thứ Ba.)" },
          { "id": "km-n3-c1-l4-3", "term": "週末", "reading": "しゅうまつ", "answer": "Cuối tuần", "meaning": "Cuối tuần", "example": "週末はたいてい家でゆっくり休む。\n(Cuối tuần tôi thường ở nhà nghỉ ngơi thong thả.)" },
          { "id": "km-n3-c1-l4-4", "term": "期末", "reading": "きまつ", "answer": "Cuối kỳ (kỳ thi cuối kỳ)", "meaning": "Cuối kỳ (kỳ thi cuối kỳ)", "example": "明日、期末テストが行われる。\n(Ngày mai kỳ thi cuối kỳ sẽ diễn ra.)" },
          { "id": "km-n3-c1-l4-5", "term": "結末", "reading": "けつまつ", "answer": "Kết cục, hồi kết", "meaning": "Kết cục, hồi kết", "example": "事件の意外な結末を知った。\n(Tôi đã biết được cái kết bất ngờ của vụ việc.)" },
          { "id": "km-n3-c1-l4-6", "term": "末", "reading": "すえ", "answer": "Cuối (tháng, năm...)", "meaning": "Cuối (tháng, năm...)", "example": "今月の末に、家族が日本に遊びに来る。\n(Cuối tháng này gia đình tôi sẽ sang Nhật chơi.)" },
          { "id": "km-n3-c1-l4-7", "term": "昨晩", "reading": "さくばん", "answer": "Tối hôm qua", "meaning": "Tối hôm qua", "example": "昨晩、父が遅く帰ってきた。\n(Tối qua bố tôi về nhà muộn.)" },
          { "id": "km-n3-c1-l4-8", "term": "昨年", "reading": "さくねん", "answer": "Năm ngoái", "meaning": "Năm ngoái", "example": "昨年、むすめが結婚した。\n(Năm ngoái con gái tôi đã kết hôn.)" },
          { "id": "km-n3-c1-l4-9", "term": "翌朝", "reading": "よくあさ", "answer": "Sáng ngày hôm sau", "meaning": "Sáng ngày hôm sau", "example": "午前中に出せば、翌朝にとどく。\n(Nếu gửi trong buổi sáng thì sáng hôm sau sẽ tới nơi.)" },
          { "id": "km-n3-c1-l4-10", "term": "翌日", "reading": "よくじつ", "answer": "Ngày hôm sau", "meaning": "Ngày hôm sau", "example": "台風の翌日はいい天気だった。\n(Ngày hôm sau bão thời tiết rất đẹp.)" },
          { "id": "km-n3-c1-l4-11", "term": "曜日", "reading": "ようび", "answer": "Thứ (trong tuần)", "meaning": "Thứ (trong tuần)", "example": "働ける曜日を教えてください。\n(Hãy cho biết bạn có thể đi làm vào những thứ mấy.)" },
          { "id": "km-n3-c1-l4-12", "term": "木曜日", "reading": "もくようび", "answer": "Thứ Năm", "meaning": "Thứ Năm", "example": "今週の木曜日にコンサートに行く。\n(Thứ Năm tuần này tôi sẽ đi xem ca nhạc.)" },
          { "id": "km-n3-c1-l4-13", "term": "月末", "reading": "げつまつ", "answer": "Cuối tháng", "meaning": "Cuối tháng", "example": "月末までに借金を返すつもりだ。\n(Tôi dự định trả nợ trước cuối tháng.)" },
          { "id": "km-n3-c1-l4-14", "term": "末っ子", "reading": "すえっこ", "answer": "Con út", "meaning": "Con út", "example": "私は三人兄弟の末っ子です。\n(Tôi là con út trong ba anh em.)" },
          { "id": "km-n3-c1-l4-15", "term": "年末", "reading": "ねんまつ", "answer": "Cuối năm", "meaning": "Cuối năm", "example": "年末は海外ですごす予定だ。\n(Tôi dự định đón cuối năm ở nước ngoài.)" },
          { "id": "km-n3-c1-l4-16", "term": "昨日", "reading": "さくじつ", "answer": "Ngày hôm qua (văn phong trang trọng)", "meaning": "Ngày hôm qua (văn phong trang trọng)", "example": "昨日はありがとうございました。\n(Cảm ơn vì ngày hôm qua.)" },
          { "id": "km-n3-c1-l4-17", "term": "昨夜", "reading": "さくや", "answer": "Đêm hôm qua", "meaning": "Đêm hôm qua", "example": "昨夜から熱が下がらない。\n(Từ đêm qua tới giờ vẫn không hạ sốt.)" },
          { "id": "km-n3-c1-l4-18", "term": "翌年", "reading": "よくとし", "answer": "Năm sau, năm tiếp theo", "meaning": "Năm sau, năm tiếp theo", "example": "翌年、彼はやっと大学を卒業した。\n(Sang năm sau, cuối cùng anh ấy cũng tốt nghiệp đại học.)" },
          { "id": "km-n3-c1-l4-19", "term": "一昨日", "reading": "おととい", "answer": "Ngày hôm kia", "meaning": "Ngày hôm kia", "example": "とくべつな言葉: 一昨日\n(Ngày hôm kia / hai ngày trước.)" },
          { "id": "km-n3-c1-l4-20", "term": "一昨年", "reading": "おととし", "answer": "Năm kia", "meaning": "Năm kia", "example": "とくべつな言葉: 一昨年\n(Năm kia / hai năm trước.)" },
          { "id": "km-n3-c1-l4-21", "term": "末子", "reading": "ばっし", "answer": "Con út (từ đặc biệt)", "meaning": "Con út (từ đặc biệt)", "example": "とくべつな言葉: 末子\n(Đứa con sinh sau cùng trong gia đình.)" }
        ]
      }
    ]
  },
  {
    id: 105,
    title: "Chương 1 - Bài 5: カレンダー 2 (予, 定, 用, 事)",
    sections: [
      {
        id: "km-n3-c1-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c1-l5-1", "term": "予定", "reading": "よてい", "answer": "Dự định, kế hoạch", "meaning": "Dự định, kế hoạch", "example": "旅行の予定を決める。\n(Lên kế hoạch dự định cho chuyến du lịch.)" },
          { "id": "km-n3-c1-l5-2", "term": "天気予報", "reading": "てんきよほう", "answer": "Dự báo thời tiết", "meaning": "Dự báo thời tiết", "example": "テレビの天気予報をチェックする。\n(Xem dự báo thời tiết trên TV.)" },
          { "id": "km-n3-c1-l5-3", "term": "定年", "reading": "ていねん", "answer": "Tuổi về hưu", "meaning": "Tuổi về hưu", "example": "父は来年、定年を迎える。\n(Bố tôi sang năm sẽ đến tuổi về hưu.)" },
          { "id": "km-n3-c1-l5-4", "term": "定か", "reading": "さだか", "answer": "Rõ ràng, chắc chắn", "meaning": "Rõ ràng, chắc chắn", "example": "彼の行き先は定かではない。\n(Nơi đến của anh ấy không rõ ràng.)" },
          { "id": "km-n3-c1-l5-5", "term": "定める", "reading": "さだめる", "answer": "Quy định, ban hành", "meaning": "Quy định, ban hành", "example": "学校の規則を定める。\n(Đặt ra quy định của nhà trường.)" },
          { "id": "km-n3-c1-l5-6", "term": "用いる", "reading": "もちいる", "answer": "Sử dụng, dùng đến", "meaning": "Sử dụng, dùng đến", "example": "この機械は広く用いられている。\n(Chiếc máy này đang được sử dụng rộng rãi.)" },
          { "id": "km-n3-c1-l5-7", "term": "子供用", "reading": "こどもよう", "answer": "Dành cho trẻ em", "meaning": "Dành cho trẻ em", "example": "子供用のいすを買う。\n(Mua chiếc ghế dành cho trẻ con.)" },
          { "id": "km-n3-c1-l5-8", "term": "利用", "reading": "りよう", "answer": "Lợi dụng, tận dụng, sử dụng", "meaning": "Lợi dụng, tận dụng, sử dụng", "example": "出世のために人を利用する。\n(Lợi dụng người khác để thăng tiến.)" },
          { "id": "km-n3-c1-l5-9", "term": "用事", "reading": "ようじ", "answer": "Việc bận, công việc riêng", "meaning": "Việc bận, công việc riêng", "example": "急な用事で外出する。\n(Đi ra ngoài vì có việc gấp.)" },
          { "id": "km-n3-c1-l5-10", "term": "大事な", "reading": "だいじな", "answer": "Quan trọng", "meaning": "Quan trọng", "example": "大事な写真をしまっておく。\n(Cất giữ cẩn thận những bức ảnh quan trọng.)" },
          { "id": "km-n3-c1-l5-11", "term": "予習", "reading": "よしゅう", "answer": "Chuẩn bị bài trước", "meaning": "Chuẩn bị bài trước", "example": "毎日、授業の予習を行う。\n(Mỗi ngày đều chuẩn bị bài trước giờ học.)" },
          { "id": "km-n3-c1-l5-12", "term": "定まる", "reading": "さだまる", "answer": "Ổn định, được xác định, lắng xuống (Tự động từ)", "meaning": "Ổn định, được xác định, lắng xuống (Tự động từ)", "example": "彼はなかなか仕事が定まらない。\n(Công việc của anh ấy mãi mà chưa ổn định.)" },
          { "id": "km-n3-c1-l5-13", "term": "定規", "reading": "じょうぎ", "answer": "Cây thước kẻ", "meaning": "Cây thước kẻ", "example": "定規で線を引く。\n(Kẻ đường thẳng bằng thước kẻ.)" },
          { "id": "km-n3-c1-l5-14", "term": "原稿用紙", "reading": "げんこうようし", "answer": "Giấy viết bài văn kẻ ô (bản thảo)", "meaning": "Giấy viết bài văn kẻ ô (bản thảo)", "example": "原稿用紙に作文を書いた。\n(Viết văn trên giấy kẻ ô bản thảo.)" },
          { "id": "km-n3-c1-l5-15", "term": "事", "reading": "こと", "answer": "Sự tình, sự việc", "meaning": "Sự tình, sự việc", "example": "ことの成り行きを見守る。\n(Dõi theo diễn biến của sự việc.)" },
          { "id": "km-n3-c1-l5-16", "term": "工事", "reading": "こうじ", "answer": "Công trường, thi công", "meaning": "Công trường, thi công", "example": "電気工事が行われる。\n(Công trình thi công điện đang được thực hiện.)" },
          { "id": "km-n3-c1-l5-17", "term": "習い事", "reading": "ならいごと", "answer": "Học năng khiếu", "meaning": "Học năng khiếu", "example": "習い事を始める。\n(Bắt đầu đi học một môn năng khiếu.)" },
          { "id": "km-n3-c1-l5-18", "term": "食事", "reading": "しょくじ", "answer": "Bữa ăn, dùng bữa", "meaning": "Bữa ăn, dùng bữa", "example": "食事の準備をする。\n(Chuẩn bị bữa ăn.)" },
          { "id": "km-n3-c1-l5-19", "term": "好事家", "reading": "こうずか", "answer": "Người có sở thích độc lạ / người hiếu kỳ", "meaning": "Người có sở thích độc lạ / người hiếu kỳ", "example": "とくべつな言葉: 好事家\n(Người có thú tiêu khiển kỳ lạ / người tò mò thích chuyện lạ.)" }
        ]
      }
    ]
  },
  {
    id: 201,
    title: "Chương 2 - Bài 1: 室内 1 (押, 引, 取, 消)",
    sections: [
      {
        id: "km-n3-c2-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c2-l1-1", "term": "押す", "reading": "おす", "answer": "Ấn, bấm nút, đẩy", "meaning": "Ấn, bấm nút, đẩy", "example": "ボタンを押して、係の人を呼ぶ。\n(Bấm nút để gọi người phụ trách.)" },
          { "id": "km-n3-c2-l1-2", "term": "押印", "reading": "おういん", "answer": "Đóng dấu", "meaning": "Đóng dấu", "example": "この書類にはサインと押印が必要だ。\n(Giấy tờ này cần có chữ ký và đóng dấu.)" },
          { "id": "km-n3-c2-l1-3", "term": "押さえる", "reading": "おさえる", "answer": "Đè chặt, bịt giữ (vết thương)", "meaning": "Đè chặt, bịt giữ (vết thương)", "example": "きずぐちをハンカチで押さえた。\n(Lấy khăn tay bịt giữ vết thương.)" },
          { "id": "km-n3-c2-l1-4", "term": "腰が引ける", "reading": "こしがひける", "answer": "Nhụt chí, sợ run người, co rúm", "meaning": "Nhụt chí, sợ run người, co rúm", "example": "高いところは、こしが引ける。\n(Chỗ cao khiến tôi sợ run người.)" },
          { "id": "km-n3-c2-l1-5", "term": "強引に", "reading": "ごういんに", "answer": "Một cách cưỡng ép, gượng gạo", "meaning": "Một cách cưỡng ép, gượng gạo", "example": "プロジェクトを強引に進める。\n(Đẩy mạnh dự án một cách ép buộc/gượng gạo.)" },
          { "id": "km-n3-c2-l1-6", "term": "取る", "reading": "とる", "answer": "Bắt lấy, lấy", "meaning": "Bắt lấy, lấy", "example": "投げたボールを取る。\n(Bắt lấy quả bóng được ném tới.)" },
          { "id": "km-n3-c2-l1-7", "term": "取材", "reading": "しゅざい", "answer": "Thu thập tin tức, tác nghiệp phỏng vấn", "meaning": "Thu thập tin tức, tác nghiệp phỏng vấn", "example": "新聞の取材を受ける。\n(Nhận phỏng vấn tác nghiệp của báo chí.)" },
          { "id": "km-n3-c2-l1-8", "term": "消える", "reading": "きえる", "answer": "Tắt, lụi tắt (Tự động từ)", "meaning": "Tắt, lụi tắt (Tự động từ)", "example": "ろうそくの火が消える。\n(Ngọn lửa nến vụt tắt.)" },
          { "id": "km-n3-c2-l1-9", "term": "消す", "reading": "けす", "answer": "Dập tắt, tắt (Tha động từ)", "meaning": "Dập tắt, tắt (Tha động từ)", "example": "タバコの火を消す。\n(Dập tắt tàn thuốc lá.)" },
          { "id": "km-n3-c2-l1-10", "term": "消防車", "reading": "しょうぼうしゃ", "answer": "Xe cứu hỏa", "meaning": "Xe cứu hỏa", "example": "消防車が十台出動した。\n(10 chiếc xe cứu hỏa đã xuất động.)" },
          { "id": "km-n3-c2-l1-11", "term": "押される", "reading": "おされる", "answer": "Bị xô đẩy", "meaning": "Bị xô đẩy", "example": "電車でせなかを押された。\n(Bị đẩy vào lưng trên tàu điện.)" },
          { "id": "km-n3-c2-l1-12", "term": "引く", "reading": "ひく", "answer": "Giật, kéo (dây cương)", "meaning": "Giật, kéo (dây cương)", "example": "馬のたづなを引く。\n(Giật dây cương ngựa.)" },
          { "id": "km-n3-c2-l1-13", "term": "引火", "reading": "いんか", "answer": "Bắt lửa, cháy lan", "meaning": "Bắt lửa, cháy lan", "example": "火がガソリンに引火した。\n(Lửa bén vào xăng bốc cháy.)" },
          { "id": "km-n3-c2-l1-14", "term": "引き出す", "reading": "ひきだす", "answer": "Rút tiền ra", "meaning": "Rút tiền ra", "example": "銀行でお金をひきだす。\n(Rút tiền ở ngân hàng.)" },
          { "id": "km-n3-c2-l1-15", "term": "引用", "reading": "いんよう", "answer": "Trích dẫn", "meaning": "Trích dẫn", "example": "有名な小説から引用する。\n(Trích dẫn từ cuốn tiểu thuyết nổi tiếng.)" },
          { "id": "km-n3-c2-l1-16", "term": "取り消す", "reading": "とりけす", "answer": "Hủy bỏ (lịch hẹn, đơn hàng)", "meaning": "Hủy bỏ (lịch hẹn, đơn hàng)", "example": "忘年会の予約をとりけす。\n(Hủy lịch đặt chỗ tiệc tất niên.)" },
          { "id": "km-n3-c2-l1-17", "term": "消しゴム", "reading": "けしゴム", "answer": "Cục tẩy", "meaning": "Cục tẩy", "example": "けしゴムをゆかに落とした。\n(Đánh rơi cục tẩy xuống sàn nhà.)" },
          { "id": "km-n3-c2-l1-18", "term": "消化", "reading": "しょうか", "answer": "Tiêu hóa", "meaning": "Tiêu hóa", "example": "天ぷらは消化に悪い。\n(Món tempura khó tiêu hóa.)" },
          { "id": "km-n3-c2-l1-19", "term": "引ける", "reading": "ひける", "answer": "Co rúm, thoái lui, nhụt chí / tan (học, làm)", "meaning": "Co rúm, thoái lui, nhụt chí / tan (học, làm)", "example": "高いところは、こしが引ける。\n(Chỗ cao khiến tôi sợ run người / co rúm lại.)" }
        ]
      }
    ]
  },
  {
    id: 202,
    title: "Chương 2 - Bài 2: 室内 2 (戸, 窓, 階, 段)",
    sections: [
      {
        id: "km-n3-c2-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c2-l2-1", "term": "戸", "reading": "と", "answer": "Cánh cửa", "meaning": "Cánh cửa", "example": "戸が閉まる。\n(Cánh cửa đóng lại.)" },
          { "id": "km-n3-c2-l2-2", "term": "戸外", "reading": "こがい", "answer": "Ngoài trời", "meaning": "Ngoài trời", "example": "戸外で昼寝する。\n(Ngủ trưa ở ngoài trời.)" },
          { "id": "km-n3-c2-l2-3", "term": "門戸", "reading": "もんこ", "answer": "Cửa ngõ (mở cửa hội nhập)", "meaning": "Cửa ngõ (mở cửa hội nhập)", "example": "外国に門戸を開く。\n(Mở cửa cho nước ngoài.)" },
          { "id": "km-n3-c2-l2-4", "term": "窓", "reading": "まど", "answer": "Cửa sổ", "meaning": "Cửa sổ", "example": "窓をあけて空気を入れかえる。\n(Mở cửa sổ để đổi không khí.)" },
          { "id": "km-n3-c2-l2-5", "term": "窓ガラス", "reading": "まどガラス", "answer": "Kính cửa sổ", "meaning": "Kính cửa sổ", "example": "窓ガラスをきれいにふく。\n(Lau kính cửa sổ thật sạch.)" },
          { "id": "km-n3-c2-l2-6", "term": "車窓", "reading": "しゃそう", "answer": "Cửa sổ tàu xe", "meaning": "Cửa sổ tàu xe", "example": "車窓からのながめは最高だった。\n(Tầm nhìn ngắm cảnh từ cửa sổ tàu xe thật tuyệt vời.)" },
          { "id": "km-n3-c2-l2-7", "term": "六階", "reading": "ろっかい", "answer": "Tầng sáu", "meaning": "Tầng sáu", "example": "パソコン売り場は六階です。\n(Khu bán máy tính ở tầng 6.)" },
          { "id": "km-n3-c2-l2-8", "term": "階段を下る", "reading": "かいだんをくだる", "answer": "Đi xuống cầu thang", "meaning": "Đi xuống cầu thang", "example": "ゆっくり階段を下る。\n(Thong thả bước xuống cầu thang.)" },
          { "id": "km-n3-c2-l2-9", "term": "石段", "reading": "いしだん", "answer": "Bậc thang đá", "meaning": "Bậc thang đá", "example": "神社の石段を上る。\n(Bước lên các bậc thang đá của đền thờ.)" },
          { "id": "km-n3-c2-l2-10", "term": "手段", "reading": "しゅだん", "answer": "Phương thức, thủ đoạn, cách thức", "meaning": "Phương thức, thủ đoạn, cách thức", "example": "目的のためには手段を選ばない。\n(Không từ bất kỳ thủ đoạn/cách thức nào để đạt mục đích.)" },
          { "id": "km-n3-c2-l2-11", "term": "井戸水", "reading": "いどみず", "answer": "Nước giếng", "meaning": "Nước giếng", "example": "井戸水を飲む。\n(Uống nước giếng khoan/giếng khơi.)" },
          { "id": "km-n3-c2-l2-12", "term": "一戸建て", "reading": "いっこだて", "answer": "Nhà riêng lẻ, nhà mặt đất", "meaning": "Nhà riêng lẻ, nhà mặt đất", "example": "一戸建てを建てる。\n(Xây căn nhà riêng.)" },
          { "id": "km-n3-c2-l2-13", "term": "同窓会", "reading": "どうそうかい", "answer": "Buổi họp lớp, hội đồng khóa", "meaning": "Buổi họp lớp, hội đồng khóa", "example": "同窓会に出る。\n(Tham dự buổi họp lớp.)" },
          { "id": "km-n3-c2-l2-14", "term": "窓ガラスが割れる", "reading": "まどガラスがわれる", "answer": "Vỡ kính cửa sổ", "meaning": "Vỡ kính cửa sổ", "example": "窓ガラスが、われてしまった。\n(Kính cửa sổ đã bị vỡ toang.)" },
          { "id": "km-n3-c2-l2-15", "term": "窓口", "reading": "まどぐち", "answer": "Quầy thủ tục, quầy giao dịch", "meaning": "Quầy thủ tục, quầy giao dịch", "example": "銀行の窓口で手続きをする。\n(Làm thủ tục tại quầy giao dịch ngân hàng.)" },
          { "id": "km-n3-c2-l2-16", "term": "四階", "reading": "よんかい", "answer": "Tầng bốn", "meaning": "Tầng bốn", "example": "エレベーターが四階に止まった。\n(Thang máy dừng lại ở tầng 4.)" },
          { "id": "km-n3-c2-l2-17", "term": "らせん階段", "reading": "らせんかいだん", "answer": "Cầu thang xoắn ốc", "meaning": "Cầu thang xoắn ốc", "example": "らせん階段を下りる。\n(Đi xuống cầu thang hình xoắn ốc.)" },
          { "id": "km-n3-c2-l2-18", "term": "段階", "reading": "だんかい", "answer": "Giai đoạn, từng bước", "meaning": "Giai đoạn, từng bước", "example": "段階を追って説明する。\n(Giải thích theo từng giai đoạn/bước.)" }
        ]
      }
    ]
  },
  {
    id: 203,
    title: "Chương 2 - Bài 3: 植物 (植, 葉, 実, 根)",
    sections: [
      {
        id: "km-n3-c2-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c2-l3-1", "term": "植える", "reading": "うえる", "answer": "Trồng cây (Tha động từ)", "meaning": "Trồng cây (Tha động từ)", "example": "山に木を植える。\n(Trồng cây trên núi.)" },
          { "id": "km-n3-c2-l3-2", "term": "植物", "reading": "しょくぶつ", "answer": "Thực vật, cây cỏ", "meaning": "Thực vật, cây cỏ", "example": "ベランダで植物を育てる。\n(Trồng cây cối ở ban công.)" },
          { "id": "km-n3-c2-l3-3", "term": "移植", "reading": "いしょく", "answer": "Cấy ghép (phẫu thuật cấy ghép)", "meaning": "Cấy ghép (phẫu thuật cấy ghép)", "example": "移植手術を受ける。\n(Nhận phẫu thuật cấy ghép tạng.)" },
          { "id": "km-n3-c2-l3-4", "term": "葉", "reading": "は", "answer": "Lá cây", "meaning": "Lá cây", "example": "いちょうの葉が黄色くなる。\n(Lá cây ngân hạnh chuyển sang màu vàng.)" },
          { "id": "km-n3-c2-l3-5", "term": "言葉", "reading": "ことば", "answer": "Từ ngữ, lời nói", "meaning": "Từ ngữ, lời nói", "example": "新しい言葉を覚える。\n(Học từ mới.)" },
          { "id": "km-n3-c2-l3-6", "term": "落ち葉", "reading": "おちば", "answer": "Lá rụng", "meaning": "Lá rụng", "example": "落ち葉をほうきで集める。\n(Quét gom lá rụng bằng chổi.)" },
          { "id": "km-n3-c2-l3-7", "term": "実がなる", "reading": "みがなる", "answer": "Ra quả, kết trái", "meaning": "Ra quả, kết trái", "example": "トマトの実がなった。\n(Cây cà chua đã đậu quả.)" },
          { "id": "km-n3-c2-l3-8", "term": "実現", "reading": "じつげん", "answer": "Hiện thực hóa", "meaning": "Hiện thực hóa", "example": "夢を実現させる。\n(Biến giấc mơ thành hiện thực.)" },
          { "id": "km-n3-c2-l3-9", "term": "実家", "reading": "じっか", "answer": "Nhà bố mẹ ruột", "meaning": "Nhà bố mẹ ruột", "example": "正月に実家に帰る。\n(Về nhà bố mẹ đẻ vào dịp Tết.)" },
          { "id": "km-n3-c2-l3-10", "term": "根元", "reading": "ねもと", "answer": "Gốc cây", "meaning": "Gốc cây", "example": "木を根元から切り倒す。\n(Chặt đốn ngã cây từ sát gốc.)" },
          { "id": "km-n3-c2-l3-11", "term": "植わる", "reading": "うわる", "answer": "Được trồng (Tự động từ)", "meaning": "Được trồng (Tự động từ)", "example": "畑にじゃがいもが植わっている。\n(Khoai tây đang được trồng trên ruộng.)" },
          { "id": "km-n3-c2-l3-12", "term": "植木", "reading": "うえき", "answer": "Cây trồng trong chậu, cây cảnh", "meaning": "Cây trồng trong chậu, cây cảnh", "example": "植木に水をやる。\n(Tưới nước cho cây cảnh.)" },
          { "id": "km-n3-c2-l3-13", "term": "紅葉", "reading": "こうよう", "answer": "Lá đỏ mùa thu", "meaning": "Lá đỏ mùa thu", "example": "紅葉を見に行く。\n(Đi ngắm lá đỏ mùa thu.)" },
          { "id": "km-n3-c2-l3-14", "term": "実を結ぶ", "reading": "みをむすぶ", "answer": "Đơm hoa kết trái, thành công", "meaning": "Đơm hoa kết trái, thành công", "example": "努力が実を結ぶ。\n(Nỗ lực đã đơm hoa kết trái / đạt được thành quả.)" },
          { "id": "km-n3-c2-l3-15", "term": "実力", "reading": "じつりょく", "answer": "Thực lực", "meaning": "Thực lực", "example": "実力を試す。\n(Thử thách thực lực của bản thân.)" },
          { "id": "km-n3-c2-l3-16", "term": "木の根", "reading": "きのね", "answer": "Rễ cây", "meaning": "Rễ cây", "example": "木の根を薬として飲む。\n(Sắc rễ cây làm thuốc uống.)" },
          { "id": "km-n3-c2-l3-17", "term": "屋根", "reading": "やね", "answer": "Mái nhà", "meaning": "Mái nhà", "example": "屋根につもった雪を下ろす。\n(Dọn tuyết đọng trên mái nhà xuống.)" },
          { "id": "km-n3-c2-l3-18", "term": "根本", "reading": "こんぽん", "answer": "Căn bản, từ gốc rễ", "meaning": "Căn bản, từ gốc rễ", "example": "考え方が根本からちがう。\n(Cách suy nghĩ khác nhau từ tận gốc rễ.)" },
          { "id": "km-n3-c2-l3-19", "term": "紅葉", "reading": "こうよう / もみじ", "answer": "Lá đỏ mùa thu (Momiji)", "meaning": "Lá đỏ mùa thu (Momiji)", "example": "とくべつな言葉: 紅葉\n(Lá đỏ mùa thu / cây phong lá đỏ.)" },
          { "id": "km-n3-c2-l3-20", "term": "実る", "reading": "みのる", "answer": "Đơm hoa kết trái, chín (lúa, quả), đạt thành quả", "meaning": "Đơm hoa kết trái, chín (lúa, quả), đạt thành quả", "example": "稲が実る。/ 努力が実る。\n(Lúa chín trĩu hạt. / Nỗ lực đơm hoa kết trái.)" }
        ]
      }
    ]
  },
  {
    id: 204,
    title: "Chương 2 - Bài 4: 建築 (建, 築, 構, 造)",
    sections: [
      {
        id: "km-n3-c2-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c2-l4-1", "term": "建つ", "reading": "たつ", "answer": "Được xây dựng, mọc lên (Tự động từ)", "meaning": "Được xây dựng, mọc lên (Tự động từ)", "example": "家の前にマンションが建つ。\n(Một tòa chung cư mọc lên trước nhà.)" },
          { "id": "km-n3-c2-l4-2", "term": "建立", "reading": "こんりゅう", "answer": "Xây cất (chùa chiền, đền đài)", "meaning": "Xây cất (chùa chiền, đền đài)", "example": "新しく寺を建立する。\n(Xây cất ngôi chùa mới.)" },
          { "id": "km-n3-c2-l4-3", "term": "築く", "reading": "きずく", "answer": "Xây đắp (đê điều, mối quan hệ)", "meaning": "Xây đắp (đê điều, mối quan hệ)", "example": "ていぼうを築く。\n(Đắp đê chắn sóng/nước.)" },
          { "id": "km-n3-c2-l4-4", "term": "改築", "reading": "かいちく", "answer": "Cải tạo kiến trúc, xây sửa lại", "meaning": "Cải tạo kiến trúc, xây sửa lại", "example": "古いアパートを改築する。\n(Cải tạo lại tòa chung cư cũ.)" },
          { "id": "km-n3-c2-l4-5", "term": "新築", "reading": "しんちく", "answer": "Xây dựng mới, căn hộ mới tinh", "meaning": "Xây dựng mới, căn hộ mới tinh", "example": "新築マンションを買う。\n(Mua căn hộ chung cư mới xây.)" },
          { "id": "km-n3-c2-l4-6", "term": "構える", "reading": "かまえる", "answer": "Mở tiệm, dựng lập, vào tư thế", "meaning": "Mở tiệm, dựng lập, vào tư thế", "example": "一等地に店を構える。\n(Mở cửa hàng ở vị trí đắc địa.)" },
          { "id": "km-n3-c2-l4-7", "term": "構造", "reading": "こうぞう", "answer": "Cấu tạo, kết cấu bên trong", "meaning": "Cấu tạo, kết cấu bên trong", "example": "機械の内部構造を知る。\n(Hiểu rõ kết cấu bên trong của máy móc.)" },
          { "id": "km-n3-c2-l4-8", "term": "造る", "reading": "つくる", "answer": "Đóng tàu, chế tạo", "meaning": "Đóng tàu, chế tạo", "example": "巨大な船を造る。\n(Đóng con tàu khổng lồ.)" },
          { "id": "km-n3-c2-l4-9", "term": "木造", "reading": "もくぞう", "answer": "Kết cấu bằng gỗ, nhà gỗ", "meaning": "Kết cấu bằng gỗ, nhà gỗ", "example": "木造の家でくらす。\n(Sống trong ngôi nhà bằng gỗ.)" },
          { "id": "km-n3-c2-l4-10", "term": "造花", "reading": "ぞうか", "answer": "Hoa giả, hoa nhân tạo", "meaning": "Hoa giả, hoa nhân tạo", "example": "造花のバラをかざる。\n(Trang trí hoa hồng giả.)" },
          { "id": "km-n3-c2-l4-11", "term": "建てる", "reading": "たてる", "answer": "Xây dựng (Tha động từ)", "meaning": "Xây dựng (Tha động từ)", "example": "マンションを建てる。\n(Xây dựng chung cư.)" },
          { "id": "km-n3-c2-l4-12", "term": "建築士", "reading": "けんちくし", "answer": "Kiến trúc sư", "meaning": "Kiến trúc sư", "example": "一級建築士を目指す。\n(Mục tiêu trở thành kiến trúc sư bậc một.)" },
          { "id": "km-n3-c2-l4-13", "term": "築30年", "reading": "ちくさんじゅうねん", "answer": "Đã xây dựng được 30 năm", "meaning": "Đã xây dựng được 30 năm", "example": "私の実家は今年で築30年になる。\n(Nhà bố mẹ tôi năm nay tròn 30 năm kể từ ngày xây.)" },
          { "id": "km-n3-c2-l4-14", "term": "構成", "reading": "こうせい", "answer": "Cấu thành, dàn dựng", "meaning": "Cấu thành, dàn dựng", "example": "番組を構成する。\n(Dàn dựng/cấu thành chương trình.)" },
          { "id": "km-n3-c2-l4-15", "term": "構内", "reading": "こうない", "answer": "Khuôn viên (nhà ga, trường học)", "meaning": "Khuôn viên (nhà ga, trường học)", "example": "駅の構内にレストランが出来た。\n(Một nhà hàng được mở trong khuôn viên nhà ga.)" },
          { "id": "km-n3-c2-l4-16", "term": "構う", "reading": "かまう", "answer": "Bận tâm, để ý, chăm sóc", "meaning": "Bận tâm, để ý, chăm sóc", "example": "彼は身なりに全くかまわない人だ。\n(Anh ta là người chẳng thèm bận tâm đến diện mạo.)" },
          { "id": "km-n3-c2-l4-17", "term": "建造物", "reading": "けんぞうぶつ", "answer": "Công trình kiến trúc lịch sử", "meaning": "Công trình kiến trúc lịch sử", "example": "あの橋は歴史的建造物だ。\n(Cây cầu kia là một công trình mang tính lịch sử.)" },
          { "id": "km-n3-c2-l4-18", "term": "造船", "reading": "ぞうせん", "answer": "Ngành đóng tàu thuyền", "meaning": "Ngành đóng tàu thuyền", "example": "造船業で有名な町。\n(Thành phố nổi tiếng với ngành đóng tàu thuyền.)" }
        ]
      }
    ]
  },
  {
    id: 205,
    title: "Chương 2 - Bài 5: 室内 3 (設, 柱, 庫, 向)",
    sections: [
      {
        id: "km-n3-c2-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c2-l5-1", "term": "設ける", "reading": "もうける", "answer": "Đặt ra, ban hành (quy tắc)", "meaning": "Đặt ra, ban hành (quy tắc)", "example": "新しいルールを設ける。\n(Đặt ra quy tắc mới.)" },
          { "id": "km-n3-c2-l5-2", "term": "建設会社", "reading": "けんせつがいしゃ", "answer": "Công ty xây dựng", "meaning": "Công ty xây dựng", "example": "建設会社で働く。\n(Làm việc tại công ty xây dựng.)" },
          { "id": "km-n3-c2-l5-3", "term": "設定", "reading": "せってい", "answer": "Cài đặt, thiết lập cấu hình", "meaning": "Cài đặt, thiết lập cấu hình", "example": "パソコンのメールを設定する。\n(Cài đặt email trên máy vi tính.)" },
          { "id": "km-n3-c2-l5-4", "term": "柱", "reading": "はしら", "answer": "Cột trụ nhà", "meaning": "Cột trụ nhà", "example": "太い柱が家を支えている。\n(Cột trụ to chống đỡ cho cả căn nhà.)" },
          { "id": "km-n3-c2-l5-5", "term": "電柱", "reading": "でんちゅう", "answer": "Cột điện", "meaning": "Cột điện", "example": "電柱に車がぶつかった。\n(Ô tô tông vào cột điện.)" },
          { "id": "km-n3-c2-l5-6", "term": "金庫", "reading": "きんこ", "answer": "Két sắt", "meaning": "Két sắt", "example": "金庫に金を入れる。\n(Cất tiền vào trong két sắt.)" },
          { "id": "km-n3-c2-l5-7", "term": "向く", "reading": "むく", "answer": "Cúi (hướng mặt), hướng về, phù hợp (Tự động từ)", "meaning": "Cúi (hướng mặt), hướng về, phù hợp (Tự động từ)", "example": "彼女は下を向いたまま、だまっている。\n(Cô ấy cứ cúi gằm mặt xuống và im lặng.)" },
          { "id": "km-n3-c2-l5-8", "term": "向かう", "reading": "むかう", "answer": "Tiến về phía, hướng đến", "meaning": "Tiến về phía, hướng đến", "example": "急いでイベント会場へ向かう。\n(Vội vã hướng đến hội trường sự kiện.)" },
          { "id": "km-n3-c2-l5-9", "term": "向こう", "reading": "むこう", "answer": "Phía bên kia, phía đối diện", "meaning": "Phía bên kia, phía đối diện", "example": "通りの向こうに人が集まっている。\n(Ở phía bên kia đường có nhiều người đang tụ tập.)" },
          { "id": "km-n3-c2-l5-10", "term": "進行方向", "reading": "しんこうほうこう", "answer": "Hướng di chuyển, hướng đi", "meaning": "Hướng di chuyển, hướng đi", "example": "進行方向を指さす。\n(Chỉ tay về hướng di chuyển.)" },
          { "id": "km-n3-c2-l5-11", "term": "設計", "reading": "せっけい", "answer": "Thiết kế (tòa nhà, dự án)", "meaning": "Thiết kế (tòa nhà, dự án)", "example": "ビルを設計する。\n(Thiết kế tòa nhà cao tầng.)" },
          { "id": "km-n3-c2-l5-12", "term": "設立", "reading": "せつりつ", "answer": "Thành lập (công ty)", "meaning": "Thành lập (công ty)", "example": "会社を設立する。\n(Thành lập công ty.)" },
          { "id": "km-n3-c2-l5-13", "term": "建設中", "reading": "けんせつちゅう", "answer": "Đang thi công xây dựng", "meaning": "Đang thi công xây dựng", "example": "建設中のビル。\n(Tòa nhà đang trong quá trình xây dựng.)" },
          { "id": "km-n3-c2-l5-14", "term": "大黒柱", "reading": "だいこくばしら", "answer": "Trụ cột chính (của đội, gia đình)", "meaning": "Trụ cột chính (của đội, gia đình)", "example": "彼はチームの大黒柱だ。\n(Anh ấy là trụ cột vững chắc của toàn đội.)" },
          { "id": "km-n3-c2-l5-15", "term": "車庫", "reading": "しゃこ", "answer": "Nhà để xe, gara", "meaning": "Nhà để xe, gara", "example": "車庫にバイクを止める。\n(Dựng xe máy trong nhà để xe.)" },
          { "id": "km-n3-c2-l5-16", "term": "向いている", "reading": "むいている", "answer": "Phù hợp, thích hợp với", "meaning": "Phù hợp, thích hợp với", "example": "自分に向いた仕事は何か考える。\n(Suy nghĩ xem công việc nào phù hợp với bản thân mình.)" },
          { "id": "km-n3-c2-l5-17", "term": "向ける", "reading": "むける", "answer": "Hướng về phía, nhắm tới (mục tiêu) (Tha động từ)", "meaning": "Hướng về phía, nhắm tới (mục tiêu) (Tha động từ)", "example": "大会に向けて練習する。\n(Tập luyện hướng tới kỳ thi đấu.)" },
          { "id": "km-n3-c2-l5-18", "term": "向上心", "reading": "こうじょうしん", "answer": "Tinh thần cầu tiến", "meaning": "Tinh thần cầu tiến", "example": "向上心のある学生。\n(Học sinh có tinh thần cầu tiến học hỏi.)" },
          { "id": "km-n3-c2-l5-19", "term": "庫裏", "reading": "くり", "answer": "Nhà bếp/nơi ở của sư trong chùa", "meaning": "Nhà bếp/nơi ở của sư trong chùa", "example": "とくべつな言葉: 庫裏\n(Nhà bếp, nơi sinh hoạt trong chùa.)" }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Chương 3 - Bài 1: 作り方 1 (熱, 冷, 温, 度)",
    sections: [
      {
        id: "km-n3-c3-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c3-l1-1", "term": "熱い", "reading": "あつい", "answer": "Nóng (nước nóng, cà phê nóng)", "meaning": "Nóng (nước nóng, cà phê nóng)", "example": "熱いコーヒーで舌をやけどする。\n(Bị bỏng lưỡi vì cà phê nóng.)" },
          { "id": "km-n3-c3-l1-2", "term": "高熱", "reading": "こうねつ", "answer": "Sốt cao", "meaning": "Sốt cao", "example": "インフルエンザにかかり高熱が出た。\n(Bị nhiễm cúm nên đã sốt cao.)" },
          { "id": "km-n3-c3-l1-3", "term": "冷える", "reading": "ひえる", "answer": "Lạnh đi, nguội đi (Tự động từ)", "meaning": "Lạnh đi, nguội đi (Tự động từ)", "example": "寒さで体がすっかり冷えてしまった。\n(Vì lạnh nên toàn thân bị lạnh ngắt.)" },
          { "id": "km-n3-c3-l1-4", "term": "冷やす", "reading": "ひやす", "answer": "Làm lạnh (Tha động từ)", "meaning": "Làm lạnh (Tha động từ)", "example": "ビールを冷やしておく。\n(Làm lạnh sẵn bia.)" },
          { "id": "km-n3-c3-l1-5", "term": "冷たい", "reading": "つめたい", "answer": "Lạnh, buốt", "meaning": "Lạnh, buốt", "example": "冷たいジュースを一気に飲んだ。\n(Uống một hơi hết cốc nước ép lạnh.)" },
          { "id": "km-n3-c3-l1-6", "term": "冷める", "reading": "さめる", "answer": "Nguội đi (Tự động từ)", "meaning": "Nguội đi (Tự động từ)", "example": "気持ちが冷めて、恋人とわかれた。\n(Tình cảm nguội lạnh nên đã chia tay người yêu.)" },
          { "id": "km-n3-c3-l1-7", "term": "温まる", "reading": "あたたまる", "answer": "Ấm lên (Tự động từ)", "meaning": "Ấm lên (Tự động từ)", "example": "スープを飲んだら、体が温まった。\n(Uống súp xong thì cơ thể ấm lên.)" },
          { "id": "km-n3-c3-l1-8", "term": "温かい", "reading": "あたたかい", "answer": "Ấm áp", "meaning": "Ấm áp", "example": "温かいおふろにつかってつかれを取る。\n(Ngâm mình trong bồn tắm ấm áp để xua tan mệt mỏi.)" },
          { "id": "km-n3-c3-l1-9", "term": "温度", "reading": "おんど", "answer": "Nhiệt độ", "meaning": "Nhiệt độ", "example": "日本では温度を「セルシウス（℃）」で表す。\n(Ở Nhật Bản, nhiệt độ được biểu thị bằng độ C.)" },
          { "id": "km-n3-c3-l1-10", "term": "この度", "reading": "このたび", "answer": "Lần này, dịp này", "meaning": "Lần này, dịp này", "example": "この度はお世話になりました。\n(Lần này đã làm phiền/được giúp đỡ rất nhiều.)" },
          { "id": "km-n3-c3-l1-11", "term": "熱心", "reading": "ねっしん", "answer": "Nhiệt tình, chăm chỉ", "meaning": "Nhiệt tình, chăm chỉ", "example": "ねっしんに勉強する。\n(Chăm chỉ học tập.)" },
          { "id": "km-n3-c3-l1-12", "term": "冷や", "reading": "ひや", "answer": "Rượu lạnh, nước mát", "meaning": "Rượu lạnh, nước mát", "example": "お酒をひやで飲む。\n(Uống rượu lạnh.)" },
          { "id": "km-n3-c3-l1-13", "term": "冷やかす", "reading": "ひやかす", "answer": "Trêu chọc, ghẹo", "meaning": "Trêu chọc, ghẹo", "example": "新婚の二人をみんなでひやかす。\n(Mọi người cùng trêu chọc cặp đôi mới cưới.)" },
          { "id": "km-n3-c3-l1-14", "term": "冷ます", "reading": "さます", "answer": "Làm nguội (Tha động từ)", "meaning": "Làm nguội (Tha động từ)", "example": "薬を飲んで熱をさます。\n(Uống thuốc để hạ nhiệt.)" },
          { "id": "km-n3-c3-l1-15", "term": "温か", "reading": "あたたか", "answer": "Ấm áp", "meaning": "Ấm áp", "example": "あたたかな気持ちになる。\n(Cảm thấy lòng ấm áp.)" },
          { "id": "km-n3-c3-l1-16", "term": "温める", "reading": "あたためる", "answer": "Làm ấm (Tha động từ)", "meaning": "Làm ấm (Tha động từ)", "example": "電子レンジでおにぎりをあたためる。\n(Làm nóng cơm nắm bằng lò vi sóng.)" },
          { "id": "km-n3-c3-l1-17", "term": "体温計", "reading": "たいおんけい", "answer": "Nhiệt kế", "meaning": "Nhiệt kế", "example": "たいおんけいで熱を計る。\n(Đo nhiệt độ cơ thể bằng nhiệt kế.)" },
          { "id": "km-n3-c3-l1-18", "term": "支度", "reading": "したく", "answer": "Chuẩn bị, sửa soạn", "meaning": "Chuẩn bị, sửa soạn", "example": "早起きして朝食のしたくをする。\n(Dậy sớm chuẩn bị bữa sáng.)" },
          { "id": "km-n3-c3-l1-19", "term": "法度", "reading": "はっと", "answer": "Luật lệ, điều cấm kỵ", "meaning": "Luật lệ, điều cấm kỵ", "example": "昔の法度を調べる。\n(Tìm hiểu luật lệ/điều cấm kỵ ngày xưa.)" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Chương 3 - Bài 2: 作り方 2 (材, 型, 焼, 器)",
    sections: [
      {
        id: "km-n3-c3-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c3-l2-1", "term": "材料", "reading": "ざいりょう", "answer": "Nguyên liệu", "meaning": "Nguyên liệu", "example": "ケーキの材料を買いそろえる。\n(Mua đầy đủ nguyên liệu làm bánh.)" },
          { "id": "km-n3-c3-l2-2", "term": "木材", "reading": "もくざい", "answer": "Gỗ, mộc tài", "meaning": "Gỗ, mộc tài", "example": "古い木材を再利用する。\n(Tái sử dụng gỗ cũ.)" },
          { "id": "km-n3-c3-l2-3", "term": "型", "reading": "かた", "answer": "Khuôn, mẫu, nhóm", "meaning": "Khuôn, mẫu, nhóm", "example": "彼は型にはまった答えしか言わない。\n(Anh ta chỉ toàn đưa ra những câu trả lời theo khuôn mẫu.)" },
          { "id": "km-n3-c3-l2-4", "term": "典型的な", "reading": "てんけいてきな", "answer": "Điển hình", "meaning": "Điển hình", "example": "鼻水と熱は典型的なかぜの症状だ。\n(Sổ mũi và sốt là những triệu chứng điển hình của cảm cúm.)" },
          { "id": "km-n3-c3-l2-5", "term": "模型", "reading": "もけい", "answer": "Mô hình", "meaning": "Mô hình", "example": "飛行機の模型をかざる。\n(Trang trí mô hình máy ảnh/máy bay.)" },
          { "id": "km-n3-c3-l2-6", "term": "焼く", "reading": "やく", "answer": "Nướng, rán (Tha động từ)", "meaning": "Nướng, rán (Tha động từ)", "example": "焼いたパンとコーヒーが毎朝の食事だ。\n(Bánh mì nướng và cà phê là bữa sáng hằng ngày.)" },
          { "id": "km-n3-c3-l2-7", "term": "延焼", "reading": "えんしょう", "answer": "Lửa cháy lan rộng", "meaning": "Lửa cháy lan rộng", "example": "延焼を防ぐために、必死に消火する。\n(Nỗ lực dập lửa để ngăn đám cháy lan rộng.)" },
          { "id": "km-n3-c3-l2-8", "term": "日焼け", "reading": "ひやけ", "answer": "Cháy nắng", "meaning": "Cháy nắng", "example": "日焼けしすぎて、全身真っ赤になった。\n(Bị cháy nắng quá mức nên toàn thân đỏ ửng lên.)" },
          { "id": "km-n3-c3-l2-9", "term": "器", "reading": "うつわ", "answer": "Bát đĩa, đồ đựng", "meaning": "Bát đĩa, đồ đựng", "example": "料理を器にもってテーブルに運ぶ。\n(Bày thức ăn vào bát đĩa rồi bưng ra bàn.)" },
          { "id": "km-n3-c3-l2-10", "term": "食器", "reading": "しょっき", "answer": "Dụng cụ ăn uống, bát đĩa", "meaning": "Dụng cụ ăn uống, bát đĩa", "example": "夕食に使った食器を洗う。\n(Rửa bát đĩa đã dùng trong bữa tối.)" },
          { "id": "km-n3-c3-l2-11", "term": "素材", "reading": "そざい", "answer": "Nguyên liệu thô, nguyên bản", "meaning": "Nguyên liệu thô, nguyên bản", "example": "そざいをいかした料理。\n(Món ăn tận dụng được sự nguyên bản của nguyên liệu.)" },
          { "id": "km-n3-c3-l2-12", "term": "材料", "reading": "ざいりょう", "answer": "Tư liệu, nguyên liệu", "meaning": "Tư liệu, nguyên liệu", "example": "人生を小説のざいりょうにする。\n(Lấy cuộc đời làm tư liệu cho cuốn tiểu thuyết.)" },
          { "id": "km-n3-c3-l2-13", "term": "人材", "reading": "じんざい", "answer": "Nhân tài, nguồn nhân lực", "meaning": "Nhân tài, nguồn nhân lực", "example": "優れたじんざいを集める。\n(Thu hút nguồn nhân tài ưu tú.)" },
          { "id": "km-n3-c3-l2-15", "term": "焼ける", "reading": "やける", "answer": "Được nướng chín, tỏa hương (Tự động từ)", "meaning": "Được nướng chín, tỏa hương (Tự động từ)", "example": "パンがやけるいいにおいがする。\n(Có mùi thơm nức của bánh mì đang được nướng.)" },
          { "id": "km-n3-c3-l2-16", "term": "容器", "reading": "ようき", "answer": "Đồ đựng, hộp chứa", "meaning": "Đồ đựng, hộp chứa", "example": "ガラスのようきに入ったジャム。\n(Mứt đựng trong lọ thủy tinh.)" },
          { "id": "km-n3-c3-l2-17", "term": "器", "reading": "うつわ", "answer": "Khí chất, tài làm sếp", "meaning": "Khí chất, tài làm sếp", "example": "彼は社長のうつわではない。\n(Anh ta không có khí chất để làm giám đốc.)" },
          { "id": "km-n3-c3-l2-18", "term": "器用な", "reading": "きような", "answer": "Khéo léo, khéo tay", "meaning": "Khéo léo, khéo tay", "example": "手先がきような人。\n(Người có bàn tay khéo léo.)" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Chương 3 - Bài 3: 食材 1 (卵, 乳, 粉, 塩)",
    sections: [
      {
        id: "km-n3-c3-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c3-l3-1", "term": "卵", "reading": "たまご", "answer": "Quả trứng", "meaning": "Quả trứng", "example": "卵をわって、ボールに入れる。\n(Đập trứng cho vào bát.)" },
          { "id": "km-n3-c3-l3-2", "term": "卵白", "reading": "らんぱく", "answer": "Lòng trắng trứng", "meaning": "Lòng trắng trứng", "example": "卵白にさとうを入れてよくあわ立てる。\n(Cho đường vào lòng trắng trứng rồi đánh bông lên.)" },
          { "id": "km-n3-c3-l3-3", "term": "乳", "reading": "ちち", "answer": "Sữa mẹ, vú, sữa", "meaning": "Sữa mẹ, vú, sữa", "example": "山羊の乳を使ったチーズはおいしい。\n(Phô mai làm từ sữa dê rất ngon.)" },
          { "id": "km-n3-c3-l3-4", "term": "乳歯", "reading": "にゅうし", "answer": "Răng sữa", "meaning": "Răng sữa", "example": "永久歯が生え始め、乳歯がぬける。\n(Răng vĩnh viễn bắt đầu mọc và răng sữa rụng đi.)" },
          { "id": "km-n3-c3-l3-5", "term": "小麦粉", "reading": "こむぎこ", "answer": "Bột mì", "meaning": "Bột mì", "example": "小麦粉はしっかりふるってください。\n(Hãy rây bột mì thật kỹ.)" },
          { "id": "km-n3-c3-l3-6", "term": "粉末", "reading": "ふんまつ", "answer": "Dạng bột, bột mịn", "meaning": "Dạng bột, bột mịn", "example": "粉末スープにお湯を入れる。\n(Cho nước nóng vào gói súp bột.)" },
          { "id": "km-n3-c3-l3-7", "term": "粉薬", "reading": "こなぐすり", "answer": "Thuốc bột", "meaning": "Thuốc bột", "example": "毎日、食後に二種類の粉薬を飲む。\n(Mỗi ngày uống 2 loại thuốc bột sau bữa ăn.)" },
          { "id": "km-n3-c3-l3-8", "term": "塩味", "reading": "しおあじ", "answer": "Vị muối, vị mặn", "meaning": "Vị muối, vị mặn", "example": "塩味のラーメンを注文する。\n(Gọi món mì ramen vị muối mặn.)" },
          { "id": "km-n3-c3-l3-9", "term": "塩", "reading": "しお", "answer": "Muối", "meaning": "Muối", "example": "塩をひとつまみ入れると味が変わる。\n(Thêm một nhúm muối là hương vị thay đổi.)" },
          { "id": "km-n3-c3-l3-10", "term": "塩素", "reading": "えんそ", "answer": "Chất clo tẩy rửa", "meaning": "Chất clo tẩy rửa", "example": "じょうすいきで水道の塩素を取る。\n(Dùng máy lọc để loại bỏ chất clo trong nước máy.)" },
          { "id": "km-n3-c3-l3-11", "term": "ゆで卵", "reading": "ゆでたまご", "answer": "Trứng luộc", "meaning": "Trứng luộc", "example": "ゆでたまごの黄身は半じゅくがおいしい。\n(Lòng đỏ trứng luộc ăn nửa chín nửa lòng đào là ngon nhất.)" },
          { "id": "km-n3-c3-l3-12", "term": "産卵", "reading": "さんらん", "answer": "Đẻ trứng, sinh sản", "meaning": "Đẻ trứng, sinh sản", "example": "ウミガメが海辺でさんらんする。\n(Rùa biển đẻ trứng bên bờ biển.)" },
          { "id": "km-n3-c3-l3-13", "term": "牛乳", "reading": "ぎゅうにゅう", "answer": "Sữa bò", "meaning": "Sữa bò", "example": "ぎゅうにゅうパックを再利用する。\n(Tái sử dụng vỏ hộp sữa.)" },
          { "id": "km-n3-c3-l3-14", "term": "乳飲み子", "reading": "ちのみご", "answer": "Trẻ sơ sinh, trẻ còn bú sữa", "meaning": "Trẻ sơ sinh, trẻ còn bú sữa", "example": "ち飲み子をかかえて、働きに出る。\n(Ẵm đứa con còn ẵm ngửa đi làm kiếm sống.)" },
          { "id": "km-n3-c3-l3-15", "term": "哺乳類", "reading": "ほにゅうるい", "answer": "Thủ loại, động vật có vú", "meaning": "Thủ loại, động vật có vú", "example": "地球上のほにゅうるいは約五千種だ。\n(Động vật có vú trên Trái đất có khoảng 5.000 loài.)" },
          { "id": "km-n3-c3-l3-16", "term": "粉雪", "reading": "こなゆき", "answer": "Tuyết bột, tuyết mịn", "meaning": "Tuyết bột, tuyết mịn", "example": "寒さがきびしくなり、こなゆきがちらつく。\n(Trời trở lạnh gay gắt, tuyết bột rơi lất phất.)" },
          { "id": "km-n3-c3-l3-17", "term": "花粉", "reading": "かふん", "answer": "Phấn hoa", "meaning": "Phấn hoa", "example": "春になるとかふんが大量に飛ぶ。\n(Khi mùa xuân đến, phấn hoa bay ngập tràn.)" },
          { "id": "km-n3-c3-l3-18", "term": "塩分", "reading": "えんぶん", "answer": "Lượng muối, độ mặn", "meaning": "Lượng muối, độ mặn", "example": "えんぶんのとりすぎはよくない。\n(Hấp thụ quá nhiều lượng muối là không tốt.)" },
          { "id": "km-n3-c3-l3-19", "term": "粉", "reading": "こな", "answer": "Bột, chất bột", "meaning": "Bột, chất bột", "example": "小麦から粉を作る。\n(Làm bột từ lúa mì.)" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Chương 3 - Bài 4: 食材 2 (菜, 果, 豆, 缶)",
    sections: [
      {
        id: "km-n3-c3-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c3-l4-1", "term": "野菜", "reading": "やさい", "answer": "Rau", "meaning": "Rau", "example": "緑黄色野菜をたくさん食べる。\n(Ăn nhiều rau xanh đậm/vàng.)" },
          { "id": "km-n3-c3-l4-2", "term": "菜の花", "reading": "なのはな", "answer": "Hoa cải dầu", "meaning": "Hoa cải dầu", "example": "春になると菜の花で一面黄色になる。\n(Vào mùa xuân, hoa cải nhuộm vàng cả một góc trời.)" },
          { "id": "km-n3-c3-l4-3", "term": "成果", "reading": "せいか", "answer": "Thành quả, kết quả", "meaning": "Thành quả, kết quả", "example": "日ごろの練習の成果を出す。\n(Thể hiện thành quả tập luyện hằng ngày.)" },
          { "id": "km-n3-c3-l4-4", "term": "果たす", "reading": "はたす", "answer": "Hoàn thành, thực hiện lời hứa (Tha động từ)", "meaning": "Hoàn thành, thực hiện lời hứa (Tha động từ)", "example": "何があっても彼女との約束を果たす。\n(Dù thế nào đi nữa tôi cũng sẽ thực hiện lời hứa với cô ấy.)" },
          { "id": "km-n3-c3-l4-5", "term": "果実酒", "reading": "かじつしゅ", "answer": "Rượu quả, rượu ngâm trái cây", "meaning": "Rượu quả, rượu ngâm trái cây", "example": "いろいろな果実酒を作る。\n(Ủ các loại rượu ngâm trái cây khác nhau.)" },
          { "id": "km-n3-c3-l4-6", "term": "豆腐", "reading": "とうふ", "answer": "Đậu phụ", "meaning": "Đậu phụ", "example": "低カロリーの豆腐はダイエットにいい。\n(Đậu phụ ít calo rất tốt cho việc giảm cân.)" },
          { "id": "km-n3-c3-l4-7", "term": "豆まき", "reading": "まめまき", "answer": "Ném đậu trừ tà, rải đậu", "meaning": "Ném đậu trừ tà, rải đậu", "example": "2月のせつぶんの日は豆まきをする。\n(Vào ngày Tiết phân tháng Hai, mọi người rải đậu trừ tà.)" },
          { "id": "km-n3-c3-l4-8", "term": "大豆", "reading": "だいず", "answer": "Đậu nành", "meaning": "Đậu nành", "example": "大豆からしょう油やみそが作られる。\n(Tương bần và nước tương được làm từ hạt đậu nành.)" },
          { "id": "km-n3-c3-l4-9", "term": "空き缶", "reading": "あきかん", "answer": "Lon rỗng", "meaning": "Lon rỗng", "example": "川辺の空き缶を拾う活動にさんかする。\n(Tham gia hoạt động thu nhặt vỏ lon rỗng ven bờ sông.)" },
          { "id": "km-n3-c3-l4-10", "term": "缶コーヒー", "reading": "かんこーひー", "answer": "Cà phê lon", "meaning": "Cà phê lon", "example": "缶コーヒーを飲んで一休みする。\n(Uống lon cà phê rồi nghỉ ngơi một chút.)" },
          { "id": "km-n3-c3-l4-11", "term": "生野菜", "reading": "なまやさい", "answer": "Rau sống, rau tươi", "meaning": "Rau sống, rau tươi", "example": "なまやさいのサラダを食べる。\n(Ăn món salad rau sống.)" },
          { "id": "km-n3-c3-l4-12", "term": "菜園", "reading": "さいえん", "answer": "Vườn rau", "meaning": "Vườn rau", "example": "家庭さいえんでトマトを育てる。\n(Trồng cà chua ở vườn rau gia đình.)" },
          { "id": "km-n3-c3-l4-13", "term": "果てる", "reading": "はてる", "answer": "Tận cùng, kiệt sức (Tự động từ)", "meaning": "Tận cùng, kiệt sức (Tự động từ)", "example": "働きすぎてつかれはてた。 / 世界のはてまで旅をしたい。\n(Làm việc quá sức nên kiệt quệ mệt mỏi. / Muốn đi du lịch đến tận cùng thế giới.)" },
          { "id": "km-n3-c3-l4-14", "term": "豆", "reading": "まめ", "answer": "Hạt đậu, hạt cà phê", "meaning": "Hạt đậu, hạt cà phê", "example": "数種類のコーヒーまめをブレンドする。\n(Trộn lẫn vài loại hạt cà phê.)" },
          { "id": "km-n3-c3-l4-15", "term": "豆知識", "reading": "まめちしき", "answer": "Mẹo nhỏ, kiến thức bên lề", "meaning": "Mẹo nhỏ, kiến thức bên lề", "example": "まめ知識が豊富な人。\n(Người có lượng kiến thức bên lề phong phú.)" },
          { "id": "km-n3-c3-l4-17", "term": "缶詰", "reading": "かんづめ", "answer": "Đồ hộp, thực phẩm đóng hộp", "meaning": "Đồ hộp, thực phẩm đóng hộp", "example": "かんづめを使ったかんたんな料理。\n(Món ăn đơn giản làm bằng đồ đóng hộp.)" },
          { "id": "km-n3-c3-l4-18", "term": "菜", "reading": "な", "answer": "Rau, ngọn rau", "meaning": "Rau, ngọn rau", "example": "春の菜を摘む。\n(Hái rau mùa xuân.)" },
          { "id": "km-n3-c3-l4-19", "term": "果て", "reading": "はて", "answer": "Tận cùng, nơi cuối cùng", "meaning": "Tận cùng, nơi cuối cùng", "example": "世界のはてまで旅をする。\n(Đi du lịch đến tận cùng thế giới.)" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Chương 3 - Bài 5: 単位 (杯, 枚, 匹, 量)",
    sections: [
      {
        id: "km-n3-c3-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c3-l5-1", "term": "杯", "reading": "さかずき", "answer": "Chén rượu", "meaning": "Chén rượu", "example": "杯にお酒をなみとなみと注ぐ。\n(Rót rượu tràn đầy miệng chén.)" },
          { "id": "km-n3-c3-l5-2", "term": "一杯", "reading": "いっぱい", "answer": "Một ly, một cốc", "meaning": "Một ly, một cốc", "example": "一杯飲んでから帰ることにする。\n(Quyết định làm một ly rồi mới đi về.)" },
          { "id": "km-n3-c3-l5-3", "term": "乾杯", "reading": "かんぱい", "answer": "Cạn ly, nâng ly chúc mừng", "meaning": "Cạn ly, nâng ly chúc mừng", "example": "二人の幸せを願って乾杯した。\n(Cạn ly cầu chúc cho hạnh phúc của hai người.)" },
          { "id": "km-n3-c3-l5-4", "term": "枚数", "reading": "まいすう", "answer": "Số tờ, số tấm", "meaning": "Số tờ, số tấm", "example": "コピーしたプリントの枚数を確認する。\n(Xác nhận số lượng bản in đã photocopy.)" },
          { "id": "km-n3-c3-l5-5", "term": "二枚目", "reading": "にまいめ", "answer": "Anh chàng hào hoa đẹp trai", "meaning": "Anh chàng hào hoa đẹp trai", "example": "モデルの彼はさすがに二枚目だ。\n(Là người mẫu nên anh ấy quả nhiên là chàng trai lịch lãm.)" },
          { "id": "km-n3-c3-l5-6", "term": "二匹", "reading": "にひき", "answer": "Hai con (động vật nhỏ)", "meaning": "Hai con (động vật nhỏ)", "example": "道に二匹の子猫が捨てられている。\n(Có hai chú mèo con bị bỏ rơi trên đường.)" },
          { "id": "km-n3-c3-l5-7", "term": "匹敵する", "reading": "ひってきする", "answer": "Sánh tầm, tương đương với", "meaning": "Sánh tầm, tương đương với", "example": "彼はプロに匹敵する絵の才能を持つ。\n(Anh ấy có tài năng hội họa tương đương với họa sĩ chuyên nghiệp.)" },
          { "id": "km-n3-c3-l5-8", "term": "計量", "reading": "けいりょう", "answer": "Cân đo, định lượng", "meaning": "Cân đo, định lượng", "example": "おかし作りは計量がポイントだ。\n(Việc định lượng chính xác là mấu chốt khi làm bánh kẹo.)" },
          { "id": "km-n3-c3-l5-9", "term": "分量", "reading": "ぶんりょう", "answer": "Liều lượng, phân lượng", "meaning": "Liều lượng, phân lượng", "example": "分量をまちがえたのか、味がおかしい。\n(Không biết có bị sai liều lượng không mà mùi vị rất lạ.)" },
          { "id": "km-n3-c3-l5-10", "term": "重量", "reading": "じゅうりょう", "answer": "Trọng lượng", "meaning": "Trọng lượng", "example": "くうこうでは荷物の重量検査がある。\n(Tại sân bay có kiểm tra trọng lượng hành lý.)" },
          { "id": "km-n3-c3-l5-12", "term": "杯", "reading": "さかずき", "answer": "Chén rượu", "meaning": "Chén rượu", "example": "さかずきを交わす。\n(Giao bôi, trao đổi chén rượu thề.)" },
          { "id": "km-n3-c3-l5-13", "term": "三枚", "reading": "さんまい", "answer": "Ba tấm/tờ (lạng/phần phi lê cá)", "meaning": "Ba tấm/tờ (lạng/phần phi lê cá)", "example": "魚をさんまいにおろす。\n(Phi lê xẻ cá làm 3 phần.)" },
          { "id": "km-n3-c3-l5-14", "term": "五枚", "reading": "ごまい", "answer": "Năm tờ/tấm", "meaning": "Năm tờ/tấm", "example": "八十円切手をごまい買う。\n(Mua 5 con tem 80 Yên.)" },
          { "id": "km-n3-c3-l5-15", "term": "二十匹", "reading": "にじゅっぴき", "answer": "Hai mươi con (động vật)", "meaning": "Hai mươi con (động vật)", "example": "にじゅっぴきの熱帯魚。\n(20 con cá nhiệt đới.)" },
          { "id": "km-n3-c3-l5-16", "term": "三匹", "reading": "さんびき", "answer": "Ba con (động vật)", "meaning": "Ba con (động vật)", "example": "「さんびきの子ぶた」の物語を読む。\n(Đọc câu chuyện \"Ba chú heo con\".)" },
          { "id": "km-n3-c3-l5-17", "term": "量る", "reading": "はかる", "answer": "Cân, đo (Tha động từ)", "meaning": "Cân, đo (Tha động từ)", "example": "ダイエットのために毎日体重をはかる。\n(Hằng ngày cân trọng lượng để giảm cân.)" },
          { "id": "km-n3-c3-l5-18", "term": "軽量", "reading": "けいりょう", "answer": "Trọng lượng nhẹ, siêu nhẹ", "meaning": "Trọng lượng nhẹ, siêu nhẹ", "example": "けいりょうでじょうぶな自転車。\n(Chiếc xe đạp nhẹ mà vô cùng bền chắc.)" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Chương 4 - Bài 1: 体 (頭, 顔, 首, 鼻)",
    sections: [
      {
        id: "km-n3-c4-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c4-l1-1", "term": "頭", "reading": "あたま", "answer": "Cái đầu", "meaning": "Cái đầu", "example": "頭をなでて子どもをほめる。\n(Xoa đầu khen ngợi đứa trẻ.)" },
          { "id": "km-n3-c4-l1-2", "term": "頭痛", "reading": "ずつう", "answer": "Đau đầu", "meaning": "Đau đầu", "example": "昨日からひどい頭痛が続いている。\n(Cơn đau đầu dữ dội kéo dài từ hôm qua.)" },
          { "id": "km-n3-c4-l1-3", "term": "年頭", "reading": "ねんとう", "answer": "Đầu năm", "meaning": "Đầu năm", "example": "社長が年頭のあいさつに立つ。\n(Giám đốc đứng phát biểu chúc mừng đầu năm.)" },
          { "id": "km-n3-c4-l1-4", "term": "顔", "reading": "かお", "answer": "Khuôn mặt", "meaning": "Khuôn mặt", "example": "朝起きてすぐに顔を洗う。\n(Sáng thức dậy là rửa mặt ngay.)" },
          { "id": "km-n3-c4-l1-5", "term": "顔面", "reading": "がんめん", "answer": "Khuôn mặt, mặt trước", "meaning": "Khuôn mặt, mặt trước", "example": "ボールが顔面に当たり鼻血が出た。\n(Quả bóng đập trúng mặt làm chảy máu mũi.)" },
          { "id": "km-n3-c4-l1-6", "term": "首", "reading": "くび", "answer": "Cổ", "meaning": "Cổ", "example": "寝ちがえて首が回らない。\n(Nằm ngủ sai tư thế nên đau cổ không quay được.)" },
          { "id": "km-n3-c4-l1-7", "term": "首位", "reading": "しゅい", "answer": "Vị trí đầu bảng, ngôi đầu", "meaning": "Vị trí đầu bảng, ngôi đầu", "example": "二位のチームが逆転して首位に立つ。\n(Đội xếp thứ hai lội ngược dòng vươn lên dẫn đầu bảng.)" },
          { "id": "km-n3-c4-l1-8", "term": "鼻水", "reading": "はなみず", "answer": "Nước mũi", "meaning": "Nước mũi", "example": "かぜをひいて鼻水が出る。\n(Bị cảm lạnh nên nước mũi chảy ra.)" },
          { "id": "km-n3-c4-l1-9", "term": "鼻", "reading": "はな", "answer": "Mũi (Tự hào)", "meaning": "Mũi (Tự hào)", "example": "有名大学に合格して鼻が高い。\n(Đỗ trường đại học danh tiếng nên rất tự hào/phổng mũi.)" },
          { "id": "km-n3-c4-l1-10", "term": "耳鼻科", "reading": "じびか", "answer": "Khoa tai mũi họng", "meaning": "Khoa tai mũi họng", "example": "耳の調子が悪く、耳鼻科へ行く。\n(Tai có vấn đề nên đi khám tai mũi họng.)" },
          { "id": "km-n3-c4-l1-11", "term": "口頭", "reading": "こうとう", "answer": "Nói miệng, vấn đáp", "meaning": "Nói miệng, vấn đáp", "example": "受験科目にこうとう試験がある。\n(Trong các môn thi có bài thi vấn đáp.)" },
          { "id": "km-n3-c4-l1-12", "term": "頭文字", "reading": "かしらもじ", "answer": "Chữ cái đầu", "meaning": "Chữ cái đầu", "example": "名前のかしら文字を書く。\n(Viết chữ cái đầu của tên mình.)" },
          { "id": "km-n3-c4-l1-13", "term": "笑顔", "reading": "えがお", "answer": "Gương mặt tươi cười", "meaning": "Gương mặt tươi cười", "example": "友人をえがおで出迎える。\n(Đón tiếp người bạn bằng gương mặt rạng rỡ nụ cười.)" },
          { "id": "km-n3-c4-l1-14", "term": "顔負け", "reading": "かおまけ", "answer": "Xấu hổ, nể phục, chào thua", "meaning": "Xấu hổ, nể phục, chào thua", "example": "大人かおまけの知識がある。\n(Có kiến thức uyên bác khiến người lớn cũng chào thua.)" },
          { "id": "km-n3-c4-l1-15", "term": "顔色", "reading": "かおいろ", "answer": "Sắc mặt", "meaning": "Sắc mặt", "example": "じょうしのかおいろをうかがう。\n(Quan sát sắc mặt của sếp.)" },
          { "id": "km-n3-c4-l1-17", "term": "首相", "reading": "しゅしょう", "answer": "Thủ tướng", "meaning": "Thủ tướng", "example": "歴代のしゅしょうを調べる。\n(Tìm hiểu các vị thủ tướng qua các thời kỳ.)" },
          { "id": "km-n3-c4-l1-19", "term": "音頭", "reading": "おんど", "answer": "Dẫn đầu, xướng nhịp", "meaning": "Dẫn đầu, xướng nhịp", "example": "宴会で乾杯の音頭を取る。\n(Bắt nhịp cạn ly trong buổi tiệc.)" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Chương 4 - Bài 2: 呼吸 (呼, 吸, 息, 汗)",
    sections: [
      {
        id: "km-n3-c4-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c4-l2-1", "term": "呼ぶ", "reading": "よぶ", "answer": "Gọi (tên, taxi...)", "meaning": "Gọi (tên, taxi...)", "example": "出欠を取るために学生の名前を呼ぶ。 / 手を上げてタクシーをよぶ。\n(Gọi tên học sinh để điểm danh. / Giơ tay gọi taxi.)" },
          { "id": "km-n3-c4-l2-2", "term": "吸う", "reading": "すう", "answer": "Hút, hít", "meaning": "Hút, hít", "example": "ここでタバコを吸わないでください。 / しんせんな空気を吸う。\n(Xin đừng hút thuốc ở đây. / Hít thở không khí trong lành.)" },
          { "id": "km-n3-c4-l2-3", "term": "深呼吸", "reading": "しんこきゅう", "answer": "Hít thở sâu", "meaning": "Hít thở sâu", "example": "深呼吸して気持ちを落ち着かせる。\n(Hít thở thật sâu để bình tâm lại.)" },
          { "id": "km-n3-c4-l2-4", "term": "休息", "reading": "きゅうそく", "answer": "Nghỉ ngơi", "meaning": "Nghỉ ngơi", "example": "休息の時間をたっぷり取る。\n(Dành nhiều thời gian nghỉ ngơi dưỡng sức.)" },
          { "id": "km-n3-c4-l2-5", "term": "息", "reading": "いき", "answer": "Hơi thở", "meaning": "Hơi thở", "example": "向こうから息を切らして走ってくる。 / びっくりして息が止まるかと思った。\n(Hớt hải chạy đứt hơi từ phía kia lại. / Giật mình ngỡ như tim ngưng đập hơi thở ngừng lại.)" },
          { "id": "km-n3-c4-l2-6", "term": "利息", "reading": "りそく", "answer": "Lợi tức, tiền lãi", "meaning": "Lợi tức, tiền lãi", "example": "借りていたお金の利息をはらう。\n(Trả tiền lãi của số tiền đã vay.)" },
          { "id": "km-n3-c4-l2-7", "term": "汗", "reading": "あせ", "answer": "Mồ hôi", "meaning": "Mồ hôi", "example": "たくさん運動して汗をかいた。 / きんちょうしてあせが出る。\n(Vận động nhiều toát cả mồ hôi. / Lo lắng toát hết mồ hôi.)" },
          { "id": "km-n3-c4-l2-8", "term": "呼吸", "reading": "こきゅう", "answer": "Hô hấp, thở", "meaning": "Hô hấp, thở", "example": "こきゅうが苦しい。\n(Hơi thở khó nhọc, khó thở.)" },
          { "id": "km-n3-c4-l2-9", "term": "吸い取る", "reading": "すいとる", "answer": "Hút đi", "meaning": "Hút đi", "example": "そうじきで部屋のゴミをすい取る。\n(Dùng máy hút bụi hút sạch rác trong phòng.)" },
          { "id": "km-n3-c4-l2-11", "term": "息苦しい", "reading": "いきぐるしい", "answer": "Ngột ngạt, khó thở", "meaning": "Ngột ngạt, khó thở", "example": "この部屋はなんだかいきぐるしい。\n(Căn phòng này có vẻ gì đó ngột ngạt khó thở.)" },
          { "id": "km-n3-c4-l2-12", "term": "冷や汗", "reading": "ひやあせ", "answer": "Mồ hôi lạnh (Vì xấu hổ, sợ hãi)", "meaning": "Mồ hôi lạnh (Vì xấu hổ, sợ hãi)", "example": "はずかしくてひやあせをかいた。\n(Vì xấu hổ quá nên toát mồ hôi hột.)" },
          { "id": "km-n3-c4-l2-13", "term": "発汗", "reading": "はっかん", "answer": "Sự đổ mồ hôi", "meaning": "Sự đổ mồ hôi", "example": "この食品にははっかん作用がある。\n(Loại thực phẩm này có tác dụng kích thích đổ mồ hôi.)" },
          { "id": "km-n3-c4-l2-14", "term": "息子", "reading": "むすこ", "answer": "Con trai", "meaning": "Con trai", "example": "とくべつな言葉: 息子\n(Con trai tôi.)" }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Chương 4 - Bài 3: 検査 (検, 査, 歯, 痛)",
    sections: [
      {
        id: "km-n3-c4-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c4-l3-1", "term": "点検", "reading": "てんけん", "answer": "Kiểm tra định kỳ, kiểm tra lửa/thiết bị", "meaning": "Kiểm tra định kỳ, kiểm tra lửa/thiết bị", "example": "出かける前に火の元を点検する。\n(Trước khi ra ngoài phải kiểm tra nguồn lửa cẩn thận.)" },
          { "id": "km-n3-c4-l3-2", "term": "探査", "reading": "たんさ", "answer": "Thám hiểm, thăm dò", "meaning": "Thám hiểm, thăm dò", "example": "だれも知らない土地を探査する。\n(Thám hiểm vùng đất chưa ai từng biết đến.)" },
          { "id": "km-n3-c4-l3-3", "term": "検査", "reading": "けんさ", "answer": "Xét nghiệm, kiểm tra y tế", "meaning": "Xét nghiệm, kiểm tra y tế", "example": "病気を調べるために検査する。 / けんさの結果が出る。\n(Xét nghiệm y tế để chẩn đoán bệnh. / Có kết quả xét nghiệm.)" },
          { "id": "km-n3-c4-l3-4", "term": "調査", "reading": "ちょうさ", "answer": "Điều tra, khảo sát", "meaning": "Điều tra, khảo sát", "example": "学生が希望する進路を調査する。\n(Khảo sát định hướng tương lai của học sinh.)" },
          { "id": "km-n3-c4-l3-5", "term": "査証", "reading": "さしょう", "answer": "Visa, thị thực", "meaning": "Visa, thị thực", "example": "空港で入国の査証を受ける。\n(Nhận visa nhập cảnh tại sân bay.)" },
          { "id": "km-n3-c4-l3-6", "term": "歯", "reading": "は", "answer": "Răng", "meaning": "Răng", "example": "一さいをすぎて歯が生えてきた。\n(Qua 1 tuổi răng bắt đầu mọc.)" },
          { "id": "km-n3-c4-l3-7", "term": "虫歯", "reading": "むしば", "answer": "Răng sâu", "meaning": "Răng sâu", "example": "虫歯のちりょうは大人でもこわい。\n(Điều trị răng sâu thì ngay cả người lớn cũng sợ.)" },
          { "id": "km-n3-c4-l3-8", "term": "永久歯", "reading": "えいきゅうし", "answer": "Răng vĩnh viễn", "meaning": "Răng vĩnh viễn", "example": "永久歯に生え変わる。\n(Thay răng thành răng vĩnh viễn.)" },
          { "id": "km-n3-c4-l3-9", "term": "痛い", "reading": "いたい", "answer": "Đau (tính từ)", "meaning": "Đau (tính từ)", "example": "急におなかが痛くなり救急車を呼ぶ。 / 赤字で頭がいたい。\n(Đột nhiên đau bụng dữ dội nên gọi xe cấp cứu. / Đau đầu nhức óc vì bị thua lỗ.)" },
          { "id": "km-n3-c4-l3-10", "term": "激痛", "reading": "げきつう", "answer": "Đau dữ dội, đau nhói", "meaning": "Đau dữ dội, đau nhói", "example": "階段で転んでひざに激痛が走った。\n(Ngã cầu thang làm đầu gối đau buốt nhói lên.)" },
          { "id": "km-n3-c4-l3-11", "term": "歯科医院", "reading": "しかいいん", "answer": "Phòng khám nha khoa", "meaning": "Phòng khám nha khoa", "example": "近所のしか医院に通う。\n(Đi khám tại phòng khám nha khoa gần nhà.)" },
          { "id": "km-n3-c4-l3-12", "term": "歯車", "reading": "はぐるま", "answer": "Bánh răng", "meaning": "Bánh răng", "example": "二人の関係のはぐるまがくるう。\n(Bánh răng mối quan hệ của hai người bị trệch hướng.)" },
          { "id": "km-n3-c4-l3-13", "term": "痛む", "reading": "いたむ", "answer": "Đau nhức (động từ)", "meaning": "Đau nhức (động từ)", "example": "寒さでひざがいたむ。\n(Đầu gối đau nhức buốt vì trời lạnh.)" },
          { "id": "km-n3-c4-l3-14", "term": "検証", "reading": "けんしょう", "answer": "Kiểm chứng, xác minh nguyên nhân", "meaning": "Kiểm chứng, xác minh nguyên nhân", "example": "火事のげんいんをけんしょうする。\n(Xác minh nguyên nhân vụ hỏa hoạn.)" },
          { "id": "km-n3-c4-l3-15", "term": "検討", "reading": "けんとう", "answer": "Cân nhắc, thảo luận xem xét", "meaning": "Cân nhắc, thảo luận xem xét", "example": "会議でけんとうしたうえで決める。\n(Cân nhắc kỹ lưỡng trong cuộc họp rồi mới quyết định.)" },
          { "id": "km-n3-c4-l3-16", "term": "審査員", "reading": "しんさいん", "answer": "Giám khảo, hội đồng thẩm định", "meaning": "Giám khảo, hội đồng thẩm định", "example": "スピーチ大会のしんさいん。\n(Ban giám khảo của cuộc thi hùng biện.)" },
          { "id": "km-n3-c4-l3-17", "term": "痛める", "reading": "いためる", "answer": "Làm đau, làm tổn thương (Tha động từ)", "meaning": "Làm đau, làm tổn thương (Tha động từ)", "example": "足の関節を痛める。\n(Làm tổn thương khớp chân.)" }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Chương 4 - Bài 4: けが (血, 液, 包, 帯)",
    sections: [
      {
        id: "km-n3-c4-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c4-l4-1", "term": "血", "reading": "ち", "answer": "Máu", "meaning": "Máu", "example": "道で転んで、ひざから血が出た。 / 歯ぐきからちが出る。\n(Ngã trên đường làm máu chảy rỉ ra từ đầu gối. / Chảy máu từ nướu lợi.)" },
          { "id": "km-n3-c4-l4-2", "term": "血管", "reading": "けっかん", "answer": "Mạch máu", "meaning": "Mạch máu", "example": "血管がつまる病気になる。\n(Mắc chứng bệnh tắc nghẽn mạch máu.)" },
          { "id": "km-n3-c4-l4-3", "term": "血統書", "reading": "けっとうしょ", "answer": "Giấy chứng nhận huyết thống, gia phả", "meaning": "Giấy chứng nhận huyết thống, gia phả", "example": "血統書付きの犬をかっている。\n(Nuôi chú chó có giấy tờ gia phả huyết thống thuần chủng.)" },
          { "id": "km-n3-c4-l4-4", "term": "冷血", "reading": "れいけつ", "answer": "Máu lạnh, tàn nhẫn", "meaning": "Máu lạnh, tàn nhẫn", "example": "犯行の手口があまりにも冷血だ。\n(Thủ đoạn phạm tội vô cùng tàn nhẫn máu lạnh.)" },
          { "id": "km-n3-c4-l4-5", "term": "赤血球", "reading": "せっけっきゅう", "answer": "Hồng cầu", "meaning": "Hồng cầu", "example": "赤血球の量を調べる。\n(Xét nghiệm kiểm tra số lượng hồng cầu.)" },
          { "id": "km-n3-c4-l4-6", "term": "包む", "reading": "つつむ", "answer": "Gói, bọc, bao quanh", "meaning": "Gói, bọc, bao quanh", "example": "プレゼントをきれいに包んでもらう。 / 毛皮のコートに身をつつんだ女性。\n(Nhờ gói bọc giùm món quà thật đẹp. / Người phụ nữ khoác bao bọc quanh mình chiếc áo lông thú.)" },
          { "id": "km-n3-c4-l4-7", "term": "包帯", "reading": "ほうたい", "answer": "Băng gạc vết thương", "meaning": "Băng gạc vết thương", "example": "けがをしたところを包帯でまく。\n(Băng bó chỗ bị thương bằng băng gạc.)" },
          { "id": "km-n3-c4-l4-8", "term": "帯びる", "reading": "おびる", "answer": "Mang nồng độ, mang tính chất/hơi hướng", "meaning": "Mang nồng độ, mang tính chất/hơi hướng", "example": "酒気帯び運転は法律で禁止されている。\n(Luật cấm tuyệt đối việc lái xe khi có nồng độ cồn/hơi men.)" },
          { "id": "km-n3-c4-l4-9", "term": "一帯", "reading": "いったい", "answer": "Cả khu vực, toàn vùng", "meaning": "Cả khu vực, toàn vùng", "example": "じしんのひがいは関東一帯におよんだ。\n(Thiệt hại do trận động đất lan ra khắp toàn vùng Kanto.)" },
          { "id": "km-n3-c4-l4-10", "term": "帯", "reading": "おび", "answer": "Thắt lưng Kimono", "meaning": "Thắt lưng Kimono", "example": "着物に合わせた帯をしめる。\n(Thắt đai lưng phù hợp với bộ Kimono.)" },
          { "id": "km-n3-c4-l4-12", "term": "血色", "reading": "けっしょく", "answer": "Sắc mặt hồng hào tươi tắn", "meaning": "Sắc mặt hồng hào tươi tắn", "example": "けっしょくのいい顔。\n(Khuôn mặt tươi tắn hồng hào sắc khí tốt.)" },
          { "id": "km-n3-c4-l4-13", "term": "液体", "reading": "えきたい", "answer": "Chất lỏng", "meaning": "Chất lỏng", "example": "びんの中の茶色いえきたい。\n(Chất lỏng màu nâu bên trong lọ.)" },
          { "id": "km-n3-c4-l4-14", "term": "血液型", "reading": "けつえきがた", "answer": "Nhóm máu", "meaning": "Nhóm máu", "example": "自分のけつえきがたを調べる。\n(Tìm hiểu/xét nghiệm nhóm máu của mình.)" },
          { "id": "km-n3-c4-l4-15", "term": "連帯感", "reading": "れんたいかん", "answer": "Cảm giác đoàn kết gắn bó", "meaning": "Cảm giác đoàn kết gắn bó", "example": "クラスのれんたいかんを高める。\n(Nâng cao tinh thần liên đới/đoàn kết của lớp học.)" },
          { "id": "km-n3-c4-l4-16", "term": "携帯", "reading": "けいたい", "answer": "Điện thoại di động, mang theo bên người", "meaning": "Điện thoại di động, mang theo bên người", "example": "子どももけいたい電話を持つ時代。\n(Thời đại mà trẻ con cũng mang điện thoại di động theo người.)" }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Chương 4 - Bài 5: 救急 (救, 助, 死, 亡)",
    sections: [
      {
        id: "km-n3-c4-l10-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c4-l10-1", "term": "救う", "reading": "すくう", "answer": "Cứu vớt, cứu sống, giải cứu", "meaning": "Cứu vớt, cứu sống, giải cứu", "example": "燃える火の中から人を救う。 / いのちをすくってくれた大切な人。\n(Cứu người khỏi đám cháy dữ dội. / Người ân nhân quan trọng đã cứu mạng sống tôi.)" },
          { "id": "km-n3-c4-l10-2", "term": "救急車", "reading": "きゅうきゅうしゃ", "answer": "Xe cấp cứu", "meaning": "Xe cấp cứu", "example": "救急車で病院に運ばれる。 / きゅうきゅうばこを用意する。\n(Được đưa đi bệnh viện bằng xe cứu thương. / Chuẩn bị hộp dụng cụ sơ cứu.)" },
          { "id": "km-n3-c4-l10-3", "term": "救援", "reading": "きゅうえん", "answer": "Cứu viện, tiếp tế cứu tế", "meaning": "Cứu viện, tiếp tế cứu tế", "example": "救援のぶっしをヘリコプターで運ぶ。\n(Vận chuyển nhu yếu phẩm cứu tế bằng trực thăng.)" },
          { "id": "km-n3-c4-l10-4", "term": "助かる", "reading": "たすかる", "answer": "Được cứu, sống sót, đỡ vất vả (Tự động từ)", "meaning": "Được cứu, sống sót, đỡ vất vả (Tự động từ)", "example": "この病気は手術をすれば助かる。\n(Căn bệnh này nếu phẫu thuật kịp thời thì sẽ sống sót.)" },
          { "id": "km-n3-c4-l10-5", "term": "助ける", "reading": "たすける", "answer": "Giúp đỡ, giải nguy (Tha động từ)", "meaning": "Giúp đỡ, giải nguy (Tha động từ)", "example": "道にまよっていた人を助ける。 / 池に落ちた子どもをたすけた。\n(Giúp đỡ người đi lạc đường. / Cứu vớt đứa bé bị ngã xuống ao.)" },
          { "id": "km-n3-c4-l10-6", "term": "助言", "reading": "じょげん", "answer": "Lời khuyên răn, lời khuyên tư vấn", "meaning": "Lời khuyên răn, lời khuyên tư vấn", "example": "せんぱいに助言を求める。\n(Tìm kiếm lời khuyên từ tiền bối đi trước.)" },
          { "id": "km-n3-c4-l10-7", "term": "救助", "reading": "きゅうじょ", "answer": "Cứu hộ, giải cứu", "meaning": "Cứu hộ, giải cứu", "example": "海でおぼれている人を救助する。\n(Giải cứu người đuối nước ngoài biển.)" },
          { "id": "km-n3-c4-l10-8", "term": "死ぬ", "reading": "しぬ", "answer": "Chết (động từ)", "meaning": "Chết (động từ)", "example": "かっていた犬が病気で死んだ。\n(Chú chó nuôi trong nhà bị ốm chết.)" },
          { "id": "km-n3-c4-l10-9", "term": "死守する", "reading": "ししゅする", "answer": "Tử thủ, liều chết bảo vệ", "meaning": "Tử thủ, liều chết bảo vệ", "example": "キーパーがゴールを死守する。\n(Thủ môn liều mình giữ vững bảo vệ khung thành.)" },
          { "id": "km-n3-c4-l10-10", "term": "亡者", "reading": "もうじゃ", "answer": "Kẻ cuồng dại cuồng tín, vong hồn", "meaning": "Kẻ cuồng dại cuồng tín, vong hồn", "example": "彼はけちでよくばりな金の亡者だ。\n(Hắn ta là một kẻ keo kiệt tham lam cuồng tiền.)" },
          { "id": "km-n3-c4-l10-11", "term": "救済", "reading": "きゅうさい", "answer": "Cứu tế, giải nguy kinh tế/đời sống", "meaning": "Cứu tế, giải nguy kinh tế/đời sống", "example": "失業者をきゅうさいする。\n(Cứu trợ, hỗ trợ đời sống cho người thất nghiệp.)" },
          { "id": "km-n3-c4-l10-12", "term": "援助", "reading": "えんじょ", "answer": "Viện trợ tài chính, giúp đỡ", "meaning": "Viện trợ tài chính, giúp đỡ", "example": "親に学費をえんじょしてもらう。\n(Được cha mẹ trợ giúp hỗ trợ học phí.)" },
          { "id": "km-n3-c4-l10-13", "term": "補助", "reading": "ほじょ", "answer": "Bổ trợ, phụ giúp chi phí", "meaning": "Bổ trợ, phụ giúp chi phí", "example": "息子の大学の学費をほじょする。\n(Hỗ trợ chu cấp một phần học phí đại học cho con trai.)" },
          { "id": "km-n3-c4-l10-14", "term": "亡命", "reading": "ぼうめい", "answer": "Tị nạn chính trị, đào tẩu", "meaning": "Tị nạn chính trị, đào tẩu", "example": "外国へぼうめいする。\n(Đào tẩu, tị nạn chính trị sang nước ngoài.)" },
          { "id": "km-n3-c4-l10-15", "term": "死亡者", "reading": "しぼうしゃ", "answer": "Nạn nhân tử vong, số người chết", "meaning": "Nạn nhân tử vong, số người chết", "example": "交通じこによるしぼう者が多い。\n(Số người chết do tai nạn giao thông chiếm tỷ lệ cao.)" },
          { "id": "km-n3-c4-l10-16", "term": "救急箱", "reading": "きゅうきゅうばこ", "answer": "Hộp dụng cụ y tế sơ cứu", "meaning": "Hộp dụng cụ y tế sơ cứu", "example": "いざという時のために救急箱を用意する。\n(Chuẩn bị sẵn hộp dụng cụ y tế sơ cứu phòng khi khẩn cấp.)" }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Chương 5 - Bài 1: 勝負 (戦, 決, 勝, 負)",
    sections: [
      {
        id: "km-n3-c5-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c5-l1-1", "term": "戦う", "reading": "たたかう", "answer": "Chiến đấu, thi đấu", "meaning": "Chiến đấu, thi đấu", "example": "次の試合でライバルと戦う。\n(Thi đấu với đối thủ trong trận tiếp theo.)" },
          { "id": "km-n3-c5-l1-2", "term": "負け戦", "reading": "まけいくさ", "answer": "Trận thua, thế trận thua", "meaning": "Trận thua, thế trận thua", "example": "負け戦でも投げ出さずにがんばる。\n(Dù là thế trận thua nhưng vẫn nỗ lực không bỏ cuộc.)" },
          { "id": "km-n3-c5-l1-3", "term": "作戦", "reading": "さくせん", "answer": "Chiến thuật, kế hoạch tác chiến", "meaning": "Chiến thuật, kế hoạch tác chiến", "example": "プランを成功させるための作戦を練る。\n(Bàn chiến thuật để kế hoạch thành công.)" },
          { "id": "km-n3-c5-l1-4", "term": "優勝決定戦", "reading": "ゆうしょうけっていせん", "answer": "Trận chung kết quyết định vô địch", "meaning": "Trận chung kết quyết định vô địch", "example": "優勝決定戦は来週行われる。\n(Trận chung kết quyết định ngôi vô địch sẽ diễn ra vào tuần tới.)" },
          { "id": "km-n3-c5-l1-5", "term": "決意", "reading": "けつい", "answer": "Quyết ý, ý định chắc chắn", "meaning": "Quyết ý, ý định chắc chắn", "example": "会社を辞める決意をかためた。\n(Củng cố quyết định nghỉ việc ở công ty.)" },
          { "id": "km-n3-c5-l1-6", "term": "圧勝", "reading": "あっしょう", "answer": "Thắng áp đảo", "meaning": "Thắng áp đảo", "example": "試合は私たちのチームの圧勝だった。\n(Trận đấu là chiến thắng áp đảo của đội chúng tôi.)" },
          { "id": "km-n3-c5-l1-7", "term": "勝る", "reading": "まさる", "answer": "Vượt trội hơn, giỏi hơn", "meaning": "Vượt trội hơn, giỏi hơn", "example": "実力は田中より木村が勝っている。\n(Thực lực thì Kimura vượt trội hơn Tanaka.)" },
          { "id": "km-n3-c5-l1-8", "term": "勝負", "reading": "しょうぶ", "answer": "Thắng bại, cuộc đọ sức", "meaning": "Thắng bại, cuộc đọ sức", "example": "あっという間に勝負が決まった。\n(Trong chớp mắt cuộc đọ sức đã ngã ngũ.)" },
          { "id": "km-n3-c5-l1-9", "term": "負担", "reading": "ふたん", "answer": "Gánh vác, chịu chi phí", "meaning": "Gánh vác, chịu chi phí", "example": "費用は各自で負担してください。\n(Chi phí vui lòng mỗi người tự gánh vác.)" },
          { "id": "km-n3-c5-l1-10", "term": "背負う", "reading": "せおう", "answer": "Cõng, gánh vác trên lưng", "meaning": "Cõng, gánh vác trên lưng", "example": "荷物を背負って歩く。\n(Đeo/gánh hành lý trên lưng đi bộ.)" },
          { "id": "km-n3-c5-l1-11", "term": "挑戦", "reading": "ちょうせん", "answer": "Thử sức, thách thức", "meaning": "Thử sức, thách thức", "example": "世界チャンピオンにちょうせんする。\n(Thử sức với nhà vô địch thế giới.)" },
          { "id": "km-n3-c5-l1-12", "term": "戦い", "reading": "たたかい", "answer": "Cuộc chiến, trận đấu gian khổ", "meaning": "Cuộc chiến, trận đấu gian khổ", "example": "苦しいたたかいをせいした。\n(Đã chiến thắng cuộc chiến gian khổ.)" },
          { "id": "km-n3-c5-l1-13", "term": "決心", "reading": "けっしん", "answer": "Quyết tâm", "meaning": "Quyết tâm", "example": "日本への留学をけっしんした。\n(Quyết tâm đi du học Nhật Bản.)" },
          { "id": "km-n3-c5-l1-14", "term": "多数決", "reading": "たすうけつ", "answer": "Biểu quyết theo số đông", "meaning": "Biểu quyết theo số đông", "example": "たすうけつをとる。\n(Lấy ý kiến biểu quyết theo đa số.)" },
          { "id": "km-n3-c5-l1-15", "term": "決める", "reading": "きめる", "answer": "Quyết định, chọn lựa", "meaning": "Quyết định, chọn lựa", "example": "クラスのリーダーをきめる。\n(Bầu/chọn người trưởng nhóm của lớp.)" },
          { "id": "km-n3-c5-l1-16", "term": "決勝", "reading": "けっしょう", "answer": "Trận chung kết", "meaning": "Trận chung kết", "example": "けっしょうで勝利した。\n(Giành chiến thắng ở trận chung kết.)" },
          { "id": "km-n3-c5-l1-17", "term": "負ける", "reading": "まける", "answer": "Bị thua", "meaning": "Bị thua", "example": "試合にまけてしまった。\n(Đã bị thua trong trận đấu.)" },
          { "id": "km-n3-c5-l1-18", "term": "負かす", "reading": "まかす", "answer": "Đánh bại đối thủ", "meaning": "Đánh bại đối thủ", "example": "口げんかで相手をまかした。\n(Đánh bại đối thủ trong cuộc tranh luận/cãi lộn.)" },
          { "id": "km-n3-c5-l1-19", "term": "戦", "reading": "いくさ", "answer": "Cuộc chiến, trận chiến", "meaning": "Cuộc chiến, trận chiến", "example": "昔の戦の歴史を学ぶ。\n(Học lịch sử về các cuộc chiến ngày xưa.)" },
          { "id": "km-n3-c5-l1-20", "term": "決まる", "reading": "きまる", "answer": "Được quyết định, được ấn định", "meaning": "Được quyết định, được ấn định", "example": "日程が正式に決まる。\n(Lịch trình đã được quyết định chính thức.)" },
          { "id": "km-n3-c5-l1-21", "term": "勝つ", "reading": "かつ", "answer": "Thắng, chiến thắng", "meaning": "Thắng, chiến thắng", "example": "試合に勝ってうれしい。\n(Rất vui vì đã chiến thắng trong trận đấu.)" }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Chương 5 - Bài 2: 大会 (代, 表, 第, 回)",
    sections: [
      {
        id: "km-n3-c5-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c5-l2-1", "term": "代わる", "reading": "かわる", "answer": "Thay mặt, đại diện", "meaning": "Thay mặt, đại diện", "example": "父に代わって式に出た。\n(Thay mặt bố tham dự buổi lễ.)" },
          { "id": "km-n3-c5-l2-2", "term": "年代", "reading": "ねんだい", "answer": "Những năm, thập niên", "meaning": "Những năm, thập niên", "example": "この歌は1980年代にヒットした。\n(Bài hát này đã trở thành bản Hit vào những năm 1980.)" },
          { "id": "km-n3-c5-l2-3", "term": "食事代", "reading": "しょくじだい", "answer": "Tiền ăn uống", "meaning": "Tiền ăn uống", "example": "デートの食事代は私がはらった。\n(Tiền ăn uống trong buổi hẹn hò là do tôi trả.)" },
          { "id": "km-n3-c5-l2-4", "term": "代理", "reading": "だいり", "answer": "Đại lý, đại diện", "meaning": "Đại lý, đại diện", "example": "かちょうの代理で会議に出る。\n(Tham gia cuộc họp thay mặt cho tổ trưởng.)" },
          { "id": "km-n3-c5-l2-5", "term": "身の代金", "reading": "みのしろきん", "answer": "Tiền chuộc người", "meaning": "Tiền chuộc người", "example": "犯人は身代金を要求した。\n(Hung thủ đã yêu cầu tiền chuộc người.)" },
          { "id": "km-n3-c5-l2-7", "term": "表せない", "reading": "あらわせない", "answer": "Không thể diễn tả thành lời", "meaning": "Không thể diễn tả thành lời", "example": "言葉で表せないくらい感動した。\n(Cảm動 đến mức không thể diễn tả bằng lời.)" },
          { "id": "km-n3-c5-l2-8", "term": "表示", "reading": "ひょうじ", "answer": "Nhãn hiển thị, chỉ dẫn", "meaning": "Nhãn hiển thị, chỉ dẫn", "example": "洗濯する前に、服の表示を確認する。\n(Trước khi giặt phải kiểm tra nhãn chỉ dẫn trên quần áo.)" },
          { "id": "km-n3-c5-l2-9", "term": "回数券", "reading": "かいすうけん", "answer": "Tập vé lượt, vé tập", "meaning": "Tập vé lượt, vé tập", "example": "バスの回数券を買った。\n(Mua tập vé xe buýt theo lượt.)" },
          { "id": "km-n3-c5-l2-10", "term": "回る", "reading": "まわる", "answer": "Quay quanh, xoay", "meaning": "Quay quanh, xoay", "example": "地球のまわりを月が回っている。\n(Mặt trăng quay quanh Trái đất.)" },
          { "id": "km-n3-c5-l2-11", "term": "時代", "reading": "じだい", "answer": "Thời đại, thời đi học", "meaning": "Thời đại, thời đi học", "example": "学生じだいを思い出す。\n(Nhớ lại thời sinh viên học sinh.)" },
          { "id": "km-n3-c5-l2-12", "term": "交代", "reading": "こうたい", "answer": "Thay ca, đổi người", "meaning": "Thay ca, đổi người", "example": "けがをしたのでこうたいした。\n(Vì bị thương nên đã thay người.)" },
          { "id": "km-n3-c5-l2-13", "term": "表れる", "reading": "あらわれる", "answer": "Bộc lộ ra trên gương mặt", "meaning": "Bộc lộ ra trên gương mặt", "example": "うれしさが顔にあらわれている。\n(Sự vui mừng bộc lộ rõ trên gương mặt.)" },
          { "id": "km-n3-c5-l2-14", "term": "表", "reading": "おもて", "answer": "Bề ngoài, phía trước", "meaning": "Bề ngoài, phía trước", "example": "家のおもてから入る。\n(Đi vào từ cửa trước của ngôi nhà.)" },
          { "id": "km-n3-c5-l2-15", "term": "代表", "reading": "だいひょう", "answer": "Đại biểu, đội tuyển đại diện", "meaning": "Đại biểu, đội tuyển đại diện", "example": "サッカーの日本だいひょうに選ばれた。\n(Được tuyển chọn vào đội tuyển đại diện Nhật Bản.)" },
          { "id": "km-n3-c5-l2-16", "term": "回収", "reading": "かいしゅう", "answer": "Thu hồi, thu gom", "meaning": "Thu hồi, thu gom", "example": "宿題は授業の最初にかいしゅうする。\n(Bài tập về nhà được thu hồi vào đầu giờ học.)" },
          { "id": "km-n3-c5-l2-17", "term": "回す", "reading": "まわす", "answer": "Xoay, vặn", "meaning": "Xoay, vặn", "example": "こまをまわしてあそぶ。\n(Chơi trò xoay con quay.)" },
          { "id": "km-n3-c5-l2-18", "term": "第一回", "reading": "だいいっかい", "answer": "Lần thứ nhất, giải đấu lần đầu", "meaning": "Lần thứ nhất, giải đấu lần đầu", "example": "だいいっかい大会は東京で行われた。\n(Giải đấu lần thứ nhất đã được tổ chức ở Tokyo.)" },
          { "id": "km-n3-c5-l2-19", "term": "代える", "reading": "かえる", "answer": "Thay thế, đổi", "meaning": "Thay thế, đổi", "example": "ピッチャーを代える。\n(Thay đổi người ném bóng.)" },
          { "id": "km-n3-c5-l2-20", "term": "表す", "reading": "あらわす", "answer": "Biểu thị, thể hiện, diễn tả", "meaning": "Biểu thị, thể hiện, diễn tả", "example": "感謝の気持ちを表す。\n(Bày tỏ/thể hiện lòng biết ơn.)" }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Chương 5 - Bài 3: 記録 1 (記, 録, 優, 賞)",
    sections: [
      {
        id: "km-n3-c5-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c5-l3-1", "term": "記す", "reading": "しるす", "answer": "Ghi chép lại, lưu vết", "meaning": "Ghi chép lại, lưu vết", "example": "1日の出来事をノートに記す。\n(Ghi lại sự việc trong ngày vào cuốn sổ.)" },
          { "id": "km-n3-c5-l3-2", "term": "暗記", "reading": "あんき", "answer": "Học thuộc lòng", "meaning": "Học thuộc lòng", "example": "漢字を暗記する。\n(Học thuộc lòng các chữ Hán.)" },
          { "id": "km-n3-c5-l3-3", "term": "記入", "reading": "きにゅう", "answer": "Điền thông tin", "meaning": "Điền thông tin", "example": "書類に必要なことを記入する。\n(Điền các thông tin cần thiết vào giấy tờ.)" },
          { "id": "km-n3-c5-l3-4", "term": "登録", "reading": "とうろく", "answer": "Đăng ký khóa học/tài khoản", "meaning": "Đăng ký khóa học/tài khoản", "example": "英語のクラスに登録する。\n(Đăng ký vào lớp học tiếng Anh.)" },
          { "id": "km-n3-c5-l3-5", "term": "議事録", "reading": "ぎじろく", "answer": "Biên bản cuộc họp", "meaning": "Biên bản cuộc họp", "example": "会議の議事録を書いた。\n(Đã viết biên bản cuộc họp.)" },
          { "id": "km-n3-c5-l3-6", "term": "録画", "reading": "ろくが", "answer": "Ghi hình, thu hình", "meaning": "Ghi hình, thu hình", "example": "好きなドラマをDVDに録画する。\n(Thu hình bộ phim truyền hình yêu thích vào đĩa DVD.)" },
          { "id": "km-n3-c5-l3-7", "term": "優れる", "reading": "すぐれる", "answer": "Xuất sắc, ưu tú", "meaning": "Xuất sắc, ưu tú", "example": "数学で優れた成績をとる。\n(Đạt thành tích xuất sắc trong môn Toán.)" },
          { "id": "km-n3-c5-l3-8", "term": "優勝", "reading": "ゆうしょう", "answer": "Vô địch", "meaning": "Vô địch", "example": "初出場のチームが優勝した。\n(Đội lần đầu tham dự đã giành chức vô địch.)" },
          { "id": "km-n3-c5-l3-9", "term": "優先", "reading": "ゆうせん", "answer": "Ưu tiên thứ tự", "meaning": "Ưu tiên thứ tự", "example": "仕事の優先順位をつける。\n(Đặt thứ tự ưu tiên cho công việc.)" },
          { "id": "km-n3-c5-l3-10", "term": "賞状", "reading": "しょうじょう", "answer": "Giấy khen, bằng khen", "meaning": "Giấy khen, bằng khen", "example": "大会で一位になり、賞状をもらった。\n(Đạt vị trí thứ nhất ở giải đấu và nhận bằng khen.)" },
          { "id": "km-n3-c5-l3-11", "term": "日記", "reading": "にっき", "answer": "Nhật ký", "meaning": "Nhật ký", "example": "毎日にっきをつけている。\n(Hằng ngày đều viết nhật ký.)" },
          { "id": "km-n3-c5-l3-12", "term": "記事", "reading": "きじ", "answer": "Bài báo, bản tin", "meaning": "Bài báo, bản tin", "example": "事件についての新聞きじを読む。\n(Đọc bài báo về vụ án.)" },
          { "id": "km-n3-c5-l3-13", "term": "記念", "reading": "きねん", "answer": "Kỷ niệm", "meaning": "Kỷ niệm", "example": "旅行のきねんに写真をとる。\n(Chụp ảnh làm kỷ niệm chuyến đi du lịch.)" },
          { "id": "km-n3-c5-l3-14", "term": "新記録", "reading": "しんきろく", "answer": "Kỷ kỷ lục mới", "meaning": "Kỷ kỷ lục mới", "example": "今回の大会で世界新きろくが出た。\n(Tại giải đấu lần này kỷ lục thế giới mới đã được xác lập.)" },
          { "id": "km-n3-c5-l3-15", "term": "録音", "reading": "ろくおん", "answer": "Ghi âm", "meaning": "Ghi âm", "example": "首相のインタビューをろくおんする。\n(Ghi âm cuộc phỏng vấn thủ tướng.)" },
          { "id": "km-n3-c5-l3-16", "term": "優しい", "reading": "やさしい", "answer": "Dịu dàng, hiền lành", "meaning": "Dịu dàng, hiền lành", "example": "私の姉はとてもやさしい人だ。\n(Chị gái tôi là một người rất dịu dàng.)" },
          { "id": "km-n3-c5-l3-17", "term": "受賞", "reading": "じゅしょう", "answer": "Nhận giải thưởng, đoạt giải", "meaning": "Nhận giải thưởng, đoạt giải", "example": "田中氏はノーベル賞をじゅしょうした。\n(Ông Tanaka đã đoạt giải thưởng Nobel.)" },
          { "id": "km-n3-c5-l3-18", "term": "賞金", "reading": "しょうきん", "answer": "Tiền thưởng", "meaning": "Tiền thưởng", "example": "クイズ大会で、しょうきんをもらった。\n(Đã nhận được tiền thưởng ở cuộc thi đố vui.)" }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Chương 5 - Bài 4: 記録 2 (秒, 差, 測, 順)",
    sections: [
      {
        id: "km-n3-c5-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c5-l4-1", "term": "秒読み", "reading": "びょうよみ", "answer": "Đếm ngược từng giây", "meaning": "Đếm ngược từng giây", "example": "ビルの完成まで秒読みに入った。\n(Đã bước vào giai đoạn đếm ngược từng ngày/giây tới lúc hoàn thành tòa nhà.)" },
          { "id": "km-n3-c5-l4-2", "term": "毎秒", "reading": "まいびょう", "answer": "Mỗi giây", "meaning": "Mỗi giây", "example": "台風が毎秒30メートルで進む。\n(Cơn bão di chuyển với tốc độ 30m mỗi giây.)" },
          { "id": "km-n3-c5-l4-3", "term": "日差し", "reading": "ひざし", "answer": "Ánh nắng chiếu", "meaning": "Ánh nắng chiếu", "example": "夏は日差しが強い。\n(Vào mùa hè ánh nắng chiếu rất gay gắt.)" },
          { "id": "km-n3-c5-l4-4", "term": "時差", "reading": "じさ", "answer": "Chênh lệch múi giờ", "meaning": "Chênh lệch múi giờ", "example": "中国と日本の時差は1時間だ。\n(Chênh lệch múi giờ giữa Trung Quốc và Nhật Bản là 1 tiếng.)" },
          { "id": "km-n3-c5-l4-5", "term": "差", "reading": "さ", "answer": "Khoảng cách, chênh lệch", "meaning": "Khoảng cách, chênh lệch", "example": "大人と子どもは体力に大きな差がある。\n(Giữa người lớn và trẻ em có khoảng cách thể lực lớn.)" },
          { "id": "km-n3-c5-l4-6", "term": "差別", "reading": "さべつ", "answer": "Phân biệt đối xử", "meaning": "Phân biệt đối xử", "example": "人を差別してはいけない。\n(Không được phân biệt đối xử với người khác.)" },
          { "id": "km-n3-c5-l4-7", "term": "予測", "reading": "よそく", "answer": "Dự đoán", "meaning": "Dự đoán", "example": "来年はどんな年になるか予測する。\n(Dự đoán xem năm tới sẽ là một năm như thế nào.)" },
          { "id": "km-n3-c5-l4-8", "term": "測定", "reading": "そくてい", "answer": "Đo đạc, định lượng", "meaning": "Đo đạc, định lượng", "example": "来週、学校で体重測定がある。\n(Tuần tới ở trường sẽ có buổi kiểm tra đo trọng lượng cơ thể.)" },
          { "id": "km-n3-c5-l4-9", "term": "順序", "reading": "じゅんじょ", "answer": "Trình tự, thứ tự", "meaning": "Trình tự, thứ tự", "example": "数式を順序立てて説明する。\n(Giải thích công thức toán theo đúng trình tự.)" },
          { "id": "km-n3-c5-l4-10", "term": "順番", "reading": "じゅんばん", "answer": "Lượt, thứ tự", "meaning": "Lượt, thứ tự", "example": "自分の順番が来るまで楽屋で待つ。\n(Chờ trong phòng chờ cho tới lượt mình.)" },
          { "id": "km-n3-c5-l4-11", "term": "10秒", "reading": "じゅうびょう", "answer": "10 giây", "meaning": "10 giây", "example": "100メートルを10秒で走る選手。\n(Vận động viên chạy 100 mét hết 10 giây.)" },
          { "id": "km-n3-c5-l4-12", "term": "秒速", "reading": "びょうそく", "answer": "Vận tốc tính theo giây", "meaning": "Vận tốc tính theo giây", "example": "びょうそく10メートルの風がふく。\n(Gió thổi với vận tốc 10 mét mỗi giây.)" },
          { "id": "km-n3-c5-l4-13", "term": "大差", "reading": "たいさ", "answer": "Khác biệt nhiều", "meaning": "Khác biệt nhiều", "example": "どのパソコンも性能はたいさない。\n(Máy tính nào thì hiệu năng cũng không có khác biệt mấy.)" },
          { "id": "km-n3-c5-l4-14", "term": "差す", "reading": "さす", "answer": "Chiếu rọi, giơ lên", "meaning": "Chiếu rọi, giơ lên", "example": "雨が止んで、日が差してきた。\n(Mưa tạnh và ánh nắng bắt đầu chiếu rọi.)" },
          { "id": "km-n3-c5-l4-15", "term": "測量", "reading": "そくりょう", "answer": "Đo đạc địa hình/đất đai", "meaning": "Đo đạc địa hình/đất đai", "example": "家を建てるため土地をそくりょうする。\n(Đo đạc diện tích đất để xây nhà.)" },
          { "id": "km-n3-c5-l4-16", "term": "計測", "reading": "けいそく", "answer": "Cân đo, định lượng", "meaning": "Cân đo, định lượng", "example": "スーツケースの重量をけいそくする。\n(Cân đo định lượng trọng lượng chiếc vali.)" },
          { "id": "km-n3-c5-l4-17", "term": "順に", "reading": "じゅんに", "answer": "Theo thứ tự", "meaning": "Theo thứ tự", "example": "せが高いじゅんにならぶ。\n(Xếp hàng theo thứ tự chiều cao từ thấp đến cao.)" },
          { "id": "km-n3-c5-l4-18", "term": "不順", "reading": "ふじゅん", "answer": "Thất thường, không thuận lợi", "meaning": "Thất thường, không thuận lợi", "example": "てんこうふじゅんで作物が育たない。\n(Thời tiết thất thường nên cây trồng không thể phát triển.)" },
          { "id": "km-n3-c5-l4-19", "term": "測る", "reading": "はかる", "answer": "Đo đạc, đo lường", "meaning": "Đo đạc, đo lường", "example": "熱を測る。\n(Đo nhiệt độ / cặp nhiệt độ.)" }
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Chương 5 - Bài 5: 野球 (球, 打, 投, 点)",
    sections: [
      {
        id: "km-n3-c5-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c5-l5-1", "term": "地球儀", "reading": "ちきゅうぎ", "answer": "Quả địa cầu", "meaning": "Quả địa cầu", "example": "父に地球儀を買ってもらった。\n(Được bố mua cho quả địa cầu.)" },
          { "id": "km-n3-c5-l5-2", "term": "球技", "reading": "きゅうぎ", "answer": "Các môn thể thao dùng bóng", "meaning": "Các môn thể thao dùng bóng", "example": "球技は何でもとくいだ。\n(Môn thể thao dùng bóng nào tôi cũng giỏi.)" },
          { "id": "km-n3-c5-l5-3", "term": "打球", "reading": "だきゅう", "answer": "Cú đánh bóng", "meaning": "Cú đánh bóng", "example": "打球は遠くまで飛んだ。\n(Cú đánh bóng đã bay ra rất xa.)" },
          { "id": "km-n3-c5-l5-4", "term": "強打", "reading": "きょうだ", "answer": "Cú đập mạnh, đánh trúng mạnh", "meaning": "Cú đập mạnh, đánh trúng mạnh", "example": "転んで頭を強打した。\n(Bị ngã đập mạnh vào đầu.)" },
          { "id": "km-n3-c5-l5-5", "term": "代打", "reading": "だいだ", "answer": "Cầu thủ đánh bóng thay (bóng chày)", "meaning": "Cầu thủ đánh bóng thay (bóng chày)", "example": "代打に出てホームランを打った。\n(Vào sân đánh bóng thay và đánh được một cú Home run.)" },
          { "id": "km-n3-c5-l5-6", "term": "投打", "reading": "とうだ", "answer": "Ném và đánh bóng", "meaning": "Ném và đánh bóng", "example": "このチームは投打ともに優れている。\n(Đội bóng này xuất sắc ở cả kỹ năng ném và đánh bóng.)" },
          { "id": "km-n3-c5-l5-7", "term": "投書", "reading": "とうしょ", "answer": "Thư đóng góp ý kiến, bài viết gửi tòa báo", "meaning": "Thư đóng góp ý kiến, bài viết gửi tòa báo", "example": "記事についての投書がよせられる。\n(Nhận được nhiều thư độc giả gửi về bài báo.)" },
          { "id": "km-n3-c5-l5-8", "term": "重点", "reading": "じゅうてん", "answer": "Trọng tâm, điểm nhấn", "meaning": "Trọng tâm, điểm nhấn", "example": "苦手な英語に重点を置いて勉強する。\n(Tập trung học trọng tâm vào môn tiếng Anh vốn là điểm yếu.)" },
          { "id": "km-n3-c5-l5-9", "term": "満点", "reading": "まんてん", "answer": "Điểm tối đa, điểm tuyệt đối", "meaning": "Điểm tối đa, điểm tuyệt đối", "example": "勉強をがんばって試験で満点を取った。\n(Cố gắng học tập và đạt điểm tuyệt đối trong kỳ thi.)" },
          { "id": "km-n3-c5-l5-10", "term": "打点", "reading": "だてん", "answer": "Điểm số ghi được từ cú đánh bóng", "meaning": "Điểm số ghi được từ cú đánh bóng", "example": "その試合で彼は五打点をあげた。\n(Trong trận đấu đó anh ấy đã ghi được 5 điểm đánh bóng.)" },
          { "id": "km-n3-c5-l5-11", "term": "野球部", "reading": "やきゅうぶ", "answer": "Câu lạc bộ bóng chày, đội bóng chày", "meaning": "Câu lạc bộ bóng chày, đội bóng chày", "example": "高校生の時、野球部に入っていた。\n(Thời học sinh cấp 3 tôi tham gia câu lạc bộ bóng chày.)" },
          { "id": "km-n3-c5-l5-12", "term": "打つ", "reading": "うつ", "answer": "Đánh bóng, đập", "meaning": "Đánh bóng, đập", "example": "大事な試合でヒットをうった。\n(Đã đánh trúng cú Hit trong trận đấu quan trọng.)" },
          { "id": "km-n3-c5-l5-13", "term": "投手", "reading": "とうしゅ", "answer": "Cầu thủ ném bóng (Pitcher)", "meaning": "Cầu thủ ném bóng (Pitcher)", "example": "山田とうしゅは球が速い。\n(Cầu thủ ném bóng Yamada ném bóng rất nhanh.)" },
          { "id": "km-n3-c5-l5-14", "term": "投げる", "reading": "なげる", "answer": "Ném (sỏi, bóng...)", "meaning": "Ném (sỏi, bóng...)", "example": "川に向かって小石をなげた。\n(Ném hòn sỏi nhỏ hướng về phía dòng sông.)" },
          { "id": "km-n3-c5-l5-15", "term": "同点", "reading": "どうてん", "answer": "Hòa điểm", "meaning": "Hòa điểm", "example": "試合はどうてん引き分けに終わった。\n(Trận đấu kết thúc với tỷ số hòa điểm.)" },
          { "id": "km-n3-c5-l5-16", "term": "利点", "reading": "りてん", "answer": "Ưu điểm, điểm lợi", "meaning": "Ưu điểm, điểm lợi", "example": "駅に近いのがこの店のりてんだ。\n(Gần ga là ưu điểm lớn của cửa hàng này.)" },
          { "id": "km-n3-c5-l5-17", "term": "点数", "reading": "てんすう", "answer": "Điểm số", "meaning": "Điểm số", "example": "テストのてんすうが悪かった。\n(Điểm số bài kiểm tra rất tệ.)" },
          { "id": "km-n3-c5-l5-18", "term": "交差点", "reading": "こうさてん", "answer": "Ngã tư, giao lộ", "meaning": "Ngã tư, giao lộ", "example": "車に気を付けてこうさてんをわたる。\n(Chú ý xe ô tô khi sang đường ở ngã tư giao lộ.)" },
          { "id": "km-n3-c5-l5-19", "term": "球", "reading": "たま", "answer": "Quả bóng, quả cầu", "meaning": "Quả bóng, quả cầu", "example": "山田投手は球が速い。\n(Cầu thủ ném bóng Yamada ném bóng rất nhanh.)" }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Chương 6 - Bài 1: 恋愛 1 (感, 情, 恋, 愛)",
    sections: [
      {
        id: "km-n3-c6-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c6-l1-1", "term": "感情的", "reading": "かんじょうてき", "answer": "Mang tính cảm xúc, xúc động", "meaning": "Mang tính cảm xúc, xúc động", "example": "感情的に話してはいけない。\n(Không nên nói chuyện một cách quá cảm xúc/xúc động.)" },
          { "id": "km-n3-c6-l1-2", "term": "安心感", "reading": "あんしんかん", "answer": "Cảm giác an tâm", "meaning": "Cảm giác an tâm", "example": "子どもをだきしめて安心感をあたえる。\n(Ôm chặt đứa trẻ mang lại cảm giác an tâm.)" },
          { "id": "km-n3-c6-l1-3", "term": "感動", "reading": "かんどう", "answer": "Cảm động", "meaning": "Cảm động", "example": "実話を元にした映画を見て感動した。\n(Xem bộ phim dựa trên câu chuyện có thật và rất cảm động.)" },
          { "id": "km-n3-c6-l1-4", "term": "情け深い", "reading": "なさけぶかい", "answer": "Giàu lòng nhân ái, nhiều tình thương", "meaning": "Giàu lòng nhân ái, nhiều tình thương", "example": "彼は情け深い人だ。\n(Anh ấy là một người vô cùng giàu lòng nhân ái.)" },
          { "id": "km-n3-c6-l1-5", "term": "風情", "reading": "ふじょう", "answer": "Phong vị, nét trữ tình cổ kính", "meaning": "Phong vị, nét trữ tình cổ kính", "example": "この辺りは古い町の風情が残っている。\n(Khu vực này vẫn còn lưu giữ nét phong vị của thị trấn cổ.)" },
          { "id": "km-n3-c6-l1-6", "term": "恋しい", "reading": "こいしい", "answer": "Thương nhớ", "meaning": "Thương nhớ", "example": "母が作る料理が恋しい。\n(Thương nhớ món ăn do chính tay mẹ nấu.)" },
          { "id": "km-n3-c6-l1-7", "term": "恋う", "reading": "こう", "answer": "Thương nhớ người đã khuất", "meaning": "Thương nhớ người đã khuất", "example": "亡くなった妻を今も恋う。\n(Đến nay vẫn da diết thương nhớ người vợ đã qua đời.)" },
          { "id": "km-n3-c6-l1-8", "term": "愛用", "reading": "あいよう", "answer": "Thích dùng, dùng thường xuyên", "meaning": "Thích dùng, dùng thường xuyên", "example": "父にもらったペンを愛用している。\n(Thích và dùng thường xuyên chiếc bút được bố tặng.)" },
          { "id": "km-n3-c6-l1-9", "term": "愛情", "reading": "あいじょう", "answer": "Tình yêu thương", "meaning": "Tình yêu thương", "example": "彼は愛情表現が下手だ。\n(Anh ấy vụng về trong việc biểu lộ tình yêu thương.)" },
          { "id": "km-n3-c6-l1-10", "term": "大恋愛", "reading": "だいれんあい", "answer": "Mối tình sâu đậm", "meaning": "Mối tình sâu đậm", "example": "二人は大恋愛の末、結婚した。\n(Hai người sau một mối tình sâu đậm đã kết hôn.)" },
          { "id": "km-n3-c6-l1-11", "term": "感じる", "reading": "かんじる", "answer": "Cảm nhận, cảm thấy", "meaning": "Cảm nhận, cảm thấy", "example": "わずかだが、家がゆれたのを感じる。\n(Cảm nhận được ngôi nhà bị rung nhẹ một chút.)" },
          { "id": "km-n3-c6-l1-12", "term": "感想", "reading": "かんそう", "answer": "Cảm tưởng, nhận xét", "meaning": "Cảm tưởng, nhận xét", "example": "本を読んだかんそうを言う。\n(Nêu cảm tưởng sau khi đọc xong cuốn sách.)" },
          { "id": "km-n3-c6-l1-13", "term": "感心する", "reading": "かんしんする", "answer": "Khâm phục, thán phục", "meaning": "Khâm phục, thán phục", "example": "彼の心優しい行動に感心する。\n(Khâm phục trước hành động nhân hậu tràn đầy tình thương của anh ấy.)" },
          { "id": "km-n3-c6-l1-14", "term": "友情", "reading": "ゆうじょう", "answer": "Tình bạn", "meaning": "Tình bạn", "example": "二人のゆうじょうは末長く続くだろう。\n(Tình bạn của hai người chắc sẽ kéo dài mãi mãi.)" },
          { "id": "km-n3-c6-l1-15", "term": "同情する", "reading": "どうじょうする", "answer": "Đồng cảm, thương hại", "meaning": "Đồng cảm, thương hại", "example": "病気の友達に心からどうじょうする。\n(Đồng cảm chia sẻ từ đáy lòng với người bạn bị bệnh.)" },
          { "id": "km-n3-c6-l1-16", "term": "恋", "reading": "こい", "answer": "Tình yêu, phải lòng", "meaning": "Tình yêu, phải lòng", "example": "彼女は田中さんにこいをしている。\n(Cô ấy đang phải lòng/yêu anh Tanaka.)" },
          { "id": "km-n3-c6-l1-17", "term": "恋人", "reading": "こいびと", "answer": "Người yêu", "meaning": "Người yêu", "example": "こいびとは今外国に留学している。\n(Người yêu tôi hiện đang đi du học nước ngoài.)" },
          { "id": "km-n3-c6-l1-18", "term": "愛", "reading": "あい", "answer": "Tình yêu thương", "meaning": "Tình yêu thương", "example": "手紙を読んで、母のあいを知った。\n(Đọc bức thư mới hiểu được tình yêu thương của mẹ.)" },
          { "id": "km-n3-c6-l1-19", "term": "情け", "reading": "なさけ", "answer": "Lòng trắc ẩn, sự cảm thông, tình người", "meaning": "Lòng trắc ẩn, sự cảm thông, tình người", "example": "人に情けをかける。\n(Rủ lòng thương / trao sự cảm thông cho người khác.)" }
        ]
      }
    ]
  },
  {
    id: 17,
    title: "Chương 6 - Bài 2: 恋愛 2 (信, 想, 伝, 欲)",
    sections: [
      {
        id: "km-n3-c6-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c6-l2-1", "term": "信頼", "reading": "しんらい", "answer": "Tin cậy, tin tưởng", "meaning": "Tin cậy, tin tưởng", "example": "私は親から信頼されている。\n(Tôi nhận được sự tin cậy từ cha mẹ.)" },
          { "id": "km-n3-c6-l2-2", "term": "信号", "reading": "しんごう", "answer": "Đèn tín hiệu giao thông", "meaning": "Đèn tín hiệu giao thông", "example": "信号をよく見て横断歩道をわたる。\n(Nhìn kỹ đèn tín hiệu rồi mới đi qua vạch sang đường.)" },
          { "id": "km-n3-c6-l2-3", "term": "空想", "reading": "くうそう", "answer": "Tưởng tượng, mơ mộng", "meaning": "Tưởng tượng, mơ mộng", "example": "未来の生活を空想する。\n(Mơ mộng tưởng tượng về cuộc sống tương lai.)" },
          { "id": "km-n3-c6-l2-4", "term": "愛想がいい", "reading": "あいそがいい", "answer": "Thái độ hòa nhã, thiện cảm", "meaning": "Thái độ hòa nhã, thiện cảm", "example": "彼女はだれに対しても愛想がいい。\n(Cô ấy đối với ai cũng giữ thái độ rất hòa nhã dễ mến.)" },
          { "id": "km-n3-c6-l2-5", "term": "伝える", "reading": "つたえる", "answer": "Truyền đạt, nhắn lại", "meaning": "Truyền đạt, nhắn lại", "example": "電話で用件を伝える。\n(Nhắn lại nội dung công việc qua điện thoại.)" },
          { "id": "km-n3-c6-l2-6", "term": "伝う", "reading": "つたう", "answer": "Đi men theo", "meaning": "Đi men theo", "example": "階段の手すりを伝って上る。\n(Đi men theo tay vịn cầu thang để bước lên.)" },
          { "id": "km-n3-c6-l2-7", "term": "伝説", "reading": "でんせつ", "answer": "Truyền thuyết", "meaning": "Truyền thuyết", "example": "この村には昔からの伝説が多くある。\n(Ở ngôi làng này có nhiều truyền thuyết từ ngày xưa.)" },
          { "id": "km-n3-c6-l2-8", "term": "伝言", "reading": "でんごん", "answer": "Lời nhắn", "meaning": "Lời nhắn", "example": "友達に先生への伝言をたのむ。\n(Nhờ bạn gửi lời nhắn tới thầy giáo.)" },
          { "id": "km-n3-c6-l2-9", "term": "伝統", "reading": "でんとう", "answer": "Truyền thống", "meaning": "Truyền thống", "example": "日本の伝統文化にきょうみがある。\n(Có hứng thú đối với văn hóa truyền thống Nhật Bản.)" },
          { "id": "km-n3-c6-l2-10", "term": "欲する", "reading": "ほっする", "answer": "Ham muốn, mong muốn", "meaning": "Ham muốn, mong muốn", "example": "心の欲するままに行動する。\n(Hành động theo đúng ước muốn khao khát của con tim.)" },
          { "id": "km-n3-c6-l2-11", "term": "信じる", "reading": "しんじる", "answer": "Tin tưởng", "meaning": "Tin tưởng", "example": "私は彼をしんじている。\n(Tôi luôn tin tưởng anh ấy.)" },
          { "id": "km-n3-c6-l2-12", "term": "自信", "reading": "じしん", "answer": "Sự tự tin", "meaning": "Sự tự tin", "example": "人の前で話すことにじしんがある。\n(Có sự tự tin khi nói chuyện trước đám đông.)" },
          { "id": "km-n3-c6-l2-13", "term": "信用", "reading": "しんよう", "answer": "Tin tưởng, tín nhiệm", "meaning": "Tin tưởng, tín nhiệm", "example": "友達をしんようしてお金を貸した。\n(Tin tưởng bạn bè nên đã cho mượn tiền.)" },
          { "id": "km-n3-c6-l2-14", "term": "予想", "reading": "よそう", "answer": "Dự đoán", "meaning": "Dự đoán", "example": "どちらが勝つかよそうする。\n(Dự đoán xem bên nào sẽ giành chiến thắng.)" },
          { "id": "km-n3-c6-l2-15", "term": "理想", "reading": "りそう", "answer": "Lý tưởng", "meaning": "Lý tưởng", "example": "彼はりそうの恋人だ。\n(Anh ấy là mẫu người yêu lý tưởng.)" },
          { "id": "km-n3-c6-l2-16", "term": "伝わる", "reading": "つたわる", "answer": "Được truyền tải, cảm nhận", "meaning": "Được truyền tải, cảm nhận", "example": "表情から彼の悲しみがつたわった。\n(Cảm nhận được nỗi buồn của anh ấy qua nét mặt.)" },
          { "id": "km-n3-c6-l2-17", "term": "食欲", "reading": "しょくよく", "answer": "Cảm giác thèm ăn", "meaning": "Cảm giác thèm ăn", "example": "いいにおいがしてしょくよくがわく。\n(Thấy mùi thơm nức là cảm giác thèm ăn dâng trào.)" },
          { "id": "km-n3-c6-l2-18", "term": "欲しい", "reading": "ほしい", "answer": "Muốn có", "meaning": "Muốn có", "example": "人気ブランドの洋服がほしい。\n(Muốn có bộ quần áo của thương hiệu nổi tiếng.)" }
        ]
      }
    ]
  },
  {
    id: 18,
    title: "Chương 6 - Bài 3: 悩み (苦, 悩, 困, 難)",
    sections: [
      {
        id: "km-n3-c6-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c6-l3-1", "term": "苦しむ", "reading": "くるしむ", "answer": "Đau đớn, chịu đựng", "meaning": "Đau đớn, chịu đựng", "example": "重い病気で長い間苦しんでいる。\n(Chịu đựng đau đớn trong thời gian dài vì bệnh nặng.)" },
          { "id": "km-n3-c6-l3-2", "term": "苦しめる", "reading": "くるしめる", "answer": "Làm khổ", "meaning": "Làm khổ", "example": "若いころ非行に走って親を苦しめた。\n(Thời trẻ lỡ bước sa ngã làm khổ cha mẹ.)" },
          { "id": "km-n3-c6-l3-3", "term": "苦み", "reading": "にがみ", "answer": "Vị đắng", "meaning": "Vị đắng", "example": "このコーヒーは少し苦みがある。\n(Cà phê này có vị đắng nhẹ.)" },
          { "id": "km-n3-c6-l3-4", "term": "苦痛", "reading": "くつう", "answer": "Nỗi đau đớn", "meaning": "Nỗi đau đớn", "example": "苦痛を和らげる薬を飲む。\n(Uống thuốc xoa dịu nỗi đau đớn.)" },
          { "id": "km-n3-c6-l3-5", "term": "苦情", "reading": "くじょう", "answer": "Phàn nàn, khiếu nại", "meaning": "Phàn nàn, khiếu nại", "example": "テレビの音がうるさくて苦情を言った。\n(Phàn nàn vì tiếng tivi quá ồn ào.)" },
          { "id": "km-n3-c6-l3-6", "term": "悩ます", "reading": "なやます", "answer": "Làm phiền, làm đau đầu, trăn trở", "meaning": "Làm phiền, làm đau đầu, trăn trở", "example": "頭痛に悩まされている。\n(Bị hành hạ chịu đựng chứng đau đầu.)" },
          { "id": "km-n3-c6-l3-7", "term": "困る", "reading": "こまる", "answer": "Gặp rắc rối, khó khăn", "meaning": "Gặp rắc rối, khó khăn", "example": "急に雨が降り出して困った。\n(Trời đột nhiên đổ mưa làm gặp rắc rối.)" },
          { "id": "km-n3-c6-l3-8", "term": "困難", "reading": "こんなん", "answer": "Khó khăn, gian khổ", "meaning": "Khó khăn, gian khổ", "example": "彼はどんな困難にも立ち向かう人だ。\n(Anh ấy là người luôn đương đầu với mọi khó khăn.)" },
          { "id": "km-n3-c6-l3-9", "term": "難い", "reading": "かたい", "answer": "Khó... (khó chịu đựng, khó tin...)", "meaning": "Khó... (khó chịu đựng, khó tin...)", "example": "たえ難い痛みに病院へ運ばれた。\n(Đau đớn khó chịu đựng nổi phải đưa đi cấp cứu.)" },
          { "id": "km-n3-c6-l3-10", "term": "難所", "reading": "なんしょ", "answer": "Khâu khó khăn nhất", "meaning": "Khâu khó khăn nhất", "example": "工事は今、最大の難所にかかっている。\n(Công trình hiện đang ở khâu khó khăn nhất.)" },
          { "id": "km-n3-c6-l3-11", "term": "苦しい", "reading": "くるしい", "answer": "Khó thở, vất vả", "meaning": "Khó thở, vất vả", "example": "せきが止まらなくて苦しい。\n(Ho không dứt nên rất khó thở.)" },
          { "id": "km-n3-c6-l3-12", "term": "苦い", "reading": "にがい", "answer": "Đắng", "meaning": "Đắng", "example": "このお茶は苦い。\n(Trà này vị rất đắng.)" },
          { "id": "km-n3-c6-l3-13", "term": "苦労する", "reading": "くろうする", "answer": "Vất vả gian khổ", "meaning": "Vất vả gian khổ", "example": "私の親は若い時苦労したそうだ。\n(Cha mẹ tôi nghe nói thời trẻ rất vất vả.)" },
          { "id": "km-n3-c6-l3-14", "term": "苦心する", "reading": "くしんする", "answer": "Khổ công, nhọc công", "meaning": "Khổ công, nhọc công", "example": "レポートをまとめるのに苦心する。\n(Nhọc công tóm tắt bài báo cáo.)" },
          { "id": "km-n3-c6-l3-15", "term": "悩む", "reading": "なやむ", "answer": "Trăn trở, băn khoăn", "meaning": "Trăn trở, băn khoăn", "example": "進学するか帰国するか、悩んでいる。\n(Đang băn khoăn trăn trở giữa việc học tiếp hay về nước.)" },
          { "id": "km-n3-c6-l3-16", "term": "困る", "reading": "こまる", "answer": "Gặp khó khăn, rắc rối", "meaning": "Gặp khó khăn, rắc rối", "example": "お金がなくて生活に困っている。\n(Không có tiền nên gặp khó khăn trong cuộc sống.)" },
          { "id": "km-n3-c6-l3-17", "term": "難しい", "reading": "むずかしい", "answer": "Khó khăn, phức tạp", "meaning": "Khó khăn, phức tạp", "example": "問題が難しくて、答えがわからない。\n(Bài toán khó quá không biết câu trả lời.)" },
          { "id": "km-n3-c6-l3-18", "term": "難問", "reading": "なんもん", "answer": "Bài toán hóc húa, câu hỏi khó", "meaning": "Bài toán hóc húa, câu hỏi khó", "example": "数学の難問をすらすら解いた。\n(Giải trơn tru bài toán hóc húa môn toán.)" },
          { "id": "km-n3-c6-l3-19", "term": "苦がる", "reading": "にがる", "answer": "Nhăn mặt vì đắng, nhăn nhó", "meaning": "Nhăn mặt vì đắng, nhăn nhó", "example": "薬の苦さに苦がる。\n(Nhăn mặt vì vị đắng của thuốc.)" }
        ]
      }
    ]
  },
  {
    id: 19,
    title: "Chương 6 - Bài 4: 気持ちの表れ 1 (怒, 悲, 笑, 喜)",
    sections: [
      {
        id: "km-n3-c6-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c6-l4-1", "term": "怒る", "reading": "おこる", "answer": "Tức giận, nổi giận", "meaning": "Tức giận, nổi giận", "example": "成績が下がって親に怒られた。\n(Thành tích học tập sụt giảm nên bị cha mẹ mắng.)" },
          { "id": "km-n3-c6-l4-2", "term": "激怒する", "reading": "げきどする", "answer": "Tức giận đùng đùng", "meaning": "Tức giận đùng đùng", "example": "相手の失礼なたいどに激怒する。\n(Tức giận đùng đùng trước thái độ thất lễ của đối phương.)" },
          { "id": "km-n3-c6-l4-3", "term": "悲しい", "reading": "かなしい", "answer": "Đau buồn", "meaning": "Đau buồn", "example": "かわいがっていた犬が死んで悲しい。\n(Chú chó cưng yêu quý qua đời thật đau buồn.)" },
          { "id": "km-n3-c6-l4-4", "term": "悲劇", "reading": "ひげき", "answer": "Bi kịch", "meaning": "Bi kịch", "example": "二人の結婚は悲劇に終わった。\n(Cuộc hôn nhân của hai người kết thúc bằng bi kịch.)" },
          { "id": "km-n3-c6-l4-5", "term": "悲観", "reading": "ひかん", "answer": "Bi quan", "meaning": "Bi quan", "example": "しょうらいを悲観してはいけない。\n(Không được quá bi quan về tương lai.)" },
          { "id": "km-n3-c6-l4-6", "term": "笑う", "reading": "わらう", "answer": "Cười to thành tiếng", "meaning": "Cười to thành tiếng", "example": "面白い話に声をあげて笑った。\n(Nghe câu chuyện thú vị và cười to thành tiếng.)" },
          { "id": "km-n3-c6-l4-7", "term": "爆笑する", "reading": "ばくしょうする", "answer": "Cười nổ tung, cười phá lên", "meaning": "Cười nổ tung, cười phá lên", "example": "彼のギャグにクラス中が爆笑した。\n(Cả lớp cười nổ tung trước trò đùa của anh ấy.)" },
          { "id": "km-n3-c6-l4-8", "term": "笑む", "reading": "えむ", "answer": "Mỉm cười", "meaning": "Mỉm cười", "example": "赤ちゃんを見て、思わずほほ笑んだ。\n(Ngắm đứa bé và vô thức mỉm cười.)" },
          { "id": "km-n3-c6-l4-9", "term": "喜ぶ", "reading": "よろこぶ", "answer": "Vui mừng, đón nhận vui vẻ", "meaning": "Vui mừng, đón nhận vui vẻ", "example": "ジュースを差し入れて喜ばれた。\n(Mang nước giải khát đến tiếp tế và được đón nhận vui vẻ.)" },
          { "id": "km-n3-c6-l4-10", "term": "喜怒哀楽", "reading": "きどあいらく", "answer": "Hỷ nộ ái ố, cảm xúc vui buồn", "meaning": "Hỷ nộ ái ố, cảm xúc vui buồn", "example": "彼女は喜怒哀楽がはっきりした性格だ。\n(Cô ấy có tính cách biểu lộ rõ ràng hỷ nộ ái ố.)" },
          { "id": "km-n3-c6-l4-11", "term": "怒り", "reading": "いかり", "answer": "Cơn giận", "meaning": "Cơn giận", "example": "失言により相手のいかりを買った。\n(Do lỡ lời nên đã chuốc lấy cơn giận của đối phương.)" },
          { "id": "km-n3-c6-l4-12", "term": "悲しむ", "reading": "かなしむ", "answer": "Đau buồn", "meaning": "Đau buồn", "example": "友人の死をかなしむ。\n(Đau buồn trước sự ra đi của bạn mình.)" },
          { "id": "km-n3-c6-l4-13", "term": "悲恋", "reading": "ひれん", "answer": "Mối tình buồn, thất tình", "meaning": "Mối tình buồn, thất tình", "example": "ひれんの物語を読んだ。\n(Đọc cuốn tiểu thuyết về mối tình buồn.)" },
          { "id": "km-n3-c6-l4-14", "term": "大笑いする", "reading": "おおわらいする", "answer": "Cười lớn", "meaning": "Cười lớn", "example": "落語を聞いておおわらいする。\n(Nghe kịch Rakugo và cười khoái chí.)" },
          { "id": "km-n3-c6-l4-15", "term": "笑顔", "reading": "えがお", "answer": "Nụ cười rạng rỡ", "meaning": "Nụ cười rạng rỡ", "example": "彼女はいつもえがおを絶やさない。\n(Cô ấy lúc nào cũng rạng rỡ nụ cười tươi.)" },
          { "id": "km-n3-c6-l4-16", "term": "笑い声", "reading": "わらいごえ", "answer": "Tiếng cười", "meaning": "Tiếng cười", "example": "となりの教室からわらいごえがする。\n(Nghe thấy tiếng cười từ phòng học bên cạnh.)" },
          { "id": "km-n3-c6-l4-17", "term": "喜ぶ", "reading": "よろこぶ", "answer": "Vui mừng cho", "meaning": "Vui mừng cho", "example": "母は大学合格をよろこんでくれた。\n(Mẹ đã rất vui mừng vì tôi thi đỗ đại học.)" },
          { "id": "km-n3-c6-l4-18", "term": "大喜びする", "reading": "おおよろこびする", "answer": "Vui mừng khôn xiết", "meaning": "Vui mừng khôn xiết", "example": "さいふが見つかっておおよろこびする。\n(Vui mừng khôn xiết khi tìm lại được chiếc ví.)" },
          { "id": "km-n3-c6-l4-19", "term": "怒る", "reading": "いかる", "answer": "Nổi giận, phẫn nộ", "meaning": "Nổi giận, phẫn nộ", "example": "不正に対して怒る。\n(Phẫn nộ/tức giận trước hành vi bất chính.)" }
        ]
      }
    ]
  },
  {
    id: 20,
    title: "Chương 6 - Bài 5: 気持ちの表れ 2 (残, 念, 泣, 涙)",
    sections: [
      {
        id: "km-n3-c6-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c6-l5-1", "term": "残す", "reading": "のこす", "answer": "Để thừa lại", "meaning": "Để thừa lại", "example": "注文した料理を残してしまった。\n(Đã lỡ để thừa lại món ăn đã gọi.)" },
          { "id": "km-n3-c6-l5-2", "term": "残留する", "reading": "ざんりゅうする", "answer": "Đọng lại, còn sót lại", "meaning": "Đọng lại, còn sót lại", "example": "野菜に農薬が残留する。\n(Dư lượng thuốc trừ sâu còn đọng lại trên rau.)" },
          { "id": "km-n3-c6-l5-3", "term": "残雪", "reading": "ざんせつ", "answer": "Tuyết đọng còn sót lại", "meaning": "Tuyết đọng còn sót lại", "example": "山に残雪があるのが見える。\n(Nhìn thấy vết tuyết đọng còn sót lại trên núi.)" },
          { "id": "km-n3-c6-l5-4", "term": "専念する", "reading": "せんねんする", "answer": "Chuyên tâm", "meaning": "Chuyên tâm", "example": "アルバイトを辞めて勉強に専念する。\n(Nghỉ làm thêm để chuyên tâm vào học hành.)" },
          { "id": "km-n3-c6-l5-5", "term": "念願", "reading": "ねんがん", "answer": "Nguyện vọng thiết tha", "meaning": "Nguyện vọng thiết tha", "example": "念願のマイホームを手に入れた。\n(Sắm được ngôi nhà riêng mơ ước bấy lâu.)" },
          { "id": "km-n3-c6-l5-6", "term": "信念", "reading": "しんねん", "answer": "Niềm tin, giữ vững niềm tin", "meaning": "Niềm tin, giữ vững niềm tin", "example": "彼は信念を曲げない人だ。\n(Anh ấy là người không bao giờ từ bỏ niềm tin.)" },
          { "id": "km-n3-c6-l5-7", "term": "念のため", "reading": "ねんのため", "answer": "Để cho cẩn thận", "meaning": "Để cho cẩn thận", "example": "念のため、連絡先を教えてもらう。\n(Hỏi xin địa chỉ liên lạc cho cẩn thận.)" },
          { "id": "km-n3-c6-l5-8", "term": "泣く", "reading": "なく", "answer": "Khóc", "meaning": "Khóc", "example": "映画のラストシーンに泣いた。\n(Rơi nước mắt ở cảnh kết của bộ phim.)" },
          { "id": "km-n3-c6-l5-9", "term": "号泣する", "reading": "ごうきゅうする", "answer": "Khóc nức nở", "meaning": "Khóc nức nở", "example": "そふが亡くなり、号泣する父を見た。\n(Chứng kiến cảnh bố khóc nức nở khi ông nội qua đời.)" },
          { "id": "km-n3-c6-l5-10", "term": "涙声", "reading": "なみだごえ", "answer": "Giọng nghẹn ngào nước mắt", "meaning": "Giọng nghẹn ngào nước mắt", "example": "話の途中で突然涙声になる。\n(Đang nói chuyện đột nhiên giọng trở nên nghẹn ngào.)" },
          { "id": "km-n3-c6-l5-11", "term": "残る", "reading": "のこる", "answer": "Ở lại, còn lại", "meaning": "Ở lại, còn lại", "example": "会社に遅くまで残って仕事をした。\n(Ở lại công ty muộn để làm việc.)" },
          { "id": "km-n3-c6-l5-12", "term": "残念", "reading": "ざんねん", "answer": "Đáng tiếc", "meaning": "Đáng tiếc", "example": "残念ながら今年も不合格だった。\n(Thật đáng tiếc là năm nay lại thi trượt.)" },
          { "id": "km-n3-c6-l5-13", "term": "残さず", "reading": "のこさず", "answer": "Không chừa lại tẹo nào", "meaning": "Không chừa lại tẹo nào", "example": "出された料理を残さず全部食べた。\n(Ăn hết sạch món ăn bưng ra không chừa lại tẹo nào.)" },
          { "id": "km-n3-c6-l5-14", "term": "入念に", "reading": "にゅうねんに", "answer": "Kỹ lưỡng, tỉ mỉ", "meaning": "Kỹ lưỡng, tỉ mỉ", "example": "忘れ物がないか入念に確認する。\n(Kiểm tra tỉ mỉ xem có quên đồ gì không.)" },
          { "id": "km-n3-c6-l5-15", "term": "理念", "reading": "りねん", "answer": "Triết lý", "meaning": "Triết lý", "example": "大学の教育理念に共感する。\n(Đồng cảm với triết lý giáo dục của trường đại học.)" },
          { "id": "km-n3-c6-l5-16", "term": "悔し泣き", "reading": "くやしなき", "answer": "Khóc vì tức giận/uất khuất", "meaning": "Khóc vì tức giận/uất khuất", "example": "試合に負けて悔し泣きをした。\n(Khóc uất khuất vì thua trận đấu.)" },
          { "id": "km-n3-c6-l5-17", "term": "泣き虫", "reading": "なきむし", "answer": "Đứa trẻ mít ướt", "meaning": "Đứa trẻ mít ướt", "example": "子どものころは泣き虫だった。\n(Hồi nhỏ tôi là một đứa trẻ rất mít ướt.)" },
          { "id": "km-n3-c6-l5-18", "term": "涙", "reading": "なみだ", "answer": "Nước mắt", "meaning": "Nước mắt", "example": "玉ねぎを切ったら涙が出た。\n(Thái hành tây làm nước mắt chảy ra.)" }
        ]
      }
    ]
  },
  {
    id: 21,
    title: "Chương 7 - Bài 1: 結婚 (結, 婚, 紹, 介)",
    sections: [
      {
        id: "km-n3-c7-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c7-l1-1", "term": "結ぶ", "reading": "むすぶ", "answer": "Buộc, cột", "meaning": "Buộc, cột", "example": "くつのひもを結ぶ。\n(Buộc dây giày.)" },
          { "id": "km-n3-c7-l1-2", "term": "結わえる", "reading": "ゆわえる", "answer": "Buộc lại, cột lại", "meaning": "Buộc lại, cột lại", "example": "かみを一つに結わえる。\n(Buộc tóc gọn lại làm một.)" },
          { "id": "km-n3-c7-l1-3", "term": "結う", "reading": "ゆう", "answer": "Búi tóc, cột tóc", "meaning": "Búi tóc, cột tóc", "example": "自分で毎日かみを結う。\n(Tự mình tết/búi tóc mỗi ngày.)" },
          { "id": "km-n3-c7-l1-4", "term": "結婚", "reading": "けっこん", "answer": "Kết hôn, cưới xin", "meaning": "Kết hôn, cưới xin", "example": "来年結婚することになった。\n(Đã quyết định sang năm sẽ kết hôn.)" },
          { "id": "km-n3-c7-l1-5", "term": "結果", "reading": "けっか", "answer": "Kết quả", "meaning": "Kết quả", "example": "面接試験の結果が出た。\n(Đã có kết quả buổi phỏng vấn.)" },
          { "id": "km-n3-c7-l1-6", "term": "金婚式", "reading": "きんこんしき", "answer": "Lễ kỷ niệm đám cưới vàng", "meaning": "Lễ kỷ niệm đám cưới vàng", "example": "金婚式のお祝いをする。\n(Tổ chức chúc mừng lễ kỷ niệm đám cưới vàng.)" },
          { "id": "km-n3-c7-l1-7", "term": "新婚旅行", "reading": "しんこんりょこう", "answer": "Chuyến đi tuần trăng mật", "meaning": "Chuyến đi tuần trăng mật", "example": "新婚旅行でヨーロッパへ行く。\n(Đi châu Âu du lịch tuần trăng mật.)" },
          { "id": "km-n3-c7-l1-8", "term": "紹介", "reading": "しょうかい", "answer": "Giới thiệu", "meaning": "Giới thiệu", "example": "友人の紹介で彼に出会った。\n(Tôi đã gặp anh ấy qua lời giới thiệu của bạn bè.)" },
          { "id": "km-n3-c7-l1-9", "term": "仲介料", "reading": "ちゅうかいりょう", "answer": "Phí môi giới", "meaning": "Phí môi giới", "example": "不動産会社に仲介料をはらう。\n(Trả phí môi giới cho công ty bất động sản.)" },
          { "id": "km-n3-c7-l1-10", "term": "魚介類", "reading": "ぎょかいるい", "answer": "Các loại hải sản", "meaning": "Các loại hải sản", "example": "魚介類の中でも特にえびが好きだ。\n(Trong các loại hải sản tôi đặc biệt thích tôm.)" },
          { "id": "km-n3-c7-l1-11", "term": "結末", "reading": "けつまつ", "answer": "Kết cục, cái kết", "meaning": "Kết cục, cái kết", "example": "ドラマの結末が気になる。\n(Tò mò về kết cục của bộ phim.)" },
          { "id": "km-n3-c7-l1-12", "term": "結論", "reading": "けつろん", "answer": "Kết luận", "meaning": "Kết luận", "example": "議論を重ねて結論を出す。\n(Đưa ra kết luận sau khi tranh luận nhiều lần.)" },
          { "id": "km-n3-c7-l1-13", "term": "婚約", "reading": "こんやく", "answer": "Đính hôn, hứa hôn", "meaning": "Đính hôn, hứa hôn", "example": "社長の娘と婚約する。\n(Đính hôn với con gái của giám đốc.)" },
          { "id": "km-n3-c7-l1-14", "term": "未婚", "reading": "みこん", "answer": "Chưa kết hôn, độc thân", "meaning": "Chưa kết hôn, độc thân", "example": "働く未婚女性が増えている。\n(Số phụ nữ chưa kết hôn đi làm đang tăng lên.)" },
          { "id": "km-n3-c7-l1-15", "term": "魚介", "reading": "ぎょかい", "answer": "Hải sản", "meaning": "Hải sản", "example": "魚介のソースを作る。\n(Làm nước sốt hải sản.)" }
        ]
      }
    ]
  },
  {
    id: 22,
    title: "Chương 7 - Bài 2: 独身 (独, 身, 貯, 期)",
    sections: [
      {
        id: "km-n3-c7-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c7-l2-1", "term": "独身", "reading": "どくしん", "answer": "Độc thân", "meaning": "Độc thân", "example": "彼は独身だそうだ。\n(Nghe nói anh ấy vẫn còn độc thân.)" },
          { "id": "km-n3-c7-l2-2", "term": "独立する", "reading": "どくりつする", "answer": "Độc lập, tự lập", "meaning": "Độc lập, tự lập", "example": "会社を辞めて独立した。\n(Nghỉ việc ở công ty và ra tự lập kinh doanh.)" },
          { "id": "km-n3-c7-l2-3", "term": "独り言", "reading": "ひとりごと", "answer": "Nói một mình, độc thoại", "meaning": "Nói một mình, độc thoại", "example": "テレビを見ながら独り言をつぶやく。\n(Vừa xem tivi vừa thì thầm nói một mình.)" },
          { "id": "km-n3-c7-l2-4", "term": "身近", "reading": "みぢか", "answer": "Gần gũi, thân cận", "meaning": "Gần gũi, thân cận", "example": "身近な人に相談する。\n(Thảo luận với người thân cận gần gũi.)" },
          { "id": "km-n3-c7-l2-5", "term": "身長", "reading": "しんちょう", "answer": "Chiều cao cơ thể", "meaning": "Chiều cao cơ thể", "example": "あの選手は身長が190センチもある。\n(Vận động viên đó có chiều cao tới 190 cm.)" },
          { "id": "km-n3-c7-l2-6", "term": "貯金する", "reading": "ちょきんする", "answer": "Tiết kiệm tiền, gửi tiết kiệm", "meaning": "Tiết kiệm tiền, gửi tiết kiệm", "example": "ボーナスから十万円を貯金する。\n(Trích 10万 yen từ tiền thưởng để tiết kiệm.)" },
          { "id": "km-n3-c7-l2-7", "term": "貯蔵する", "reading": "ちょぞうする", "answer": "Bảo quản, lưu trữ", "meaning": "Bảo quản, lưu trữ", "example": "食料をそうこで貯蔵する。\n(Bảo quản lương thực thực phẩm trong kho.)" },
          { "id": "km-n3-c7-l2-8", "term": "期末", "reading": "きまつ", "answer": "Cuối kỳ", "meaning": "Cuối kỳ", "example": "期末テストの点数が悪かった。\n(Điểm số bài kiểm tra cuối kỳ rất tệ.)" },
          { "id": "km-n3-c7-l2-9", "term": "期待", "reading": "きたい", "answer": "Kỳ vọng, mong đợi", "meaning": "Kỳ vọng, mong đợi", "example": "親の期待にこたえるためにがんばった。\n(Cố gắng để đáp lại sự kỳ vọng của cha mẹ.)" },
          { "id": "km-n3-c7-l2-10", "term": "最期", "reading": "さいご", "answer": "Lâm chung, phút cuối đời", "meaning": "Lâm chung, phút cuối đời", "example": "祖父と最期のお別れをする。\n(Tiễn biệt ông nội lần cuối.)" },
          { "id": "km-n3-c7-l2-11", "term": "独り立ち", "reading": "ひとりだち", "answer": "Tự lập", "meaning": "Tự lập", "example": "親元をはなれ、独り立ちする。\n(Rời xa vòng tay cha mẹ để tự lập.)" },
          { "id": "km-n3-c7-l2-12", "term": "出身", "reading": "しゅっしん", "answer": "Xuất thân, quê quán", "meaning": "Xuất thân, quê quán", "example": "私と彼は出身大学が同じだ。\n(Tôi và anh ấy xuất thân từ cùng một trường đại học.)" },
          { "id": "km-n3-c7-l2-13", "term": "身分証明書", "reading": "みぶんしょうめいしょ", "answer": "Giấy chứng minh nhân dân, giấy tờ tùy thân", "meaning": "Giấy chứng minh nhân dân, giấy tờ tùy thân", "example": "身分証明書を見せる。\n(Xuất trình giấy tờ tùy thân.)" },
          { "id": "km-n3-c7-l2-14", "term": "中身", "reading": "なかみ", "answer": "Nội dung bên trong", "meaning": "Nội dung bên trong", "example": "中身のない話をする。\n(Nói câu chuyện rỗng tuếch không có nội dung.)" },
          { "id": "km-n3-c7-l2-15", "term": "前期", "reading": "ぜんき", "answer": "Học kỳ đầu", "meaning": "Học kỳ đầu", "example": "前期のテストを受ける。\n(Dự thi kỳ thi học kỳ đầu.)" },
          { "id": "km-n3-c7-l2-16", "term": "新学期", "reading": "しんがっき", "answer": "Học kỳ mới", "meaning": "Học kỳ mới", "example": "新学期が始まる前に旅行する。\n(Đi du lịch trước khi học kỳ mới bắt đầu.)" }
        ]
      }
    ]
  },
  {
    id: 23,
    title: "Chương 7 - Bài 3: 婚約 (約, 束, 必, 守)",
    sections: [
      {
        id: "km-n3-c7-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c7-l3-1", "term": "予約する", "reading": "よやくする", "answer": "Đặt trước", "meaning": "Đặt trước", "example": "ホテルを予約する。\n(Đặt phòng khách sạn trước.)" },
          { "id": "km-n3-c7-l3-2", "term": "婚約指輪", "reading": "こんやくゆびわ", "answer": "Nhẫn đính hôn", "meaning": "Nhẫn đính hôn", "example": "彼に婚約指輪をもらった。\n(Tôi đã nhận được chiếc nhẫn đính hôn từ anh ấy.)" },
          { "id": "km-n3-c7-l3-3", "term": "花束", "reading": "はなたば", "answer": "Bó hoa", "meaning": "Bó hoa", "example": "恋人に花束をプレゼントする。\n(Tặng bó hoa cho người yêu.)" },
          { "id": "km-n3-c7-l3-4", "term": "束", "reading": "たば", "answer": "Bó, xấp, cọc tiền", "meaning": "Bó, xấp, cọc tiền", "example": "山の中で札の束が見つかった。\n(Tìm thấy một xấp tiền trong núi.)" },
          { "id": "km-n3-c7-l3-5", "term": "必ず", "reading": "かならず", "answer": "Nhất định, chắc chắn", "meaning": "Nhất định, chắc chắn", "example": "必ず宿題を出さなくてはいけない。\n(Nhất định phải nộp bài tập về nhà.)" },
          { "id": "km-n3-c7-l3-6", "term": "必勝", "reading": "ひっしょう", "answer": "Quyết thắng", "meaning": "Quyết thắng", "example": "必勝を願って応援した。\n(Cổ vũ với mong ước đội nhà sẽ quyết thắng.)" },
          { "id": "km-n3-c7-l3-7", "term": "守る", "reading": "まもる", "answer": "Giữ, bảo vệ, tuân thủ", "meaning": "Giữ, bảo vệ, tuân thủ", "example": "父との約束を守る。\n(Giữ lời hứa với bố.)" },
          { "id": "km-n3-c7-l3-8", "term": "子守歌", "reading": "こもりうた", "answer": "Bài hát ru", "meaning": "Bài hát ru", "example": "母親が子どもに子守歌を聞かせる。\n(Người mẹ hát bài hát ru cho con nghe.)" },
          { "id": "km-n3-c7-l3-9", "term": "守備", "reading": "しゅび", "answer": "Phòng thủ", "meaning": "Phòng thủ", "example": "九回表の守備につく。\n(Vào vị trí phòng thủ ở nửa đầu hiệp 9.)" },
          { "id": "km-n3-c7-l3-10", "term": "留守", "reading": "るす", "answer": "Vắng nhà", "meaning": "Vắng nhà", "example": "旅行で1週間家を留守にする。\n(Vắng nhà 1 tuần do đi du lịch.)" },
          { "id": "km-n3-c7-l3-11", "term": "解約する", "reading": "かいやくする", "answer": "Hủy hợp đồng", "meaning": "Hủy hợp đồng", "example": "ローンを解約する。\n(Hủy hợp đồng khoản vay.)" },
          { "id": "km-n3-c7-l3-12", "term": "約", "reading": "やく", "answer": "Khoảng", "meaning": "Khoảng", "example": "学校まで約1時間かかる。\n(Mất khoảng 1 tiếng tới trường.)" },
          { "id": "km-n3-c7-l3-13", "term": "結束する", "reading": "けっそくする", "answer": "Đoàn kết, gắn kết", "meaning": "Đoàn kết, gắn kết", "example": "結束が固いチームだ。\n(Đội bóng có sự đoàn kết vô cùng gắn kết.)" },
          { "id": "km-n3-c7-l3-14", "term": "束縛する", "reading": "そくばくする", "answer": "Trói buộc, gò bó", "meaning": "Trói buộc, gò bó", "example": "束縛されるのはいやだ。\n(Ghét bị gò bó trói buộc.)" },
          { "id": "km-n3-c7-l3-15", "term": "必死", "reading": "ひっし", "answer": "Quyết tâm, hết sức", "meaning": "Quyết tâm, hết sức", "example": "合格するために必死でがんばる。\n(Nỗ lực hết sức để thi đỗ.)" },
          { "id": "km-n3-c7-l3-16", "term": "お守り", "reading": "おもり", "answer": "Bùa hộ mệnh", "meaning": "Bùa hộ mệnh", "example": "交通安全のお守りを買う。\n(Mua bùa hộ mệnh an toàn giao thông.)" },
          { "id": "km-n3-c7-l3-17", "term": "厳守する", "reading": "げんしゅする", "answer": "Tuân thủ nghiêm ngặt", "meaning": "Tuân thủ nghiêm ngặt", "example": "時間を厳守する。\n(Tuân thủ nghiêm ngặt thời gian.)" }
        ]
      }
    ]
  },
  {
    id: 24,
    title: "Chương 7 - Bài 4: 結婚式 (式, 列, 祝, 酔)",
    sections: [
      {
        id: "km-n3-c7-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c7-l4-1", "term": "正式", "reading": "せいしき", "answer": "Chính thức", "meaning": "Chính thức", "example": "結婚を正式に発表する。\n(Chính thức thông báo việc kết hôn.)" },
          { "id": "km-n3-c7-l4-2", "term": "結婚式", "reading": "けっこんしき", "answer": "Lễ kết hôn, đám cưới", "meaning": "Lễ kết hôn, đám cưới", "example": "友達の結婚式に出席する。\n(Đến tham dự lễ kết hôn của bạn bè.)" },
          { "id": "km-n3-c7-l4-3", "term": "書式", "reading": "しょしき", "answer": "Định dạng, mẫu văn bản", "meaning": "Định dạng, mẫu văn bản", "example": "書式にしたがって願書を書く。\n(Viết đơn xin nhập học theo đúng định dạng mẫu.)" },
          { "id": "km-n3-c7-l4-4", "term": "行列", "reading": "ぎょうれつ", "answer": "Hàng người xếp hàng", "meaning": "Hàng người xếp hàng", "example": "ここはいつも行列ができる人気店だ。\n(Đây là cửa hàng nổi tiếng lúc nào cũng có hàng dài người xếp hàng.)" },
          { "id": "km-n3-c7-l4-5", "term": "列島", "reading": "れっとう", "answer": "Quần đảo", "meaning": "Quần đảo", "example": "自転車で日本列島を旅する。\n(Đi du lịch vòng quanh quần đảo Nhật Bản bằng xe đạp.)" },
          { "id": "km-n3-c7-l4-6", "term": "祝う", "reading": "いわう", "answer": "Chúc mừng", "meaning": "Chúc mừng", "example": "祖母の誕生日を家族で祝う。\n(Cả gia đình cùng chúc mừng sinh nhật bà.)" },
          { "id": "km-n3-c7-l4-7", "term": "祝賀", "reading": "しゅくが", "answer": "Chúc mừng, tiệc mừng", "meaning": "Chúc mừng, tiệc mừng", "example": "優勝祝賀パーティーに参加した。\n(Tham gia bữa tiệc mừng vô địch.)" },
          { "id": "km-n3-c7-l4-8", "term": "二日酔い", "reading": "ふつかよい", "answer": "Nôn nao say rượu sang ngày thứ hai", "meaning": "Nôn nao say rượu sang ngày thứ hai", "example": "二日酔いで気持ちが悪い。\n(Cảm thấy khó chịu nôn nao do bị say rượu từ hôm qua.)" },
          { "id": "km-n3-c7-l4-9", "term": "酔っぱらい", "reading": "よっぱらい", "answer": "Người say rượu", "meaning": "Người say rượu", "example": "電車で酔っぱらいがさわいでいた。\n(Một người say rượu làm ồn trên tàu điện.)" },
          { "id": "km-n3-c7-l4-10", "term": "泥酔する", "reading": "でいすいする", "answer": "Say khướt, say bét nhè", "meaning": "Say khướt, say bét nhè", "example": "泥酔するまで飲む。\n(Uống cho tới khi say khướt.)" },
          { "id": "km-n3-c7-l4-11", "term": "一式", "reading": "いっしき", "answer": "Trọn bộ, một bộ đầy đủ", "meaning": "Trọn bộ, một bộ đầy đủ", "example": "お茶の道具一式をそろえる。\n(Sắm sửa trọn bộ dụng cụ pha trà.)" },
          { "id": "km-n3-c7-l4-12", "term": "株式会社", "reading": "かぶしきがいしゃ", "answer": "Công ty cổ phần", "meaning": "Công ty cổ phần", "example": "株式会社を設立した。\n(Thành lập công ty cổ phần.)" },
          { "id": "km-n3-c7-l4-13", "term": "一列", "reading": "いちれつ", "answer": "Một hàng", "meaning": "Một hàng", "example": "一列にならんで待つ。\n(Xếp thành một hàng và chờ đợi.)" },
          { "id": "km-n3-c7-l4-14", "term": "急行列車", "reading": "きゅうこうれっしゃ", "answer": "Tàu hỏa tốc hành", "meaning": "Tàu hỏa tốc hành", "example": "急行列車に乗る。\n(Lên chuyến tàu hỏa tốc hành.)" },
          { "id": "km-n3-c7-l4-15", "term": "祝い", "reading": "いわい", "answer": "Món quà/sự chúc mừng", "meaning": "Món quà/sự chúc mừng", "example": "入学祝いに時計をあげる。\n(Tặng đồng hồ làm quà chúc mừng nhập học.)" },
          { "id": "km-n3-c7-l4-16", "term": "祝日", "reading": "しゅくじつ", "answer": "Ngày nghỉ lễ", "meaning": "Ngày nghỉ lễ", "example": "5月5日こどもの日は、祝日だ。\n(Ngày mùng 5 tháng 5 Tết thiếu nhi là ngày nghỉ lễ.)" },
          { "id": "km-n3-c7-l4-17", "term": "ご祝儀", "reading": "ごしゅうぎ", "answer": "Tiền mừng cưới, tiền mừng", "meaning": "Tiền mừng cưới, tiền mừng", "example": "受付でご祝儀をわたす。\n(Đưa tiền mừng cưới tại bàn lễ tân.)" },
          { "id": "km-n3-c7-l4-18", "term": "酔う", "reading": "よう", "answer": "Say xe, say rượu", "meaning": "Say xe, say rượu", "example": "私は子どものころから車に酔いやすい。\n(Tôi từ nhỏ đã rất dễ bị say xe.)" }
        ]
      }
    ]
  },
  {
    id: 25,
    title: "Chương 7 - Bài 5: 幸せ (永, 願, 幸, 福)",
    sections: [
      {
        id: "km-n3-c7-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c7-l5-1", "term": "永遠", "reading": "えいえん", "answer": "Vĩnh cửu, mãi mãi", "meaning": "Vĩnh cửu, mãi mãi", "example": "結婚式で永遠の愛を誓う。\n(Thề nguyện tình yêu vĩnh cửu trong lễ kết hôn.)" },
          { "id": "km-n3-c7-l5-2", "term": "永住する", "reading": "えいじゅうする", "answer": "Định cư lâu dài, vĩnh trú", "meaning": "Định cư lâu dài, vĩnh trú", "example": "外国に永住する。\n(Định cư vĩnh trú ở nước ngoài.)" },
          { "id": "km-n3-c7-l5-3", "term": "願う", "reading": "ねがう", "answer": "Cầu mong, nguyện ước", "meaning": "Cầu mong, nguyện ước", "example": "親が子の無事を願う。\n(Cha mẹ cầu mong sự bình an cho con cái.)" },
          { "id": "km-n3-c7-l5-4", "term": "願書", "reading": "がんしょ", "answer": "Đơn nhập học, đơn xin", "meaning": "Đơn nhập học, đơn xin", "example": "メールで入学願書を取り寄せる。\n(Yêu cầu gửi đơn xin nhập học qua email.)" },
          { "id": "km-n3-c7-l5-5", "term": "幸い", "reading": "さいわい", "answer": "May mắn thay", "meaning": "May mắn thay", "example": "幸いなことに、けがはなかった。\n(May mắn thay là không ai bị thương.)" },
          { "id": "km-n3-c7-l5-6", "term": "幸多かれ", "reading": "さちおおかれ", "answer": "Chúc nhiều hạnh phúc", "meaning": "Chúc nhiều hạnh phúc", "example": "新婚の二人に幸多かれと願う。\n(Cầu chúc nhiều hạnh phúc cho hai người mới cưới.)" },
          { "id": "km-n3-c7-l5-7", "term": "幸せ", "reading": "しあわせ", "answer": "Hạnh phúc", "meaning": "Hạnh phúc", "example": "お金がなくても幸せだ。\n(Dù không có tiền nhưng vẫn thấy hạnh phúc.)" },
          { "id": "km-n3-c7-l5-8", "term": "幸運", "reading": "こううん", "answer": "May mắn, vận may", "meaning": "May mắn, vận may", "example": "幸運に恵まれる。\n(Được ban cho nhiều vận may.)" },
          { "id": "km-n3-c7-l5-9", "term": "福", "reading": "ふく", "answer": "Phúc lành, may mắn", "meaning": "Phúc lành, may mắn", "example": "笑う門には福来る。\n(Nhà nào ngập tràn tiếng cười thì phúc lành sẽ đến.)" },
          { "id": "km-n3-c7-l5-10", "term": "社会福祉士", "reading": "しゃかいふくしし", "answer": "Nhân viên phúc lợi xã hội", "meaning": "Nhân viên phúc lợi xã hội", "example": "社会福祉士の試験を受ける。\n(Dự thi kỳ thi lấy chứng chỉ nhân viên phúc lợi xã hội.)" },
          { "id": "km-n3-c7-l5-11", "term": "末永く", "reading": "すえながく", "answer": "Mãi mãi về sau, đầu bạc răng long", "meaning": "Mãi mãi về sau, đầu bạc răng long", "example": "末永くお幸せに。\n(Chúc hai bạn hạnh phúc mãi mãi về sau.)" },
          { "id": "km-n3-c7-l5-12", "term": "願い", "reading": "ねがい", "answer": "Nguyện vọng, điều ước", "meaning": "Nguyện vọng, điều ước", "example": "願い事がかなう。\n(Điều ước nguyện đã trở thành hiện thực.)" },
          { "id": "km-n3-c7-l5-13", "term": "不幸", "reading": "ふこう", "answer": "Bất hạnh, rủi ro", "meaning": "Bất hạnh, rủi ro", "example": "不幸中の幸い。\n(Trong cái rủi có cái may.)" },
          { "id": "km-n3-c7-l5-14", "term": "海の幸", "reading": "うみのさち", "answer": "Sản vật của biển, hải sản", "meaning": "Sản vật của biển, hải sản", "example": "海の幸を味わう。\n(Thưởng thức hải sản tươi ngon của biển.)" },
          { "id": "km-n3-c7-l5-15", "term": "幸福", "reading": "こうふく", "answer": "Hạnh phúc", "meaning": "Hạnh phúc", "example": "幸福な人生を送る。\n(Sống một cuộc đời hạnh phúc.)" },
          { "id": "km-n3-c7-l5-16", "term": "祝福する", "reading": "しゅくふくする", "answer": "Chúc phúc", "meaning": "Chúc phúc", "example": "友達の結婚を祝福する。\n(Chúc phúc cho đám cưới của bạn bè.)" },
          { "id": "km-n3-c7-l5-17", "term": "出願", "reading": "しゅつがん", "answer": "Nộp đơn, nộp hồ sơ", "meaning": "Nộp đơn, nộp hồ sơ", "example": "出願手続きをする。\n(Làm thủ tục nộp đơn đăng ký.)" }
        ]
      }
    ]
  },
  {
    id: 26,
    title: "Chương 8 - Bài 1: 人間関係 (関, 係, 和, 付)",
    sections: [
      {
        id: "km-n3-c8-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c8-l1-1", "term": "関所", "reading": "せきしょ", "answer": "Trạm gác, chốt kiểm soát", "meaning": "Trạm gác, chốt kiểm soát", "example": "箱根の関所は有名な観光地だ。\n(Trạm gác Hakone là điểm tham quan nổi tiếng.)" },
          { "id": "km-n3-c8-l1-2", "term": "関わる", "reading": "かかわる", "answer": "Liên quan, dính líu đến", "meaning": "Liên quan, dính líu đến", "example": "リーダーとしてプロジェクトに関わる。\n(Tham gia vào dự án với vai trò là trưởng nhóm.)" },
          { "id": "km-n3-c8-l1-3", "term": "玄関", "reading": "げんかん", "answer": "Lối vào, hiên nhà", "meaning": "Lối vào, hiên nhà", "example": "玄関でくつをぬいでそろえる。\n(Cởi giày và xếp gọn gàng ở lối vào.)" },
          { "id": "km-n3-c8-l1-4", "term": "係員", "reading": "かかりいん", "answer": "Nhân viên phụ trách", "meaning": "Nhân viên phụ trách", "example": "駅の係員に注意された。\n(Bị nhân viên nhà ga nhắc nhở.)" },
          { "id": "km-n3-c8-l1-5", "term": "人間関係", "reading": "にんげんかんけい", "answer": "Mối quan hệ con người", "meaning": "Mối quan hệ con người", "example": "会社の人間関係に悩まされる。\n(Trăn trở vì mối quan hệ con người ở công ty.)" },
          { "id": "km-n3-c8-l1-6", "term": "和らぐ", "reading": "やわらぐ", "answer": "Dịu đi, bớt gay gắt", "meaning": "Dịu đi, bớt gay gắt", "example": "寒さが和らぎ春のおとずれを感じる。\n(Cái lạnh dịu đi và cảm nhận mùa xuân đang đến.)" },
          { "id": "km-n3-c8-l1-7", "term": "和む", "reading": "なごむ", "answer": "Thư thái, điềm tĩnh", "meaning": "Thư thái, điềm tĩnh", "example": "この音楽をきくと心が和む。\n(Nghe bản nhạc này tâm hồn cảm thấy thư thái.)" },
          { "id": "km-n3-c8-l1-8", "term": "和食", "reading": "わしょく", "answer": "Món ăn kiểu Nhật", "meaning": "Món ăn kiểu Nhật", "example": "料理の中でも和食が一番好きだ。\n(Trong các món ăn tôi thích nhất là món Nhật.)" },
          { "id": "km-n3-c8-l1-9", "term": "付く", "reading": "つく", "answer": "Dính, dán vào", "meaning": "Dính, dán vào", "example": "そでにインクが付く。\n(Mực bị dính vào tay áo.)" },
          { "id": "km-n3-c8-l1-10", "term": "付近", "reading": "ふきん", "answer": "Gần đây, vùng lân cận", "meaning": "Gần đây, vùng lân cận", "example": "この付近には、くまが出るらしい。\n(Nghe nói quanh khu vực này có gấu xuất hiện.)" },
          { "id": "km-n3-c8-l1-11", "term": "関心", "reading": "かんしん", "answer": "Mối quan tâm, chú ý", "meaning": "Mối quan tâm, chú ý", "example": "政治に関心がある。\n(Có sự quan tâm đến chính trị.)" },
          { "id": "km-n3-c8-l1-12", "term": "関係者", "reading": "かんけいしゃ", "answer": "Người có liên quan", "meaning": "Người có liên quan", "example": "関係者以外、立入禁止。\n(Ngoài người có liên quan cấm vào.)" },
          { "id": "km-n3-c8-l1-13", "term": "和らげる", "reading": "やわらげる", "answer": "Làm dịu, xoa dịu", "meaning": "Làm dịu, xoa dịu", "example": "痛みを和らげる薬。\n(Thuốc làm dịu cơn đau.)" },
          { "id": "km-n3-c8-l1-14", "term": "和やかに", "reading": "なごやかに", "answer": "Hòa nhã, thân mật", "meaning": "Hòa nhã, thân mật", "example": "パーティーは和やかに行われた。\n(Bữa tiệc diễn ra trong không khí hòa nhã thân mật.)" },
          { "id": "km-n3-c8-l1-15", "term": "片付ける", "reading": "かたづける", "answer": "Dọn dẹp, sắp xếp", "meaning": "Dọn dẹp, sắp xếp", "example": "休みに部屋を片付ける。\n(Dọn dẹp phòng vào ngày nghỉ.)" },
          { "id": "km-n3-c8-l1-16", "term": "身につける", "reading": "みにつける", "answer": "Trang bị, tiếp thu kỹ năng", "meaning": "Trang bị, tiếp thu kỹ năng", "example": "ビジネスマナーを身につける。\n(Trang bị các quy tắc ứng xử trong kinh doanh.)" },
          { "id": "km-n3-c8-l1-17", "term": "関東地方", "reading": "かんとうちほう", "answer": "Vùng Kanto", "meaning": "Vùng Kanto", "example": "関東地方に台風が近づく。\n(Cơn bão đang tiến gần đến vùng Kanto.)" },
          { "id": "km-n3-c8-l1-18", "term": "関", "reading": "せき", "answer": "Trạm gác, cửa ải", "meaning": "Trạm gác, cửa ải", "example": "関を設ける。\n(Lập trạm kiểm soát/cửa ải.)" },
          { "id": "km-n3-c8-l1-19", "term": "係わる", "reading": "かかわる", "answer": "Liên quan, dính líu đến", "meaning": "Liên quan, dính líu đến", "example": "貿易に係わる仕事がしたい。\n(Muốn làm công việc liên quan đến thương mại.)" },
          { "id": "km-n3-c8-l1-20", "term": "係", "reading": "かかり", "answer": "Người phụ trách, bổn phận", "meaning": "Người phụ trách, bổn phận", "example": "係の者にたずねる。\n(Hỏi người phụ trách.)" },
          { "id": "km-n3-c8-l1-21", "term": "付ける", "reading": "つける", "answer": "Gắn, dính, gắn vào", "meaning": "Gắn, dính, gắn vào", "example": "名前を付ける。\n(Đặt tên/gắn tên vào.)" },
          { "id": "km-n3-c8-l1-22", "term": "関係", "reading": "かんけい", "answer": "Mối quan hệ, quan hệ", "meaning": "Mối quan hệ, quan hệ", "example": "良好な関係を保つ。\n(Duy trì mối quan hệ tốt đẹp.)" }
        ]
      }
    ]
  },
  {
    id: 27,
    title: "Chương 8 - Bài 2: 家族 (娘, 老, 婦, 姓)",
    sections: [
      {
        id: "km-n3-c8-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c8-l2-1", "term": "娘", "reading": "むすめ", "answer": "Con gái", "meaning": "Con gái", "example": "木村さんには娘さんが三人いる。\n(Anh Kimura có 3 cô con gái.)" },
          { "id": "km-n3-c8-l2-2", "term": "老いる", "reading": "おいる", "answer": "Già đi", "meaning": "Già đi", "example": "人はだれでも老いていくものだ。\n(Con người ai rồi cũng sẽ già đi.)" },
          { "id": "km-n3-c8-l2-3", "term": "老ける", "reading": "ふける", "answer": "Trông già dặn, già đi", "meaning": "Trông già dặn, già đi", "example": "彼は年よりずっと老けて見える。\n(Anh ấy trông già hơn nhiều so với tuổi.)" },
          { "id": "km-n3-c8-l2-4", "term": "老後", "reading": "ろうご", "answer": "Tuổi già", "meaning": "Tuổi già", "example": "老後の人生について考える。\n(Suy nghĩ về cuộc sống lúc về già.)" },
          { "id": "km-n3-c8-l2-5", "term": "夫婦", "reading": "ふうふ", "answer": "Vợ chồng", "meaning": "Vợ chồng", "example": "夫婦でスキーを楽しむ。\n(Hai vợ chồng cùng đi trượt tuyết vui vẻ.)" },
          { "id": "km-n3-c8-l2-6", "term": "婦人", "reading": "ふじん", "answer": "Quý bà, phụ nữ", "meaning": "Quý bà, phụ nữ", "example": "ぼうしをかぶった婦人が入ってきた。\n(Một vị quý bà đội mũ bước vào.)" },
          { "id": "km-n3-c8-l2-7", "term": "主婦業", "reading": "しゅふぎょう", "answer": "Công việc nội trợ", "meaning": "Công việc nội trợ", "example": "仕事をしながら主婦業もこなす。\n(Vừa đi làm vừa quán xuyến việc nội trợ.)" },
          { "id": "km-n3-c8-l2-8", "term": "新婦", "reading": "しんぷ", "answer": "Cô dâu", "meaning": "Cô dâu", "example": "新婦のドレスはとてもきれいだった。\n(Chiếc váy của cô dâu rất đẹp.)" },
          { "id": "km-n3-c8-l2-9", "term": "姓", "reading": "せい", "answer": "Họ", "meaning": "Họ", "example": "結婚しても夫とべつの姓のままでいる。\n(Dù kết hôn nhưng vẫn giữ họ riêng khác họ chồng.)" },
          { "id": "km-n3-c8-l2-10", "term": "同姓同名", "reading": "どうせいどうめい", "answer": "Cùng họ cùng tên", "meaning": "Cùng họ cùng tên", "example": "同姓同名の人がいておどろいた。\n(Bất ngờ vì có người trùng cả họ lẫn tên.)" },
          { "id": "km-n3-c8-l2-11", "term": "箱入り娘", "reading": "はこいりむすめ", "answer": "Con gái rượu, tiểu thư cành vàng lá ngọc", "meaning": "Con gái rượu, tiểu thư cành vàng lá ngọc", "example": "彼女は箱入り娘だ。\n(Cô ấy là tiểu thư cành vàng lá ngọc.)" },
          { "id": "km-n3-c8-l2-12", "term": "敬老の日", "reading": "けいろうのひ", "answer": "Ngày kính lão", "meaning": "Ngày kính lão", "example": "敬老の日のお祝いをする。\n(Tổ chức chúc mừng Ngày kính lão.)" },
          { "id": "km-n3-c8-l2-13", "term": "老夫婦", "reading": "ろうふうふ", "answer": "Vợ chồng già", "meaning": "Vợ chồng già", "example": "老夫婦が仲良くさんぽしている。\n(Vợ chồng già đang nắm tay nhau đi dạo.)" },
          { "id": "km-n3-c8-l2-14", "term": "専業主婦", "reading": "せんぎょうしゅふ", "answer": "Nội trợ toàn thời gian", "meaning": "Nội trợ toàn thời gian", "example": "母は専業主婦だ。\n(Mẹ tôi là người nội trợ toàn thời gian.)" }
        ]
      }
    ]
  },
  {
    id: 28,
    title: "Chương 8 - Bài 3: 仲間 (仲, 君, 彼, 他)",
    sections: [
      {
        id: "km-n3-c8-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c8-l3-1", "term": "仲良し", "reading": "なかよし", "answer": "Bạn thân thiết", "meaning": "Bạn thân thiết", "example": "二人は大の仲良しだ。\n(Hai người là bạn rất thân thiết.)" },
          { "id": "km-n3-c8-l3-2", "term": "仲裁する", "reading": "ちゅうさいする", "answer": "Hòa giải", "meaning": "Hòa giải", "example": "友人同士のけんかの仲裁をする。\n(Đứng ra hòa giải cuộc cãi vã giữa bạn bè.)" },
          { "id": "km-n3-c8-l3-3", "term": "君", "reading": "きみ", "answer": "Cậu, bạn", "meaning": "Cậu, bạn", "example": "この仕事は君に任せたよ。\n(Giao công việc này cho cậu nhé.)" },
          { "id": "km-n3-c8-l3-4", "term": "彼", "reading": "かれ", "answer": "Anh ấy", "meaning": "Anh ấy", "example": "彼はまじめでやさしい青年だ。\n(Anh ấy là một thanh niên nghiêm túc và tốt bụng.)" },
          { "id": "km-n3-c8-l3-5", "term": "彼女", "reading": "かのじょ", "answer": "Cô ấy, bạn gái", "meaning": "Cô ấy, bạn gái", "example": "彼女をデートにさそって、断られた。\n(Mời cô ấy đi hẹn hò và bị từ chối.)" },
          { "id": "km-n3-c8-l3-6", "term": "彼岸", "reading": "ひがん", "answer": "Tiết Bỉ Ngạn (tảo mộ)", "meaning": "Tiết Bỉ Ngạn (tảo mộ)", "example": "お彼岸に、はかまいりをする。\n(Đi tảo mộ vào tiết Bỉ Ngạn.)" },
          { "id": "km-n3-c8-l3-7", "term": "他", "reading": "ほか", "answer": "Khác, ngoài ra", "meaning": "Khác, ngoài ra", "example": "他に意見はありませんか。\n(Có ai còn ý kiến khác nữa không?)" },
          { "id": "km-n3-c8-l3-8", "term": "他国", "reading": "たこく", "answer": "Nước khác, ngoại quốc", "meaning": "Nước khác, ngoại quốc", "example": "他国の文化を学ぶ。\n(Học hỏi văn hóa của nước khác.)" },
          { "id": "km-n3-c8-l3-9", "term": "他人", "reading": "たにん", "answer": "Người khác, người ngoài", "meaning": "Người khác, người ngoài", "example": "彼は他人のことには口を出さない人だ。\n(Anh ấy là người không bao giờ xen vào chuyện của người khác.)" },
          { "id": "km-n3-c8-l3-10", "term": "仲が良い", "reading": "なかがいい", "answer": "Thân thiết, hòa thuận", "meaning": "Thân thiết, hòa thuận", "example": "あの兄弟は仲がいい。\n(Hai anh em nhà đó rất thân thiết hòa thuận.)" },
          { "id": "km-n3-c8-l3-11", "term": "仲間", "reading": "なかま", "answer": "Bạn bè, đồng nghiệp", "meaning": "Bạn bè, đồng nghiệp", "example": "仲間を大切にする。\n(Trân trọng những người bạn đồng hành.)" },
          { "id": "km-n3-c8-l3-12", "term": "仲介する", "reading": "ちゅうかいする", "answer": "Môi giới", "meaning": "Môi giới", "example": "売買を仲介する。\n(Môi giới mua bán.)" },
          { "id": "km-n3-c8-l3-13", "term": "彼氏", "reading": "かれし", "answer": "Bạn trai", "meaning": "Bạn trai", "example": "彼氏に手料理をごちそうする。\n(Nấu món ăn chiêu đãi bạn trai.)" },
          { "id": "km-n3-c8-l3-14", "term": "他社", "reading": "たしゃ", "answer": "Công ty khác", "meaning": "Công ty khác", "example": "他社に負けない製品を売る。\n(Bán sản phẩm không thua kém các công ty khác.)" },
          { "id": "km-n3-c8-l3-15", "term": "他言無用", "reading": "たごんむよう", "answer": "Không tiết lộ cho người ngoài, giữ bí mật", "meaning": "Không tiết lộ cho người ngoài, giữ bí mật", "example": "この話は他言無用だ。\n(Chuyện này tuyệt đối không được nói cho người ngoài biết.)" },
          { "id": "km-n3-c8-l3-16", "term": "～君", "reading": "～くん", "answer": "Cậu ~, bạn ~", "meaning": "Cậu ~, bạn ~", "example": "山田君にチョコをあげた。\n(Tặng sô-cô-la cho cậu Yamada.)" }
        ]
      }
    ]
  },
  {
    id: 29,
    title: "Chương 8 - Bài 4: 友人 (初, 再, 久, 達)",
    sections: [
      {
        id: "km-n3-c8-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c8-l4-1", "term": "初め", "reading": "そめ", "answer": "Khởi đầu, duyên cớ quen nhau", "meaning": "Khởi đầu, duyên cớ quen nhau", "example": "父と母のなれ初めを聞く。\n(Hỏi nghe chuyện bố mẹ quen nhau như thế nào.)" },
          { "id": "km-n3-c8-l4-2", "term": "書き初め", "reading": "かきぞめ", "answer": "Khai bút đầu xuân", "meaning": "Khai bút đầu xuân", "example": "書き初めに「初日の出」と書いた。\n(Viết từ 'Bình minh đầu năm' vào bức khai bút đầu xuân.)" },
          { "id": "km-n3-c8-l4-3", "term": "初々しい", "reading": "ういういしい", "answer": "Ngây thơ, tươi mới, bỡ ngỡ", "meaning": "Ngây thơ, tươi mới, bỡ ngỡ", "example": "新入社員のスーツ姿が初々しい。\n(Dáng vẻ bộ vest của nhân viên mới thật tươi mới bỡ ngỡ.)" },
          { "id": "km-n3-c8-l4-4", "term": "初日", "reading": "しょにち", "answer": "Ngày đầu tiên", "meaning": "Ngày đầu tiên", "example": "この映画は今日が公開初日だ。\n(Bộ phim này hôm nay là ngày đầu công chiếu.)" },
          { "id": "km-n3-c8-l4-5", "term": "再び", "reading": "ふたたび", "answer": "Lại một lần nữa", "meaning": "Lại một lần nữa", "example": "失敗にこりず、再びチャレンジした。\n(Không nản lòng vì thất bại, lại thử thách một lần nữa.)" },
          { "id": "km-n3-c8-l4-6", "term": "再試験", "reading": "さいしけん", "answer": "Thi lại", "meaning": "Thi lại", "example": "成績が悪く、再試験を受ける。\n(Điểm kém nên phải dự thi lại.)" },
          { "id": "km-n3-c8-l4-7", "term": "再来年", "reading": "さらいねん", "answer": "Năm sau nữa", "meaning": "Năm sau nữa", "example": "再来年には新しい地下鉄が開通する。\n(Năm sau nữa tuyến tàu điện ngầm mới sẽ thông xe.)" },
          { "id": "km-n3-c8-l4-8", "term": "久しく", "reading": "ひさしく", "answer": "Đã lâu rồi", "meaning": "Đã lâu rồi", "example": "彼女とは久しく会っていない。\n(Đã lâu rồi tôi không gặp cô ấy.)" },
          { "id": "km-n3-c8-l4-9", "term": "永久", "reading": "えいきゅう", "answer": "Vĩnh cửu, mãi mãi", "meaning": "Vĩnh cửu, mãi mãi", "example": "永久に平和が続くことを願う。\n(Cầu mong hòa bình sẽ kéo dài mãi mãi.)" },
          { "id": "km-n3-c8-l4-10", "term": "上達", "reading": "じょうたつ", "answer": "Tiến bộ, cải thiện kỹ năng", "meaning": "Tiến bộ, cải thiện kỹ năng", "example": "子どもは語学の上達が早い。\n(Trẻ em tiến bộ ngoại ngữ rất nhanh.)" },
          { "id": "km-n3-c8-l4-11", "term": "初め", "reading": "はじめ", "answer": "Đầu, lúc đầu", "meaning": "Đầu, lúc đầu", "example": "4月の初めには、さくらが満開になる。\n(Vào đầu tháng 4 hoa anh đào nở rộ.)" },
          { "id": "km-n3-c8-l4-12", "term": "初めて", "reading": "はじめて", "answer": "Lần đầu tiên", "meaning": "Lần đầu tiên", "example": "こんなことは初めてだ。\n(Chuyện thế này mới là lần đầu tiên.)" },
          { "id": "km-n3-c8-l4-13", "term": "初雪", "reading": "はつゆき", "answer": "Tuyết đầu mùa", "meaning": "Tuyết đầu mùa", "example": "富士山に初雪が降った。\n(Tuyết đầu mùa đã rơi trên núi Phú Sĩ.)" },
          { "id": "km-n3-c8-l4-14", "term": "初心", "reading": "しょしん", "answer": "Tâm nguyện ban đầu", "meaning": "Tâm nguyện ban đầu", "example": "初心に返る。\n(Quay trở lại với tâm nguyện ban đầu.)" },
          { "id": "km-n3-c8-l4-15", "term": "最初", "reading": "さいしょ", "answer": "Ban đầu, đầu tiên", "meaning": "Ban đầu, đầu tiên", "example": "何事も最初が大切だ。\n(Bất cứ việc gì thì lúc ban đầu cũng đều quan trọng.)" },
          { "id": "km-n3-c8-l4-16", "term": "再会する", "reading": "さいかいする", "answer": "Tái ngộ, gặp lại", "meaning": "Tái ngộ, gặp lại", "example": "学生時代の友人に再会する。\n(Gặp lại bạn bè thời học sinh.)" },
          { "id": "km-n3-c8-l4-17", "term": "久しぶり", "reading": "ひさしぶり", "answer": "Lâu rồi mới gặp", "meaning": "Lâu rồi mới gặp", "example": "久しぶりに友達に会った。\n(Lâu lắm rồi mới gặp lại bạn bè.)" },
          { "id": "km-n3-c8-l4-18", "term": "速達", "reading": "そくたつ", "answer": "Chuyển phát nhanh", "meaning": "Chuyển phát nhanh", "example": "手紙を速達で出す。\n(Gửi thư bằng dịch vụ chuyển phát nhanh.)" }
        ]
      }
    ]
  },
  {
    id: 30,
    title: "Chương 8 - Bài 5: 個性 (個, 性, 各, 格)",
    sections: [
      {
        id: "km-n3-c8-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c8-l5-1", "term": "一個", "reading": "いっこ", "answer": "Một cái, một quả", "meaning": "Một cái, một quả", "example": "一個二百円の卵を買う。\n(Mua một quả trứng giá 200 yên.)" },
          { "id": "km-n3-c8-l5-2", "term": "個室", "reading": "こしつ", "answer": "Phòng riêng", "meaning": "Phòng riêng", "example": "レストランの個室を予約した。\n(Đặt phòng riêng ở nhà hàng.)" },
          { "id": "km-n3-c8-l5-3", "term": "個性的", "reading": "こせいてき", "answer": "Có cá tính, phong cách riêng", "meaning": "Có cá tính, phong cách riêng", "example": "彼のファッションは個性的だ。\n(Thời trang của anh ấy rất có cá tính.)" },
          { "id": "km-n3-c8-l5-4", "term": "性質", "reading": "せいしつ", "answer": "Tính chất, đặc tính", "meaning": "Tính chất, đặc tính", "example": "この紙は水にとけやすい性質を持つ。\n(Loại giấy này có tính chất dễ tan trong nước.)" },
          { "id": "km-n3-c8-l5-5", "term": "相性", "reading": "あいしょう", "answer": "Độ hợp nhau, sự ăn ý", "meaning": "Độ hợp nhau, sự ăn ý", "example": "彼女とは何をしても相性が良い。\n(Tôi với cô ấy làm gì cũng rất hợp nhau.)" },
          { "id": "km-n3-c8-l5-6", "term": "各国", "reading": "かっこく", "answer": "Các nước, mỗi quốc gia", "meaning": "Các nước, mỗi quốc gia", "example": "世界各国の代表が来日した。\n(Đại biểu các nước trên thế giới đã tới Nhật Bản.)" },
          { "id": "km-n3-c8-l5-7", "term": "各自", "reading": "かくじ", "answer": "Mỗi người, từng cá nhân", "meaning": "Mỗi người, từng cá nhân", "example": "各自昼食を持って来てください。\n(Xin mỗi người hãy tự mang theo đồ ăn trưa.)" },
          { "id": "km-n3-c8-l5-8", "term": "格", "reading": "かく", "answer": "Tầm vóc, tư cách", "meaning": "Tầm vóc, tư cách", "example": "彼女はグループのリーダー格だ。\n(Cô ấy ở tầm vóc người lãnh đạo trong nhóm.)" },
          { "id": "km-n3-c8-l5-9", "term": "性格", "reading": "せいかく", "answer": "Tính cách", "meaning": "Tính cách", "example": "真面目な性格は父親ににている。\n(Tính cách nghiêm túc giống hệt người bố.)" },
          { "id": "km-n3-c8-l5-10", "term": "失格", "reading": "しっかく", "answer": "Mất tư cách, bị loại", "meaning": "Mất tư cách, bị loại", "example": "コースをまちがえて失格になった。\n(Chạy nhầm đường nên đã bị tước quyền thi đấu.)" },
          { "id": "km-n3-c8-l5-11", "term": "個人的", "reading": "こじんてき", "answer": "Mang tính cá nhân", "meaning": "Mang tính cá nhân", "example": "個人的な意見を言う。\n(Đưa ra ý kiến cá nhân.)" },
          { "id": "km-n3-c8-l5-12", "term": "女性", "reading": "じょせい", "answer": "Phụ nữ, nữ giới", "meaning": "Phụ nữ, nữ giới", "example": "彼女は仕事ができる女性だ。\n(Cô ấy là người phụ nữ làm việc rất giỏi.)" },
          { "id": "km-n3-c8-l5-13", "term": "水性", "reading": "すいせい", "answer": "Gốc nước", "meaning": "Gốc nước", "example": "水性ボールペンで書く。\n(Viết bằng bút bi mực nước.)" },
          { "id": "km-n3-c8-l5-14", "term": "気性", "reading": "きしょう", "answer": "Tính khí", "meaning": "Tính khí", "example": "気性がはげしい人。\n(Người có tính khí hung dữ, nóng nảy.)" },
          { "id": "km-n3-c8-l5-15", "term": "各々", "reading": "おのおの", "answer": "Từng người, mỗi người", "meaning": "Từng người, mỗi người", "example": "人は各々の考え方がちがう。\n(Con người mỗi người đều có cách nghĩ khác nhau.)" },
          { "id": "km-n3-c8-l5-16", "term": "合格祈願", "reading": "ごうかくきがん", "answer": "Cầu nguyện thi đỗ", "meaning": "Cầu nguyện thi đỗ", "example": "合格祈願のお守りを買う。\n(Mua bùa cầu nguyện thi đỗ.)" },
          { "id": "km-n3-c8-l5-17", "term": "体格", "reading": "たいかく", "answer": "Vóc dáng, thể hình", "meaning": "Vóc dáng, thể hình", "example": "体格のいい男の人が好きだ。\n(Tôi thích người đàn ông có vóc dáng phong độ.)" },
          { "id": "km-n3-c8-l5-18", "term": "合格", "reading": "ごうかく", "answer": "Thi đỗ, đạt", "meaning": "Thi đỗ, đạt", "example": "試験に合格する。\n(Thi đỗ kỳ thi.)" },
          { "id": "km-n3-c8-l5-19", "term": "格子", "reading": "こうし", "answer": "Khung lưới, kẻ ô, song sắt", "meaning": "Khung lưới, kẻ ô, song sắt", "example": "格子戸を開ける。\n(Mở cửa kẻ ô/song sắt.)" }
        ]
      }
    ]
  },
  {
    id: 31,
    title: "Chương 9 - Bài 1: 単位 1 (単, 複, 全, 以)",
    sections: [
      {
        id: "km-n3-c9-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c9-l1-1", "term": "単独", "reading": "たんどく", "answer": "Đơn độc, hành động một mình", "meaning": "Đơn độc, hành động một mình", "example": "彼は単独行動が多い。\n(Anh ấy có nhiều hành động đơn độc/làm việc một mình.)" },
          { "id": "km-n3-c9-l1-2", "term": "簡単", "reading": "かんたん", "answer": "Đơn giản", "meaning": "Đơn giản", "example": "言うのは簡単だが、やるのは難しい。\n(Nói thì đơn giản nhưng làm thì khó.)" },
          { "id": "km-n3-c9-l1-3", "term": "複数", "reading": "ふくすう", "answer": "Số nhiều, phức số, nhiều người", "meaning": "Số nhiều, phức số, nhiều người", "example": "この事件は複数の人間が関係している。\n(Vụ án này liên quan đến nhiều người.)" },
          { "id": "km-n3-c9-l1-4", "term": "重複", "reading": "ちょうふく", "answer": "Trùng lặp, lặp lại", "meaning": "Trùng lặp, lặp lại", "example": "さっき聞いた話と重複している。\n(Trùng lặp với câu chuyện vừa nghe lúc nãy.)" },
          { "id": "km-n3-c9-l1-5", "term": "全く", "reading": "まったく", "answer": "Hoàn toàn (không...)", "meaning": "Hoàn toàn (không...)", "example": "昨日のことは全く覚えていない。\n(Tôi hoàn toàn không nhớ chuyện hôm qua.)" },
          { "id": "km-n3-c9-l1-6", "term": "全て", "reading": "すべて", "answer": "Tất cả, toàn bộ", "meaning": "Tất cả, toàn bộ", "example": "この店の料理は全ておいしい。\n(Món ăn của quán này tất cả đều ngon.)" },
          { "id": "km-n3-c9-l1-7", "term": "全部", "reading": "ぜんぶ", "answer": "Toàn bộ, tất cả", "meaning": "Toàn bộ, tất cả", "example": "出された料理を全部食べてしまった。\n(Đã ăn hết toàn bộ món ăn được dọn ra.)" },
          { "id": "km-n3-c9-l1-8", "term": "全然", "reading": "ぜんぜん", "answer": "Hoàn toàn (không...)", "meaning": "Hoàn toàn (không...)", "example": "今日のテストは全然できなかった。\n(Bài kiểm tra hôm nay hoàn toàn không làm được.)" },
          { "id": "km-n3-c9-l1-9", "term": "以後", "reading": "いご", "answer": "Từ sau khi, sau này", "meaning": "Từ sau khi, sau này", "example": "明治以後、日本の近代化が進んだ。\n(Sau thời Meiji, sự hiện đại hóa của Nhật Bản đã tiến triển.)" },
          { "id": "km-n3-c9-l1-10", "term": "以下", "reading": "いか", "answer": "Dưới, trở xuống", "meaning": "Dưới, trở xuống", "example": "テストの点が平均以下で、落ちこんだ。\n(Điểm kiểm tra dưới mức trung bình nên thấy chán nản.)" },
          { "id": "km-n3-c9-l1-11", "term": "単位", "reading": "たんい", "answer": "Đơn vị, tín chỉ", "meaning": "Đơn vị, tín chỉ", "example": "グループ単位に行動する。\n(Hành động theo đơn vị nhóm.)" },
          { "id": "km-n3-c9-l1-12", "term": "複雑", "reading": "ふくざつ", "answer": "Phức tạp", "meaning": "Phức tạp", "example": "複雑な気持ちになる。\n(Cảm thấy tâm trạng phức tạp.)" },
          { "id": "km-n3-c9-l1-13", "term": "安全", "reading": "あんぜん", "answer": "An toàn", "meaning": "An toàn", "example": "安全第一で工事を進める。\n(Tiến hành thi công với an toàn là trên hết.)" },
          { "id": "km-n3-c9-l1-14", "term": "完全燃焼", "reading": "かんぜんねんしょう", "answer": "Cháy hết mình, cống hiến hết sức lực", "meaning": "Cháy hết mình, cống hiến hết sức lực", "example": "決勝戦で完全燃焼した。\n(Đã cháy hết mình ở trận chung kết.)" },
          { "id": "km-n3-c9-l1-15", "term": "全体", "reading": "ぜんたい", "answer": "Toàn thể", "meaning": "Toàn thể", "example": "クラス全体が同じ意見だった。\n(Toàn thể lớp học có cùng ý kiến.)" },
          { "id": "km-n3-c9-l1-16", "term": "以上", "reading": "いじょう", "answer": "Trở lên, hơn", "meaning": "Trở lên, hơn", "example": "このワインは一万円以上する。\n(Chai rượu vang này giá hơn 10.000 yên.)" },
          { "id": "km-n3-c9-l1-17", "term": "以内", "reading": "いない", "answer": "Trong vòng, trong phạm vi", "meaning": "Trong vòng, trong phạm vi", "example": "三位以内に入ると、賞品がもらえる。\n(Nếu vào top 3 thì sẽ nhận được giải thưởng.)" }
        ]
      }
    ]
  },
  {
    id: 32,
    title: "Chương 9 - Bài 2: 単位 2 (未, 満, 無, 非)",
    sections: [
      {
        id: "km-n3-c9-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c9-l2-1", "term": "未来", "reading": "みらい", "answer": "Tương lai", "meaning": "Tương lai", "example": "夫婦で子どもの未来について話す。\n(Vợ chồng nói chuyện về tương lai của con cái.)" },
          { "id": "km-n3-c9-l2-2", "term": "未満", "reading": "みまん", "answer": "Chưa đầy, dưới (tuổi/mức)", "meaning": "Chưa đầy, dưới (tuổi/mức)", "example": "十歳未満の子どもは乗れません。\n(Trẻ em dưới 10 tuổi không được tham gia/đi.)" },
          { "id": "km-n3-c9-l2-3", "term": "満ちる", "reading": "みちる", "answer": "Tràn ngập, đầy (Tự động từ)", "meaning": "Tràn ngập, đầy (Tự động từ)", "example": "いいにおいが部屋に満ちる。\n(Mùi thơm lan tỏa tràn ngập căn phòng.)" },
          { "id": "km-n3-c9-l2-4", "term": "満たす", "reading": "みたす", "answer": "Lấp đầy, làm thỏa mãn (Tha động từ)", "meaning": "Lấp đầy, làm thỏa mãn (Tha động từ)", "example": "ごちそうでおなかを満たす。\n(Ăn uống ngon lành lấp đầy bụng.)" },
          { "id": "km-n3-c9-l2-5", "term": "充満", "reading": "じゅうまん", "answer": "Tràn ngập, đọng đầy (khói, khí...)", "meaning": "Tràn ngập, đọng đầy (khói, khí...)", "example": "たばこのけむりが部屋に充満する。\n(Khói thuốc lá tràn ngập khắp căn phòng.)" },
          { "id": "km-n3-c9-l2-6", "term": "満足", "reading": "まんぞく", "answer": "Mãn nguyện, thỏa mãn, hài lòng", "meaning": "Mãn nguyện, thỏa mãn, hài lòng", "example": "おいしい料理を食べて、満足する。\n(Ăn món ăn ngon và cảm thấy thỏa mãn.)" },
          { "id": "km-n3-c9-l2-7", "term": "無い", "reading": "ない", "answer": "Không có", "meaning": "Không có", "example": "しめきりまで、あと５日しかない。\n(Cho đến hạn chót chỉ còn 5 ngày.)" },
          { "id": "km-n3-c9-l2-8", "term": "無休", "reading": "むきゅう", "answer": "Không nghỉ, không nghỉ phép", "meaning": "Không nghỉ, không nghỉ phép", "example": "この店は年中無休だ。\n(Cửa hàng này mở cửa quanh năm không có ngày nghỉ.)" },
          { "id": "km-n3-c9-l2-9", "term": "無事", "reading": "ぶじ", "answer": "Bình an, an toàn, vô sự", "meaning": "Bình an, an toàn, vô sự", "example": "留学から無事前に帰ってくる。\n(Trở về an toàn từ chuyến du học.)" },
          { "id": "km-n3-c9-l2-10", "term": "非常識", "reading": "ひじょうしき", "answer": "Phi thường thức, thiếu ý thức, bất lịch sự", "meaning": "Phi thường thức, thiếu ý thức, bất lịch sự", "example": "公共の場で大声を出すのは非常識だ。\n(Hò hét to tiếng ở nơi công cộng là thiếu ý thức.)" },
          { "id": "km-n3-c9-l2-11", "term": "未定", "reading": "みてい", "answer": "Chưa định, chưa quyết định", "meaning": "Chưa định, chưa quyết định", "example": "次の会議の日時は未定だ。\n(Thời gian cuộc họp tiếp theo chưa được ấn định.)" },
          { "id": "km-n3-c9-l2-12", "term": "未成年", "reading": "みせいねん", "answer": "Vị thành niên, chưa đủ tuổi trưởng thành", "meaning": "Vị thành niên, chưa đủ tuổi trưởng thành", "example": "未成年の飲酒は禁止されている。\n(Việc uống rượu của người vị thành niên bị cấm.)" },
          { "id": "km-n3-c9-l2-13", "term": "満席", "reading": "まんせき", "answer": "Hết chỗ, kín chỗ", "meaning": "Hết chỗ, kín chỗ", "example": "この飛行機の便は、もう満席だ。\n(Chuyến bay này đã kín chỗ rồi.)" },
          { "id": "km-n3-c9-l2-14", "term": "無口", "reading": "むくち", "answer": "Ít nói, lầm lì", "meaning": "Ít nói, lầm lì", "example": "彼女は無口でおとなしい。\n(Cô ấy ít nói và trầm tính.)" },
          { "id": "km-n3-c9-l2-15", "term": "無理", "reading": "むり", "answer": "Vô lý, quá sức, vô lý", "meaning": "Vô lý, quá sức, vô lý", "example": "無理なお願いをする。\n(Đưa ra một yêu cầu quá sức.)" },
          { "id": "km-n3-c9-l2-16", "term": "非難", "reading": "ひなん", "answer": "Trách móc, phê phán, chỉ trích", "meaning": "Trách móc, phê phán, chỉ trích", "example": "ミスした相手を非難する。\n(Trách móc đối phương vì đã mắc lỗi.)" },
          { "id": "km-n3-c9-l2-17", "term": "非常口", "reading": "ひじょうぐち", "answer": "Cửa thoát hiểm", "meaning": "Cửa thoát hiểm", "example": "非常口を確認しておく。\n(Xác nhận trước vị trí cửa thoát hiểm.)" }
        ]
      }
    ]
  },
  {
    id: 33,
    title: "Chương 10 - Bài 1: 子ども (幼, 児, 童, 徒)",
    sections: [
      {
        id: "km-n3-c10-l1-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c10-l1-1", "term": "幼稚園", "reading": "ようちえん", "answer": "Trường mầm non, mẫu giáo", "meaning": "Trường mầm non, mẫu giáo", "example": "子どもを幼稚園へ通わせる。\n(Cho con đi học ở trường mầm non.)" },
          { "id": "km-n3-c10-l1-2", "term": "幼友達", "reading": "おさなともだち", "answer": "Bạn thời thơ ấu", "meaning": "Bạn thời thơ ấu", "example": "幼友達と久しぶりに会った。\n(Lâu lắm rồi mới gặp lại người bạn thời thơ ấu.)" },
          { "id": "km-n3-c10-l1-3", "term": "幼少期", "reading": "ようしょうき", "answer": "Thời thơ ấu, thời nhỏ", "meaning": "Thời thơ ấu, thời nhỏ", "example": "幼少期から歌手にあこがれていた。\n(Từ thời thơ ấu đã hâm mộ/mơ ước làm ca sĩ.)" },
          { "id": "km-n3-c10-l1-4", "term": "幼い", "reading": "おさない", "answer": "Thơ ngây, non nớt", "meaning": "Thơ ngây, non nớt", "example": "彼は考え方が幼い。\n(Cách suy nghĩ của anh ấy còn ngây thơ non nớt.)" },
          { "id": "km-n3-c10-l1-5", "term": "小児科", "reading": "しょうにか", "answer": "Khoa nhi", "meaning": "Khoa nhi", "example": "小児科へ子どもを連れて行く。\n(Dẫn con đến khám ở khoa nhi.)" },
          { "id": "km-n3-c10-l1-6", "term": "育児", "reading": "いくじ", "answer": "Nuôi dạy con cái", "meaning": "Nuôi dạy con cái", "example": "森さんは毎日育児でいそがしい。\n(Chị Mori hằng ngày bận rộn với việc chăm sóc con.)" },
          { "id": "km-n3-c10-l1-7", "term": "童歌", "reading": "わらべうた", "answer": "Đồng dao, bài hát thiếu nhi", "meaning": "Đồng dao, bài hát thiếu nhi", "example": "母がよく童歌を歌ってくれた。\n(Mẹ hay hát đồng dao cho tôi nghe.)" },
          { "id": "km-n3-c10-l1-8", "term": "童話", "reading": "どうわ", "answer": "Truyện cổ tích, truyện thiếu nhi", "meaning": "Truyện cổ tích, truyện thiếu nhi", "example": "「もみたろう」は有名な童話である。\n('Momotaro' là câu chuyện cổ tích nổi tiếng.)" },
          { "id": "km-n3-c10-l1-9", "term": "教徒", "reading": "きょうと", "answer": "Tín đồ", "meaning": "Tín đồ", "example": "アラビア半島にはイスラム教徒が多い。\n(Bán đảo Ả Rập có nhiều tín đồ Hồi giáo.)" },
          { "id": "km-n3-c10-l1-10", "term": "徒労", "reading": "とろう", "answer": "Công cốc, nhọc công vô ích", "meaning": "Công cốc, nhọc công vô ích", "example": "努力したのに徒労に終わった。\n(Dù đã nỗ lực nhưng kết cục lại thành công cốc.)" },
          { "id": "km-n3-c10-l1-11", "term": "幼児", "reading": "ようじ", "answer": "Trẻ nhỏ, trẻ mầm non", "meaning": "Trẻ nhỏ, trẻ mầm non", "example": "幼児教育がとてもさかんだ。\n(Giáo dục mầm non/trẻ nhỏ rất phát triển.)" },
          { "id": "km-n3-c10-l1-12", "term": "乳児", "reading": "にゅうじ", "answer": "Trẻ còn bú mẹ, trẻ dưới 1 tuổi", "meaning": "Trẻ còn bú mẹ, trẻ dưới 1 tuổi", "example": "一さい未満の乳児。\n(Trẻ sơ sinh/trẻ bú mẹ dưới 1 tuổi.)" },
          { "id": "km-n3-c10-l1-13", "term": "児童", "reading": "じどう", "answer": "Nhi đồng, trẻ em", "meaning": "Nhi đồng, trẻ em", "example": "児童会長に選ばれた。\n(Được bầu làm hội trưởng hội nhi đồng/học sinh.)" },
          { "id": "km-n3-c10-l1-14", "term": "童心", "reading": "どうしん", "answer": "Tâm hồn trẻ thơ", "meaning": "Tâm hồn trẻ thơ", "example": "ゆうえんちへ行くと童心にかえる。\n(Đi công viên giải trí làm tâm hồn trở lại như thời trẻ thơ.)" },
          { "id": "km-n3-c10-l1-15", "term": "生徒", "reading": "せいと", "answer": "Học sinh", "meaning": "Học sinh", "example": "生徒から人気がある先生。\n(Người thầy giáo được các học sinh yêu mến.)" },
          { "id": "km-n3-c10-l1-16", "term": "徒歩", "reading": "とほ", "answer": "Đi bộ", "meaning": "Đi bộ", "example": "学校まで徒歩で通う。\n(Đi bộ đến trường học.)" },
          { "id": "km-n3-c10-l1-17", "term": "童", "reading": "わらべ", "answer": "Đứa trẻ, nhi đồng (Từ cổ/thơ ca)", "meaning": "Đứa trẻ, nhi đồng (Từ cổ/thơ ca)", "example": "童たちが野原であそぶ。\n(Những đứa trẻ chơi đùa trên cánh đồng.)" }
        ]
      }
    ]
  },
  {
    id: 34,
    title: "Chương 10 - Bài 2: 先生 (担, 任, 師, 組)",
    sections: [
      {
        id: "km-n3-c10-l2-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c10-l2-1", "term": "担ぐ", "reading": "かつぐ", "answer": "Vác, gánh trên vai", "meaning": "Vác, gánh trên vai", "example": "重い荷物を担ぐ。\n(Khiêng/vác hành lý nặng.)" },
          { "id": "km-n3-c10-l2-2", "term": "担う", "reading": "になう", "answer": "Gánh vác, chịu trách nhiệm", "meaning": "Gánh vác, chịu trách nhiệm", "example": "次世代を担う若い選手を育てる。\n(Đào tạo các vận động viên trẻ gánh vác thế hệ tương lai.)" },
          { "id": "km-n3-c10-l2-3", "term": "担当", "reading": "たんとう", "answer": "Đảm nhận, phụ trách", "meaning": "Đảm nhận, phụ trách", "example": "東京エリアを担当している。\n(Đang phụ trách khu vực Tokyo.)" },
          { "id": "km-n3-c10-l2-4", "term": "任せる", "reading": "まかせる", "answer": "Giao phó, phó thác (Tha động từ)", "meaning": "Giao phó, phó thác (Tha động từ)", "example": "部下に安心して仕事を任せる。\n(Yên tâm giao phó công việc cho cấp dưới.)" },
          { "id": "km-n3-c10-l2-5", "term": "辞任", "reading": "じにん", "answer": "Từ chức", "meaning": "Từ chức", "example": "田中氏が社長を辞任した。\n(Ông Tanaka đã từ chức giám đốc.)" },
          { "id": "km-n3-c10-l2-6", "term": "医師", "reading": "いし", "answer": "Bác sĩ", "meaning": "Bác sĩ", "example": "内科の医師に相談する。\n(Thảo luận/tư vấn với bác sĩ nội khoa.)" },
          { "id": "km-n3-c10-l2-7", "term": "恩師", "reading": "おんし", "answer": "Ân sư, thầy cô ơn nghĩa", "meaning": "Ân sư, thầy cô ơn nghĩa", "example": "恩師に手紙を書く。\n(Viết thư gửi thầy cô giáo cũ.)" },
          { "id": "km-n3-c10-l2-8", "term": "組", "reading": "くみ", "answer": "Tổ, nhóm, lớp", "meaning": "Tổ, nhóm, lớp", "example": "同じ組の友達であそぶ。\n(Chơi với bạn cùng lớp/tổ.)" },
          { "id": "km-n3-c10-l2-9", "term": "組み立てる", "reading": "くみたてる", "answer": "Lắp ráp, cấu thành", "meaning": "Lắp ráp, cấu thành", "example": "プラモデルを組み立てる。\n(Lắp ráp mô hình nhựa.)" },
          { "id": "km-n3-c10-l2-10", "term": "組織図", "reading": "そしきず", "answer": "Sơ đồ tổ chức", "meaning": "Sơ đồ tổ chức", "example": "会社の組織図を作る。\n(Vẽ/lập sơ đồ tổ chức của công ty.)" },
          { "id": "km-n3-c10-l2-11", "term": "負担", "reading": "ふたん", "answer": "Gánh nặng, gánh vác chi phí", "meaning": "Gánh nặng, gánh vác chi phí", "example": "親に負担をかけたくない。\n(Không muốn gây gánh nặng cho bố mẹ.)" },
          { "id": "km-n3-c10-l2-12", "term": "担任", "reading": "たんにん", "answer": "Giáo viên chủ nhiệm", "meaning": "Giáo viên chủ nhiệm", "example": "担任の先生にほめられる。\n(Được khen bởi giáo viên chủ nhiệm.)" },
          { "id": "km-n3-c10-l2-13", "term": "任す", "reading": "まかす", "answer": "Giao phó, phó thác", "meaning": "Giao phó, phó thác", "example": "大事な仕事を部長に任される。\n(Được trưởng phòng giao cho công việc quan trọng.)" },
          { "id": "km-n3-c10-l2-14", "term": "教師", "reading": "きょうし", "answer": "Giáo viên", "meaning": "Giáo viên", "example": "高校教師になりたい。\n(Muốn trở thành giáo viên cấp 3.)" },
          { "id": "km-n3-c10-l2-15", "term": "調理師", "reading": "ちょうりし", "answer": "Đầu bếp, nhà ẩm thực", "meaning": "Đầu bếp, nhà ẩm thực", "example": "調理師として病院で働く。\n(Làm việc với tư cách là đầu bếp tại bệnh viện.)" },
          { "id": "km-n3-c10-l2-16", "term": "組む", "reading": "くむ", "answer": "Khoanh tay, hợp tác, vắt chân", "meaning": "Khoanh tay, hợp tác, vắt chân", "example": "うでを組んでじっくり考える。\n(Khoanh tay suy nghĩ kỹ lưỡng.)" },
          { "id": "km-n3-c10-l2-17", "term": "組み合わせ", "reading": "くみあわせ", "answer": "Sự kết hợp, ghép cặp", "meaning": "Sự kết hợp, ghép cặp", "example": "試合の組み合わせが決まった。\n(Bốc thăm ghép cặp thi đấu đã được quyết định.)" },
          { "id": "km-n3-c10-l2-18", "term": "番組", "reading": "ばんぐみ", "answer": "Chương trình (ti vi, phát thanh)", "meaning": "Chương trình (ti vi, phát thanh)", "example": "テレビ番組を録画する。\n(Ghi hình chương trình truyền hình.)" },
          { "id": "km-n3-c10-l2-19", "term": "師走", "reading": "しわす", "answer": "Tháng 12 âm lịch (Từ đặc biệt)", "meaning": "Tháng 12 âm lịch (Từ đặc biệt)", "example": "とくべつな言葉: 師走\n(Tháng Chạp / Tháng 12 âm lịch.)" },
          { "id": "km-n3-c10-l2-20", "term": "組み", "reading": "くみ", "answer": "Tổ, nhóm, bộ, cặp", "meaning": "Tổ, nhóm, bộ, cặp", "example": "組み分けをする。\n(Phân chia nhóm/tổ.)" }
        ]
      }
    ]
  },
  {
    id: 35,
    title: "Chương 10 - Bài 3: 教室 (机, 座, 板, 筆)",
    sections: [
      {
        id: "km-n3-c10-l3-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c10-l3-1", "term": "机", "reading": "つくえ", "answer": "Cái bàn", "meaning": "Cái bàn", "example": "机をきれいにならべる。\n(Xếp bàn học gọn gàng ngăn nắp.)" },
          { "id": "km-n3-c10-l3-2", "term": "学習机", "reading": "がくしゅうづくえ", "answer": "Bàn học tập", "meaning": "Bàn học tập", "example": "父に学習机を買ってもらった。\n(Được bố mua cho chiếc bàn học.)" },
          { "id": "km-n3-c10-l3-3", "term": "座る", "reading": "すわる", "answer": "Ngồi", "meaning": "Ngồi", "example": "公園のベンチに座る。\n(Ngồi trên ghế dài ở công viên.)" },
          { "id": "km-n3-c10-l3-4", "term": "星座", "reading": "せいざ", "answer": "Chòm sao, chòm hoàng đạo", "meaning": "Chòm sao, chòm hoàng đạo", "example": "星座うらないを信じる。\n(Tin vào bói toán chòm sao hoàng đạo.)" },
          { "id": "km-n3-c10-l3-5", "term": "板", "reading": "いた", "answer": "Tấm gỗ, ván gỗ", "meaning": "Tấm gỗ, ván gỗ", "example": "木の板を買って、犬小屋を作った。\n(Mua tấm gỗ về làm chuồng chó.)" },
          { "id": "km-n3-c10-l3-6", "term": "黒板", "reading": "こくばん", "answer": "Bảng đen", "meaning": "Bảng đen", "example": "黒板に字を大きく書く。\n(Viết chữ to lên bảng đen.)" },
          { "id": "km-n3-c10-l3-7", "term": "板前", "reading": "いたまえ", "answer": "Đầu bếp món ăn Nhật", "meaning": "Đầu bếp món ăn Nhật", "example": "一人前の板前になりたい。\n(Muốn trở thành một đầu bếp chuyên nghiệp.)" },
          { "id": "km-n3-c10-l3-8", "term": "筆", "reading": "ふで", "answer": "Bút lông, cây cọ", "meaning": "Bút lông, cây cọ", "example": "書道で使う筆を買う。\n(Mua bút lông dùng cho thư pháp.)" },
          { "id": "km-n3-c10-l3-9", "term": "鉛筆", "reading": "えんぴつ", "answer": "Bút chì", "meaning": "Bút chì", "example": "鉛筆を貸してください。\n(Xin hãy cho tôi mượn cây bút chì.)" },
          { "id": "km-n3-c10-l3-10", "term": "万年筆", "reading": "まんねんひつ", "answer": "Bút máy", "meaning": "Bút máy", "example": "万年筆をプレゼントする。\n(Tặng quà là một cây bút máy.)" },
          { "id": "km-n3-c10-l3-11", "term": "正座", "reading": "せいざ", "answer": "Ngồi quỳ kiểu Nhật (Seiza)", "meaning": "Ngồi quỳ kiểu Nhật (Seiza)", "example": "たたみの部屋で正座をする。\n(Ngồi quỳ theo phong cách Nhật trong phòng chiếu Tatami.)" },
          { "id": "km-n3-c10-l3-12", "term": "まな板", "reading": "まないた", "answer": "Thớt thái đồ ăn", "meaning": "Thớt thái đồ ăn", "example": "まな板で野菜を切る。\n(Cắt rau trên chiếc thớt.)" },
          { "id": "km-n3-c10-l3-13", "term": "板書", "reading": "ばんしょ", "answer": "Viết lên bảng", "meaning": "Viết lên bảng", "example": "板書の内容をノートに写す。\n(Chép nội dung trên bảng vào vở.)" },
          { "id": "km-n3-c10-l3-14", "term": "筆者", "reading": "ひっしゃ", "answer": "Tác giả bài viết", "meaning": "Tác giả bài viết", "example": "筆者の意見に賛成だ。\n(Tán thành với ý kiến của tác giả.)" },
          { "id": "km-n3-c10-l3-15", "term": "筆記試験", "reading": "ひっきしけん", "answer": "Kỳ thi viết", "meaning": "Kỳ thi viết", "example": "筆記試験を受ける。\n(Dự kỳ thi viết.)" },
          { "id": "km-n3-c10-l3-16", "term": "机上", "reading": "きじょう", "answer": "Trên bàn học (Lý thuyết trên giấy)", "meaning": "Trên bàn học (Lý thuyết trên giấy)", "example": "とくべつな言葉: 机上\n(Lý thuyết trên bàn giấy.)" },
          { "id": "km-n3-c10-l3-17", "term": "板木", "reading": "はんぎ", "answer": "Khuôn in gỗ", "meaning": "Khuôn in gỗ", "example": "とくべつな言葉: 板木\n(Bản in gỗ / khuôn in bằng gỗ.)" }
        ]
      }
    ]
  },
  {
    id: 36,
    title: "Chương 10 - Bài 4: 図書館 (貸, 借, 返, 冊)",
    sections: [
      {
        id: "km-n3-c10-l4-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c10-l4-1", "term": "貸す", "reading": "かす", "answer": "Cho mượn, cho vay", "meaning": "Cho mượn, cho vay", "example": "友達に本を貸した。\n(Đã cho bạn mượn sách.)" },
          { "id": "km-n3-c10-l4-2", "term": "貸し会議室", "reading": "かしかいぎしつ", "answer": "Phòng họp cho thuê", "meaning": "Phòng họp cho thuê", "example": "貸し会議室を探す。\n(Tìm kiếm phòng họp cho thuê.)" },
          { "id": "km-n3-c10-l4-3", "term": "貸借", "reading": "たいしゃく", "answer": "Vay mượn, cho mượn và vay", "meaning": "Vay mượn, cho mượn và vay", "example": "貸借について法律で定められている。\n(Pháp luật quy định cụ thể về việc vay mượn.)" },
          { "id": "km-n3-c10-l4-4", "term": "貸し借り", "reading": "かしかり", "answer": "Vay mượn qua lại", "meaning": "Vay mượn qua lại", "example": "お金の貸し借りはやめなさい。\n(Hãy dừng việc vay mượn tiền bạc qua lại.)" },
          { "id": "km-n3-c10-l4-5", "term": "借金", "reading": "しゃっきん", "answer": "Khoản nợ, tiền nợ", "meaning": "Khoản nợ, tiền nợ", "example": "多くの借金をかかえる。\n(Gánh trên mình nhiều khoản nợ.)" },
          { "id": "km-n3-c10-l4-6", "term": "振り返る", "reading": "ふりかえる", "answer": "Ngoảnh lại, nhìn lại quá khứ", "meaning": "Ngoảnh lại, nhìn lại quá khứ", "example": "後ろを振り返る。\n(Ngoảnh mặt nhìn lại phía sau.)" },
          { "id": "km-n3-c10-l4-7", "term": "返す", "reading": "かえす", "answer": "Trả lại", "meaning": "Trả lại", "example": "友達にノートを返す。\n(Trả lại cuốn sổ cho bạn.)" },
          { "id": "km-n3-c10-l4-8", "term": "返信", "reading": "へんしん", "answer": "Trả lời thư, phản hồi", "meaning": "Trả lời thư, phản hồi", "example": "メールにすぐに返信をした。\n(Gửi phản hồi email ngay lập tức.)" },
          { "id": "km-n3-c10-l4-9", "term": "三冊", "reading": "さんさつ", "answer": "Ba quyển / cuốn", "meaning": "Ba quyển / cuốn", "example": "１ヵ月に本を三冊読んだ。\n(Trong 1 tháng đã đọc được 3 cuốn sách.)" },
          { "id": "km-n3-c10-l4-10", "term": "別冊", "reading": "べっさつ", "answer": "Tập phụ, phụ bản kèm theo", "meaning": "Tập phụ, phụ bản kèm theo", "example": "四月号は別冊付録がついている。\n(Tập phát hành tháng 4 có kèm theo phụ bản riêng.)" },
          { "id": "km-n3-c10-l4-11", "term": "貸し切る", "reading": "かしきる", "answer": "Bao trọn, thuê trọn gói", "meaning": "Bao trọn, thuê trọn gói", "example": "バスを貸し切って遠足へ行った。\n(Thuê trọn chuyến xe buýt đi dã ngoại.)" },
          { "id": "km-n3-c10-l4-12", "term": "借りる", "reading": "かりる", "answer": "Mượn, vay (động từ)", "meaning": "Mượn, vay (động từ)", "example": "図書館で本を借りる。\n(Mượn sách ở thư viện.)" },
          { "id": "km-n3-c10-l4-13", "term": "借地", "reading": "しゃくち", "answer": "Đất thuê", "meaning": "Đất thuê", "example": "借地に家を建てた。\n(Xây nhà trên mảnh đất đi thuê.)" },
          { "id": "km-n3-c10-l4-14", "term": "繰り返す", "reading": "くりかえす", "answer": "Lặp đi lặp lại", "meaning": "Lặp đi lặp lại", "example": "同じ失敗を繰り返す。\n(Lặp đi lặp lại cùng một sai lầm.)" },
          { "id": "km-n3-c10-l4-15", "term": "寝返り", "reading": "ねがえり", "answer": "Trở mình khi ngủ, lật mặt", "meaning": "Trở mình khi ngủ, lật mặt", "example": "寝返りをうつ。\n(Trở mình trằn trọc khi ngủ.)" },
          { "id": "km-n3-c10-l4-16", "term": "返事", "reading": "へんじ", "answer": "Trả lời, thưa đáp", "meaning": "Trả lời, thưa đáp", "example": "大きい声で返事をする。\n(Trả lời to rõ ràng.)" },
          { "id": "km-n3-c10-l4-17", "term": "返品", "reading": "へんぴん", "answer": "Trả lại hàng hóa", "meaning": "Trả lại hàng hóa", "example": "服を返品したい。\n(Muốn trả lại bộ quần áo.)" },
          { "id": "km-n3-c10-l4-18", "term": "小冊子", "reading": "しょうさっし", "answer": "Cuốn sách nhỏ, tập tài liệu mỏng", "meaning": "Cuốn sách nhỏ, tập tài liệu mỏng", "example": "小冊子をくばる。\n(Phát các cuốn sách hướng dẫn mỏng.)" },
          { "id": "km-n3-c10-l4-19", "term": "短冊", "reading": "たんざく", "answer": "Tấm giấy dài viết điều ước (Tanabata)", "meaning": "Tấm giấy dài viết điều ước (Tanabata)", "example": "とくべつな言葉: 短冊\n(Tấm giấy nhỏ viết câu thơ/điều ước.)" },
          { "id": "km-n3-c10-l4-20", "term": "返る", "reading": "かえる", "answer": "Trở lại, quay về (Tự động từ)", "meaning": "Trở lại, quay về (Tự động từ)", "example": "初心に返る。\n(Quay trở lại với tâm nguyện ban đầu.)" }
        ]
      }
    ]
  },
  {
    id: 37,
    title: "Chương 10 - Bài 5: 体育 (具, 箱, 棒, 伸)",
    sections: [
      {
        id: "km-n3-c10-l5-vocabulary",
        title: "Từ vựng (Flashcard)",
        type: "vocabulary",
        items: [
          { "id": "km-n3-c10-l5-1", "term": "道具", "reading": "どうぐ", "answer": "Dụng cụ, đồ dùng", "meaning": "Dụng cụ, đồ dùng", "example": "調理道具をそろえる。\n(Chuẩn bị sắm sửa dụng cụ nấu ăn.)" },
          { "id": "km-n3-c10-l5-2", "term": "文具店", "reading": "ぶんぐてん", "answer": "Cửa hàng văn phòng phẩm", "meaning": "Cửa hàng văn phòng phẩm", "example": "文具店でノートを買う。\n(Mua cuốn sổ ở cửa hàng văn phòng phẩm.)" },
          { "id": "km-n3-c10-l5-3", "term": "具体例", "reading": "ぐたいれい", "answer": "Ví dụ cụ thể", "meaning": "Ví dụ cụ thể", "example": "具体例を出して説明した。\n(Đưa ra ví dụ cụ thể để giải thích.)" },
          { "id": "km-n3-c10-l5-4", "term": "箱", "reading": "はこ", "answer": "Cái hộp, cái thùng", "meaning": "Cái hộp, cái thùng", "example": "商品を箱につめる。\n(Đóng gói sản phẩm vào thùng.)" },
          { "id": "km-n3-c10-l5-5", "term": "空き箱", "reading": "あきばこ", "answer": "Vỏ hộp rỗng", "meaning": "Vỏ hộp rỗng", "example": "空き箱におもちゃをしまう。\n(Cất đồ chơi vào vỏ hộp rỗng.)" },
          { "id": "km-n3-c10-l5-6", "term": "棒", "reading": "ぼう", "answer": "Cây gậy", "meaning": "Cây gậy", "example": "木の棒でたたかれた。\n(Bị đánh bằng cây gậy gỗ.)" },
          { "id": "km-n3-c10-l5-7", "term": "伸べる", "reading": "のべる", "answer": "Vươn ra, chìa ra (tay cứu giúp...)", "meaning": "Vươn ra, chìa ra (tay cứu giúp...)", "example": "救いの手を伸べる。\n(Vươn bàn tay cứu giúp.)" },
          { "id": "km-n3-c10-l5-8", "term": "伸びる", "reading": "のびる", "answer": "Tăng lên, dài ra, cao lên (Tự động từ)", "meaning": "Tăng lên, dài ra, cao lên (Tự động từ)", "example": "1年で身長が5センチ伸びた。\n(Trong 1 năm chiều cao đã tăng lên 5 cm.)" },
          { "id": "km-n3-c10-l5-9", "term": "伸ばす", "reading": "のばす", "answer": "Kéo dài, vươn ra (Tha động từ)", "meaning": "Kéo dài, vươn ra (Tha động từ)", "example": "救いの手を伸ばす。\n(Vươn bàn tay cứu giúp.)" },
          { "id": "km-n3-c10-l5-10", "term": "屈伸", "reading": "くっしん", "answer": "Co giãn, tập khởi động cơ thể", "meaning": "Co giãn, tập khởi động cơ thể", "example": "運動の前に屈伸をする。\n(Khởi động cơ thể trước khi vận động.)" },
          { "id": "km-n3-c10-l5-11", "term": "家具", "reading": "かぐ", "answer": "Đồ nội thất, đồ gia dụng", "meaning": "Đồ nội thất, đồ gia dụng", "example": "新しい家具を買う。\n(Mua đồ nội thất mới.)" },
          { "id": "km-n3-c10-l5-12", "term": "遊具", "reading": "ゆうぐ", "answer": "Thiết bị trò chơi (ở công viên)", "meaning": "Thiết bị trò chơi (ở công viên)", "example": "公園の遊具であそぶ。\n(Chơi với các thiết bị trò chơi ở công viên.)" },
          { "id": "km-n3-c10-l5-13", "term": "本箱", "reading": "ほんばこ", "answer": "Tủ sách, kệ sách", "meaning": "Tủ sách, kệ sách", "example": "読んだマンガを本箱にしまう。\n(Cất tập truyện tranh đã đọc vào tủ sách.)" },
          { "id": "km-n3-c10-l5-14", "term": "ゴミ箱", "reading": "ごみばこ", "answer": "Thùng rác", "meaning": "Thùng rác", "example": "部屋のすみにゴミ箱を置く。\n(Đặt thùng rác ở góc phòng.)" },
          { "id": "km-n3-c10-l5-15", "term": "鉄棒", "reading": "てつぼう", "answer": "Xà đơn (thể thao/trường học)", "meaning": "Xà đơn (thể thao/trường học)", "example": "学校の鉄棒であそんだ。\n(Chơi xà đơn ở trường học.)" },
          { "id": "km-n3-c10-l5-16", "term": "棒に振る", "reading": "ぼうにふる", "answer": "Làm uổng phí, đánh mất cơ hội", "meaning": "Làm uổng phí, đánh mất cơ hội", "example": "出世のチャンスを棒にふる。\n(Làm uổng phí cơ hội thăng tiến.)" },
          { "id": "km-n3-c10-l5-17", "term": "伸ばしたい", "reading": "のばしたい", "answer": "Muốn phát triển, muốn mở rộng", "meaning": "Muốn phát triển, muốn mở rộng", "example": "学力をもっとのばしたい。\n(Muốn nâng cao/phát triển năng lực học tập hơn nữa.)" },
          { "id": "km-n3-c10-l5-18", "term": "伸び", "reading": "のび", "answer": "Sự vươn vai, sự phát triển", "meaning": "Sự vươn vai, sự phát triển", "example": "朝起きてのびをする。\n(Thức dậy buổi sáng rồi vươn vai.)" }
        ]
      }
    ]
  }
];

export const kanjiMasterN3Chars: { [lessonId: number]: KanjiChar[] } = {
  101: [
    { char: "起", hanViet: "KHỞI", strokes: 10, onyomi: ["キ"], kunyomi: ["お-きる", "お-こる", "お-こす"], meaning: "Thức dậy, xảy ra, đánh thức, khởi động", examples: [{ word: "起きる", reading: "おきる", meaning: "Thức dậy" }, { word: "起こる", reading: "おこる", meaning: "Xảy ra" }, { word: "起こす", reading: "おこす", meaning: "Đánh thức" }, { word: "早起き", reading: "はやおき", meaning: "Dậy sớm" }, { word: "起動", reading: "きどう", meaning: "Khởi động" }] },
    { char: "寝", hanViet: "TẨM", strokes: 13, onyomi: ["シン"], kunyomi: ["ね-る", "ね-かす"], meaning: "Ngủ, ru ngủ, phòng ngủ", examples: [{ word: "寝る", reading: "ねる", meaning: "Ngủ" }, { word: "寝かす", reading: "ねかす", meaning: "Ru ngủ" }, { word: "寝室", reading: "しんしつ", meaning: "Phòng ngủ" }, { word: "昼寝", reading: "ひるね", meaning: "Ngủ trưa" }] },
    { char: "浴", hanViet: "DỤC", strokes: 10, onyomi: ["ヨク"], kunyomi: ["あ-びる", "あ-びせる"], meaning: "Tắm, dội nước, tắm nắng", examples: [{ word: "浴びる", reading: "あびる", meaning: "Tắm (vòi sen)" }, { word: "浴びせる", reading: "あびせる", meaning: "Dội, trút lên" }, { word: "日光浴", reading: "にっこうよく", meaning: "Tắm nắng" }, { word: "浴室", reading: "よくしつ", meaning: "Phòng tắm" }, { word: "海水浴", reading: "かいすいよく", meaning: "Tắm biển" }] },
    { char: "湯", hanViet: "THANG", strokes: 12, onyomi: ["トウ"], kunyomi: ["ゆ"], meaning: "Nước nóng, nước sôi, bồn tắm", examples: [{ word: "お湯", reading: "おゆ", meaning: "Nước nóng" }, { word: "熱湯", reading: "ねっとう", meaning: "Nước sôi sùng sục" }, { word: "湯船", reading: "ゆぶね", meaning: "Bồn tắm" }] }
  ],
  102: [
    { char: "洗", hanViet: "TẨY", strokes: 9, onyomi: ["セン"], kunyomi: ["あら-う"], meaning: "Rửa, giặt, chất tẩy", examples: [{ word: "洗う", reading: "あらう", meaning: "Rửa, giặt" }, { word: "洗剤", reading: "せんざい", meaning: "Chất tẩy rửa" }, { word: "手洗い", reading: "てあらい", meaning: "Rửa tay" }, { word: "洗面所", reading: "せんめんじょ", meaning: "Chỗ rửa mặt" }] },
    { char: "濯", hanViet: "TRẠC", strokes: 17, onyomi: ["タク"], kunyomi: [], meaning: "Rửa, giặt quần áo", examples: [{ word: "洗濯", reading: "せんたく", meaning: "Giặt giũ" }, { word: "洗濯物", reading: "せんたくもの", meaning: "Quần áo giặt" }] },
    { char: "干", hanViet: "CAN", strokes: 3, onyomi: ["カン"], kunyomi: ["ほ-す", "ひ-る"], meaning: "Phơi khô, can thiệp, số ít", examples: [{ word: "干す", reading: "ほす", meaning: "Phơi khô" }, { word: "干る", reading: "ひる", meaning: "Khô cạn" }, { word: "干物", reading: "ひもの", meaning: "Đồ khô" }, { word: "若干名", reading: "じゃっかんめい", meaning: "Một vài người" }, { word: "干渉", reading: "かんしょう", meaning: "Can thiệp" }] },
    { char: "活", hanViet: "HOẠT", strokes: 9, onyomi: ["カツ"], kunyomi: [], meaning: "Sống, sinh hoạt, hoạt động, sôi nổi", examples: [{ word: "生活", reading: "せいかつ", meaning: "Cuộc sống" }, { word: "活動", reading: "かつどう", meaning: "Hoạt động" }, { word: "活発な", reading: "かっぱつな", meaning: "Hoạt bát" }, { word: "活気", reading: "かっき", meaning: "Sức sống, sôi nổi" }] }
  ],
  103: [
    { char: "拾", hanViet: "THẬP", strokes: 9, onyomi: ["シュウ", "ジュウ"], kunyomi: ["ひろ-う"], meaning: "Nhặt, lượm, bắt taxi, mười vạn", examples: [{ word: "拾う", reading: "ひろう", meaning: "Nhặt" }, { word: "拾得物", reading: "しゅうとくぶつ", meaning: "Đồ nhặt được" }, { word: "拾万円", reading: "じゅうまんえん", meaning: "Mười vạn yên" }, { word: "ゴミ拾い", reading: "ゴミひろい", meaning: "Nhặt rác" }] },
    { char: "捨", hanViet: "XẢ", strokes: 11, onyomi: ["シャ"], kunyomi: ["す-てる"], meaning: "Vứt bỏ, ném bỏ, làm tròn số", examples: [{ word: "捨てる", reading: "すてる", meaning: "Vứt bỏ" }, { word: "四捨五入", reading: "ししゃごにゅう", meaning: "Làm tròn số" }, { word: "投げ捨て", reading: "なげすて", meaning: "Vứt bừa bãi" }] },
    { char: "燃", hanViet: "NHIÊN", strokes: 16, onyomi: ["ネン"], kunyomi: ["も-える", "も-やす", "も-す"], meaning: "Cháy, đốt cháy, nhiên liệu", examples: [{ word: "燃える", reading: "もえる", meaning: "Bốc cháy" }, { word: "燃す", reading: "もす", meaning: "Đốt" }, { word: "燃やす", reading: "もやす", meaning: "Nhen nhóm, đốt" }, { word: "燃料", reading: "ねんりょう", meaning: "Nhiên liệu" }] },
    { char: "袋", hanViet: "ĐẠI", strokes: 11, onyomi: ["タイ"], kunyomi: ["ふくろ"], meaning: "Cái túi, bao bì, găng tay", examples: [{ word: "袋", reading: "ふくろ", meaning: "Cái túi" }, { word: "紙袋", reading: "かみぶくろ", meaning: "Túi giấy" }, { word: "手袋", reading: "てぶくろ", meaning: "Găng tay" }, { word: "ビニール袋", reading: "ビニールぶくろ", meaning: "Túi nilon" }] }
  ],
  104: [
    { char: "曜", hanViet: "DIỆU", strokes: 18, onyomi: ["ヨウ"], kunyomi: [], meaning: "Thứ trong tuần, ngày", examples: [{ word: "曜日", reading: "ようび", meaning: "Thứ trong tuần" }, { word: "日曜日", reading: "にちようび", meaning: "Chủ Nhật" }, { word: "火曜日", reading: "かようび", meaning: "Thứ Ba" }, { word: "木曜日", reading: "もくようび", meaning: "Thứ Năm" }] },
    { char: "末", hanViet: "MẠT", strokes: 5, onyomi: ["マツ", "バツ"], kunyomi: ["すえ"], meaning: "Cuối, ngọn, kết cục, con út", examples: [{ word: "週末", reading: "しゅうまつ", meaning: "Cuối tuần" }, { word: "期末", reading: "きまつ", meaning: "Cuối kỳ" }, { word: "結末", reading: "けつまつ", meaning: "Kết cục" }, { word: "月末", reading: "げつまつ", meaning: "Cuối tháng" }, { word: "末っ子", reading: "すえっこ", meaning: "Con út" }] },
    { char: "昨", hanViet: "TÁC", strokes: 9, onyomi: ["サク"], kunyomi: [], meaning: "Hôm qua, năm ngoái, trước đó", examples: [{ word: "昨日", reading: "さくじつ", meaning: "Hôm qua" }, { word: "昨夜", reading: "さくや", meaning: "Đêm qua" }, { word: "昨晩", reading: "さくばん", meaning: "Tối qua" }, { word: "昨年", reading: "さくねん", meaning: "Năm ngoái" }] },
    { char: "翌", hanViet: "DỰC", strokes: 11, onyomi: ["ヨク"], kunyomi: [], meaning: "Sau đó, tiếp theo (ngày mai, năm sau)", examples: [{ word: "翌朝", reading: "よくあさ", meaning: "Sáng hôm sau" }, { word: "翌日", reading: "よくじつ", meaning: "Ngày hôm sau" }, { word: "翌年", reading: "よくとし", meaning: "Năm sau đó" }] }
  ],
  105: [
    { char: "予", hanViet: "DỰ", strokes: 4, onyomi: ["ヨ"], kunyomi: [], meaning: "Trước, dự định, dự báo", examples: [{ word: "予定", reading: "よてい", meaning: "Dự định" }, { word: "天気予報", reading: "てんきよほう", meaning: "Dự báo thời tiết" }, { word: "予習", reading: "よしゅう", meaning: "Chuẩn bị bài trước" }] },
    { char: "定", hanViet: "ĐỊNH", strokes: 8, onyomi: ["テイ", "ジョウ"], kunyomi: ["さだ-まる", "さだ-める", "さだ-か"], meaning: "Xác định, ổn định, quy định", examples: [{ word: "定まる", reading: "さだまる", meaning: "Ổn định, được xác định" }, { word: "定める", reading: "さだめる", meaning: "Ban hành, quy định" }, { word: "定年", reading: "ていねん", meaning: "Tuổi về hưu" }, { word: "定か", reading: "さだか", meaning: "Rõ ràng" }, { word: "定規", reading: "じょうぎ", meaning: "Thước kẻ" }] },
    { char: "用", hanViet: "DỤNG", strokes: 5, onyomi: ["ヨウ"], kunyomi: ["もち-いる"], meaning: "Sử dụng, dành cho, việc bận", examples: [{ word: "用いる", reading: "もちいる", meaning: "Sử dụng" }, { word: "子供用", reading: "こどもよう", meaning: "Dành cho trẻ em" }, { word: "利用", reading: "りよう", meaning: "Tận dụng" }, { word: "用事", reading: "ようじ", meaning: "Việc bận" }] },
    { char: "事", hanViet: "SỰ", strokes: 8, onyomi: ["ジ", "ズ"], kunyomi: ["こと"], meaning: "Sự việc, việc, công trình, ăn uống", examples: [{ word: "大事な", reading: "だいじな", meaning: "Quan trọng" }, { word: "事", reading: "こと", meaning: "Sự tình" }, { word: "工事", reading: "こうじ", meaning: "Công trình" }, { word: "食事", reading: "しょくじ", meaning: "Bữa ăn" }] }
  ],
  201: [
    { char: "押", hanViet: "ÁP", strokes: 8, onyomi: ["オウ"], kunyomi: ["お-す", "お-さえる"], meaning: "Ấn, bấm, đè, đóng dấu", examples: [{ word: "押す", reading: "おす", meaning: "Bấm, ấn" }, { word: "押印", reading: "おういん", meaning: "Đóng dấu" }, { word: "押さえる", reading: "おさえる", meaning: "Bịt giữ, đè chặt" }] },
    { char: "引", hanViet: "DẪN", strokes: 4, onyomi: ["イン"], kunyomi: ["ひ-く", "ひ-ける"], meaning: "Kéo, dẫn, rút lui, trích dẫn", examples: [{ word: "引く", reading: "ひく", meaning: "Kéo" }, { word: "引ける", reading: "ひける", meaning: "Co rúm, thoái lui, tan học/làm" }, { word: "引き出す", reading: "ひきだす", meaning: "Rút tiền" }, { word: "強引に", reading: "ごういんに", meaning: "Cưỡng ép" }, { word: "引用", reading: "いんよう", meaning: "Trích dẫn" }] },
    { char: "取", hanViet: "THỦ", strokes: 8, onyomi: ["シュ"], kunyomi: ["と-る"], meaning: "Lấy, nhận, bắt lấy", examples: [{ word: "取る", reading: "とる", meaning: "Lấy, bắt" }, { word: "取材", reading: "しゅざい", meaning: "Phỏng vấn tác nghiệp" }, { word: "取り消す", reading: "とりけす", meaning: "Hủy bỏ" }] },
    { char: "消", hanViet: "TIÊU", strokes: 10, onyomi: ["ショウ"], kunyomi: ["き-える", "け-す"], meaning: "Tắt, dập tắt, biến mất, tiêu hóa", examples: [{ word: "消える", reading: "きえる", meaning: "Tắt (tự động từ)" }, { word: "消す", reading: "けす", meaning: "Dập tắt" }, { word: "消防車", reading: "しょうぼうしゃ", meaning: "Xe cứu hỏa" }, { word: "消化", reading: "しょうか", meaning: "Tiêu hóa" }] }
  ],
  202: [
    { char: "戸", hanViet: "HỘ", strokes: 4, onyomi: ["コ"], kunyomi: ["と"], meaning: "Cánh cửa, nhà, hộ gia đình", examples: [{ word: "戸", reading: "と", meaning: "Cánh cửa" }, { word: "戸外", reading: "こがい", meaning: "Ngoài trời" }, { word: "一戸建て", reading: "いっこだて", meaning: "Nhà riêng lẻ" }, { word: "門戸", reading: "もんこ", meaning: "Cửa ngõ hội nhập" }] },
    { char: "窓", hanViet: "SONG", strokes: 11, onyomi: ["ソウ"], kunyomi: ["まど"], meaning: "Cửa sổ, quầy giao dịch", examples: [{ word: "窓", reading: "まど", meaning: "Cửa sổ" }, { word: "車窓", reading: "しゃそう", meaning: "Cửa sổ tàu xe" }, { word: "窓口", reading: "まどぐち", meaning: "Quầy giao dịch" }, { word: "同窓会", reading: "どうそうかい", meaning: "Họp lớp" }] },
    { char: "階", hanViet: "GIAI", strokes: 12, onyomi: ["カイ"], kunyomi: [], meaning: "Tầng, bậc thang", examples: [{ word: "六階", reading: "ろっかい", meaning: "Tầng 6" }, { word: "四階", reading: "よんかい", meaning: "Tầng 4" }, { word: "階段", reading: "かいだん", meaning: "Cầu thang" }] },
    { char: "段", hanViet: "ĐOẠN", strokes: 9, onyomi: ["ダン"], kunyomi: [], meaning: "Bậc, giai đoạn, thủ đoạn, phương thức", examples: [{ word: "石段", reading: "いしだん", meaning: "Bậc thang đá" }, { word: "手段", reading: "しゅだん", meaning: "Thủ đoạn/cách thức" }, { word: "段階", reading: "だんかい", meaning: "Giai đoạn" }] }
  ],
  203: [
    { char: "植", hanViet: "THỰC", strokes: 12, onyomi: ["ショウ"], kunyomi: ["う-わる", "う-える"], meaning: "Trồng cây, cấy ghép, thực vật", examples: [{ word: "植える", reading: "うえる", meaning: "Trồng cây" }, { word: "植わる", reading: "うわる", meaning: "Được trồng" }, { word: "植物", reading: "しょくぶつ", meaning: "Thực vật" }, { word: "移植", reading: "いしょく", meaning: "Cấy ghép" }, { word: "植木", reading: "うえき", meaning: "Cây cảnh" }] },
    { char: "葉", hanViet: "DIỆP", strokes: 12, onyomi: ["ヨウ"], kunyomi: ["は"], meaning: "Lá cây, từ ngữ, lá đỏ", examples: [{ word: "葉", reading: "は", meaning: "Lá cây" }, { word: "言葉", reading: "ことば", meaning: "Từ ngữ" }, { word: "落ち葉", reading: "おちば", meaning: "Lá rụng" }, { word: "紅葉", reading: "こうよう", meaning: "Lá đỏ mùa thu" }] },
    { char: "実", hanViet: "THỰC", strokes: 8, onyomi: ["ジツ"], kunyomi: ["みの-る", "み"], meaning: "Trái, quả, sự thật, hiện thực", examples: [{ word: "実", reading: "み", meaning: "Trái quả" }, { word: "実る", reading: "みのる", meaning: "Đơm hoa kết trái" }, { word: "実現", reading: "じつげん", meaning: "Hiện thực" }, { word: "実家", reading: "じっか", meaning: "Nhà bố mẹ đẻ" }] },
    { char: "根", hanViet: "CĂN", strokes: 10, onyomi: ["コン"], kunyomi: ["ね"], meaning: "Rễ cây, gốc rễ, căn bản", examples: [{ word: "根", reading: "ね", meaning: "Rễ cây" }, { word: "根元", reading: "ねもと", meaning: "Gốc cây" }, { word: "屋根", reading: "やね", meaning: "Mái nhà" }, { word: "根本", reading: "こんぽん", meaning: "Căn bản" }] }
  ],
  204: [
    { char: "建", hanViet: "KIẾN", strokes: 9, onyomi: ["ケン", "コン"], kunyomi: ["た-つ", "た-てる"], meaning: "Xây dựng, kiến trúc", examples: [{ word: "建つ", reading: "たつ", meaning: "Được xây dựng" }, { word: "建てる", reading: "たてる", meaning: "Xây dựng" }, { word: "建立", reading: "こんりゅう", meaning: "Xây cất chùa" }, { word: "建造物", reading: "けんぞうぶつ", meaning: "Công trình kiến trúc" }] },
    { char: "築", hanViet: "TRÚC", strokes: 16, onyomi: ["チク"], kunyomi: ["きず-く"], meaning: "Xây đắp, kiến trúc, cải tạo", examples: [{ word: "築く", reading: "きずく", meaning: "Xây đắp" }, { word: "改築", reading: "かいちく", meaning: "Cải tạo nhà" }, { word: "新築", reading: "しんちく", meaning: "Xây mới" }, { word: "建築士", reading: "けんちくし", meaning: "Kiến trúc sư" }] },
    { char: "構", hanViet: "CẤU", strokes: 14, onyomi: ["コウ"], kunyomi: ["かま-う", "かま-える"], meaning: "Cấu tạo, kết cấu, mở tiệm, bận tâm", examples: [{ word: "構える", reading: "かまえる", meaning: "Mở tiệm" }, { word: "構う", reading: "かまう", meaning: "Bận tâm, để ý" }, { word: "構造", reading: "こうぞう", meaning: "Cấu tạo" }, { word: "構成", reading: "こうせい", meaning: "Cấu thành" }, { word: "構内", reading: "こうない", meaning: "Khuôn viên" }] },
    { char: "造", hanViet: "TẠO", strokes: 10, onyomi: ["ゾウ"], kunyomi: ["つく-る"], meaning: "Chế tạo, làm ra, tạo", examples: [{ word: "造る", reading: "つくる", meaning: "Chế tạo, đóng tàu" }, { word: "木造", reading: "もくぞう", meaning: "Làm bằng gỗ" }, { word: "造花", reading: "ぞうか", meaning: "Hoa giả" }, { word: "造船", reading: "ぞうせん", meaning: "Đóng tàu" }] }
  ],
  205: [
    { char: "設", hanViet: "THIẾT", strokes: 11, onyomi: ["セツ"], kunyomi: ["もう-ける"], meaning: "Thiết lập, đặt ra, thiết kế, xây dựng", examples: [{ word: "設ける", reading: "もうける", meaning: "Đặt ra quy tắc" }, { word: "設定", reading: "せってい", meaning: "Cài đặt" }, { word: "設計", reading: "せっけい", meaning: "Thiết kế" }, { word: "設立", reading: "せつりつ", meaning: "Thành lập" }] },
    { char: "柱", hanViet: "TRỤ", strokes: 9, onyomi: ["チュウ"], kunyomi: ["はしら"], meaning: "Cột nhà, cột điện, trụ cột", examples: [{ word: "柱", reading: "はしら", meaning: "Cột nhà" }, { word: "電柱", reading: "でんちゅう", meaning: "Cột điện" }, { word: "大黒柱", reading: "だいこくばしら", meaning: "Trụ cột chính" }] },
    { char: "庫", hanViet: "KHỐ", strokes: 10, onyomi: ["コ", "ク"], kunyomi: [], meaning: "Nhà kho, két, gara", examples: [{ word: "金庫", reading: "きんこ", meaning: "Két sắt" }, { word: "車庫", reading: "しゃこ", meaning: "Nhà để xe" }, { word: "庫裏", reading: "くり", meaning: "Nhà bếp chùa" }] },
    { char: "向", hanViet: "HƯỚNG", strokes: 6, onyomi: ["コウ"], kunyomi: ["む-く", "む-ける", "む-かう", "む-こう"], meaning: "Hướng về, quay mặt, phía đối diện", examples: [{ word: "向く", reading: "むく", meaning: "Quay mặt, phù hợp" }, { word: "向ける", reading: "むける", meaning: "Hướng về phía" }, { word: "向かう", reading: "むかう", meaning: "Hướng đến" }, { word: "向こう", reading: "むこう", meaning: "Phía đối diện" }, { word: "向上心", reading: "こうじょうしん", meaning: "Tinh thần cầu tiến" }] }
  ],
  1: [
    { char: "熱", hanViet: "NHIỆT", strokes: 15, onyomi: ["ネツ"], kunyomi: ["あつ-い"], meaning: "Nóng, nhiệt độ, nhiệt tình", examples: [{ word: "熱い", reading: "あつい", meaning: "Nóng" }, { word: "高熱", reading: "こうねつ", meaning: "Sốt cao" }, { word: "熱心", reading: "ねっしん", meaning: "Nhiệt tình" }] },
    { char: "冷", hanViet: "LÃNH", strokes: 7, onyomi: ["レイ"], kunyomi: ["ひ-える", "ひ-やす", "さ-める", "さ-ます", "ひ-や"], meaning: "Lạnh, nguội, làm lạnh", examples: [{ word: "冷える", reading: "ひえる", meaning: "Lạnh đi" }, { word: "冷やす", reading: "ひやす", meaning: "Làm lạnh" }, { word: "冷たい", reading: "つめたい", meaning: "Lạnh" }] },
    { char: "温", hanViet: "ÔN", strokes: 12, onyomi: ["オン"], kunyomi: ["あたた-まる", "あたた-める", "あたた-かい", "あたた-か"], meaning: "Ấm, ôn hòa", examples: [{ word: "温まる", reading: "あたたまる", meaning: "Ấm lên" }, { word: "温かい", reading: "あたたかい", meaning: "Ấm áp" }] },
    { char: "度", hanViet: "ĐỘ", strokes: 9, onyomi: ["ド", "ト", "タク"], kunyomi: ["たび"], meaning: "Mức độ, lần, chuẩn bị", examples: [{ word: "温度", reading: "おんど", meaning: "Nhiệt độ" }, { word: "支度", reading: "したく", meaning: "Sửa soạn" }] }
  ],
  2: [
    { char: "材", hanViet: "TÀI", strokes: 7, onyomi: ["ザイ"], kunyomi: [], meaning: "Nguyên liệu, gỗ, nhân tài", examples: [{ word: "材料", reading: "ざいりょう", meaning: "Nguyên liệu" }, { word: "木材", reading: "もくざい", meaning: "Gỗ" }] },
    { char: "型", hanViet: "HÌNH", strokes: 9, onyomi: ["ケイ"], kunyomi: ["かた"], meaning: "Khuôn, mẫu, điển hình", examples: [{ word: "型", reading: "かた", meaning: "Khuôn mẫu" }, { word: "典型的な", reading: "てんけいてきな", meaning: "Điển hình" }] },
    { char: "焼", hanViet: "THIÊU", strokes: 12, onyomi: ["ショウ"], kunyomi: ["や-ける", "や-く"], meaning: "Nướng, thiêu đốt", examples: [{ word: "焼く", reading: "やく", meaning: "Nướng" }, { word: "日焼け", reading: "ひやけ", meaning: "Cháy nắng" }] },
    { char: "器", hanViet: "KHÍ", strokes: 15, onyomi: ["キ"], kunyomi: ["うつわ"], meaning: "Bát đĩa, đồ đựng, khéo léo", examples: [{ word: "器", reading: "うつわ", meaning: "Bát đĩa" }, { word: "食器", reading: "しょっき", meaning: "Bát đĩa" }] }
  ],
  3: [
    { char: "卵", hanViet: "NOÃN", strokes: 7, onyomi: ["ラン"], kunyomi: ["たまご"], meaning: "Quả trứng", examples: [{ word: "卵", reading: "たまご", meaning: "Quả trứng" }, { word: "卵白", reading: "らんぱく", meaning: "Lòng trắng trứng" }] },
    { char: "乳", hanViet: "NHŨ", strokes: 8, onyomi: ["ニュウ"], kunyomi: ["ちち", "ち"], meaning: "Sữa", examples: [{ word: "牛乳", reading: "ぎゅうにゅう", meaning: "Sữa bò" }, { word: "乳歯", reading: "にゅうし", meaning: "Răng sữa" }] },
    { char: "粉", hanViet: "PHẤN", strokes: 10, onyomi: ["フン"], kunyomi: ["こな", "こ"], meaning: "Bột", examples: [{ word: "小麦粉", reading: "こむぎこ", meaning: "Bột mì" }, { word: "粉末", reading: "ふんまつ", meaning: "Dạng bột" }] },
    { char: "塩", hanViet: "DIÊM", strokes: 13, onyomi: ["エン"], kunyomi: ["しお"], meaning: "Muối", examples: [{ word: "塩", reading: "しお", meaning: "Muối" }, { word: "塩味", reading: "しおあじ", meaning: "Vị muối" }] }
  ],
  4: [
    { char: "菜", hanViet: "THÁI", strokes: 11, onyomi: ["サイ"], kunyomi: ["な"], meaning: "Rau", examples: [{ word: "野菜", reading: "やさい", meaning: "Rau" }, { word: "菜の花", reading: "なのはな", meaning: "Hoa cải" }] },
    { char: "果", hanViet: "QUẢ", strokes: 8, onyomi: ["カ"], kunyomi: ["は-たす", "は-てる", "は-て"], meaning: "Quả, kết quả", examples: [{ word: "成果", reading: "せいか", meaning: "Thành quả" }, { word: "果たす", reading: "はたす", meaning: "Hoàn thành" }] },
    { char: "豆", hanViet: "ĐẬU", strokes: 7, onyomi: ["トウ", "ズ"], kunyomi: ["まめ"], meaning: "Đậu phụ, hạt đậu", examples: [{ word: "豆腐", reading: "とうふ", meaning: "Đậu phụ" }, { word: "大豆", reading: "だいず", meaning: "Đậu nành" }] },
    { char: "缶", hanViet: "PHẪU", strokes: 6, onyomi: ["カン"], kunyomi: [], meaning: "Lon, đồ hộp", examples: [{ word: "空き缶", reading: "あきかん", meaning: "Lon rỗng" }, { word: "缶詰", reading: "かんづめ", meaning: "Đồ hộp" }] }
  ],
  5: [
    { char: "杯", hanViet: "BÔI", strokes: 8, onyomi: ["ハイ"], kunyomi: ["さかずき"], meaning: "Cốc, ly", examples: [{ word: "杯", reading: "さかずき", meaning: "Chén rượu" }, { word: "乾杯", reading: "かんぱい", meaning: "Cạn ly" }] },
    { char: "枚", hanViet: "MAI", strokes: 8, onyomi: ["マイ"], kunyomi: [], meaning: "Tờ, tấm", examples: [{ word: "枚数", reading: "まいすう", meaning: "Số tờ" }] },
    { char: "匹", hanViet: "THẤT", strokes: 4, onyomi: ["ヒツ"], kunyomi: ["ひき"], meaning: "Con (động vật nhỏ)", examples: [{ word: "二匹", reading: "にひき", meaning: "Hai con" }] },
    { char: "量", hanViet: "LƯỢNG", strokes: 12, onyomi: ["リョウ"], kunyomi: ["はか-る"], meaning: "Cân, trọng lượng", examples: [{ word: "重量", reading: "じゅうりょう", meaning: "Trọng lượng" }, { word: "分量", reading: "ぶんりょう", meaning: "Liều lượng" }] }
  ],
  6: [
    { char: "頭", hanViet: "ĐẦU", strokes: 16, onyomi: ["トウ", "ズ"], kunyomi: ["あたま", "かしら"], meaning: "Cái đầu", examples: [{ word: "頭", reading: "あたま", meaning: "Đầu" }, { word: "頭痛", reading: "ずつう", meaning: "Đau đầu" }] },
    { char: "顔", hanViet: "NHAN", strokes: 18, onyomi: ["ガン"], kunyomi: ["かお"], meaning: "Khuôn mặt", examples: [{ word: "顔", reading: "かお", meaning: "Khuôn mặt" }, { word: "笑顔", reading: "えがお", meaning: "Nụ cười" }] },
    { char: "首", hanViet: "THỦ", strokes: 9, onyomi: ["シュ"], kunyomi: ["くび"], meaning: "Cổ, sa thải", examples: [{ word: "首", reading: "くび", meaning: "Cổ" }, { word: "首相", reading: "しゅしょう", meaning: "Thủ tướng" }] },
    { char: "鼻", hanViet: "TỊ", strokes: 14, onyomi: ["ビ"], kunyomi: ["はな"], meaning: "Cái mũi", examples: [{ word: "鼻", reading: "はな", meaning: "Mũi" }, { word: "鼻水", reading: "はなみず", meaning: "Nước mũi" }] }
  ],
  7: [
    { char: "呼", hanViet: "HÔ", strokes: 8, onyomi: ["コ"], kunyomi: ["よ-ぶ"], meaning: "Gọi, thở", examples: [{ word: "呼ぶ", reading: "よぶ", meaning: "Gọi" }, { word: "呼吸", reading: "こきゅう", meaning: "Hô hấp" }] },
    { char: "吸", hanViet: "HẤP", strokes: 6, onyomi: ["キュウ"], kunyomi: ["す-う"], meaning: "Hút, hít", examples: [{ word: "吸う", reading: "すう", meaning: "Hút" }, { word: "深呼吸", reading: "しんこきゅう", meaning: "Hít thở sâu" }] },
    { char: "息", hanViet: "TỨC", strokes: 10, onyomi: ["ソク"], kunyomi: ["いき"], meaning: "Hơi thở, con trai", examples: [{ word: "息", reading: "いき", meaning: "Hơi thở" }, { word: "息子", reading: "むすこ", meaning: "Con trai" }] },
    { char: "汗", hanViet: "HÃN", strokes: 6, onyomi: ["カン"], kunyomi: ["あせ"], meaning: "Mồ hôi", examples: [{ word: "汗", reading: "あせ", meaning: "Mồ hôi" }, { word: "冷や汗", reading: "ひやあせ", meaning: "Mồ hôi lạnh" }] }
  ],
  8: [
    { char: "検", hanViet: "KIỂM", strokes: 12, onyomi: ["ケン"], kunyomi: [], meaning: "Kiểm tra", examples: [{ word: "検査", reading: "けんさ", meaning: "Xét nghiệm" }, { word: "点検", reading: "てんけん", meaning: "Kiểm tra" }] },
    { char: "査", hanViet: "TRA", strokes: 9, onyomi: ["サ"], kunyomi: [], meaning: "Điều tra, visa", examples: [{ word: "調査", reading: "ちょうさ", meaning: "Khảo sát" }, { word: "査証", reading: "さしょう", meaning: "Thị thực" }] },
    { char: "歯", hanViet: "XỈ", strokes: 12, onyomi: ["シ"], kunyomi: ["は"], meaning: "Cái răng", examples: [{ word: "歯", reading: "は", meaning: "Răng" }, { word: "虫歯", reading: "むしば", meaning: "Răng sâu" }] },
    { char: "痛", hanViet: "THỐNG", strokes: 12, onyomi: ["ツウ"], kunyomi: ["いた-む", "いた-い"], meaning: "Đau nhức", examples: [{ word: "痛い", reading: "いたい", meaning: "Đau" }, { word: "激痛", reading: "げきつう", meaning: "Đau dữ dội" }] }
  ],
  9: [
    { char: "血", hanViet: "HUYẾT", strokes: 6, onyomi: ["ケツ"], kunyomi: ["ち"], meaning: "Máu", examples: [{ word: "血", reading: "ち", meaning: "Máu" }, { word: "血管", reading: "けっかん", meaning: "Mạch máu" }] },
    { char: "液", hanViet: "DỊCH", strokes: 11, onyomi: ["エキ"], kunyomi: [], meaning: "Chất lỏng", examples: [{ word: "液体", reading: "えきたい", meaning: "Chất lỏng" }, { word: "血液型", reading: "けつえきがた", meaning: "Nhóm máu" }] },
    { char: "包", hanViet: "BAO", strokes: 5, onyomi: ["ホウ"], kunyomi: ["つつ-む"], meaning: "Bọc, gói", examples: [{ word: "包む", reading: "つつむ", meaning: "Bọc" }, { word: "包帯", reading: "ほうたい", meaning: "Băng gạc" }] },
    { char: "帯", hanViet: "ĐỚI", strokes: 10, onyomi: ["タイ"], kunyomi: ["お-びる", "おび"], meaning: "Đai lưng, mang", examples: [{ word: "帯", reading: "おび", meaning: "Thắt lưng Kimono" }, { word: "携帯", reading: "けいたい", meaning: "Điện thoại di động" }] }
  ],
  10: [
    { char: "救", hanViet: "CỨU", strokes: 11, onyomi: ["キュウ"], kunyomi: ["すく-う"], meaning: "Cứu sống", examples: [{ word: "救う", reading: "すくう", meaning: "Cứu" }, { word: "救急車", reading: "きゅうきゅうしゃ", meaning: "Xe cứu thương" }] },
    { char: "助", hanViet: "TRỢ", strokes: 7, onyomi: ["ジョ"], kunyomi: ["たす-かる", "たす-ける"], meaning: "Giúp đỡ", examples: [{ word: "助ける", reading: "たすける", meaning: "Giúp đỡ" }, { word: "助言", reading: "じょげん", meaning: "Lời khuyên" }] },
    { char: "死", hanViet: "TỬ", strokes: 6, onyomi: ["シ"], kunyomi: ["し-ぬ"], meaning: "Chết", examples: [{ word: "死ぬ", reading: "しぬ", meaning: "Chết" }, { word: "死亡者", reading: "しぼうしゃ", meaning: "Người tử vong" }] },
    { char: "亡", hanViet: "VONG", strokes: 3, onyomi: ["ボウ", "モウ"], kunyomi: ["な-い"], meaning: "Qua đời, vong", examples: [{ word: "亡くなる", reading: "なくなる", meaning: "Qua đời" }, { word: "亡命", reading: "ぼうめい", meaning: "Tị nạn chính trị" }] }
  ],
  11: [
    { char: "戦", hanViet: "CHIẾN", strokes: 13, onyomi: ["セン"], kunyomi: ["たたか-う"], meaning: "Chiến đấu", examples: [{ word: "戦う", reading: "たたかう", meaning: "Thi đấu" }, { word: "作戦", reading: "さくせん", meaning: "Chiến thuật" }] },
    { char: "決", hanViet: "QUYẾT", strokes: 7, onyomi: ["ケツ"], kunyomi: ["き-まる", "き-める"], meaning: "Quyết định", examples: [{ word: "決める", reading: "きめる", meaning: "Quyết định" }, { word: "決意", reading: "けつい", meaning: "Quyết ý" }] },
    { char: "勝", hanViet: "THẮNG", strokes: 12, onyomi: ["ショウ"], kunyomi: ["か-つ", "まさ-る"], meaning: "Chiến thắng", examples: [{ word: "勝つ", reading: "かつ", meaning: "Thắng" }, { word: "優勝", reading: "ゆうしょう", meaning: "Vô địch" }] },
    { char: "負", hanViet: "PHỤ", strokes: 9, onyomi: ["フ"], kunyomi: ["ま-ける", "ま-かす"], meaning: "Thua, gánh vác", examples: [{ word: "負ける", reading: "まける", meaning: "Thua" }, { word: "負担", reading: "ふたん", meaning: "Gánh vác" }] }
  ],
  12: [
    { char: "代", hanViet: "ĐẠI", strokes: 5, onyomi: ["ダイ", "タイ"], kunyomi: ["かわ-る", "か-える", "よ", "しろ"], meaning: "Thay thế, đại diện", examples: [{ word: "代わる", reading: "かわる", meaning: "Thay mặt" }, { word: "代える", reading: "かえる", meaning: "Thay thế" }, { word: "代表", reading: "だいひょう", meaning: "Đại biểu" }] },
    { char: "表", hanViet: "BIỂU", strokes: 8, onyomi: ["ヒョウ"], kunyomi: ["あらわ-れる", "おもて"], meaning: "Bảng biểu, bộc lộ", examples: [{ word: "表", reading: "ひょう", meaning: "Bảng biểu" }, { word: "表示", reading: "ひょうじ", meaning: "Hiển thị" }] },
    { char: "第", hanViet: "ĐỆ", strokes: 11, onyomi: ["ダイ"], kunyomi: [], meaning: "Số thứ tự", examples: [{ word: "第一回", reading: "だいいっかい", meaning: "Lần đầu" }] },
    { char: "回", hanViet: "HỒI", strokes: 6, onyomi: ["カイ"], kunyomi: ["まわ-る", "まわ-す"], meaning: "Lần, xoay", examples: [{ word: "回る", reading: "まわる", meaning: "Xoay quanh" }, { word: "回数券", reading: "かいすうけん", meaning: "Vé lượt" }] }
  ],
  13: [
    { char: "記", hanViet: "KÝ", strokes: 10, onyomi: ["キ"], kunyomi: ["しる-す"], meaning: "Ghi chép", examples: [{ word: "記す", reading: "しるす", meaning: "Ghi chép" }, { word: "暗記", reading: "あんき", meaning: "Học thuộc" }] },
    { char: "録", hanViet: "LỤC", strokes: 16, onyomi: ["ロク"], kunyomi: [], meaning: "Đăng ký, kỷ lục", examples: [{ word: "登録", reading: "とうろく", meaning: "Đăng ký" }, { word: "新記録", reading: "しんきろく", meaning: "Kỷ kỷ lục" }] },
    { char: "優", hanViet: "ƯU", strokes: 17, onyomi: ["ユウ"], kunyomi: ["すぐ-れる", "やさ-しい"], meaning: "Ưu tú, dịu dàng", examples: [{ word: "優れる", reading: "すぐれる", meaning: "Xuất sắc" }, { word: "優しい", reading: "やさしい", meaning: "Dịu dàng" }] },
    { char: "賞", hanViet: "THƯỞNG", strokes: 15, onyomi: ["ショウ"], kunyomi: [], meaning: "Giải thưởng", examples: [{ word: "賞状", reading: "しょうじょう", meaning: "Bằng khen" }, { word: "賞金", reading: "しょうきん", meaning: "Tiền thưởng" }] }
  ],
  14: [
    { char: "秒", hanViet: "BÀO", strokes: 9, onyomi: ["ビョウ"], kunyomi: [], meaning: "Giây", examples: [{ word: "秒読み", reading: "びょうよみ", meaning: "Đếm ngược" }, { word: "毎秒", reading: "まいびょう", meaning: "Mỗi giây" }] },
    { char: "差", hanViet: "SAI", strokes: 10, onyomi: ["サ"], kunyomi: ["さ-す"], meaning: "Chênh lệch", examples: [{ word: "差", reading: "さ", meaning: "Khoảng cách" }, { word: "時差", reading: "じさ", meaning: "Chênh lệch múi giờ" }] },
    { char: "測", hanViet: "TRẮC", strokes: 12, onyomi: ["ソク"], kunyomi: ["はか-る"], meaning: "Đo đạc", examples: [{ word: "予測", reading: "よそく", meaning: "Dự đoán" }, { word: "測定", reading: "そくてい", meaning: "Đo đạc" }] },
    { char: "順", hanViet: "THUẬN", strokes: 12, onyomi: ["ジュン"], kunyomi: [], meaning: "Thứ tự", examples: [{ word: "順序", reading: "じゅんじょ", meaning: "Trình tự" }, { word: "順番", reading: "じゅんばん", meaning: "Lượt" }] }
  ],
  15: [
    { char: "球", hanViet: "CẦU", strokes: 11, onyomi: ["キュウ"], kunyomi: ["たま"], meaning: "Quả bóng", examples: [{ word: "球", reading: "たま", meaning: "Quả bóng" }, { word: "野球部", reading: "やきゅうぶ", meaning: "CLB bóng chày" }, { word: "地球儀", reading: "ちきゅうぎ", meaning: "Quả địa cầu" }] },
    { char: "打", hanViet: "ĐẢ", strokes: 5, onyomi: ["ダ"], kunyomi: ["う-つ"], meaning: "Đánh, đập", examples: [{ word: "打つ", reading: "うつ", meaning: "Đánh bóng" }, { word: "打球", reading: "だきゅう", meaning: "Cú đánh" }] },
    { char: "投", hanViet: "ĐẦU", strokes: 7, onyomi: ["トウ"], kunyomi: ["な-げる"], meaning: "Ném", examples: [{ word: "投げる", reading: "なげる", meaning: "Ném" }, { word: "投手", reading: "とうしゅ", meaning: "Pitcher" }] },
    { char: "点", hanViet: "ĐIỂM", strokes: 9, onyomi: ["テン"], kunyomi: [], meaning: "Điểm số", examples: [{ word: "満点", reading: "まんてん", meaning: "Điểm tối đa" }, { word: "点数", reading: "てんすう", meaning: "Điểm số" }] }
  ],
  16: [
    { char: "感", hanViet: "CẢM", strokes: 13, onyomi: ["カン"], kunyomi: [], meaning: "Cảm xúc, cảm động, nhận xét", examples: [{ word: "感情的", reading: "かんじょうてき", meaning: "Cảm xúc" }, { word: "安心感", reading: "あんしんかん", meaning: "An tâm" }, { word: "感動", reading: "かんどう", meaning: "Cảm động" }] },
    { char: "情", hanViet: "TÌNH", strokes: 11, onyomi: ["ジョウ", "セイ"], kunyomi: ["なさ-け"], meaning: "Tình cảm, nhân ái, phong vị", examples: [{ word: "情け深い", reading: "なさけぶかい", meaning: "Nhân ái" }, { word: "風情", reading: "ふじょう", meaning: "Phong vị" }, { word: "友情", reading: "ゆうじょう", meaning: "Tình bạn" }] },
    { char: "恋", hanViet: "LUYẾN", strokes: 10, onyomi: ["レン"], kunyomi: ["こ-う", "こい-しい", "こい"], meaning: "Tình yêu, thương nhớ, người yêu", examples: [{ word: "恋しい", reading: "こいしい", meaning: "Thương nhớ" }, { word: "恋人", reading: "こいびと", meaning: "Người yêu" }] },
    { char: "愛", hanViet: "ÁI", strokes: 13, onyomi: ["アイ"], kunyomi: [], meaning: "Yêu thương, thích dùng", examples: [{ word: "愛用", reading: "あいよう", meaning: "Thích dùng" }, { word: "愛情", reading: "あいじょう", meaning: "Tình yêu thương" }] }
  ],
  17: [
    { char: "信", hanViet: "TÍN", strokes: 9, onyomi: ["シン"], kunyomi: [], meaning: "Tin tưởng, tự tin, tín hiệu", examples: [{ word: "信頼", reading: "しんらい", meaning: "Tin cậy" }, { word: "信号", reading: "しんごう", meaning: "Tín hiệu" }, { word: "自信", reading: "じしん", meaning: "Tự tin" }] },
    { char: "想", hanViet: "TƯỞNG", strokes: 13, onyomi: ["ソウ", "ソ"], kunyomi: [], meaning: "Tưởng tượng, lý tưởng, mơ mộng", examples: [{ word: "空想", reading: "くうそう", meaning: "Tưởng tượng" }, { word: "理想", reading: "りそう", meaning: "Lý tưởng" }] },
    { char: "伝", hanViet: "TRUYỀN", strokes: 6, onyomi: ["デン"], kunyomi: ["つた-わる", "つた-える", "つた-う"], meaning: "Truyền đạt, truyền thống, nhắn lại", examples: [{ word: "伝える", reading: "つたえる", meaning: "Truyền đạt" }, { word: "伝説", reading: "でんせつ", meaning: "Truyền thuyết" }] },
    { char: "欲", hanViet: "DỤC", strokes: 11, onyomi: ["ヨク"], kunyomi: ["ほっ-する", "ほ-しい"], meaning: "Ham muốn, ước muốn, thèm ăn", examples: [{ word: "欲する", reading: "ほっする", meaning: "Mong muốn" }, { word: "食欲", reading: "しょくよく", meaning: "Thèm ăn" }] }
  ],
  18: [
    { char: "苦", hanViet: "KHỔ", strokes: 8, onyomi: ["ク"], kunyomi: ["くる-しむ", "くる-しい", "にが-い", "にが-る"], meaning: "Đau khổ, đắng, vất vả, phàn nàn", examples: [{ word: "苦しむ", reading: "くるしむ", meaning: "Đau đớn" }, { word: "苦痛", reading: "くつう", meaning: "Nỗi đau" }, { word: "苦しい", reading: "くるしい", meaning: "Vất vả, khó thở" }] },
    { char: "悩", hanViet: "NÃO", strokes: 10, onyomi: ["ノウ"], kunyomi: ["なや-む", "なや-ます"], meaning: "Trăn trở, băn khoăn, đau đầu", examples: [{ word: "悩む", reading: "なやむ", meaning: "Băn khoăn" }, { word: "頭痛に悩まされる", reading: "ずつうになやまされる", meaning: "Bị đau đầu hành hạ" }] },
    { char: "困", hanViet: "KHỐN", strokes: 7, onyomi: ["コン"], kunyomi: ["こま-る"], meaning: "Khó khăn, rắc rối", examples: [{ word: "困る", reading: "こまる", meaning: "Gặp rắc rối" }, { word: "困難", reading: "こんなん", meaning: "Khó khăn" }] },
    { char: "難", hanViet: "NAN", strokes: 18, onyomi: ["ナン"], kunyomi: ["むずか-しい", "かた-い"], meaning: "Khó, bài toán hóc húa", examples: [{ word: "難い", reading: "かたい", meaning: "Khó chịu đựng" }, { word: "難問", reading: "なんもん", meaning: "Bài toán khó" }] }
  ],
  19: [
    { char: "怒", hanViet: "NỘ", strokes: 9, onyomi: ["ド"], kunyomi: ["いか-る", "おこ-る"], meaning: "Tức giận, phẫn nộ", examples: [{ word: "怒る", reading: "おこる", meaning: "Tức giận" }, { word: "激怒する", reading: "げきどする", meaning: "Tức giận đùng đùng" }] },
    { char: "悲", hanViet: "BI", strokes: 12, onyomi: ["ヒ"], kunyomi: ["かな-しむ", "かな-しい"], meaning: "Đau buồn, bi kịch, bi quan", examples: [{ word: "悲しい", reading: "かなしい", meaning: "Đau buồn" }, { word: "悲劇", reading: "ひげき", meaning: "Bi kịch" }] },
    { char: "笑", hanViet: "TIẾU", strokes: 10, onyomi: ["ショウ"], kunyomi: ["わら-う", "え-む"], meaning: "Cười, mỉm cười, nụ cười", examples: [{ word: "笑う", reading: "わらう", meaning: "Cười" }, { word: "爆笑する", reading: "ばくしょうする", meaning: "Cười nổ tung" }, { word: "笑顔", reading: "えがお", meaning: "Nụ cười" }] },
    { char: "喜", hanViet: "HỶ", strokes: 12, onyomi: ["キ"], kunyomi: ["よろこ-ぶ"], meaning: "Vui mừng, hỷ nộ ái ố", examples: [{ word: "喜ぶ", reading: "よろこぶ", meaning: "Vui mừng" }, { word: "喜怒哀楽", reading: "きどあいらく", meaning: "Hỷ nộ ái ố" }] }
  ],
  20: [
    { char: "残", hanViet: "TÀN", strokes: 10, onyomi: ["ザン"], kunyomi: ["のこ-る", "のこ-す"], meaning: "Còn lại, đọng lại, tuyết đọng", examples: [{ word: "残す", reading: "のこす", meaning: "Để thừa lại" }, { word: "残雪", reading: "ざんせつ", meaning: "Vết tuyết đọng" }] },
    { char: "念", hanViet: "NIỆM", strokes: 8, onyomi: ["ネン"], kunyomi: [], meaning: "Chuyên tâm, nguyện vọng, cẩn thận, đáng tiếc", examples: [{ word: "専念する", reading: "せんねんする", meaning: "Chuyên tâm" }, { word: "念願", reading: "ねんがん", meaning: "Nguyện vọng" }, { word: "念のため", reading: "ねんのため", meaning: "Cho cẩn thận" }, { word: "残念", reading: "ざんねん", meaning: "Đáng tiếc" }] },
    { char: "泣", hanViet: "KHẤP", strokes: 8, onyomi: ["キュウ"], kunyomi: ["な-く"], meaning: "Khóc, khóc nức nở, mít ướt", examples: [{ word: "泣く", reading: "なく", meaning: "Khóc" }, { word: "号泣する", reading: "ごうきゅうする", meaning: "Khóc nức nở" }] },
    { char: "涙", hanViet: "LỆ", strokes: 10, onyomi: ["ルイ"], kunyomi: ["なみだ"], meaning: "Nước mắt, giọng nghẹn ngào", examples: [{ word: "涙", reading: "なみだ", meaning: "Nước mắt" }, { word: "涙声", reading: "なみだごえ", meaning: "Giọng nghẹn ngào" }] }
  ],
  21: [
    { char: "結", hanViet: "KẾT", strokes: 12, onyomi: ["ケツ"], kunyomi: ["むす-ぶ", "ゆ-う", "ゆ-わえる"], meaning: "Buộc, thắt, kết nối, kết quả", examples: [{ word: "結ぶ", reading: "むすぶ", meaning: "Buộc, cột" }, { word: "結婚", reading: "けっこん", meaning: "Kết hôn" }, { word: "結果", reading: "けっか", meaning: "Kết quả" }] },
    { char: "婚", hanViet: "HÔN", strokes: 11, onyomi: ["コン"], kunyomi: [], meaning: "Kết hôn, cưới hỏi", examples: [{ word: "結婚", reading: "けっこん", meaning: "Kết hôn" }, { word: "婚約", reading: "こんやく", meaning: "Hứa hôn" }] },
    { char: "紹", hanViet: "THIỆU", strokes: 11, onyomi: ["ショウ"], kunyomi: [], meaning: "Giới thiệu, kế thừa", examples: [{ word: "紹介", reading: "しょうかい", meaning: "Giới thiệu" }, { word: "自己紹介", reading: "じこしょうかい", meaning: "Tự giới thiệu" }] },
    { char: "介", hanViet: "GIỚI", strokes: 4, onyomi: ["カイ"], kunyomi: [], meaning: "Môi giới, chen vào, giới thiệu", examples: [{ word: "紹介", reading: "しょうかい", meaning: "Giới thiệu" }, { word: "仲介", reading: "ちゅうかい", meaning: "Môi giới" }] }
  ],
  22: [
    { char: "独", hanViet: "ĐỘC", strokes: 9, onyomi: ["ドク"], kunyomi: ["ひと-り"], meaning: "Độc thân, một mình, độc lập", examples: [{ word: "独身", reading: "どくしん", meaning: "Độc thân" }, { word: "独立", reading: "どくりつ", meaning: "Độc lập" }, { word: "独り言", reading: "ひとりごと", meaning: "Nói một mình" }] },
    { char: "身", hanViet: "THÂN", strokes: 7, onyomi: ["シン"], kunyomi: ["み"], meaning: "Thân thể, bản thân, thân phận", examples: [{ word: "身長", reading: "しんちょう", meaning: "Chiều cao" }, { word: "身近", reading: "みぢか", meaning: "Thân cận" }, { word: "出身", reading: "しゅっしん", meaning: "Xuất thân" }] },
    { char: "貯", hanViet: "TRỮ", strokes: 12, onyomi: ["チョ"], kunyomi: [], meaning: "Tích trữ, tiết kiệm tiền", examples: [{ word: "貯金", reading: "ちょきん", meaning: "Tiết kiệm tiền" }, { word: "貯蔵", reading: "ちょぞう", meaning: "Bảo quản" }] },
    { char: "期", hanViet: "KỲ", strokes: 12, onyomi: ["キ", "ゴ"], kunyomi: [], meaning: "Kỳ hạn, thời kỳ, mong chờ", examples: [{ word: "期末", reading: "きまつ", meaning: "Cuối kỳ" }, { word: "期待", reading: "きたい", meaning: "Kỳ vọng" }, { word: "最期", reading: "さいご", meaning: "Lâm chung" }] }
  ],
  23: [
    { char: "約", hanViet: "ƯỚC", strokes: 9, onyomi: ["ヤク"], kunyomi: [], meaning: "Lời hứa, đặt trước, khoảng", examples: [{ word: "予約", reading: "よやく", meaning: "Đặt trước" }, { word: "約束", reading: "やくそく", meaning: "Lời hứa" }, { word: "約", reading: "やく", meaning: "Khoảng" }] },
    { char: "束", hanViet: "THÚC", strokes: 7, onyomi: ["ソク"], kunyomi: ["たば"], meaning: "Bó, buộc, ràng buộc", examples: [{ word: "花束", reading: "はなたば", meaning: "Bó hoa" }, { word: "束", reading: "たば", meaning: "Bó, xấp" }, { word: "結束", reading: "けっそく", meaning: "Đoàn kết" }] },
    { char: "必", hanViet: "TẤT", strokes: 5, onyomi: ["ヒツ"], kunyomi: ["かなら-ず"], meaning: "Tất nhiên, nhất định, quyết tâm", examples: [{ word: "必ず", reading: "かならず", meaning: "Nhất định" }, { word: "必勝", reading: "ひっしょう", meaning: "Quyết thắng" }, { word: "必死", reading: "ひっし", meaning: "Liều mạng" }] },
    { char: "守", hanViet: "THỦ", strokes: 6, onyomi: ["シュ", "ス"], kunyomi: ["まも-る", "もり"], meaning: "Bảo vệ, giữ lời hứa, trông nom", examples: [{ word: "守る", reading: "まもる", meaning: "Giữ, bảo vệ" }, { word: "子守歌", reading: "こもりうた", meaning: "Bài hát ru" }, { word: "留守", reading: "るす", meaning: "Vắng nhà" }] }
  ],
  24: [
    { char: "式", hanViet: "THỨC", strokes: 6, onyomi: ["シキ"], kunyomi: [], meaning: "Lễ nghi, công thức, hình thức", examples: [{ word: "結婚式", reading: "けっこんしき", meaning: "Lễ kết hôn" }, { word: "正式", reading: "せいしき", meaning: "Chính thức" }, { word: "書式", reading: "しょしき", meaning: "Định dạng mẫu" }] },
    { char: "列", hanViet: "LIỆT", strokes: 6, onyomi: ["レツ"], kunyomi: [], meaning: "Hàng lối, dãy, quần đảo", examples: [{ word: "行列", reading: "ぎょうれつ", meaning: "Hàng người" }, { word: "列島", reading: "れっとう", meaning: "Quần đảo" }, { word: "急行列車", reading: "きゅうこうれっしゃ", meaning: "Tàu tốc hành" }] },
    { char: "祝", hanViet: "CHÚC", strokes: 9, onyomi: ["シュク", "シュウ"], kunyomi: ["いわ-う"], meaning: "Chúc mừng, cầu chúc, ngày lễ", examples: [{ word: "祝う", reading: "いわう", meaning: "Chúc mừng" }, { word: "祝日", reading: "しゅくじつ", meaning: "Ngày lễ" }, { word: "ご祝儀", reading: "ごしゅうぎ", meaning: "Tiền mừng" }] },
    { char: "酔", hanViet: "TÚY", strokes: 11, onyomi: ["スイ"], kunyomi: ["よ-う"], meaning: "Say rượu, say xe", examples: [{ word: "酔う", reading: "よう", meaning: "Say" }, { word: "二日酔い", reading: "ふつかよい", meaning: "Say rượu sang ngày thứ hai" }, { word: "泥酔", reading: "でいすい", meaning: "Say khướt" }] }
  ],
  25: [
    { char: "永", hanViet: "VĨNH", strokes: 5, onyomi: ["エイ"], kunyomi: ["なが-い"], meaning: "Vĩnh cửu, lâu dài", examples: [{ word: "永遠", reading: "えいえん", meaning: "Vĩnh cửu" }, { word: "永住", reading: "えいじゅう", meaning: "Vĩnh trú" }, { word: "末永く", reading: "すえながく", meaning: "Mãi mãi về sau" }] },
    { char: "願", hanViet: "NGUYỆN", strokes: 19, onyomi: ["ガン"], kunyomi: ["ねが-う"], meaning: "Cầu nguyện, đơn từ, ước muốn", examples: [{ word: "願う", reading: "ねがう", meaning: "Cầu mong" }, { word: "願書", reading: "がんしょ", meaning: "Đơn xin" }, { word: "願い", reading: "ねがい", meaning: "Điều ước" }] },
    { char: "幸", hanViet: "HẠNH", strokes: 8, onyomi: ["コウ"], kunyomi: ["さいわ-い", "さち", "しあわ-せ"], meaning: "Hạnh phúc, may mắn, sản vật", examples: [{ word: "幸せ", reading: "しあわせ", meaning: "Hạnh phúc" }, { word: "幸い", reading: "さいわい", meaning: "May mắn thay" }, { word: "幸運", reading: "こううん", meaning: "Vận may" }] },
    { char: "福", hanViet: "PHÚC", strokes: 13, onyomi: ["フク"], kunyomi: [], meaning: "Phúc lành, may mắn, phúc lợi", examples: [{ word: "福", reading: "ふく", meaning: "Phúc lành" }, { word: "幸福", reading: "こうふく", meaning: "Hạnh phúc" }, { word: "祝福", reading: "しゅくふく", meaning: "Chúc phúc" }] }
  ],
  26: [
    { char: "関", hanViet: "QUAN", strokes: 14, onyomi: ["カン"], kunyomi: ["せき", "かか-わる"], meaning: "Liên quan, cửa ải, trạm gác", examples: [{ word: "関わる", reading: "かかわる", meaning: "Liên quan" }, { word: "関所", reading: "せきしょ", meaning: "Trạm gác" }, { word: "玄関", reading: "げんかん", meaning: "Lối vào" }] },
    { char: "係", hanViet: "HỆ", strokes: 9, onyomi: ["ケイ"], kunyomi: ["かか-る", "かかり"], meaning: "Phụ trách, mối quan hệ, nhân viên", examples: [{ word: "係員", reading: "かかりいん", meaning: "Nhân viên phụ trách" }, { word: "関係者", reading: "かんけいしゃ", meaning: "Người có liên quan" }] },
    { char: "和", hanViet: "HÒA", strokes: 8, onyomi: ["ワ", "オ"], kunyomi: ["やわ-らぐ", "やわ-らげる", "なご-む", "なご-やか"], meaning: "Hòa nhã, dịu dàng, kiểu Nhật", examples: [{ word: "和らぐ", reading: "やわらぐ", meaning: "Dịu đi" }, { word: "和む", reading: "なごむ", meaning: "Thư thái" }, { word: "和食", reading: "わしょく", meaning: "Món ăn Nhật" }] },
    { char: "付", hanViet: "PHÓ", strokes: 5, onyomi: ["フ"], kunyomi: ["つ-く", "つ-ける"], meaning: "Dính, gắn, kèm theo", examples: [{ word: "付く", reading: "つく", meaning: "Dính vào" }, { word: "付近", reading: "ふきん", meaning: "Vùng lân cận" }, { word: "片付ける", reading: "かたづける", meaning: "Dọn dẹp" }] }
  ],
  27: [
    { char: "娘", hanViet: "NƯƠNG", strokes: 10, onyomi: [], kunyomi: ["むすめ"], meaning: "Con gái, cành vàng lá ngọc", examples: [{ word: "娘", reading: "むすめ", meaning: "Con gái" }, { word: "箱入り娘", reading: "はこいりむすめ", meaning: "Cành vàng lá ngọc" }] },
    { char: "老", hanViet: "LÃO", strokes: 6, onyomi: ["ロウ"], kunyomi: ["お-いる", "ふ-ける"], meaning: "Già, người già, về hưu", examples: [{ word: "老いる", reading: "おいる", meaning: "Già đi" }, { word: "老ける", reading: "ふける", meaning: "Trông già dặn" }, { word: "老後", reading: "ろうご", meaning: "Tuổi già" }] },
    { char: "婦", hanViet: "PHỤ", strokes: 11, onyomi: ["フ"], kunyomi: [], meaning: "Phụ nữ, quý bà, vợ chồng", examples: [{ word: "夫婦", reading: "ふうふ", meaning: "Vợ chồng" }, { word: "婦人", reading: "ふじん", meaning: "Quý bà" }, { word: "専業主婦", reading: "せんぎょうしゅふ", meaning: "Nội trợ" }] },
    { char: "姓", hanViet: "TÍNH", strokes: 8, onyomi: ["セイ", "ショウ"], kunyomi: [], meaning: "Họ tên, dòng họ", examples: [{ word: "姓", reading: "せい", meaning: "Họ" }, { word: "同姓同名", reading: "どうせいどうめい", meaning: "Cùng họ cùng tên" }] }
  ],
  28: [
    { char: "仲", hanViet: "TRỌNG", strokes: 6, onyomi: ["チュウ"], kunyomi: ["なか"], meaning: "Mối quan hệ, hòa giải, trung gian", examples: [{ word: "仲良し", reading: "なかよし", meaning: "Bạn thân" }, { word: "仲が良い", reading: "なかがいい", meaning: "Thân thiết" }, { word: "仲間", reading: "なかま", meaning: "Bạn bè" }] },
    { char: "君", hanViet: "QUÂN", strokes: 7, onyomi: ["クン"], kunyomi: ["きみ"], meaning: "Cậu, bạn, xưng hô", examples: [{ word: "君", reading: "きみ", meaning: "Cậu" }, { word: "田中君", reading: "たなかくん", meaning: "Cậu Tanaka" }] },
    { char: "彼", hanViet: "BỈ", strokes: 8, onyomi: ["ヒ"], kunyomi: ["かれ", "かの"], meaning: "Anh ấy, cô ấy, bạn trai/gái", examples: [{ word: "彼", reading: "かれ", meaning: "Anh ấy" }, { word: "彼女", reading: "かのじょ", meaning: "Cô ấy" }, { word: "彼氏", reading: "かれし", meaning: "Bạn trai" }] },
    { char: "他", hanViet: "THA", strokes: 5, onyomi: ["タ"], kunyomi: ["ほか"], meaning: "Khác, người ngoài, nước khác", examples: [{ word: "他", reading: "ほか", meaning: "Khác" }, { word: "他人", reading: "たにん", meaning: "Người ngoài" }, { word: "他国", reading: "たこく", meaning: "Nước khác" }] }
  ],
  29: [
    { char: "初", hanViet: "SƠ", strokes: 7, onyomi: ["ショ"], kunyomi: ["そ-める", "はじ-め", "はじ-めて", "はつ", "うい"], meaning: "Ban đầu, lần đầu, tuyết đầu mùa", examples: [{ word: "初め", reading: "はじめ", meaning: "Lúc đầu" }, { word: "初めて", reading: "はじめて", meaning: "Lần đầu" }, { word: "初日", reading: "しょにち", meaning: "Ngày đầu" }] },
    { char: "再", hanViet: "TÁI", strokes: 6, onyomi: ["サイ", "サ"], kunyomi: ["ふたた-び"], meaning: "Lại, tái ngộ, thi lại", examples: [{ word: "再び", reading: "ふたたび", meaning: "Lại một lần nữa" }, { word: "再試験", reading: "さいしけん", meaning: "Thi lại" }, { word: "再会", reading: "さいかい", meaning: "Tái ngộ" }] },
    { char: "久", hanViet: "CỬU", strokes: 3, onyomi: ["キュウ", "ク"], kunyomi: ["ひさ-しい"], meaning: "Lâu dài, vĩnh cửu, đã lâu", examples: [{ word: "久しく", reading: "ひさしく", meaning: "Đã lâu rồi" }, { word: "永久", reading: "えいきゅう", meaning: "Vĩnh cửu" }, { word: "久しぶり", reading: "ひさしぶり", meaning: "Lâu rồi mới gặp" }] },
    { char: "達", hanViet: "ĐẠT", strokes: 12, onyomi: ["タツ"], kunyomi: [], meaning: "Tiến bộ, thành đạt, chuyển phát", examples: [{ word: "上達", reading: "じょうたつ", meaning: "Tiến bộ" }, { word: "速達", reading: "そくたつ", meaning: "Chuyển phát nhanh" }] }
  ],
  30: [
    { char: "個", hanViet: "CÁ", strokes: 10, onyomi: ["コ"], kunyomi: [], meaning: "Cá nhân, phòng riêng, đếm chiếc", examples: [{ word: "一個", reading: "いっこ", meaning: "Một cái" }, { word: "個室", reading: "こしつ", meaning: "Phòng riêng" }, { word: "個人", reading: "こじん", meaning: "Cá nhân" }] },
    { char: "性", hanViet: "TÍNH", strokes: 8, onyomi: ["セイ", "ショウ"], kunyomi: [], meaning: "Tính cách, cá tính, tính chất, giới tính", examples: [{ word: "個性", reading: "こせい", meaning: "Cá tính" }, { word: "性格", reading: "せいかく", meaning: "Tính cách" }, { word: "女性", reading: "じょせい", meaning: "Nữ giới" }] },
    { char: "各", hanViet: "CÁC", strokes: 6, onyomi: ["カク"], kunyomi: ["おのおの"], meaning: "Mỗi, từng người, các nước", examples: [{ word: "各国", reading: "かっこく", meaning: "Các nước" }, { word: "各自", reading: "かくじ", meaning: "Mỗi người" }, { word: "各々", reading: "おのおの", meaning: "Từng người" }] },
    { char: "格", hanViet: "CÁCH", strokes: 10, onyomi: ["カク", "コウ"], kunyomi: [], meaning: "Tư cách, tính cách, thi đỗ, vóc dáng", examples: [{ word: "格", reading: "かく", meaning: "Tầm vóc" }, { word: "合格", reading: "ごうかく", meaning: "Thi đỗ" }, { word: "失格", reading: "しっかく", meaning: "Bị loại" }] }
  ],
  31: [
    { char: "単", hanViet: "ĐƠN", strokes: 9, onyomi: ["タン"], kunyomi: [], meaning: "Đơn giản, đơn độc, một mình", examples: [{ word: "単独", reading: "たんどく", meaning: "Đơn độc" }, { word: "簡単", reading: "かんたん", meaning: "Đơn giản" }, { word: "単位", reading: "たんい", meaning: "Đơn vị" }] },
    { char: "複", hanViet: "PHỨC", strokes: 14, onyomi: ["フク"], kunyomi: [], meaning: "Phức tạp, lặp lại, nhiều", examples: [{ word: "複数", reading: "ふくすう", meaning: "Số nhiều" }, { word: "複雑", reading: "ふくざつ", meaning: "Phức tạp" }, { word: "重複", reading: "ちょうふく", meaning: "Trùng lặp" }] },
    { char: "全", hanViet: "TOÀN", strokes: 6, onyomi: ["ゼン"], kunyomi: ["まった-く", "すべ-て"], meaning: "Toàn bộ, tất cả, an toàn", examples: [{ word: "全く", reading: "まったく", meaning: "Hoàn toàn" }, { word: "全て", reading: "すべて", meaning: "Tất cả" }, { word: "安全", reading: "あんぜん", meaning: "An toàn" }, { word: "完全", reading: "かんぜん", meaning: "Hoàn toàn" }] },
    { char: "以", hanViet: "DĨ", strokes: 5, onyomi: ["イ"], kunyomi: [], meaning: "Mốc thời gian/địa điểm, so sánh", examples: [{ word: "以後", reading: "いご", meaning: "Từ sau khi" }, { word: "以下", reading: "いか", meaning: "Trở xuống" }, { word: "以上", reading: "いじょう", meaning: "Trở lên" }, { word: "以内", reading: "いない", meaning: "Trong vòng" }] }
  ],
  32: [
    { char: "未", hanViet: "VỊ", strokes: 5, onyomi: ["ミ"], kunyomi: [], meaning: "Chưa, chưa từng, chưa đến", examples: [{ word: "未来", reading: "みらい", meaning: "Tương lai" }, { word: "未満", reading: "みまん", meaning: "Chưa đầy" }, { word: "未定", reading: "みてい", meaning: "Chưa định" }, { word: "未成年", reading: "みせいねん", meaning: "Vị thành niên" }] },
    { char: "満", hanViet: "MÃN", strokes: 12, onyomi: ["マン"], kunyomi: ["み-ちる", "み-たす"], meaning: "Tràn đầy, thỏa mãn, làm đầy", examples: [{ word: "満ちる", reading: "みちる", meaning: "Tràn ngập" }, { word: "満たす", reading: "みたす", meaning: "Lấp đầy" }, { word: "満足", reading: "まんぞく", meaning: "Thỏa mãn" }, { word: "充満", reading: "じゅうまん", meaning: "Tràn ngập" }] },
    { char: "無", hanViet: "VÔ", strokes: 12, onyomi: ["ム", "ブ"], kunyomi: ["な-い"], meaning: "Không có, không, vô", examples: [{ word: "無い", reading: "ない", meaning: "Không có" }, { word: "無休", reading: "むきゅう", meaning: "Không nghỉ" }, { word: "無事", reading: "ぶじ", meaning: "Bình an" }, { word: "無口", reading: "むくち", meaning: "Ít nói" }] },
    { char: "非", hanViet: "PHI", strokes: 8, onyomi: ["ヒ"], kunyomi: [], meaning: "Không phải, phi thường, sai trái", examples: [{ word: "非常識", reading: "ひじょうしき", meaning: "Phi thường thức" }, { word: "非難", reading: "ひなん", meaning: "Phê phán" }, { word: "非常口", reading: "ひじょうぐち", meaning: "Cửa thoát hiểm" }] }
  ],
  33: [
    { char: "幼", hanViet: "ẤU", strokes: 5, onyomi: ["ヨウ"], kunyomi: ["おさな-い"], meaning: "Trẻ con, thơ ngây, non nớt", examples: [{ word: "幼い", reading: "おさない", meaning: "Non nớt" }, { word: "幼稚園", reading: "ようちえん", meaning: "Trường mầm non" }] },
    { char: "児", hanViet: "NHI", strokes: 7, onyomi: ["ジ", "ニ"], kunyomi: [], meaning: "Trẻ em, nhi đồng", examples: [{ word: "幼児", reading: "ようじ", meaning: "Trẻ nhỏ" }, { word: "小児科", reading: "しょうにか", meaning: "Khoa nhi" }] },
    { char: "童", hanViet: "ĐỒNG", strokes: 12, onyomi: ["ドウ"], kunyomi: ["わらべ"], meaning: "Trẻ em, đồng dao, nhi đồng", examples: [{ word: "童話", reading: "どうわ", meaning: "Truyện cổ tích" }, { word: "児童", reading: "じどう", meaning: "Nhi đồng" }] },
    { char: "徒", hanViet: "ĐỒ", strokes: 10, onyomi: ["ト"], kunyomi: [], meaning: "Học trò, đi bộ, vô ích", examples: [{ word: "生徒", reading: "せいと", meaning: "Học sinh" }, { word: "徒歩", reading: "とほ", meaning: "Đi bộ" }] }
  ],
  34: [
    { char: "担", hanViet: "ĐẢM", strokes: 8, onyomi: ["タン"], kunyomi: ["かつ-ぐ", "にな-う"], meaning: "Gánh vác, đảm nhận", examples: [{ word: "担当", reading: "たんとう", meaning: "Đảm nhận" }, { word: "負担", reading: "ふたん", meaning: "Gánh nặng" }] },
    { char: "任", hanViet: "NHIỆM", strokes: 6, onyomi: ["ニン"], kunyomi: ["まか-せる", "まか-す"], meaning: "Nhiệm vụ, giao phó, trách nhiệm", examples: [{ word: "任せる", reading: "まかせる", meaning: "Giao phó" }, { word: "担任", reading: "たんにん", meaning: "Chủ nhiệm" }] },
    { char: "師", hanViet: "SƯ", strokes: 10, onyomi: ["シ"], kunyomi: [], meaning: "Thầy giáo, bác sĩ, chuyên môn", examples: [{ word: "医師", reading: "いし", meaning: "Bác sĩ" }, { word: "教師", reading: "きょうし", meaning: "Giáo viên" }] },
    { char: "組", hanViet: "TỔ", strokes: 11, onyomi: ["ソ"], kunyomi: ["く-む", "くみ"], meaning: "Nhóm, tổ, lắp ráp, kết hợp", examples: [{ word: "番組", reading: "ばんぐみ", meaning: "Chương trình" }, { word: "組織", reading: "そしき", meaning: "Tổ chức" }] }
  ],
  35: [
    { char: "机", hanViet: "KỶ", strokes: 6, onyomi: ["キ"], kunyomi: ["つくえ"], meaning: "Bàn học, bàn làm việc", examples: [{ word: "机", reading: "つくえ", meaning: "Bàn" }, { word: "学習机", reading: "がくしゅうづくえ", meaning: "Bàn học tập" }] },
    { char: "座", hanViet: "TÒA", strokes: 10, onyomi: ["ザ"], kunyomi: ["すわ-る"], meaning: "Chỗ ngồi, ngai tòa, ngồi", examples: [{ word: "座る", reading: "すわる", meaning: "Ngồi" }, { word: "正座", reading: "せいざ", meaning: "Ngồi quỳ" }] },
    { char: "板", hanViet: "TRÁC", strokes: 8, onyomi: ["ハン", "バン"], kunyomi: ["いた"], meaning: "Tấm gỗ, bảng, thớt", examples: [{ word: "黒板", reading: "こくばん", meaning: "Bảng đen" }, { word: "板前", reading: "いたまえ", meaning: "Đầu bếp Nhật" }] },
    { char: "筆", hanViet: "BÚT", strokes: 12, onyomi: ["ヒツ"], kunyomi: ["ふで"], meaning: "Bút lông, nét chữ, viết", examples: [{ word: "鉛筆", reading: "えんぴつ", meaning: "Bút chì" }, { word: "万年筆", reading: "まんねんひつ", meaning: "Bút máy" }] }
  ],
  36: [
    { char: "貸", hanViet: "THẢI", strokes: 12, onyomi: ["タイ"], kunyomi: ["か-す"], meaning: "Cho mượn, cho thuê", examples: [{ word: "貸す", reading: "かす", meaning: "Cho mượn" }, { word: "貸し切り", reading: "かしきり", meaning: "Thuê trọn gói" }] },
    { char: "借", hanViet: "TÁ", strokes: 10, onyomi: ["シャク"], kunyomi: ["か-りる"], meaning: "Mượn, vay", examples: [{ word: "借りる", reading: "かりる", meaning: "Mượn" }, { word: "借金", reading: "しゃっきん", meaning: "Tiền nợ" }] },
    { char: "返", hanViet: "PHẢN", strokes: 7, onyomi: ["ヘン"], kunyomi: ["かえ-る", "かえ-す"], meaning: "Trả lại, quay lại, đáp trả", examples: [{ word: "返す", reading: "かえす", meaning: "Trả lại" }, { word: "返事", reading: "へんじ", meaning: "Trả lời" }] },
    { char: "冊", hanViet: "SÁCH", strokes: 5, onyomi: ["サツ", "サク"], kunyomi: [], meaning: "Cuốn sách, quyển, tập", examples: [{ word: "三冊", reading: "さんさつ", meaning: "Ba cuốn" }, { word: "別冊", reading: "べっさつ", meaning: "Phụ bản" }] }
  ],
  37: [
    { char: "具", hanViet: "CỤ", strokes: 8, onyomi: ["グ"], kunyomi: [], meaning: "Dụng cụ, cụ thể, đồ đạc", examples: [{ word: "道具", reading: "どうぐ", meaning: "Dụng cụ" }, { word: "家具", reading: "かぐ", meaning: "Đồ nội thất" }] },
    { char: "箱", hanViet: "TƯƠNG", strokes: 15, onyomi: [], kunyomi: ["はこ"], meaning: "Cái hộp, rương, thùng", examples: [{ word: "箱", reading: "はこ", meaning: "Cái hộp" }, { word: "ゴミ箱", reading: "ごみばこ", meaning: "Thùng rác" }] },
    { char: "棒", hanViet: "BỔNG", strokes: 12, onyomi: ["ボウ"], kunyomi: [], meaning: "Gậy gỗ, gậy iron, làm hỏng", examples: [{ word: "棒", reading: "ぼう", meaning: "Cây gậy" }, { word: "鉄棒", reading: "てつぼう", meaning: "Xà đơn" }] },
    { char: "伸", hanViet: "THÂN", strokes: 7, onyomi: ["シン"], kunyomi: ["の-びる", "の-ばす", "の-べる"], meaning: "Kéo dài, cao lên, duỗi thẳng", examples: [{ word: "伸びる", reading: "のびる", meaning: "Dài ra" }, { word: "伸ばす", reading: "のばす", meaning: "Kéo dài" }] }
  ]
};

export const kanjiMasterN3LessonsCount = kanjiMasterN3Lessons.length;
