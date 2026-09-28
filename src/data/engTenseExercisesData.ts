export type TenseTag =
  | 'Present Simple'
  | 'Present Continuous'
  | 'Present Perfect'
  | 'Present Perfect Continuous'
  | 'Past Simple'
  | 'Past Continuous'
  | 'Past Perfect'
  | 'Past Perfect Continuous'
  | 'Future Simple'
  | 'Future Continuous'
  | 'Future Perfect'
  | 'Future Perfect Continuous'
  | 'Near Future'
  | 'Conditional'
  | 'Wish'
  | 'Reported Speech';

export interface SingleTenseQuestion {
  id: string;
  type: 'fill' | 'mcq';
  tenseTags: TenseTag[];    // Danh sách các thì xuất hiện trong câu
  prompt: string;          // Câu hỏi (không chứa số thứ tự cứng)
  answer: string;          // Đáp án đúng
  answers?: string[];      // Danh sách các đáp án cho câu hỏi có nhiều chỗ trống
  acceptedAnswers?: string[];
  options?: string[];      // Cho câu MCQ (A, B, C, D)
  explanation: string;     // Giải thích chi tiết vì sao chia thì đó
}

export interface ParagraphClozeGap {
  number: number;
  verb: string;
  answer: string;
  acceptedAnswers: string[];
  explanation: string;
}

export interface ParagraphClozeExercise {
  id: string;
  title: string;
  story: string;
  gaps: ParagraphClozeGap[];
}

