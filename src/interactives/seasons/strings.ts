import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Seasons lab',
        label: 'Left: Earth going around the Sun over a year, its axis always tilted the same way. Right: the Sun at noon in the chosen place, with a beam of sunlight landing on the ground: the lower the Sun, the wider the patch it covers.',
        date: 'Date',
        place: 'Place',
        equator: 'Equator',
        hanoi: 'Hanoi',
        london: 'London',
        sydney: 'Sydney',
        height: 'Sun at noon',
        daylight: 'Daylight',
        spread: 'Sunlight spread over',
        hours: '{n} h',
        times: '{n}× the ground',
        noonIn: 'Noon in {place}',
        orbit: 'Earth around the Sun',
        months: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
        summer: '<b class="c-red">Summer in {place}.</b> Earth\'s tilt leans this half of the world toward the Sun. The Sun climbs high, its light lands on a small patch of ground, and days are long: lots of warmth.',
        winter: '<b class="c-blue">Winter in {place}.</b> This half of the world leans away from the Sun. The Sun stays low, the same sunlight spreads over {x} times more ground, and days are short: little warmth.',
        between: '<b>Spring or autumn in {place}.</b> The tilt points sideways to the Sun, so neither half leans toward it, and day and night are about the same length.',
        tropics: '<b>Near the equator</b> the Sun is high at noon all year and days are always about 12 hours, so it\'s warm all year round. Instead of summer and winter, many places have rainy and dry seasons.',
      },
    },
    lang,
  );
