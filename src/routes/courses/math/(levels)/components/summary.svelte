<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    title: string;
    children: Snippet;
  };

  const { title, children }: Props = $props();
</script>

<div class="summary">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">summary</p>
  {/if}

  <h2>{title}</h2>

  {@render children()}
</div>

<style>
  .summary {
    background: linear-gradient(
      135deg,
      var(--color-primary-100, #c8e6c9),
      var(--color-primary-50, #e8f5e9)
    );
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2.5rem;
    box-shadow: 0 18px 40px
      color-mix(in oklab, var(--color-surface-900) 0.14, transparent);
    margin-top: 3rem;
    font-size: 1.25rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-wrap: balance;
  }

  .summary :global {
    p {
      font-size: 1.25rem;
    }

    blockquote {
      border-color: var(--color-primary-100, #2d4a32);
    }
  }
</style>
