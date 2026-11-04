<script lang="ts">
  // Popcorn: water inside the kernel turns to steam; the hull keeps it in, so pressure follows the steam
  // tables (src/lib/whys-science.ts) until the hull bursts at about 180 °C.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Readout from '@/components/ui/Readout.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { steamPressure, POP_TEMPERATURE } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);

  let temp = $state(20);
  let popped = $state(false);
  // Once popped, it stays popped (until cooled right down: a fresh kernel).
  $effect(() => {
    if (temp >= POP_TEMPERATURE) popped = true;
    else if (temp <= 40) popped = false;
  });

  // The film: heat up over about 10 seconds, pop, look, then a fresh kernel.
  let running = $state(false);
  $effect(() => {
    if (!running) return;
    let last = performance.now(), raf = 0, hold = 0;
    temp = 20;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (temp < 200) temp = Math.min(200, temp + dt * 18);
      else if ((hold += dt) > 2.5) {
        hold = 0;
        temp = 20;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  // Inside a sealed kernel, the pressure is the steam pressure (and normal air pressure before that).
  const bar = $derived(popped ? 1 : Math.max(1, steamPressure(temp)));
  const steamy = $derived(Math.max(0, Math.min(1, (temp - 100) / 80)));
  const caption = $derived(popped ? t('popped') : temp < 100 ? t('cold') : temp < 160 ? t('steam') : t('soft', { n: fmt(lang, bar, 0) }));
  const needle = $derived(-120 + (Math.min(bar, 12) / 12) * 240);
  const drops = [[-24, -10], [10, -30], [20, 14], [-8, 26], [-30, 22], [26, -8]];
  const puffs = [[0, 0, 48], [-44, -20, 34], [40, -26, 36], [-30, 34, 32], [34, 30, 34], [0, -50, 30], [-56, 16, 24], [58, 8, 24]];
</script>

<Lab title={t('title')} {caption} {lang} bind:running>
  <Stage width={640} height={300} label={t('label')}>
    <rect x="10" y="10" width="620" height="280" rx="14" fill="var(--art-sky-2)" />
    <!-- the kernel -->
    <g transform="translate(200 150)">
      {#if !popped}
        <path d="M0 -100C60 -100 84 -30 76 20C68 70 36 100 0 100C-36 100 -68 70 -76 20C-84 -30 -60 -100 0 -100Z" fill="var(--art-o)" stroke="var(--art-ink)" stroke-width="4" />
        <path d="M0 -84C48 -84 66 -26 60 16C54 58 28 84 0 84C-28 84 -54 58 -60 16C-66 -26 -48 -84 0 -84Z" fill={steamy > 0.6 ? 'var(--art-y)' : 'var(--art-tan)'} />
        {#each drops as [x, y]}
          {#if temp < 100}
            <circle cx={x} cy={y} r="6" fill="var(--art-water)" stroke="var(--art-shirt)" stroke-width="2" />
          {:else}
            <circle cx={x} cy={y} r={6 + 10 * steamy} fill="var(--art-white)" stroke="var(--art-shirt)" stroke-width="2" opacity="0.85" />
          {/if}
        {/each}
        <text x="90" y="-70" class="lbl">← {t('hull')}</text>
        <text x="90" y="0" class="lbl">← {t('starch')}</text>
        <text x="90" y="70" class="lbl">← {t('water')}</text>
      {:else}
        <g class="popped">
          {#each puffs as [x, y, r]}<circle cx={x} cy={y} r={r} fill="var(--art-white)" stroke="var(--art-ink)" stroke-width="3" />{/each}
          <path d="M-14 40q14 14 30 0l-6 20h-18z" fill="var(--art-o)" stroke="var(--art-ink)" stroke-width="3" />
        </g>
        <text x="0" y="-100" text-anchor="middle" class="pop">{t('pop')}</text>
      {/if}
    </g>
    <!-- pressure gauge -->
    <g transform="translate(500 140)">
      <circle r="80" fill="var(--art-white)" stroke="var(--art-ink)" stroke-width="4" />
      {#each [0, 2, 4, 6, 8, 10, 12] as v}
        {@const a = ((-120 + (v / 12) * 240 - 90) * Math.PI) / 180}
        <line x1={64 * Math.cos(a)} y1={64 * Math.sin(a)} x2={74 * Math.cos(a)} y2={74 * Math.sin(a)} stroke="var(--art-ink)" stroke-width="3" />
        <text x={50 * Math.cos(a)} y={50 * Math.sin(a) + 5} text-anchor="middle" class="tick">{v}</text>
      {/each}
      <line x1="0" y1="0" x2="0" y2="-62" stroke="var(--art-red)" stroke-width="5" stroke-linecap="round" transform="rotate({needle})" />
      <circle r="8" fill="var(--art-ink)" />
      <text y="40" text-anchor="middle" class="unit">bar</text>
    </g>
  </Stage>
  {#snippet controls()}
    <Slider label={t('temp')} bind:value={temp} min={20} max={200} unit="°C" color="var(--c-red)" format={(v) => fmt(lang, v, 0)} />
    <Readout label={t('pressure')} value={t('times', { n: fmt(lang, bar, bar < 2 ? 1 : 0) })} color="var(--c-blue)" />
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 800;
    font-size: 15px;
    fill: var(--art-ink);
  }
  .pop {
    font-weight: 900;
    font-size: 34px;
    fill: var(--art-y);
    stroke: var(--art-ink);
    stroke-width: 5px;
    paint-order: stroke;
  }
  .tick {
    font-weight: 800;
    font-size: 13px;
    fill: var(--art-ink);
  }
  .unit {
    font-weight: 800;
    font-size: 13px;
    fill: var(--art-ink);
    opacity: 0.7;
  }
  .popped {
    animation: puff 0.35s cubic-bezier(0.2, 1.6, 0.4, 1);
  }
  @keyframes puff {
    from { transform: scale(0.3); }
  }
</style>
