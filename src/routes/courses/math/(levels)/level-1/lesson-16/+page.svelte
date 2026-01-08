<script lang="ts">
  import { Crisis, QuizCard, Section, Summary } from "../../components";

  // Magician's puzzle - easy
  let easyGuess = $state<number | null>(null);
  const easyResult = $derived(easyGuess !== null ? easyGuess * 2 + 3 : null);
  const easyCorrect = $derived(easyResult === 17);

  // Magician's puzzle - hard (the crisis)
  let hardGuess = $state<number | null>(null);
  const hardResult = $derived(
    hardGuess !== null ? (hardGuess * 37 - 115) / 4 : null
  );
  const hardCorrect = $derived(Math.abs((hardResult ?? 0) - 350) < 0.01);

  // Balance scale simulation
  type ScaleState = "balanced" | "unbalanced-left" | "unbalanced-right";
  let leftWeight = $state(10); // x + 2 where x=8
  let rightWeight = $state(10);
  let scaleState = $derived<ScaleState>(
    leftWeight === rightWeight
      ? "balanced"
      : leftWeight > rightWeight
        ? "unbalanced-left"
        : "unbalanced-right"
  );
  let showBoxContent = $state(false);

  function removeFromLeft(amount: number) {
    leftWeight = Math.max(0, leftWeight - amount);
  }

  function removeFromRight(amount: number) {
    rightWeight = Math.max(0, rightWeight - amount);
  }

  function resetScale() {
    leftWeight = 10;
    rightWeight = 10;
    showBoxContent = false;
  }

  // Equation solver demonstration
  let solverStep = $state(0);
  const solverSteps = [
    { equation: "4 · x + 7 = 31", explanation: "исходное уравнение" },
    {
      equation: "4 · x + 7 − 7 = 31 − 7",
      explanation: "убираем «+7» с обеих сторон",
    },
    { equation: "4 · x = 24", explanation: "результат после упрощения" },
    { equation: "4 · x ÷ 4 = 24 ÷ 4", explanation: "делим обе стороны на 4" },
    { equation: "x = 6", explanation: "🎉 герой найден!" },
  ];

  // Suitcase problem
  const suitcaseTotalWeight = 25;
  const suitcaseEmptyWeight = 3;
  const souvenirWeight = 2;
  const souvenirCount =
    (suitcaseTotalWeight - suitcaseEmptyWeight) / souvenirWeight;
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о решении уравнений методом обратного хода. Учимся находить неизвестное число, отматывая операции назад."
  />
</svelte:head>

