<script lang="ts">
  import Sidebar from "./components/sidebar.svelte";
  import BottomNav from "./components/bottom-nav.svelte";

  const { data, children } = $props();

  const { levelIndex, lessonIndex, lesson, level, isLevelOverview } =
    $derived(data);
</script>

<svelte:head>
  {#if isLevelOverview}
    <title>{level.name} — OpenEducation</title>
  {:else if lesson}
    <title>{lesson.name} — OpenEducation</title>
  {/if}
</svelte:head>

<div>
  <Sidebar {levelIndex} lessonIndex={lessonIndex ?? -1} />

  <main>
    {#if isLevelOverview}
      <article class="level-overview">
        {@render children()}
      </article>

      <BottomNav {levelIndex} lessonIndex={-1} />
    {:else if lesson && lessonIndex !== null}
      <article>
        <header>
          <h1>{lesson.number}. {lesson.name}</h1>
        </header>

        {@render children()}
      </article>

      <BottomNav {levelIndex} {lessonIndex} />
    {/if}
  </main>
</div>

<style>
  main {
    padding: 4rem 5rem;
    max-width: 100%;
  }

  article {
    max-width: 110ch;
    margin: 0 auto;
  }

  header {
    margin-bottom: 4rem;
  }

  h1 {
    font-size: 3.25rem;
    font-weight: 700;
    color: var(--color-primary-900, #1a3a20);
    margin: 0;
    line-height: 1.2;
  }

  div {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 100vh;
  }

  @media (max-width: 1100px) {
    main {
      padding: 2rem 1.5rem;
    }

    div {
      display: block;
    }

    header {
      padding-right: 4rem; /* Space for mobile menu toggle button */
      margin-bottom: 2.5rem;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>
