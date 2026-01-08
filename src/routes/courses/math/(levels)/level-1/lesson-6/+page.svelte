<script lang="ts">
  import {
    Section,
    Crisis,
    DefinitionCard,
    QuizCard,
    Summary,
    TakeawayCard,
  } from "../../components";
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о пересечении и объединении множеств. Изучаем диаграммы Эйлера-Венна и операции И/ИЛИ."
  />
</svelte:head>

<!-- Крючок: космический зоопарк -->
<Section id="space-zoo">
  <Crisis icon="🛸" title="Проблема космического зоопарка">
    <p>
      Вы — архитектор зоопарка на новой планете. У вас есть два типа силовых
      полей для вольеров:
    </p>
    <div class="types">
      <div class="type blue">
        <span class="icon">🌊</span>
        <span class="label"
          >Синее поле — для животных, живущих в воде (гидро-тип)</span
        >
      </div>
      <div class="type yellow">
        <span class="icon">🌤️</span>
        <span class="label"
          >Жёлтое поле — для животных, которые летают (аэро-тип)</span
        >
      </div>
    </div>
    <p>
      Вы успешно рассадили рыб в синий круг, а птиц — в жёлтый. Но тут привозят
      <strong>летающего ската</strong>. Он дышит жабрами (нужна вода), но при
      этом умеет летать!
    </p>

    {#snippet question()}
      <ul class="options">
        <li>
          Если посадить ската в синий круг (воду) — он не сможет летать, ему
          тесно.
        </li>
        <li>Если посадить в жёлтый круг (воздух) — он задохнётся без воды.</li>
        <li>
          Построить два отдельных дома для одного ската нельзя — скат один.
        </li>
      </ul>
      <p class="question-text">
        <strong
          >Как расположить два круглых силовых поля так, чтобы скат находился
          одновременно и в воде, и в воздухе?</strong
        >
      </p>
    {/snippet}
  </Crisis>
</Section>

<!-- Шаг 1: Сдвиг границ -->
<Section
  id="shifting-borders"
  title="Сдвиг границ"
  description="Решение приходит через движение. Мы не строим новый забор — мы сдвигаем существующие."
>
  <div class="venn">
    <div class="description">
      Представьте, что вы накладываете два круга друг на друга. В месте
      пересечения синего и жёлтого цветов образуется <strong
        >зелёная зона</strong
      >.
    </div>

    <div class="diagram">
      <!-- SVG diagram -->
      <svg
        class="venn-svg"
        viewBox="0 0 400 240"
        aria-label="Диаграмма Венна: пересечение воды и воздуха"
      >
        <!-- Blue circle (Water) -->
        <circle cx="140" cy="120" r="90" class="circle-water" />
        <!-- Yellow circle (Air) -->
        <circle cx="260" cy="120" r="90" class="circle-air" />
        <!-- Intersection highlight -->
        <clipPath id="clip-blue">
          <circle cx="140" cy="120" r="90" />
        </clipPath>
        <circle
          cx="260"
          cy="120"
          r="90"
          class="circle-intersection"
          clip-path="url(#clip-blue)"
        />
      </svg>

      <!-- Labels positioned outside the circles -->
      <div class="labels">
        <div class="label left">
          <span class="title">🌊 Вода</span>
          <span class="items">🐟 🦑 🐙</span>
        </div>
        <div class="label center">
          <span class="title">🦆 Оба</span>
        </div>
        <div class="label right">
          <span class="title">🌤️ Воздух</span>
          <span class="items">🦅 🦋 🐦</span>
        </div>
      </div>
    </div>

    <div class="result">
      <span class="icon">✓</span>
      <span class="text"
        >Уровень воды: 100%. Пространство для полёта: 100%.</span
      >
    </div>
  </div>
</Section>

<!-- Шаг 2: Анатомия диаграммы -->
<Section
  id="anatomy"
  title="Анатомия диаграммы"
  description="Теперь, когда зверь спасён, разберём, что мы построили. Это называется диаграммой Эйлера (или Венна)."
>
  <div class="grid">
    <div class="card">
      <div class="icon blue">☾</div>
      <div class="content">
        <h3>Только А (левый полумесяц)</h3>
        <p>Только плавают, но не летают.</p>
        <span class="example">🐟 Рыбы, осьминоги, медузы</span>
      </div>
    </div>

    <div class="card">
      <div class="icon yellow">☽</div>
      <div class="content">
        <h3>Только Б (правый полумесяц)</h3>
        <p>Только летают, но не плавают.</p>
        <span class="example">🦅 Орлы, бабочки, воробьи</span>
      </div>
    </div>

    <div class="card">
      <div class="icon green">◉</div>
      <div class="content">
        <h3>Пересечение (центр, «линза»)</h3>
        <p>И плавают, и летают.</p>
        <span class="example">🦆 Утки, пеликаны, летающие рыбы</span>
      </div>
    </div>

    <div class="card">
      <div class="icon gray">▢</div>
      <div class="content">
        <h3>Внешняя зона (фон)</h3>
        <p>Ни то, ни другое.</p>
        <span class="example">🪨 Камень, краб, слон</span>
      </div>
    </div>
  </div>
</Section>

<!-- Шаг 3: Логика И против ИЛИ -->
<Section id="logic-and-or" title="Логика «И» против «ИЛИ»">
  <div class="grid">
    <div class="card and">
      <div class="header">
        <span class="symbol">∩</span>
        <h3>Пересечение (И)</h3>
      </div>
      <div class="illustration">
        <span class="icon">🚪</span>
        <p>
          Охранник на входе в элитный клуб. Он пускает <strong>только</strong>
          тех, кто в галстуке <strong>И</strong> в очках.
        </p>
      </div>
      <div class="result">
        Зона пересечения — самое строгое место. Туда попасть сложнее всего.
      </div>
    </div>

    <div class="card or">
      <div class="header">
        <span class="symbol">∪</span>
        <h3>Объединение (ИЛИ)</h3>
      </div>
      <div class="illustration">
        <span class="icon">🎅</span>
        <p>
          Огромный мешок деда Мороза. Туда сваливают всё: подарки для тех, кто
          вёл себя хорошо, <strong>ИЛИ</strong> плохо (но просил прощения),
          <strong>ИЛИ</strong> для всех остальных.
        </p>
      </div>
      <div class="result">
        Объединение — это жадность, мы забираем всё, что попало хотя бы в один
        круг.
      </div>
    </div>
  </div>
</Section>

<Section
  id="formalization"
  title="Формализация"
  description="Переводим интуицию на язык математики."
>
  <div class="grid">
    <DefinitionCard title="Пересечение (Intersection)">
      <div class="definition-content">
        <div class="symbol">∩</div>
        <div>
          <p>Символ похож на арку или мост, соединяющий берега.</p>
          <div class="meaning">
            <span class="label">Смысл:</span>
            <span class="value"
              ><strong>И</strong> (AND). Должны выполняться оба условия.</span
            >
          </div>
          <div class="example">
            <span class="math">A ∩ B</span> — та самая зелёная зона со скатом.
          </div>
        </div>
      </div>
    </DefinitionCard>

    <DefinitionCard title="Объединение (Union)">
      <div class="definition-content">
        <div class="symbol">∪</div>
        <div>
          <p>Символ похож на чашу или мешок, куда всё падает.</p>
          <div class="meaning">
            <span class="label">Смысл:</span>
            <span class="value"
              ><strong>ИЛИ</strong> (OR). Достаточно хотя бы одного условия.</span
            >
          </div>
          <div class="example">
            <span class="math">A ∪ B</span> — всё, что находится внутри границ обоих
            кругов.
          </div>
        </div>
      </div>
    </DefinitionCard>
  </div>

  <TakeawayCard>
    <p>
      <strong>Мнемоника:</strong> <span class="math">∩</span> похож на букву «П»
      — Пересечение.
      <span class="math">∪</span> похож на букву «U» — Union (объединение по-английски).
    </p>
  </TakeawayCard>
</Section>

<!-- Практика -->
<Section id="practice" title="Проверь понимание">
  <div class="grid">
    <QuizCard icon="🌶️" title="Красный перец">
      <p>
        У нас есть круг «Сладкое» и круг «Красное». Куда положим красный перец?
      </p>
      {#snippet answer()}
        <p>
          <strong>Только в «Красное»</strong>, но не в пересечение! Красный
          перец острый, а не сладкий.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🍓" title="Клубника">
      <p>А куда положим клубнику?</p>
      {#snippet answer()}
        <p>
          <strong>В пересечение</strong> <span class="math">∩</span>, так как
          она и сладкая, и красная одновременно!
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🛒" title="Какой символ?">
      <p>
        Если я попрошу принести мне <strong>всё</strong>, что лежит на столе (и
        сладкое, и красное, и то и другое) — какой символ я использую:
        <span class="math">∩</span> или <span class="math">∪</span>?
      </p>
      {#snippet answer()}
        <p>
          <span class="math">∪</span> (объединение), так как мы собираем всё вместе!
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<!-- Мини-проект -->
<Section id="mini-project" title="Мини-проект: поисковик пиццы">
  <div class="project-card">
    <div class="scenario">
      <p>Друзья заказывают пиццу:</p>
      <ul>
        <li>
          🍕 <strong>Петя</strong> ест только то, где есть грибы (множество А).
        </li>
        <li>
          🥗 <strong>Маша</strong> не ест мясо — только вегетарианское (множество
          Б).
        </li>
        <li>😋 <strong>Коля</strong> ест вообще всё.</li>
      </ul>
    </div>

    <div class="tasks">
      <h3>Задание</h3>
      <p>
        Вот список ингредиентов: <em>пепперони, грибы, сыр, курица, ананас</em>.
      </p>
      <p>
        Какие ингредиенты попадут в пересечение <span class="math">A ∩ B</span>,
        чтобы пицца подошла и Пете, и Маше?
      </p>
      <QuizCard>
        <p>Попробуй сам найти пересечение, а потом нажми «Показать ответ».</p>
        {#snippet answer()}
          <p>
            <strong>Грибы, сыр и ананасы</strong> — они и вегетарианские, и удовлетворяют
            требованию Пети (грибы есть!). Пепперони и курица — мясо, Маша их не ест.
          </p>
          <p>
            <strong>Вывод:</strong> пересечение — это поиск компромисса, места, где
            интересы всех участников совпадают.
          </p>
        {/snippet}
      </QuizCard>
    </div>
  </div>
</Section>

<Section id="summary">
  <Summary title="Главная мысль">
    <p class="summary-text">
      Математика помогает нам наводить порядок в хаосе.
    </p>
    <ul class="points">
      <li>
        <span class="math">∩</span> <strong>Пересечение</strong> — поиск общего, компромисса,
        места встречи «И».
      </li>
      <li>
        <span class="math">∪</span> <strong>Объединение</strong> — сбор всего доступного,
        коллекция «ИЛИ».
      </li>
    </ul>
    <p class="final">
      Объект может быть в двух местах одновременно, если эти места пересекаются.
    </p>
  </Summary>
</Section>

<style>
  /* Common math span style */
  .math {
    font-family: "Times New Roman", serif;
    font-size: 1.1em;
    color: var(--color-primary-800, #166534);
    background: var(--color-surface-200, #e5e7eb);
    padding: 0.1em 0.4em;
    border-radius: var(--radius-container);
  }

  p {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  /* Crisis Section */
  :global(#space-zoo) {
    .types {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 1.5rem 0;
    }

    .type {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.25rem;
      border-radius: calc(var(--radius-container) * 2);
      font-size: 1.125rem;

      &.blue {
        background: var(--color-surface-200);
      }

      &.yellow {
        background: var(--color-warning-100);
      }
    }

    .icon {
      font-size: 1.5rem;
    }

    .options {
      font-size: 1.25rem;
      line-height: 1.8;
      margin: 1rem 0;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    .question-text {
      margin-bottom: 0;
      font-size: 1.375rem;
    }
  }

  /* Shifting Borders Section */
  :global(#shifting-borders) {
    .venn {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2.5rem;
      margin: 2rem 0;
    }

    .description {
      font-size: 1.25rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .venn-svg {
      width: 100%;
      max-width: 400px;
      height: auto;

      .circle-water {
        fill: color-mix(
          in srgb,
          var(--color-primary-500, #2196f3) 25%,
          transparent
        );
        stroke: var(--color-primary-500, #2196f3);
        stroke-width: 3;
      }

      .circle-air {
        fill: color-mix(
          in srgb,
          var(--color-warning-500, #fbc02d) 25%,
          transparent
        );
        stroke: var(--color-warning-500, #fbc02d);
        stroke-width: 3;
      }

      .circle-intersection {
        fill: color-mix(
          in srgb,
          var(--color-success-500, #4caf50) 35%,
          transparent
        );
      }
    }

    .labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 400px;
    }

    .label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      text-align: center;

      &.left {
        align-items: flex-start;
        text-align: left;
      }

      &.right {
        align-items: flex-end;
        text-align: right;
      }

      &.center {
        flex: 1;
      }
    }

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-surface-800);
    }

    .items {
      font-size: 1.25rem;
    }

    .result {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: var(--color-success-100);
      padding: 1rem 1.5rem;
      border-radius: calc(var(--radius-container) * 2);
      font-size: 1.125rem;

      .icon {
        font-size: 1.5rem;
        color: var(--color-success-700);
      }
    }
  }

  /* Anatomy Section */
  :global(#anatomy) {
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .card {
      display: flex;
      gap: 1.25rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      padding: 1.5rem;
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
    }

    .icon {
      font-size: 2.5rem;
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &.blue {
        background: var(--color-surface-200);
        color: var(--color-primary-700);
      }

      &.yellow {
        background: var(--color-warning-100);
        color: var(--color-warning-700);
      }

      &.green {
        background: var(--color-success-100);
        color: var(--color-success-700);
      }

      &.gray {
        background: var(--color-surface-200);
        color: var(--color-surface-600);
      }
    }

    .content {
      h3 {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
        margin-top: 0;
      }

      p {
        font-size: 1.125rem;
        margin: 0 0 0.5rem;
      }

      .example {
        font-size: 0.95rem;
        color: var(--color-surface-600);
        font-style: italic;
      }
    }
  }

  /* Logic Section */
  :global(#logic-and-or) {
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin: 2rem 0;
    }

    .card {
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      &.and {
        background: linear-gradient(
          135deg,
          var(--color-success-50),
          var(--color-success-100)
        );
      }

      &.or {
        background: linear-gradient(
          135deg,
          var(--color-warning-50),
          var(--color-warning-100)
        );
      }
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      h3 {
        margin: 0;
        font-size: 1.375rem;
      }
    }

    .symbol {
      font-size: 2.5rem;
      font-family: "Times New Roman", serif;
      color: var(--color-primary-900);
    }

    .illustration {
      margin-bottom: 1.5rem;

      .icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.125rem;
        margin: 0;
      }
    }

    .result {
      font-size: 1rem;
      font-style: italic;
      color: var(--color-surface-700);
      padding-top: 1rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  /* Formalization Section */
  :global(#formalization) {
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin: 2rem 0;
    }

    .definition-content {
      display: flex;
      gap: 1.5rem;
    }

    .symbol {
      font-size: 4rem;
      font-family: "Times New Roman", serif;
      color: var(--color-primary-700);
      flex-shrink: 0;
      line-height: 1;
    }

    .meaning {
      display: flex;
      gap: 0.5rem;
      font-size: 1.125rem;
      margin-bottom: 0.75rem;

      .label {
        color: var(--color-surface-500);
      }
    }

    .example {
      background: var(--color-surface-200);
      padding: 0.75rem 1rem;
      border-radius: calc(var(--radius-container) * 2);
      font-size: 1.125rem;
    }
  }

  /* Practice Section */
  :global(#practice) {
    .grid {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;
    }
  }

  /* Mini Project Section */
  :global(#mini-project) {
    .project-card {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2.5rem;
      margin: 2rem 0;
    }

    .scenario {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 1.5rem;
      margin-bottom: 2rem;

      p {
        margin: 0 0 1rem;
        font-size: 1.25rem;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
        font-size: 1.25rem;
        line-height: 1.8;
      }
    }

    .tasks {
      h3 {
        margin-bottom: 1rem;
        margin-top: 0;
      }

      p {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
    }
  }

  /* Summary Section */
  :global(#summary) {
    .points {
      font-size: 1.25rem;
      margin: 0 0 1.5rem;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    :global(#shifting-borders) {
      .venn {
        padding: 1.5rem;
      }
    }

    :global(#anatomy) .grid,
    :global(#logic-and-or) .grid,
    :global(#formalization) .grid {
      grid-template-columns: 1fr;
    }

    :global(#mini-project) .project-card {
      padding: 1.5rem;
    }
  }
</style>
