type Word = readonly [thai: string, roman: string, meaning: string, grammar: string];

type Lesson = {
  japanese: string;
  aliases?: string[];
  topic: string;
  thai: string;
  roman: string;
  kana: string;
  words: readonly Word[];
};

const polite = ['ครับ', 'khráp', 'です・ますに相当する丁寧さ', '男性の話し手が文末に添える丁寧語。疑問文にも使えます。'] as const;

export const lessons: readonly Lesson[] = [
  {
    japanese: 'おはようございます',
    aliases: ['こんにちは', 'こんばんは'],
    topic: 'あいさつ',
    thai: 'สวัสดีครับ',
    roman: 'sà-wàt-dii khráp',
    kana: 'サワッディー クラップ',
    words: [
      ['สวัสดี', 'sà-wàt-dii', 'おはよう・こんにちは・こんばんは', '時間帯を問わず使えるあいさつです。'],
      polite,
    ],
  },
  {
    japanese: 'ありがとうございます',
    aliases: ['ありがとう'],
    topic: 'お礼',
    thai: 'ขอบคุณครับ',
    roman: 'khɔ̀ɔp-khun khráp',
    kana: 'コープクン クラップ',
    words: [
      ['ขอบคุณ', 'khɔ̀ɔp-khun', '感謝する・ありがとう', '感謝を伝える定型表現。相手が明らかならそのまま使えます。'],
      polite,
    ],
  },
  {
    japanese: 'もう一度言っていただけますか？',
    aliases: ['もう一度言ってもらえますか', 'もう一度言ってください'],
    topic: '聞き返す',
    thai: 'พูดอีกครั้งได้ไหมครับ',
    roman: 'phûut ìik khráŋ dâi mǎi khráp',
    kana: 'プート イーク クラン ダイ マイ クラップ',
    words: [
      ['พูด', 'phûut', '言う・話す', 'この文の動詞。会話では誰に頼んでいるか明らかなので主語を省きます。'],
      ['อีก', 'ìik', 'さらに・もう', 'ครั้ง の前に置き、回数を加えます。'],
      ['ครั้ง', 'khráŋ', '回', '物事が起きた回数を表します。'],
      ['ได้', 'dâi', 'できる', '動詞句の後ろに置き、可能であることを表します。'],
      ['ไหม', 'mǎi', '〜ですか', 'はい・いいえで答える疑問を作ります。'],
      polite,
    ],
  },
  {
    japanese: '会議は何時に始まりますか？',
    aliases: ['会議は何時からですか'],
    topic: '仕事',
    thai: 'ประชุมเริ่มกี่โมงครับ',
    roman: 'prà-chum rə̂əm kìi mooŋ khráp',
    kana: 'プラチュム ルーム キー モーン クラップ',
    words: [
      ['ประชุม', 'prà-chum', '会議（する）', 'ここでは会話の話題となる会議を指します。'],
      ['เริ่ม', 'rə̂əm', '始まる・始める', '会議が始まることを表す動詞です。'],
      ['กี่', 'kìi', 'いくつ・何', '数や量を尋ねる語。โมง の前に置くと時刻を尋ねられます。'],
      ['โมง', 'mooŋ', '時', '時刻の「時」を表します。'],
      polite,
    ],
  },
];

function normalize(japanese: string): string {
  return japanese.normalize('NFKC').trim().replace(/[。.!！?？]+$/u, '').trimEnd();
}

export function findLesson(japanese: string): Lesson | undefined {
  const normalized = normalize(japanese);
  return lessons.find(({ japanese, aliases = [] }) =>
    [japanese, ...aliases].some((phrase) => normalize(phrase) === normalized),
  );
}
