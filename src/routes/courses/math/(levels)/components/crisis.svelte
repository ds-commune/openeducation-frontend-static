<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    icon: string;
    title: string;
    children: Snippet;
    questionTitle?: string;
    question?: Snippet;
  };

  const { icon, title, children, questionTitle, question }: Props = $props();
</script>

<div class="crisis">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">crisis</p>
  {/if}

  <div class="header">
    <div class="icon">{icon}</div>
    <h2>{title}</h2>
  </div>

  <div class="content">
    {@render children()}

    {#if question}
      <div class="question">
        {#if questionTitle}
          <h3>{questionTitle}</h3>
        {/if}

        {@render question()}
      </div>
    {/if}
  </div>
</div>

<style>
  .crisis {
    position: relative;
    background: linear-gradient(
      135deg,
      var(--color-warning-100),
      var(--color-warning-50)
    );
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2.5rem;
    box-shadow: 0 18px 40px
      color-mix(in oklab, var(--color-surface-900) 0.14, transparent);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    h2 {
      margin: 0;
      flex: 1;
      min-width: 0;
    }
  }

  .icon {
    font-size: 4rem;
    flex-shrink: 0;
  }

  h3 {
    margin-top: 0;
    color: var(--color-error-600, #dc3545);
  }

  .question {
    background: var(--color-surface-100);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 1.5rem 2rem;
    font-size: 1.25rem;
    line-height: 1.6;
  }

  .crisis :global {
    blockquote {
      margin: 1.25rem 0;
      padding: 1.25rem 1.5rem;
      background: color-mix(
        in oklab,
        var(--color-warning-200) 0.7,
        var(--color-warning-50)
      );
      border-radius: calc(var(--radius-container, 0.25rem) * 4);
      border-left: 4px solid var(--color-warning-500);

      p:first-child {
        margin-top: 0;
      }

      p:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 1100px) {
    .crisis {
      padding: 2.25rem 2rem;
    }

    .header {
      align-items: flex-start;
    }
  }

  @media (max-width: 700px) {
    .crisis {
      padding: 1.75rem 1.25rem 2rem;
    }

    .header {
      gap: 1rem;
    }

    .icon {
      font-size: 3.5rem;
    }

    .question {
      padding: 1.25rem 1.5rem;
    }
  }
</style>
