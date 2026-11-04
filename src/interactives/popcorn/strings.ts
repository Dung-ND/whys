import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Popcorn lab',
        label: 'A popcorn kernel cut in half: a tough outer shell, soft starch inside and tiny drops of water. As it heats up, the water turns into steam and the pressure gauge climbs, until at about 180 °C the shell bursts and the kernel puffs into popcorn.',
        temp: 'Kernel temperature',
        pressure: 'Steam pressure inside',
        times: '{n}× normal air',
        hull: 'tough shell',
        starch: 'starch',
        water: 'water',
        pop: 'POP!',
        cold: 'A popcorn kernel has a tough, waterproof shell. Inside is starch, and a little water: about 14% of the kernel.',
        steam: 'Above 100 °C the water turns into <b>steam</b>. Steam takes up much more space than water, but the tough shell won\'t let it out, so the <b>pressure</b> builds.',
        soft: 'Getting close! The pressure is now {n} times normal air pressure, and the heat is softening the starch into a hot, gooey jelly.',
        popped: '<b>POP!</b> At about 180 °C the shell can\'t hold any more and bursts. The steam rushes out and puffs the gooey starch into a foam, which sets into a fluffy flake 20 to 40 times bigger.',
      },
    },
    lang,
  );
