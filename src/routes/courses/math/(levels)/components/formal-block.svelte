<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    title?: string;
    children: Snippet;
    formula?: Snippet;
  };

  const { title, children, formula }: Props = $props();
</script>

<div class="formal-block">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">formal-block</p>
  {/if}

  {#if title}
    <h3>{title}</h3>
  {/if}
  <div class="content">
    {@render children()}
  </div>
  {#if formula}
    <div class="formula">
      {@render formula()}
    </div>
  {/if}
</div>

<style>
  .formal-block {
    padding: 2rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    background: var(--color-surface-50, #f8f9fa);
    box-shadow: 0 12px 32px
      color-mix(in oklab, var(--color-surface-900, #111827) 0.12, transparent);

    h3 {
      margin-top: 0;
      font-size: 1.25rem;
    }
  }

  .content :global {
    p {
      font-size: 1.125rem;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .formula {
    background: var(--color-surface-100, #f1f3f4);
    padding: 1.25rem 2rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    margin-top: 1rem;
  }
</style>
