<script lang="ts">
  interface Props { label: string; value: string; color?: string }
  let { label, value, color = 'var(--ink)' }: Props = $props();
  // Concept colors are too light for small text; use their darker text twins.
  const text = $derived(color.replace('--c-', '--t-').replace('--brand)', '--brand-ink)'));
</script>

<span class="ro"><span class="l">{label}</span> <strong style="color:{text}">{value}</strong></span>

<style>
  .ro {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    font-size: 0.95rem;
  }
  .l {
    color: var(--muted);
    font-weight: 750;
  }
  strong {
    font-weight: 900;
    font-size: 1.05rem;
  }
</style>
