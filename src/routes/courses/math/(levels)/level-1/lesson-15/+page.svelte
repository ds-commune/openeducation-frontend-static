<script lang="ts">
  import { Crisis, QuizCard, Summary } from "../../components";

  // Building height calculator
  let floors = $state(8);
  const floorHeight = 3;
  const roofHeight = 2;
  const foundationDepth = 3;
  const totalHeight = $derived(
    floorHeight * floors + roofHeight + foundationDepth
  );

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
    { phrase: "«неизвестное число»", symbol: "x", desc: "(любая буква)" },
    { phrase: "«увеличили на...»", symbol: "+", desc: "(добавили)" },
    { phrase: "«уменьшили на...»", symbol: "−", desc: "(отняли)" },
    { phrase: "«увеличили в... раз»", symbol: "·", desc: "(умножили)" },
    { phrase: "«разделили на группы»", symbol: ":", desc: "(поделили)" },
  ];
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о переменных как именах для неизвестных величин. Учимся записывать универсальные правила."
  />
</svelte:head>

<!-- Крючок: Проблема ленивого архитектора -->
<section id="lazy-architect">
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
</section>

<!-- Решение: Контейнер для смысла -->
<section id="meaning-container">
  <h2>Контейнер для смысла</h2>
  <p>
    Мы не можем записать число, потому что оно меняется. Но мы можем поставить <strong
      >«коробку»</strong
    >
    — контейнер, в который потом упадет нужное число. В математике мы даем имя не
    самому числу, а
    <strong>роли</strong>, которую это число играет.
  </p>

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

  <p class="insight">
    Пока мы не знаем число, мы работаем с <strong>наклейкой</strong> (ярлыком). Это
    обещание: «сюда придет значение позже».
  </p>
</section>

<!-- От коробки к символу -->
<section id="box-to-symbol">
  <h2>От коробки к символу</h2>
  <p>
    Рисовать коробки долго. Математики — люди ленивые (читай: эффективные).
    Вместо рисунка коробки они используют <strong>букву</strong>. Пусть
    «количество этажей» = <span class="math-var">n</span>.
  </p>

  <div class="evolution">
    <div class="step">
      <div class="label">Реальность:</div>
      <div class="text">«Три метра на каждый этаж плюс крыша и фундамент»</div>
    </div>
    <div class="arrow">↓</div>
    <div class="step highlight">
      <div class="label">Математика:</div>
      <div class="formula">3 · n + 5</div>
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
</section>

<!-- Интерактив: Калькулятор здания -->
<section id="building-calculator">
  <h2>Проверь формулу</h2>
  <p>
    Измените количество этажей и убедитесь, что одна формула работает для всех
    случаев.
  </p>

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
        <span>{floors} этажей × {floorHeight} м = {floors * floorHeight} м</span
        >
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
</section>

<!-- Словарь переводчика -->
<section id="translator-dictionary">
  <h2>Словарь переводчика</h2>
  <p>
    <strong>Переменная</strong> — это символ, обозначающий любое число из заданного
    множества. Это «забронированное место». Вот как переводить с человеческого на
    математический:
  </p>

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
</section>

<!-- Живая формула -->
<section id="live-formula">
  <h2>Живая формула</h2>
  <p>
    Выберите операцию и измените значение переменной. Одна линия описывает
    <strong>бесконечное количество ситуаций</strong>.
  </p>

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
</section>

