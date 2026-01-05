<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Summary,
    TakeawayCard,
  } from "../../components";

  let crusherInput = $state(7);
  let crusherRule = $state("×2");
  const crusherOutput = $derived(() => {
    if (crusherRule === "×2") return crusherInput * 2;
    if (crusherRule === "+8") return crusherInput + 8;
    if (crusherRule === "-3") return crusherInput - 3;
    return crusherInput;
  });
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о переменных в математике. Учимся понимать буквы как контейнеры для значений."
  />
</svelte:head>

<!-- Крючок: Проблема бесконечной инструкции -->
<section id="infinite-instruction">
  <Crisis icon="🎫" title="Проблема бесконечной инструкции">
    <p>
      Представьте: вы — программист, настраивающий умный автомат по продаже
      билетов в метро. Правило простое: к цене любой поездки добавляется
      сервисный сбор — 4 монеты.
    </p>

    <div class="examples">
      <div class="row">
        <span class="input">10</span>
        <span class="arrow">→</span>
        <span class="output">10 + 4</span>
      </div>
      <div class="row">
        <span class="input">20</span>
        <span class="arrow">→</span>
        <span class="output">20 + 4</span>
      </div>
      <div class="row">
        <span class="input">100</span>
        <span class="arrow">→</span>
        <span class="output">100 + 4</span>
      </div>
      <div class="row endless">
        <span class="input">???</span>
        <span class="arrow">→</span>
        <span class="output">??? + 4</span>
      </div>
    </div>

    <blockquote>
      Цен может быть тысячи. Если мы напишем миллион строк кода для каждого
      возможного числа — и цена изменится — придётся всё переписывать. Как
      записать правило, которое работает для <em>любого</em> числа?
    </blockquote>
  </Crisis>
</section>

<!-- Метафора контейнера -->
<section id="container-metaphor">
  <h2>Метафора контейнера</h2>
  <p>
    Решение элегантно: мы не пишем конкретное число. Мы ставим
    <strong>коробку</strong>, в которую пассажир положит своё число позже. В
    математике это называется <strong>переменная</strong> — зарезервированное место
    под будущее значение.
  </p>

  <div class="visual">
    <div class="stage">
      <div class="box-wrapper">
        <div class="box">
          <span class="label">Цена билета</span>
          <span class="symbol">□</span>
        </div>
      </div>
      <div class="arrow">→</div>
    </div>

    <div class="stage">
      <div class="machine">
        <span class="label">+ 4 монеты</span>
        <span class="icon">⚙️</span>
      </div>
      <div class="arrow">→</div>
    </div>

    <div class="stage">
      <div class="result">
        <span class="formula">□ + 4</span>
        <span class="label">Итого</span>
      </div>
    </div>
  </div>

  <TakeawayCard>
    Коробка — это <strong>обещание</strong>. Мы не знаем, что внутри, но знаем,
    что с ней сделать. Это позволяет создать одно правило вместо миллиона.
  </TakeawayCard>
</section>

<!-- Детектив: обратная задача -->
<section id="detective-math">
  <h2>Математика как детектив</h2>
  <p>
    Теперь ситуация меняется. Мы видим результат, но не видели начала. Из
    автомата выкатилась коробка с общим весом <strong>17 монет</strong>. Мы
    знаем, что автомат <em>всегда</em> добавляет 6.
  </p>

  <div class="scenario">
    <div class="card">
      <div class="icon">🔍</div>
      <div class="content">
        <div class="title">Улика</div>
        <div class="data">Итого: 17 монет</div>
      </div>
    </div>

    <div class="arrow">→</div>

    <div class="card">
      <div class="icon">⚙️</div>
      <div class="content">
        <div class="title">Известно</div>
        <div class="data">Добавлено: 6</div>
      </div>
    </div>

    <div class="arrow">→</div>

    <div class="card solved">
      <div class="icon">💡</div>
      <div class="content">
        <div class="title">Вывод</div>
        <div class="data">Было: 17 − 6 = 11</div>
      </div>
    </div>
  </div>

  <p>
    Это расследование. Чтобы узнать содержимое, мы «отматываем время назад» —
    снимаем (вычитаем) то, что было добавлено.
  </p>
</section>

<!-- Интерактив: Универсальная дробилка -->
<section id="universal-crusher">
  <h2>Универсальная дробилка</h2>
  <p>
    Проверьте, как работает правило с разными входными значениями. Коробка
    <span class="symbol">□</span> — это место для любого числа.
  </p>

  <div class="demo">
    <div class="input-group">
      <label for="crusher-value">Вход:</label>
      <input
        id="crusher-value"
        type="number"
        bind:value={crusherInput}
        min="0"
        max="100"
        aria-label="Входное значение"
      />
    </div>

    <div class="machine">
      <div class="rules">
        <button
          class="btn"
          class:active={crusherRule === "×2"}
          onclick={() => (crusherRule = "×2")}
        >
          □ × 2
        </button>
        <button
          class="btn"
          class:active={crusherRule === "+8"}
          onclick={() => (crusherRule = "+8")}
        >
          □ + 8
        </button>
        <button
          class="btn"
          class:active={crusherRule === "-3"}
          onclick={() => (crusherRule = "-3")}
        >
          □ − 3
        </button>
      </div>
      <div class="body">⚙️</div>
    </div>

    <div class="output">
      <span class="label">Выход:</span>
      <span class="value">{crusherOutput()}</span>
    </div>
  </div>

  <p class="insight">
    Заметьте: <strong>правило первично</strong>, а число вторично. Мы описываем,
    <em>что делать</em>, не зная заранее, <em>с чем</em>.
  </p>
