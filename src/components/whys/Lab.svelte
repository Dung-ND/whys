<script lang="ts">
  // A small hands-on lab for a why page: a picture, one line saying what is happening, and a few controls.
  // Labs stay short, so they work on phones too.
  //
  // A lab plays like a short film until the reader touches a control; then they are in charge.
  // `running` tells the lab when to play its film: motion is on (src/lib/motion.ts), the lab is on
  // screen, and nobody has taken over. Pressing play again restarts the film.
  import type { Snippet } from 'svelte';
  import { onMotion, onVisible, setMotion } from '@/lib/motion';
  import { strings } from './strings';
  import type { Lang } from '@/config/site';

  interface Props {
    title: string;
    caption: string;
    lang?: Lang;
    running?: boolean;
    children: Snippet;
    controls: Snippet;
  }
  let { title, caption, lang = 'en', running = $bindable(false), children, controls }: Props = $props();
  const t = strings(lang);

  let el: HTMLElement;
  let motion = $state(false);
  let visible = $state(false);
  let auto = $state(true);
  $effect(() => onMotion((on) => (motion = on)));
  $effect(() => onVisible(el, (v) => (visible = v)));
  $effect(() => {
    running = motion && visible && auto;
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
  <header>
    <span><span aria-hidden="true">🔬</span> {title}</span>
    <button type="button" class="pp" onclick={toggle} aria-label={playing ? t('pause') : t('play')} title={playing ? t('pause') : t('play')}>
      {#if playing}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg>
      {:else}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.2-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" /></svg>
      {/if}
      <span>{playing ? t('pause') : t('play')}</span>
    </button>
  </header>
  <div class="fig">{@render children()}</div>
  <p class="cap" aria-live={running ? 'off' : 'polite'}>{@html caption}</p>
  <!-- Any slider or button here means the reader has taken over from the film. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="controls" oninput={() => (auto = false)} onclick={(e) => (e.target as HTMLElement).closest('button') && (auto = false)}>{@render controls()}</div>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.45rem 0.6rem 0.45rem 1.1rem;
    font-weight: 900;
    font-size: var(--fs-0);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cat-text, var(--ink-2));
    border-bottom: 1px solid var(--line);
    background: var(--cat-soft, var(--surface-2));
  }
  .pp {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 34px;
    padding: 0 0.8rem 0 0.6rem;
    border-radius: var(--r-pill);
    border: 1px solid var(--line-2);
    background: var(--surface);
    color: var(--ink);
    font: inherit;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    cursor: pointer;
  }
  .pp:hover {
    border-color: var(--ink-2);
  }
  .pp {
    flex-shrink: 0;
    white-space: nowrap;
  }
  /* Small phones: the icon alone (the button keeps its spoken label). */
  @media (max-width: 480px) {
    .pp {
      padding: 0 0.6rem;
    }
    .pp span {
      display: none;
    }
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
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem 1.5rem;
    padding: 1rem 1.2rem 1.2rem;
  }
  .controls > :global(*) {
    flex: 1 1 220px;
  }
  .controls > :global(.btn) {
    flex: 0 0 auto;
  }
</style>
