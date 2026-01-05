<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Summary,
    TakeawayCard,
  } from "../../components";

  // Position cups simulation
  let cupValues = $state([0, 0, 0]); // hundreds, tens, units
  const cupLabels = ["Сотни", "Десятки", "Единицы"];
  const cupMultipliers = [100, 10, 1];

  const totalValue = $derived(
    cupValues[0] * 100 + cupValues[1] * 10 + cupValues[2]
  );

  function incrementCup(index: number) {
    if (cupValues[index] < 9) {
      cupValues[index]++;
    } else {
      // Overflow: reset to 0 and carry
      cupValues[index] = 0;
      if (index > 0) {
        incrementCup(index - 1);
      }
    }
  }

  function decrementCup(index: number) {
    if (cupValues[index] > 0) {
      cupValues[index]--;
    }
  }

  function resetCups() {
    cupValues = [0, 0, 0];
  }

  // Roman numeral converter
  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  function toRoman(num: number): string {
    if (num <= 0) return "—";
    let result = "";
    let remaining = num;
    for (const [value, symbol] of romanNumerals) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result;
  }

  const romanValue = $derived(toRoman(totalValue));

  // Calculator battle simulation
  let battleStep = $state(0);

  function nextBattleStep() {
    if (battleStep < 3) battleStep++;
  }

  function resetBattle() {
    battleStep = 0;
  }

  // Alien cipher game
  let alienInput = $state("");
  let alienAnswer = $state<number | null>(null);

  const alienSymbols: Record<string, number> = {
    "△": 1,
    "●": 0,
  };

  function decodeAlien() {
    const digits = alienInput.split("").map((s) => alienSymbols[s] ?? -1);
    if (digits.some((d) => d < 0)) {
      alienAnswer = null;
      return;
    }
    let result = 0;
    for (let i = 0; i < digits.length; i++) {
      result += digits[i] * Math.pow(2, digits.length - 1 - i);
    }
    alienAnswer = result;
  }

  function setAlienExample(example: string) {
    alienInput = example;
    alienAnswer = null;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о системах счисления. Почему арабские цифры удобнее римских и как работает позиционная система."
  />
</svelte:head>

<!-- Crisis Section -->
<section id="intro">
  <Crisis icon="📜" title="Бухгалтер Императора">
    <p>
      Ты — главный счетовод Древнего Рима. Император требует срочно посчитать,
      сколько зерна нужно для армии. На столе два свитка с числами, которые
      нужно сложить.
    </p>
    <div class="comparison">
      <div class="item easy">
        <span class="label">Современное</span>
        <span class="number">128 + 43 = ?</span>
        <span class="verdict">✓ Мгновенно!</span>
      </div>
      <div class="item hard">
        <span class="label">Римское</span>
        <span class="number">CXXVIII + XLIII = ?</span>
        <span class="verdict">🤯 Как?!</span>
      </div>
    </div>

    {#snippet question()}
      А теперь император требует: «Умножь LXXXVIII на XII!» Это практически
      невозможно без перевода в другую систему.
    {/snippet}
  </Crisis>
</section>

<!-- Key Question -->
<section id="key-question">
  <div class="container">
    <strong>Загадка:</strong> почему с одними значками математика лёгкая и быстрая,
    а с другими — мучительная и долгая? Неужели форма закорючки влияет на мышление?
  </div>
</section>

<!-- Evolution -->
<section id="evolution">
  <h2>Эволюция лени</h2>

  <p>
    Цифры — это не священные символы, а <strong
      >технология сжатия информации</strong
    >. Человечество веками искало способ записывать количество короче и удобнее.
  </p>

  <div class="demo">
    <div class="row unary">
      <div class="label-group">
        <span class="era">Зарубки</span>
        <span class="type">Унарная система</span>
      </div>
      <div class="example">
        {#each Array.from({ length: 34 })}
          <span>|</span>
        {/each}
      </div>
      <div class="verdict">Долго считать, легко ошибиться</div>
    </div>

    <div class="arrow">↓</div>

    <div class="row roman">
      <div class="label-group">
        <span class="era">Рим</span>
        <span class="type">Аддитивная система</span>
      </div>
      <div class="example">XXXIV</div>
      <div class="verdict">Короче, но сложно считать</div>
    </div>

    <div class="arrow">↓</div>

    <div class="row arabic">
      <div class="label-group">
        <span class="era">Арабские</span>
        <span class="type">Позиционная система</span>
      </div>
      <div class="example">34</div>
      <div class="verdict">Коротко и легко считать</div>
    </div>
  </div>

  <TakeawayCard>
    <p>
      <strong>Вывод:</strong> эффективность = минимум чернил, максимум смысла. Римские
      цифры экономят место, но не экономят мозг.
    </p>
  </TakeawayCard>
</section>

<!-- Position cups -->
<section id="cups">
  <h2>Стаканчики ценности</h2>

  <p>
    Главный секрет арабских цифр — не в их форме, а в <strong>месте</strong>,
    где они стоят. Представь три стаканчика для монет:
  </p>

  <div class="simulation">
    <div class="cups-row">
      {#each cupLabels as label, i}
        <div class="wrapper">
          <div class="label">{label}</div>
          <div class="multiplier">×{cupMultipliers[i]}</div>
          <div class="cup">
            <button
              class="btn up"
              onclick={() => incrementCup(i)}
              aria-label="Добавить в {label}"
            >
              +
            </button>
            <div class="value">{cupValues[i]}</div>
            <button
              class="btn down"
              onclick={() => decrementCup(i)}
              aria-label="Убрать из {label}"
            >
              −
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="result">
      <div class="row">
        <span class="label">Арабское:</span>
        <span class="value arabic">
          {cupValues[0]}{cupValues[1]}{cupValues[2]}
        </span>
      </div>
      <div class="row">
        <span class="label">Римское:</span>
        <span class="value roman">{romanValue}</span>
      </div>
      <div class="row">
        <span class="label">Значение:</span>
        <span class="value">{totalValue}</span>
      </div>
    </div>

    <button class="reset-btn" onclick={resetCups}> 🔄 Сбросить </button>
  </div>

  <DefinitionCard title="Позиционная система">
    <p>
      Каждая позиция (разряд) имеет свой «вес». Цифра «3» в разных местах
      означает разное: 3, 30 или 300. Это как квартиры в доме — номер 3 на
      первом этаже и на третьем — совершенно разные квартиры!
    </p>
  </DefinitionCard>

  <div class="zero-insight">
    <div class="icon">0</div>
    <div class="text">
      <h3>Великое изобретение пустоты</h3>
      <p>
        Если в стаканчике пусто, мы не оставляем его пустым — мы ставим знак
        «пустоты». Иначе число 305 превратится в 35!
      </p>
    </div>
  </div>
</section>

<!-- Calculator Battle -->
<section id="battle">
  <h2>Битва калькуляторов</h2>

  <p>
    Сравним, как происходит сложение 9 + 2 в разных системах. Посмотри,
    насколько проще работает позиционная система.
  </p>

  <div class="simulation">
    <div class="grid">
      <div class="side additive">
        <h3 class="roman">Римская система</h3>
        <div class="display">
          {#if battleStep === 0}
            <div class="calc">
              <span class="num roman">VIIII</span>
              <span class="op">+</span>
              <span class="num roman">II</span>
            </div>
          {:else if battleStep === 1}
            <div class="calc">
              <span class="num roman">VIIIIII</span>
              <span class="note">Соединяем палочки...</span>
            </div>
          {:else if battleStep === 2}
            <div class="calc">
              <span class="num roman">VI + IIIII</span>
              <span class="note">Надо заменить IIIII на V...</span>
            </div>
          {:else}
            <div class="calc">
              <span class="num roman">XI</span>
              <span class="note">И ещё раз: VV = X</span>
            </div>
          {/if}
        </div>
        <div class="verdict roman">Нужно помнить правила замены символов</div>
      </div>

      <div class="divider">VS</div>

      <div class="side positional">
        <h3 class="arabic">Позиционная система</h3>
        <div class="display">
          {#if battleStep === 0}
            <div class="calc">
              <div class="slot">
                <span class="label">Десятки</span>
                <span class="value">0</span>
              </div>
              <div class="slot active">
                <span class="label">Единицы</span>
                <span class="value">9 + 2</span>
              </div>
            </div>
          {:else if battleStep === 1}
            <div class="calc">
              <div class="slot">
                <span class="label">Десятки</span>
                <span class="value overflow">← 1</span>
              </div>
              <div class="slot active">
                <span class="label">Единицы</span>
                <span class="value">11 → переполнение!</span>
              </div>
            </div>
          {:else}
            <div class="calc done">
              <div class="slot">
                <span class="label">Десятки</span>
                <span class="value">1</span>
              </div>
              <div class="slot">
                <span class="label">Единицы</span>
                <span class="value">1</span>
              </div>
            </div>
          {/if}
        </div>
        <div class="verdict arabic">
          Автоматический «выстрел» влево при переполнении
        </div>
      </div>
    </div>

    <div class="controls">
      {#if battleStep < 3}
        <button class="step-btn" onclick={nextBattleStep}>
          Следующий шаг →
        </button>
      {:else}
        <button class="reset-btn" onclick={resetBattle}>
          🔄 Начать заново
        </button>
      {/if}
    </div>
  </div>
</section>

<!-- Formalization -->
<section id="formal">
  <h2>Формальный язык</h2>

  <p>
    Переходим от метафоры стаканчиков к математической записи. Любое трёхзначное
    число можно разложить так:
  </p>

  <div class="formula-card">
    <div class="formula">Число = (a × 100) + (b × 10) + (c × 1)</div>
    <p class="explain">
      Где a, b, c — это количество «монет» в каждом стаканчике (от 0 до 9).
    </p>
  </div>

  <div class="table-container">
    <div class="row header">
      <span>Система</span>
      <span>Запись 1988</span>
      <span>Что это значит</span>
    </div>
    <div class="row">
      <span class="name">Римская</span>
      <span class="value">MCMLXXXVIII</span>
      <span class="meaning"
        >Опись: 1000 + (1000−100) + 50 + 10 + 10 + 10 + 5 + 1 + 1 + 1</span
      >
    </div>
    <div class="row">
      <span class="name">Арабская</span>
      <span class="value">1988</span>
      <span class="meaning"
        >Координаты: 1 тысяча, 9 сотен, 8 десятков, 8 единиц</span
      >
    </div>
  </div>

  <TakeawayCard>
    <p>
      <strong>Ключевое различие:</strong> римские цифры — это перечисление (что у
      нас есть). Арабские — это инструкция по сборке числа (координаты).
    </p>
  </TakeawayCard>
</section>

<!-- Quiz -->
<section id="quiz">
  <h2>Проверь понимание</h2>

  <div class="cards">
    <QuizCard icon="🧾">
      <p>
        Если бы мы использовали римские цифры сегодня, почему чеки в магазинах
        были бы длиной в метр?
      </p>
      {#snippet answer()}
        <p>
          Число 3888 в римской записи — MMMDCCCLXXXVIII (15 символов). В
          арабской — всего 4 символа. Чем больше число, тем длиннее римская
          запись.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🕳️">
      <p>
        Почему изобретение цифры «0» было важнее, чем изобретение цифры «9»?
      </p>
      {#snippet answer()}
        <p>
          Потому что 0 держит позицию разряда. Без нуля невозможно отличить 35
          от 305 или от 350. Нуль — это «стражник пустого места».
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🖐️">
      <p>
        Представь, что мы договорились считать не десятками, а восьмёрками (как
        пальцев у мультяшек). Изменится ли смысл числа или только его запись?
      </p>
      {#snippet answer()}
        <p>
          Только запись! Количество предметов останется тем же, но «стаканчики»
          будут переполняться после 7 (в восьмеричной системе цифры 8 и 9 не
          существуют).
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<!-- Alien Cipher -->
<section id="alien">
  <h2>Инопланетный шифр</h2>

  <div class="scenario">
    <div class="icon">🛸</div>
    <p>
      Мы нашли инопланетный зонд! На нём клавиатура с двумя символами:
      <strong>△</strong> и <strong>●</strong>. Нужно разобраться в их системе
      счисления.
    </p>
  </div>

  <div class="info">
    <p>
      Подсказка от учёных: <strong>●</strong> = 0 (пустота),
      <strong>△</strong> = 1.
    </p>
    <p>
      Это двоичная система! Позиции удваиваются: 1, 2, 4, 8... (а не умножаются
      на 10).
    </p>
  </div>

  <div class="game">
    <div class="examples">
      <button class="example-btn" onclick={() => setAlienExample("△●△")}>
        △●△ = ?
      </button>
      <button class="example-btn" onclick={() => setAlienExample("△△●●")}>
        △△●● = ?
      </button>
      <button class="example-btn" onclick={() => setAlienExample("△●●●")}>
        △●●● = ?
      </button>
    </div>

    <div class="input-row">
      <label>
        Введи инопланетное число:
        <input
          type="text"
          bind:value={alienInput}
          placeholder="△●△"
          class="input"
          aria-label="Инопланетное число"
        />
      </label>
      <button class="decode-btn" onclick={decodeAlien}> Декодировать </button>
    </div>

    {#if alienAnswer !== null}
      <div class="result">
        <span class="input-show">{alienInput}</span>
        <span class="equals">=</span>
        <span class="decimal">{alienAnswer}</span>
        <span class="label">в нашей системе</span>
      </div>
    {/if}
  </div>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <blockquote>
      Мы пишем цифры именно так не потому, что так решили боги, а потому что это
      самый эффективный инструмент. Римские цифры были «архивом» (записью
      факта), а арабские цифры стали «процессором» (инструментом для
      вычислений). Главная магия — это позиция цифры, которая делает вычисления
      лёгкими.
    </blockquote>
  </Summary>
</section>

<style>
  /* System color classes */
  .unary {
    color: var(--color-error-700);
  }
  .roman {
    color: var(--color-warning-800);
  }
  .arabic {
    color: var(--color-success-700);
  }

  /* Intro / Crisis */
  #intro {
    p {
      margin-bottom: 1rem;
    }

    .comparison {
      display: flex;
      gap: 1.5rem;
      margin: 1.5rem 0;

      .item {
        flex: 1;
        padding: 1.25rem;
        border-radius: var(--radius-container);
        text-align: center;

        &.easy {
          background: var(--color-success-100);
        }

        &.hard {
          background: var(--color-error-100);
        }

        .label {
          display: block;
          font-size: 0.875rem;
          color: var(--color-surface-600);
          margin-bottom: 0.5rem;
        }

        .number {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Consolas", monospace;
          margin-bottom: 0.5rem;
        }

        .verdict {
          display: block;
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
  }

  /* Key Question */
  #key-question {
    .container {
      font-size: 1.5rem;
      text-align: center;
      padding: 1.5rem 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      margin: 2rem 0 3rem;
    }
  }

  /* Evolution */
  #evolution {
    .demo {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;

      .row {
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        margin-bottom: 0.5rem;
        box-shadow: 0 2px 4px
          color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

        .label-group {
          min-width: 160px;
          flex-shrink: 0;

          .era {
            display: block;
            font-size: 1.25rem;
            font-weight: 600;
            /* color: var(--color-primary-700); */
          }

          .type {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
          }
        }

        .example {
          flex: 1;
          font-family: "Consolas", monospace;
          font-size: 1.25rem;
          overflow-x: auto;
        }

        .verdict {
          min-width: 200px;
          text-align: right;
          font-size: 1.125rem;
          font-weight: 600;
        }
      }

      .arrow {
        text-align: center;
        font-size: 1.5rem;
        color: var(--color-surface-400);
        padding: 0.5rem 0;
      }
    }
  }

  /* Cups */
  #cups {
    .simulation {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .cups-row {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;

          .label {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--color-primary-700);
          }

          .multiplier {
            font-size: 0.875rem;
            color: var(--color-surface-500);
          }

          .cup {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: var(--color-surface-50);
            border: 2px solid var(--color-surface-300);
            border-radius: var(--radius-container);
            padding: 0.5rem;
            gap: 0.5rem;

            .btn {
              width: 48px;
              height: 36px;
              font-size: 1.5rem;
              font-weight: 600;
              border: none;
              border-radius: calc(var(--radius-container) / 2);
              cursor: pointer;
              transition: all 0.2s;
              background: var(--color-primary-100);
              color: var(--color-primary-700);

              &:hover {
                background: var(--color-primary-200);
              }
            }

            .value {
              font-size: 2.5rem;
              font-weight: 700;
              min-width: 48px;
              color: var(--color-surface-800);
            }
          }
        }
      }

      .result {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.5rem;

        .row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 1.25rem;

          .label {
            min-width: 100px;
            text-align: right;
            color: var(--color-surface-600);
          }

          .value {
            font-weight: 600;
            min-width: 150px;
            text-align: left;

            &.arabic {
              font-size: 1.5rem;
            }

            &.roman {
              font-family: "Consolas", monospace;
            }
          }
        }
      }

      .reset-btn {
        font-size: 1.125rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: var(--radius-container);
        cursor: pointer;
        transition: all 0.2s;
        background: var(--color-surface-200);
        color: var(--color-surface-700);

        &:hover {
          background: var(--color-surface-300);
        }
      }
    }

    .zero-insight {
      display: flex;
      gap: 2rem;
      align-items: center;
      background: var(--color-primary-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;

      .icon {
        font-size: 4rem;
        font-weight: 700;
        color: var(--color-primary-600);
        flex-shrink: 0;
      }

      .text {
        h3 {
          color: var(--color-primary-800);
          margin-bottom: 0.5rem;
        }

        p {
          margin: 0;
          font-size: 1.25rem;
        }
      }
    }
  }

  /* Battle */
  #battle {
    .simulation {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;

      .grid {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        .side {
          flex: 1;
          background: var(--color-surface-50);
          border-radius: var(--radius-container);
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 1px 2px
            color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

          h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          &.additive .calc {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .num {
              font-family: "Consolas", monospace;
              font-size: 1.5rem;
              font-weight: 600;
            }

            .op {
              font-size: 1.25rem;
              color: var(--color-surface-500);
            }

            .note {
              font-size: 0.95rem;
              color: var(--color-surface-600);
            }
          }

          &.positional .calc {
            display: flex;
            gap: 1rem;

            .slot {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 1rem;
              border: 2px solid var(--color-surface-300);
              border-radius: var(--radius-container);
              min-width: 100px;

              &.active {
                border-color: var(--color-success-500);
                background: var(--color-success-50);
              }

              .label {
                font-size: 0.75rem;
                color: var(--color-surface-500);
                margin-bottom: 0.5rem;
              }

              .value {
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--color-success-700);

                &.overflow {
                  color: var(--color-primary-600);
                  animation: pulse 0.5s ease-in-out infinite alternate;
                }
              }
            }

            &.done .slot {
              border-color: var(--color-success-500);
              background: var(--color-success-100);

              .value {
                font-size: 2rem;
              }
            }
          }
        }

        .display {
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .verdict {
          font-size: 0.95rem;
          padding: 0.75rem;
          border-radius: calc(var(--radius-container) / 2);
        }

        .divider {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-surface-400);
        }
      }

      .controls {
        text-align: center;

        .step-btn {
          font-size: 1.125rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;
          background: var(--color-primary-600);
          color: white;

          &:hover {
            background: var(--color-primary-700);
          }
        }

        .reset-btn {
          font-size: 1.125rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;
          background: var(--color-surface-200);
          color: var(--color-surface-700);

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }
    }
  }

  /* Formal */
  #formal {
    .formula-card {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .formula {
        font-family: "Consolas", monospace;
        font-size: 1.5rem;
        color: var(--color-primary-800);
        margin-bottom: 1rem;
      }

      .explain {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 0;
      }
    }

    .table-container {
      border-radius: calc(var(--radius-container) * 2);
      overflow: hidden;
      margin: 2rem 0;
      border: 1px solid var(--color-surface-200);

      .row {
        display: grid;
        grid-template-columns: 120px 200px 1fr;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: var(--color-surface-50);

        &.header {
          background: var(--color-surface-100);
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-surface-600);
        }

        &:not(.header):not(:last-child) {
          border-bottom: 1px solid var(--color-surface-200);
        }

        .name {
          font-weight: 600;
          color: var(--color-primary-700);
        }

        .value {
          font-family: "Consolas", monospace;
          font-size: 1.125rem;
        }

        .meaning {
          font-size: 1rem;
          color: var(--color-surface-600);
        }
      }
    }
  }

  /* Quiz */
  #quiz {
    .cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 2rem 0;
    }
  }

  /* Alien */
  #alien {
    .scenario {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      background: var(--color-tertiary-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;

      .icon {
        font-size: 3.5rem;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 1.25rem;
      }
    }

    .info {
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      padding: 1.5rem;
      margin: 1.5rem 0;

      p {
        margin: 0.5rem 0;
        font-size: 1.125rem;
      }
    }

    .game {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .examples {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        .example-btn {
          font-size: 1.25rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--color-tertiary-300);
          border-radius: var(--radius-container);
          background: var(--color-surface-50);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            border-color: var(--color-tertiary-500);
            background: var(--color-tertiary-50);
          }
        }
      }

      .input-row {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        label {
          font-size: 1.125rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input {
          font-size: 1.5rem;
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-surface-300);
          border-radius: var(--radius-container);
          text-align: center;
          width: 150px;

          &:focus {
            border-color: var(--color-tertiary-500);
            outline: none;
          }
        }

        .decode-btn {
          font-size: 1.125rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          background: var(--color-tertiary-600);
          color: white;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-tertiary-700);
          }
        }
      }

      .result {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: 1.5rem;
        padding: 1.5rem;
        background: var(--color-success-100);
        border-radius: var(--radius-container);
        flex-wrap: wrap;

        .input-show {
          font-family: "Consolas", monospace;
          font-weight: 600;
          color: var(--color-tertiary-700);
        }

        .equals {
          color: var(--color-surface-400);
        }

        .decimal {
          font-weight: 700;
          color: var(--color-success-700);
        }

        .label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-800);
        }
      }
    }
  }

  @keyframes pulse {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }

  /* Media Queries */
  @media (max-width: 1100px) {
    #intro .comparison {
      flex-direction: column;
    }

    #evolution .demo {
      .row {
        flex-direction: column;
        text-align: center;
        gap: 1rem;

        .label-group,
        .verdict {
          min-width: auto;
          text-align: center;
        }
      }
    }

    #cups .simulation .cups-row {
      flex-direction: column;
      gap: 1.5rem;
    }

    #battle .simulation {
      .grid {
        flex-direction: column;
      }

      .divider {
        transform: rotate(90deg);
        padding: 0.5rem 0;
      }
    }

    #formal .table-container {
      .row {
        grid-template-columns: 1fr;
        gap: 0.5rem;

        &.header {
          display: none;
        }
      }
    }

    #cups .zero-insight,
    #alien .scenario {
      flex-direction: column;
      text-align: center;
    }

    #alien .game .input-row {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
