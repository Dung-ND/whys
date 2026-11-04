<script lang="ts">
  // Rubbing moves electrons from hair to a rubber balloon: the balloon turns negative, the hair positive.
  // Opposite charges attract (hair lifts toward the balloon); like charges repel (hairs spread apart).
  import type { Lang } from '@/config/site';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Stage from '@/components/ui/Stage.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);

  let q = $state(0); // 0…10
  const lift = new Tween(0, { duration: 500, easing: cubicOut });
  $effect(() => {
    lift.target = q / 10;
  });
  let rubbing = $state(false);
  function rub() {
    q = Math.min(10, q + 2);
    rubbing = true;
    setTimeout(() => (rubbing = false), 350);
  }

  // The film: five rubs, a pause to look, then the charge slowly leaks away.
  let running = $state(false);
  $effect(() => {
    if (!running) return;
    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % 12;
      if (step >= 1 && step <= 5) rub();
      else if (step >= 8) q = Math.max(0, q - 3);
    }, 1100);
    q = 0;
    return () => clearInterval(timer);
  });

  // Hair: strands on top of a head at (190, 210). Each tip turns toward the balloon as charge builds, and the
  // strands fan out from each other.
  const H = { x: 190, y: 210 }, R = 64;
  const B = { x: 450, y: 150 };
  const strands = Array.from({ length: 11 }, (_, i) => -160 + i * 14);
  const hair = $derived(
    strands.map((a) => {
      const rad = (a * Math.PI) / 180;
      const bx = H.x + R * Math.cos(rad), by = H.y + R * Math.sin(rad);
      const toB = Math.atan2(B.y - by, B.x - bx);
      // Uncharged: hair lies along the head; charged: points out, and toward the balloon.
      const rest = rad + Math.PI / 2 * 0.85 * (a < -90 ? -1 : 1);
      const out = rad + (rad - -Math.PI / 2) * 0.6 * lift.current;
      const dir = rest + (out * 0.5 + toB * 0.5 - rest) * lift.current;
      const L = 46 + 20 * lift.current;
      return { bx, by, tx: bx + L * Math.cos(dir), ty: by + L * Math.sin(dir), cx: bx + L * 0.5 * Math.cos(dir - 0.3 * (1 - lift.current)), cy: by + L * 0.5 * Math.sin(dir - 0.3 * (1 - lift.current)) };
    }),
  );
  const minus = $derived(Array.from({ length: q * 2 }, (_, i) => ({ x: B.x - 40 + (i % 5) * 20, y: B.y - 40 + Math.floor(i / 5) * 22 })));
  const plus = $derived(Array.from({ length: q * 2 }, (_, i) => ({ x: H.x - 54 + (i % 7) * 18, y: H.y - 30 + Math.floor(i / 7) * 20 })));
  const caption = $derived(q === 0 ? t('neutral') : q < 7 ? t('charged') : t('lots'));
</script>

<Lab title={t('title')} {caption} {lang} bind:running>
  <Stage width={640} height={320} label={t('label')}>
    <rect x="10" y="10" width="620" height="300" rx="14" fill="var(--art-sky-2)" />
    <!-- head -->
    <rect x={H.x - 34} y={H.y + 50} width="68" height="60" rx="20" fill="var(--art-shirt)" stroke="var(--art-ink)" stroke-width="3" />
    <circle cx={H.x} cy={H.y} r={R} fill="var(--art-skin)" stroke="var(--art-ink)" stroke-width="3" />
    {#each hair as s}
      <path d="M{s.bx} {s.by}Q{s.cx} {s.cy} {s.tx} {s.ty}" fill="none" stroke="var(--art-hair)" stroke-width="5" stroke-linecap="round" />
    {/each}
    <circle cx={H.x + 14} cy={H.y + 4} r="5" fill="var(--art-ink)" />
    <circle cx={H.x + 40} cy={H.y + 4} r="5" fill="var(--art-ink)" />
    <path d="M{H.x + 18} {H.y + 28}q12 10 24 0" fill="none" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round" />
    {#each plus as p}<text x={p.x} y={p.y} class="plus">+</text>{/each}
    <!-- balloon -->
    <g style:transform={rubbing ? 'translate(-40px, 30px)' : 'none'} class="balloon">
      <path d="M{B.x} {B.y + 92}q-6 40 10 80" fill="none" stroke="var(--art-ink)" stroke-width="2" />
      <ellipse cx={B.x} cy={B.y} rx="72" ry="88" fill="var(--art-red)" stroke="var(--art-ink)" stroke-width="3" />
      <path d="M{B.x - 8} {B.y + 86}l8 10l8 -10z" fill="var(--art-red)" stroke="var(--art-ink)" stroke-width="2.5" />
      <path d="M{B.x - 40} {B.y - 50}q14 -20 34 -24" fill="none" stroke="var(--art-white)" stroke-width="6" stroke-linecap="round" opacity="0.6" />
      {#each minus as m}<text x={m.x} y={m.y + 20} class="minus">−</text>{/each}
    </g>
  </Stage>
  {#snippet controls()}
    <button type="button" class="btn btn-primary" onclick={rub}>🎈 {t('rub')}</button>
    <button type="button" class="btn btn-ghost" onclick={() => (q = 0)}>💧 {t('leak')}</button>
  {/snippet}
</Lab>

<style>
  .plus {
    font-weight: 900;
    font-size: 20px;
    fill: var(--art-red);
    stroke: var(--art-white);
    stroke-width: 3px;
    paint-order: stroke;
  }
  .minus {
    font-weight: 900;
    font-size: 26px;
    fill: var(--art-white);
  }
  .balloon {
    transition: transform 0.3s;
  }
</style>
