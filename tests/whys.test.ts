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
