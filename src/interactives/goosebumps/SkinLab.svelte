<script lang="ts">
  // A slice of skin with three hair follicles. Cold or fear makes each arrector pili muscle contract:
  // the hair swings upright and the skin above the muscle bulges into a goosebump.
  import type { Lang } from '@/config/site';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Stage from '@/components/ui/Stage.svelte';
  import Segmented from '@/components/ui/Segmented.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);

  let feel = $state<'warm' | 'cold' | 'scared'>('warm');
  // 0 = relaxed, 1 = fully squeezed.
  const k = new Tween(0, { duration: 600, easing: cubicOut });
  $effect(() => {
    k.target = feel === 'warm' ? 0 : 1;
  });

  const SURF = 130;
  const follicles = [130, 320, 510];
  // Skin surface: flat, with a bump next to each hair as the muscle pulls.
  const surface = $derived.by(() => {
    let d = `M10 ${SURF}`;
    for (const x of follicles) d += `L${x - 34} ${SURF}C${x - 20} ${SURF} ${x - 18} ${SURF - 22 * k.current} ${x} ${SURF - 22 * k.current}C${x + 18} ${SURF - 22 * k.current} ${x + 20} ${SURF} ${x + 34} ${SURF}`;
    return d + `L630 ${SURF}L630 290L10 290Z`;
  });
  // The hair leans 55° when relaxed and stands almost straight when the muscle squeezes.
  const lean = $derived(55 - 47 * k.current);
</script>

<Lab title={t('title')} caption={t(`${feel}Cap`)}>
  <Stage width={640} height={300} label={t('label')}>
    <rect x="10" y="10" width="620" height="280" rx="14" fill={feel === 'cold' ? 'var(--art-sky-2)' : 'var(--art-tan)'} />
    <path d={surface} fill="var(--art-skin)" stroke="var(--art-ink)" stroke-width="3" stroke-linejoin="round" />
    <rect x="10" y="215" width="620" height="75" fill="var(--art-skin-2)" opacity="0.6" />
    {#each follicles as x, i}
      {@const top = SURF - 22 * k.current + 4}
      {@const a = (lean * Math.PI) / 180}
      {@const sx = Math.sin(a)}
      {@const cy = Math.cos(a)}
      {@const root = { x: x - 105 * sx, y: top + 105 * cy }}
      {@const mid = { x: x - 55 * sx + 6 * cy, y: top + 55 * cy + 6 * sx }}
      <!-- follicle: the pocket the hair grows from, on the same line as the hair -->
      <line x1={root.x} y1={root.y} x2={x} y2={top} stroke="var(--art-ink)" stroke-width="18" stroke-linecap="round" />
      <line x1={root.x} y1={root.y} x2={x} y2={top} stroke="var(--art-skin-2)" stroke-width="12" stroke-linecap="round" />
      <circle cx={root.x} cy={root.y} r="11" fill="var(--art-cheek)" stroke="var(--art-ink)" stroke-width="2.5" />
      <!-- the hair -->
      <line x1={root.x} y1={root.y} x2={x + 95 * sx} y2={top - 95 * cy} stroke="var(--art-hair)" stroke-width="5" stroke-linecap="round" />
      <!-- the tiny muscle, from the follicle up to just under the skin -->
      <path
        d="M{mid.x} {mid.y}Q{(mid.x + x + 46) / 2 + 8} {(mid.y + SURF + 16) / 2 + 10} {x + 46} {SURF + 16 - 10 * k.current}"
        fill="none"
        stroke="var(--c-red)"
        stroke-width={6 + 6 * k.current}
        stroke-linecap="round"
        opacity="0.9"
      />
      {#if i === 1 && k.current > 0.6}
        <text x={x - 40} y={SURF - 34} text-anchor="end" class="lbl">{t('bump')} →</text>
      {/if}
    {/each}
    <!-- legend -->
    <g transform="translate(30 32)">
      <path d="M0 0h26" stroke="var(--art-hair)" stroke-width="5" stroke-linecap="round" />
      <text x="36" y="5" class="lbl">{t('hair')}</text>
      <path d="M0 24h26" stroke="var(--c-red)" stroke-width="8" stroke-linecap="round" />
      <text x="36" y="29" class="lbl">{t('muscle')}</text>
    </g>
    <rect x="10" y="10" width="620" height="280" rx="14" fill="none" stroke="var(--line-2)" stroke-width="2" />
  </Stage>
  {#snippet controls()}
    <Segmented
      label={t('feel')}
      bind:value={feel}
      options={[
        { value: 'warm', label: '☀️ ' + t('warm') },
        { value: 'cold', label: '❄️ ' + t('cold') },
        { value: 'scared', label: '😱 ' + t('scared') },
      ]}
    />
  {/snippet}
</Lab>

<style>
  .lbl {
    font-weight: 800;
    font-size: 15px;
    fill: var(--art-ink);
  }
</style>
