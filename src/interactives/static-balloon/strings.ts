import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Static electricity lab',
        label: 'A head of hair next to a balloon. Each rub moves tiny negative charges (electrons, shown as minus signs) from the hair onto the balloon, leaving the hair with plus signs. The more charge, the more the hairs lift toward the balloon and spread apart.',
        rub: 'Rub the balloon on the hair',
        leak: 'Let the charge leak away',
        charge: 'Electrons moved',
        neutral: 'Hair and balloon both have exactly as many plus as minus charges, so they don\'t pull or push on each other.',
        charged: 'Rubbing scrapes electrons (<b class="c-blue">−</b>) off the hair onto the balloon. Now the balloon is negative and the hair is positive (<b class="c-red">+</b>). <b>Opposites attract</b>: the hairs reach toward the balloon.',
        lots: 'Lots of charge! The hairs lift toward the balloon, and they also push each other apart, because each hair has the <b>same</b> charge: <b>like charges repel</b>.',
      },
    },
    lang,
  );
