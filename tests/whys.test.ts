import { test } from 'node:test';
import assert from 'node:assert/strict';
import { moonLitPath, litFraction, phaseIndex, thunderDelay, kmFromSeconds, airMass, transmitted } from '../src/lib/whys-science.ts';

const close = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} ≉ ${b}`);

test('moon: lit fraction through the month', () => {
  close(litFraction(0), 0);
  close(litFraction(0.25), 0.5);
  close(litFraction(0.5), 1);
  close(litFraction(0.75), 0.5);
});

test('moon: phase names', () => {
  assert.equal(phaseIndex(0), 0);
  assert.equal(phaseIndex(0.25), 2);
  assert.equal(phaseIndex(0.5), 4);
  assert.equal(phaseIndex(0.75), 6);
  assert.equal(phaseIndex(0.99), 0);
});

test('moon: new moon draws nothing, full moon a whole disc', () => {
  assert.equal(moonLitPath(0, 0, 10, 0), '');
  assert.match(moonLitPath(0, 0, 10, 0.5), /A10 10 0 1 1/);
});

test('moon: waxing is lit on the right, waning on the left (Northern Hemisphere)', () => {
  // The limb arc goes top → bottom clockwise (through the right) while waxing.
  assert.match(moonLitPath(0, 0, 10, 0.2), /^M0 -10A10 10 0 0 1 0 10/);
  assert.match(moonLitPath(0, 0, 10, 0.8), /^M0 -10A10 10 0 0 0 0 10/);
  // First quarter: the terminator is a straight line.
  assert.match(moonLitPath(0, 0, 10, 0.25), /A0 10/);
});

test('thunder: about 3 seconds per kilometre', () => {
  close(thunderDelay(1), 2.915, 0.01);
  close(kmFromSeconds(thunderDelay(2)), 1.94, 0.01);
});

test('sky: air mass is 1 overhead and about 38 at the horizon', () => {
  close(airMass(90), 1, 0.001);
  close(airMass(30), 2, 0.01);
  assert.ok(airMass(0) > 37 && airMass(0) < 39);
});

test('sky: blue is scattered more than red (≈ 1/λ⁴)', () => {
  const ratio = Math.log(transmitted(450, 1)) / Math.log(transmitted(680, 1));
  close(ratio, (680 / 450) ** 4, 1e-9);
  assert.ok(ratio > 5);
  // At sunset almost all the blue is gone, but a good part of the red gets through.
  assert.ok(transmitted(450, 38) < 0.01);
  assert.ok(transmitted(680, 38) > 0.2);
});

import { declination, noonSunHeight, dayLength, beamSpread, DENSITY, fractionSubmerged } from '../src/lib/whys-science.ts';

test('seasons: the Sun is overhead at the tropics at the solstices', () => {
  close(declination(172), 23.44, 0.1); // 21 June
  close(declination(355), -23.44, 0.1); // 21 December
  close(declination(81), 0, 1); // 22 March
});

test('seasons: noon Sun height and day length', () => {
  // At the equator on an equinox, the Sun is overhead and day and night are equal.
  close(noonSunHeight(0, 81), 90, 1);
  close(dayLength(0, 81), 12, 0.05);
  // London (51.5° N): about 62° and 16.4 h in June, 15° and 7.8 h in December.
  close(noonSunHeight(51.5, 172), 62, 0.5);
  close(noonSunHeight(51.5, 355), 15, 0.5);
  close(dayLength(51.5, 172), 16.4, 0.3);
  close(dayLength(51.5, 355), 7.8, 0.3);
  // The far north has midnight sun in June and polar night in December.
  assert.equal(dayLength(80, 172), 24);
  assert.equal(dayLength(80, 355), 0);
  // The Southern Hemisphere has the opposite seasons.
  assert.ok(dayLength(-34, 355) > dayLength(-34, 172));
});

test('seasons: low sunlight spreads over more ground', () => {
  close(beamSpread(90), 1);
  close(beamSpread(30), 2, 1e-9);
});

test('ice: about 9% bigger than the water it came from, about 90% under water when floating', () => {
  close(DENSITY.water / DENSITY.ice, 1.09, 0.01);
  close(fractionSubmerged(DENSITY.ice, DENSITY.water), 0.917, 0.001);
  close(fractionSubmerged(DENSITY.ice, DENSITY.seawater), 0.89, 0.01);
});

import { angularSpeed, MOON_DISTANCE_KM, steamPressure, POP_TEMPERATURE, SUNLIGHT_SECONDS } from '../src/lib/whys-science.ts';

test('moon in the car: near things whiz by, the Moon barely moves', () => {
  // At 72 km/h (20 m/s), a post 5 m away sweeps past at about 229° per second…
  close(angularSpeed(72, 5), 229.2, 0.1);
  // …while the Moon shifts by about a millionth of a degree.
  assert.ok(angularSpeed(72, MOON_DISTANCE_KM * 1000) < 1e-5);
  // Driving to the Moon at 100 km/h would take about 160 days.
  close(MOON_DISTANCE_KM / 100 / 24, 160, 1);
});

test('popcorn: steam pressure from steam tables', () => {
  close(steamPressure(100), 1.014, 1e-9);
  close(steamPressure(POP_TEMPERATURE), 10.03, 1e-9);
  close(steamPressure(170), (6.181 + 10.03) / 2, 1e-9);
  assert.ok(steamPressure(150) > steamPressure(140));
});

test('sunlight takes about 8 minutes 20 seconds to reach Earth', () => {
  close(SUNLIGHT_SECONDS, 499, 1);
});
