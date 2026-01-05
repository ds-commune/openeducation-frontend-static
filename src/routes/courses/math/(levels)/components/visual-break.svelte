<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    children: Snippet;
    caption?: Snippet;
  };

  const { children, caption }: Props = $props();
</script>

<div class="visual-break">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">visual-break</p>
  {/if}

  {@render children()}
  {#if caption}
    <p class="caption">
      {@render caption()}
    </p>
  {/if}
</div>

<style>
  .visual-break {
    margin: 3rem -1rem;
    padding: 2.5rem;
    background: var(--color-surface-50, #f8f9fa);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    text-align: center;
  }

  .caption {
    font-size: 1.05rem;
    font-style: italic;
    color: var(--color-surface-600, #6b7280);
    margin: 1.5rem 0 0;
  }
</style>
