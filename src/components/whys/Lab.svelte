<script lang="ts">
  // A small hands-on lab for a why page: a picture, one line saying what is happening, and a few controls.
  // Labs stay short, so they work on phones too.
  import type { Snippet } from 'svelte';

  interface Props { title: string; caption: string; children: Snippet; controls: Snippet }
  let { title, caption, children, controls }: Props = $props();
</script>

<section class="lab wide">
  <header><span aria-hidden="true">🔬</span> {title}</header>
  <div class="fig">{@render children()}</div>
  <p class="cap" aria-live="polite">{@html caption}</p>
  <div class="controls">{@render controls()}</div>
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
