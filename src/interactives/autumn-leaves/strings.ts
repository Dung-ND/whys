import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Leaf color lab',
        label: 'A leaf whose color changes through autumn, next to three bars showing how much of each colored chemical (pigment) it holds: green chlorophyll, yellow-orange carotenoids and red anthocyanins.',
        weeks: 'Weeks into autumn',
        tree: 'Tree',
        maple: 'Red maple',
        birch: 'Birch',
        barGreen: 'Chlorophyll (green)',
        barYellow: 'Carotenoids (yellow, orange)',
        barRed: 'Anthocyanins (red)',
        summer: '<b class="c-green">Late summer.</b> The leaf is packed with green <b>chlorophyll</b>, which catches sunlight to make food. There is yellow in the leaf too, but so much green hides it.',
        fading: '<b>Days get shorter and nights cooler.</b> The tree stops making chlorophyll and starts taking it apart to save its useful parts for spring. The green fades.',
        yellow: '<b class="c-amber">The hidden colors appear!</b> The yellow and orange <b>carotenoids</b> were in the leaf all summer. Now that the green is gone, you can see them.',
        red: '<b class="c-red">Red comes in.</b> Some trees, like this maple, make a brand-new red pigment in autumn: <b>anthocyanin</b>. Sunny days and cool nights make the reds brightest.',
        brown: '<b>The leaf dries out.</b> The pigments break down, leaving brown, and the tree seals the leaf off. It falls, and the tree rests through winter.',
      },
    },
    lang,
  );
