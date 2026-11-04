<script lang="ts">
  // A small hands-on lab for a why page: a picture, one line saying what is happening, and a few controls.
  // Labs stay short, so they work on phones too.
  //
  // A lab plays like a short film until the reader touches a control; then they are in charge.
  // `running` tells the lab when to play its film: motion is on (src/lib/motion.ts), the lab is on
  // screen, and nobody has taken over. Pressing play again restarts the film.
  // `active` is true whenever things may move at all (motion on, lab on screen), even after the reader
  // has taken over: for labs where something keeps moving under the reader's control (a car driving).
  import type { Snippet } from 'svelte';
  import { onMotion, onVisible, setMotion } from '@/lib/motion';
  import { strings } from './strings';
  import type { Lang } from '@/config/site';

  interface Props {
    title: string;
    caption: string;
    lang?: Lang;
    running?: boolean;
    active?: boolean;
    children: Snippet;
    controls: Snippet;
  }
  let { title, caption, lang = 'en', running = $bindable(false), active = $bindable(false), children, controls }: Props = $props();
  const t = strings(lang);

  let el: HTMLElement;
  let motion = $state(false);
  let visible = $state(false);
  let auto = $state(true);
  $effect(() => onMotion((on) => (motion = on)));
  $effect(() => onVisible(el, (v) => (visible = v)));
  $effect(() => {
    active = motion && visible;
    running = active && auto;
  });

  function toggle() {
    if (motion && auto) setMotion(false);
    else {
      auto = true;
      setMotion(true);
    }
  }
  const playing = $derived(motion && auto);
</script>

<section class="lab wide" bind:this={el} data-anim data-paused={motion ? undefined : ''} data-offscreen={visible ? undefined : ''}>
  <header><span aria-hidden="true">🔬</span> {title}</header>
  <div class="fig">{@render children()}</div>
  <p class="cap" aria-live={running ? 'off' : 'polite'}>{@html caption}</p>
  <!-- Like a video player: play/pause sits right next to the controls it moves. -->
  <div class="bar">
    <button type="button" class="pp" class:on={playing} onclick={toggle} aria-label={playing ? t('pause') : t('play')} title={playing ? t('pause') : t('play')}>
      {#if playing}
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg>
      {:else}
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.2-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" /></svg>
      {/if}
    </button>
    <!-- Any slider or button here means the reader has taken over from the film. -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="controls" oninput={() => (auto = false)} onclick={(e) => (e.target as HTMLElement).closest('button') && (auto = false)}>{@render controls()}</div>
  </div>
</section>

<style>
  .lab {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--r-3);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    margin: 1rem 0 1.5rem;
  }
  header {
    padding: 0.6rem 1.1rem;
    font-weight: 900;
    font-size: var(--fs-0);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cat-text, var(--ink-2));
    border-bottom: 1px solid var(--line);
    background: var(--cat-soft, var(--surface-2));
  }
  .bar {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.2rem 1.2rem;
  }
  .pp {
    flex-shrink: 0;
    /* Lines up with the first slider's track. */
    margin-top: 10px;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--brand);
    background: var(--surface);
    color: var(--brand-ink);
    cursor: pointer;
    transition: background var(--t-fast), transform var(--t-fast);
  }
  .pp.on {
    background: var(--brand);
    color: var(--on-brand);
  }
  .pp:hover {
    transform: scale(1.06);
  }
  .pp svg {
    fill: currentColor;
  }
  .fig {
    padding: 0.5rem;
  }
  .cap {
    margin: 0;
    padding: 0.8rem 1.2rem;
    min-height: 4.6em;
    border-top: 1px solid var(--line);
    font-size: var(--fs-1);
    font-weight: 650;
    background: var(--surface-2);
  }
  .controls {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem 1.5rem;
  }
  .controls > :global(*) {
    flex: 1 1 220px;
  }
  .controls > :global(.btn) {
    flex: 0 0 auto;
  }
</style>
