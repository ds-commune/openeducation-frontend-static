<script lang="ts">
  import { math } from "$lib/data/courses/math";

  const levels = [
    {
      number: 1,
      name: math.levels[1].name,
      description:
        "Фундамент математического мышления: логика, множества, числа и первые шаги в мир абстракций.",
      icon: "🏛️",
      available: true,
      lessonsCount: math.levelsWithNumbers[1].lessons.length,
    },
    {
      number: 2,
      name: "Расширение горизонтов",
      description:
        "Десятичная система, дроби, координаты и отрицательные числа — расширяем границы возможного.",
      icon: "🌅",
      available: false,
      lessonsCount: 25,
    },
    {
      number: 3,
      name: "Алгебра и уравнения",
      description:
        "Язык переменных, уравнения, неравенства и функции — математика начинает говорить.",
      icon: "⚗️",
      available: false,
      lessonsCount: 28,
    },
    {
      number: 4,
      name: "Геометрия и пространство",
      description:
        "Фигуры, углы, площади и объёмы — понимаем форму мира вокруг нас.",
      icon: "📐",
      available: false,
      lessonsCount: 24,
    },
    {
      number: 5,
      name: "Анализ и бесконечность",
      description:
        "Пределы, производные и интегралы — математика бесконечно малых величин.",
      icon: "∞",
      available: false,
      lessonsCount: 30,
    },
    {
      number: 6,
      name: "Вероятность и статистика",
      description:
        "Случайность, распределения и анализ данных — принимаем решения в мире неопределённости.",
      icon: "🎲",
      available: false,
      lessonsCount: 22,
    },
  ];
</script>

<svelte:head>
  <title>Математика — OpenEducation</title>
</svelte:head>

<main>
  <header class="hero">
    <p class="course-badge">Курс</p>
    <h1>Математика</h1>
    <p class="tagline">
      От интуиции к строгости: путешествие через 6 уровней математического
      мышления
    </p>
  </header>

  <section class="intro">
    <p>
      Этот курс — не набор формул для заучивания. Это
      <strong>архитектура реальности</strong> — способ видеть структуру мира через
      призму логики, чисел и пространства. Каждый уровень открывает новый слой понимания.
    </p>
  </section>

  <section class="levels">
    <h2>Уровни курса</h2>

    <div class="levels-grid">
      {#each levels as level (level.number)}
        <article class="level-card" class:available={level.available}>
          <div class="level-header">
            <span class="level-icon">{level.icon}</span>
            <div class="level-meta">
              <span class="level-number">Уровень {level.number}</span>
              {#if level.available}
                <span class="level-status available">Доступен</span>
              {:else}
                <span class="level-status">Скоро</span>
              {/if}
            </div>
          </div>

          <h3>{level.name}</h3>
          <p>{level.description}</p>

          <footer class="level-footer">
            <span class="lessons-count">{level.lessonsCount} уроков</span>
            {#if level.available}
              <a href="/courses/math/level-{level.number}" class="start-btn">
                Начать →
              </a>
            {/if}
          </footer>
        </article>
      {/each}
    </div>
  </section>

  <section class="philosophy">
    <h2>Философия курса</h2>

    <div class="philosophy-grid">
      <article class="philosophy-card">
        <div class="philosophy-icon">💡</div>
        <h3>Кризис → понимание</h3>
        <p>
          Каждый урок начинается с интеллектуального вызова, который разрушает
          привычные представления и открывает путь к глубокому пониманию.
        </p>
      </article>

      <article class="philosophy-card">
        <div class="philosophy-icon">🔗</div>
        <h3>Связи, а не факты</h3>
        <p>
          Мы строим сеть понятий, где каждая идея связана с другими. Математика
          — это не список правил, а единая структура.
        </p>
      </article>

      <article class="philosophy-card">
        <div class="philosophy-icon">🎯</div>
        <h3>1000 часов вместо 12000</h3>
        <p>
          Фокус на сути, а не на бесконечных упражнениях. Понимание «почему»
          важнее механического «как».
        </p>
      </article>
    </div>
  </section>

  <section class="cta">
    <p>Готовы начать путешествие?</p>
    <a href="/courses/math/level-1" class="cta-btn">Начать с первого уровня →</a
    >
  </section>
</main>

<style>
  main {
    max-width: 110ch;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .course-badge {
    display: inline-block;
    background: var(--color-primary-100);
    color: var(--color-primary-700);
    padding: 0.5rem 1.5rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 8);
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }

  .hero h1 {
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-primary-900, #1a3a20);
    margin: 0 0 1.5rem;
    line-height: 1.1;
  }

  .tagline {
    font-size: 1.5rem;
    color: var(--color-surface-600);
    max-width: 50ch;
    margin: 0 auto;
    line-height: 1.5;
  }

  .intro {
    font-size: 1.375rem;
    max-width: 70ch;
    margin: 0 auto 5rem;
    text-align: center;
    line-height: 1.7;
  }

  .intro p {
    margin: 0;
  }

  section {
    margin-bottom: 5rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .levels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .level-card {
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &.available {
      background: linear-gradient(
        135deg,
        var(--color-primary-50),
        var(--color-surface-50)
      );
      border: 2px solid var(--color-primary-200);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px
          color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
      }
    }

    &:not(.available) {
      opacity: 0.7;
    }
  }

  .level-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .level-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .level-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .level-number {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-surface-500);
  }

  .level-status {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    background: var(--color-surface-200);
    color: var(--color-surface-600);
    width: fit-content;

    &.available {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }
  }

  .level-card h3 {
    color: var(--color-surface-800);
    margin-bottom: 0.75rem;
  }

  .level-card p {
    margin: 0;
    color: var(--color-surface-600);
    font-size: 1.125rem;
    line-height: 1.6;
    flex: 1;
  }

  .level-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-surface-200);
  }

  .lessons-count {
    font-size: 0.9rem;
    color: var(--color-surface-500);
  }

  .start-btn {
    background: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 0.6rem 1.25rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition:
      background 0.2s,
      transform 0.2s;

    &:hover {
      background: var(--color-primary-700);
      transform: translateY(-2px);
    }
  }

  .philosophy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .philosophy-card {
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    text-align: center;
  }

  .philosophy-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .philosophy-card h3 {
    color: var(--color-primary-800);
    margin-bottom: 0.75rem;
  }

  .philosophy-card p {
    margin: 0;
    color: var(--color-surface-700);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .cta {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(
      135deg,
      var(--color-primary-100),
      var(--color-primary-50)
    );
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    margin-bottom: 0;
  }

  .cta p {
    font-size: 1.5rem;
    color: var(--color-primary-800);
    margin: 0 0 1.5rem;
    font-weight: 500;
  }

  .cta-btn {
    display: inline-block;
    background: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 1rem 2rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 3);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    transition:
      background 0.2s,
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      background: var(--color-primary-700);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.14, transparent);
    }
  }

  @media (max-width: 700px) {
    main {
      padding: 2rem 1.25rem;
    }

    .hero h1 {
      font-size: 2.75rem;
    }

    .tagline {
      font-size: 1.25rem;
    }

    .intro {
      font-size: 1.25rem;
      text-align: left;
    }

    .levels-grid {
      grid-template-columns: 1fr;
    }

    .level-card {
      padding: 1.5rem;
    }
  }
</style>
