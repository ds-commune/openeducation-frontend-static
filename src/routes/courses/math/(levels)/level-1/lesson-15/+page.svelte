<script lang="ts">
  import { Crisis, QuizCard, Section, Summary } from "../../components";

  // Building height calculator
  let floors = $state(8);
  const floorHeight = 3;
  const roofHeight = 2;
  const foundationDepth = 3;
  const totalHeight = $derived(
    floorHeight * floors + roofHeight + foundationDepth
  );

  function getPluralFloor(n: number): string {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "этажей";
    }
    if (lastDigit === 1) {
      return "этаж";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "этажа";
    }
    return "этажей";
  }

  // Formula translator demo
  let selectedFormula = $state<"add" | "multiply" | "subtract">("add");
  let variableValue = $state(7);
  const formulaResult = $derived(() => {
    if (selectedFormula === "add") return variableValue + 2;
    if (selectedFormula === "multiply") return variableValue * 2;
    if (selectedFormula === "subtract") return variableValue - 4;
    return variableValue;
  });

  // Dictionary items
  const dictionary = [
    { phrase: "«неизвестное число»", symbol: "x", desc: "любая буква" },
    { phrase: "«увеличили на...»", symbol: "+", desc: "сложение" },
    { phrase: "«уменьшили на...»", symbol: "−", desc: "вычитание" },
    { phrase: "«увеличили в... раз»", symbol: "·", desc: "умножение" },
    { phrase: "«разделили на группы»", symbol: ":", desc: "деление" },
  ];
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о переменных как именах для неизвестных величин. Учимся записывать универсальные правила."
  />
</svelte:head>