export const fillInBlankQuestions: SingleTenseQuestion[] = [
  // --- BỘ CÂU ĐIỀN TỪ MỚI 20 CÂU ---
  {
    id: 'fill-x1',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'She __________ (play) tennis every Sunday.',
    answer: 'plays',
    acceptedAnswers: ['plays'],
    explanation: 'Có dấu hiệu "every Sunday" (thói quen lặp lại) ➔ Chia Hiện tại đơn: plays.'
  },
  {
    id: 'fill-x2',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: 'They __________ (visit) their grandparents last week.',
    answer: 'visited',
    acceptedAnswers: ['visited'],
    explanation: 'Có dấu hiệu mốc thời gian "last week" ➔ Chia Quá khứ đơn: visited.'
  },
  {
    id: 'fill-x3',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'I __________ (watch) a movie next weekend.',
    answer: 'will watch',
    acceptedAnswers: ['will watch', 'am going to watch'],
    explanation: 'Có dấu hiệu mốc thời gian "next weekend" ➔ Chia Tương lai đơn: will watch.'
  },
  {
    id: 'fill-x4',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'He __________ (study) Spanish at the moment.',
    answer: 'is studying',
    acceptedAnswers: ['is studying'],
    explanation: 'Có dấu hiệu "at the moment" ➔ Chia Hiện tại tiếp diễn: is studying.'
  },
  {
    id: 'fill-x5',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'We __________ (have) lunch when they arrived.',
    answer: 'were having',
    acceptedAnswers: ['were having'],
    explanation: 'Chúng tôi đang ăn trưa (Quá khứ tiếp diễn: were having) thì họ đến (arrived).'
  },
  {
    id: 'fill-x6',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: '__________ you __________ (visit) your parents next month?',
    answer: 'Will - visit',
    acceptedAnswers: ['Will - visit', 'Will visit', 'Are - going to visit'],
    explanation: 'Hỏi về dự định/kế hoạch "next month" ➔ Chia Tương lai đơn nghi vấn: Will you visit...?'
  },
  {
    id: 'fill-x7',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'I __________ (not finish) my homework yet.',
    answer: "haven't finished",
    acceptedAnswers: ["haven't finished", "have not finished"],
    explanation: 'Có dấu hiệu "yet" ở câu phủ định ➔ Chia Hiện tại hoàn thành: haven\'t finished.'
  },
  {
    id: 'fill-x8',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'They __________ (go) to the beach tomorrow.',
    answer: 'will go',
    acceptedAnswers: ['will go', 'are going to go'],
    explanation: 'Có dấu hiệu "tomorrow" ➔ Chia Tương lai đơn: will go.'
  },
  {
    id: 'fill-x9',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'When I arrived, he __________ (wait) for me.',
    answer: 'was waiting',
    acceptedAnswers: ['was waiting'],
    explanation: 'Khi tôi đến (arrived), anh ấy đang đợi tôi (Quá khứ tiếp diễn: was waiting).'
  },
  {
    id: 'fill-x10',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: '__________ she __________ (go) to the party last night?',
    answer: 'Did - go',
    acceptedAnswers: ['Did - go', 'Did go'],
    explanation: 'Hỏi về sự việc tối qua "last night" ➔ Chia Quá khứ đơn nghi vấn: Did she go...?'
  },
  {
    id: 'fill-x11',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'He (write) __________ a book by the end of the year.',
    answer: 'will have written',
    acceptedAnswers: ['will have written'],
    explanation: 'Có mốc thời gian "by the end of the year" ➔ Chia Tương lai hoàn thành: will have written.'
  },
  {
    id: 'fill-x12',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'He (read) __________ this book for 15 days by the end of this week.',
    answer: 'will have read',
    acceptedAnswers: ['will have read', 'will have been reading'],
    explanation: 'Có "by the end of this week" + khoảng thời gian "for 15 days" ➔ Chia Tương lai hoàn thành: will have read.'
  },
  {
    id: 'fill-x13',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'By July the fifth, they (study) __________ English for 3 years.',
    answer: 'will have studied',
    acceptedAnswers: ['will have studied', 'will have been studying'],
    explanation: 'Có mốc thời gian "By July the fifth" + khoảng thời gian "for 3 years" ➔ Chia Tương lai hoàn thành: will have studied.'
  },
  {
    id: 'fill-x14',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'The sun (not/ rise) __________ by 4 o’clock.',
    answer: "will not have risen",
    acceptedAnswers: ["will not have risen", "won't have risen"],
    explanation: 'Trước mốc thời gian tương lai "by 4 o’clock" ➔ Chia Tương lai hoàn thành phủ định: won\'t have risen.'
  },
  {
    id: 'fill-x15',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'They (be) __________ married for 40 years by the end of this month.',
    answer: 'will have been',
    acceptedAnswers: ['will have been'],
    explanation: 'Có "by the end of this month" + "for 40 years" ➔ Chia Tương lai hoàn thành với To Be: will have been.'
  },
  {
    id: 'fill-x16',
    type: 'fill',
    tenseTags: ['Present Perfect', 'Future Perfect'],
    prompt: '(be, she) __________ pregnant for three months this week?',
    answer: 'Has she been',
    acceptedAnswers: ['Has she been', 'Will she have been'],
    explanation: 'Tính đến tuần này "this week" được 3 tháng ➔ Chia Hiện tại hoàn thành nghi vấn: Has she been...?'
  },
  {
    id: 'fill-x17',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'They (wait) __________ for the president for 5 hours.',
    answer: 'have been waiting',
    acceptedAnswers: ['have been waiting', 'have waited'],
    explanation: 'Hành động chờ đợi kéo dài suốt 5 tiếng đến hiện tại "for 5 hours" ➔ Chia Hiện tại hoàn thành tiếp diễn.'
  },
  {
    id: 'fill-x18',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: '(finish, you) __________ this novel by next week?',
    answer: 'Will you have finished',
    acceptedAnswers: ['Will you have finished', 'Will you finish'],
    explanation: 'Trước mốc thời gian tương lai "by next week" ➔ Chia Tương lai hoàn thành nghi vấn: Will you have finished...?'
  },
  {
    id: 'fill-x19',
    type: 'fill',
    tenseTags: ['Future Perfect'],
    prompt: 'By 9 o’clock, we (finish) __________ our homework.',
    answer: 'will have finished',
    acceptedAnswers: ['will have finished'],
    explanation: 'Trước mốc giờ "By 9 o’clock" ➔ Chia Tương lai hoàn thành: will have finished.'
  },
  {
    id: 'fill-x20',
    type: 'fill',
    tenseTags: ['Future Perfect', 'Past Perfect'],
    prompt: 'By 2018, we (live) __________ in Madrid for 20 years.',
    answer: 'had lived',
    acceptedAnswers: ['had lived', 'will have lived'],
    explanation: 'Tính đến năm 2018 đã sống được 20 năm ➔ Chia Quá khứ hoàn thành / Tương lai hoàn thành.'
  },

  // --- BỘ CÂU ĐIỀN TỪ 1 ---
  {
    id: 'fill-n1',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Listen! The teacher (explain) ______ the new lesson to us.',
    answer: 'is explaining',
    acceptedAnswers: ['is explaining'],
    explanation: 'Có câu mệnh lệnh "Listen!" (hành động đang xảy ra) ➔ Chia Hiện tại tiếp diễn: is explaining.'
  },
  {
    id: 'fill-n2',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'The sun (rise) ______ in the East and (set) ______ in the West.',
    answer: 'rises - sets',
    acceptedAnswers: ['rises - sets', 'rises / sets', 'rises sets'],
    explanation: 'Chân lý/sự thật hiển nhiên ➔ Chia Hiện tại đơn: rises - sets.'
  },
  {
    id: 'fill-n3',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'They (not/go) ______ to the cinema very often.',
    answer: "don't go",
    acceptedAnswers: ["don't go", "do not go"],
    explanation: 'Tần suất "very often" ➔ Chia Hiện tại đơn phủ định: don\'t go.'
  },
  {
    id: 'fill-n4',
    type: 'fill',
    tenseTags: ['Present Simple', 'Present Continuous'],
    prompt: 'My father usually (drink) ______ coffee in the morning, but today he (drink) ______ tea.',
    answer: 'drinks - is drinking',
    acceptedAnswers: ['drinks - is drinking', 'drinks / is drinking'],
    explanation: 'Sự thay đổi thói quen ("usually drinks" nhưng "today is drinking") ➔ Hiện tại đơn & Hiện tại tiếp diễn.'
  },
  {
    id: 'fill-n5',
    type: 'fill',
    tenseTags: ['Present Continuous', 'Present Simple'],
    prompt: 'Look at the sign! You (not/step) ______ on the grass.',
    answer: "must not step",
    acceptedAnswers: ["must not step", "mustn't step", "don't step", "are not stepping"],
    explanation: 'Biển báo nhắc nhở cấm đoán "Look at the sign!" ➔ mustn\'t step / don\'t step.'
  },
  {
    id: 'fill-n6',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'She (study) ______ English at the moment because she wants to study abroad.',
    answer: 'is studying',
    acceptedAnswers: ['is studying'],
    explanation: 'Có dấu hiệu "at the moment" ➔ Chia Hiện tại tiếp diễn: is studying.'
  },
  {
    id: 'fill-n7',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'Water (boil) ______ at 100 degrees Celsius.',
    answer: 'boils',
    acceptedAnswers: ['boils'],
    explanation: 'Sự thật khoa học hiển nhiên ➔ Chia Hiện tại đơn: boils.'
  },
  {
    id: 'fill-n8',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'I (think) ______ this dress fits you perfectly.',
    answer: 'think',
    acceptedAnswers: ['think'],
    explanation: 'Bày tỏ quan điểm/suy nghĩ ở hiện tại "I think..." ➔ Chia Hiện tại đơn: think.'
  },
  {
    id: 'fill-n9',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'John (play) ______ football with his friends every Sunday afternoon.',
    answer: 'plays',
    acceptedAnswers: ['plays'],
    explanation: 'Thói quen lặp lại "every Sunday afternoon" ➔ Chia Hiện tại đơn: plays.'
  },
  {
    id: 'fill-n10',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Be quiet! The baby (sleep) ______ in the next room.',
    answer: 'is sleeping',
    acceptedAnswers: ['is sleeping'],
    explanation: 'Có câu nhắc nhở "Be quiet!" ➔ Nhấn mạnh hành động đang diễn ra: is sleeping.'
  },
  {
    id: 'fill-n11',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Look! It (rain) ______ heavily outside.',
    answer: 'is raining',
    acceptedAnswers: ['is raining'],
    explanation: 'Có câu gọi chú ý "Look!" ➔ Chia Hiện tại tiếp diễn: is raining.'
  },
  {
    id: 'fill-n12',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'This cake (taste) ______ delicious. Can I have another piece?',
    answer: 'tastes',
    acceptedAnswers: ['tastes', 'is'],
    explanation: 'Động từ tri giác "taste/is" ở hiện tại ➔ Chia Hiện tại đơn: tastes.'
  },
  {
    id: 'fill-n13',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'Who (do) ______ this umbrella (belong) ______ to?',
    answer: 'does - belong',
    acceptedAnswers: ['does - belong', 'does belong'],
    explanation: 'Động từ sở hữu "belong to" chia ở Hiện tại đơn: Who does this umbrella belong to?'
  },
  {
    id: 'fill-n14',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'I (know) ______ him for a long time.',
    answer: 'have known',
    acceptedAnswers: ['have known', "haven't seen"],
    explanation: 'Đi với khoảng thời gian "for a long time" ➔ Chia Hiện tại hoàn thành: have known.'
  },
  {
    id: 'fill-n15',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'My father (work) ______ very hard every day.',
    answer: 'works',
    acceptedAnswers: ['works'],
    explanation: 'Dấu hiệu thói quen "every day" ➔ Chia Hiện tại đơn: works.'
  },
  {
    id: 'fill-n16',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Why (be) ______ you (taste) ______ the soup? Is it too salty?',
    answer: 'are - tasting',
    acceptedAnswers: ['are - tasting', 'are tasting'],
    explanation: 'Hành động đang nếm thử món ăn ngay lúc này ➔ Chia Hiện tại tiếp diễn: are you tasting...?'
  },
  {
    id: 'fill-n17',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'He (seem) ______ to be very happy with the news.',
    answer: 'seems',
    acceptedAnswers: ['seems', 'appears'],
    explanation: 'Động từ trạng thái "seem" ở hiện tại ➔ Chia Hiện tại đơn: seems.'
  },
  {
    id: 'fill-n18',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'They (wait) ______ for the manager for two hours.',
    answer: 'have been waiting',
    acceptedAnswers: ['have been waiting', 'have waited'],
    explanation: 'Có khoảng thời gian "for two hours" kéo dài đến hiện tại ➔ Chia Hiện tại hoàn thành (tiếp diễn).'
  },
  {
    id: 'fill-n19',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'My brother (live) ______ in London since last week.',
    answer: 'has lived',
    acceptedAnswers: ['has lived', 'has been living', 'has stayed'],
    explanation: 'Có dấu hiệu "since last week" ➔ Chia Hiện tại hoàn thành: has lived.'
  },
  {
    id: 'fill-n20',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'He (break) ______ his leg when he (play) ______ football.',
    answer: 'broke - was playing',
    acceptedAnswers: ['broke - was playing', 'broke / was playing'],
    explanation: 'Đang chơi bóng đá (Quá khứ tiếp diễn: was playing) thì bị gãy chân (Quá khứ đơn: broke).'
  },
  {
    id: 'fill-n21',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'At 8 p.m yesterday, we (watch) ______ a movie.',
    answer: 'were watching',
    acceptedAnswers: ['were watching'],
    explanation: 'Thời điểm cụ thể trong quá khứ "At 8 p.m yesterday" ➔ Chia Quá khứ tiếp diễn: were watching.'
  },
  {
    id: 'fill-n22',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'She (cook) ______ dinner while her husband (read) ______ the newspaper.',
    answer: 'was cooking - was reading',
    acceptedAnswers: ['was cooking - was reading', 'was cooking / was reading'],
    explanation: 'Hai hành động diễn ra song song trong quá khứ sau "while" ➔ Chia Quá khứ tiếp diễn: was cooking - was reading.'
  },
  {
    id: 'fill-n23',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: 'Yesterday, I (go) ______ to the store and (buy) ______ some milk.',
    answer: 'went - bought',
    acceptedAnswers: ['went - bought', 'went / bought'],
    explanation: 'Chuỗi hành động nối tiếp trong quá khứ "Yesterday" ➔ Chia Quá khứ đơn: went - bought.'
  },
  {
    id: 'fill-n24',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'What (do) ______ you (do) ______ at this time last Sunday?',
    answer: 'were - doing',
    acceptedAnswers: ['were - doing', 'were doing'],
    explanation: 'Thời điểm cụ thể trong quá khứ "at this time last Sunday" ➔ Chia Quá khứ tiếp diễn: were you doing?'
  },
  {
    id: 'fill-n25',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'When the teacher (enter) ______ the room, the students (talk) ______ loudly.',
    answer: 'entered - were talking',
    acceptedAnswers: ['entered - were talking', 'entered / were talking'],
    explanation: 'Học sinh đang nói chuyện om sòm (were talking) thì giáo viên bước vào (entered).'
  },
  {
    id: 'fill-n26',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: 'He (not/come) ______ to the party last night.',
    answer: "didn't come",
    acceptedAnswers: ["didn't come", "did not come"],
    explanation: 'Có dấu hiệu "last night" ➔ Chia Quá khứ đơn phủ định: didn\'t come.'
  },
  {
    id: 'fill-n27',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'I (see) ______ an accident while I (wait) ______ for the bus.',
    answer: 'saw - was waiting',
    acceptedAnswers: ['saw - was waiting', 'saw / was waiting'],
    explanation: 'Tôi đang đợi xe bus (was waiting) thì nhìn thấy một vụ tai nạn (saw).'
  },
  {
    id: 'fill-n28',
    type: 'fill',
    tenseTags: ['Near Future'],
    prompt: 'Look at those dark clouds! It (rain) ______.',
    answer: 'is going to rain',
    acceptedAnswers: ['is going to rain'],
    explanation: 'Dự đoán có căn cứ ở hiện tại "dark clouds!" ➔ Chia Tương lai gần: is going to rain.'
  },
  {
    id: 'fill-n29',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'I think people (live) ______ on Mars in the future.',
    answer: 'will live',
    acceptedAnswers: ['will live'],
    explanation: 'Dự đoán tương lai không có căn cứ "I think..." ➔ Chia Tương lai đơn: will live.'
  },
  {
    id: 'fill-n30',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'A: "I’m cold." – B: "I (close) ______ the window for you."',
    answer: 'will close',
    acceptedAnswers: ['will close', "'ll close"],
    explanation: 'Quyết định bộc phát ngay tại thời điểm nói ➔ Chia Tương lai đơn: will close.'
  },
  {
    id: 'fill-n31',
    type: 'fill',
    tenseTags: ['Near Future', 'Present Continuous'],
    prompt: 'She (visit) ______ her grandparents this weekend. She has bought the ticket.',
    answer: 'is going to visit',
    acceptedAnswers: ['is going to visit', 'is visiting'],
    explanation: 'Đã chuẩn bị trước "bought the ticket" ➔ Chia Tương lai gần: is going to visit.'
  },
  {
    id: 'fill-n32',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'I promise I (not/tell) ______ anyone your secret.',
    answer: "won't tell",
    acceptedAnswers: ["won't tell", "will not tell"],
    explanation: 'Lời hứa "I promise..." ➔ Chia Tương lai đơn phủ định: won\'t tell.'
  },
  {
    id: 'fill-n33',
    type: 'fill',
    tenseTags: ['Near Future'],
    prompt: 'Watch out! You (fall) ______ off the ladder.',
    answer: 'are going to fall',
    acceptedAnswers: ['are going to fall'],
    explanation: 'Cảnh báo nguy cơ sắp xảy ra ngay lập tức "Watch out!" ➔ Tương lai gần: are going to fall.'
  },
  {
    id: 'fill-n34',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: "Don’t worry, she (help) ______ you with the homework.",
    answer: 'will help',
    acceptedAnswers: ['will help'],
    explanation: 'Lời trấn an/giúp đỡ bộc phát "Don\'t worry..." ➔ Chia Tương lai đơn: will help.'
  },
  {
    id: 'fill-n35',
    type: 'fill',
    tenseTags: ['Present Continuous', 'Near Future'],
    prompt: 'We (have) ______ a party next Saturday. Everything is planned.',
    answer: 'are having',
    acceptedAnswers: ['are having', 'are going to have'],
    explanation: 'Kế hoạch đã chuẩn bị xong xuôi "Everything is planned" ➔ Hiện tại tiếp diễn: are having.'
  },
  {
    id: 'fill-n36',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'In 2050, cars (fly) ______.',
    answer: 'will fly',
    acceptedAnswers: ['will fly'],
    explanation: 'Dự đoán viễn cảnh tương lai xa "In 2050" ➔ Chia Tương lai đơn: will fly.'
  },
  {
    id: 'fill-n37',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'I hope he (pass) ______ the exam.',
    answer: 'will pass',
    acceptedAnswers: ['will pass'],
    explanation: 'Kỳ vọng "I hope..." ➔ Chia Tương lai đơn: will pass.'
  },

  // --- PREVIOUS FILL QUESTIONS ---
  {
    id: 'fill-a1',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'What __________ they (do) _________ in the winter?',
    answer: 'do - do',
    acceptedAnswers: ['do - do', 'do do', 'do/do'],
    explanation: 'Hỏi về thói quen trong mùa đông ➔ Hiện tại đơn: What do they do...?'
  },
  {
    id: 'fill-a2',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Now I (do) __________ the cooking while Hoa (listen) ___________ to music.',
    answer: 'am doing - is listening',
    acceptedAnswers: ['am doing - is listening', 'am doing / is listening'],
    explanation: 'Có dấu hiệu "Now" ➔ Hiện tại tiếp diễn: am doing - is listening.'
  },
  {
    id: 'fill-a3',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'At the moment, Nam and his friends (go) __________ shopping at the mall.',
    answer: 'are going',
    acceptedAnswers: ['are going'],
    explanation: 'Có dấu hiệu "At the moment" ➔ Hiện tại tiếp diễn: are going.'
  },
  {
    id: 'fill-a4',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'On Friday, I (have) ___________ English.',
    answer: 'have',
    acceptedAnswers: ['have'],
    explanation: 'Lịch học cố định ➔ Hiện tại đơn: have.'
  },
  {
    id: 'fill-a5',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'He (like) ___________ apples, but he (not like) __________ bananas.',
    answer: "likes - doesn't like",
    acceptedAnswers: ["likes - doesn't like", "likes - does not like"],
    explanation: 'Sở thích bản chất của chủ ngữ "He" ➔ Hiện tại đơn: likes - doesn\'t like.'
  },
  {
    id: 'fill-a6',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'Tom (be) _________ my friend. He (play) ____________ sports every day.',
    answer: 'is - plays',
    acceptedAnswers: ['is - plays'],
    explanation: 'Sự thật ở hiện tại và thói quen "every day" ➔ Hiện tại đơn: is - plays.'
  },
  {
    id: 'fill-a7',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'He (teach) ___________ English in a big school in town.',
    answer: 'teaches',
    acceptedAnswers: ['teaches'],
    explanation: 'Nghề nghiệp cố định của "He" ➔ Hiện tại đơn: teaches.'
  },
  {
    id: 'fill-a8',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'We usually (read) _______ books, (listen) ______ to music or (watch) ________ TV.',
    answer: 'read - listen - watch',
    acceptedAnswers: ['read - listen - watch'],
    explanation: 'Dấu hiệu "usually" ➔ Hiện tại đơn: read - listen - watch.'
  },
  {
    id: 'fill-a9',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Look! They (run) ___________ together.',
    answer: 'are running',
    acceptedAnswers: ['are running'],
    explanation: 'Có dấu hiệu "Look!" ➔ Hiện tại tiếp diễn: are running.'
  },
  {
    id: 'fill-a10',
    type: 'fill',
    tenseTags: ['Present Continuous'],
    prompt: 'Keep silent! I (listen) ___________ to the radio.',
    answer: 'am listening',
    acceptedAnswers: ['am listening'],
    explanation: 'Có dấu hiệu "Keep silent!" ➔ Hiện tại tiếp diễn: am listening.'
  },
  {
    id: 'fill-b1',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: 'I (not see) _____________ him last Monday.',
    answer: "didn't see",
    acceptedAnswers: ["didn't see", "did not see"],
    explanation: 'Có dấu hiệu "last Monday" ➔ Quá khứ đơn phủ định: didn\'t see.'
  },
  {
    id: 'fill-b2',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'Up to the present, we (write) _____________ almost every lesson in the book.',
    answer: 'have written',
    acceptedAnswers: ['have written'],
    explanation: 'Dấu hiệu "Up to the present" ➔ Hiện tại hoàn thành: have written.'
  },
  {
    id: 'fill-b3',
    type: 'fill',
    tenseTags: ['Present Perfect', 'Past Simple'],
    prompt: 'How many times _____________ you (see) _____________ him since he went to Edinburgh?',
    answer: 'have - seen',
    acceptedAnswers: ['have - seen'],
    explanation: 'Cấu trúc "since + Past Simple (went)" ➔ Mệnh đề chính chia Hiện tại hoàn thành: have seen.'
  },
  {
    id: 'fill-b4',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'Mary (lose) _____________ her hat and she (look) _____________ for it until now.',
    answer: 'has lost - has been looking',
    acceptedAnswers: ['has lost - has been looking', 'has lost - has looked'],
    explanation: 'Hành động kéo dài "until now" ➔ Hiện tại hoàn thành / HTHT tiếp diễn.'
  },
  {
    id: 'fill-b5',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'I (read) _____________ the novel written by Jack London several times before.',
    answer: 'have read',
    acceptedAnswers: ['have read'],
    explanation: 'Trải nghiệm "several times before" ➔ Hiện tại hoàn thành: have read.'
  },
  {
    id: 'fill-b6',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'He (write) _____________ a book since last year.',
    answer: 'has written',
    acceptedAnswers: ['has written', 'has been writing'],
    explanation: 'Có dấu hiệu "since last year" ➔ Hiện tại hoàn thành: has written.'
  },
  {
    id: 'fill-b7',
    type: 'fill',
    tenseTags: ['Present Perfect', 'Past Simple'],
    prompt: 'Mr Green (teach) _____________ English in this school since he (graduate) _____________ from university in 1986.',
    answer: 'has taught - graduated',
    acceptedAnswers: ['has taught - graduated'],
    explanation: 'Cấu trúc "since + Past Simple (graduated)" ➔ Mệnh đề chính chia Hiện tại hoàn thành: has taught.'
  },
  {
    id: 'fill-b8',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'My father (not smoke) _____________ for 5 years.',
    answer: "hasn't smoked",
    acceptedAnswers: ["hasn't smoked", "has not smoked"],
    explanation: 'Có "for 5 years" ➔ Hiện tại hoàn thành: hasn\'t smoked.'
  },
  {
    id: 'fill-b9',
    type: 'fill',
    tenseTags: ['Present Perfect'],
    prompt: 'How long _____________ Bob and Mary (be) _____________ married?',
    answer: 'have - been',
    acceptedAnswers: ['have - been'],
    explanation: 'Hỏi khoảng thời gian "How long" ➔ Hiện tại hoàn thành: Have Bob and Mary been...?'
  },
  {
    id: 'fill-b10',
    type: 'fill',
    tenseTags: ['Past Simple'],
    prompt: 'She (win) _____________ the gold medal in 1986.',
    answer: 'won',
    acceptedAnswers: ['won'],
    explanation: 'Mốc năm quá khứ "in 1986" ➔ Quá khứ đơn: won.'
  },
  {
    id: 'fill-c1',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Perfect'],
    prompt: 'When the police (arrive) _____________, the car (go) _____________.',
    answer: 'arrived - had gone',
    acceptedAnswers: ['arrived - had gone'],
    explanation: 'Xe đã đi trước (Quá khứ hoàn thành: had gone) khi cảnh sát đến (Quá khứ đơn: arrived).'
  },
  {
    id: 'fill-c2',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'While we (do) ____________ a sight-seeing tour, our friends (lie) ___________ on the beach.',
    answer: 'were doing - were lying',
    acceptedAnswers: ['were doing - were lying'],
    explanation: 'Hai hành động diễn ra song song trong quá khứ sau "While" ➔ Quá khứ tiếp diễn.'
  },
  {
    id: 'fill-c3',
    type: 'fill',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'They (eat) _____________ everything by the time they (arrive) _____________ at the party.',
    answer: 'had eaten - arrived',
    acceptedAnswers: ['had eaten - arrived'],
    explanation: 'Ăn hết thức ăn trước (Quá khứ hoàn thành: had eaten) khi họ đến (Quá khứ đơn: arrived).'
  },
  {
    id: 'fill-c4',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'While Tom (play) _____________ the piano, his mother (do) _____________ the washing-up.',
    answer: 'was playing - was doing',
    acceptedAnswers: ['was playing - was doing'],
    explanation: 'Hai hành động diễn ra song song ➔ Quá khứ tiếp diễn: was playing - was doing.'
  },
  {
    id: 'fill-c5',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Perfect'],
    prompt: 'I (go) _____________ after they (finish) _____________ their work.',
    answer: 'went - had finished',
    acceptedAnswers: ['went - had finished'],
    explanation: 'Họ làm xong việc trước (Quá khứ hoàn thành: had finished) rồi tôi mới đi (Quá khứ đơn: went).'
  },
  {
    id: 'fill-c6',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'The light went out while I (have) _____________ dinner.',
    answer: 'was having',
    acceptedAnswers: ['was having'],
    explanation: 'Tôi đang ăn tối (Quá khứ tiếp diễn: was having) thì đèn tắt (went out).'
  },
  {
    id: 'fill-c7',
    type: 'fill',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'He (do) _____________ nothing before he (see) _____________ me.',
    answer: 'had done - saw',
    acceptedAnswers: ['had done - saw'],
    explanation: 'Chưa làm gì trước đó (Quá khứ hoàn thành: had done) trước khi gặp tôi (Quá khứ đơn: saw).'
  },
  {
    id: 'fill-c8',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Perfect'],
    prompt: 'When they (get) _____________ the station, the train (leave) _____________.',
    answer: 'got - had left',
    acceptedAnswers: ['got - had left'],
    explanation: 'Tàu đã rời đi trước (Quá khứ hoàn thành: had left) khi họ tới ga (Quá khứ đơn: got).'
  },
  {
    id: 'fill-c9',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'The house (catch) _____________ fire while they were sleeping.',
    answer: 'caught',
    acceptedAnswers: ['caught'],
    explanation: 'Họ đang ngủ (were sleeping) thì nhà bốc cháy (Quá khứ đơn: caught).'
  },
  {
    id: 'fill-c10',
    type: 'fill',
    tenseTags: ['Past Continuous'],
    prompt: 'While Tom was reading, Amely (watch) _____________ a documentary on TV.',
    answer: 'was watching',
    acceptedAnswers: ['was watching'],
    explanation: 'Hai hành động diễn ra song song ➔ Quá khứ tiếp diễn: was watching.'
  },
  {
    id: 'fill-c11',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'The burglar (open) _____________ the safe when he (hear) _____________ footsteps.',
    answer: 'was opening - heard',
    acceptedAnswers: ['was opening - heard'],
    explanation: 'Tên trộm đang mở két sắt (Quá khứ tiếp diễn) thì nghe thấy tiếng bước chân (Quá khứ đơn).'
  },
  {
    id: 'fill-c12',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'Last night I (drop) _____________ a plate when I (do) _____________ the washing-up.',
    answer: 'dropped - was doing',
    acceptedAnswers: ['dropped - was doing'],
    explanation: 'Tôi đang rửa bát (Quá khứ tiếp diễn) thì làm rơi đĩa (Quá khứ đơn).'
  },
  {
    id: 'fill-c13',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'Mary and I (dance) _____________ in the house when the telephone rang.',
    answer: 'were dancing',
    acceptedAnswers: ['were dancing'],
    explanation: 'Đang nhảy trong nhà (Quá khứ tiếp diễn) thì điện thoại reo (Quá khứ đơn).'
  },
  {
    id: 'fill-c14',
    type: 'fill',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'I (open) _____________ the letter when the wind (blow) _____________ it out of my hand.',
    answer: 'was opening - blew',
    acceptedAnswers: ['was opening - blew'],
    explanation: 'Tôi đang mở thư (Quá khứ tiếp diễn) thì gió thổi bay (Quá khứ đơn).'
  },
  {
    id: 'fill-c15',
    type: 'fill',
    tenseTags: ['Past Simple', 'Past Continuous'],
    prompt: 'The boy fell and hurt himself while he (ride) _____________ a bicycle.',
    answer: 'was riding',
    acceptedAnswers: ['was riding'],
    explanation: 'Cậu bé té ngã trong khi đang đạp xe (Quá khứ tiếp diễn: was riding).'
  },
  {
    id: 'fill-d1',
    type: 'fill',
    tenseTags: ['Present Simple', 'Future Continuous'],
    prompt: 'When you (go) _____________ into the office, Mr John (sit) _____________ at the front desk.',
    answer: 'go - will be sitting',
    acceptedAnswers: ['go - will be sitting'],
    explanation: 'When + Present Simple (go), mệnh đề chính Tương lai tiếp diễn (will be sitting).'
  },
  {
    id: 'fill-d2',
    type: 'fill',
    tenseTags: ['Future Simple'],
    prompt: 'Our English teacher (explain) _____________ that lesson to us tomorrow.',
    answer: 'will explain',
    acceptedAnswers: ['will explain'],
    explanation: 'Có dấu hiệu "tomorrow" ➔ Tương lai đơn: will explain.'
  },
  {
    id: 'fill-d3',
    type: 'fill',
    tenseTags: ['Future Continuous', 'Present Simple'],
    prompt: 'We (wait) _____________ for you when you (get) _____________ back tomorrow.',
    answer: 'will be waiting - get',
    acceptedAnswers: ['will be waiting - get'],
    explanation: 'Đang đợi (Tương lai tiếp diễn: will be waiting) khi bạn trở về (Present Simple: get).'
  },
  {
    id: 'fill-d4',
    type: 'fill',
    tenseTags: ['Future Continuous'],
    prompt: 'What _____________ you (do) _____________ at 7:00 pm next Sunday? - I (practice) _____________ my English lesson then.',
    answer: 'will - be doing - will be practicing',
    acceptedAnswers: ['will - be doing - will be practicing'],
    explanation: 'Thời điểm cụ thể trong tương lai "at 7:00 pm next Sunday" ➔ Tương lai tiếp diễn.'
  },
  {
    id: 'fill-d5',
    type: 'fill',
    tenseTags: ['Present Simple', 'Future Simple'],
    prompt: 'When I see Mr Pike tomorrow, I (remind) _____________ him of that.',
    answer: 'will remind',
    acceptedAnswers: ['will remind'],
    explanation: 'When + Present Simple (see), mệnh đề chính Tương lai đơn: will remind.'
  },
  {
    id: 'fill-d6',
    type: 'fill',
    tenseTags: ['Present Simple', 'Future Continuous'],
    prompt: 'When you (come) _____________ next Monday, I (work) _____________ at my desk.',
    answer: 'come - will be working',
    acceptedAnswers: ['come - will be working'],
    explanation: 'Khi bạn đến (come), tôi sẽ đang làm việc tại bàn (will be working).'
  },
  {
    id: 'fill-d7',
    type: 'fill',
    tenseTags: ['Future Continuous'],
    prompt: 'He (work) _____________ on the report at this time tomorrow.',
    answer: 'will be working',
    acceptedAnswers: ['will be working'],
    explanation: 'Thời điểm cụ thể "at this time tomorrow" ➔ Tương lai tiếp diễn: will be working.'
  },
  {
    id: 'fill-d8',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: 'Please wait here until you (see) _____________ her.',
    answer: 'see',
    acceptedAnswers: ['see'],
    explanation: 'Sau chỉ thời gian "until" ➔ Chia Hiện tại đơn: see.'
  },
  {
    id: 'fill-d9',
    type: 'fill',
    tenseTags: ['Future Continuous', 'Present Simple'],
    prompt: 'The Browns (do) ___________ their housework when you (come) ___________ next Sunday.',
    answer: 'will be doing - come',
    acceptedAnswers: ['will be doing - come'],
    explanation: 'Sẽ đang làm việc nhà (will be doing) khi bạn đến vào Chủ nhật tới (come).'
  },
  {
    id: 'fill-d10',
    type: 'fill',
    tenseTags: ['Present Simple'],
    prompt: "Don't leave until you (see) _____________ her.",
    answer: 'see',
    acceptedAnswers: ['see'],
    explanation: 'Sau "until" chia Hiện tại đơn: see.'
  }
];

