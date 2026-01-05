<script lang="ts">
  import { Crisis, DefinitionCard, Summary } from "../../components";

  // Mode toggle for number line visualization
  let mode = $state<"cardinal" | "ordinal">("cardinal");
  let selectedNumber = $state(4);

  // Ball race simulation
  const ballColors = ["🔴", "🟡", "🟢", "🔵", "🟣"];
  let raceFinished = $state(false);
  let finishOrder = $state<number[]>([]);
  let selectedBalls = $state<number[]>([]);
  let racePhase = $state<"select-group" | "select-ordinal" | "done">(
    "select-group"
  );

  function startRace() {
    const shuffled = [...Array(5).keys()].sort(() => Math.random() - 0.5);
    finishOrder = shuffled;
    raceFinished = true;
    selectedBalls = [];
    racePhase = "select-group";
  }

  function resetRace() {
    raceFinished = false;
    finishOrder = [];
    selectedBalls = [];
    racePhase = "select-group";
  }

  function toggleBallSelection(ballIndex: number) {
    if (racePhase === "select-group") {
      if (selectedBalls.includes(ballIndex)) {
        selectedBalls = selectedBalls.filter((i) => i !== ballIndex);
      } else if (selectedBalls.length < 3) {
        selectedBalls = [...selectedBalls, ballIndex];
      }
    } else if (racePhase === "select-ordinal") {
      selectedBalls = [ballIndex];
    }
  }

  function confirmGroupSelection() {
    if (selectedBalls.length === 3) {
      racePhase = "select-ordinal";
      selectedBalls = [];
    }
  }

  function confirmOrdinalSelection() {
    const thirdPlaceBall = finishOrder[2];
    if (selectedBalls[0] === thirdPlaceBall) {
      racePhase = "done";
    }
  }

  const thirdPlaceBall = $derived(finishOrder[2]);
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о различии количественных и порядковых числительных. Количество vs Позиция."
  />
</svelte:head>

