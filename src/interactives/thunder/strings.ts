import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Thunder timer',
        label: 'A storm cloud on the left and a kid on the right. When lightning strikes, the flash reaches the kid at once, while the sound spreads out as a ring and arrives seconds later.',
        distance: 'How far away the storm is',
        strike: 'Make lightning',
        ready: 'Pick a distance, then press <b>Make lightning</b> and count the seconds until the boom.',
        flash: 'Flash! The light got here in {us} millionths of a second. Now the sound is on its way… count!',
        boom: '<b>BOOM!</b> The thunder took <b>{s} seconds</b>. Seconds ÷ 3 = <b>{km} km</b> away (or seconds ÷ 5 ≈ {mi} miles).',
        seconds: 'Seconds counted',
      },
      vi: {
        title: 'Đồng hồ sấm sét',
        label: 'Đám mây giông bên trái và một bạn nhỏ bên phải. Khi sét đánh, tia chớp đến chỗ bạn ngay lập tức, còn âm thanh lan ra thành vòng tròn và đến nơi sau vài giây.',
        distance: 'Cơn giông cách bao xa',
        strike: 'Tạo tia sét',
        ready: 'Chọn khoảng cách, rồi bấm <b>Tạo tia sét</b> và đếm số giây cho đến khi nghe tiếng sấm.',
        flash: 'Chớp! Ánh sáng đến nơi chỉ trong {us} phần triệu giây. Giờ âm thanh đang trên đường đến… hãy đếm!',
        boom: '<b>ẦM!</b> Tiếng sấm mất <b>{s} giây</b>. Số giây ÷ 3 = cách <b>{km} km</b>.',
        seconds: 'Số giây đã đếm',
      },
    },
    lang,
  );
