<script lang="ts">
  import type { Snippet } from "svelte";
  import { PUBLIC_SHOW_COMPONENT_NAMES } from "$env/static/public";

  type Props = {
    icon?: string;
    children: Snippet;
    answer?: Snippet;
  };

  const { icon = "🤔", children, answer }: Props = $props();

  let isOpen = $state(false);

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="quiz-card">
  {#if PUBLIC_SHOW_COMPONENT_NAMES}
    <p style:position="absolute">quiz-card</p>
  {/if}

  <div class="icon">{icon}</div>
  <div class="content">
    {@render children()}
    {#if answer}
      <button
        class="reveal-btn"
        type="button"
        onclick={toggle}
        aria-expanded={isOpen}
      >
        {isOpen ? "Скрыть ответ" : "Показать ответ"}
      </button>

      {#if isOpen}
        <div class="answer">
          <span class="icon">💡</span>
          <div class="text">
            {@render answer()}
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .quiz-card {
    display: flex;
    gap: 1.5rem;
    background: var(--color-surface-50, #f8f9fa);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 12px 32px
      color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
  }

  .icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
  }

  .content :global {
    p {
      margin: 0 0 1rem;
      font-size: 1.25rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }
  }

  .reveal-btn {
    margin-top: 0.5rem;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-primary-700);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    text-align: left;

    &:hover {
      color: var(--color-primary-800);
      text-decoration: underline;
    }
  }

  .answer {
    display: flex;
    gap: 0.75rem;
    background: var(--color-success-50, #e8f5e9);
    padding: 1rem 1.25rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    font-size: 1.125rem;
    margin-top: 0.75rem;
  }

  .content .icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .text {
    flex: 1;
  }

  .text :global {
    p {
      margin: 0;
      font-size: 1.125rem;

      + p {
        margin-top: 0.5rem;
      }
    }
  }

  @media (max-width: 1100px) {
    .quiz-card {
      flex-direction: column;
    }
  }
</style>
