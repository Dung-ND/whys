<script lang="ts">
  // Parallax: things slide across your view at (speed ÷ distance). Fence posts whiz, mountains creep, the Moon
  // stays put. Shown 10× slower than real life so the posts can be seen.
  import type { Lang } from '@/config/site';
  import Stage from '@/components/ui/Stage.svelte';
  import Slider from '@/components/ui/Slider.svelte';
  import Lab from '@/components/whys/Lab.svelte';
  import { angularSpeed, MOON_DISTANCE_KM } from '@/lib/whys-science';
  import { fmt } from '@/lib/ui-strings';
  import { strings } from './strings';

  let { lang = 'en' }: { lang?: Lang } = $props();
  const t = strings(lang);
  const uid = $props.id();

  let speed = $state(60);
  let running = $state(false);
  let active = $state(false);

  // The film: speed up to 100 km/h, cruise, slow to a stop, pause, and again.
  $effect(() => {
    if (!running) return;
    let t0 = performance.now(), raf = 0;
    const tick = (now: number) => {
      const s = ((now - t0) / 1000) % 16;
      speed = Math.round(s < 4 ? 100 * (s / 4) : s < 10 ? 100 : s < 14 ? 100 * (1 - (s - 10) / 4) : 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  // Scroll each layer by its real angular speed (10 px per degree), slowed 10×.
  const PX_PER_DEG = 10, SLOW = 10;
  const layers = { post: 5, tree: 40, mountain: 10_000 };
  let off = $state({ post: 0, tree: 0, mountain: 0 });
  $effect(() => {
    if (!active) return;
    let last = performance.now(), raf = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      off = {
        post: (off.post + (angularSpeed(speed, layers.post) * PX_PER_DEG * dt) / SLOW) % 160,
        tree: (off.tree + (angularSpeed(speed, layers.tree) * PX_PER_DEG * dt) / SLOW) % 260,
        mountain: (off.mountain + (angularSpeed(speed, layers.mountain) * PX_PER_DEG * dt) / SLOW) % 400,
      };
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  const deg = (d: number) => angularSpeed(speed, d);
  // Tiny numbers are written out in full: all those zeros are the point.
  const show = (v: number) => (v === 0 ? '0' : fmt(lang, v, v >= 1 ? 0 : v >= 0.01 ? 2 : 7));
  const caption = $derived(speed < 1 ? t('stopped') : speed > 90 ? t('fast') : t('moving'));
  const rows = $derived([
    { k: t('post'), v: deg(layers.post) },
    { k: t('tree'), v: deg(layers.tree) },
    { k: t('mountain'), v: deg(layers.mountain) },
    { k: t('moon'), v: deg(MOON_DISTANCE_KM * 1000) },
  ]);
</script>

<Lab title={t('title')} {caption} {lang} bind:running bind:active>
  <Stage width={640} height={360} label={t('label')}>
    <defs><clipPath id="{uid}-win"><rect x="20" y="20" width="600" height="220" rx="30" /></clipPath></defs>
    <rect x="10" y="10" width="620" height="240" rx="36" fill="var(--art-ink)" />
    <g clip-path="url(#{uid}-win)">
      <rect x="20" y="20" width="600" height="220" fill="var(--art-night)" />
      {#each [[80, 50], [200, 40], [330, 70], [560, 46], [140, 110]] as [x, y]}<circle cx={x} cy={y} r="1.8" fill="var(--art-sun)" />{/each}
      <!-- the Moon: never scrolls -->
      <circle cx="470" cy="70" r="26" fill="var(--art-moon)" />
      <circle cx="462" cy="64" r="5" fill="var(--art-moon-dark)" opacity="0.25" /><circle cx="478" cy="80" r="4" fill="var(--art-moon-dark)" opacity="0.25" />
      <!-- mountains -->
      <g transform="translate({-off.mountain} 0)">
        {#each [0, 400, 800] as x}
          <path d="M{x} 200l90 -70l60 40l80 -80l90 70l80 40v40h-400z" fill="var(--art-night-2)" />
        {/each}
      </g>
      <rect x="20" y="200" width="600" height="40" fill="var(--art-grass-2)" opacity="0.6" />
      <!-- trees -->
      <g transform="translate({-off.tree} 0)">
        {#each [0, 260, 520, 780] as x}
          <path d="M{x + 60} 220v-30" stroke="var(--art-wood)" stroke-width="8" />
          <path d="M{x + 60} 120l40 70h-80z" fill="var(--art-grass-2)" stroke="var(--art-ink)" stroke-width="2" />
        {/each}
      </g>
      <!-- fence posts, very close -->
      <g transform="translate({-off.post} 0)">
        <rect x="0" y="196" width="800" height="8" fill="var(--art-wood)" />
        {#each [0, 160, 320, 480, 640] as x}
          <rect x={x + 40} y="150" width="22" height="100" fill="var(--art-wood)" stroke="var(--art-ink)" stroke-width="2" />
        {/each}
      </g>
    </g>
    <text x="600" y="234" text-anchor="end" class="slow">{t('slow')}</text>
    <!-- readouts: degrees per second -->
    <text x="20" y="276" class="h">{t('perSecond')}</text>
    {#each rows as r, i}
      <text x={20 + (i % 2) * 310} y={302 + Math.floor(i / 2) * 24} class="r">{r.k}: <tspan class="v">{show(r.v)}°</tspan></text>
    {/each}
  </Stage>
  {#snippet controls()}
    <Slider label={t('speed')} bind:value={speed} min={0} max={120} unit="km/h" color="var(--c-blue)" />
  {/snippet}
</Lab>

<style>
  .slow {
    font-weight: 800;
    font-size: 12px;
    fill: var(--art-moon);
    opacity: 0.8;
  }
  .h {
    font-weight: 900;
    font-size: 14px;
    fill: var(--ink);
  }
  .r {
    font-weight: 700;
    font-size: 14px;
    fill: var(--ink-2);
  }
  .v {
    font-weight: 900;
    fill: var(--t-blue);
  }
</style>