<!-- Crisis Section -->
<Section id="crisis">
  <Crisis icon="🎩" title="Чёрный ящик фокусника">
    <p>
      Фокусник говорит: «Я задумал число. Умножил его на 2, затем прибавил 3 и
      получил 17. Какое число я задумал?»
    </p>

    <div class="guess-box">
      <label for="easy-guess">Твой ответ:</label>
      <input
        id="easy-guess"
        type="number"
        bind:value={easyGuess}
        placeholder="?"
        aria-label="Введи число"
      />
      {#if easyGuess !== null}
        <span class="result" class:correct={easyCorrect}>
          {easyGuess} × 2 + 5 = {easyResult}
          {easyCorrect ? "✓" : "✗"}
        </span>
      {/if}
    </div>

    <p class="note">
      {#if easyCorrect}
        Отлично! Это было несложно — можно перебрать в уме.
      {:else}
        Попробуй подобрать число. Подсказка: оно маленькое.
      {/if}
    </p>

    <div class="hard-part">
      <p>
        Фокусник усмехается: «Теперь посложнее. Я задумал число, умножил его на
        37, вычел 115, разделил на 4 и получил 350. Какое число?»
      </p>

      <div class="guess-box">
        <label for="hard-guess">Попробуй угадать:</label>
        <input
          id="hard-guess"
          type="number"
          bind:value={hardGuess}
          placeholder="?"
          aria-label="Введи число"
        />
        {#if hardGuess !== null}
          <span class="result" class:correct={hardCorrect}>
            ({hardGuess} × 37 − 115) ÷ 4 = {hardResult?.toFixed(2)}
            {hardCorrect ? "✓" : "✗"}
          </span>
        {/if}
      </div>
    </div>

    {#snippet question()}
      <p>
        <strong>Проблема:</strong> угадывание занимает слишком много времени.
        Нам нужен способ <strong>«отмотать время назад»</strong> — узнать, что было
        в начале, зная только конец истории.
      </p>
    {/snippet}
  </Crisis>
</Section>

<!-- Metaphor: Dressing and Undressing -->
<Section
  id="dressing-metaphor"
  title="Одевание и раздевание"
  description="Чтобы понять метод «обратного хода», вспомним обычное утро и вечер."
>
  <div class="grid">
    <div class="card morning">
      <div class="icon">🌅</div>
      <h3>Утро (прямой процесс)</h3>
      <div class="sequence">
        <span class="item">🦶 Нога</span>
        <span class="arrow">→</span>
        <span class="item">🧦 Носки</span>
        <span class="arrow">→</span>
        <span class="item">👟 Ботинки</span>
      </div>
    </div>

    <div class="card evening">
      <div class="icon">🌙</div>
      <h3>Вечер (обратный процесс)</h3>
      <div class="sequence reverse">
        <span class="item">👟 Ботинки</span>
        <span class="arrow">→</span>
        <span class="item">🧦 Носки</span>
        <span class="arrow">→</span>
        <span class="item">🦶 Нога</span>
      </div>
      <p class="note">
        Нельзя снять носки, не сняв ботинки! Порядок <strong
          >строго обратный</strong
        >.
      </p>
    </div>
  </div>
</Section>

<!-- Onion Model -->
<Section
  id="onion-model"
  title="Математическая «машина времени»"
  description="Уравнение — это история того, как неизвестное число (наш Герой) маскировалось. Чтобы его найти, нужно снять маскировку в обратном порядке."
>
  <div class="visual">
    <div class="layer outer">
      <span class="label">÷ 4</span>
      <div class="layer middle">
        <span class="label">− 115</span>
        <div class="layer inner">
          <span class="label">× 37</span>
          <div class="core">
            <span>x</span>
            <span class="core-label">Герой</span>
          </div>
        </div>
      </div>
    </div>
    <div class="description">
      <span class="arrow">⟵</span>
      <span class="text">снимаем слои снаружи внутрь</span>
    </div>
  </div>

  <div class="insight">
    Чтобы добраться до <strong>x</strong>, начинаем с внешнего слоя: сначала
    отменяем деление, потом вычитание, потом умножение.
  </div>
</Section>

<!-- Balance Scale -->
<Section
  id="balance-scale"
  title="Лаборатория весов"
  description="Знак = означает равновесие. Любое действие с одной чашей требует зеркального действия с другой."
>
  <div class="demo">
    <div class="scale-container">
      <div
        class="scale-assembly"
        class:tilt-left={scaleState === "unbalanced-left"}
        class:tilt-right={scaleState === "unbalanced-right"}
      >
        <div class="beam-bar"></div>
        <div class="pan-wrapper left">
          <div class="string"></div>
          <div class="pan">
            <div class="content">
              <div class="box" class:revealed={showBoxContent}>
                {showBoxContent ? "8" : "?"}
              </div>
              {#if leftWeight > 8}
                <div class="weights">+{leftWeight - 8}</div>
              {/if}
            </div>
            <div class="value-tag">{leftWeight}</div>
          </div>
        </div>
        <div class="fulcrum"></div>
        <div class="pan-wrapper right">
          <div class="string"></div>
          <div class="pan">
            <div class="content">
              <div class="coins">{rightWeight} 🪙</div>
            </div>
            <div class="value-tag">{rightWeight}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="status"
      class:balanced={scaleState === "balanced"}
      class:warning={scaleState !== "balanced"}
    >
      {#if scaleState === "balanced"}
        ✓ Весы в равновесии
      {:else}
        ⚠️ Равновесие нарушено!
      {/if}
    </div>

    <div class="controls">
      <div class="actions">
        <button
          onclick={() => removeFromLeft(2)}
          disabled={leftWeight <= 8}
          aria-label="Убрать 2 с левой чаши"
        >
          -2 слева
        </button>
        <button
          onclick={() => removeFromRight(2)}
          disabled={rightWeight <= 0}
          aria-label="Убрать 2 с правой чаши"
        >
          -2 справа
        </button>
      </div>

      <div class="system-actions">
        <button class="reset" onclick={resetScale} aria-label="Сбросить весы">
          🔄 Сброс
        </button>
        {#if leftWeight === 8 && rightWeight === 8 && scaleState === "balanced"}
          <button
            class="reveal"
            onclick={() => (showBoxContent = true)}
            aria-label="Открыть коробку"
          >
            📦 Открыть
          </button>
        {/if}
      </div>
    </div>

    <p class="hint">
      Попробуй убрать +2 с левой чаши. Что нужно сделать справа, чтобы сохранить
      равновесие?
    </p>
  </div>
</Section>

<!-- Equation Solver -->
<Section
  id="equation-solver"
  title="От коробки к символам"
  description="Вместо коробки математики используют букву x — это маска, которую носит число, пока мы его не нашли."
>
  <div class="demo">
    <div class="steps">
      {#each solverSteps as step, i}
        <div
          class="step"
          class:active={i === solverStep}
          class:done={i < solverStep}
        >
          <span class="number">{i + 1}</span>
          <span class="equation">{step.equation}</span>
          <span class="explanation">{step.explanation}</span>
        </div>
      {/each}
    </div>

    <div class="controls">
      <button
        onclick={() => (solverStep = Math.max(0, solverStep - 1))}
        disabled={solverStep === 0}
        aria-label="Предыдущий шаг">← Назад</button
      >
      <span class="indicator">Шаг {solverStep + 1} из {solverSteps.length}</span
      >
      <button
        onclick={() =>
          (solverStep = Math.min(solverSteps.length - 1, solverStep + 1))}
        disabled={solverStep === solverSteps.length - 1}
        aria-label="Следующий шаг">Далее →</button
      >
    </div>
  </div>

  <div class="insight">
    <strong>Главное правило:</strong> мы не «переносим» числа. Мы
    <strong>уничтожаем</strong> то, что мешает, делая одинаковые действия с обеих
    сторон равенства.
  </div>
</Section>

<!-- Suitcase Problem -->
<Section
  id="suitcase-problem"
  title="Мини-проект: таможенный сканер"
  description="Аэропорт. Есть чемодан, вес которого известен. Мы знаем вес пустого чемодана и вес одного сувенира. Сколько сувениров внутри?"
>
  <div class="problem">
    <div class="data">
      <div class="item">
        <span class="icon">🧳</span>
        <span class="label">Общий вес:</span>
        <span class="value">{suitcaseTotalWeight} кг</span>
      </div>
      <div class="item">
        <span class="icon">📦</span>
        <span class="label">Пустой чемодан:</span>
        <span class="value">{suitcaseEmptyWeight} кг</span>
      </div>
      <div class="item">
        <span class="icon">🎁</span>
        <span class="label">Один сувенир:</span>
        <span class="value">{souvenirWeight} кг</span>
      </div>
    </div>

    <div class="equation">
      <span class="label">Модель:</span>
      <span class="formula"
        >{souvenirWeight} · x + {suitcaseEmptyWeight} = {suitcaseTotalWeight}</span
      >
    </div>

    <details class="solution">
      <summary>Показать решение</summary>
      <div class="steps">
        <div class="step">
          1. Убираем тару: {suitcaseTotalWeight} − {suitcaseEmptyWeight} =
          {suitcaseTotalWeight - suitcaseEmptyWeight} кг
        </div>
        <div class="step">
          2. Делим на вес сувенира: {suitcaseTotalWeight - suitcaseEmptyWeight} ÷
          {souvenirWeight} = {souvenirCount}
        </div>
        <div class="answer">
          Ответ: <strong>{souvenirCount} сувениров</strong> 🎁
        </div>
      </div>
    </details>
  </div>
</Section>

<!-- Quiz -->
<Section id="quiz" title="Проверь понимание">
  <div class="cards">
    <QuizCard icon="🧥" title="Порядок действий">
      <p>
        Если надеть на число «куртку» (× 4), а потом «шапку» (+ 9), что снять
        первым, чтобы добраться до числа?
      </p>
      {#snippet answer()}
        <p>
          Сначала <strong>шапку</strong> (отменить +9), потом
          <strong>куртку</strong> (отменить ×4). Обратный порядок!
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="⚖️" title="Зеркальные действия">
      <p>
        Почему нельзя просто вычесть 8 из левой части уравнения, ничего не делая
        с правой?
      </p>
      {#snippet answer()}
        <p>
          Нарушится равновесие — правда перестанет быть правдой. Равенство
          требует <strong>зеркальных действий</strong>.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🚫" title="Необратимость">
      <p>
        Можно ли решить уравнение <span class="formula">x · 0 = 7</span>
        методом обратного хода?
      </p>
      {#snippet answer()}
        <p>
          Нет! Умножение на 0 — <strong>необратимая операция</strong>. Любое
          число, умноженное на 0, даёт 0, а не 7. У этого уравнения нет решения.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Решение уравнения — это не магия и не угадывание. Это
      <strong>расследование</strong>, где мы просто прокручиваем «киноплёнку»
      действий в обратном порядке, чтобы вернуться к началу. Главное правило:
      сохраняй равновесие. Что сделал с одной стороной — обязан сделать и с
      другой.
    </p>
  </Summary>
</Section>

<style>
  /* Common button styles */
  button {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-container);
    background-color: var(--color-surface-50);
    border: 1px solid var(--color-surface-300);
    color: var(--color-surface-900);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: var(--color-surface-200);
    border-color: var(--color-primary-500);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Crisis */
  :global(#crisis) {
    p {
      margin-bottom: 1rem;
    }

    .guess-box {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
      background: color-mix(in oklab, var(--color-surface-50) 80%, transparent);
      border-radius: var(--radius-container);
      flex-wrap: wrap;

      label {
        font-weight: 600;
        color: var(--color-surface-700);
      }

      input {
        width: 100px;
        padding: 0.75rem;
        font-size: 1.25rem;
        text-align: center;
        border: none;
        border-radius: var(--radius-container);
        background: var(--color-warning-50); /* Highlighted */

        &:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 2px var(--color-primary-200);
        }
      }

      .result {
        font-family: "Consolas", "Monaco", monospace;
        font-size: 1.125rem;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-container);
        background: var(--color-surface-200);

        &.correct {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }
      }
    }

    .note {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }

    .hard-part {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px dashed var(--color-surface-300);
    }
  }

  /* Metaphor */
  :global(#dressing-metaphor) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        padding: 2rem;
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        &.morning {
          background: linear-gradient(
            135deg,
            var(--color-warning-50),
            var(--color-surface-50)
          );
          border: 1px solid var(--color-warning-200);
        }

        &.evening {
          background: linear-gradient(
            135deg,
            var(--color-primary-50),
            var(--color-surface-50)
          );
          border: 1px solid var(--color-primary-200);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        h3 {
          margin-bottom: 1rem;
        }

        .sequence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: nowrap; /* Single line */
          font-size: 1.125rem;
          overflow-x: auto; /* Scroll if needed */
          padding-bottom: 0.5rem;

          &.reverse .arrow {
            color: var(--color-primary-700);
          }

          .item {
            padding: 0.5rem 1rem;
            border-radius: var(--radius-container);
            box-shadow: 0 2px 4px
              color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
            white-space: nowrap; /* No wrapping inside */
          }

          .arrow {
            color: var(--color-primary-900);
            font-size: 1.25rem;
            flex-shrink: 0;
          }
        }

        .note {
          font-size: 1rem;
          margin: 1rem 0 0;
          padding: 0.75rem;
          background: color-mix(
            in oklab,
            var(--color-surface-50) 80%,
            transparent
          );
          border-radius: var(--radius-container);
        }
      }
    }

    @media (max-width: 1100px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  }

  /* Onion Model */
  :global(#onion-model) {
    .visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      flex-wrap: wrap;

      .layer {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        position: relative;

        &.outer {
          width: 380px;
          height: 380px;
          background: var(--color-error-100);
          border: 3px solid var(--color-error-300);
        }

        &.middle {
          width: 280px;
          height: 280px;
          background: var(--color-warning-100);
          border: 3px solid var(--color-warning-300);
        }

        &.inner {
          width: 180px;
          height: 180px;
          background: var(--color-primary-100);
          border: 3px solid var(--color-primary-300);
        }

        .label {
          position: absolute;
          top: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1rem;
          font-weight: 600;
          font-family: "Consolas", "Monaco", monospace;
          color: var(--color-surface-700);
          text-align: center;
        }
      }

      .core {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: var(--color-surface-50);
        border-radius: 50%;
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-primary-700);

        .core-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }

      .description {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 2rem;
        color: var(--color-primary-600);

        .text {
          font-size: 1rem;
          text-align: center;
          max-width: 120px;
        }
      }
    }

    .insight {
      font-size: 1.25rem;
      padding: 1.5rem;
      background: var(--color-primary-50);
      border-radius: var(--radius-container);
    }

    @media (max-width: 1100px) {
      .visual {
        flex-direction: column;

        .layer {
          &.outer {
            width: 320px;
            height: 320px;
          }

          &.middle {
            width: 240px;
            height: 240px;
          }

          &.inner {
            width: 160px;
            height: 160px;
          }
        }

        .description {
          .arrow {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  /* Balance Scale */
  :global(#balance-scale) {
    .demo {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;

      .scale-container {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        padding: 1rem 0;
        overflow: hidden; /* Contain tilting */

        .scale-assembly {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          transition: transform 0.3s ease;

          &.tilt-left {
            .beam-bar {
              transform: rotate(-10deg);
            }
            .pan-wrapper.left {
              transform: translateY(20px);
            }
            .pan-wrapper.right {
              transform: translateY(-20px);
            }
          }

          &.tilt-right {
            .beam-bar {
              transform: rotate(10deg);
            }
            .pan-wrapper.left {
              transform: translateY(-20px);
            }
            .pan-wrapper.right {
              transform: translateY(20px);
            }
          }

          .beam-bar {
            position: absolute;
            top: 20px;
            width: 80%;
            height: 8px;
            background: var(--color-surface-800);
            border-radius: 4px;
            z-index: 2;
            transition: transform 0.3s ease;
          }

          .fulcrum {
            width: 20px;
            height: 140px;
            background: var(--color-surface-400);
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 4px 4px 0 0;
            z-index: 1;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 100px;
              height: 20px;
              background: var(--color-surface-600);
              border-radius: 10px 10px 0 0;
            }
          }

          .pan-wrapper {
            position: absolute;
            top: 24px; /* Attach to beam */
            width: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease;

            &.left {
              left: 10%;
            }

            &.right {
              right: 10%;
            }

            .string {
              width: 2px;
              height: 60px;
              background: var(--color-surface-400);
            }

            .pan {
              width: 100%;
              background: var(--color-surface-50);
              border: 2px solid var(--color-surface-300);
              border-radius: 0 0 60px 60px;
              padding: 1rem 0.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

              .content {
                min-height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
              }

              .box {
                font-weight: 700;
                padding: 0.25rem 0.5rem;
                background: var(--color-primary-100);
                border: 2px dashed var(--color-primary-400);
                border-radius: 4px;
                color: var(--color-primary-700);

                &.revealed {
                  border-style: solid;
                  background: var(--color-success-100);
                  border-color: var(--color-success-500);
                }
              }

              .weights {
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--color-warning-700);
                background: var(--color-warning-100);
                padding: 0.1rem 0.4rem;
                border-radius: 4px;
              }

              .coins {
                font-size: 1.25rem;
              }

              .value-tag {
                position: absolute;
                bottom: -1.5rem;
                font-size: 0.9rem;
                color: var(--color-surface-500);
                font-weight: 600;
              }
            }
          }
        }
      }

      .status {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        padding: 0.75rem;
        border-radius: var(--radius-container);
        margin-bottom: 1.5rem;

        &.balanced {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }

        &.warning {
          background: var(--color-error-100);
          color: var(--color-error-700);
        }
      }

      .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .actions,
        .system-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .reset {
          border-color: var(--color-surface-400) !important;
        }

        .reveal {
          background: var(--color-success-600) !important;
          color: var(--color-surface-50) !important;
          border-color: var(--color-success-600) !important;
        }
      }

      .hint {
        font-size: 1rem;
        text-align: center;
        color: var(--color-surface-600);
        margin-top: 1rem;
      }
    }
  }

  /* Equation Solver */
  :global(#equation-solver) {
    .demo {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
      margin: 2rem 0;

      .steps {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.5rem;

        .step {
          display: grid;
          grid-template-columns: 2rem 1fr auto;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);
          border: 2px solid transparent;
          opacity: 0.6;
          transition: all 0.3s;

          &.active {
            opacity: 1;
            background: var(--color-primary-50);
            border-color: var(--color-primary-400);

            .number {
              background: var(--color-primary-600);
              color: var(--color-surface-50);
            }
          }

          &.done {
            opacity: 0.8;
            background: var(--color-success-50);

            .number {
              background: var(--color-success-500);
              color: var(--color-surface-50);
            }
          }

          .number {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-surface-200);
            border-radius: 50%;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .equation {
            font-family: "Consolas", "Monaco", monospace;
            font-size: 1.375rem;
            font-weight: 600;
            color: var(--color-surface-800);
          }

          .explanation {
            font-size: 1rem;
            color: var(--color-surface-600);
            align-self: center;
          }
        }
      }

      .equation {
        font-family: "Consolas", "Monaco", monospace;
        font-size: 1.1em;
        color: var(--color-primary-600);
        font-weight: 600;
        padding: 0.1em 0.3em;
        border-radius: 0.25rem;
      }

      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;

        button:hover:not(:disabled) {
          background: var(--color-primary-100);
        }

        .indicator {
          font-size: 1rem;
          color: var(--color-surface-600);
        }
      }
    }

    .insight {
      font-size: 1.25rem;
      padding: 1.5rem;
      background: var(--color-warning-50);
      border: 2px solid var(--color-warning-300);
      border-radius: calc(var(--radius-container) * 2);
      margin-top: 2rem;
    }

    @media (max-width: 1100px) {
      .demo .steps .step {
        grid-template-columns: 2rem 1fr;

        .explanation {
          grid-column: 1 / -1;
          padding-left: 3rem;
        }
      }
    }
  }

  /* Suitcase Problem */
  :global(#suitcase-problem) {
    .problem {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2.5rem;
      box-shadow: 0 8px 32px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
      border: 1px solid var(--color-surface-200);

      .data {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2.5rem;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 1.5rem;
          background: white;
          border-radius: var(--radius-container);
          border: 1px solid var(--color-surface-200);
          transition: transform 0.2s, box-shadow 0.2s;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px
              color-mix(in oklab, var(--color-surface-900) 0.06, transparent);
            border-color: var(--color-primary-200);
          }

          .icon {
            font-size: 2.5rem;
            background: var(--color-surface-100);
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .label {
            color: var(--color-surface-600);
            font-size: 0.95rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .value {
            font-weight: 800;
            font-size: 1.75rem;
            color: var(--color-surface-900);
          }
        }
      }

      .equation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 2rem;
        background: var(--color-primary-600);
        color: white;
        border-radius: calc(var(--radius-container) * 1.5);
        margin-bottom: 2rem;
        text-align: center;
        box-shadow: 0 8px 24px
          color-mix(in oklab, var(--color-primary-600) 0.3, transparent);

        .label {
          font-weight: 600;
          color: var(--color-primary-200);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
        }

        .formula {
          font-family: "Consolas", "Monaco", monospace;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 700;
          letter-spacing: 0.05em;
        }
      }

      .solution {
        border: 2px solid var(--color-surface-200);
        border-radius: var(--radius-container);
        overflow: hidden;
        background: white;

        summary {
          cursor: pointer;
          color: var(--color-surface-700);
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1.25rem 2rem;
          background: var(--color-surface-50);
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s;

          &:hover {
            background: var(--color-surface-100);
            color: var(--color-primary-700);
          }

          &::after {
            content: "+";
            font-size: 1.5rem;
            font-weight: 300;
          }
        }

        &[open] summary {
          border-bottom: 1px solid var(--color-surface-200);
          background: var(--color-surface-50);
          
          &::after {
            content: "−";
          }
        }

        .steps {
          padding: 2rem;
          background: white;

          .step {
            font-size: 1.15rem;
            margin-bottom: 1rem;
            font-family: "Consolas", "Monaco", monospace;
            color: var(--color-surface-700);
            padding-left: 1rem;
            border-left: 3px solid var(--color-surface-200);
          }

          .answer {
            font-size: 1.5rem;
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: var(--color-success-50);
            border-radius: var(--radius-container);
            color: var(--color-success-800);
            text-align: center;
            border: 1px solid var(--color-success-200);
          }
        }
      }
    }

    @media (max-width: 900px) {
      .problem {
        padding: 1.5rem;
        
        .data {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .equation {
          padding: 1.5rem;
        }
      }
    }
  }

  /* Quiz */
  :global(#quiz) {
    .cards {
      display: grid;
      gap: 1.5rem;

      .formula {
        font-family: "Consolas", "Monaco", monospace;
        font-weight: 600;
        color: var(--color-primary-700);
      }
    }
  }
</style>