<!-- Практика -->
<section id="practice">
  <h2>Проверь понимание</h2>

  <div class="cards">
    <QuizCard icon="🎮">
      <div class="question">
        Почему запись <span class="math-formula">x + 7</span> лучше, чем просто число
        10, если мы описываем правило начисления очков в игре?
      </div>
      {#snippet answer()}
        <p>
          Потому что <span class="math-formula">x + 7</span> — это
          <strong>универсальное правило</strong>: каждому игроку добавляется 7
          очков к его результату, независимо от того, сколько у него было
          изначально.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🤩">
      <div class="question">
        Можно ли использовать смайлик 🤩 вместо <span class="math-formula"
          >x</span
        > в уравнении?
      </div>
      {#snippet answer()}
        <p>
          Да! Символ не важен — важна его <strong>роль как контейнера</strong>.
          Запись 🤩 + 3 = 10 математически корректна.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="👨‍👦">
      <div class="question">
        Если <span class="math-formula">a</span> — возраст сына, а
        <span class="math-formula">b</span> — возраст отца, что означает
        <span class="math-formula">b = a + 25</span>?
      </div>
      {#snippet answer()}
        <p>
          Отец <strong>старше сына на 25 лет</strong>. Это утверждение верно для
          любого возраста сына — хоть 5, хоть 30 лет.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<section id="summary-section">
  <Summary title="Резюме">
    <blockquote>
      Математика начинается там, где заканчиваются конкретные числа. Используя
      <strong>переменные</strong>, мы создаем универсальные законы и
      инструменты, которые работают для всех случаев сразу. Переменная — это не
      загадка, это пустой карман, готовый принять любое значение.
    </blockquote>
  </Summary>
</section>

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

  /* Section 1: Lazy Architect */
  #lazy-architect {
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
        gap: 1rem;
        font-size: 1.25rem;

        .label {
          font-weight: 600;
          color: var(--color-surface-700);
          min-width: 100px;
        }

        .formula {
          font-family: "Consolas", "Monaco", monospace;
          color: var(--color-primary-700);
        }

        &.problem {
          opacity: 0.6;
          font-style: italic;
        }
      }
    }
  }

  /* Section 2: Meaning Container */
  #meaning-container {
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
  }

  /* Section 3: Box to Symbol */
  #box-to-symbol {
    .evolution {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .step {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 2rem;
        width: 100%;

        &.highlight {
          background: var(--color-primary-100);
          border-radius: var(--radius-container);
        }

        .label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600);
          min-width: 120px;
        }

        .text {
          font-size: 1.25rem;
          color: var(--color-surface-700);
        }

        .formula {
          font-size: 1.75rem;
          font-family: "Consolas", "Monaco", monospace;
          font-weight: 700;
          color: var(--color-primary-800);
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: var(--color-primary-500);
      }
    }
  }

  /* Section 4: Building Calculator */
  #building-calculator {
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

          input[type="range"] {
            flex: 1;
            height: 8px;
            border-radius: 4px;
            background: var(--color-surface-300);
            accent-color: var(--color-primary-600);
            cursor: pointer;
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
  }

  /* Section 5: Translator Dictionary */
  #translator-dictionary {
    .grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--color-surface-100);
        border-radius: var(--radius-container);

        .phrase {
          font-size: 1.125rem;
          color: var(--color-surface-700);
          flex: 1;
        }

        .arrow {
          color: var(--color-primary-500);
          font-size: 1.25rem;
        }

        .symbol {
          font-size: 1.75rem;
          font-family: "Consolas", "Monaco", monospace;
          font-weight: 700;
          color: var(--color-primary-700);
          min-width: 2rem;
          text-align: center;
        }

        .desc {
          font-size: 0.95rem;
          color: var(--color-surface-500);
          min-width: 100px;
        }
      }
    }
  }

  /* Section 6: Live Formula */
  #live-formula {
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
            border: 2px solid var(--color-surface-300);
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
          }
        }
      }
    }
  }

  /* Section 7: Practice */
  #practice {
    .cards {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800);
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #meaning-container .conveyor {
      flex-direction: column;
    }

    #box-to-symbol {
      .evolution {
        padding: 1.5rem;

        .step {
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;

          .label {
            min-width: unset;
          }
        }
      }
    }

    #building-calculator {
      .demo {
        .input-group {
          flex-direction: column;
          align-items: stretch;
        }

        .result {
          flex-direction: column;
          text-align: center;
        }
      }
    }

    #translator-dictionary {
      .grid .row {
        flex-wrap: wrap;

        .phrase {
          flex-basis: 100%;
          margin-bottom: 0.5rem;
        }
      }
    }

    #live-formula {
      .calculator {
        flex-direction: column;

        .arrow {
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
