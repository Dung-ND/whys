// Questions waiting to be written. Pick one with status 'open', claim it, and turn it into a why.
// See CONTRIBUTING.md. To see what's open: `npm run ideas`, or the "Coming soon" page on the site.
//
// Each idea has a one-line hint: a suggestion for the investigate part (a lab or a diagram) and the
// key science or myth to get right. Hints are starting points, not rules.
//
// Claiming: change `status` to 'started' and add `by: 'your name'` in a pull request, before you start
// writing, so nobody else picks the same question. When the why is published, move it to
// src/data/whys.ts (with the next free number) and delete it from this list.

import type { WhyCategory } from './whys';

export interface Idea {
  slug: string;
  category: WhyCategory;
  /** The question, in English. */
  question: string;
  /** A suggestion for the page: what to investigate, and what to be careful about. */
  hint: string;
  status: 'open' | 'started';
  /** Who is writing it (when started). */
  by?: string;
}

const open = (category: WhyCategory, slug: string, question: string, hint: string): Idea => ({ slug, category, question, hint, status: 'open' });

export const ideas: Idea[] = [
  // ───────────── Sky & space ─────────────
  open('sky', 'why-can-we-see-the-moon-in-the-daytime', 'Why can we sometimes see the Moon in the daytime?', 'Lab: Sun, Earth and Moon positions through a month, showing when the Moon is above the horizon by day. It is bright enough to shine through the blue sky.'),
  open('sky', 'why-do-we-have-day-and-night', 'Why do we have day and night?', 'Lab: spin a globe with a sunlit half; pick a city and watch sunrise and sunset. Myth: the Sun goes around Earth.'),
  open('sky', 'why-are-planets-round', 'Why are planets round?', 'Diagram: gravity pulls everything toward the center, squeezing big objects into balls. Small asteroids can stay lumpy.'),
  open('sky', 'why-is-mars-red', 'Why is Mars red?', 'Diagram: iron in Martian dust has rusted (iron oxide). Whoa: Mars sunsets are blue.'),
  open('sky', 'why-does-the-moon-have-craters', 'Why does the Moon have craters?', 'Lab or experiment: drop pebbles into flour. Craters last because the Moon has no wind, rain or plate movements to erase them.'),
  open('sky', 'what-is-a-shooting-star', 'What is a shooting star?', 'Diagram: a grain of space dust burning up as it rushes into the air. Myth: it is a star falling.'),
  open('sky', 'why-do-we-only-see-one-side-of-the-moon', 'Why do we only see one side of the Moon?', 'Lab: the Moon spins exactly once per orbit (tidal locking). Try it: walk around a chair always facing it.'),
  open('sky', 'why-do-astronauts-float', 'Why do astronauts float in space?', 'Diagram: they are falling around Earth all the time (free fall), not escaping gravity. Myth: there is no gravity in space.'),
  open('sky', 'what-is-a-black-hole', 'What is a black hole?', 'Diagram: so much mass squeezed so small that nothing, not even light, can escape. Avoid the vacuum-cleaner myth: from far away it pulls like any other mass.'),
  open('sky', 'why-do-comets-have-tails', 'Why do comets have tails?', 'Diagram: sunlight and solar wind push gas and dust off the icy comet. The tail points away from the Sun, not behind the comet.'),
  open('sky', 'why-is-space-dark', 'Why is space dark when the Sun is so bright?', 'Diagram: no air to scatter sunlight (compare with the blue-sky why). Bonus: the night-sky puzzle (Olbers) and the finite age of the universe.'),
  open('sky', 'how-do-we-know-how-far-away-stars-are', 'How do we know how far away stars are?', 'Lab: parallax as Earth goes around the Sun (links to the car-and-Moon why). Light-years.'),
  open('sky', 'what-causes-a-solar-eclipse', 'What causes a solar eclipse?', 'Lab: line up Sun, Moon and Earth; the Moon is 400 times smaller but about 400 times closer. Safety: never look at an eclipse without eclipse glasses.'),
  open('sky', 'why-does-saturn-have-rings', 'Why does Saturn have rings?', 'Diagram: billions of chunks of ice and rock; likely from a moon or comet torn apart. The rings are very thin and slowly fading.'),
  open('sky', 'what-are-the-northern-lights', 'What are the northern lights?', 'Diagram: particles from the Sun guided by Earth\'s magnetic field make gas high in the air glow. Colors: oxygen green and red, nitrogen blue and purple.'),
  open('sky', 'why-is-there-no-sound-in-space', 'Why is there no sound in space?', 'Lab: sound needs something to travel through; remove the air and the wave has nothing to pass along. Myth: movie explosions in space.'),

  // ───────────── Earth & weather ─────────────
  open('weather', 'why-do-clouds-float', 'Why do clouds float when they are full of water?', 'Diagram: tiny droplets fall very slowly and rising warm air holds them up. A whole cloud can weigh as much as many elephants, spread out.'),
  open('weather', 'why-is-snow-white', 'Why is snow white when ice is clear?', 'Diagram: countless crystal surfaces bounce all colors of light around. Same reason as white sugar vs a clear sugar cube.'),
  open('weather', 'what-makes-the-wind-blow', 'What makes the wind blow?', 'Lab: the Sun warms land and sea unevenly; warm air rises and cooler air rushes in. Sea breeze by day, land breeze at night.'),
  open('weather', 'why-does-it-rain', 'Why does it rain?', 'Diagram: water evaporates, rises, cools into droplets, droplets merge until they are heavy enough to fall. Myth: raindrops are tear-shaped (they look like burger buns).'),
  open('weather', 'how-do-hailstones-form', 'How do hailstones form?', 'Diagram: strong updrafts toss ice pellets up and down through a storm cloud, adding layers like an onion.'),
  open('weather', 'why-do-earthquakes-happen', 'Why do earthquakes happen?', 'Lab: plates of Earth\'s crust stick, bend and suddenly slip. Safety: drop, cover and hold on.'),
  open('weather', 'why-is-the-sea-blue', 'Why is the sea blue?', 'Diagram: water itself absorbs red light a little, so deep water looks blue; it also reflects the sky. Careful: it is not only the sky\'s reflection.'),
  open('weather', 'what-causes-tides', 'What causes the tides?', 'Lab: the Moon\'s pull is stronger on the near side of Earth, making two bulges; Earth spins through them. Two high tides a day.'),
  open('weather', 'what-is-fog', 'What is fog?', 'Diagram: a cloud touching the ground, formed when moist air cools. Try it: breath on a cold mirror.'),
  open('weather', 'why-is-there-dew-in-the-morning', 'Why is the grass wet in the morning?', 'Lab: at night the ground cools, and water vapor in the air condenses on cool surfaces (the dew point). Same as a cold glass "sweating".'),
  open('weather', 'why-are-mountain-tops-cold', 'Why are mountain tops cold when they are closer to the Sun?', 'Lab: air expands and cools as pressure drops with height; the Sun warms the ground, not the air. A few km is nothing compared with 150 million km.'),
  open('weather', 'how-do-caves-form', 'How do caves form?', 'Diagram: slightly acidic rainwater slowly dissolves limestone over thousands of years. Stalactites and stalagmites.'),
  open('weather', 'why-are-deserts-cold-at-night', 'Why do deserts get so cold at night?', 'Diagram: dry air and clear skies let the ground\'s heat escape to space; no clouds or water to hold it in.'),
  open('weather', 'what-makes-a-tornado-spin', 'What makes a tornado spin?', 'Diagram: winds at different heights roll the air into a spinning tube, which a storm\'s updraft tips upright. Scientists still cannot predict exactly which storms make tornadoes (mystery).'),
  open('weather', 'why-does-rain-smell', 'Why does rain have a smell?', 'Diagram: petrichor; geosmin made by soil bacteria, which our noses detect in tiny amounts. Raindrops fling the scent into the air.'),
  open('weather', 'how-do-rivers-carve-canyons', 'How do rivers carve canyons?', 'Lab: sand and gravel carried by moving water grind the rock away, a little each year, over millions of years.'),
  open('weather', 'why-are-rain-clouds-grey', 'Why are rain clouds grey?', 'Diagram: thick clouds with big drops let little light through from above, so their bottoms look dark. Thin clouds look white.'),

  // ───────────── My body ─────────────
  open('body', 'why-do-we-sneeze', 'Why do we sneeze?', 'Diagram: the nose\'s tickle sensors trigger a reflex to blast out irritants. Sunlight sneezing (photic sneeze) is a fun extra. Myth: your heart stops when you sneeze.'),
  open('body', 'why-do-we-dream', 'Why do we dream?', 'Mostly a mystery: REM sleep, memory sorting, practicing for threats. Be honest about what is not known.'),
  open('body', 'why-does-my-tummy-rumble', 'Why does my tummy rumble?', 'Diagram: muscle waves push gas and liquid through the gut; louder when empty because there is less food to muffle it.'),
  open('body', 'why-do-we-sweat', 'Why do we sweat?', 'Lab: evaporating water carries heat away. Try it: wet one arm and blow on both.'),
  open('body', 'why-do-we-have-fingerprints', 'Why do we have fingerprints?', 'Scientists are unsure (mystery): grip, touch sensitivity. Every pattern is unique, even in identical twins.'),
  open('body', 'why-do-our-ears-pop', 'Why do our ears pop on airplanes?', 'Lab: air pressure outside changes; a small tube (Eustachian tube) opens to even out the pressure on both sides of the eardrum. Swallowing or yawning helps.'),
  open('body', 'why-does-my-voice-sound-different-on-recordings', 'Why does my voice sound strange on a recording?', 'Diagram: you normally hear yourself through your skull bones too, which adds low sounds; a recording only has the sound through the air.'),
  open('body', 'why-do-we-get-brain-freeze', 'Why do we get brain freeze from ice cream?', 'Diagram: cold on the roof of the mouth makes blood vessels narrow then widen quickly, and nearby nerves report pain from the forehead. Fix: press your tongue to the roof of your mouth.'),
  open('body', 'why-do-we-need-to-sleep', 'Why do we need to sleep?', 'Partly a mystery: the brain clears waste, stores memories, and the body repairs. How much sleep different ages need.'),
  open('body', 'why-do-we-blink', 'Why do we blink?', 'Lab: count blinks while reading vs talking. Blinking spreads tears to keep eyes moist and clean; we blink less when concentrating on screens.'),
  open('body', 'why-do-we-have-belly-buttons', 'Why do we have belly buttons?', 'Diagram: the scar from the umbilical cord that fed you before you were born. Innies and outies.'),
  open('body', 'why-does-hair-turn-grey', 'Why does hair turn grey?', 'Diagram: pigment cells in hair roots slowly stop making melanin. Myth: a fright turns hair white overnight (scientists are still studying how stress affects it).'),
  open('body', 'why-do-we-get-a-fever', 'Why do we get a fever when we are sick?', 'Diagram: the brain turns up the body\'s thermostat to help fight germs. Safety: see an adult or doctor for a high fever.'),
  open('body', 'why-do-legs-fall-asleep', 'Why do our legs "fall asleep"?', 'Diagram: pressing on a nerve (and its blood supply) stops its messages; pins and needles as it wakes up.'),
  open('body', 'why-do-we-have-two-eyes', 'Why do we have two eyes?', 'Lab: each eye sees a slightly different view, and the brain combines them to judge distance. Try catching a ball with one eye closed.'),
  open('body', 'why-cant-we-tickle-ourselves', 'Why can\'t we tickle ourselves?', 'Diagram: the brain predicts the touch from your own movement and turns the feeling down. Researchers built tickle robots to test it.'),
  open('body', 'why-do-baby-teeth-fall-out', 'Why do baby teeth fall out?', 'Diagram: adult teeth grow underneath and dissolve the baby tooth\'s roots; a small jaw needs small teeth first.'),
  open('body', 'why-is-blood-red', 'Why is blood red?', 'Diagram: hemoglobin with iron carries oxygen and is red. Myth: blood in veins is blue (it is dark red; veins look blue through skin).'),
  open('body', 'why-do-scabs-itch', 'Why do healing cuts itch?', 'Diagram: a scab protects the wound while new skin grows; nerves react to the healing. Do not pick it!'),

  // ───────────── Animals ─────────────
  open('animals', 'why-do-cats-purr', 'Why do cats purr?', 'Diagram: vibrations in the voice box, while breathing in and out. Not only happiness: cats also purr when hurt or stressed. Some of the how is still being studied.'),
  open('animals', 'how-do-birds-fly', 'How do birds fly?', 'Lab: wing shape and flapping push air down and back, so the air pushes the bird up and forward. Hollow, light bones.'),
  open('animals', 'why-do-dogs-wag-their-tails', 'Why do dogs wag their tails?', 'Diagram: tail language; wagging can mean excited, nervous or unsure, not only happy. Study: wags to the right vs left.'),
  open('animals', 'how-do-fish-breathe-underwater', 'How do fish breathe underwater?', 'Diagram: gills pull dissolved oxygen out of water flowing over thin, blood-filled folds.'),
  open('animals', 'why-do-some-animals-hibernate', 'Why do some animals hibernate?', 'Lab: heart rate and body temperature drop to save energy when food is scarce. Bears vs true hibernators like ground squirrels.'),
  open('animals', 'how-do-bats-see-in-the-dark', 'How do bats find their way in the dark?', 'Lab: echolocation; clicks bounce off objects, and the echo delay tells distance. Myth: bats are blind (they can see).'),
  open('animals', 'why-do-chameleons-change-color', 'Why do chameleons change color?', 'Diagram: tiny crystals in skin cells change spacing to reflect different colors. Mostly for signaling and temperature, not for hiding.'),
  open('animals', 'how-do-spiders-make-webs', 'How do spiders make webs?', 'Diagram: silk is a liquid protein that hardens as it is pulled out; different silks for frame, spiral and sticky threads. Stronger than steel for its weight.'),
  open('animals', 'why-do-birds-migrate', 'Why do birds migrate?', 'Diagram: follow food and good nesting places with the seasons. How they navigate (Sun, stars, Earth\'s magnetic field) is still partly a mystery.'),
  open('animals', 'why-do-bees-make-honey', 'Why do bees make honey?', 'Diagram: stored food for winter; nectar is dried by fanning wings until it is thick enough not to spoil.'),
  open('animals', 'how-do-geckos-climb-walls', 'How do geckos climb walls?', 'Diagram: millions of tiny hairs on their toes get so close to the surface that weak attractions between molecules add up. No glue, no suction.'),
  open('animals', 'how-do-owls-turn-their-heads', 'How can owls turn their heads so far?', 'Diagram: owls cannot move their eyes, so their necks turn up to about 270°, with extra neck bones and special blood vessels.'),
  open('animals', 'why-do-mosquitoes-bite', 'Why do mosquitoes bite?', 'Diagram: only females bite, for the protein to make eggs. They find us by our breath (carbon dioxide), warmth and smell. Why the bite itches.'),
  open('animals', 'why-do-giraffes-have-long-necks', 'Why do giraffes have long necks?', 'Two ideas: reaching high leaves, and males fighting with their necks. Still debated (mystery). They have only 7 neck bones, like us.'),
  open('animals', 'why-do-snakes-shed-their-skin', 'Why do snakes shed their skin?', 'Diagram: the outer skin does not grow, so a new layer forms underneath and the old one peels off in one piece, even over the eyes.'),
  open('animals', 'how-do-ants-find-food', 'How do ants find their way to food?', 'Lab: scent trails (pheromones) that get stronger as more ants use the shortest path.'),
  open('animals', 'why-do-whales-sing', 'Why do whales sing?', 'Diagram: humpback males sing long, changing songs, probably to attract mates; the song spreads between whale groups like a hit song. Partly a mystery.'),
  open('animals', 'why-do-dogs-pant', 'Why do dogs pant?', 'Lab: dogs sweat very little (mostly from their paws); panting evaporates water from the tongue and mouth to cool down.'),
  open('animals', 'why-are-flamingos-pink', 'Why are flamingos pink?', 'Diagram: pigments (carotenoids) in the shrimp and algae they eat. Chicks are grey. Link to the autumn-leaves why.'),

  // ───────────── Plants ─────────────
  open('plants', 'why-are-plants-green', 'Why are plants green?', 'Lab: chlorophyll absorbs red and blue light and reflects green. Why not black is still discussed by scientists.'),
  open('plants', 'how-do-plants-drink-water', 'How do plants drink water?', 'Experiment: celery or a white flower in colored water. Water evaporates from leaves and pulls more up through tiny tubes.'),
  open('plants', 'why-do-flowers-smell-nice', 'Why do flowers smell nice?', 'Diagram: scents attract pollinators; some flowers smell of rotting meat to attract flies instead.'),
  open('plants', 'how-do-seeds-know-which-way-is-up', 'How do seeds know which way is up?', 'Experiment: sprout beans in a jar, then turn it. Roots sense gravity with heavy starch grains that settle in their cells.'),
  open('plants', 'why-do-plants-have-thorns', 'Why do some plants have thorns?', 'Diagram: defense against animals that eat them. Thorns, spines and prickles are different parts.'),
  open('plants', 'how-do-trees-grow-so-tall', 'How do trees grow so tall?', 'Diagram: wood made from air (carbon dioxide) and water; the tallest trees are about 115 m, limited by how high they can lift water.'),
  open('plants', 'why-do-fruits-change-color-when-ripe', 'Why do fruits change color when they ripen?', 'Diagram: green chlorophyll fades and other pigments appear, telling animals "eat me now and spread my seeds".'),
  open('plants', 'how-do-venus-flytraps-catch-insects', 'How do Venus flytraps catch insects?', 'Lab: trigger hairs must be touched twice within about 20 seconds; the trap snaps by quickly changing shape. They live in poor soil.'),
  open('plants', 'why-do-some-trees-keep-their-leaves', 'Why do some trees keep their leaves all winter?', 'Diagram: tough, waxy needles lose little water in frozen ground; they can make food on sunny winter days.'),
  open('plants', 'how-do-mushrooms-grow', 'How do mushrooms grow?', 'Diagram: mushrooms are fungi, not plants; the mushroom is just the fruit of a huge underground web of threads. Safety: never eat wild mushrooms.'),
  open('plants', 'why-do-bananas-turn-brown', 'Why do bananas turn brown?', 'Experiment: ripening gas (ethylene) and browning enzymes; a bag with an apple ripens bananas faster.'),
  open('plants', 'how-old-can-trees-get', 'How can we tell how old a tree is?', 'Diagram: one growth ring per year; wide rings in good years. Some trees are over 4,000 years old.'),
  open('plants', 'why-do-plants-need-sunlight', 'Why do plants need sunlight?', 'Lab: photosynthesis turns light, water and carbon dioxide into sugar and oxygen. Pondweed bubbles faster in brighter light.'),
  open('plants', 'why-do-dandelion-seeds-float', 'Why do dandelion seeds float so far?', 'Diagram: the fluffy parachute makes a tiny swirl of air (a vortex ring) above it that slows the fall.'),
  open('plants', 'why-do-cut-apples-turn-brown', 'Why do cut apples turn brown?', 'Experiment: an enzyme reacts with oxygen once cells are cut; lemon juice slows it. Link to the onion why (cut cells mix chemicals).'),
  open('plants', 'how-do-cactuses-survive-in-the-desert', 'How do cactuses survive in the desert?', 'Diagram: spines instead of leaves, a waxy skin, a stem that stores water, and breathing at night to save water.'),
  open('plants', 'why-does-cut-grass-smell', 'Why does cut grass smell?', 'Diagram: damaged grass releases chemicals as a distress signal, which can attract insects that eat the grass\'s attackers.'),

  // ───────────── Everyday things ─────────────
  open('everyday', 'how-does-soap-clean', 'How does soap clean?', 'Diagram: soap molecules have a water-loving head and a grease-loving tail; they surround grease and germs and lift them off.'),
  open('everyday', 'why-do-bubbles-have-rainbow-colors', 'Why do soap bubbles have rainbow colors?', 'Lab: light bouncing off the inside and outside of a very thin film; colors change with thickness. Black spots just before it pops.'),
  open('everyday', 'why-does-a-spoon-look-bent-in-water', 'Why does a spoon look bent in a glass of water?', 'Lab: light bends when it passes from water to air (refraction). Link to the rainbow why.'),
  open('everyday', 'how-does-a-microwave-heat-food', 'How does a microwave oven heat food?', 'Diagram: microwaves make water molecules jiggle, and jiggling is heat. Myth: it heats from the inside out. Safety: no metal.'),
  open('everyday', 'why-does-bread-rise', 'Why does bread rise?', 'Experiment: yeast eats sugar and makes carbon dioxide bubbles; a balloon on a bottle of yeast, sugar and warm water.'),
  open('everyday', 'why-does-metal-feel-colder-than-wood', 'Why does metal feel colder than wood?', 'Lab: both are at room temperature; metal carries heat away from your hand much faster. Ice-cube race on a metal and a plastic plate.'),
  open('everyday', 'why-does-salt-melt-ice', 'Why does salt melt ice on roads?', 'Experiment: salt water freezes at a lower temperature than fresh water, so salted ice melts below 0 °C.'),
  open('everyday', 'how-do-magnets-work', 'How do magnets work?', 'Diagram: tiny magnetic regions (domains) lined up in the same direction; heating or dropping can scramble them.'),
  open('everyday', 'why-can-we-see-our-breath-when-its-cold', 'Why can we see our breath on cold days?', 'Diagram: warm, wet breath cools quickly and its water vapor condenses into a tiny cloud. Link to the fog idea.'),
  open('everyday', 'why-does-a-kettle-whistle', 'Why does a kettle whistle?', 'Diagram: steam rushing through a small hole forms spinning swirls of air that vibrate at a high pitch.'),
  open('everyday', 'why-do-mirrors-flip-left-and-right', 'Why do mirrors flip left and right but not up and down?', 'Lab: a mirror actually flips front and back; we imagine turning around to stand where the reflection is.'),
  open('everyday', 'how-does-a-fridge-keep-food-cold', 'How does a fridge keep food cold?', 'Diagram: a liquid that evaporates inside soaks up heat and gives it out at the back (feel the warm coils). Same idea as sweating.'),
  open('everyday', 'why-do-glasses-fog-up', 'Why do glasses fog up when you come inside?', 'Lab: cold lenses cool the warm, moist indoor air until its water condenses into droplets.'),
  open('everyday', 'how-does-velcro-stick', 'How does Velcro stick?', 'Diagram: tiny hooks catch tiny loops. Invented after an engineer looked at burrs stuck to his dog under a microscope.'),
  open('everyday', 'why-do-helium-balloons-float', 'Why do helium balloons float?', 'Lab: helium is lighter than air, so air pushes the balloon up (like ice in water). Why they sink after a few days.'),
  open('everyday', 'why-do-seashells-sound-like-the-sea', 'Why can we hear the sea in a seashell?', 'Experiment: a cup works too; the shell echoes and boosts some of the background sounds around you. Myth: it is the sea.'),
  open('everyday', 'why-does-an-egg-go-hard-when-boiled', 'Why does an egg go hard when you boil it?', 'Diagram: heat unfolds egg proteins, which tangle together into a solid net. Safety: an adult handles boiling water.'),
  open('everyday', 'how-do-touchscreens-work', 'How do touchscreens know where you touch?', 'Diagram: your finger carries a little electric charge that changes a grid of tiny electrodes; why gloves don\'t work.'),
  open('everyday', 'why-does-a-moving-bicycle-stay-up', 'Why does a moving bicycle stay up?', 'Lab: mostly steering: when it leans, the front wheel turns into the lean and brings it back under. Partly still studied. Myth: it is only the spinning wheels.'),
];
