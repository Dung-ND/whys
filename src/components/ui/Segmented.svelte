<script lang="ts" generics="T extends string | number">
  interface Props {
    label?: string;
    value: T;
    options: { value: T; label: string; title?: string }[];
  }
  let { label, value = $bindable(), options }: Props = $props();
</script>

<div class="seg-wrap">
  {#if label}<span class="name">{label}</span>{/if}
  <div class="seg" role="radiogroup" aria-label={label}>
    {#each options as o (o.value)}
      <button type="button" role="radio" aria-checked={value === o.value} aria-label={o.title} title={o.title} onclick={() => (value = o.value)}>{o.label}</button>
    {/each}
  </div>
</div>

<style>
  .seg-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .name {
    font-weight: 800;
    font-size: 0.95rem;
  }
  .seg {
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    gap: 4px;
    background: var(--surface-2);
    border: 1px solid var(--line);
    border-radius: 22px;
  }
  button {
    flex: 1;
    min-height: 36px;
    border: 0;
    border-radius: var(--r-pill);
    background: transparent;
    font-weight: 800;
    font-size: 0.9rem;
    color: var(--ink-2);
    cursor: pointer;
    white-space: nowrap;
    padding: 0 0.6rem;
  }
  button[aria-checked='true'] {
    background: var(--surface);
    color: var(--ink);
    box-shadow: var(--shadow-1);
  }
</style>
