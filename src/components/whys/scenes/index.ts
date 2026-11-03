// The big picture for each why, by slug (see Scene.astro). Scenes are drawn on a 640 × 400 canvas.
import SkyBlue from './SkyBlue.astro';
import MoonPhases from './MoonPhases.astro';
import Thunder from './Thunder.astro';
import Rainbow from './Rainbow.astro';
import Goosebumps from './Goosebumps.astro';
import WrinklyFingers from './WrinklyFingers.astro';
import Zebra from './Zebra.astro';
import BirdsOnWire from './BirdsOnWire.astro';

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
};
