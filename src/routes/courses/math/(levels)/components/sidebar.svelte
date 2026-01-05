<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_SHOW_LESSON_NUMBERS_IN_SIDEBAR } from "$env/static/public";
  import { math } from "$lib/data/courses/math";

  interface Props {
    levelIndex: keyof typeof math.levels;
    lessonIndex: number;
  }

  let { levelIndex, lessonIndex }: Props = $props();

  const level = $derived(math.levelsWithNumbers[levelIndex]);

  // CSS controls default state via media queries (no flash on load)
  // userState: null = use CSS default, true = user opened, false = user closed
  let userState: boolean | null = $state(null);

  // Track viewport for backdrop logic
  let isMobile = $state(false);

  onMount(() => {
    const checkViewport = () => {
      isMobile = window.innerWidth <= 1100;
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  });

  function toggle() {
    if (userState === null) {
      // First toggle: invert from CSS default
      // Desktop default is open → close; Mobile default is closed → open
      userState = isMobile;
    } else {
      userState = !userState;
    }
  }

  function closeOnMobile() {
    userState = false;
  }
</script>

<!-- Mobile backdrop (only visible when mobile sidebar is open) -->
<button
  class="backdrop"
  class:visible={isMobile && userState === true}
  onclick={closeOnMobile}
  aria-label="Закрыть меню"
></button>

<aside
  class:user-open={userState === true}
  class:user-closed={userState === false}
  aria-label="Навигация по курсу"
>
  <!-- Sticky header with toggle button and level title -->
  <header>
    <button
      class="toggle-btn"
      onclick={toggle}
      aria-label="Открыть/закрыть меню"
    >
      <span class="toggle-icon icon-expand">☰</span>
      <span class="toggle-icon icon-collapse">✕</span>
    </button>
    <div class="level-title">{level.name}</div>
  </header>

  <nav>
    {#each level.modules as module (module.number)}
      <div
        class="module"
        class:current={module.lessons.some(
          (lesson) => lesson.number === lessonIndex + 1
        )}
      >
        <div class="module-title">{module.name}</div>
        <ul class="lessons">
          {#each module.lessons as lessonItem (lessonItem.number)}
            <li
              class="lesson-item"
              class:active={lessonItem.number === lessonIndex + 1}
            >
              <a
                href="/courses/math/level-{levelIndex}/lesson-{lessonItem.number}"
                aria-current={lessonItem.number === lessonIndex + 1
                  ? "page"
                  : undefined}
              >
                {#if PUBLIC_SHOW_LESSON_NUMBERS_IN_SIDEBAR}
                  {lessonItem.number}.
                {/if}
                {lessonItem.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>

<style>
  /* ======================
     BACKDROP (mobile only)
     ====================== */
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 90;
    border: none;
    cursor: pointer;

    &:visible {
      display: block;
    }
  }

  /* ======================
     SIDEBAR
     ====================== */
  aside {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height - adjusts to visible area (e.g. when DevTools open) */
    background: var(--color-surface-50, #f8f9fa);
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Sidebar itself doesn't scroll - only nav does */
    transition:
      width 0.3s ease,
      transform 0.3s ease;
  }

  /* ======================
     SIDEBAR HEADER (sticky within sidebar)
     ====================== */
  header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--color-surface-50, #f8f9fa);
    border-bottom: 1px solid var(--color-surface-200, #e9ecef);
  }

  .toggle-btn {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-surface-200, #e9ecef);
    background: var(--color-surface-100, #f1f3f4);
    cursor: pointer;
    font-size: 1.125rem;
    color: var(--color-surface-700, #495057);
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--color-surface-200, #e9ecef);
    }
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .level-title {
    flex: 1;
    min-width: 0;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-surface-600, #6c757d);
    margin: 0;
    line-height: 1.3;
  }

  /* Desktop: default is open, show collapse icon */
  @media (min-width: 1101px) {
    .icon-expand {
      display: none;
    }
    .icon-collapse {
      display: flex;
    }

    aside.user-closed {
      /* When user closed sidebar, show expand icon */
      .icon-expand {
        display: flex;
      }

      .icon-collapse {
        display: none;
      }
    }
  }

  /* Mobile: default is closed, show expand icon */
  @media (max-width: 1100px) {
    .icon-expand {
      display: flex;
    }
    .icon-collapse {
      display: none;
    }

    aside.user-open {
      /* When user opened sidebar, show collapse icon */
      .icon-expand {
        display: none;
      }

      .icon-collapse {
        display: flex;
      }
    }
  }

  /* ======================
     DESKTOP STYLES
     ====================== */
  @media (min-width: 1101px) {
    aside {
      width: 320px;
      border-right: 1px solid var(--color-surface-200, #e9ecef);

      /* Desktop: collapsed when user explicitly closed */
      &.user-closed {
        width: 0;
        overflow: hidden;
        border-right: none;

        header {
          /* Keep header visible for re-opening */
          position: fixed;
          top: 0;
          left: 0;
          width: auto;
          padding: 1rem;
          border: none;
          background: transparent;
        }

        .level-title {
          display: none;
        }

        nav {
          display: none;
        }
      }
    }
  }

  /* ======================
     MOBILE STYLES
     ====================== */
  @media (max-width: 1100px) {
    aside {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      z-index: 100;
      width: 320px;
      max-width: 85vw;
      height: auto;
      border-left: 1px solid var(--color-surface-200, #e9ecef);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900, #111827) 0.12, transparent);
      /* Mobile: collapsed by default (hidden to the right) */
      transform: translateX(100%);
      pointer-events: none;

      /* Mobile: expanded when user explicitly opened */
      &.user-open {
        transform: translateX(0);
        pointer-events: auto;
      }

      &:not(.user-open) {
        /* Mobile: toggle button in fixed position when sidebar closed */
        header {
          position: fixed;
          top: 0;
          right: 0;
          width: auto;
          padding: 0.75rem;
          border: none;
          background: transparent;
        }

        .level-title {
          display: none;
        }
      }
    }
  }

  /* ======================
     TABLE OF CONTENTS
     ====================== */
  nav {
    flex: 1;
    min-height: 0; /* Critical for flex container to allow overflow */
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain; /* Prevent scroll chaining to parent */
    padding: 1.5rem 1.25rem 5rem 1.25rem; /* Top margin after header, 5rem gap at bottom */
    scroll-behavior: smooth;
  }

  .module {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .module-title {
    font-variant: small-caps;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--color-surface-700, #495057);
    margin-bottom: 0.5rem;
    text-transform: lowercase;
  }

  .lessons {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 2px solid var(--color-surface-200, #e9ecef);
    padding-left: 1rem;
  }

  .lesson-item {
    margin: 0.2rem 0;

    a {
      display: block;
      padding: 0.4rem 0.875rem;
      color: var(--color-surface-600, #6c757d);
      text-decoration: none;
      font-size: 1.125rem;
      font-weight: 500;
      border-radius: calc(var(--radius-container, 0.25rem) * 2);
      transition: all 0.2s;

      &:hover {
        background: var(--color-surface-200, #e9ecef);
        color: var(--color-surface-900, #212529);
      }
    }

    &.active {
      a {
        background: var(--color-primary-100, #d4edda);
        color: var(--color-primary-700, #2d5a3d);
        font-weight: 600;
        border-left: 3px solid var(--color-primary-600, #3a5a40);
        margin-left: -1rem;
        padding-left: calc(0.875rem + 1rem - 3px);

        &:hover {
          transform: none;
        }
      }
    }
  }
</style>
