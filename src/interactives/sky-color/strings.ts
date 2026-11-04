import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Sky color lab',
        label: 'A landscape whose sky and Sun change color as the Sun moves up or down. Beside it, a diagram (not to scale) shows how far sunlight travels through the air to reach you.',
        sun: 'Height of the Sun',
        air: 'Air the sunlight crosses',
        times: '{n}× more than overhead',
        high: 'The Sun is high. Its light crosses only a little air. Air molecules scatter some of the <b class="c-blue">blue</b> light all over the sky, so the sky looks blue and the Sun looks white-yellow.',
        mid: 'Lower Sun, longer path through the air: more of the blue is scattered away on the way, so the Sun turns yellow and the sky near the ground looks paler.',
        low: 'Sunset! The light now crosses about {n} times more air. Almost all the blue has been scattered away before it reaches you, so the Sun and the sky around it glow <b class="c-red">orange and red</b>.',
        path: 'Path through the air',
        notScale: 'not to scale',
      },
      vi: {
        title: 'Thí nghiệm màu bầu trời',
        label: 'Một phong cảnh có bầu trời và Mặt Trời đổi màu khi Mặt Trời lên cao hay xuống thấp. Bên cạnh là sơ đồ (không đúng tỉ lệ) cho thấy ánh nắng phải đi qua bao nhiêu không khí để đến chỗ bạn.',
        sun: 'Độ cao Mặt Trời',
        air: 'Lớp không khí ánh nắng đi qua',
        times: 'gấp {n} lần lúc Mặt Trời ở đỉnh đầu',
        high: 'Mặt Trời ở trên cao. Ánh sáng chỉ đi qua một ít không khí. Các phân tử không khí làm tán xạ một phần ánh sáng <b class="c-blue">xanh lam</b> ra khắp bầu trời, nên trời có màu xanh còn Mặt Trời trông trắng vàng.',
        mid: 'Mặt Trời thấp hơn, đường đi qua không khí dài hơn: nhiều ánh sáng xanh bị tán xạ mất trên đường, nên Mặt Trời ngả vàng và bầu trời sát mặt đất nhạt màu hơn.',
        low: 'Hoàng hôn! Ánh sáng giờ đi qua lượng không khí gấp khoảng {n} lần. Gần như toàn bộ ánh sáng xanh đã bị tán xạ trước khi đến chỗ bạn, nên Mặt Trời và bầu trời quanh nó rực <b class="c-red">cam và đỏ</b>.',
        path: 'Đường đi qua không khí',
        notScale: 'không đúng tỉ lệ',
      },
    },
    lang,
  );
