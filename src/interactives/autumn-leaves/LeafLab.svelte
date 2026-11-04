<script lang="ts">
  // Autumn colors: chlorophyll (green) breaks down, revealing carotenoids (yellow/orange) that were there
  // all along; some trees also make new anthocyanins (red). The amounts are a simple illustration.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Segmented from '@/components/ui/Segmented.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);

  let weeks = $state(0);
  let tree = $state<'maple' | 'birch'>('maple');

  // The film: autumn passes in about 12 seconds, then the other tree takes a turn.
  let running = $state(false);
  $effect(() => {
    if (!running) return;
    let last = performance.now(), raf = 0, hold = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (weeks >= 10) {
        hold += dt;
        if (hold > 2) {
          hold = 0;
          weeks = 0;
          tree = tree === 'maple' ? 'birch' : 'maple';
        }
      } else weeks = Math.min(10, weeks + dt * 0.85);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  const chl = $derived(clamp(1 - (weeks - 0.5) / 5));
  const car = $derived(weeks < 7.5 ? 1 : clamp(1 - (weeks - 7.5) / 3));
  const ant = $derived(tree === 'birch' ? 0 : clamp((weeks - 2.5) / 3) * (weeks < 8 ? 1 : clamp(1 - (weeks - 8) / 2.5)));
  const brown = $derived(clamp((weeks - 8) / 2) * 0.85);

  // Mix the pigments' colors by how strongly each shows (green hides yellow while it is plentiful).
  const C = { g: [58, 156, 64], y: [244, 190, 40], r: [214, 46, 46], b: [139, 94, 60] };
  const leaf = $derived.by(() => {
    const w = { g: chl * 2.2, y: car * 0.5, r: ant * 1.4 };
    const sum = w.g + w.y + w.r || 1;
    const mix = [0, 1, 2].map((i) => (w.g * C.g[i] + w.y * C.y[i] + w.r * C.r[i]) / sum);
    return `rgb(${mix.map((v, i) => Math.round(v * (1 - brown) + C.b[i] * brown)).join(' ')})`;
  });

  const stage = $derived(
    weeks < 0.8 ? 'summer' : chl > 0.35 ? 'fading' : weeks > 8.6 ? 'brown' : tree === 'maple' && ant > 0.3 ? 'red' : 'yellow',
  );
  const bars = $derived([
    { label: t('barGreen'), v: chl, c: 'rgb(58 156 64)' },
    { label: t('barYellow'), v: car, c: 'rgb(244 190 40)' },
    { label: t('barRed'), v: ant, c: 'rgb(214 46 46)' },
  ]);
  const LEAF = 'M150 268C96 236 70 180 78 120C84 76 112 44 150 30C188 44 216 76 222 120C230 180 204 236 150 268Z';
</script>

<Lab title={t('title')} caption={t(stage)} {lang} bind:running>
  <Stage width={640} height={300} label={t('label')}>
    <rect x="10" y="10" width="620" height="280" rx="14" fill="var(--art-sky-2)" />
    <!-- the leaf, swaying a little -->
    <g transform="rotate({-8 + weeks} 150 268)">
      <path d="M150 268v24" stroke="var(--art-wood)" stroke-width="6" stroke-linecap="round" />
      <path d={LEAF} fill={leaf} stroke="var(--art-ink)" stroke-width="3.5" />
      <g fill="none" stroke="var(--art-ink)" stroke-width="2" opacity="0.35" stroke-linecap="round">
        <path d="M150 262V52M150 210l-40 -40M150 210l40 -40M150 160l-48 -42M150 160l48 -42M150 112l-34 -30M150 112l34 -30" />
      </g>
    </g>
    <!-- pigment bars -->
    {#each bars as b, i}
      <text x="290" y={66 + i * 76} class="lbl">{b.label}</text>
      <rect x="290" y={78 + i * 76} width="320" height="22" rx="11" fill="var(--art-white)" stroke="var(--art-ink)" stroke-width="2" />
      {#if b.v > 0.01}<rect x="290" y={78 + i * 76} width={320 * b.v} height="22" rx="11" fill={b.c} stroke="var(--art-ink)" stroke-width="2" />{/if}
    {/each}
  </Stage>
  {#snippet controls()}
    <Slider label={t('weeks')} bind:value={weeks} min={0} max={10} step={0.5} color="var(--c-amber)" format={(v) => fmt(lang, Math.floor(v), 0)} />
    <Segmented label={t('tree')} bind:value={tree} options={[{ value: 'maple', label: '🍁 ' + t('maple') }, { value: 'birch', label: '🍂 ' + t('birch') }]} />
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 800;
    font-size: 15px;
    fill: var(--art-ink);
  }
</style>
