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

/** Tilt of Earth's axis, in degrees. */
export const AXIAL_TILT = 23.44;

/**
 * The Sun's declination (degrees north of the equator) on day `n` of the year (1 = 1 January).
 * Cooper's approximation: good to about a degree, plenty for pictures.
 */
export const declination = (n: number) => AXIAL_TILT * Math.sin((2 * Math.PI * (284 + n)) / 365);

/** How high the Sun is at noon (degrees above the horizon) at latitude `lat` (north positive). */
export const noonSunHeight = (lat: number, n: number) => 90 - Math.abs(lat - declination(n));

/** Hours from sunrise to sunset at latitude `lat` on day `n` (0 or 24 in polar night or midnight sun). */
export function dayLength(lat: number, n: number): number {
  const x = -Math.tan((lat * Math.PI) / 180) * Math.tan((declination(n) * Math.PI) / 180);
  if (x <= -1) return 24;
  if (x >= 1) return 0;
  return (2 * Math.acos(x) * 180) / Math.PI / 15;
}

/** How much a beam of sunlight spreads out on flat ground when the Sun is `deg` high (1 when overhead). */
export const beamSpread = (deg: number) => 1 / Math.sin((Math.max(deg, 1) * Math.PI) / 180);

/** Densities in g/cm³: fresh water near 4 °C, sea water, and ice. */
export const DENSITY = { water: 1.0, seawater: 1.025, ice: 0.917 };

/** Fraction of a floating object below the surface (Archimedes): its density over the liquid's. */
export const fractionSubmerged = (object: number, liquid: number) => Math.min(1, object / liquid);
