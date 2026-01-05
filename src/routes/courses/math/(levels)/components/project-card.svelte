<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    children: Snippet;
    scenario?: Snippet;
  };

  const { children, scenario }: Props = $props();
</script>

<div class="project-card">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">project-card</p>
  {/if}

  {#if scenario}
    <div class="scenario">
      {@render scenario()}
    </div>
  {/if}
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .project-card {
    background: var(--color-surface-100, #f1f3f5);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2.5rem;
    margin: 2rem 0;
    box-shadow: 0 12px 32px
      color-mix(in oklab, var(--color-surface-900, #111827) 0.12, transparent);
  }

  .scenario {
    background: var(--color-surface-50, #f8f9fa);
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .scenario :global {
    p {
      margin: 0;
      font-size: 1.25rem;
    }

    h3 {
      margin-top: 0;
    }

    ol,
    ul {
      font-size: 1.25rem;
      line-height: 1.8;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
