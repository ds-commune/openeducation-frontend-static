<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    icon?: string;
    variant?: "default" | "danger" | "warning";
    children: Snippet;
  };

  const { icon = "💡", variant = "default", children }: Props = $props();
</script>

<div
  class="takeaway-card"
  class:danger={variant === "danger"}
  class:warning={variant === "warning"}
>
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">takeaway-card</p>
  {/if}

  <div class="icon">{icon}</div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .takeaway-card {
    display: flex;
    gap: 1.25rem;
    background: var(--color-primary-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    margin-top: 2rem;

    &.danger {
      background: var(--color-error-50);
    }

    &.warning {
      background: var(--color-warning-50);
    }
  }

  .icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
  }

  .content :global {
    p {
      margin: 0;
      font-size: 1.25rem;

      + p {
        margin-top: 0.75rem;
      }
    }
  }
</style>