</section>

<section id="notation-evolution">
  <h2>От коробки к букве</h2>
  <p>
    Рисовать коробку <span class="symbol">□</span> каждый раз долго. Математики
    ленивы. Вместо рисунка они договорились ставить <strong>букву</strong> —
    чаще всего <em>x</em>.
  </p>

  <div class="evolution">
    <div class="step">
      <div class="old">[Коробка] + 3 = 10</div>
      <div class="arrow">↓</div>
      <div class="new">x + 3 = 10</div>
    </div>
  </div>

  <div class="reading-guide">
    <h3>Как читать</h3>
    <p>
      Не «икс плюс пять». А:
      <strong>«Нечто спрятанное, к которому добавили 5, в итоге дало 12»</strong
      >.
    </p>
  </div>

  <DefinitionCard title="Что такое уравнение?">
    <p>
      Уравнение — это не пример для решения. Это
      <strong>улика</strong>, записанная на языке математики. Решить уравнение —
      значит <em>вскрыть коробку</em>.
    </p>
  </DefinitionCard>
</section>

<!-- Проверка понимания -->
<section id="practice">
  <h2>Проверь понимание</h2>

  <div class="cards">
    <QuizCard icon="🏷️">
      <div class="question">
        Если заменить в уравнении букву <em>x</em> на <em>z</em> или на смайлик 😊,
        изменится ли ответ?
      </div>
      {#snippet answer()}
        <p>
          Нет. Буква — это просто <strong>имя контейнера</strong>. Содержимое не
          зависит от того, как мы назовём коробку.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="📝">
      <div class="question">
        Почему запись <em>x + 2</em> удобнее, чем просто число 9 или 12?
      </div>
      {#snippet answer()}
        <p>
          Потому что <em>x + 2</em> описывает ситуацию для
          <strong>всех чисел сразу</strong> — это инструкция, а не результат.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🐱">
      <div class="question">
        Если <em>x</em> — возраст кошки, что означает <em>x + 1</em>?
      </div>
      {#snippet answer()}
        <p>
          Возраст кошки <strong>через год</strong>. А <em>x − 2</em> — её возраст
          два года назад.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      Буква в математике — это не страшный символ. Это
      <strong>контейнер</strong>, ожидающий наполнения. Мы используем буквы,
      когда хотим создать правило, работающее для всех чисел во Вселенной, а не
      только для одного. Уравнение — это поиск того, что лежит в этом
      контейнере, путём отматывания событий назад.
    </blockquote>
  </Summary>
</section>

<style>
  /* Infinite Instruction */
  #infinite-instruction {
    .examples {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: color-mix(
        in oklab,
        var(--color-surface-50, #f8f9fa) 80%,
        transparent
      );
      border-radius: var(--radius-container, 0.5rem);

      .row {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.25rem;
        font-family: "Consolas", "Monaco", monospace;

        .input {
          background: var(--color-surface-100, #f1f3f5);
          padding: 0.5rem 1rem;
          border-radius: calc(var(--radius-container, 0.25rem) / 2);
          min-width: 60px;
          text-align: center;
        }

        .arrow {
          color: var(--color-surface-500, #adb5bd);
        }

        .output {
          color: var(--color-primary-700, #2d5a30);
          font-weight: 600;
        }

        &.endless {
          opacity: 0.6;
          font-style: italic;
        }
      }
    }
  }

  /* Container Metaphor */
  #container-metaphor {
    .visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-100, #f1f3f5);
      border-radius: calc(var(--radius-container, 0.5rem) * 2);
      border: 2px solid var(--color-surface-200, #e9ecef);
      overflow-x: auto;

      .stage {
        display: flex;
        align-items: center;
        gap: 1rem;

        .arrow {
          font-size: 2rem;
          color: var(--color-surface-400, #ced4da);
        }

        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--color-surface-50, #ffffff);
          border: 3px dashed var(--color-primary-400, #6b9b7a);
          border-radius: var(--radius-container, 0.5rem);
          box-shadow: 0 4px 6px -1px
            color-mix(in oklab, var(--color-surface-900) 0.1, transparent);

          .label {
            font-size: 0.875rem;
            color: var(--color-surface-600, #6c757d);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .symbol {
            font-size: 2.5rem;
            color: var(--color-primary-600, #3a5a40);
          }
        }

        .machine {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--color-surface-700, #495057);
          border-radius: var(--radius-container, 0.5rem);
          color: var(--color-surface-50, #ffffff);

          .label {
            font-size: 1rem;
            font-weight: 600;
          }

          .icon {
            font-size: 2rem;
            margin-top: 0.5rem;
          }
        }

        .result {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--color-success-100, #d4edda);
          border-radius: var(--radius-container, 0.5rem);
          border: 2px solid var(--color-success-300, #a3cfbb);

          .formula {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-success-700, #2d5a30);
            font-family: "Consolas", "Monaco", monospace;
          }

          .label {
            font-size: 0.875rem;
            color: var(--color-surface-600, #6c757d);
            margin-top: 0.25rem;
          }
        }
      }
    }
  }

  /* Detective Scenario */
  #detective-math {
    .scenario {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin: 2rem 0;
      flex-wrap: wrap;

      .card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem 1.75rem;
        background: var(--color-surface-50, #ffffff);
        border-radius: var(--radius-container, 0.5rem);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
        border: 2px solid var(--color-surface-200, #e9ecef);

        &.solved {
          background: var(--color-success-100, #d4edda);
          border-color: var(--color-success-300, #a3cfbb);
        }

        .icon {
          font-size: 2rem;
        }

        .content {
          .title {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-surface-500, #adb5bd);
          }

          .data {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--color-surface-800, #343a40);
          }
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: var(--color-surface-400, #ced4da);
      }
    }
  }

  /* Universal Crusher */
  #universal-crusher {
    .symbol {
      font-size: 1.2em;
      color: var(--color-primary-600, #3a5a40);
      font-weight: 600;
    }

    .demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-100, #f1f3f5);
      border-radius: calc(var(--radius-container, 0.5rem) * 2);
      flex-wrap: wrap;

      .input-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600, #6c757d);
        }

        input {
          width: 80px;
          padding: 0.75rem;
          font-size: 1.5rem;
          text-align: center;
          border: 2px solid var(--color-surface-300, #dee2e6);
          border-radius: var(--radius-container, 0.5rem);
          background: var(--color-surface-50, #ffffff);

          &:focus {
            outline: none;
            border-color: var(--color-primary-500, #4a7c59);
            box-shadow: 0 0 0 3px
              color-mix(in oklab, var(--color-primary-500) 0.2, transparent);
          }
        }
      }

      .machine {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .rules {
          display: flex;
          gap: 0.5rem;

          .btn {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            font-family: "Consolas", "Monaco", monospace;
            border: 2px solid var(--color-surface-300, #dee2e6);
            border-radius: var(--radius-container, 0.5rem);
            background: var(--color-surface-50, #ffffff);
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              border-color: var(--color-primary-400, #6b9b7a);
              background: var(--color-primary-50, #e8f5e9);
            }

            &.active {
              background: var(--color-primary-600, #3a5a40);
              color: var(--color-surface-50, #ffffff);
              border-color: var(--color-primary-600, #3a5a40);
            }
          }
        }

        .body {
          font-size: 3rem;
        }
      }

      .output {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        .label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600, #6c757d);
        }

        .value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-success-700, #2d5a30);
          background: var(--color-success-100, #d4edda);
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-container, 0.5rem);
        }
      }
    }

    .insight {
      text-align: center;
      font-style: italic;
    }
  }

  /* Notation Evolution */
  #notation-evolution {
    .symbol {
      font-size: 1.2em;
      color: var(--color-primary-600, #3a5a40);
      font-weight: 600;
    }

    .evolution {
      margin: 2rem 0;
      display: flex;
      justify-content: center;

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 2rem 3rem;
        background: var(--color-surface-50, #ffffff);
        border-radius: calc(var(--radius-container, 0.5rem) * 2);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

        .old {
          font-size: 1.25rem;
          color: var(--color-surface-500, #adb5bd);
          text-decoration: line-through;
        }

        .arrow {
          font-size: 1.5rem;
          color: var(--color-primary-500, #4a7c59);
        }

        .new {
          font-size: 1.75rem;
          font-weight: 700;
          font-family: "Consolas", "Monaco", monospace;
          color: var(--color-primary-700, #2d5a30);
        }
      }
    }

    .reading-guide {
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--color-surface-50, #f8f9fa);
      border-radius: var(--radius-container, 0.5rem);

      p {
        margin: 0;
      }
    }
  }

  /* Practice */
  #practice {
    .cards {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800, #343a40);
        margin-bottom: 1rem;
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #container-metaphor .visual {
      flex-direction: column;

      .stage .arrow {
        transform: rotate(90deg);
      }
    }

    #detective-math .scenario {
      flex-direction: column;

      .arrow {
        transform: rotate(90deg);
      }
    }

    #universal-crusher .demo {
      flex-direction: column;
    }
  }
</style>
