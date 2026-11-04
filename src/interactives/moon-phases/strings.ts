import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Moon phase lab',
        label: 'Left: Earth and the Moon seen from far above, with sunlight coming from the left. The Sun always lights the half of the Moon that faces it. Right: how the Moon looks from Earth on that day.',
        day: 'Days since new moon',
        above: 'Seen from above',
        see: 'What you see from Earth',
        sunlight: 'Sunlight',
        p0: 'New moon', p1: 'Waxing crescent', p2: 'First quarter', p3: 'Waxing gibbous',
        p4: 'Full moon', p5: 'Waning gibbous', p6: 'Last quarter', p7: 'Waning crescent',
        caption: '<b>{phase}.</b> Half of the Moon is always lit by the Sun. The orange line marks the half that faces Earth: we see the part of it that is lit, about {pct}% of the face.',
      },
      vi: {
        title: 'Thí nghiệm pha Mặt Trăng',
        label: 'Bên trái: Trái Đất và Mặt Trăng nhìn từ rất xa phía trên, ánh nắng chiếu từ bên trái. Mặt Trời luôn chiếu sáng nửa Mặt Trăng hướng về nó. Bên phải: Mặt Trăng trông thế nào khi nhìn từ Trái Đất vào ngày đó.',
        day: 'Số ngày kể từ trăng mới',
        above: 'Nhìn từ trên cao',
        see: 'Em thấy từ Trái Đất',
        sunlight: 'Ánh nắng',
        p0: 'Trăng mới (không trăng)', p1: 'Trăng lưỡi liềm đầu tháng', p2: 'Trăng thượng huyền', p3: 'Trăng khuyết đầu tháng',
        p4: 'Trăng tròn', p5: 'Trăng khuyết cuối tháng', p6: 'Trăng hạ huyền', p7: 'Trăng lưỡi liềm cuối tháng',
        caption: '<b>{phase}.</b> Một nửa Mặt Trăng luôn được Mặt Trời chiếu sáng. Đường màu cam đánh dấu nửa hướng về Trái Đất: ta thấy phần được chiếu sáng trên nửa đó, khoảng {pct}% bề mặt.',
      },
    },
    lang,
  );
