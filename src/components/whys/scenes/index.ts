// The big picture for each why, by slug (see Scene.astro). Scenes are drawn on a 640 × 400 canvas.
import SkyBlue from './SkyBlue.astro';
import MoonPhases from './MoonPhases.astro';
import Thunder from './Thunder.astro';
import Rainbow from './Rainbow.astro';
import Goosebumps from './Goosebumps.astro';
import WrinklyFingers from './WrinklyFingers.astro';
import Zebra from './Zebra.astro';
import BirdsOnWire from './BirdsOnWire.astro';
import Seasons from './Seasons.astro';
import Twinkle from './Twinkle.astro';
import SaltySea from './SaltySea.astro';
import AutumnLeaves from './AutumnLeaves.astro';
import Onion from './Onion.astro';
import Iceberg from './Iceberg.astro';
import Yawn from './Yawn.astro';
import CatFall from './CatFall.astro';
import CarMoon from './CarMoon.astro';
import HotSun from './HotSun.astro';
import Volcano from './Volcano.astro';
import Sunflowers from './Sunflowers.astro';
import Fireflies from './Fireflies.astro';
import Balloon from './Balloon.astro';
import Popcorn from './Popcorn.astro';
import Hiccups from './Hiccups.astro';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const scenes: Record<string, any> = {
  'why-is-the-sky-blue': SkyBlue,
  'why-does-the-moon-change-shape': MoonPhases,
  'why-do-we-hear-thunder-after-lightning': Thunder,
  'why-do-rainbows-appear': Rainbow,
  'why-do-we-get-goosebumps': Goosebumps,
  'why-do-fingers-wrinkle-in-water': WrinklyFingers,
  'why-do-zebras-have-stripes': Zebra,
  'why-dont-birds-get-shocked-on-power-lines': BirdsOnWire,
  'why-do-we-have-seasons': Seasons,
  'why-do-stars-twinkle': Twinkle,
  'why-is-the-sea-salty': SaltySea,
  'why-do-leaves-change-color-in-autumn': AutumnLeaves,
  'why-do-onions-make-you-cry': Onion,
  'why-does-ice-float': Iceberg,
  'why-do-we-yawn': Yawn,
  'how-do-cats-land-on-their-feet': CatFall,
  'why-does-the-moon-follow-our-car': CarMoon,
  'why-is-the-sun-so-hot': HotSun,
  'why-do-volcanoes-erupt': Volcano,
  'why-do-sunflowers-face-the-sun': Sunflowers,
  'how-do-fireflies-glow': Fireflies,
  'why-does-a-rubbed-balloon-stick': Balloon,
  'why-does-popcorn-pop': Popcorn,
  'why-do-we-get-hiccups': Hiccups,
};
