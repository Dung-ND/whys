<script lang="ts">
  // Responsive SVG canvas. Every figure carries the site watermark in its corner.
  import type { Snippet } from 'svelte';
  import { site } from '@/config/site';

  interface Props {
    width: number;
    height: number;
    label: string;
    svg?: SVGSVGElement;
    watermark?: boolean;
    children: Snippet;
  }
  let { width, height, label, svg = $bindable(), watermark = true, children }: Props = $props();
</script>

<svg bind:this={svg} viewBox="0 0 {width} {height}" role="group" aria-label={label} class="stage-svg">
  {@render children()}
  {#if watermark}
    <text class="wm" x={width - 14} y={height - 12} text-anchor="end">{site.watermark}</text>
  {/if}
</svg>

<style>
  .stage-svg {
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-user-select: none;
    font-family: var(--font);
    overflow: visible;
  }
  .wm {
    font-weight: 900;
    font-size: 14px;
    fill: var(--muted);
    opacity: 0.65;
    letter-spacing: -0.03em;
    pointer-events: none;
  }
</style>
