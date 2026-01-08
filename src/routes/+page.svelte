<script lang="ts">
  import { math } from "$lib/data/courses/math";
  import logo from "$lib/assets/icon_1280.webp";

  const courses = [
    {
      id: "math",
      name: "Математика",
      description:
        "От интуиции к строгости: логика, числа, пространство и вероятность. 6 уровней, которые построят фундамент математического мышления.",
      icon: "📐",
      levels: 6,
      availableLevels: 1,
      lessonsCount: math.levelsWithNumbers[1].lessons.length,
      href: "/courses/math",
    },
  ];

  const principles = [
    {
      icon: "⚡",
      title: "Эффективность вместо объёма",
      description:
        "Традиционное образование тратит тысячи часов на механические упражнения. Мы фокусируемся на понимании сути — и достигаем того же результата на порядок быстрее.",
    },
    {
      icon: "🧠",
      title: "Кризис как метод",
      description:
        "Каждый урок начинается с интеллектуального вызова. Мы разрушаем иллюзию понимания, чтобы построить настоящее знание.",
    },
    {
      icon: "🏗️",
      title: "Архитектура реальности",
      description:
        "Мы не учим отдельным фактам. Мы строим единую картину мира, где каждое понятие связано с другими.",
    },
    {
      icon: "🎯",
      title: "Понимание важнее запоминания",
      description:
        "Формулы забываются, понимание остаётся. Мы учим видеть структуру, а не зубрить правила.",
    },
    {
      icon: "🔗",
      title: "Связи между понятиями",
      description:
        "Каждая тема связана с предыдущими и следующими. Знания не висят в воздухе — они образуют прочную сеть.",
    },
    {
      icon: "🎨",
      title: "Визуализация и интерактив",
      description:
        "Абстрактные идеи становятся осязаемыми через интерактивные демонстрации. Увидеть — значит понять.",
    },
  ];
</script>

<svelte:head>
  <title>OpenEducation — образование, которое работает</title>
  <meta
    name="description"
    content="Революционный подход к образованию. Математика, физика и другие науки через архитектуру реальности. Понимание вместо зубрёжки."
  />
</svelte:head>

