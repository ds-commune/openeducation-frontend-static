<script lang="ts">
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";
  import type { Snippet } from "svelte";

  export type Props = {
    icon?: string;
    title?: string;
    description?: Snippet | string;
    children: Snippet;
  };

  const { icon, title, description, children }: Props = $props();
</script>

<div class="card">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">card</p>
  {/if}

  {#if icon || title}
    <header>
      {#if icon}
        <span>{icon}</span>
      {/if}

      {#if title}
        <h3>{title}</h3>
      {/if}
    </header>
  {/if}

  {#if description}
    <p class="description">
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </p>
  {/if}

  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background: var(--color-primary-50, #e8f5e9);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    margin-top: 2rem;
  }

  header {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
      font-size: 2.5rem;
      line-height: 1;
      flex-shrink: 0;
    }

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary-900, #1a3a20);
    }
  }

  .description {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--color-surface-700, #495057);
    text-align: center;
  }

  .content {
    font-size: 1.25rem;
    width: 100%;
  }
</style>