// TAP 2: DẠNG TRẮC NGHIỆM MULTIPLE CHOICE (HƠN 90 CÂU TRẮC NGHIỆM 4 ĐÁP ÁN A/B/C/D)
export const mcqTenseQuestions: SingleTenseQuestion[] = [
  // --- BỘ CÂU TRẮC NGHIỆM MỚI BỔ SUNG ---
  {
    id: 'mcq-m1',
    type: 'mcq',
    tenseTags: ['Present Perfect Continuous'],
    prompt: 'We ___ strictly since last week to lose weight.',
    options: ['A. have dieted', 'B. have been dieting', 'C. diet', 'D. are dieting'],
    answer: 'B. have been dieting',
    explanation: 'Hành động ăn kiêng kéo dài liên tục từ tuần trước "since last week" ➔ Hiện tại hoàn thành tiếp diễn: B. have been dieting.'
  },
  {
    id: 'mcq-m2',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'I ___ that movie three times.',
    options: ['A. have seen', 'B. see', 'C. am seeing', 'D. have been seeing'],
    answer: 'A. have seen',
    explanation: 'Trải nghiệm số lần xem phim "three times" tính đến hiện tại ➔ Chia Hiện tại hoàn thành: A. have seen.'
  },
  {
    id: 'mcq-m3',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'She ___ her homework yet.',
    options: ["A. didn't finish", "B. hasn't finished", "C. doesn't finish", "D. isn't finishing"],
    answer: "B. hasn't finished",
    explanation: 'Có dấu hiệu "yet" ở câu phủ định ➔ Chia Hiện tại hoàn thành: B. hasn\'t finished.'
  },
  {
    id: 'mcq-m4',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'They ___ in this house for 20 years.',
    options: ['A. live', 'B. are living', 'C. have lived', 'D. lives'],
    answer: 'C. have lived',
    explanation: 'Khoảng thời gian kéo dài đến hiện tại "for 20 years" ➔ Chia Hiện tại hoàn thành: C. have lived.'
  },
  {
    id: 'mcq-m5',
    type: 'mcq',
    tenseTags: ['Present Perfect Continuous'],
    prompt: 'How long ___ you ___ for the bus?',
    options: ['A. have/waited', 'B. do/wait', 'C. are/waiting', 'D. have/been waiting'],
    answer: 'D. have/been waiting',
    explanation: 'Hỏi khoảng thời gian "How long" của hành động đang chờ xe bus ➔ Hiện tại hoàn thành tiếp diễn: D. have/been waiting.'
  },
  {
    id: 'mcq-m6',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: "He ___ his key. He can't get into the house now.",
    options: ['A. has lost', 'B. loses', 'C. is losing', 'D. has been losing'],
    answer: 'A. has lost',
    explanation: 'Hành động mất chìa khóa gây ra hậu quả ở hiện tại "can\'t get into house now" ➔ Chia Hiện tại hoàn thành: A. has lost.'
  },
  {
    id: 'mcq-m7',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'My sister ___ as a nurse for ten years.',
    options: ['A. works', 'B. has worked', 'C. is working', 'D. work'],
    answer: 'B. has worked',
    explanation: 'Khoảng thời gian "for ten years" kéo dài tới hiện tại ➔ Chia Hiện tại hoàn thành: B. has worked.'
  },
  {
    id: 'mcq-m8',
    type: 'mcq',
    tenseTags: ['Present Perfect Continuous'],
    prompt: 'You look tired. ___ you ___ hard lately?',
    options: ['A. Have/worked', 'B. Do/work', 'C. Are/working', 'D. Have/been working'],
    answer: 'D. Have/been working',
    explanation: 'Nhấn mạnh sự mệt mỏi do quá trình làm việc vất vả dạo gần đây "lately" ➔ Hiện tại hoàn thành tiếp diễn: D. Have/been working.'
  },
  {
    id: 'mcq-m9',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'I ___ never ___ such a beautiful sunset before.',
    options: ['A. have/seen', 'B. did/see', 'C. do/see', 'D. am/seeing'],
    answer: 'A. have/seen',
    explanation: 'Cấu trúc "never ... before" chỉ trải nghiệm ➔ Chia Hiện tại hoàn thành: A. have/seen.'
  },
  {
    id: 'mcq-m10',
    type: 'mcq',
    tenseTags: ['Present Perfect Continuous'],
    prompt: 'The children ___ TV all afternoon.',
    options: ['A. watch', 'B. have been watching', 'C. are watching', 'D. watched'],
    answer: 'B. have been watching',
    explanation: 'Hành động xem TV kéo dài liên tục suốt cả buổi chiều "all afternoon" ➔ Hiện tại hoàn thành tiếp diễn: B. have been watching.'
  },
  {
    id: 'mcq-m11',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'When I arrived at the station, the train ___.',
    options: ['A. left', 'B. has left', 'C. had left', 'D. was leaving'],
    answer: 'C. had left',
    explanation: 'Tàu đã rời đi trước (Quá khứ hoàn thành: had left) khi tôi tới ga (arrived).'
  },
  {
    id: 'mcq-m12',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'Before she went to bed, she ___ her homework.',
    options: ['A. had finished', 'B. finished', 'C. has finished', 'D. finishes'],
    answer: 'A. had finished',
    explanation: 'Làm xong bài tập trước khi đi ngủ (Before + Past Simple) ➔ Chia Quá khứ hoàn thành: A. had finished.'
  },
  {
    id: 'mcq-m13',
    type: 'mcq',
    tenseTags: ['Past Perfect Continuous'],
    prompt: 'He was tired because he ___ all day.',
    options: ['A. worked', 'B. had been working', 'C. has worked', 'D. is working'],
    answer: 'B. had been working',
    explanation: 'Mệt mỏi vì quá trình làm việc liên tục cả ngày trước đó trong quá khứ ➔ Quá khứ hoàn thành tiếp diễn: B. had been working.'
  },
  {
    id: 'mcq-m14',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'By the time the police came, the thief ___ away.',
    options: ['A. ran', 'B. had run', 'C. has run', 'D. was running'],
    answer: 'B. had run',
    explanation: 'Tên trộm đã tẩu thoát trước khi cảnh sát đến ➔ Chia Quá khứ hoàn thành: B. had run.'
  },
  {
    id: 'mcq-m15',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'They ___ married for two years before they divorced.',
    options: ['A. were', 'B. have been', 'C. had been', 'D. are'],
    answer: 'C. had been',
    explanation: 'Đã kết hôn được 2 năm trước thời điểm ly hôn trong quá khứ ➔ Chia Quá khứ hoàn thành: C. had been.'
  },
  {
    id: 'mcq-m16',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'The house was dirty because nobody ___ it for weeks.',
    options: ['A. cleaned', 'B. has cleaned', 'C. had cleaned', 'D. was cleaning'],
    answer: 'C. had cleaned',
    explanation: 'Căn nhà bị bẩn vì không ai dọn dẹp suốt nhiều tuần trước đó ➔ Chia Quá khứ hoàn thành: C. had cleaned.'
  },
  {
    id: 'mcq-m17',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'After he ___ his breakfast, he went to work.',
    options: ['A. had eaten', 'B. ate', 'C. eats', 'D. has eaten'],
    answer: 'A. had eaten',
    explanation: 'Ăn sáng xong trước (Quá khứ hoàn thành sau "After") rồi mới đi làm ➔ Chọn A. had eaten.'
  },
  {
    id: 'mcq-m18',
    type: 'mcq',
    tenseTags: ['Past Perfect Continuous', 'Past Simple'],
    prompt: 'She ___ English for 5 years before she moved to the US.',
    options: ['A. learned', 'B. had been learning', 'C. has learned', 'D. learns'],
    answer: 'B. had been learning',
    explanation: 'Học tiếng Anh liên tục 5 năm trước thời điểm chuyển sang Mỹ ➔ Quá khứ hoàn thành tiếp diễn: B. had been learning.'
  },
  {
    id: 'mcq-m19',
    type: 'mcq',
    tenseTags: ['Past Perfect'],
    prompt: 'It was the first time I ___ such a delicious meal.',
    options: ['A. ate', 'B. have eaten', 'C. had eaten', 'D. eat'],
    answer: 'C. had eaten',
    explanation: 'Cấu trúc "It was the first time + Past Perfect (had eaten)" ➔ Chọn C. had eaten.'
  },
  {
    id: 'mcq-m20',
    type: 'mcq',
    tenseTags: ['Past Perfect'],
    prompt: 'Until last year, I ___ never ___ abroad.',
    options: ['A. have/been', 'B. had/been', 'C. was/being', 'D. did/be'],
    answer: 'B. had/been',
    explanation: 'Tính đến trước mốc năm ngoái "Until last year" chưa từng đi nước ngoài ➔ Quá khứ hoàn thành: B. had/been.'
  },
  {
    id: 'mcq-m21',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'By this time next week, we ___ on the beach.',
    options: ['A. will lie', 'B. will be lying', 'C. have lain', 'D. lay'],
    answer: 'B. will be lying',
    explanation: 'Thời điểm cụ thể trong tương lai "By this time next week" ➔ Chia Tương lai tiếp diễn: B. will be lying.'
  },
  {
    id: 'mcq-m22',
    type: 'mcq',
    tenseTags: ['Future Perfect'],
    prompt: 'By the end of this year, I ___ English for 5 years.',
    options: ['A. will learn', 'B. will be learning', 'C. will have learned', 'D. learned'],
    answer: 'C. will have learned',
    explanation: 'Có "By the end of this year" ➔ Chia Tương lai hoàn thành: C. will have learned.'
  },
  {
    id: 'mcq-m23',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'Don’t call me at 10 p.m. I ___.',
    options: ['A. will sleep', 'B. will be sleeping', 'C. sleep', 'D. slept'],
    answer: 'B. will be sleeping',
    explanation: 'Thời điểm cụ thể 10 p.m lúc đó đang ngủ ➔ Chia Tương lai tiếp diễn: B. will be sleeping.'
  },
  {
    id: 'mcq-m24',
    type: 'mcq',
    tenseTags: ['Future Perfect'],
    prompt: 'They ___ the bridge by next month.',
    options: ['A. will finish', 'B. will be finishing', 'C. will have finished', 'D. finish'],
    answer: 'C. will have finished',
    explanation: 'Có "by next month" ➔ Chia Tương lai hoàn thành: C. will have finished.'
  },
  {
    id: 'mcq-m25',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'At 9 a.m tomorrow, she ___ an important meeting.',
    options: ['A. attends', 'B. will be attending', 'C. will have attended', 'D. attended'],
    answer: 'B. will be attending',
    explanation: 'Thời điểm cụ thể trong tương lai "At 9 a.m tomorrow" ➔ Chia Tương lai tiếp diễn: B. will be attending.'
  },
  {
    id: 'mcq-m26',
    type: 'mcq',
    tenseTags: ['Present Simple', 'Future Perfect'],
    prompt: 'By the time you come back, I ___ the house.',
    options: ['A. will clean', 'B. will have cleaned', 'C. am cleaning', 'D. clean'],
    answer: 'B. will have cleaned',
    explanation: 'Mệnh đề "By the time + Present Simple (come)", mệnh đề chính Tương lai hoàn thành: B. will have cleaned.'
  },
  {
    id: 'mcq-m27',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'This time next year, he ___ in London.',
    options: ['A. will study', 'B. will be studying', 'C. studies', 'D. has studied'],
    answer: 'B. will be studying',
    explanation: 'Thời điểm cụ thể "This time next year" ➔ Chia Tương lai tiếp diễn: B. will be studying.'
  },
  {
    id: 'mcq-m28',
    type: 'mcq',
    tenseTags: ['Future Perfect'],
    prompt: 'By 2030, scientists ___ a cure for cancer.',
    options: ['A. will discover', 'B. will be discovering', 'C. will have discovered', 'D. discover'],
    answer: 'C. will have discovered',
    explanation: 'Có "By 2030" ➔ Chia Tương lai hoàn thành: C. will have discovered.'
  },
  {
    id: 'mcq-m29',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'Can I borrow your car? – Sure, I ___ it tomorrow morning.',
    options: ['A. won’t be using', 'B. won’t use', 'C. don’t use', 'D. haven’t used'],
    answer: 'A. won’t be using',
    explanation: 'Sáng mai tôi sẽ không đang dùng đến xe ➔ Chia Tương lai tiếp diễn: A. won’t be using.'
  },
  {
    id: 'mcq-m30',
    type: 'mcq',
    tenseTags: ['Present Simple', 'Future Perfect'],
    prompt: 'The meeting ___ by the time we get there.',
    options: ['A. will end', 'B. will be ending', 'C. will have ended', 'D. ends'],
    answer: 'C. will have ended',
    explanation: 'Cuộc họp sẽ kết thúc trước khi chúng ta đến ➔ Chia Tương lai hoàn thành: C. will have ended.'
  },
  {
    id: 'mcq-m31',
    type: 'mcq',
    tenseTags: ['Present Perfect Continuous', 'Past Simple'],
    prompt: 'I ___ English since I was 6 years old.',
    options: ['A. learn', 'B. learned', 'C. have been learning', 'D. am learning'],
    answer: 'C. have been learning',
    explanation: 'Học liên tục từ 6 tuổi đến giờ "since I was 6" ➔ Chia Hiện tại hoàn thành tiếp diễn: C. have been learning.'
  },
  {
    id: 'mcq-m32',
    type: 'mcq',
    tenseTags: ['Near Future'],
    prompt: 'Watch out! The car ___ hit you.',
    options: ['A. will', 'B. is going to', 'C. hits', 'D. has hit'],
    answer: 'B. is going to',
    explanation: 'Cảnh báo nguy hiểm ngay trước mắt "Watch out!" ➔ Tương lai gần: B. is going to.'
  },
  {
    id: 'mcq-m33',
    type: 'mcq',
    tenseTags: ['Past Perfect', 'Past Simple'],
    prompt: 'When we got to the cinema, the movie ___ already ___.',
    options: ['A. has/started', 'B. had/started', 'C. started', 'D. starts'],
    answer: 'B. had/started',
    explanation: 'Phim đã chiếu trước (Quá khứ hoàn thành: had started) khi chúng tôi tới rạp.'
  },
  {
    id: 'mcq-m34',
    type: 'mcq',
    tenseTags: ['Conditional', 'Present Simple'],
    prompt: 'If it ___, we will stay at home.',
    options: ['A. rains', 'B. will rain', 'C. rained', 'D. is raining'],
    answer: 'A. rains',
    explanation: 'Câu điều kiện loại 1 ➔ Mệnh đề If chia Hiện tại đơn: A. rains.'
  },
  {
    id: 'mcq-m35',
    type: 'mcq',
    tenseTags: ['Present Simple', 'Present Continuous'],
    prompt: 'He usually ___ to work by bus, but today he ___ by car.',
    options: ['A. go/goes', 'B. goes/is going', 'C. is going/goes', 'D. went/went'],
    answer: 'B. goes/is going',
    explanation: 'Thói quen "usually goes" nhưng hôm nay sự kiện bất ngờ "today is going" ➔ Chọn B. goes/is going.'
  },
  {
    id: 'mcq-m36',
    type: 'mcq',
    tenseTags: ['Present Simple', 'Future Perfect'],
    prompt: 'By the time you get here, I ___ my work.',
    options: ['A. finish', 'B. will finish', 'C. will have finished', 'D. finished'],
    answer: 'C. will have finished',
    explanation: 'By the time + Present Simple (get), mệnh đề chính Tương lai hoàn thành: C. will have finished.'
  },
  {
    id: 'mcq-m37',
    type: 'mcq',
    tenseTags: ['Past Continuous', 'Past Simple'],
    prompt: 'While I ___ for the bus, I saw a thief.',
    options: ['A. wait', 'B. waited', 'C. was waiting', 'D. have waited'],
    answer: 'C. was waiting',
    explanation: 'Đang đợi xe bus (Quá khứ tiếp diễn sau "While") thì nhìn thấy tên trộm (saw) ➔ Chọn C. was waiting.'
  },
  {
    id: 'mcq-m38',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'This is the best book I ___ ever ___.',
    options: ['A. did/read', 'B. have/read', 'C. had/read', 'D. do/read'],
    answer: 'B. have/read',
    explanation: 'Cấu trúc so sánh nhất "the best book I have ever read" ➔ Chọn B. have/read.'
  },
  {
    id: 'mcq-m39',
    type: 'mcq',
    tenseTags: ['Future Simple'],
    prompt: 'I promise I ___ you as soon as I arrive.',
    options: ['A. call', 'B. will call', 'C. am calling', 'D. called'],
    answer: 'B. will call',
    explanation: 'Lời hứa "I promise..." ➔ Chia Tương lai đơn: B. will call.'
  },
  {
    id: 'mcq-m40',
    type: 'mcq',
    tenseTags: ['Present Simple'],
    prompt: 'The earth ___ around the sun.',
    options: ['A. move', 'B. moves', 'C. moved', 'D. is moving'],
    answer: 'B. moves',
    explanation: 'Chân lý tự nhiên hiển nhiên ➔ Chia Hiện tại đơn: B. moves.'
  },

  // --- PREVIOUS MCQ QUESTIONS ---
  {
    id: 'mcq-e1',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'He ___________to New York three times this year.',
    options: ['A. was', 'B. had been', 'C. is', 'D. has been'],
    answer: 'D. has been',
    explanation: 'Trải nghiệm số lần trong năm nay ➔ Chọn D. has been.'
  },
  {
    id: 'mcq-e2',
    type: 'mcq',
    tenseTags: ['Past Simple'],
    prompt: 'The second World War _________________in 1939.',
    options: ['A. started', 'B. starts', 'C. has started', 'D. start'],
    answer: 'A. started',
    explanation: 'Sự kiện lịch sử "in 1939" ➔ Chọn A. started.'
  },
  {
    id: 'mcq-e3',
    type: 'mcq',
    tenseTags: ['Future Simple', 'Present Perfect'],
    prompt: 'We ______ as soon as you have finished your work.',
    options: ['A. will go', 'B. go', 'C. went', 'D. have gone'],
    answer: 'A. will go',
    explanation: 'Mệnh đề thời gian "as soon as + HTHT" ➔ Mệnh đề chính Tương lai đơn: A. will go.'
  },
  {
    id: 'mcq-e4',
    type: 'mcq',
    tenseTags: ['Present Simple', 'Future Perfect'],
    prompt: 'I ______ the book by the time you come tonight.',
    options: ['A. will be finishing', 'B. have finished', 'C. will have finished', 'D. finished'],
    answer: 'C. will have finished',
    explanation: 'Mệnh đề "by the time + Present Simple", mệnh đề chính Tương lai hoàn thành.'
  },
  {
    id: 'mcq-e5',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'Television ___________ very popular since 1950s.',
    options: ['A. has been', 'B. was', 'C. had been', 'D. is'],
    answer: 'A. has been',
    explanation: 'Dấu hiệu "since 1950s" ➔ Chọn A. has been.'
  },
  {
    id: 'mcq-e6',
    type: 'mcq',
    tenseTags: ['Present Continuous'],
    prompt: "Peter _____________ at the moment, so he can't answer the phone.",
    options: ['A. has worked', 'B. is working', 'C. worked', 'D. works'],
    answer: 'B. is working',
    explanation: 'Có "at the moment" ➔ Chọn B. is working.'
  },
  {
    id: 'mcq-e7',
    type: 'mcq',
    tenseTags: ['Present Simple'],
    prompt: "Don't go anywhere until I ______ back.",
    options: ['A. came', 'B. have come', 'C. come', 'D. will come'],
    answer: 'C. come',
    explanation: 'Sau "until" ➔ Chia Hiện tại đơn: C. come.'
  },
  {
    id: 'mcq-e8',
    type: 'mcq',
    tenseTags: ['Past Simple'],
    prompt: 'The King just ____________ here yesterday.',
    options: ['A. had come', 'B. comes', 'C. has come', 'D. came'],
    answer: 'D. came',
    explanation: 'Có "yesterday" ➔ Chia Quá khứ đơn: D. came.'
  },
  {
    id: 'mcq-e9',
    type: 'mcq',
    tenseTags: ['Present Perfect'],
    prompt: 'It is the largest ship I_____________.',
    options: ['A. had seen', 'B. saw', 'C. have ever seen', 'D. see'],
    answer: 'C. have ever seen',
    explanation: 'Cấu trúc so sánh nhất ➔ Chọn C. have ever seen.'
  },
  {
    id: 'mcq-e10',
    type: 'mcq',
    tenseTags: ['Future Continuous'],
    prompt: 'At 8 o’clock this evening, my friends and I ________ a famous film in the cinema.',
    options: ['A. will watch', 'B. watched', 'C. will be watching', 'D. have watched'],
    answer: 'C. will be watching',
    explanation: 'Thời điểm cụ thể trong tương lai ➔ Chia Tương lai tiếp diễn: C. will be watching.'
  }
];

