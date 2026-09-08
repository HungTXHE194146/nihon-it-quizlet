import type { Lesson } from './lessons';

export interface EngWordItem {
  id: string;
  term: string;          // Từ tiếng Anh
  ipa: string;           // Phiên âm chuẩn
  answer: string;        // Nghĩa tiếng Việt
  meaning: string;       // Nghĩa chi tiết
  partOfSpeech: 'Noun' | 'Verb' | 'Adjective/Adverb' | 'Grammar/Connector';
  topic: string;
  example: string;       // Câu ví dụ tiếng Anh
  exampleMeaning: string;// Dịch nghĩa câu ví dụ
}

export const engGrade9Words: EngWordItem[] = [
  // --- TOPIC 1: Daily Life & Routines (Đời sống & Sinh hoạt hàng ngày) ---
  {
    id: 'eng-1',
    term: 'study',
    ipa: '/ˈstʌdi/',
    answer: 'học, nghiên cứu',
    meaning: 'học, nghiên cứu',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'I study English every morning.',
    exampleMeaning: 'Tôi học tiếng Anh mỗi buổi sáng.'
  },
  {
    id: 'eng-2',
    term: 'student',
    ipa: '/ˈstjuːdnt/',
    answer: 'học sinh, sinh viên',
    meaning: 'học sinh, sinh viên',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'She is a hard-working student in grade 9.',
    exampleMeaning: 'Cô ấy là một học sinh chăm chỉ lớp 9.'
  },
  {
    id: 'eng-3',
    term: 'hard-working',
    ipa: '/ˌhɑːd ˈwɜːkɪŋ/',
    answer: 'chăm chỉ, cần cù',
    meaning: 'chăm chỉ, cần cù',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Daily Life & Routines',
    example: 'He is a very hard-working boy.',
    exampleMeaning: 'Cậu ấy là một cậu bé rất chăm chỉ.'
  },
  {
    id: 'eng-4',
    term: 'have',
    ipa: '/hæv/',
    answer: 'có, dùng (bữa)',
    meaning: 'có, sở hữu, dùng bữa',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'We have breakfast together at 7 AM.',
    exampleMeaning: 'Chúng tôi ăn sáng cùng nhau lúc 7 giờ sáng.'
  },
  {
    id: 'eng-5',
    term: 'breakfast',
    ipa: '/ˈbrekfəst/',
    answer: 'bữa sáng',
    meaning: 'bữa ăn đầu tiên trong ngày',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'What did you eat for breakfast?',
    exampleMeaning: 'Bạn đã ăn gì cho bữa sáng?'
  },
  {
    id: 'eng-6',
    term: 'lunch',
    ipa: '/lʌntʃ/',
    answer: 'bữa trưa',
    meaning: 'bữa ăn buổi trưa',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'They usually eat lunch at the school canteen.',
    exampleMeaning: 'Họ thường ăn trưa ở căng tin trường.'
  },
  {
    id: 'eng-7',
    term: 'dinner',
    ipa: '/ˈdɪnər/',
    answer: 'bữa tối',
    meaning: 'bữa ăn chính vào buổi tối',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'My mother is cooking dinner in the kitchen.',
    exampleMeaning: 'Mẹ tôi đang nấu bữa tối trong bếp.'
  },
  {
    id: 'eng-8',
    term: 'live',
    ipa: '/lɪv/',
    answer: 'sống, cư trú',
    meaning: 'sinh sống, ở',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'Where do you live?',
    exampleMeaning: 'Bạn sống ở đâu?'
  },
  {
    id: 'eng-9',
    term: 'work',
    ipa: '/wɜːk/',
    answer: 'làm việc, công việc',
    meaning: 'làm việc, lao động',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'My father works in a big bank.',
    exampleMeaning: 'Bố tôi làm việc trong một ngân hàng lớn.'
  },
  {
    id: 'eng-10',
    term: 'stay',
    ipa: '/steɪ/',
    answer: 'ở lại, trú lại',
    meaning: 'ở lại một nơi nào đó',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'I stay at home on rainy days.',
    exampleMeaning: 'Tôi ở nhà vào những ngày mưa.'
  },
  {
    id: 'eng-11',
    term: 'wash',
    ipa: '/wɒʃ/',
    answer: 'rửa, giặt',
    meaning: 'rửa sạch, giặt giũ',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'Remember to wash your hands before eating.',
    exampleMeaning: 'Hãy nhớ rửa tay trước khi ăn.'
  },
  {
    id: 'eng-12',
    term: 'do',
    ipa: '/duː/',
    answer: 'làm, thực hiện',
    meaning: 'làm hành động nào đó',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'I always do my homework after dinner.',
    exampleMeaning: 'Tôi luôn làm bài tập về nhà sau bữa tối.'
  },
  {
    id: 'eng-13',
    term: 'homework',
    ipa: '/ˈhəʊmwɜːk/',
    answer: 'bài tập về nhà',
    meaning: 'bài tập thầy cô giao về nhà',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'Have you finished your English homework?',
    exampleMeaning: 'Bạn đã làm xong bài tập về nhà tiếng Anh chưa?'
  },
  {
    id: 'eng-14',
    term: 'bed',
    ipa: '/bed/',
    answer: 'cái giường',
    meaning: 'giường ngủ',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'He goes to bed at 10 PM.',
    exampleMeaning: 'Cậu ấy đi ngủ lúc 10 giờ tối.'
  },
  {
    id: 'eng-15',
    term: 'eat',
    ipa: '/iːt/',
    answer: 'ăn',
    meaning: 'ăn thực phẩm',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'We eat fresh vegetables every day.',
    exampleMeaning: 'Chúng tôi ăn rau tươi mỗi ngày.'
  },
  {
    id: 'eng-16',
    term: 'sleep',
    ipa: '/sliːp/',
    answer: 'ngủ',
    meaning: 'ngủ nghỉ',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'The baby is sleeping soundly.',
    exampleMeaning: 'Em bé đang ngủ rất ngon.'
  },
  {
    id: 'eng-17',
    term: 'read',
    ipa: '/riːd/',
    answer: 'đọc',
    meaning: 'đọc sách, chữ',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'She likes to read books in her free time.',
    exampleMeaning: 'Cô ấy thích đọc sách vào thời gian rảnh.'
  },
  {
    id: 'eng-18',
    term: 'sit',
    ipa: '/sɪt/',
    answer: 'ngồi',
    meaning: 'ngồi xuống',
    partOfSpeech: 'Verb',
    topic: 'Daily Life & Routines',
    example: 'They sit in the garden and talk.',
    exampleMeaning: 'Họ ngồi trong vườn và trò chuyện.'
  },
  {
    id: 'eng-19',
    term: 'doorbell',
    ipa: '/ˈdɔːbel/',
    answer: 'chuông cửa',
    meaning: 'chuông bấm ở cổng/cửa',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'The doorbell is ringing right now.',
    exampleMeaning: 'Chuông cửa đang reo ngay bây giờ.'
  },

  // --- TOPIC 2: Places, Transport & Shops (Địa điểm, Giao thông & Cửa hàng) ---
  {
    id: 'eng-20',
    term: 'bank',
    ipa: '/bæŋk/',
    answer: 'ngân hàng',
    meaning: 'ngân hàng',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'She went to the bank to withdraw money.',
    exampleMeaning: 'Cô ấy đến ngân hàng để rút tiền.'
  },
  {
    id: 'eng-21',
    term: 'car',
    ipa: '/kɑːr/',
    answer: 'ô tô, xe hơi',
    meaning: 'xe ô tô',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'My uncle bought a new car.',
    exampleMeaning: 'Chú tôi đã mua một chiếc ô tô mới.'
  },
  {
    id: 'eng-22',
    term: 'yard',
    ipa: '/jɑːd/',
    answer: 'cái sân',
    meaning: 'khoảng sân trước hoặc sau nhà',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'Children are playing in the front yard.',
    exampleMeaning: 'Bọn trẻ đang chơi ngoài sân trước.'
  },
  {
    id: 'eng-23',
    term: 'university',
    ipa: '/ˌjuːnɪˈvɜːsəti/',
    answer: 'trường đại học',
    meaning: 'trường đại học',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'He studies IT at a famous university.',
    exampleMeaning: 'Anh ấy học IT tại một trường đại học nổi tiếng.'
  },
  {
    id: 'eng-24',
    term: 'country',
    ipa: '/ˈkʌntri/',
    answer: 'đất nước, quốc gia',
    meaning: 'đất nước, vùng nông thôn',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'Vietnam is a beautiful country.',
    exampleMeaning: 'Việt Nam là một đất nước xinh đẹp.'
  },
  {
    id: 'eng-25',
    term: 'park',
    ipa: '/pɑːk/',
    answer: 'công viên',
    meaning: 'công viên cây xanh',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'We go walking in the park every afternoon.',
    exampleMeaning: 'Chúng tôi đi dạo trong công viên mỗi chiều.'
  },
  {
    id: 'eng-26',
    term: 'train',
    ipa: '/treɪn/',
    answer: 'tàu hỏa, xe lửa',
    meaning: 'tàu hỏa',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'The train arrives at the station on time.',
    exampleMeaning: 'Tàu hỏa đến ga đúng giờ.'
  },
  {
    id: 'eng-27',
    term: 'center',
    ipa: '/ˈsentər/',
    answer: 'trung tâm',
    meaning: 'trung tâm',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'I learn English at the language center.',
    exampleMeaning: 'Tôi học tiếng Anh tại trung tâm ngoại ngữ.'
  },
  {
    id: 'eng-28',
    term: 'company',
    ipa: '/ˈkʌmpəni/',
    answer: 'công ty, doanh nghiệp',
    meaning: 'công ty',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'Our company develops innovative products.',
    exampleMeaning: 'Công ty chúng tôi phát triển các sản phẩm sáng tạo.'
  },
  {
    id: 'eng-29',
    term: 'market',
    ipa: '/ˈmɑːkɪt/',
    answer: 'thị trường, chợ',
    meaning: 'thị trường hoặc chợ mua bán',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'My mother buys fresh fruit at the local market.',
    exampleMeaning: 'Mẹ tôi mua trái cây tươi ở chợ địa phương.'
  },
  {
    id: 'eng-30',
    term: 'restaurant',
    ipa: '/ˈrestrɒnt/',
    answer: 'nhà hàng',
    meaning: 'nhà hàng ăn uống',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'They had dinner at a Italian restaurant.',
    exampleMeaning: 'Họ đã ăn tối tại một nhà hàng Ý.'
  },
  {
    id: 'eng-31',
    term: 'parking lot',
    ipa: '/ˈpɑːkɪŋ lɒt/',
    answer: 'bãi đỗ xe',
    meaning: 'bãi đậu xe ô tô',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'He drove around the parking lot to find a space.',
    exampleMeaning: 'Anh ấy lái xe quanh bãi đỗ xe để tìm chỗ.'
  },
  {
    id: 'eng-32',
    term: 'space',
    ipa: '/speɪs/',
    answer: 'không gian, chỗ trống',
    meaning: 'không gian, khoảng trống',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'There is no empty space left in the room.',
    exampleMeaning: 'Không còn chỗ trống nào trong phòng.'
  },
  {
    id: 'eng-33',
    term: 'place',
    ipa: '/pleɪs/',
    answer: 'địa điểm, nơi chốn',
    meaning: 'địa điểm, vị trí',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'This is a peaceful place to relax.',
    exampleMeaning: 'Đây là một nơi yên bình để thư giãn.'
  },
  {
    id: 'eng-34',
    term: 'store',
    ipa: '/stɔːr/',
    answer: 'cửa hàng',
    meaning: 'tiệm, cửa hàng bán lẻ',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'She went to the convenience store to buy bread.',
    exampleMeaning: 'Cô ấy đến cửa hàng tiện lợi để mua bánh mì.'
  },
  {
    id: 'eng-35',
    term: 'garden',
    ipa: '/ˈɡɑːdn/',
    answer: 'mảnh vườn, khu vườn',
    meaning: 'khu vườn trồng hoa/cây',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'There are colorful flowers in her garden.',
    exampleMeaning: 'Có những bông hoa rực rỡ sắc màu trong vườn cô ấy.'
  },
  {
    id: 'eng-36',
    term: 'street',
    ipa: '/striːt/',
    answer: 'con đường, con phố',
    meaning: 'đường phố',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'Don’t play ball on the busy street.',
    exampleMeaning: 'Đừng chơi bóng trên con phố đông đúc.'
  },

  // --- TOPIC 3: Time, Seasons & Weather (Thời gian, Mùa & Thời tiết) ---
  {
    id: 'eng-37',
    term: 'weekend',
    ipa: '/ˌwiːkˈend/',
    answer: 'cuối tuần',
    meaning: 'thứ bảy và chủ nhật',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'What do you often do at the weekend?',
    exampleMeaning: 'Bạn thường làm gì vào cuối tuần?'
  },
  {
    id: 'eng-38',
    term: 'today',
    ipa: '/təˈdeɪ/',
    answer: 'hôm nay',
    meaning: 'ngày hôm nay',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Today is a sunny day.',
    exampleMeaning: 'Hôm nay là một ngày nắng đẹp.'
  },
  {
    id: 'eng-39',
    term: 'morning',
    ipa: '/ˈmɔːnɪŋ/',
    answer: 'buổi sáng',
    meaning: 'buổi sáng',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Good morning, class!',
    exampleMeaning: 'Chào buổi sáng cả lớp!'
  },
  {
    id: 'eng-40',
    term: 'afternoon',
    ipa: '/ˌɑːftəˈnuːn/',
    answer: 'buổi chiều',
    meaning: 'buổi chiều',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'We have English lessons in the afternoon.',
    exampleMeaning: 'Chúng tôi có tiết học tiếng Anh vào buổi chiều.'
  },
  {
    id: 'eng-41',
    term: 'midnight',
    ipa: '/ˈmɪdnaɪt/',
    answer: 'nửa đêm',
    meaning: '12 giờ đêm',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'The plane landed at midnight.',
    exampleMeaning: 'Máy bay đã hạ cánh lúc nửa đêm.'
  },
  {
    id: 'eng-42',
    term: 'year',
    ipa: '/jɪər/',
    answer: 'năm',
    meaning: 'năm (365 ngày)',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Happy New Year!',
    exampleMeaning: 'Chúc mừng năm mới!'
  },
  {
    id: 'eng-43',
    term: 'month',
    ipa: '/mʌnθ/',
    answer: 'tháng',
    meaning: 'tháng trong năm',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'February is the shortest month of the year.',
    exampleMeaning: 'Tháng hai là tháng ngắn nhất trong năm.'
  },
  {
    id: 'eng-44',
    term: 'day',
    ipa: '/deɪ/',
    answer: 'ngày',
    meaning: 'ngày',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Have a nice day!',
    exampleMeaning: 'Chúc bạn một ngày tốt lành!'
  },
  {
    id: 'eng-45',
    term: 'summer',
    ipa: '/ˈsʌmər/',
    answer: 'mùa hè',
    meaning: 'mùa hè nực',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Students have summer vacation in June.',
    exampleMeaning: 'Học sinh có kỳ nghỉ hè vào tháng Sáu.'
  },
  {
    id: 'eng-46',
    term: 'spring',
    ipa: '/sprɪŋ/',
    answer: 'mùa xuân',
    meaning: 'mùa xuân hoa nở',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Trees turn green in spring.',
    exampleMeaning: 'Cây cối đâm chồi xanh tươi vào mùa xuân.'
  },
  {
    id: 'eng-47',
    term: 'autumn',
    ipa: '/ˈɔːtəm/',
    answer: 'mùa thu',
    meaning: 'mùa thu lá rơi',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Leaves fall off trees in autumn.',
    exampleMeaning: 'Lá cây rụng vào mùa thu.'
  },
  {
    id: 'eng-48',
    term: 'winter',
    ipa: '/ˈwɪntər/',
    answer: 'mùa đông',
    meaning: 'mùa đông lạnh',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'It is very cold in winter.',
    exampleMeaning: 'Trời rất lạnh vào mùa đông.'
  },
  {
    id: 'eng-49',
    term: 'yesterday',
    ipa: '/ˈjestədeɪ/',
    answer: 'hôm qua',
    meaning: 'ngày hôm qua',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'I met him at the supermarket yesterday.',
    exampleMeaning: 'Tôi đã gặp anh ấy ở siêu thị hôm qua.'
  },
  {
    id: 'eng-50',
    term: 'time',
    ipa: '/taɪm/',
    answer: 'thời gian, giờ giấc',
    meaning: 'thời gian',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'What time is it now?',
    exampleMeaning: 'Bây giờ là mấy giờ rồi?'
  },
  {
    id: 'eng-51',
    term: 'rain',
    ipa: '/reɪn/',
    answer: 'cơn mưa, mưa',
    meaning: 'trời mưa hoặc cơn mưa',
    partOfSpeech: 'Verb',
    topic: 'Time, Seasons & Weather',
    example: 'It suddenly began to rain.',
    exampleMeaning: 'Trời đột nhiên bắt đầu mưa.'
  },
  {
    id: 'eng-52',
    term: 'snow',
    ipa: '/snəʊ/',
    answer: 'tuyết, tuyết rơi',
    meaning: 'tuyết',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'The mountain is covered with white snow.',
    exampleMeaning: 'Ngọn núi phủ đầy tuyết trắng.'
  },
  {
    id: 'eng-53',
    term: 'snowman',
    ipa: '/ˈsnəʊmæn/',
    answer: 'người tuyết',
    meaning: 'hình nặn người bằng tuyết',
    partOfSpeech: 'Noun',
    topic: 'Time, Seasons & Weather',
    example: 'Children build a snowman in winter.',
    exampleMeaning: 'Trẻ em đắp người tuyết vào mùa đông.'
  },

  // --- TOPIC 4: Actions & Movement (Hành động & Di chuyển) ---
  {
    id: 'eng-54',
    term: 'open',
    ipa: '/ˈəʊpən/',
    answer: 'mở',
    meaning: 'mở ra',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Please open your window.',
    exampleMeaning: 'Xin vui lòng mở cửa sổ ra.'
  },
  {
    id: 'eng-55',
    term: 'skate',
    ipa: '/skeɪt/',
    answer: 'trượt băng, trượt patin',
    meaning: 'trượt băng',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'She can skate very well.',
    exampleMeaning: 'Cô ấy có thể trượt băng rất giỏi.'
  },
  {
    id: 'eng-56',
    term: 'throw',
    ipa: '/θrəʊ/',
    answer: 'ném, quăng',
    meaning: 'ném vật gì đi',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Don’t throw stones at birds.',
    exampleMeaning: 'Đừng ném đá vào chim.'
  },
  {
    id: 'eng-57',
    term: 'arrive',
    ipa: '/əˈraɪv/',
    answer: 'đến nơi, tới',
    meaning: 'đến một nơi nào đó',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'We arrived at the airport early.',
    exampleMeaning: 'Chúng tôi đến sân bay sớm.'
  },
  {
    id: 'eng-58',
    term: 'finish',
    ipa: '/ˈfɪnɪʃ/',
    answer: 'hoàn thành, kết thúc',
    meaning: 'hoàn thành công việc',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'I will finish my project tomorrow.',
    exampleMeaning: 'Tôi sẽ hoàn thành dự án của mình vào ngày mai.'
  },
  {
    id: 'eng-59',
    term: 'travel',
    ipa: '/ˈtrævl/',
    answer: 'du lịch, đi lại',
    meaning: 'đi du lịch nhiều nơi',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'They love to travel around the world.',
    exampleMeaning: 'Họ thích đi du lịch vòng quanh thế giới.'
  },
  {
    id: 'eng-60',
    term: 'teach',
    ipa: '/tiːtʃ/',
    answer: 'dạy học, giảng dạy',
    meaning: 'dạy học',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Mr. John teaches English at our school.',
    exampleMeaning: 'Thầy John dạy tiếng Anh tại trường chúng tôi.'
  },
  {
    id: 'eng-61',
    term: 'get into',
    ipa: '/ɡet ˈɪntə/',
    answer: 'đi vào, đỗ vào',
    meaning: 'đi vào trong, trúng tuyển',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He wants to get into a top university.',
    exampleMeaning: 'Cậu ấy muốn đỗ vào một trường đại học hàng đầu.'
  },
  {
    id: 'eng-62',
    term: 'develop',
    ipa: '/dɪˈveləp/',
    answer: 'phát triển',
    meaning: 'phát triển sản phẩm/kỹ năng',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'We develop new software for online learning.',
    exampleMeaning: 'Chúng tôi phát triển phần mềm mới cho học trực tuyến.'
  },
  {
    id: 'eng-63',
    term: 'achieve',
    ipa: '/əˈtʃiːv/',
    answer: 'đạt được, giành được',
    meaning: 'đạt được mục tiêu',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Work hard to achieve your goals.',
    exampleMeaning: 'Hãy nỗ lực làm việc để đạt được mục tiêu của bạn.'
  },
  {
    id: 'eng-64',
    term: 'drive',
    ipa: '/draɪv/',
    answer: 'lái xe',
    meaning: 'điều khiển xe ô tô',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He drives to work every day.',
    exampleMeaning: 'Anh ấy lái xe đi làm mỗi ngày.'
  },
  {
    id: 'eng-65',
    term: 'find',
    ipa: '/faɪnd/',
    answer: 'tìm thấy, phát hiện',
    meaning: 'tìm thấy vật/thông tin',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Did you find your missing key?',
    exampleMeaning: 'Bạn đã tìm thấy chiếc chìa khóa bị mất chưa?'
  },
  {
    id: 'eng-66',
    term: 'ask',
    ipa: '/ɑːsk/',
    answer: 'hỏi, yêu cầu',
    meaning: 'hỏi thông tin',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Feel free to ask questions.',
    exampleMeaning: 'Hãy thoải mái đặt câu hỏi.'
  },
  {
    id: 'eng-67',
    term: 'say',
    ipa: '/seɪ/',
    answer: 'nói',
    meaning: 'nói lời nào đó',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'What did he say to you?',
    exampleMeaning: 'Anh ấy đã nói gì với bạn?'
  },
  {
    id: 'eng-68',
    term: 'forget',
    ipa: '/fəˈɡet/',
    answer: 'quên',
    meaning: 'quên điều gì',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Don’t forget to turn off the lights.',
    exampleMeaning: 'Đừng quên tắt đèn.'
  },
  {
    id: 'eng-69',
    term: 'tell',
    ipa: '/tel/',
    answer: 'nói, kể cho ai',
    meaning: 'kể câu chuyện/nói với ai',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Can you tell me a secret?',
    exampleMeaning: 'Bạn có thể kể cho tôi một bí mật không?'
  },
  {
    id: 'eng-70',
    term: 'walk',
    ipa: '/wɔːk/',
    answer: 'đi bộ, tản bộ',
    meaning: 'đi bộ',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'She walks along the street every morning.',
    exampleMeaning: 'Cô ấy đi bộ dọc theo con phố mỗi buổi sáng.'
  },
  {
    id: 'eng-71',
    term: 'see',
    ipa: '/siː/',
    answer: 'nhìn thấy, quan sát',
    meaning: 'nhìn thấy bằng mắt',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'I can see the mountains from here.',
    exampleMeaning: 'Tôi có thể nhìn thấy ngọn núi từ đây.'
  },
  {
    id: 'eng-72',
    term: 'buy',
    ipa: '/baɪ/',
    answer: 'mua',
    meaning: 'mua đồ vật bằng tiền',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He bought some milk at the store.',
    exampleMeaning: 'Anh ấy đã mua một ít sữa ở cửa hàng.'
  },
  {
    id: 'eng-73',
    term: 'ring',
    ipa: '/rɪŋ/',
    answer: 'reo, rung chuông',
    meaning: 'phát ra tiếng chuông',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'The phone rang while I was cooking.',
    exampleMeaning: 'Điện thoại reo khi tôi đang nấu ăn.'
  },
  {
    id: 'eng-74',
    term: 'happen',
    ipa: '/ˈhæpən/',
    answer: 'xảy ra, diễn ra',
    meaning: 'xảy ra sự việc',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'An accident happened on the main street.',
    exampleMeaning: 'Một vụ tai nạn đã xảy ra trên con đường chính.'
  },
  {
    id: 'eng-75',
    term: 'go out',
    ipa: '/ɡəʊ aʊt/',
    answer: 'tắt (đèn), đi ra ngoài',
    meaning: 'đèn bị tắt hoặc đi ra ngoài chơi',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Suddenly, all the lights went out.',
    exampleMeaning: 'Đột nhiên, tất cả đèn đều tắt phụt.'
  },
  {
    id: 'eng-76',
    term: 'come on',
    ipa: '/kʌm ɒn/',
    answer: 'lại quay trở lại, cố lên',
    meaning: 'đi tiếp, điện sáng lại',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'The lights came on again after a few minutes.',
    exampleMeaning: 'Đèn đã sáng trở lại sau vài phút.'
  },
  {
    id: 'eng-77',
    term: 'begin',
    ipa: '/bɪˈɡɪn/',
    answer: 'bắt đầu',
    meaning: 'bắt đầu khởi đầu',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Class begins at 8:00 AM sharp.',
    exampleMeaning: 'Lớp học bắt đầu lúc đúng 8 giờ sáng.'
  },
  {
    id: 'eng-78',
    term: 'leave',
    ipa: '/liːv/',
    answer: 'rời đi, bỏ lại',
    meaning: 'rời khỏi nơi nào đó',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He left the house 10 minutes ago.',
    exampleMeaning: 'Anh ấy đã rời nhà 10 phút trước.'
  },
  {
    id: 'eng-79',
    term: 'fall',
    ipa: '/fɔːl/',
    answer: 'rơi, ngã',
    meaning: 'rơi từ trên cao xuống',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Snowflakes fall softly from the sky.',
    exampleMeaning: 'Những bông tuyết rơi nhẹ nhàng từ bầu trời.'
  },
  {
    id: 'eng-80',
    term: 'feel',
    ipa: '/fiːl/',
    answer: 'cảm thấy, nhận thấy',
    meaning: 'cảm giác, cảm thấy',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'I feel very happy today.',
    exampleMeaning: 'Tôi cảm thấy rất hạnh phúc hôm nay.'
  },
  {
    id: 'eng-81',
    term: 'hit',
    ipa: '/hɪt/',
    answer: 'đánh, đập, trúng',
    meaning: 'va chạm, đánh trúng',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He felt something hit his shoulder.',
    exampleMeaning: 'Anh ấy cảm thấy có cái gì đó đập trúng vai mình.'
  },

  // --- TOPIC 5: People, Family & Careers (Con người, Gia đình & Nghề nghiệp) ---
  {
    id: 'eng-82',
    term: 'child',
    ipa: '/tʃaɪld/',
    answer: 'đứa trẻ, con cái',
    meaning: 'trẻ nhỏ',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'The child is playing happily in the garden.',
    exampleMeaning: 'Đứa trẻ đang chơi vui vẻ trong vườn.'
  },
  {
    id: 'eng-83',
    term: 'brother',
    ipa: '/ˈbrʌðər/',
    answer: 'anh trai, em trai',
    meaning: 'anh em trai',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'My elder brother goes to university.',
    exampleMeaning: 'Anh trai tôi học đại học.'
  },
  {
    id: 'eng-84',
    term: 'friend',
    ipa: '/frend/',
    answer: 'bạn bè, người bạn',
    meaning: 'người bạn',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'She is my best friend at school.',
    exampleMeaning: 'Cô ấy là bạn thân nhất của tôi ở trường.'
  },
  {
    id: 'eng-85',
    term: 'client',
    ipa: '/ˈklaɪənt/',
    answer: 'khách hàng',
    meaning: 'khách hàng của công ty/dịch vụ',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'Our company always listens to clients.',
    exampleMeaning: 'Công ty chúng tôi luôn lắng nghe khách hàng.'
  },
  {
    id: 'eng-86',
    term: 'waitress',
    ipa: '/ˈweɪtrəs/',
    answer: 'nữ phục vụ (bồi bàn nữ)',
    meaning: 'nhân viên phục vụ nữ trong nhà hàng',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'The waitress brought us fresh water.',
    exampleMeaning: 'Nữ phục vụ mang nước tươi cho chúng tôi.'
  },
  {
    id: 'eng-87',
    term: 'waiter',
    ipa: '/ˈweɪtər/',
    answer: 'nam phục vụ (bồi bàn nam)',
    meaning: 'nhân viên phục vụ nam trong nhà hàng',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'The waiter asked if we were ready to order.',
    exampleMeaning: 'Nam phục vụ hỏi chúng tôi đã sẵn sàng gọi món chưa.'
  },

  // --- TOPIC 6: Adjectives & Descriptions (Tính từ & Trạng từ miêu tả) ---
  {
    id: 'eng-88',
    term: 'new',
    ipa: '/njuː/',
    answer: 'mới',
    meaning: 'mới mẻ, vừa mua/làm',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'I have a new pair of shoes.',
    exampleMeaning: 'Tôi có một đôi giày mới.'
  },
  {
    id: 'eng-89',
    term: 'old',
    ipa: '/əʊld/',
    answer: 'cũ, già',
    meaning: 'cũ kỹ hoặc lớn tuổi',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'This old building was built in 1920.',
    exampleMeaning: 'Tòa nhà cũ này được xây dựng năm 1920.'
  },
  {
    id: 'eng-90',
    term: 'big',
    ipa: '/bɪɡ/',
    answer: 'lớn, to',
    meaning: 'kích thước to lớn',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'They live in a big house with a garden.',
    exampleMeaning: 'Họ sống trong một ngôi nhà to có sân vườn.'
  },
  {
    id: 'eng-91',
    term: 'small',
    ipa: '/smɔːl/',
    answer: 'nhỏ, bé',
    meaning: 'kích thước nhỏ nhắn',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'She has a small puppy.',
    exampleMeaning: 'Cô ấy có một chú chó con nhỏ.'
  },
  {
    id: 'eng-92',
    term: 'different',
    ipa: '/ˈdɪfrənt/',
    answer: 'khác nhau, khác biệt',
    meaning: 'khác nhau',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'We come from different places.',
    exampleMeaning: 'Chúng tôi đến từ những nơi khác nhau.'
  },
  {
    id: 'eng-93',
    term: 'very',
    ipa: '/ˈveri/',
    answer: 'rất, vô cùng',
    meaning: 'rất (bổ nghĩa cho tính từ/trạng từ)',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'The exam was very easy.',
    exampleMeaning: 'Bài thi rất dễ.'
  },
  {
    id: 'eng-94',
    term: 'well',
    ipa: '/wel/',
    answer: 'tốt, giỏi',
    meaning: 'giỏi giang, tốt',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'He speaks English very well.',
    exampleMeaning: 'Anh ấy nói tiếng Anh rất tốt.'
  },
  {
    id: 'eng-95',
    term: 'hard',
    ipa: '/hɑːd/',
    answer: 'chăm chỉ, vất vả, cứng',
    meaning: 'cần cù, khó khăn',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'She works hard every day.',
    exampleMeaning: 'Cô ấy làm việc chăm chỉ mỗi ngày.'
  },
  {
    id: 'eng-96',
    term: 'ahead',
    ipa: '/əˈhed/',
    answer: 'đứng đầu, phía trước',
    meaning: 'vượt lên phía trước',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Our products are ahead in the market.',
    exampleMeaning: 'Sản phẩm của chúng tôi đang đứng đầu trên thị trường.'
  },
  {
    id: 'eng-97',
    term: 'tireless',
    ipa: '/ˈtaɪələs/',
    answer: 'không mệt mỏi, bền bỉ',
    meaning: 'làm việc miệt mài không biết mệt',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Thanks to her tireless efforts, she passed.',
    exampleMeaning: 'Nhờ nỗ lực không mệt mỏi của cô ấy, cô ấy đã đỗ.'
  },
  {
    id: 'eng-98',
    term: 'full',
    ipa: '/fʊl/',
    answer: 'đầy, chật chỗ',
    meaning: 'đầy ắp, chật nêm',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'The parking lot was completely full.',
    exampleMeaning: 'Bãi đỗ xe đã đầy chật kín.'
  },
  {
    id: 'eng-99',
    term: 'slow',
    ipa: '/sləʊ/',
    answer: 'chậm chạp',
    meaning: 'tốc độ chậm',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Turtles are slow animals.',
    exampleMeaning: 'Rùa là động vật chậm chạp.'
  },
  {
    id: 'eng-100',
    term: 'fast',
    ipa: '/fɑːst/',
    answer: 'nhanh chóng',
    meaning: 'tốc độ nhanh',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Cheetahs can run very fast.',
    exampleMeaning: 'Báo gấm có thể chạy rất nhanh.'
  },
  {
    id: 'eng-101',
    term: 'asleep',
    ipa: '/əˈsliːp/',
    answer: 'đang ngủ, thiếp đi',
    meaning: 'trạng thái đang ngủ',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'The baby fell asleep quickly.',
    exampleMeaning: 'Em bé đã ngủ thiếp đi rất nhanh.'
  },
  {
    id: 'eng-102',
    term: 'suddenly',
    ipa: '/ˈsʌdənli/',
    answer: 'đột nhiên, bất ngờ',
    meaning: 'xảy ra một cách bất ngờ',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Suddenly, the lights turned off.',
    exampleMeaning: 'Đột nhiên, đèn bị tắt.'
  },
  {
    id: 'eng-103',
    term: 'again',
    ipa: '/əˈɡen/',
    answer: 'lần nữa, lại',
    meaning: 'lặp lại một lần nữa',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'Please say that again.',
    exampleMeaning: 'Xin vui lòng nói lại lần nữa.'
  },
  {
    id: 'eng-104',
    term: 'usually',
    ipa: '/ˈjuːʒuəli/',
    answer: 'thường xuyên',
    meaning: 'thông thường, thường xuyên',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'I usually wake up at 6 AM.',
    exampleMeaning: 'Tôi thường thức dậy lúc 6 giờ sáng.'
  },
  {
    id: 'eng-105',
    term: 'last',
    ipa: '/lɑːst/',
    answer: 'cuối cùng, lần cuối',
    meaning: 'vừa qua, sau cùng',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'When was the last time you saw him?',
    exampleMeaning: 'Lần cuối cùng bạn gặp anh ấy là khi nào?'
  },

  // --- TOPIC 7: Objects & Nature (Đồ vật & Tự nhiên) ---
  {
    id: 'eng-106',
    term: 'meat',
    ipa: '/miːt/',
    answer: 'thịt',
    meaning: 'thịt động vật ăn được',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Do you prefer beef or chicken meat?',
    exampleMeaning: 'Bạn thích ăn thịt bò hay thịt gà hơn?'
  },
  {
    id: 'eng-107',
    term: 'ruler',
    ipa: '/ˈruːlər/',
    answer: 'thước kẻ',
    meaning: 'dụng cụ đo kẻ đường thẳng',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Use a ruler to draw a straight line.',
    exampleMeaning: 'Hãy dùng thước kẻ để vẽ một đường thẳng.'
  },
  {
    id: 'eng-108',
    term: 'stone',
    ipa: '/stəʊn/',
    answer: 'hòn đá, đá',
    meaning: 'viên đá, hòn đá',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'He skipped a stone across the lake.',
    exampleMeaning: 'Cậu ấy ném viên đá nhảy lướt trên mặt hồ.'
  },
  {
    id: 'eng-109',
    term: 'tea',
    ipa: '/tiː/',
    answer: 'trà, nước trà',
    meaning: 'thức uống trà',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Would you like a cup of green tea?',
    exampleMeaning: 'Bạn có muốn một tách trà xanh không?'
  },
  {
    id: 'eng-110',
    term: 'movie',
    ipa: '/ˈmuːvi/',
    answer: 'phim, bộ phim',
    meaning: 'phim điện ảnh/truyền hình',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'We watched an interesting movie last night.',
    exampleMeaning: 'Chúng tôi đã xem một bộ phim hay tối qua.'
  },
  {
    id: 'eng-111',
    term: 'language',
    ipa: '/ˈlæŋɡwɪdʒ/',
    answer: 'ngôn ngữ',
    meaning: 'ngôn ngữ giao tiếp',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'English is an international language.',
    exampleMeaning: 'Tiếng Anh là một ngôn ngữ quốc tế.'
  },
  {
    id: 'eng-112',
    term: 'product',
    ipa: '/ˈprɒdʌkt/',
    answer: 'sản phẩm',
    meaning: 'sản phẩm hàng hóa',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'This new product is selling well.',
    exampleMeaning: 'Sản phẩm mới này đang bán rất chạy.'
  },
  {
    id: 'eng-113',
    term: 'goal',
    ipa: '/ɡəʊl/',
    answer: 'mục tiêu, bàn thắng',
    meaning: 'mục tiêu phấn đấu',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Set a clear goal for your study.',
    exampleMeaning: 'Hãy đặt mục tiêu rõ ràng cho việc học của bạn.'
  },
  {
    id: 'eng-114',
    term: 'secret',
    ipa: '/ˈsiːkrət/',
    answer: 'bí mật',
    meaning: 'điều thầm kín',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Keep this message a secret.',
    exampleMeaning: 'Hãy giữ thông điệp này là một bí mật.'
  },
  {
    id: 'eng-115',
    term: 'accident',
    ipa: '/ˈæksɪdənt/',
    answer: 'vụ tai nạn, sự cố',
    meaning: 'tai nạn bất ngờ',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Drive safely to avoid an accident.',
    exampleMeaning: 'Hãy lái xe an toàn để tránh tai nạn.'
  },
  {
    id: 'eng-116',
    term: 'light',
    ipa: '/laɪt/',
    answer: 'đèn, ánh sáng',
    meaning: 'nguồn sáng, bóng đèn',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Turn on the light, please.',
    exampleMeaning: 'Làm ơn bật đèn lên.'
  },

  // --- TOPIC 8: Grammar, Connectors & Prepositions (Từ nối, Giới từ & Đại từ) ---
  {
    id: 'eng-117',
    term: 'where',
    ipa: '/weər/',
    answer: 'ở đâu, nơi nào',
    meaning: 'từ hỏi vị trí',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Where is your school?',
    exampleMeaning: 'Trường học của bạn ở đâu?'
  },
  {
    id: 'eng-118',
    term: 'when',
    ipa: '/wen/',
    answer: 'khi nào, lúc nào',
    meaning: 'từ hỏi thời gian',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'When will the concert begin?',
    exampleMeaning: 'Khi nào buổi hòa nhạc bắt đầu?'
  },
  {
    id: 'eng-119',
    term: 'why',
    ipa: '/waɪ/',
    answer: 'tại sao, vì sao',
    meaning: 'từ hỏi lý do',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Why are you late today?',
    exampleMeaning: 'Tại sao hôm nay bạn lại đi muộn?'
  },
  {
    id: 'eng-120',
    term: 'how',
    ipa: '/haʊ/',
    answer: 'thế nào, ra sao',
    meaning: 'từ hỏi cách thức/mức độ',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'How do you go to school?',
    exampleMeaning: 'Bạn đi học bằng phương tiện gì?'
  },
  {
    id: 'eng-121',
    term: 'with',
    ipa: '/wɪð/',
    answer: 'với, cùng với',
    meaning: 'cùng với ai/cái gì',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'She went shopping with her mom.',
    exampleMeaning: 'Cô ấy đi mua sắm cùng với mẹ.'
  },
  {
    id: 'eng-122',
    term: 'every',
    ipa: '/ˈevri/',
    answer: 'mỗi, mọi',
    meaning: 'mỗi một',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Every student must wear uniform.',
    exampleMeaning: 'Mỗi học sinh đều phải mặc đồng phục.'
  },
  {
    id: 'eng-123',
    term: 'after',
    ipa: '/ˈɑːftər/',
    answer: 'sau khi, sau',
    meaning: 'sau mốc thời gian',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'We can play game after class.',
    exampleMeaning: 'Chúng ta có thể chơi game sau giờ học.'
  },
  {
    id: 'eng-124',
    term: 'before',
    ipa: '/bɪˈfɔːr/',
    answer: 'trước khi, trước',
    meaning: 'trước mốc thời gian',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Wash your hands before meals.',
    exampleMeaning: 'Rửa tay trước bữa ăn.'
  },
  {
    id: 'eng-125',
    term: 'so that',
    ipa: '/səʊ ðæt/',
    answer: 'để mà, cốt để',
    meaning: 'chỉ mục đích',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Study hard so that you can pass the exam.',
    exampleMeaning: 'Hãy học chăm chỉ để bạn có thể thi đỗ.'
  },
  {
    id: 'eng-126',
    term: 'can',
    ipa: '/kæn/',
    answer: 'có thể',
    meaning: 'động từ khuyết thiếu chỉ khả năng',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Can you swim fast?',
    exampleMeaning: 'Bạn có thể bơi nhanh không?'
  },
  {
    id: 'eng-127',
    term: 'around',
    ipa: '/əˈraʊnd/',
    answer: 'xung quanh, khoảng',
    meaning: 'xung quanh vị trí',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'They walked around the lake.',
    exampleMeaning: 'Họ đi dạo xung quanh hồ.'
  },
  {
    id: 'eng-128',
    term: 'for',
    ipa: '/fɔːr/',
    answer: 'cho, dành cho, trong khoảng',
    meaning: 'giới từ chỉ mục đích/thời gian',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'This gift is for you.',
    exampleMeaning: 'Món quà này dành cho bạn.'
  },
  {
    id: 'eng-129',
    term: 'to',
    ipa: '/tuː/',
    answer: 'đến, tới',
    meaning: 'hướng tới vị trí',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Let’s go to the museum.',
    exampleMeaning: 'Chúng ta hãy đến bảo tàng.'
  },
  {
    id: 'eng-130',
    term: 'if',
    ipa: '/ɪf/',
    answer: 'nếu, nếu như',
    meaning: 'liên từ điều kiện',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'If it rains tomorrow, we will stay home.',
    exampleMeaning: 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.'
  },
  {
    id: 'eng-131',
    term: 'some',
    ipa: '/sʌm/',
    answer: 'một vài, một ít',
    meaning: 'số lượng một vài',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'Would you like some tea?',
    exampleMeaning: 'Bạn có muốn dùng một ít trà không?'
  },
  {
    id: 'eng-132',
    term: 'this',
    ipa: '/ðɪs/',
    answer: 'đây, cái này',
    meaning: 'chỉ vật ở gần',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'This is my new computer.',
    exampleMeaning: 'Đây là chiếc máy tính mới của tôi.'
  },
  {
    id: 'eng-133',
    term: 'that',
    ipa: '/ðæt/',
    answer: 'kia, cái đó',
    meaning: 'chỉ vật ở xa',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'That car is very expensive.',
    exampleMeaning: 'Chiếc ô tô kia rất đắt tiền.'
  },
  {
    id: 'eng-134',
    term: 'while',
    ipa: '/waɪl/',
    answer: 'trong khi',
    meaning: 'liên từ thời gian diễn ra song song',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'He listened to music while studying.',
    exampleMeaning: 'Anh ấy nghe nhạc trong khi đang học.'
  },
  {
    id: 'eng-135',
    term: 'but',
    ipa: '/bʌt/',
    answer: 'nhưng',
    meaning: 'liên từ đối lập',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'He is young but very wise.',
    exampleMeaning: 'Cậu ấy còn trẻ nhưng rất uyên bác.'
  },
  {
    id: 'eng-136',
    term: 'about',
    ipa: '/əˈbaʊt/',
    answer: 'về, khoảng',
    meaning: 'về chủ đề gì',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'What is this story about?',
    exampleMeaning: 'Câu chuyện này viết về cái gì?'
  },
  {
    id: 'eng-137',
    term: 'near',
    ipa: '/nɪər/',
    answer: 'gần',
    meaning: 'vị trí gần',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'My house is near the school.',
    exampleMeaning: 'Nhà tôi ở gần trường học.'
  },
  {
    id: 'eng-138',
    term: 'along',
    ipa: '/əˈlɒŋ/',
    answer: 'dọc theo',
    meaning: 'dọc theo con đường/dòng sông',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'They walked along the river bank.',
    exampleMeaning: 'Họ đi dạo dọc theo bờ sông.'
  },
  {
    id: 'eng-139',
    term: 'something',
    ipa: '/ˈsʌmθɪŋ/',
    answer: 'cái gì đó, điều gì đó',
    meaning: 'đại từ bất định',
    partOfSpeech: 'Grammar/Connector',
    topic: 'Grammar & Connectors',
    example: 'I felt something soft in my hand.',
    exampleMeaning: 'Tôi cảm thấy có cái gì đó mềm mại trong tay mình.'
  },

  // --- BỔ SUNG TỪ VỰNG ĐỐI SOÁT CHÍNH XÁC 100% TỪ ĐỀ BÀI TẬP CHIA THÌ (ĐÃ LỌC TRÙNG) ---
  {
    id: 'eng-140',
    term: 'tennis',
    ipa: '/ˈtenɪs/',
    answer: 'môn quần vợt, tennis',
    meaning: 'môn thể thao đánh bóng qua lưới bằng vợt',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'She plays tennis every Sunday.',
    exampleMeaning: 'Cô ấy chơi quần vợt vào mỗi Chủ Nhật.'
  },
  {
    id: 'eng-141',
    term: 'spanish',
    ipa: '/ˈspænɪʃ/',
    answer: 'tiếng Tây Ban Nha',
    meaning: 'ngôn ngữ Tây Ban Nha',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'He is studying Spanish at the moment.',
    exampleMeaning: 'Cậu ấy đang học tiếng Tây Ban Nha vào lúc này.'
  },
  {
    id: 'eng-142',
    term: 'parent',
    ipa: '/ˈpeərənt/',
    answer: 'bố mẹ, phụ huynh',
    meaning: 'cha hoặc mẹ trong gia đình',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'Will you visit your parents next month?',
    exampleMeaning: 'Bạn sẽ đi thăm bố mẹ vào tháng tới chứ?'
  },
  {
    id: 'eng-143',
    term: 'beach',
    ipa: '/biːtʃ/',
    answer: 'bãi biển',
    meaning: 'bờ cát ven biển',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'They will go to the beach tomorrow.',
    exampleMeaning: 'Họ sẽ đi bãi biển vào ngày mai.'
  },
  {
    id: 'eng-144',
    term: 'party',
    ipa: '/ˈpɑːti/',
    answer: 'bữa tiệc, buổi tiệc',
    meaning: 'buổi tiệc vui chơi tụ họp',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'Did she go to the party last night?',
    exampleMeaning: 'Cô ấy có đi dự tiệc tối qua không?'
  },
  {
    id: 'eng-145',
    term: 'pregnant',
    ipa: '/ˈpreɡnənt/',
    answer: 'mang thai, có bầu',
    meaning: 'trạng thái mang thai',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'She has been pregnant for three months this week.',
    exampleMeaning: 'Cô ấy đã mang thai được 3 tháng vào tuần này.'
  },
  {
    id: 'eng-146',
    term: 'president',
    ipa: '/ˈprezɪdənt/',
    answer: 'tổng thống, chủ tịch',
    meaning: 'người đứng đầu nhà nước hoặc tổ chức',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'They have been waiting for the president for 5 hours.',
    exampleMeaning: 'Họ đã chờ đợi vị tổng thống trong suốt 5 giờ.'
  },
  {
    id: 'eng-147',
    term: 'novel',
    ipa: '/ˈnɒvl/',
    answer: 'cuốn tiểu thuyết',
    meaning: 'truyện dài hư cấu',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Will you have finished this novel by next week?',
    exampleMeaning: 'Bạn sẽ đọc xong cuốn tiểu thuyết này trước tuần sau chứ?'
  },
  {
    id: 'eng-148',
    term: 'cinema',
    ipa: '/ˈsɪnəmɑː/',
    answer: 'rạp chiếu phim',
    meaning: 'nơi xem phim điện ảnh',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'They do not go to the cinema very often.',
    exampleMeaning: 'Họ không đi xem phim ở rạp rất thường xuyên.'
  },
  {
    id: 'eng-149',
    term: 'coffee',
    ipa: '/ˈkɒfi/',
    answer: 'cà phê',
    meaning: 'thức uống cà phê',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'My father usually drinks coffee in the morning.',
    exampleMeaning: 'Bố tôi thường uống cà phê vào buổi sáng.'
  },
  {
    id: 'eng-150',
    term: 'grass',
    ipa: '/ɡrɑːs/',
    answer: 'bãi cỏ, thảm cỏ',
    meaning: 'cỏ mọc trên mặt đất',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Look at the sign! You must not step on the grass.',
    exampleMeaning: 'Hãy nhìn biển báo! Bạn không được giẫm lên cỏ.'
  },
  {
    id: 'eng-151',
    term: 'abroad',
    ipa: '/əˈbrɔːd/',
    answer: 'ở nước ngoài, ngoại quốc',
    meaning: 'ở hoặc đi sang quốc gia khác',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Places, Transport & Shops',
    example: 'She is studying English because she wants to study abroad.',
    exampleMeaning: 'Cô ấy đang học tiếng Anh vì muốn đi du học nước ngoài.'
  },
  {
    id: 'eng-152',
    term: 'degree',
    ipa: '/dɪˈɡriː/',
    answer: 'độ (nhiệt độ/góc), mức độ',
    meaning: 'đơn vị đo nhiệt độ',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Water boils at 100 degrees Celsius.',
    exampleMeaning: 'Nước sôi ở 100 độ C.'
  },
  {
    id: 'eng-153',
    term: 'fit',
    ipa: '/fɪt/',
    answer: 'vừa vặn, hợp',
    meaning: 'vừa kích thước',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'I think this dress fits you perfectly.',
    exampleMeaning: 'Tôi nghĩ chiếc váy này vừa vặn với bạn một cách hoàn hảo.'
  },
  {
    id: 'eng-154',
    term: 'perfectly',
    ipa: '/ˈpɜːfɪktli/',
    answer: 'hoàn hảo, rất vừa',
    meaning: 'một cách hoàn toàn tuyệt đối',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'This dress fits you perfectly.',
    exampleMeaning: 'Chiếc váy này vừa vặn với bạn một cách hoàn hảo.'
  },
  {
    id: 'eng-155',
    term: 'football',
    ipa: '/ˈfʊtbɔːl/',
    answer: 'môn bóng đá',
    meaning: 'trò chơi đá bóng',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'John plays football with his friends every Sunday.',
    exampleMeaning: 'John chơi bóng đá với bạn bè vào mỗi Chủ Nhật.'
  },
  {
    id: 'eng-156',
    term: 'baby',
    ipa: '/ˈbeɪbi/',
    answer: 'em bé, trẻ sơ sinh',
    meaning: 'trẻ em còn rất nhỏ',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'Be quiet! The baby is sleeping in the next room.',
    exampleMeaning: 'Hãy giữ trật tự! Em bé đang ngủ ở phòng bên cạnh.'
  },
  {
    id: 'eng-157',
    term: 'umbrella',
    ipa: '/ʌmˈbrelə/',
    answer: 'cái ô, cái dù',
    meaning: 'vật che mưa nắng',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Who does this umbrella belong to?',
    exampleMeaning: 'Chiếc ô này thuộc về ai?'
  },
  {
    id: 'eng-158',
    term: 'diet',
    ipa: '/ˈdaɪət/',
    answer: 'ăn kiêng, chế độ ăn',
    meaning: 'ăn uống theo chế độ để giảm cân',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'We have been dieting strictly since last week to lose weight.',
    exampleMeaning: 'Chúng tôi đã ăn kiêng nghiêm ngặt từ tuần trước để giảm cân.'
  },
  {
    id: 'eng-159',
    term: 'strictly',
    ipa: '/ˈstrɪktli/',
    answer: 'nghiêm ngặt, nghiêm túc',
    meaning: 'một cách nghiêm túc, tuân thủ chặt chẽ',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'We have been dieting strictly since last week.',
    exampleMeaning: 'Chúng tôi đã ăn kiêng một cách nghiêm ngặt từ tuần trước.'
  },
  {
    id: 'eng-160',
    term: 'lose weight',
    ipa: '/luːz weɪt/',
    answer: 'giảm cân, sút cân',
    meaning: 'làm giảm trọng lượng cơ thể',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'She diets strictly to lose weight.',
    exampleMeaning: 'Cô ấy ăn kiêng nghiêm ngặt để giảm cân.'
  },
  {
    id: 'eng-161',
    term: 'station',
    ipa: '/ˈsteɪʃn/',
    answer: 'nhà ga, trạm',
    meaning: 'nơi tàu hỏa dừng đón khách',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'When I arrived at the station, the train had left.',
    exampleMeaning: 'Khi tôi đến nhà ga, tàu hỏa đã rời đi.'
  },
  {
    id: 'eng-162',
    term: 'thief',
    ipa: '/θiːf/',
    answer: 'tên trộm, kẻ cắp',
    meaning: 'người lén lút lấy trộm đồ',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'By the time the police came, the thief had run away.',
    exampleMeaning: 'Trước khi cảnh sát đến, tên trộm đã tẩu thoát.'
  },
  {
    id: 'eng-163',
    term: 'police',
    ipa: '/pəˈliːs/',
    answer: 'cảnh sát, công an',
    meaning: 'lực lượng giữ gìn trật tự',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'By the time the police came, the thief had run away.',
    exampleMeaning: 'Trước khi cảnh sát đến, tên trộm đã tẩu thoát.'
  },
  {
    id: 'eng-164',
    term: 'divorce',
    ipa: '/dɪˈvɔːs/',
    answer: 'ly hôn, ly dị',
    meaning: 'chấm dứt hôn nhân',
    partOfSpeech: 'Verb',
    topic: 'People, Family & Careers',
    example: 'They had been married for two years before they divorced.',
    exampleMeaning: 'Họ đã kết hôn được 2 năm trước khi ly hôn.'
  },
  {
    id: 'eng-165',
    term: 'dirty',
    ipa: '/ˈdɜːti/',
    answer: 'bẩn, dơ bẩn',
    meaning: 'không sạch vẽ, đầy vết bẩn',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'The house was dirty because nobody had cleaned it.',
    exampleMeaning: 'Căn nhà bị bẩn vì không ai dọn dẹp.'
  },
  {
    id: 'eng-166',
    term: 'delicious',
    ipa: '/dɪˈlɪʃəs/',
    answer: 'ngon miệng, thơm ngon',
    meaning: 'thức ăn có hương vị tuyệt vời',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'It was the most delicious meal I had ever eaten.',
    exampleMeaning: 'Đó là bữa ăn ngon nhất tôi từng ăn.'
  },
  {
    id: 'eng-167',
    term: 'discover',
    ipa: '/dɪˈskʌvər/',
    answer: 'phát hiện, khám phá',
    meaning: 'tìm ra điều mới',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Scientists will discover a cure for cancer.',
    exampleMeaning: 'Các nhà khoa học sẽ khám phá ra phương thuốc chữa bệnh ung thư.'
  },
  {
    id: 'eng-168',
    term: 'cure',
    ipa: '/kjʊər/',
    answer: 'phương thuốc, cách chữa bệnh',
    meaning: 'cách điều trị khỏi bệnh',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Scientists will discover a cure for cancer.',
    exampleMeaning: 'Các nhà khoa học sẽ tìm ra phương thuốc chữa bệnh ung thư.'
  },
  {
    id: 'eng-169',
    term: 'cancer',
    ipa: '/ˈkænsər/',
    answer: 'bệnh ung thư',
    meaning: 'căn bệnh hiểm nghèo',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'Research helps in fighting against cancer.',
    exampleMeaning: 'Nghiên cứu giúp ích trong việc chống lại bệnh ung thư.'
  },
  {
    id: 'eng-170',
    term: 'borrow',
    ipa: '/ˈbɒrəʊ/',
    answer: 'vay, mượn',
    meaning: 'mượn đồ của ai',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'Can I borrow your car for tomorrow morning?',
    exampleMeaning: 'Tôi có thể mượn ô tô của bạn sáng mai được không?'
  },
  {
    id: 'eng-171',
    term: 'meeting',
    ipa: '/ˈmiːtɪŋ/',
    answer: 'cuộc họp, buổi họp',
    meaning: 'buổi họp thảo luận công việc',
    partOfSpeech: 'Noun',
    topic: 'Daily Life & Routines',
    example: 'She will be attending an important meeting.',
    exampleMeaning: 'Cô ấy sẽ tham dự một cuộc họp quan trọng.'
  },
  {
    id: 'eng-172',
    term: 'promise',
    ipa: '/ˈprɒmɪs/',
    answer: 'hứa, cam kết',
    meaning: 'hứa hẹn làm điều gì',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'I promise I will call you as soon as I arrive.',
    exampleMeaning: 'Tôi hứa tôi sẽ gọi cho bạn ngay khi tôi đến nơi.'
  },
  {
    id: 'eng-173',
    term: 'grandparent',
    ipa: '/ˈɡrænpeərənt/',
    answer: 'ông bà',
    meaning: 'ông hoặc bà trong gia đình',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'I visited my grandparents in the countryside.',
    exampleMeaning: 'Tôi đã thăm ông bà ở quê.'
  },
  {
    id: 'eng-174',
    term: 'countryside',
    ipa: '/ˈkʌntrisaɪd/',
    answer: 'vùng nông thôn, làng quê',
    meaning: 'vùng làng quê yên bình',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'My grandparents live in the countryside.',
    exampleMeaning: 'Ông bà tôi sống ở vùng nông thôn.'
  },
  {
    id: 'eng-175',
    term: 'prepare',
    ipa: '/prɪˈpeər/',
    answer: 'chuẩn bị, sửa soạn',
    meaning: 'sửa soạn đồ đạc/bữa ăn',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'They were preparing lunch in the kitchen.',
    exampleMeaning: 'Họ đang chuẩn bị bữa trưa trong bếp.'
  },
  {
    id: 'eng-176',
    term: 'plant',
    ipa: '/plɑːnt/',
    answer: 'trồng cây, cây trồng',
    meaning: 'trồng cây xanh vào đất',
    partOfSpeech: 'Verb',
    topic: 'Actions & Movement',
    example: 'He planted several trees in the garden.',
    exampleMeaning: 'Anh ấy đã trồng vài cây xanh trong vườn.'
  },
  {
    id: 'eng-177',
    term: 'heavily',
    ipa: '/ˈhevɪli/',
    answer: 'nặng hạt, dữ dội',
    meaning: 'ở mức độ nhiều/dữ dội',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'It started to rain heavily while we were walking.',
    exampleMeaning: 'Trời bắt đầu mưa nặng hạt trong khi chúng tôi đang đi dạo.'
  },
  {
    id: 'eng-178',
    term: 'shelter',
    ipa: '/ˈʃeltər/',
    answer: 'nơi trú ẩn, chỗ trú mưa',
    meaning: 'nơi che chắn mưa nắng',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'We ran under a large tree for shelter.',
    exampleMeaning: 'Chúng tôi chạy dưới cây to để tìm chỗ trú mưa.'
  },
  {
    id: 'eng-179',
    term: 'bench',
    ipa: '/bentʃ/',
    answer: 'ghế dài công viên',
    meaning: 'ghế ngồi bằng gỗ/đá',
    partOfSpeech: 'Noun',
    topic: 'Objects & Nature',
    example: 'We sat on a wooden bench near the lake.',
    exampleMeaning: 'Chúng tôi ngồi trên một chiếc ghế dài bằng gỗ gần hồ.'
  },
  {
    id: 'eng-180',
    term: 'manager',
    ipa: '/ˈmænɪdʒər/',
    answer: 'quản lý, giám đốc',
    meaning: 'người quản lý bộ phận',
    partOfSpeech: 'Noun',
    topic: 'People, Family & Careers',
    example: 'The manager called me while I was driving home.',
    exampleMeaning: 'Quản lý đã gọi điện cho tôi trong khi tôi đang lái xe về nhà.'
  },
  {
    id: 'eng-181',
    term: 'traffic',
    ipa: '/ˈtræfɪk/',
    answer: 'giao thông, xe cộ',
    meaning: 'lượng xe cộ trên đường',
    partOfSpeech: 'Noun',
    topic: 'Places, Transport & Shops',
    example: 'I got stuck in heavy traffic on my way home.',
    exampleMeaning: 'Tôi bị kẹt trong dòng xe cộ đông đúc trên đường về nhà.'
  },
  {
    id: 'eng-182',
    term: 'urgent',
    ipa: '/ˈɜːdʒənt/',
    answer: 'khẩn cấp, gấp',
    meaning: 'cần xử lý gấp ngay lập tức',
    partOfSpeech: 'Adjective/Adverb',
    topic: 'Adjectives & Descriptions',
    example: 'The manager asked me to fix an urgent error.',
    exampleMeaning: 'Quản lý yêu cầu tôi sửa một lỗi khẩn cấp.'
  }
];

