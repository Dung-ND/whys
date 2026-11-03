<script lang="ts">
  // Move the Sun up and down: the sky and Sun colors come from Rayleigh scattering (∝ 1/λ⁴)
  // along the real path length through the air (air mass).
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Readout from '@/components/ui/Readout.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { airMass, transmitted } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);
  const uid = $props.id();

  let h = $state(60);
  const nm = [680, 550, 450];
  const scat = nm.map((l) => Math.pow(550 / l, 4));

  const rgb = (v: number[], k = 1) => {
    const m = Math.max(...v);
    return `rgb(${v.map((x) => Math.round(Math.min(1, (x / m) * k) * 255)).join(' ')})`;
  };
  const am = $derived(airMass(h));
  const light = $derived(Math.min(1, (h + 3) / 12));
  const sun = $derived(rgb(nm.map((l) => transmitted(l, am))));
  const top = $derived(rgb(nm.map((l, i) => scat[i] * transmitted(l, am * 0.3)), light));
  const bottom = $derived(rgb(nm.map((l, i) => transmitted(l, am) * (1 + 0.35 * scat[i])), 0.35 + 0.65 * light));

  // The Sun moves on an arc over the landscape.
  const rad = $derived((h * Math.PI) / 180);
  const sx = $derived(380 - Math.cos(rad) * 330);
  const sy = $derived(270 - Math.sin(rad) * 230);

  // Inset: sunlight's path to someone standing on a (very thick-skinned) Earth.
  const C = { x: 530, y: 330 }, RE = 110, RA = 150;
  const path = $derived.by(() => {
    const d = { x: -Math.cos(rad), y: -Math.sin(rad) };
    const k = RE * Math.sin(rad);
    const len = -k + Math.sqrt(k * k + RA * RA - RE * RE);
    return { x: C.x + d.x * len, y: C.y - RE + d.y * len };
  });
  const caption = $derived(h > 35 ? t('high') : h > 10 ? t('mid') : t('low', { n: Math.round(am) }));
</script>

<Lab title={t('title')} {caption}>
  <Stage width={640} height={330} label={t('label')}>
    <defs>
      <linearGradient id="{uid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color={top} />
        <stop offset="1" stop-color={bottom} />
      </linearGradient>
      <clipPath id="{uid}-inset"><rect x="440" y="10" width="190" height="310" rx="14" /></clipPath>
      <clipPath id="{uid}-scene"><rect x="10" y="10" width="420" height="310" rx="14" /></clipPath>
    </defs>
    <g clip-path="url(#{uid}-scene)">
      <rect x="10" y="10" width="420" height="310" fill="url(#{uid}-sky)" />
      <circle cx={sx} cy={sy} r="46" fill={sun} opacity="0.35" />
      <circle cx={sx} cy={sy} r="28" fill={sun} stroke="var(--art-ink)" stroke-width="3" />
      <path d="M10 270q120 -26 220 -6t200 -10v70h-420z" fill="var(--art-grass)" stroke="var(--art-ink)" stroke-width="3" />
      <rect x="10" y="10" width="420" height="310" fill="var(--art-night)" opacity={(1 - light) * 0.55} pointer-events="none" />
    </g>
    <rect x="10" y="10" width="420" height="310" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />

    <g clip-path="url(#{uid}-inset)">
      <rect x="440" y="10" width="190" height="310" fill="var(--surface-2)" />
      <circle cx={C.x} cy={C.y} r={RA} fill="var(--c-water)" />
      <circle cx={C.x} cy={C.y} r={RE} fill="var(--art-grass)" stroke="var(--art-ink)" stroke-width="2.5" />
      <line x1={path.x} y1={path.y} x2={C.x} y2={C.y - RE} stroke={sun} stroke-width="9" stroke-linecap="round" />
      <line x1={path.x} y1={path.y} x2={C.x} y2={C.y - RE} stroke="var(--art-ink)" stroke-width="2" stroke-dasharray="5 5" />
      <circle cx={C.x} cy={C.y - RE} r="6" fill="var(--c-red)" stroke="var(--art-ink)" stroke-width="2" />
      <text x="535" y="40" text-anchor="middle" class="t">{t('path')}</text>
      <text x="535" y="58" text-anchor="middle" class="s">({t('notScale')})</text>
    </g>
    <rect x="440" y="10" width="190" height="310" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />
  </Stage>
  {#snippet controls()}
    <Slider label={t('sun')} bind:value={h} min={0} max={90} unit="°" color="var(--c-amber)" />
    <Readout label={t('air')} value={t('times', { n: fmt(lang, am, am < 10 ? 1 : 0) })} color="var(--c-blue)" />
  {/snippet}
</Lab>

<style>
  .t {
    font-weight: 900;
    font-size: 15px;
    fill: var(--ink);
  }
  .s {
    font-weight: 700;
    font-size: 12px;
    fill: var(--muted);
  }
</style>
