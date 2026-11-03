import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Inside your skin',
        label: 'A slice through skin showing three hairs. Each hair grows from a pocket under the skin, with a tiny muscle attached. When the muscle squeezes, the hair stands up and the skin around it rises into a bump.',
        feel: 'You feel',
        warm: 'Warm',
        cold: 'Cold',
        scared: 'Scared',
        hair: 'hair',
        muscle: 'tiny muscle',
        bump: 'goosebump',
        warmCap: 'Warm and calm: each tiny muscle is relaxed, so the hairs lean over and your skin is smooth.',
        coldCap: 'Brr! Your nerves tell every tiny muscle to <b class="c-red">squeeze</b>. It pulls its hair upright and bunches up the skin around it into a <b>bump</b>.',
        scaredCap: 'A scare, or goose-bumpy music, releases <b>adrenaline</b>. It sends the very same “squeeze!” message, so you get goosebumps even when you are warm.',
      },
      vi: {
        title: 'Bên trong làn da',
        label: 'Một lát cắt qua da cho thấy ba sợi lông. Mỗi sợi lông mọc từ một cái túi nhỏ dưới da, có gắn một cơ rất nhỏ. Khi cơ co lại, sợi lông dựng đứng và da quanh nó nhô lên thành một nốt.',
        feel: 'Em cảm thấy',
        warm: 'Ấm',
        cold: 'Lạnh',
        scared: 'Sợ',
        hair: 'lông',
        muscle: 'cơ dựng lông',
        bump: 'nốt da gà',
        warmCap: 'Ấm áp và bình tĩnh: các cơ nhỏ đều thả lỏng, nên lông nằm nghiêng và da em mịn màng.',
        coldCap: 'Lạnh quá! Dây thần kinh ra lệnh cho từng cơ nhỏ <b class="c-red">co lại</b>. Cơ kéo sợi lông dựng đứng và dồn phần da quanh nó thành một <b>nốt nhô lên</b>.',
        scaredCap: 'Khi sợ hãi, hay nghe bản nhạc làm em “nổi da gà”, cơ thể tiết ra <b>adrenaline</b>. Nó gửi đúng lệnh “co lại!” đó, nên em nổi da gà dù không hề lạnh.',
      },
    },
    lang,
  );
