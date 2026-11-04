<script lang="ts">
  // Current flows only when there is a voltage difference across something. A bird on one wire has
  // both feet at the same voltage; touching two wires puts the whole voltage across its body.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Segmented from '@/components/ui/Segmented.svelte';
  import Readout from '@/components/ui/Readout.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);
  let mode = $state<'one' | 'two'>('one');
  // The film: the bird switches between one wire and two every 5 seconds.
  let running = $state(false);
  $effect(() => {
    if (!running) return;
    const timer = setInterval(() => (mode = mode === 'one' ? 'two' : 'one'), 5000);
    return () => clearInterval(timer);
  });
  const TOP = 110, BOT = 220;
  const V = `${fmt(lang, 7200, 0)} V`;
</script>

<Lab title={t('title')} caption={t(`${mode}Cap`)} {lang} bind:running>
  <Stage width={640} height={300} label={t('label')}>
    <rect x="10" y="10" width="620" height="280" rx="14" fill="var(--art-sky)" />
    <!-- wires -->
    <path d="M10 {TOP}H630" stroke="var(--art-wire)" stroke-width="6" />
    <path d="M10 {TOP}H630" stroke="var(--art-bolt)" stroke-width="6" stroke-dasharray="2 22" stroke-linecap="round" class="flow" />
    <path d="M10 {BOT}H630" stroke="var(--art-wire)" stroke-width="6" />
    <text x="24" y={TOP - 14} class="lbl">⚡ {t('live')}</text>
    <text x="24" y={BOT + 30} class="lbl">{t('zero')}</text>

    {#if mode === 'one'}
      <g transform="translate(330 {TOP - 3})" class="bird">
        <path d="M-10 -4v4M10 -4v4" stroke="var(--art-ink)" stroke-width="3" />
        <ellipse cx="0" cy="-30" rx="30" ry="26" fill="var(--art-b)" stroke="var(--art-ink)" stroke-width="3" />
        <path d="M-26 -32l-22 -6l18 18z" fill="var(--art-b)" stroke="var(--art-ink)" stroke-width="3" stroke-linejoin="round" />
        <path d="M-10 -32q12 14 26 2" fill="none" stroke="var(--art-ink)" stroke-width="3" />
        <circle cx="14" cy="-40" r="4" fill="var(--art-ink)" />
        <path d="M28 -38l14 5l-14 5z" fill="var(--art-o)" stroke="var(--art-ink)" stroke-width="2" />
        <text x="0" y="-70" text-anchor="middle" class="v">{V} · {V}</text>
      </g>
    {:else}
      <!-- current through the bird's body -->
      <path d="M300 {TOP}C300 160 380 170 380 {BOT}" fill="none" stroke="var(--c-red)" stroke-width="22" opacity="0.25" />
      <g transform="translate(330 {TOP - 3})" class="zap">
        <path d="M-10 -4v4" stroke="var(--art-ink)" stroke-width="3" />
        <ellipse cx="0" cy="-30" rx="30" ry="26" fill="var(--art-b)" stroke="var(--art-ink)" stroke-width="3" />
        <!-- wing stretched down to the lower wire -->
        <path d="M14 -16q40 30 36 {BOT - TOP - 4}l-14 -6q-6 -40 -40 -60z" fill="var(--art-b)" stroke="var(--art-ink)" stroke-width="3" stroke-linejoin="round" />
        <circle cx="14" cy="-40" r="4" fill="var(--art-ink)" />
        <path d="M-8 -48l-6 -6M0 -52v-8M8 -48l6 -6" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round" />
        <path d="M28 -38l14 5l-14 5z" fill="var(--art-o)" stroke="var(--art-ink)" stroke-width="2" />
        {#each [[-48, -50], [52, -60], [-46, 0], [70, 40]] as [x, y]}
          <path d="M{x} {y}l8 -12l2 9l8 -12" fill="none" stroke="var(--c-red)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        {/each}
      </g>
      <path d="M300 {TOP}C300 160 380 170 380 {BOT}" fill="none" stroke="var(--art-bolt)" stroke-width="6" stroke-dasharray="2 18" stroke-linecap="round" class="flow" />
    {/if}
    <rect x="10" y="10" width="620" height="280" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />
  </Stage>
  {#snippet controls()}
    <Segmented label={t('bird')} bind:value={mode} options={[{ value: 'one', label: t('one') }, { value: 'two', label: t('two') }]} />
    <Readout label={t('diff')} value={mode === 'one' ? '0 V' : V} color={mode === 'one' ? 'var(--c-green)' : 'var(--c-red)'} />
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 900;
    font-size: 15px;
    fill: var(--art-ink);
  }
  .v {
    font-weight: 900;
    font-size: 14px;
    fill: var(--art-ink);
  }
  .flow {
    animation: flow 1.6s linear infinite;
  }
  .zap {
    animation: zap 0.12s linear infinite alternate;
  }
  @keyframes flow {
    to { stroke-dashoffset: -24; }
  }
  @keyframes zap {
    to { translate: 2px -1px; }
  }
</style>