// Grouping Helper Functions to build Lesson structure for StudySession compatibility

// 1. TOPIC-BASED LESSONS
export const TOPICS = [
  'Daily Life & Routines',
  'Places, Transport & Shops',
  'Time, Seasons & Weather',
  'Actions & Movement',
  'People, Family & Careers',
  'Adjectives & Descriptions',
  'Objects & Nature',
  'Grammar & Connectors'
] as const;

export const TOPIC_TITLES_VI: Record<string, string> = {
  'Daily Life & Routines': 'Chủ đề 1: Đời sống & Sinh hoạt hàng ngày',
  'Places, Transport & Shops': 'Chủ đề 2: Địa điểm, Giao thông & Cửa hàng',
  'Time, Seasons & Weather': 'Chủ đề 3: Thời gian, Các mùa & Thời tiết',
  'Actions & Movement': 'Chủ đề 4: Hành động & Sự di chuyển',
  'People, Family & Careers': 'Chủ đề 5: Con người, Gia đình & Nghề nghiệp',
  'Adjectives & Descriptions': 'Chủ đề 6: Tính từ & Trạng từ miêu tả',
  'Objects & Nature': 'Chủ đề 7: Đồ vật & Tự nhiên',
  'Grammar & Connectors': 'Chủ đề 8: Từ hỏi, Từ nối & Giới từ'
};

