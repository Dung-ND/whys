import { translator } from '@/lib/ui-strings';
import type { Lang } from '@/config/site';

export const strings = (lang: Lang) =>
  translator(
    {
      en: {
        title: 'Car window lab',
        label: 'The view from a moving car at night. Fence posts close by whiz past, trees farther away slide by more slowly, distant mountains barely creep, and the Moon stays in the same place in the window.',
        speed: 'Car speed',
        slow: 'Shown 10× slower than real life',
        post: 'Fence post (5 m away)',
        tree: 'Tree (40 m)',
        mountain: 'Mountain (10 km)',
        moon: 'Moon (384,000 km)',
        perSecond: 'How far each one slides across your view in 1 second',
        stopped: 'The car is stopped. Nothing slides past the window, near or far.',
        moving: 'The near fence posts zoom past, the trees glide, the mountains barely move, and the Moon… stays right where it is. Your brain notices it keeping up with you, so it seems to follow.',
        fast: 'Faster! The posts are a blur, but the Moon still hasn\'t moved. It\'s so far away that driving for a whole day wouldn\'t change its direction noticeably.',
      },
    },
    lang,
  );
