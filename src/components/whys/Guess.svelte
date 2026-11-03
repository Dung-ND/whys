<script lang="ts">
  // "Your guess": pick a hypothesis before reading, then see what each idea gets right or wrong.
  import type { Lang } from '@/config/site';
  import { strings } from './strings';

  interface Option {
    /** The guess (simple HTML allowed). */
    text: string;
    /** Shown after picking: why this idea works or doesn't. */
    reply: string;
  }
  interface Props { options: Option[]; answer: number; lang?: Lang }
  let { options, answer, lang = 'en' }: Props = $props();
  const t = strings(lang);
  const letters = 'ABCDE';

  let picked = $state<number | null>(null);
  const right = $derived(picked === answer);
</script>

<div class="guess">
  {#if picked === null}<p class="hint">{t('pick')}</p>{/if}
  <div class="opts">
    {#each options as o, i}
      <button
        type="button"
        class="opt"
        class:picked={picked === i}
        class:ok={picked !== null && i === answer}
        class:bad={picked === i && i !== answer}
        disabled={picked !== null}
        aria-pressed={picked === i}
        onclick={() => (picked = i)}
      >
        <span class="letter" aria-hidden="true">{picked !== null && i === answer ? '✓' : letters[i]}</span>
        <span>{@html o.text}</span>
      </button>
    {/each}
  </div>

  {#if picked !== null}
    <div class="reply" class:ok={right} role="status">
      <strong class="verdict">{right ? '🎉 ' + t('right') : '🧐 ' + t('wrong')}</strong>
      <p>{@html options[picked].reply}</p>
      {#if !right}
        <p class="sci"><b>{t('science')}:</b> {@html options[answer].reply}</p>
      {/if}
      <div class="row">
        <a class="btn btn-primary" href="#investigate">{t('evidence')} ↓</a>
        <button type="button" class="btn btn-ghost" onclick={() => (picked = null)}>↻ {t('again')}</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .guess {
    max-width: 46rem;
  }
  .hint {
    color: var(--ink-2);
    font-size: var(--fs-1);
  }
  .opts {
    display: grid;
    gap: 0.6rem;
  }
  .opt {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-height: 56px;
    padding: 0.6rem 1rem 0.6rem 0.6rem;
    text-align: left;
    border-radius: var(--r-2);
    border: 2px solid var(--line-2);
    background: var(--surface);
    font-weight: 750;
    font-size: var(--fs-2);
    cursor: pointer;
    box-shadow: 0 3px 0 var(--line-2);
    transition: transform var(--t-fast) var(--ease), border-color var(--t-fast), background var(--t-fast);
  }
  .opt:hover:not(:disabled) {
    border-color: var(--cat);
    transform: translateY(-2px);
  }
  .opt:disabled {
    cursor: default;
    opacity: 0.55;
  }
  .opt.picked,
  .opt.ok {
    opacity: 1;
  }
  .opt.ok {
    border-color: var(--ok);
    background: var(--ok-soft);
    box-shadow: 0 3px 0 var(--ok);
  }
  .opt.bad {
    border-color: var(--bad);
    background: var(--bad-soft);
    box-shadow: 0 3px 0 var(--bad);
  }
  .letter {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 50%;
    background: var(--cat-soft);
    color: var(--cat-text);
    font-weight: 900;
  }
  .ok .letter {
    background: var(--ok);
    color: #fff;
  }
  .reply {
    margin-top: 1rem;
    padding: 1.1rem 1.3rem;
    border-radius: var(--r-2);
    background: var(--surface-2);
    border: 1px solid var(--line);
    animation: pop var(--t-med) var(--ease);
  }
  .reply.ok {
    background: var(--ok-soft);
    border-color: transparent;
  }
  .verdict {
    font-size: var(--fs-3);
  }
  .reply p {
    margin: 0.4rem 0 0.6rem;
  }
  .sci {
    color: var(--ink-2);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.4rem;
  }
  @keyframes pop {
    from { opacity: 0; transform: translateY(6px); }
  }
</style>