// 2. PARTS OF SPEECH LESSONS
export const PARTS_OF_SPEECH = [
  'Noun',
  'Verb',
  'Adjective/Adverb',
  'Grammar/Connector'
] as const;

export const POS_TITLES_VI: Record<string, string> = {
  'Noun': 'Danh từ (Nouns)',
  'Verb': 'Động từ & Cụm động từ (Verbs & Phrasal Verbs)',
  'Adjective/Adverb': 'Tính từ & Trạng từ (Adjectives & Adverbs)',
  'Grammar/Connector': 'Từ hỏi, Từ nối & Giới từ (Connectors & Prepositions)'
};

// Convert EngWords to Lesson objects for standard compatibility with Flashcard & Quiz system
export const engTopicLessons: Lesson[] = TOPICS.map((topic, index) => {
  const wordsInTopic = engGrade9Words.filter(w => w.topic === topic);

  return {
    id: 100 + index + 1,
    title: TOPIC_TITLES_VI[topic] || topic,
    hasTheory: false,
    sections: [
      {
        id: `eng-topic-${index + 1}-vocab`,
        title: `Flashcard Từ vựng - ${topic}`,
        type: 'vocabulary',
        items: wordsInTopic.map(w => ({
          id: w.id,
          term: w.term,
          reading: w.ipa,
          answer: w.answer,
          meaning: w.meaning,
          explanation: `[${w.partOfSpeech}] ${w.example} (${w.exampleMeaning})`,
          example: w.example
        }))
      },
      {
        id: `eng-topic-${index + 1}-mcq`,
        title: `Bài tập Trắc nghiệm - ${topic}`,
        type: 'multiple_choice',
        items: wordsInTopic.map((w, wIdx) => {
          const otherWords = engGrade9Words.filter(other => other.id !== w.id);
          const wrongOptions = Array.from(new Set(otherWords.map(o => o.answer)))
            .slice((wIdx * 2) % 30, ((wIdx * 2) % 30) + 3);

          const allChoices = Array.from(new Set([w.answer, ...wrongOptions])).slice(0, 4);
          while (allChoices.length < 4) {
            allChoices.push('Không có phương án đúng');
          }
          allChoices.sort(() => (wIdx % 2 === 0 ? 0.5 - Math.random() : -0.5 + Math.random()));

          return {
            id: `${w.id}-mcq`,
            question: `Từ "${w.term}" (${w.ipa}) có nghĩa là gì?`,
            answer: w.answer,
            choices: allChoices,
            explanation: `Ví dụ: ${w.example} ➔ ${w.exampleMeaning}`
          };
        })
      }
    ]
  };
});