<section id="intro">
  <Crisis icon="🤖" title="Ошибка робота-строителя">
    <p>
      Ты — оператор строительного дрона. Архитектор просит: «Доставь стальные
      балки на пять этажей». Ты вводишь команду
      <code>TARGET: 5</code>.
    </p>
    <p>
      Дрон летит... и выгружает <strong>гору</strong> балок только на пятый этаж.
      Перекрытия не выдерживают — этаж обрушивается!
    </p>

    {#snippet question()}
      <strong>Вторая попытка:</strong> «Залей бетон на пятый этаж». Ты снова вводишь
      «5». Дрон пытается залить бетон на первые пять этажей сразу, но материала не
      хватает. Снова провал!
    {/snippet}
  </Crisis>

  <div class="key-problem">
    <p>
      <strong>Проблема:</strong> мы используем один символ «5», но в одном случае
      это «куча из пяти штук», а в другом — «место под номером пять». Как научить
      машину различать «сколько» и «какой»?
    </p>
  </div>
</section>

<!-- Section 1: Heap vs Queue -->
<section id="heap-queue">
  <h2>Хаос против Очереди</h2>

  <p>
    Количество может существовать в хаосе. Порядок требует структуры. Сравни два
    способа хранения одних и тех же книг:
  </p>

  <div class="comparison">
    <div class="item heap">
      <h3>📚 Куча</h3>
      <div class="visual">
        <span style="transform: rotate(-15deg)">📕</span>
        <span style="transform: rotate(10deg) translateY(-5px)">📕</span>
        <span style="transform: rotate(-5deg) translateY(3px)">📕</span>
        <span style="transform: rotate(20deg)">📕</span>
        <span style="transform: rotate(-8deg) translateY(-8px)">📕</span>
      </div>
      <p class="desc">Нет «первой» или «последней». Книги равноправны.</p>
      <div class="question">Сколько? → <strong>5</strong></div>
    </div>

    <div class="divider">vs</div>

    <div class="item shelf">
      <h3>📖 Полка</h3>
      <div class="visual visual-shelf">
        <span class="book" data-pos="1">📕</span>
        <span class="book" data-pos="2">📕</span>
        <span class="book" data-pos="3">📕</span>
        <span class="book" data-pos="4">📕</span>
        <span class="book" data-pos="5">📕</span>
      </div>
      <p class="desc">Каждая книга имеет своё место: 1-я, 2-я, 3-я...</p>
      <div class="question">
        Которая? → <strong>3-я</strong>
      </div>
    </div>
  </div>
</section>

<!-- Section 2: Ball Race Simulation -->
<section id="race">
  <h2>Гонка шариков</h2>

  <p>
    Число становится <strong>именем</strong>, когда объекты выстраиваются в
    очередь. «Три шарика» — это группа. «Третий шарик» — это один конкретный
    шарик, статус которого зависит от других.
  </p>

  <div class="simulation">
    {#if !raceFinished}
      <div class="start">
        <div class="balls">
          {#each ballColors as ball}
            <span class="emoji">{ball}</span>
          {/each}
        </div>
        <button class="btn-primary" onclick={startRace}>
          🏁 Запустить гонку
        </button>
      </div>
    {:else}
      <div class="finish">
        <h4>Финиш! Порядок прибытия:</h4>
        <div class="line">
          {#each finishOrder as ballIndex, position}
            <button
              class="ball"
              class:selected={selectedBalls.includes(ballIndex)}
              onclick={() => toggleBallSelection(ballIndex)}
              aria-label="Шарик {ballColors[ballIndex]}, позиция {position + 1}"
            >
              <span class="emoji">{ballColors[ballIndex]}</span>
              <span class="position">{position + 1}-й</span>
            </button>
          {/each}
        </div>

        <div class="task">
          {#if racePhase === "select-group"}
            <p>Задание: <strong>Выбери три шарика</strong> (любые три)</p>
            <p class="hint">
              Выбрано: {selectedBalls.length}/3
            </p>
            {#if selectedBalls.length === 3}
              <button class="btn-success" onclick={confirmGroupSelection}>
                Подтвердить ✓
              </button>
            {/if}
          {:else if racePhase === "select-ordinal"}
            <p>
              Задание: <strong>Покажи третий шарик</strong> (который пересёк финиш
              третьим)
            </p>
            {#if selectedBalls.length === 1}
              <button class="btn-success" onclick={confirmOrdinalSelection}>
                Проверить ✓
              </button>
            {/if}
          {:else}
            <div class="insight">
              <p>
                <strong>Инсайт:</strong> «Три шарика» — любые три из пяти.
                «Третий шарик» — только {ballColors[thirdPlaceBall]}. Его статус
                зависит от первого и второго!
              </p>
            </div>
          {/if}
        </div>

        <button class="btn-reset" onclick={resetRace}> 🔄 Новая гонка </button>
      </div>
    {/if}
  </div>
</section>

<!-- Section 3: Number Line Visualization -->
<section id="number-line">
  <h2>Прыжок или Точка</h2>

  <p>
    Числовой луч — идеальная очередь. Но одно и то же число «4» может означать
    разное в зависимости от вопроса:
  </p>

  <div class="demo">
    <div class="toggle">
      <button
        class="toggle-btn"
        class:active={mode === "cardinal"}
        onclick={() => (mode = "cardinal")}
      >
        Количество (сколько?)
      </button>
      <button
        class="toggle-btn"
        class:active={mode === "ordinal"}
        onclick={() => (mode = "ordinal")}
      >
        Порядок (который?)
      </button>
    </div>

    <div class="scale">
      <div class="segments">
        {#each Array(10) as _, i}
          <div
            class="segment"
            class:filled={mode === "cardinal" && i < selectedNumber}
          ></div>
        {/each}
      </div>
      <div class="labels">
        {#each Array(11) as _, i}
          <span class:active={mode === "cardinal" && i <= selectedNumber}>
            {#if mode === "ordinal" && i === selectedNumber}
              <span class="flag">🚩</span>
            {/if}
            {i}
          </span>
        {/each}
      </div>
    </div>

    <div class="controls">
      <label>
        Число:
        <input
          type="range"
          min="1"
          max="10"
          bind:value={selectedNumber}
          aria-label="Выбрать число"
        />
        <span class="display">{selectedNumber}</span>
      </label>
    </div>

    <div class="explanation">
      {#if mode === "cardinal"}
        <p>
          <strong>Количество «{selectedNumber}»</strong> — это отрезок от 0 до
          {selectedNumber}. Это длина, объём, пройденный путь. Он
          <strong>содержит</strong> все предыдущие числа.
        </p>
      {:else}
        <p>
          <strong>«{selectedNumber}-й»</strong> — это конкретная точка (шаг)
          между {selectedNumber - 1} и {selectedNumber}. Это местоположение,
          адрес. Он <strong>следует</strong> строго после
          {selectedNumber - 1}-го.
        </p>
      {/if}
    </div>
  </div>
</section>

<!-- Section 4: Formalization -->
<section id="formal">
  <h2>Формальный язык</h2>

  <DefinitionCard title="Количественные числа (Cardinal)">
    <p>Отвечают на вопрос: <strong>Сколько?</strong></p>
    <p>Описывают размер множества (группы).</p>
    <ul>
      <li>Пример: 7 яблок (группа)</li>
      <li>Свойство: можно менять местами — количество не изменится</li>
    </ul>
  </DefinitionCard>

  <DefinitionCard title="Порядковые числа (Ordinal)">
    <p>Отвечают на вопрос: <strong>Который по счёту?</strong></p>
    <p>Описывают позицию в очереди.</p>
    <ul>
      <li>Пример: 7-е яблоко (конкретный фрукт)</li>
      <li>
        Свойство: жёсткая привязка — поменяй местами 1-го и 7-го, и смысл
        полностью меняется
      </li>
    </ul>
  </DefinitionCard>

  <p>
    В языке мы используем окончания: пятый, третья. В математике контекст
    задаётся переменной: <code>n</code> — количество, <code>i</code> или
    <code>aᵢ</code> — номер элемента.
  </p>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <blockquote>
      Число — это хамелеон. Оно может означать «сколько у нас всего» (как вес
      мешка), а может означать «где это находится» (как номер квартиры). Чтобы
      управлять реальностью, нужно всегда уточнять: мы считаем толпу или ищем
      адрес?
    </blockquote>
  </Summary>
</section>

<style>
  code {
    font-family: "Consolas", "Monaco", monospace;
    font-size: 1.125rem;
    background: var(--color-surface-200);
    color: var(--color-surface-900);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
  }

  ul {
    padding-left: 1.5rem;
    list-style: disc;
  }

  li {
    margin-bottom: 0.5rem;
  }

  /* Intro Section */
  #intro {
    .key-problem {
      font-size: 1.25rem;
      text-align: center;
      padding: 1.5rem 2rem;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      margin: 2rem 0 3rem;
      border: 1px solid var(--color-surface-200);
    }
  }

  /* Heap vs Queue Section */
  #heap-queue {
    .comparison {
      display: flex;
      align-items: stretch;
      gap: 2rem;
      margin: 2rem 0;

      .item {
        flex: 1;
        background: var(--color-surface-50);
        border: 1px solid var(--color-surface-200);
        border-radius: var(--radius-container);
        padding: 2rem;
        text-align: center;
        box-shadow: 0 4px 6px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        h3 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .visual {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          font-size: 2.5rem;
          min-height: 80px;
          align-items: center;
          flex-wrap: wrap;

          &.visual-shelf {
            gap: 0.5rem;
            border-bottom: 3px solid var(--color-surface-400);
            padding-bottom: 0.5rem;
            align-items: flex-end;
          }
        }

        .book {
          position: relative;

          &::after {
            content: attr(data-pos);
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.875rem;
            color: var(--color-surface-500);
          }
        }

        .desc {
          font-size: 1.125rem;
          color: var(--color-surface-600);
          margin: 1.5rem 0 1rem;
        }

        .question {
          font-size: 1.25rem;
          background: var(--color-primary-100);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-container);
          color: var(--color-primary-900);
        }
      }

      .divider {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-surface-400);
      }
    }
  }

  /* Race Section */
  #race {
    .simulation {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;
      box-shadow: 0 4px 6px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      .start,
      .finish {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }

      .balls {
        display: flex;
        gap: 1rem;
        font-size: 3rem;
      }

      .emoji {
        font-size: 2.5rem;
      }

      button {
        font-size: 1.125rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: var(--radius-container);
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
      }

      .btn-primary {
        background: var(--color-primary-500);
        color: white;

        &:hover {
          background: var(--color-primary-600);
        }
      }

      .btn-success {
        background: var(--color-success-500);
        color: white;

        &:hover {
          background: var(--color-success-600);
        }
      }

      .btn-reset {
        background: var(--color-surface-200);
        color: var(--color-surface-700);

        &:hover {
          background: var(--color-surface-300);
        }
      }

      .line {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .ball {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.75rem 1rem;
        border: 2px solid var(--color-surface-300);
        border-radius: var(--radius-container);
        background: white;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          border-color: var(--color-primary-400);
          transform: scale(1.05);
        }

        &.selected {
          border-color: var(--color-primary-600);
          background: var(--color-primary-50);
        }

        .position {
          font-size: 0.875rem;
          color: var(--color-surface-600);
          font-weight: normal;
        }
      }

      .task {
        p {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .hint {
          font-size: 1rem;
          color: var(--color-surface-500);
        }

        .insight {
          background: var(--color-success-50);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-container);
          border-left: 4px solid var(--color-success-500);

          p {
            font-size: 1.125rem;
            margin: 0;
            color: var(--color-success-900);
          }
        }
      }
    }
  }

  /* Number Line Section */
  #number-line {
    .demo {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      box-shadow: 0 4px 6px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      .toggle {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;

        .toggle-btn {
          font-size: 1.125rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--color-surface-300);
          border-radius: var(--radius-container);
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--color-surface-900);

          &:hover {
            border-color: var(--color-primary-400);
          }

          &.active {
            border-color: var(--color-primary-600);
            background: var(--color-primary-50);
            color: var(--color-primary-800);
            font-weight: 600;
          }
        }
      }

      .scale {
        margin: 3rem 0 2rem;
      }

      .segments {
        display: flex;
        height: 24px;
        border: 2px solid var(--color-surface-500);
        border-radius: 4px;
        overflow: hidden;
      }

      .segment {
        flex: 1;
        background-color: var(--color-surface-100);
        border-right: 2px solid var(--color-surface-500);

        &:last-child {
          border-right: none;
        }

        &.filled {
          background: var(--color-primary-300);
        }
      }

      .labels {
        display: flex;
        margin-top: 0.5rem;

        span {
          flex: 1;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600);
          position: relative;
          border-right: 2px solid transparent; /* учёт border-right сегментов */

          &:nth-last-child(2) {
            border-right: none; /* предпоследний — как последний сегмент */
          }

          &:last-child {
            flex: 0;
            border-right: none;
            text-align: right;
          }

          &.active {
            color: var(--color-primary-700);
          }

          .flag {
            position: absolute;
            bottom: calc(100% + 30px); /* над числовой прямой */
            left: 0;
            font-size: 1.5rem;
            line-height: 1;
            animation: wave 0.5s ease-in-out infinite alternate;
          }
        }
      }

      .controls {
        display: flex;
        justify-content: center;
        margin: 1.5rem 0;

        label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.25rem;
        }

        input[type="range"] {
          width: 200px;
          cursor: pointer;
        }

        .display {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary-600);
          min-width: 2rem;
        }
      }

      .explanation {
        text-align: center;
        margin-top: 1rem;

        p {
          font-size: 1.25rem;
          margin: 0;
          color: var(--color-surface-700);
        }
      }
    }
  }

  @media (max-width: 1100px) {
    #heap-queue .comparison {
      flex-direction: column;

      .divider {
        transform: rotate(90deg);
        padding: 0.5rem 0;
      }
    }

    #number-line .demo .toggle {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