// TAP 3: DẠNG ĐIỀN ĐOẠN VĂN (PARAGRAPH CLOZE EXERCISES)
export const paragraphClozeExercises: ParagraphClozeExercise[] = [
  {
    id: 'paragraph-1',
    title: 'Đoạn Văn 1: Chuyến Thăm Ông Bà Cuối Tuần (12 chỗ điền)',
    story: `Last weekend, I (1) [decide] to visit my grandparents who (2) [live] in the countryside for many years. When I (3) [arrive], they (4) [prepare] lunch in the kitchen. My grandmother (5) [cook] while my grandfather (6) [set] the table.

After lunch, we (7) [sit] in the garden and (8) [talk] about many things. My grandfather told me that he (9) [plant] several trees in the garden last year. He also said that by next summer, those trees (10) [grow] much taller.

Before I left, my grandmother told me that they (11) [plan] to visit the city next month. She asked if I (12) [be] free to show them around.`,
    gaps: [
      { number: 1, verb: 'decide', answer: 'decided', acceptedAnswers: ['decided'], explanation: 'Quá khứ đơn (kể về chuyện tuần trước "Last weekend").' },
      { number: 2, verb: 'live', answer: 'had lived', acceptedAnswers: ['had lived', 'had been living', 'lived'], explanation: 'Sống ở quê nhiều năm trước thời điểm chuyến thăm ➔ Quá khứ hoàn thành: had lived.' },
      { number: 3, verb: 'arrive', answer: 'arrived', acceptedAnswers: ['arrived'], explanation: 'Hành động đến nơi chia Quá khứ đơn.' },
      { number: 4, verb: 'prepare', answer: 'were preparing', acceptedAnswers: ['were preparing'], explanation: 'Lúc tôi đến thì ông bà đang chuẩn bị cơm ➔ Quá khứ tiếp diễn: were preparing.' },
      { number: 5, verb: 'cook', answer: 'was cooking', acceptedAnswers: ['was cooking'], explanation: 'Bà đang nấu ăn (trong khi ông đang dọn bàn) ➔ Quá khứ tiếp diễn: was cooking.' },
      { number: 6, verb: 'set', answer: 'was setting', acceptedAnswers: ['was setting'], explanation: 'Ông đang dọn bàn ➔ Quá khứ tiếp diễn: was setting.' },
      { number: 7, verb: 'sit', answer: 'sat', acceptedAnswers: ['sat'], explanation: 'Hành động nối tiếp trong quá khứ ➔ Quá khứ đơn: sat.' },
      { number: 8, verb: 'talk', answer: 'talked', acceptedAnswers: ['talked'], explanation: 'Hành động nối tiếp trong quá khứ ➔ Quá khứ đơn: talked.' },
      { number: 9, verb: 'plant', answer: 'had planted', acceptedAnswers: ['had planted', 'planted'], explanation: 'Ông trồng cây năm ngoái trước thời điểm nói ➔ Quá khứ hoàn thành/đơn: had planted.' },
      { number: 10, verb: 'grow', answer: 'would grow', acceptedAnswers: ['would grow', 'would have grown', 'will grow'], explanation: 'Lời nói gián tiếp "said that by next summer..." ➔ lùi thì: would grow.' },
      { number: 11, verb: 'plan', answer: 'were planning', acceptedAnswers: ['were planning', 'planned'], explanation: 'Bà nói họ đang lên kế hoạch ➔ Quá khứ tiếp diễn/đơn: were planning.' },
      { number: 12, verb: 'be', answer: 'was', acceptedAnswers: ['was', 'would be'], explanation: 'Câu hỏi gián tiếp "if I..." ➔ chia Quá khứ đơn: was.' }
    ]
  },
  {
    id: 'paragraph-2',
    title: 'Đoạn Văn 2: Chuyến Đi Dạo Công Viên Gặp Mưa (10 chỗ điền)',
    story: `Last Sunday, I (1) [decide] to go for a walk in the park. While I (2) [walk] along the path, I suddenly (3) [see] a dark cloud in the sky. Then it (4) [start] to rain heavily. I (5) [realize] that I (6) [leave] my umbrella at home. People (7) [run] for shelter everywhere. I (8) [try] to run to a nearby cafe. When I arrived, I (9) [be] wet through. Luckily, I (10) [have] a hot coffee to warm myself up.`,
    gaps: [
      { number: 1, verb: 'decide', answer: 'decided', acceptedAnswers: ['decided'], explanation: 'Chuyện xảy ra Chủ nhật tuần trước ➔ Quá khứ đơn: decided.' },
      { number: 2, verb: 'walk', answer: 'was walking', acceptedAnswers: ['was walking'], explanation: 'Hành động đang diễn ra (sau While) ➔ Quá khứ tiếp diễn: was walking.' },
      { number: 3, verb: 'see', answer: 'saw', acceptedAnswers: ['saw'], explanation: 'Hành động bất ngờ xen vào ➔ Quá khứ đơn: saw.' },
      { number: 4, verb: 'start', answer: 'started', acceptedAnswers: ['started', 'began'], explanation: 'Trời bắt đầu mưa ➔ Quá khứ đơn: started.' },
      { number: 5, verb: 'realize', answer: 'realized', acceptedAnswers: ['realized', 'remembered'], explanation: 'Tôi nhận ra ➔ Quá khứ đơn: realized.' },
      { number: 6, verb: 'leave', answer: 'had left', acceptedAnswers: ['had left', 'forgot'], explanation: 'Đã quên ô ở nhà từ trước khi đi ➔ Quá khứ hoàn thành: had left.' },
      { number: 7, verb: 'run', answer: 'were running', acceptedAnswers: ['were running'], explanation: 'Mọi người đang chạy tìm chỗ trú ➔ Quá khứ tiếp diễn: were running.' },
      { number: 8, verb: 'try', answer: 'tried', acceptedAnswers: ['tried'], explanation: 'Hành động tiếp theo ➔ Quá khứ đơn: tried.' },
      { number: 9, verb: 'be', answer: 'was', acceptedAnswers: ['was'], explanation: 'Khi đến nơi thì ướt sũng ➔ Quá khứ đơn: was.' },
      { number: 10, verb: 'have', answer: 'had', acceptedAnswers: ['had', 'drank', 'ordered'], explanation: 'Uống một ly cà phê nóng ➔ Quá khứ đơn: had.' }
    ]
  },
  {
    id: 'paragraph-3',
    title: 'Đoạn Văn 3: Về Nhà Muộn & Cuộc Gọi Của Sếp (11 chỗ điền)',
    story: `When I (1) [arrive] home last night, everyone (2) [sleep]. I (3) [try] to be quiet because I (4) [not want] to wake them up. I (5) [go] to the kitchen and (6) [make] a sandwich. While I (7) [eat], the phone (8) [ring]. It was my boss. He asked: "Have you (9) [finish] the report yet?". I replied: "No, I (10) [do] it right now and I (11) [send] it to you by tomorrow morning."`,
    gaps: [
      { number: 1, verb: 'arrive', answer: 'arrived', acceptedAnswers: ['arrived'], explanation: 'Khi tôi về nhà tối qua ➔ Quá khứ đơn: arrived.' },
      { number: 2, verb: 'sleep', answer: 'was sleeping', acceptedAnswers: ['was sleeping', 'were sleeping'], explanation: 'Mọi người đang ngủ ➔ Quá khứ tiếp diễn: was/were sleeping.' },
      { number: 3, verb: 'try', answer: 'tried', acceptedAnswers: ['tried'], explanation: 'Tôi đã cố gắng giữ yên lặng ➔ Quá khứ đơn: tried.' },
      { number: 4, verb: 'not want', answer: "didn't want", acceptedAnswers: ["didn't want", "did not want"], explanation: 'Vì tôi không muốn đánh thức họ ➔ Quá khứ đơn phủ định: didn\'t want.' },
      { number: 5, verb: 'go', answer: 'went', acceptedAnswers: ['went'], explanation: 'Vào nhà bếp ➔ Quá khứ đơn: went.' },
      { number: 6, verb: 'make', answer: 'made', acceptedAnswers: ['made'], explanation: 'Làm bánh mì ➔ Quá khứ đơn: made.' },
      { number: 7, verb: 'eat', answer: 'was eating', acceptedAnswers: ['was eating'], explanation: 'Trong khi tôi đang ăn (sau While) ➔ Quá khứ tiếp diễn: was eating.' },
      { number: 8, verb: 'ring', answer: 'rang', acceptedAnswers: ['rang'], explanation: 'Điện thoại reo ➔ Quá khứ đơn: rang.' },
      { number: 9, verb: 'finish', answer: 'finished', acceptedAnswers: ['finished'], explanation: 'Thì Hiện tại hoàn thành với yet (Have you finished...): finished.' },
      { number: 10, verb: 'do', answer: 'am doing', acceptedAnswers: ['am doing', "'m doing"], explanation: 'Có dấu hiệu "right now" ➔ Hiện tại tiếp diễn: am doing.' },
      { number: 11, verb: 'send', answer: 'will send', acceptedAnswers: ['will send', "'ll send"], explanation: 'Lời hứa gửi trước sáng mai "by tomorrow morning" ➔ Tương lai đơn: will send.' }
    ]
  }
];

// Fallback for single object compatibility
export const paragraphClozeData: ParagraphClozeExercise = paragraphClozeExercises[0];
