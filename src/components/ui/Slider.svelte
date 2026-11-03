<script lang="ts">
  interface Props {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    color?: string;
    format?: (v: number) => string;
  }
  let { label, value = $bindable(), min, max, step = 1, unit = '', color = 'var(--brand)', format = (v) => String(v) }: Props = $props();
  const text = $derived(color.replace('--c-', '--t-').replace('--brand)', '--brand-ink)'));
  const pct = $derived(((value - min) / (max - min)) * 100);
</script>

<label class="slider" style="--c:{color}; --tc:{text}; --p:{pct}%">
  <span class="top">
    <span class="name">{label}</span>
    <output>{format(value)}{unit ? ` ${unit}` : ''}</output>
  </span>
  <input type="range" {min} {max} {step} bind:value />
</label>

<style>
  .slider {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-weight: 800;
    font-size: 0.95rem;
  }
  output {
    color: var(--tc);
    font-variant-numeric: tabular-nums;
  }
  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 32px;
    background: transparent;
    cursor: pointer;
    margin: 0;
  }
  input::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 99px;
    background: linear-gradient(to right, var(--c) var(--p), var(--line) var(--p));
  }
  input::-moz-range-track {
    height: 10px;
    border-radius: 99px;
    background: linear-gradient(to right, var(--c) var(--p), var(--line) var(--p));
  }
  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    margin-top: -9px;
    border-radius: 50%;
    background: #fff;
    border: 4px solid var(--c);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
  }
  input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 4px solid var(--c);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
  }
  input:focus-visible {
    outline: none;
  }
  input:focus-visible::-webkit-slider-thumb {
    outline: 3px solid var(--brand);
    outline-offset: 2px;
  }
</style>