export const engPosLessons: Lesson[] = PARTS_OF_SPEECH.map((pos, index) => {
  const wordsInPos = engGrade9Words.filter(w => w.partOfSpeech === pos);

  return {
    id: 200 + index + 1,
    title: POS_TITLES_VI[pos] || pos,
    hasTheory: false,
    sections: [
      {
        id: `eng-pos-${index + 1}-vocab`,
        title: `Flashcard - ${POS_TITLES_VI[pos]}`,
        type: 'vocabulary',
        items: wordsInPos.map(w => ({
          id: w.id,
          term: w.term,
          reading: w.ipa,
          answer: w.answer,
          meaning: w.meaning,
          explanation: `[${w.topic}] ${w.example} (${w.exampleMeaning})`,
          example: w.example
        }))
      },
      {
        id: `eng-pos-${index + 1}-mcq`,
        title: `Bài tập Trắc nghiệm - ${POS_TITLES_VI[pos]}`,
        type: 'multiple_choice',
        items: wordsInPos.map((w, wIdx) => {
          const otherWords = engGrade9Words.filter(other => other.id !== w.id);
          const wrongOptions = Array.from(new Set(otherWords.map(o => o.answer)))
            .slice((wIdx * 3) % 30, ((wIdx * 3) % 30) + 3);

          const allChoices = Array.from(new Set([w.answer, ...wrongOptions])).slice(0, 4);
          while (allChoices.length < 4) {
            allChoices.push('Phương án khác');
          }
          allChoices.sort(() => (wIdx % 2 === 0 ? 0.5 - Math.random() : -0.5 + Math.random()));

          return {
            id: `${w.id}-pos-mcq`,
            question: `Chọn nghĩa đúng của từ [${pos}] "${w.term}" (${w.ipa}):`,
            answer: w.answer,
            choices: allChoices,
            explanation: `Ví dụ: ${w.example} ➔ ${w.exampleMeaning}`
          };
        })
      }
    ]
  };
});

// All Combined English Grade 9 Lessons
export const allEngGrade9Lessons = [...engTopicLessons, ...engPosLessons];
