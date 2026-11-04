<script lang="ts">
  // Seasons come from the tilt: the noon Sun height, the day length and how widely sunlight spreads,
  // computed for a real place and date (src/lib/whys-science.ts).
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Segmented from '@/components/ui/Segmented.svelte';
  import Readout from '@/components/ui/Readout.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { AXIAL_TILT, declination, noonSunHeight, dayLength, beamSpread } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);
  const uid = $props.id();

  const places = { equator: 0, hanoi: 21, london: 51.5, sydney: -34 } as const;
  type Place = keyof typeof places;
  let place = $state<Place>('london');
  let day = $state(172);

  // The film: a year goes by in about 24 seconds.
  let running = $state(false);
  $effect(() => {
    if (!running) return;
    let last = performance.now(), raf = 0;
    const tick = (now: number) => {
      day = ((day - 1 + ((now - last) / 1000) * 15) % 365) + 1;
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  const lat = $derived(places[place]);
  const h = $derived(noonSunHeight(lat, day));
  const hours = $derived(dayLength(lat, day));
  const spread = $derived(beamSpread(h));
  const months = t('months').split(',');
  const dateLabel = (d: number) => {
    const date = new Date(Date.UTC(2025, 0, Math.round(d)));
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
  };

  // Orbit seen from the side: June on the left, so the north pole (axis leaning right) tips toward the Sun.
  const S = { x: 200, y: 175 };
  const th = $derived((2 * Math.PI * (day - 172)) / 365);
  const E = $derived({ x: S.x - 150 * Math.cos(th), y: S.y + 48 * Math.sin(th) });
  const tilt = (AXIAL_TILT * Math.PI) / 180;
  const ax = { x: Math.sin(tilt), y: -Math.cos(tilt) };
  // Which side of Earth faces the Sun (for the day/night halves).
  const sunSide = $derived(E.x < S.x ? 1 : -1);

  // Noon view: the Sun on an arc, and a beam 44 units wide landing on the ground.
  const G = { x: 520, y: 282 };
  const rad = $derived((h * Math.PI) / 180);
  const sun = $derived({ x: G.x - 150 * Math.cos(rad), y: G.y - 150 * Math.sin(rad) });
  const foot = $derived(Math.min(44 * spread, 210));
  const beam = $derived.by(() => {
    // A band from the Sun to the ground, perpendicular half-width 22.
    const px = Math.sin(rad) * 22, py = Math.cos(rad) * 22;
    return `M${sun.x - px} ${sun.y + py}L${G.x - foot / 2} ${G.y}L${G.x + foot / 2} ${G.y}L${sun.x + px} ${sun.y - py}Z`;
  });

  const season = $derived.by(() => {
    if (Math.abs(lat) < 23.5) return 'tropics';
    const d = declination(day) * Math.sign(lat);
    return d > 8 ? 'summer' : d < -8 ? 'winter' : 'between';
  });
  const placeName = $derived(t(place));
  const caption = $derived(t(season, { place: placeName, x: fmt(lang, spread, 1) }));
</script>

<Lab title={t('title')} {caption} {lang} bind:running>
  <Stage width={640} height={340} label={t('label')}>
    <defs>
      <clipPath id="{uid}-noon"><rect x="410" y="10" width="220" height="320" rx="14" /></clipPath>
    </defs>
    <!-- orbit -->
    <rect x="10" y="10" width="390" height="320" rx="14" fill="var(--art-night)" />
    <text x="24" y="36" class="lbl">{t('orbit')}</text>
    <ellipse cx={S.x} cy={S.y} rx="150" ry="48" fill="none" stroke="var(--art-moon)" stroke-width="1.5" stroke-dasharray="4 7" opacity="0.6" />
    {#each [[172, 'Jun'], [264, 'Sep'], [355, 'Dec'], [80, 'Mar']] as [d, m]}
      {@const a = (2 * Math.PI * ((d as number) - 172)) / 365}
      <text x={S.x - 175 * Math.cos(a)} y={S.y + 70 * Math.sin(a) + 5} text-anchor="middle" class="m">{months[['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(m as string)]}</text>
    {/each}
    <!-- Earth behind the Sun is drawn first -->
    {#snippet earth()}
      <g transform="translate({E.x} {E.y})">
        <circle r="20" fill="var(--c-blue)" />
        <path d="M0 -20A20 20 0 0 {sunSide > 0 ? 0 : 1} 0 20Z" fill="var(--art-night)" opacity="0.65" />
        <circle r="20" fill="none" stroke="var(--art-moon)" stroke-width="1.5" />
        <line x1={-ax.x * 32} y1={-ax.y * 32} x2={ax.x * 32} y2={ax.y * 32} stroke="var(--art-white)" stroke-width="2.5" />
        <line x1={-ax.y * 20} y1={ax.x * 20} x2={ax.y * 20} y2={-ax.x * 20} stroke="var(--art-y)" stroke-width="1.5" stroke-dasharray="3 3" />
        <text x={ax.x * 40} y={ax.y * 40} text-anchor="middle" class="m">N</text>
      </g>
    {/snippet}
    {#if Math.sin(th) < 0}{@render earth()}{/if}
    <circle cx={S.x} cy={S.y} r="38" fill="var(--art-sun)" opacity="0.3" />
    <circle cx={S.x} cy={S.y} r="26" fill="var(--art-sun)" stroke="var(--art-sun-2)" stroke-width="3" />
    {#if Math.sin(th) >= 0}{@render earth()}{/if}

    <!-- noon in the chosen place -->
    <g clip-path="url(#{uid}-noon)">
      <rect x="410" y="10" width="220" height="320" fill={season === 'winter' ? 'var(--art-sky-2)' : 'var(--art-sky)'} />
      <path d={beam} fill="var(--art-sun)" opacity="0.55" />
      <rect x="410" y={G.y} width="220" height="50" fill={season === 'winter' ? 'var(--art-white)' : 'var(--art-grass)'} />
      <line x1="410" y1={G.y} x2="630" y2={G.y} stroke="var(--art-ink)" stroke-width="2.5" />
      <rect x={G.x - foot / 2} y={G.y - 3} width={foot} height="6" rx="3" fill="var(--art-sun-2)" />
      <path d="M{G.x - 46} {G.y}A46 46 0 0 1 {G.x - 46 * Math.cos(rad)} {G.y - 46 * Math.sin(rad)}" fill="none" stroke="var(--art-ink)" stroke-width="2" />
      <text x={G.x - 58} y={G.y - 10} text-anchor="end" class="deg">{fmt(lang, h, 0)}°</text>
      <circle cx={sun.x} cy={sun.y} r="18" fill="var(--art-sun)" stroke="var(--art-ink)" stroke-width="2.5" />
      <text x="520" y="36" text-anchor="middle" class="lbl dark">{t('noonIn', { place: placeName })}</text>
    </g>
    <rect x="410" y="10" width="220" height="320" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />
  </Stage>
  {#snippet controls()}
    <Slider label={t('date')} bind:value={day} min={1} max={365} color="var(--c-amber)" format={dateLabel} />
    <Segmented
      label={t('place')}
      bind:value={place}
      options={(Object.keys(places) as Place[]).map((p) => ({ value: p, label: t(p) }))}
    />
    <Readout label={t('height')} value={`${fmt(lang, h, 0)}°`} color="var(--c-amber)" />
    <Readout label={t('daylight')} value={t('hours', { n: fmt(lang, hours, 1) })} color="var(--c-blue)" />
    <Readout label={t('spread')} value={t('times', { n: fmt(lang, spread, 1) })} color="var(--c-red)" />
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 800;
    font-size: 14px;
    fill: var(--art-moon);
  }
  .dark {
    fill: var(--art-ink);
  }
  .m {
    font-weight: 800;
    font-size: 12px;
    fill: var(--art-moon);
  }
  .deg {
    font-weight: 900;
    font-size: 17px;
    fill: var(--art-ink);
  }
</style>