<!-- Crisis Section -->
<Section id="crisis">
  <Crisis icon="🏗️" title="Проблема ленивого архитектора">
    <p>
      Вы — главный архитектор города будущего. Мэрия присылает странное
      техническое задание: «Мы пока не знаем, сколько этажей будет в доме — это
      зависит от района. Но мы точно знаем: крыша всегда на 2 метра выше
      последнего этажа, а фундамент уходит на 3 метра вглубь».
    </p>

    <div class="calculations">
      <div class="row">
        <span class="label">5 этажей:</span>
        <span class="formula">3 · 5 + 2 + 3 = 20 м</span>
      </div>
      <div class="row">
        <span class="label">10 этажей:</span>
        <span class="formula">3 · 10 + 2 + 3 = 35 м</span>
      </div>
      <div class="row problem">
        <span class="label">??? этажей:</span>
        <span class="formula">???</span>
      </div>
    </div>

    <blockquote>
      В систему «прилетает» 10 000 заявок из разных районов. Заказчик требует <strong
        >одну</strong
      >
      универсальную инструкцию для робота-строителя, а не 10 000 отдельных вычислений.
    </blockquote>

    {#snippet question()}
      <p>
        <strong>Вопрос:</strong> как записать инструкцию, если мы не знаем главное
        число, но точно знаем правила?
      </p>
    {/snippet}
  </Crisis>
</Section>

<!-- Meaning Container -->
<Section
  id="meaning-container"
  title="Контейнер для смысла"
  description="Мы не можем записать число, потому что оно меняется. Но мы можем поставить «коробку» — контейнер, в который потом упадет нужное число. В математике мы даем имя не самому числу, а роли, которую это число играет."
>
  <div class="conveyor">
    <div class="box labeled">
      <span class="label">Высота этажа</span>
      <span class="value">3</span>
    </div>
    <div class="box labeled">
      <span class="label">Крыша</span>
      <span class="value">2</span>
    </div>
    <div class="box empty">
      <span class="label">Кол-во этажей</span>
      <span class="value">?</span>
      <span class="sticker">📦</span>
    </div>
  </div>

  <div class="insight">
    Пока мы не знаем число, мы работаем с <strong>наклейкой</strong> (ярлыком). Это
    обещание: «сюда придет значение позже».
  </div>
</Section>

<!-- Box to Symbol -->
<Section
  id="box-to-symbol"
  title="От коробки к символу"
  description="Рисовать коробки долго. Математики — люди ленивые (читай: эффективные). Вместо рисунка коробки они используют букву. Пусть «количество этажей» = n."
>
  <div class="distillation">
    <div class="card reality">
      <div class="header">
        <span class="icon">🗣️</span>
        <span class="title">Человеческий язык</span>
      </div>
      <div class="content">
        «Чтобы узнать высоту, нужно взять <strong>3 метра</strong> на каждый из
        этажей, а затем добавить <strong>5 метров</strong> (крыша + фундамент)»
      </div>
    </div>

    <div class="connector">
      <div class="arrow-group">
        <div class="line"></div>
        <div class="tip">▼</div>
      </div>
      <div class="badge">Сжатие смысла</div>
    </div>

    <div class="card math">
      <div class="header">
        <span class="icon">💎</span>
        <span class="title">Математика</span>
      </div>
      <div class="content">
        <span class="token">3</span><span class="token var">n</span>
        <span class="token op">+</span>
        <span class="token">5</span>
      </div>
    </div>
  </div>

  <p>
    Почему мы часто опускаем знак умножения (<span class="math-formula">3n</span
    >
    вместо
    <span class="math-formula">3 · n</span>)? Для скорости и компактности.
    Слитное написание символизирует единый объект — как «три этажа» звучит
    слитно.
  </p>
</Section>

<!-- Building Calculator -->
<Section
  id="building-calculator"
  title="Проверь формулу"
  description="Измените количество этажей и убедитесь, что одна формула работает для всех случаев."
>
  <div class="demo">
    <div class="input-group">
      <label for="floors-input"
        >Количество этажей (<span class="math-var">n</span>):</label
      >
      <div class="range-wrapper">
        <input
          id="floors-input"
          type="range"
          bind:value={floors}
          min="1"
          max="20"
          aria-label="Количество этажей"
        />
        <span class="value-badge">{floors}</span>
      </div>
    </div>

    <div class="visual">
      <div class="part roof">🏠 Крыша: +{roofHeight} м</div>
      <div class="part floors" style="--floor-count: {floors}">
        <span class="icon">🏢</span>
        <span>
          {floors}
          {getPluralFloor(floors)} × {floorHeight} м = {floors * floorHeight} м
        </span>
      </div>
      <div class="part foundation">⬇️ Фундамент: +{foundationDepth} м</div>
    </div>

    <div class="result">
      <div class="formula-display">
        <span class="label">Формула:</span>
        <span class="text"
          >3 · {floors} + 5 = <strong>{totalHeight}</strong> м</span
        >
      </div>
      <div class="universal">
        <span>Универсальная запись:</span>
        <span class="math-formula">3n + 5</span>
      </div>
    </div>
  </div>
</Section>

<!-- Translator Dictionary -->
<Section
  id="translator-dictionary"
  title="Словарь переводчика"
  description="Переменная — это символ, обозначающий любое число из заданного множества. Это «забронированное место». Вот как переводить с человеческого на математический:"
>
  <div class="grid">
    {#each dictionary as item}
      <div class="row">
        <span class="phrase">{item.phrase}</span>
        <span class="arrow">→</span>
        <span class="symbol">{item.symbol}</span>
        <span class="desc">{item.desc}</span>
      </div>
    {/each}
  </div>
</Section>

<!-- Live Formula -->
<Section
  id="live-formula"
  title="Живая формула"
  description="Выберите операцию и измените значение переменной. Одна линия описывает бесконечное количество ситуаций."
>
  <div class="demo">
    <div class="selector">
      <button
        class="btn"
        class:active={selectedFormula === "add"}
        onclick={() => (selectedFormula = "add")}
      >
        x + 2
      </button>
      <button
        class="btn"
        class:active={selectedFormula === "multiply"}
        onclick={() => (selectedFormula = "multiply")}
      >
        x × 2
      </button>
      <button
        class="btn"
        class:active={selectedFormula === "subtract"}
        onclick={() => (selectedFormula = "subtract")}
      >
        x − 4
      </button>
    </div>

    <div class="calculator">
      <div class="input-wrapper">
        <label for="var-value">x =</label>
        <input
          id="var-value"
          type="number"
          bind:value={variableValue}
          min="0"
          max="100"
          aria-label="Значение переменной"
        />
      </div>
      <div class="arrow">→</div>
      <div class="output">
        <span class="label">Результат:</span>
        <span class="value">{formulaResult()}</span>
      </div>
    </div>
  </div>
</Section>

<!-- Practice -->
<Section id="practice" title="Проверь понимание">
  <div class="cards">
    <QuizCard icon="🎮" title="Очки в игре">
      <p>
        Почему запись <span class="math-formula">x + 7</span> лучше, чем просто число
        10, если мы описываем правило начисления очков в игре?
      </p>
      {#snippet answer()}
        <p>
          Потому что <span class="math-formula">x + 7</span> — это
          <strong>универсальное правило</strong>: каждому игроку добавляется 7
          очков к его результату, независимо от того, сколько у него было
          изначально.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🤩" title="Смайлик в уравнении">
      <p>
        Можно ли использовать смайлик 🤩 вместо <span class="math-formula"
          >x</span
        > в уравнении?
      </p>
      {#snippet answer()}
        <p>
          Да! Символ не важен — важна его <strong>роль как контейнера</strong>.
          Запись 🤩 + 3 = 10 математически корректна.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="👨‍👦" title="Отец и сын">
      <p>
        Если <span class="math-formula">a</span> — возраст сына, а
        <span class="math-formula">b</span> — возраст отца, что означает
        <span class="math-formula">b = a + 25</span>?
      </p>
      {#snippet answer()}
        <p>
          Отец <strong>старше сына на 25 лет</strong>. Это утверждение верно для
          любого возраста сына — хоть 5, хоть 30 лет.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Математика начинается там, где заканчиваются конкретные числа. Используя
      <strong>переменные</strong>, мы создаем универсальные законы и
      инструменты, которые работают для всех случаев сразу. Переменная — это не
      загадка, это пустой карман, готовый принять любое значение.
    </p>
  </Summary>
</Section>

<style>
  /* Common Math Styles */
  .math-var,
  .math-formula {
    font-family: "Consolas", "Monaco", monospace;
    font-weight: 600;
  }

  .math-var {
    font-size: 1.1em;
    color: var(--color-primary-700);
    background: var(--color-primary-50);
    padding: 0.1em 0.3em;
    border-radius: var(--radius-base);
  }

  .math-formula {
    color: var(--color-primary-800);
  }

  /* Section 1: Crisis (Lazy Architect) */
  :global(#crisis) {
    p {
      margin-bottom: 1rem;
    }

    .calculations {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      .row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;

        .label {
          font-weight: 600;
          color: var(--color-surface-700);
          flex: 0 0 30%;
          width: 30%;
          text-align: left;
        }

        .formula {
          font-family: "Consolas", "Monaco", monospace;
          color: var(--color-primary-700);
          word-break: break-all;
          flex: 1;
        }

        &.problem {
          opacity: 0.6;
          font-style: italic;
        }
      }
    }

    blockquote {
      margin: 1.5rem 0;
      color: var(--color-surface-700);
    }
  }

  /* Section 2: Meaning Container */
  :global(#meaning-container) {
    .conveyor {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      flex-wrap: wrap;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 2rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 6px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
        position: relative;

        &.labeled {
          border: 2px solid var(--color-surface-200);
        }

        &.empty {
          border: 3px dashed var(--color-primary-400);
          background: var(--color-primary-50);

          .value {
            color: var(--color-primary-600);
          }
        }

        .label {
          font-size: 0.875rem;
          color: var(--color-surface-600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-surface-900);
        }

        .sticker {
          position: absolute;
          top: -0.75rem;
          right: -0.75rem;
          font-size: 1.5rem;
        }
      }
    }

    .insight {
      font-size: 1.25rem;
      padding: 1.5rem;
      background: var(--color-primary-50);
      border-radius: var(--radius-container);
      border-left: 4px solid var(--color-primary-500);
    }

    @media (max-width: 1100px) {
      .conveyor {
        flex-direction: column;
        padding: 1.5rem;
        gap: 2rem;

        .box {
          width: 100%;
        }
      }
    }
  }

  /* Section 3: Box to Symbol */
  :global(#box-to-symbol) {
    .distillation {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 2rem;
      margin: 3rem 0;
    }

    .card {
      padding: 2rem;
      border-radius: calc(var(--radius-container) * 1.5);
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
      transition: transform 0.2s;

      .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid color-mix(in oklab, currentColor 0.1, transparent);

        .icon {
          font-size: 1.5rem;
        }

        .title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }
    }

    .card.reality {
      background: white;
      border: 1px solid var(--color-surface-200);

      .header {
        color: var(--color-surface-600);
      }

      .content {
        font-family: "Georgia", serif;
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800);
        font-style: italic;
      }
    }

    .card.math {
      background: var(--color-primary-600);
      color: white;
      border: 1px solid var(--color-primary-700);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-primary-600) 0.3, transparent);
      justify-content: center;

      .header {
        color: var(--color-primary-100);
        border-bottom-color: var(--color-primary-500);
      }

      .content {
        font-family: "Consolas", "Monaco", monospace;
        font-size: 3.5rem;
        font-weight: 700;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.1em;

        .token {
          display: inline-block;
          transition: transform 0.2s;
        }

        .var {
          color: var(--color-warning-300);
        }

        .op {
          color: var(--color-primary-300);
          margin: 0 0.1em;
        }
      }
    }

    .connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-surface-400);

      .arrow-group {
        display: flex;
        align-items: center;
        /* Desktop: Horizontal arrow */
        flex-direction: row;

        .line {
          background: var(--color-surface-300);
          /* Desktop: Horizontal line */
          width: 4rem;
          height: 2px;
        }

        .tip {
          font-size: 1.25rem;
          color: var(--color-surface-300);
          /* Desktop: Point right */
          transform: rotate(-90deg);
          /* Fix alignment visually */
          margin-left: -4px; 
        }
      }

      .badge {
        background: var(--color-surface-200);
        color: var(--color-surface-600);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 0.35rem 0.75rem;
        border-radius: 1rem;
        white-space: nowrap;
      }
    }

    @media (max-width: 900px) {
      .distillation {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .connector {
        flex-direction: row; /* Wrapper row to put badge next to arrow? No, keep column for simplicity first */
        flex-direction: column;
        gap: 0.25rem;

        .arrow-group {
          /* Mobile: Vertical arrow */
          flex-direction: column;
          
          .line {
            /* Mobile: Vertical line */
            width: 2px;
            height: 3rem;
          }

          .tip {
            /* Mobile: Point down */
            transform: rotate(0deg);
            margin-left: 0;
            margin-top: -4px;
          }
        }
      }

      .card.math .content {
        font-size: 3rem;
      }
    }
  }

  /* Section 4: Building Calculator */
  :global(#building-calculator) {
    .demo {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .input-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        box-shadow: none;

        label {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-surface-700);
        }

        .range-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 200px;
          border: none;

          input[type="range"] {
            flex: 1;
            height: 8px;
            border-radius: 4px;
            background: var(--color-surface-300);
            accent-color: var(--color-primary-600);
            cursor: pointer;
            box-shadow: none;
          }

          .value-badge {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-primary-700);
            background: var(--color-surface-50);
            padding: 0.5rem 1rem;
            border-radius: var(--radius-base);
            min-width: 3rem;
            text-align: center;
          }
        }
      }

      .visual {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .part {
          padding: 1rem 1.5rem;
          border-radius: var(--radius-container);
          font-size: 1.125rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;

          &.roof {
            background: var(--color-warning-100);
            border: 2px solid var(--color-warning-300);
            color: var(--color-warning-900);
          }

          &.floors {
            background: var(--color-primary-100);
            border: 2px solid var(--color-primary-300);
            color: var(--color-primary-900);
            min-height: calc(40px + var(--floor-count, 5) * 3px);
            transition: min-height 0.3s ease;

            .icon {
              font-size: 1.5rem;
            }
          }

          &.foundation {
            background: var(--color-surface-200);
            border: 2px solid var(--color-surface-400);
            color: var(--color-surface-800);
          }
        }
      }

      .result {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        padding: 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 6px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .formula-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;

          .label {
            color: var(--color-surface-600);
          }

          .text {
            font-family: "Consolas", "Monaco", monospace;
            color: var(--color-surface-900);
          }
        }

        .universal {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          background: var(--color-primary-100);
          border-radius: var(--radius-base);
          font-size: 1.25rem;

          .math-formula {
            font-size: 1.5rem;
          }
        }
      }
    }

    @media (max-width: 1100px) {
      .demo {
        padding: 1.5rem;

        .input-group {
          flex-direction: column;
          align-items: stretch;

          .range-wrapper {
            width: 100%;
          }
        }

        .result {
          flex-direction: column;
          text-align: center;
          align-items: stretch;

          .formula-display {
            flex-direction: column;
            text-align: center;
          }

          .universal {
            flex-direction: column;
          }
        }
      }
    }
  }

  /* Section 5: Translator Dictionary */
  :global(#translator-dictionary) {
    .grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 2rem 0;
    }

    .row {
      display: grid;
      grid-template-columns: minmax(200px, 1.5fr) 40px minmax(60px, auto) 1fr;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem 2rem;
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        background: white;
        box-shadow: 0 8px 24px
          color-mix(in oklab, var(--color-primary-500) 0.08, transparent);
        border-color: var(--color-primary-200);
      }

      .phrase {
        font-size: 1.15rem;
        color: var(--color-surface-800);
        font-weight: 500;
      }

      .arrow {
        color: var(--color-surface-400);
        font-size: 1.5rem;
        justify-self: center;
      }

      .symbol {
        font-size: 2rem;
        font-family: "Consolas", "Monaco", monospace;
        font-weight: 700;
        color: var(--color-primary-600);
        justify-self: center;
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary-50);
        border-radius: 50%;
      }

      .desc {
        font-size: 1.1rem;
        color: var(--color-surface-600);
        justify-self: end;
        text-align: right;
      }
    }

    @media (max-width: 900px) {
      .row {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 1rem;
        padding: 1.5rem;

        .phrase {
          font-size: 1.25rem;
        }

        .arrow {
          display: none;
        }

        .symbol {
          font-size: 2.5rem;
          width: 5rem;
          height: 5rem;
          background: white;
          border: 2px solid var(--color-primary-100);
        }

        .desc {
          justify-self: center;
          text-align: center;
        }
      }
    }
  }

  /* Section 6: Live Formula */
  :global(#live-formula) {
    .demo {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .selector {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;

        .btn {
          padding: 0.75rem 1.5rem;
          font-size: 1.25rem;
          font-family: "Consolas", "Monaco", monospace;
          border: 2px solid var(--color-surface-300);
          border-radius: var(--radius-container);
          background: var(--color-surface-50);
          cursor: pointer;
          transition: all 0.2s;
          color: var(--color-surface-900);

          &:hover {
            border-color: var(--color-primary-400);
            background: var(--color-primary-50);
          }

          &.active {
            background: var(--color-primary-600);
            color: var(--color-surface-50);
            border-color: var(--color-primary-600);
          }
        }
      }

      .calculator {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;

        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          label {
            font-size: 1.5rem;
            font-family: "Consolas", "Monaco", monospace;
            font-weight: 600;
            color: var(--color-primary-700);
          }

          input {
            width: 100px;
            padding: 0.75rem;
            font-size: 1.5rem;
            text-align: center;
            border: none;
            border-radius: var(--radius-base);
            background: var(--color-surface-50);
            color: var(--color-surface-900);

            &:focus {
              outline: none;
              border-color: var(--color-primary-500);
              box-shadow: 0 0 0 3px
                color-mix(in oklab, var(--color-primary-500) 0.2, transparent);
            }
          }
        }

        .arrow {
          font-size: 2rem;
          color: var(--color-surface-400);
        }

        .output {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;

          .label {
            font-size: 0.95rem;
            color: var(--color-surface-600);
          }

          .value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-success-700);
            background: var(--color-success-100);
            padding: 0.5rem 1.5rem;
            border-radius: var(--radius-container);
            min-width: 160px;
            text-align: center;
          }
        }
      }
    }

    @media (max-width: 1100px) {
      .demo {
        padding: 1.5rem;

        .calculator {
          flex-direction: column;

          .arrow {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  /* Section 7: Practice */
  :global(#practice) {
    .cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }
</style>
