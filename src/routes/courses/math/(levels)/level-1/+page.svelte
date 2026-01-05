<script lang="ts">
  import { math } from "$lib/data/courses/math";

  const level = math.levelsWithNumbers[1];
</script>

<header class="hero">
  <p class="level-badge">Уровень 1</p>
  <h1>{level.name}</h1>
  <p class="tagline">
    Фундамент математического мышления: от интуитивного понимания к строгой
    логике
  </p>
</header>

<section class="intro">
  <p>
    Этот уровень — ваш первый шаг в мир математики. Мы не будем зубрить формулы
    или решать бесконечные примеры. Вместо этого мы научимся <strong
      >видеть структуру реальности</strong
    > — понимать, как устроен мир вокруг нас через призму логики и чисел.
  </p>
</section>

<section class="requirements">
  <h2>🎯 С чего вы начинаете</h2>
  <p>Никаких специальных знаний не требуется. Всё, что вам нужно:</p>
  <ul>
    <li>
      <strong>Любопытство</strong> — готовность задавать вопрос «почему?»
    </li>
    <li>
      <strong>Базовое понимание счёта</strong> — вы умеете считать предметы (1, 2,
      3...)
    </li>
    <li>
      <strong>Желание думать</strong> — не искать готовые ответы, а находить их самостоятельно
    </li>
  </ul>
</section>

<section class="outcomes">
  <h2>🚀 Чему вы научитесь</h2>

  <div class="outcomes-grid">
    <article class="outcome-card">
      <div class="outcome-icon">🧠</div>
      <h3>Логическое мышление</h3>
      <p>
        Строить цепочки рассуждений, находить противоречия, формулировать точные
        утверждения о мире.
      </p>
    </article>

    <article class="outcome-card">
      <div class="outcome-icon">📦</div>
      <h3>Теория множеств</h3>
      <p>
        Классифицировать объекты, понимать отношения «часть-целое», сравнивать
        бесконечности.
      </p>
    </article>

    <article class="outcome-card">
      <div class="outcome-icon">💡</div>
      <h3>Бинарное мышление</h3>
      <p>
        Понимать, как компьютеры «думают» через ноли и единицы, и шифровать
        информацию.
      </p>
    </article>

    <article class="outcome-card">
      <div class="outcome-icon">🔢</div>
      <h3>Понятие числа</h3>
      <p>
        Осознать, что такое число на самом деле — не просто цифра, а мощный
        инструмент мышления.
      </p>
    </article>

    <article class="outcome-card">
      <div class="outcome-icon">❓</div>
      <h3>Переменные</h3>
      <p>
        Работать с неизвестными величинами и понимать, как математика описывает
        «что угодно».
      </p>
    </article>

    <article class="outcome-card">
      <div class="outcome-icon">🎲</div>
      <h3>Интуитивная вероятность</h3>
      <p>
        Оценивать шансы событий, понимать случайность и принимать решения в
        условиях неопределённости.
      </p>
    </article>
  </div>
</section>

<section class="cta">
  <p>Готовы начать путешествие в мир математики?</p>
</section>

<style>
  .hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .level-badge {
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
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--color-primary-900, #1a3a20);
    margin: 0 0 1.5rem;
    line-height: 1.15;
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
    margin: 0 auto 4rem;
    text-align: center;
    line-height: 1.7;
  }

  .intro p {
    margin: 0;
  }

  .requirements,
  .outcomes {
    margin-bottom: 4rem;
  }

  .requirements ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
  }

  .requirements li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 3);
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }

  .requirements li::before {
    content: "✓";
    color: var(--color-primary-600);
    font-weight: 700;
    flex-shrink: 0;
  }

  .outcomes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .outcome-card {
    background: var(--color-surface-50);
    border-radius: calc(var(--radius-container, 0.25rem) * 4);
    padding: 2rem;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
    }
  }

  .outcome-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .outcome-card h3 {
    color: var(--color-primary-800);
    margin-bottom: 0.75rem;
  }

  .outcome-card p {
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
    margin: 0;
    font-weight: 500;
  }

  @media (max-width: 700px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .tagline {
      font-size: 1.25rem;
    }

    .intro {
      font-size: 1.25rem;
      text-align: left;
    }

    .outcome-card {
      padding: 1.5rem;
    }
  }
</style>
