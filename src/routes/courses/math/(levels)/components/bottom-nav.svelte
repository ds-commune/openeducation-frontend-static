<script lang="ts">
  import { math } from "$lib/data/courses/math";

  interface Props {
    levelIndex: keyof typeof math.levels;
    lessonIndex: number;
  }

  let { levelIndex, lessonIndex }: Props = $props();

  const level = $derived(math.levelsWithNumbers[levelIndex]);

  const previousLessonIndex = $derived(
    lessonIndex > 0 ? lessonIndex - 1 : null
  );
  const nextLessonIndex = $derived(
    lessonIndex < level.lessons.length - 1 ? lessonIndex + 1 : null
  );

  // Show link to level overview when on first lesson
  const showLevelLink = $derived(lessonIndex === 0);
</script>

<nav aria-label="Навигация между уроками">
  <div class="prev-wrapper">
    {#if previousLessonIndex !== null}
      <a
        href={`/courses/math/level-${levelIndex}/lesson-${previousLessonIndex + 1}`}
        class="prev"
      >
        <span class="label">Предыдущий урок</span>
        <span class="title">← {level.lessons[previousLessonIndex].name}</span>
      </a>
    {:else if showLevelLink}
      <a href={`/courses/math/level-${levelIndex}`} class="prev">
        <span class="label">Обзор уровня</span>
        <span class="title">← {level.name}</span>
      </a>
    {/if}
  </div>
  <div class="next-wrapper">
    {#if nextLessonIndex !== null}
      <a
        href={`/courses/math/level-${levelIndex}/lesson-${nextLessonIndex + 1}`}
        class="next"
      >
        <span class="label">Следующий урок</span>
        <span class="title">{level.lessons[nextLessonIndex].name} →</span>
      </a>
    {/if}
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-top: 5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--color-surface-200, #e9ecef);
    max-width: 110ch;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 2rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    text-decoration: none;
    transition: all 0.2s;

    &.prev {
      background: var(--color-surface-100);
      color: var(--color-surface-700);
      text-align: left;

      &:hover {
        background: var(--color-surface-200);
        transform: translateY(-2px);
      }
    }

    &.next {
      background: var(--color-primary-600);
      color: var(--color-primary-50);
      text-align: right;

      &:hover {
        background: var(--color-primary-700);
        box-shadow: 0 18px 40px
          color-mix(in oklab, var(--color-surface-900) 0.14, transparent);
        transform: translateY(-2px);
      }
    }
  }

  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .title {
    font-size: 1.375rem;
    font-weight: 600;
    margin-top: 0.375rem;
  }

  @media (max-width: 700px) {
    nav {
      flex-direction: column;
      align-items: stretch;

      > div {
        width: 100%;
      }
    }

    a {
      width: 100%;

      &.next {
        text-align: left;
      }
    }

    .next-wrapper {
      order: 1;
    }

    .prev-wrapper {
      order: 2;
    }
  }
</style>
