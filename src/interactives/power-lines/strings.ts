import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Power line lab',
        label: 'Two power lines: the top one is live, the bottom one is at 0 volts. Glowing dots show electric current. A bird sits on the top wire, or stretches to touch both wires.',
        bird: 'The bird',
        one: 'Sits on one wire',
        two: 'Touches two wires',
        live: 'Live wire: 7,200 V',
        zero: 'Other wire: 0 V',
        diff: 'Push across the bird',
        oneCap: 'Both feet are on the same wire, so both are at <b>7,200 V</b>. There is no difference to push electricity through the bird: the current stays in the wire. The bird is safe.',
        twoCap: 'Now the bird touches the live wire <i>and</i> a wire at 0 V. There is a <b class="c-red">7,200 V</b> difference across its body, so current rushes through the bird. <b>Danger!</b> This is why big birds with wide wings are at risk.',
      },
      vi: {
        title: 'Thí nghiệm dây điện',
        label: 'Hai dây điện: dây trên đang có điện, dây dưới ở 0 vôn. Các chấm sáng cho thấy dòng điện. Một chú chim đậu trên dây trên, hoặc vươn ra chạm vào cả hai dây.',
        bird: 'Chú chim',
        one: 'Đậu trên một dây',
        two: 'Chạm vào hai dây',
        live: 'Dây có điện: 7.200 V',
        zero: 'Dây kia: 0 V',
        diff: 'Hiệu điện thế qua chim',
        oneCap: 'Cả hai chân cùng đặt trên một dây nên đều ở <b>7.200 V</b>. Không có chênh lệch nào để đẩy điện chạy qua người chim: dòng điện vẫn đi trong dây. Chú chim an toàn.',
        twoCap: 'Giờ chú chim chạm vào dây có điện <i>và</i> một dây 0 V. Có chênh lệch <b class="c-red">7.200 V</b> giữa hai đầu cơ thể nên dòng điện chạy ào qua chú chim. <b>Nguy hiểm!</b> Vì vậy những loài chim lớn, sải cánh rộng dễ gặp nạn.',
      },
    },
    lang,
  );
