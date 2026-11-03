<script lang="ts">
  // Light arrives almost instantly; sound travels 343 m/s, so the thunder comes ~3 s per km later.
  // The timer runs in real time, so students can count along.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Readout from '@/components/ui/Readout.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { thunderDelay, kmFromSeconds } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);
  const uid = $props.id();

  let km = $state(2);
  let stage = $state<'ready' | 'flash' | 'boom'>('ready');
  let elapsed = $state(0);
  let raf = 0;
  const delay = $derived(thunderDelay(km));

  // Kid stands at x = 560, the strike at x = 110.
  const ring = $derived(stage === 'flash' ? 40 + (450 * elapsed) / delay : stage === 'boom' ? 490 : 0);

  function strike() {
    cancelAnimationFrame(raf);
    stage = 'flash';
    elapsed = 0;
    const start = performance.now();
    const tick = (now: number) => {
      elapsed = (now - start) / 1000;
      if (elapsed >= delay) {
        elapsed = delay;
        stage = 'boom';
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  $effect(() => () => cancelAnimationFrame(raf));
  // Changing the distance starts over.
  $effect(() => {
    km;
    cancelAnimationFrame(raf);
    stage = 'ready';
    elapsed = 0;
  });

  const caption = $derived(
    stage === 'ready'
      ? t('ready')
      : stage === 'flash'
        ? t('flash', { us: fmt(lang, (km * 1000) / 299.792, 0) })
        : t('boom', { s: fmt(lang, delay, 1), km: fmt(lang, kmFromSeconds(delay), 1), mi: fmt(lang, delay / 5, 1) }),
  );
</script>

<Lab title={t('title')} {caption}>
  <Stage width={640} height={300} label={t('label')}>
    <rect x="10" y="10" width="620" height="280" rx="14" fill="var(--art-storm-2)" />
    {#if stage === 'flash' && elapsed < 0.15}
      <rect x="10" y="10" width="620" height="280" rx="14" fill="var(--art-white)" opacity="0.6" />
    {/if}
    <clipPath id="{uid}-box"><rect x="10" y="10" width="620" height="280" rx="14" /></clipPath>
    {#if stage !== 'ready'}
      <circle clip-path="url(#{uid}-box)" cx="110" cy="230" r={ring} fill="none" stroke="var(--art-bolt)" stroke-width="5" opacity={stage === 'boom' ? 0.25 : 0.85} />
    {/if}
    <path d="M40 90a32 32 0 0 1 48 -32a42 42 0 0 1 78 8a28 28 0 0 1 18 52h-136a24 24 0 0 1 -8 -28z" fill="var(--art-storm)" stroke="var(--art-ink)" stroke-width="3.5" />
    {#if stage === 'flash' && elapsed < 0.6}
      <path d="M110 118l-20 54h20l-16 58l46 -76h-24l18 -36z" fill="var(--art-bolt)" stroke="var(--art-ink)" stroke-width="3.5" stroke-linejoin="round" />
    {/if}
    <rect x="10" y="240" width="620" height="50" fill="var(--art-grass-2)" />
    <rect x="10" y="10" width="620" height="280" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />
    <!-- distance marker -->
    <path d="M110 268H560" stroke="var(--art-white)" stroke-width="2.5" />
    <path d="M110 260v16M560 260v16" stroke="var(--art-white)" stroke-width="2.5" />
    <text x="335" y="262" text-anchor="middle" class="d">{fmt(lang, km, 1)} km</text>
    <!-- kid -->
    <g transform="translate(560 240)" class:shake={stage === 'boom'}>
      <path d="M-8 -30v28M8 -30v28" stroke="var(--art-ink)" stroke-width="8" stroke-linecap="round" />
      <path d="M-18 -28q-2 -30 18 -36q20 6 18 36z" fill="var(--art-shirt)" stroke="var(--art-ink)" stroke-width="3" />
      <circle cx="0" cy="-82" r="20" fill="var(--art-skin)" stroke="var(--art-ink)" stroke-width="3" />
      <path d="M-20 -86q2 -18 22 -16q16 2 18 14q-10 -6 -20 -6q-8 6 -20 8z" fill="var(--art-hair)" stroke="var(--art-ink)" stroke-width="3" />
      <circle cx="-7" cy="-82" r="2.8" fill="var(--art-ink)" /><circle cx="7" cy="-82" r="2.8" fill="var(--art-ink)" />
      {#if stage === 'boom'}
        <ellipse cx="0" cy="-72" rx="4" ry="5" fill="var(--art-ink)" />
        <text x="-6" y="-120" text-anchor="middle" class="boom">BOOM!</text>
      {:else}
        <path d="M-5 -73q5 4 10 0" fill="none" stroke="var(--art-ink)" stroke-width="2.5" stroke-linecap="round" />
      {/if}
    </g>
    {#if stage !== 'ready'}
      <text x="335" y="60" text-anchor="middle" class="timer">{fmt(lang, Math.floor(elapsed * 10) / 10, 1)} s</text>
    {/if}
  </Stage>
  {#snippet controls()}
    <Slider label={t('distance')} bind:value={km} min={0.5} max={5} step={0.5} unit="km" color="var(--c-teal)" format={(v) => fmt(lang, v, 1)} />
    <Readout label={t('seconds')} value={`${fmt(lang, Math.floor(elapsed), 0)} s`} color="var(--c-amber)" />
    <button type="button" class="btn btn-primary" onclick={strike}>⚡ {t('strike')}</button>
  {/snippet}
</Lab>

<style>
  .d {
    font-weight: 900;
    font-size: 15px;
    fill: var(--art-white);
  }
  .timer {
    font-weight: 900;
    font-size: 40px;
    fill: var(--art-white);
    font-variant-numeric: tabular-nums;
  }
  .boom {
    font-weight: 900;
    font-size: 26px;
    fill: var(--art-bolt);
    stroke: var(--art-ink);
    stroke-width: 4px;
    paint-order: stroke;
  }
  .shake {
    animation: shake 0.25s 3;
  }
  @keyframes shake {
    25% { translate: -4px 1px; }
    75% { translate: 4px -1px; }
  }
</style>
