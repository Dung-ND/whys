<script lang="ts">
  // The Moon orbits Earth; the Sun always lights the half facing it. The phase is the lit part
  // of the half that faces us. Orbit runs counterclockwise as seen from above the North Pole.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { moonLitPath, litFraction, phaseIndex, SYNODIC_MONTH } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);

  let day = $state(4);
  let playing = $state(false);
  const f = $derived(day / SYNODIC_MONTH);

  const E = { x: 210, y: 175 }, R = 108;
  const ang = $derived(Math.PI + 2 * Math.PI * f);
  const M = $derived({ x: E.x + R * Math.cos(ang), y: E.y - R * Math.sin(ang) });
  // The half of the Moon that faces Earth (a semicircle on the Earth side).
  const near = $derived.by(() => {
    const ux = -Math.cos(ang), uy = Math.sin(ang);
    const px = -uy * 22, py = ux * 22;
    return `M${M.x + px} ${M.y + py}A22 22 0 0 0 ${M.x - px} ${M.y - py}`;
  });
  const phase = $derived(t(`p${phaseIndex(f)}` as 'p0'));

  $effect(() => {
    if (!playing) return;
    let last = performance.now(), raf = 0;
    const tick = (now: number) => {
      day = (day + ((now - last) / 1000) * 3) % SYNODIC_MONTH;
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });
</script>

<Lab title={t('title')} caption={t('caption', { phase, pct: Math.round(litFraction(f) * 100) })}>
  <Stage width={640} height={350} label={t('label')}>
    <rect x="10" y="10" width="400" height="330" rx="14" fill="var(--art-night)" />
    <!-- sunlight from the left -->
    <g stroke="var(--art-sun)" stroke-width="3" opacity="0.8">
      {#each [60, 120, 180, 240, 300] as y}
        <path d="M24 {y}h36" /><path d="M54 {y - 6}l8 6l-8 6" fill="none" />
      {/each}
    </g>
    <text x="22" y="34" class="lbl sun">{t('sunlight')} →</text>
    <text x="398" y="34" text-anchor="end" class="lbl">{t('above')}</text>
    <circle cx={E.x} cy={E.y} r={R} fill="none" stroke="var(--art-moon)" stroke-width="1.5" stroke-dasharray="4 7" opacity="0.6" />
    <!-- Earth, lit on its left (day) side -->
    <circle cx={E.x} cy={E.y} r="26" fill="var(--art-moon-dark)" />
    <path d="M{E.x} {E.y - 26}A26 26 0 0 0 {E.x} {E.y + 26}Z" fill="var(--c-blue)" />
    <circle cx={E.x} cy={E.y} r="26" fill="none" stroke="var(--art-moon)" stroke-width="2" />
    <line x1={E.x} y1={E.y} x2={M.x} y2={M.y} stroke="var(--brand)" stroke-width="1.5" stroke-dasharray="3 5" />
    <!-- Moon: the half facing the Sun is always lit -->
    <circle cx={M.x} cy={M.y} r="15" fill="var(--art-moon-dark)" stroke="var(--art-moon)" stroke-width="1.5" />
    <path d="M{M.x} {M.y - 15}A15 15 0 0 0 {M.x} {M.y + 15}Z" fill="var(--art-moon)" />
    <path d={near} fill="none" stroke="var(--brand)" stroke-width="4" stroke-linecap="round" />

    <rect x="420" y="10" width="210" height="330" rx="14" fill="var(--art-night)" />
    <text x="525" y="38" text-anchor="middle" class="lbl">{t('see')}</text>
    <circle cx="525" cy="175" r="80" fill="var(--art-moon-dark)" />
    <path d={moonLitPath(525, 175, 80, f)} fill="var(--art-moon)" />
    <circle cx="525" cy="175" r="80" fill="none" stroke="var(--art-moon)" stroke-width="1.5" opacity="0.5" />
    <text x="525" y="300" text-anchor="middle" class="lbl big">{phase}</text>
  </Stage>
  {#snippet controls()}
    <Slider label={t('day')} bind:value={day} min={0} max={29.5} step={0.5} color="var(--c-purple)" format={(v) => fmt(lang, v, 1)} />
    <button type="button" class="btn btn-ghost" onclick={() => (playing = !playing)}>{playing ? '⏸ ' + t('pause') : '▶ ' + t('play')}</button>
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 800;
    font-size: 14px;
    fill: var(--art-moon);
  }
  .sun {
    fill: var(--art-sun);
  }
  .big {
    font-size: 17px;
  }
</style>