<main>
  <header class="hero">
    <p class="platform-badge">Образовательная платформа</p>
    <img src={logo} alt="Логотип OpenEducation — книга-портал в мир знаний" />
    <h1>OpenEducation</h1>
    <p class="tagline">
      Образование, которое работает. <br />
      Понимание вместо зубрёжки.
    </p>
    <a href="#courses" class="hero-cta">Начать обучение ↓</a>
  </header>

  <section class="mission">
    <h2>Наша миссия</h2>
    <p>
      Традиционное образование тратит <strong>12 000 часов</strong> на школьную программу.
      Бо́льшая часть этого времени уходит на бесконечные упражнения, заучивание и подготовку
      к тестам. Реальное понимание — редкий побочный эффект.
    </p>
    <p>
      Мы верим, что можно иначе. <strong>OpenEducation</strong> — это курсы, построенные
      на принципе «архитектуры реальности»: вместо разрозненных фактов мы даём единую
      структуру знания. Вместо зубрёжки — глубокое понимание.
    </p>
    <p>
      Результат: <strong>глубокое понимание</strong> за время, которое традиционное
      образование тратит на поверхностное знакомство.
    </p>
  </section>

  <section class="principles">
    <h2>Как мы учим</h2>

    <div class="principles-grid">
      {#each principles as principle}
        <article class="principle-card">
          <div class="principle-icon">{principle.icon}</div>
          <h3>{principle.title}</h3>
          <p>{principle.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="courses" id="courses">
    <h2>Курсы</h2>

    <div class="courses-grid">
      {#each courses as course (course.id)}
        <article class="course-card">
          <div class="course-header">
            <span class="course-icon">{course.icon}</span>
            <div class="course-meta">
              <span class="course-status">
                {course.availableLevels} из {course.levels} уровней
              </span>
            </div>
          </div>

          <h3>{course.name}</h3>
          <p>{course.description}</p>

          <footer class="course-footer">
            <span class="lessons-info"
              >{course.lessonsCount} уроков доступно</span
            >
            <a href={course.href} class="course-btn">Перейти к курсу →</a>
          </footer>
        </article>
      {/each}

      <article class="course-card coming-soon">
        <div class="course-header">
          <span class="course-icon">🔬</span>
          <div class="course-meta">
            <span class="course-status soon">Позже</span>
          </div>
        </div>
        <h3>Физика</h3>
        <p>
          Законы природы от механики до квантовой физики. Понимание того, как
          устроен мир на фундаментальном уровне.
        </p>
      </article>

      <article class="course-card coming-soon">
        <div class="course-header">
          <span class="course-icon">💻</span>
          <div class="course-meta">
            <span class="course-status soon">Позже</span>
          </div>
        </div>
        <h3>Информатика</h3>
        <p>
          Алгоритмы, структуры данных и вычислительное мышление. Язык, на
          котором говорит современный мир.
        </p>
      </article>
    </div>
  </section>

  <section class="audience">
    <h2>Для кого это</h2>

    <div class="audience-grid">
      <article class="audience-card">
        <div class="audience-icon">🎓</div>
        <h3>Школьники и студенты</h3>
        <p>
          Тем, кто устал от бессмысленной зубрёжки и хочет по-настоящему понять
          предмет.
        </p>
      </article>

      <article class="audience-card">
        <div class="audience-icon">👨‍💼</div>
        <h3>Взрослые</h3>
        <p>
          Тем, кто хочет заполнить пробелы в образовании или освоить новую
          область с нуля.
        </p>
      </article>

      <article class="audience-card">
        <div class="audience-icon">👨‍👩‍👧</div>
        <h3>Родители</h3>
        <p>
          Тем, кто хочет помочь детям учиться эффективнее и понимать глубже.
        </p>
      </article>
    </div>
  </section>

  <section class="cta">
    <h2>Готовы начать?</h2>
    <p>
      Первый шаг — самый важный. Начните с математики и убедитесь, что обучение
      может быть другим.
    </p>
    <a href="/courses/math" class="cta-btn">Начать с математики →</a>
  </section>

  <footer class="site-footer">
    <p>OpenEducation — открытое образование для всех</p>
  </footer>
</main>

<style>
  main {
    max-width: 110ch;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero {
    text-align: center;
    padding: 6rem 0 5rem;

    img {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  .platform-badge {
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
    font-size: 4.5rem;
    font-weight: 700;
    color: var(--color-primary-900, #1a3a20);
    margin: 0 0 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .tagline {
    font-size: 1.75rem;
    color: var(--color-surface-600);
    max-width: 40ch;
    margin: 0 auto 2.5rem;
    line-height: 1.4;
  }

  .hero-cta {
    display: inline-block;
    background: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 1rem 2.5rem;
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

  section {
    padding: 4rem 0;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .mission {
    max-width: 70ch;
    margin: 0 auto;
    padding: 4rem 2rem;
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
  }

  .mission h2 {
    margin-bottom: 1.5rem;
  }

  .mission p {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--color-surface-700);
    margin: 0 0 1.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .principle-card {
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    text-align: center;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
    }
  }

  .principle-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .principle-card h3 {
    color: var(--color-primary-800);
    margin-bottom: 0.75rem;
  }

  .principle-card p {
    margin: 0;
    color: var(--color-surface-700);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .courses {
    padding-top: 5rem;
  }

  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .course-card {
    background: linear-gradient(
      135deg,
      var(--color-primary-50),
      var(--color-surface-50)
    );
    border: 2px solid var(--color-primary-200);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
    }

    &.coming-soon {
      background: var(--color-surface-50);
      border-color: var(--color-surface-200);
      opacity: 0.75;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }

  .course-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .course-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .course-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .course-status {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    background: var(--color-primary-100);
    color: var(--color-primary-700);
    width: fit-content;

    &.soon {
      background: var(--color-surface-200);
      color: var(--color-surface-600);
    }
  }

  .course-card h3 {
    color: var(--color-surface-800);
    margin-bottom: 0.75rem;
  }

  .course-card p {
    margin: 0;
    color: var(--color-surface-600);
    font-size: 1.125rem;
    line-height: 1.6;
    flex: 1;
  }

  .course-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-surface-200);
  }

  .lessons-info {
    font-size: 0.9rem;
    color: var(--color-surface-500);
  }

  .course-btn {
    background: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 0.6rem 1.25rem;
    border-radius: calc(var(--radius-container, 0.25rem) * 2);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    white-space: nowrap;
    transition:
      background 0.2s,
      transform 0.2s;

    &:hover {
      background: var(--color-primary-700);
      transform: translateY(-2px);
    }
  }

  .audience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .audience-card {
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    text-align: center;
  }

  .audience-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .audience-card h3 {
    color: var(--color-surface-800);
    margin-bottom: 0.75rem;
  }

  .audience-card p {
    margin: 0;
    color: var(--color-surface-600);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .cta {
    text-align: center;
    padding: 4rem 3rem;
    background: linear-gradient(
      135deg,
      var(--color-primary-100),
      var(--color-primary-50)
    );
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    margin: 2rem 0;
  }

  .cta h2 {
    margin-bottom: 1rem;
  }

  .cta p {
    font-size: 1.25rem;
    color: var(--color-surface-700);
    max-width: 50ch;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .cta-btn {
    display: inline-block;
    background: var(--color-primary-600);
    color: var(--color-primary-50);
    padding: 1rem 2.5rem;
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

  .site-footer {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-surface-500);
    font-size: 1rem;
  }

  .site-footer p {
    margin: 0;
  }

  @media (max-width: 700px) {
    main {
      padding: 0 1.25rem;
    }

    .hero {
      padding: 4rem 0 3rem;
    }

    .hero h1 {
      font-size: 3rem;
    }

    .tagline {
      font-size: 1.375rem;
    }

    .mission {
      padding: 2rem 1.5rem;
    }

    .mission p {
      font-size: 1.125rem;
    }

    .principle-card,
    .audience-card {
      padding: 1.5rem;
    }

    .courses-grid {
      grid-template-columns: 1fr;
    }

    .course-card {
      padding: 1.5rem;
    }

    .cta {
      padding: 2.5rem 1.5rem;
    }
  }
</style>
