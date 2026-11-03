// Small science helpers for the Whys pictures and labs. Tested in tests/whys.test.ts.

/** Days from one new moon to the next. */
export const SYNODIC_MONTH = 29.53;
/** Speed of sound in air at about 20 °C, in m/s. */
export const SPEED_OF_SOUND = 343;

/**
 * SVG path of the lit part of the Moon as seen from the Northern Hemisphere.
 * `f` is the fraction of the cycle: 0 new, 0.25 first quarter (right half lit), 0.5 full, 0.75 last quarter.
 * Returns '' for a new moon.
 */
export function moonLitPath(cx: number, cy: number, r: number, f: number): string {
  f = ((f % 1) + 1) % 1;
  const lit = litFraction(f);
  if (lit < 0.002) return '';
  if (lit > 0.998) return `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}Z`;
  const waxing = f < 0.5;
  // The terminator is half an ellipse; its width shrinks to 0 at the quarters.
  const rx = Math.abs(Math.cos(2 * Math.PI * f)) * r;
  const gibbous = lit > 0.5;
  const limbSweep = waxing ? 1 : 0;
  const termSweep = waxing === gibbous ? 1 : 0;
  const n = (v: number) => +v.toFixed(2);
  return `M${n(cx)} ${n(cy - r)}A${n(r)} ${n(r)} 0 0 ${limbSweep} ${n(cx)} ${n(cy + r)}A${n(rx)} ${n(r)} 0 0 ${termSweep} ${n(cx)} ${n(cy - r)}Z`;
}

/** Fraction of the Moon's face that is lit (0 new … 1 full). */
export const litFraction = (f: number) => (1 - Math.cos(2 * Math.PI * f)) / 2;

/** Which of the 8 named phases `f` is closest to: 0 new, 1 waxing crescent … 7 waning crescent. */
export const phaseIndex = (f: number) => Math.round((((f % 1) + 1) % 1) * 8) % 8;

/** Seconds between the flash and the thunder for a strike `km` away (light arrives almost instantly). */
export const thunderDelay = (km: number) => (km * 1000) / SPEED_OF_SOUND;

/** The counting rule: seconds ÷ 3 ≈ kilometres. */
export const kmFromSeconds = (s: number) => s / 3;

/**
 * How much more air sunlight crosses when the Sun is `deg` above the horizon, compared with straight overhead
 * (Kasten & Young 1989 air-mass formula; about 38 at the horizon).
 */
export function airMass(deg: number): number {
  const h = Math.max(0, deg);
  return 1 / (Math.sin((h * Math.PI) / 180) + 0.50572 * Math.pow(h + 6.07995, -1.6364));
}

/**
 * Fraction of light of wavelength `nm` that gets through the air without being scattered (Rayleigh scattering:
 * proportional to 1/λ⁴; about 10% is scattered at 550 nm with the Sun overhead).
 */
export const transmitted = (nm: number, mass: number) => Math.exp(-0.098 * mass * Math.pow(550 / nm, 4));
