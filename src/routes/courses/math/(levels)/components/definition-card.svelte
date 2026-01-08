<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    label?: string;
    title?: string;
    children: Snippet;
  };

  const { label = "Определение", title, children }: Props = $props();
</script>

<div class="definition-card">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">definition-card</p>
  {/if}

  <div class="label">{label}</div>
  {#if title}
    <h3>{title}</h3>
  {/if}

  {@render children()}
</div>

<style>
  .definition-card {
    background: var(--color-primary-50, #e8f5e9);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem 2.5rem;
    margin: 2rem 0;
    box-shadow: 0 12px 32px
      color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

    h3 {
      color: var(--color-primary-700, #2d5a3d);
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }

  .label {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary-600);
    margin-bottom: 0.75rem;
  }

  .definition-card :global {
    p {
      margin: 0;

      + p {
        margin-top: 1rem;
      }
    }

    ul,
    ol {
      font-size: 1.25rem;
      margin: 0;
    }

    li {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
