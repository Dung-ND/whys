import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        pick: 'Pick the answer you think is right. There are no wrong guesses in science, only tests!',
        right: 'Spot on!',
        wrong: 'Good guess, but the evidence says otherwise.',
        science: 'What science says',
        evidence: 'See the evidence',
        again: 'Guess again',
        play: 'Play',
        pause: 'Pause',
      },
      vi: {
        pick: 'Chọn câu trả lời bạn nghĩ là đúng. Trong khoa học không có phỏng đoán sai, chỉ có thí nghiệm!',
        right: 'Chính xác!',
        wrong: 'Đoán hay đấy, nhưng bằng chứng lại cho thấy điều khác.',
        science: 'Khoa học nói gì',
        evidence: 'Xem bằng chứng',
        again: 'Đoán lại',
        play: 'Phát',
        pause: 'Tạm dừng',
      },
      es: {
        pick: 'Elige la respuesta que crees correcta. En ciencia no hay hipótesis malas, ¡solo pruebas!',
        right: '¡Exacto!',
        wrong: 'Buena idea, pero las pruebas dicen otra cosa.',
        science: 'Lo que dice la ciencia',
        evidence: 'Ver las pruebas',
        again: 'Adivinar otra vez',
        play: 'Reproducir',
        pause: 'Pausa',
      },
    },
    lang,
  );
