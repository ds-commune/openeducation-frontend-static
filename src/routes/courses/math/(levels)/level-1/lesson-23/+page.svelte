<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  // Coin flip simulation state
  let isFlipping = $state(false);
  let headsCount = $state(0);
  let tailsCount = $state(0);
  let lastResult = $state<"heads" | "tails" | null>(null);

  const flipCount = $derived(headsCount + tailsCount);
  const headsPercentage = $derived(
    flipCount > 0 ? Math.round((headsCount / flipCount) * 100) : 50
  );

  async function flipCoin() {
    if (isFlipping) return;
    isFlipping = true;
    const isHeads = Math.random() < 0.5;

    // Animate for single flip
    await new Promise((r) => setTimeout(r, 150));

    if (isHeads) {
      headsCount++;
      lastResult = "heads";
    } else {
      tailsCount++;
      lastResult = "tails";
    }

    await new Promise((r) => setTimeout(r, 150));

    isFlipping = false;
  }

  async function flipMultiple(count: number) {
    // Instant calculation for multiple flips
    let newHeads = 0;
    let newTails = 0;
    let finalFlip: "heads" | "tails" = "heads"; // default

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) {
        newHeads++;
        finalFlip = "heads";
      } else {
        newTails++;
        finalFlip = "tails";
      }
    }

    headsCount += newHeads;
    tailsCount += newTails;
    lastResult = finalFlip;
  }

  function resetFlips() {
    headsCount = 0;
    tailsCount = 0;
    lastResult = null;
  }

  // Probability slider (ball bag) state
  let redBalls = $state(3);
  let blueBalls = $state(7);
  const totalBalls = $derived(redBalls + blueBalls);
  const redProbability = $derived(totalBalls > 0 ? redBalls / totalBalls : 0);
  const redPercentage = $derived(Math.round(redProbability * 100));
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок об интуитивной вероятности. Учимся измерять будущее числами и принимать решения в условиях неопределённости."
  />
</svelte:head>

<!-- Крючок: Капитан команды -->
<Section id="crisis">
  <Crisis icon="⚽" title="Дилемма капитана">
    <p>
      Ты — капитан школьной футбольной команды. Завтра решающий матч на открытом
      поле. Приложение погоды показывает: <strong
        >«Вероятность дождя 30%»</strong
      >.
    </p>

    <div class="weather-display">
      <div class="icon">🌤️</div>
      <div class="text">
        <span class="label">Прогноз на завтра</span>
        <span class="chance">30% дождь</span>
      </div>
    </div>

    <p>
      Нужно решить <strong>сейчас</strong>: играть на улице (покрытие лучше, но
      можно промокнуть) или перенести матч в тесный зал (сухо, но неудобно)?
    </p>

    {#snippet question()}
      <strong>Интеллектуальный кризис:</strong> что вообще значит «30%»? Это много
      или мало? Это «скорее да» или «скорее нет»? Слова «возможно» и «может быть»
      слишком туманны для командирского решения.
    {/snippet}
  </Crisis>
</Section>

<!-- Шаг 1: Границы реальности -->
<Section
  id="limits"
  title="Границы реальности"
  description="Прежде чем разбираться с «может быть», нарисуем границы мира. Есть две крайние точки: невозможное и неизбежное."
>
  <div class="scale-demo">
    <div class="line">
      <div class="point left">
        <span class="value">0</span>
        <span class="label">невозможно</span>
        <span class="example">выпадет 7 на обычном кубике</span>
      </div>
      <div class="center">
        <span class="marker">?</span>
      </div>
      <div class="point right">
        <span class="value">1</span>
        <span class="label">неизбежно</span>
        <span class="example">после понедельника — вторник</span>
      </div>
    </div>
    <div class="bar">
      <div class="track"></div>
    </div>
  </div>

  <DefinitionCard label="Принцип">
    <p>
      Все события в мире живут на шкале от <strong>0</strong> (точно не
      случится) до <strong>1</strong> (точно случится). Это шкала
      <strong>уверенности</strong>.
    </p>
  </DefinitionCard>
</Section>

<!-- Шаг 2: Равновесие 50/50 -->
<Section
  id="equilibrium"
  title="Равновесие: 50 на 50"
  description="Самая середина шкалы — ситуация полной неопределённости. Монетка, застывшая на ребре. Орлов и решек одинаковое количество."
>
  <div class="interactive-demo">
    <h3>Генератор миров</h3>
    <p class="instruction">
      Бросайте монету и наблюдайте: при малом числе бросков результат
      непредсказуем, но чем больше бросков — тем ближе к 50/50.
    </p>

    <div class="coin-demo">
      <div class="visual">
        <div class="coin" class:flipping={isFlipping}>
          {#if lastResult === null}
            <span class="face">🪙</span>
          {:else if lastResult === "heads"}
            <span class="face heads">🦅</span>
          {:else}
            <span class="face tails">🌸</span>
          {/if}
        </div>
      </div>

      <div class="stats">
        <div class="bar">
          <div class="fill heads" style="width: {headsPercentage}%"></div>
          <div class="fill tails" style="width: {100 - headsPercentage}%"></div>
        </div>
        <div class="labels">
          <span class="label">🦅 Орёл: {headsCount} ({headsPercentage}%)</span>
          <span class="label"
            >🌸 Решка: {tailsCount} ({100 - headsPercentage}%)</span
          >
        </div>
        <div class="total">Всего бросков: {flipCount}</div>
      </div>

      <div class="controls">
        <button
          class="flip-btn"
          onclick={flipCoin}
          disabled={isFlipping}
          aria-label="Бросить монету"
        >
          🎲 Бросок
        </button>
        <button
          class="flip-btn secondary"
          onclick={() => flipMultiple(10)}
          aria-label="10 бросков"
        >
          ×10
        </button>
        <button
          class="flip-btn secondary"
          onclick={() => flipMultiple(100)}
          aria-label="100 бросков"
        >
          ×100
        </button>
        <button class="reset-btn" onclick={resetFlips} aria-label="Сбросить">
          ↺ Сбросить
        </button>
      </div>
    </div>

    {#if flipCount >= 50}
      <div class="result success">
        ✓ При большом числе бросков результат приближается к 50/50. Это <strong
          >закон больших чисел</strong
        >.
      </div>
    {/if}
  </div>
</Section>

<!-- Шаг 3: Взвешивание шансов -->
<Section
  id="weighing"
  title="Взвешивание шансов"
  description="Как понять, где находится событие на нашей шкале? Представьте непрозрачный мешок с шариками. Если там много красных и мало синих — вытащить красный очень вероятно."
>
  <div class="interactive-demo">
    <h3>Слайдер вероятности</h3>
    <p class="instruction">
      Меняйте количество шаров в мешке и наблюдайте, как сдвигается вероятность.
    </p>

    <div class="probability-demo">
      <div class="bag-visual">
        <div class="bag">
          {#each Array(Math.min(redBalls, 10)) as _, i}
            <span class="ball red" style="--delay: {i * 0.05}s">●</span>
          {/each}
          {#each Array(Math.min(blueBalls, 10)) as _, i}
            <span class="ball blue" style="--delay: {(redBalls + i) * 0.05}s"
              >●</span
            >
          {/each}
          {#if totalBalls > 20}
            <span class="overflow">+{totalBalls - 20}</span>
          {/if}
        </div>
        <div class="label">Мешок с шарами</div>
      </div>

      <div class="scale">
        <div class="track">
          <div class="fill" style="width: {redPercentage}%"></div>
          <div class="marker" style="left: {redPercentage}%">
            <span class="value">{redPercentage}%</span>
          </div>
        </div>
        <div class="labels">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div class="controls">
        <div class="control">
          <label for="red-balls">🔴 Красные:</label>
          <input
            id="red-balls"
            type="range"
            min="0"
            max="10"
            bind:value={redBalls}
            aria-label="Количество красных шаров"
          />
          <span class="count">{redBalls}</span>
        </div>
        <div class="control">
          <label for="blue-balls">🔵 Синие:</label>
          <input
            id="blue-balls"
            type="range"
            min="0"
            max="10"
            bind:value={blueBalls}
            aria-label="Количество синих шаров"
          />
          <span class="count">{blueBalls}</span>
        </div>
      </div>
    </div>
  </div>

  <DefinitionCard label="Связь">
    <p>
      Вероятность вытащить красный шар = <strong>количество красных</strong>
      ÷
      <strong>общее количество</strong>. Чем больше благоприятных вариантов, тем
      выше шанс.
    </p>
  </DefinitionCard>
</Section>

<Section
  id="language"
  title="Язык чисел"
  description="Переводим интуицию в строгий язык. Мы не говорим «ну, скорее всего». Мы используем числа."
>
  <div class="formula-cards">
    <div class="card">
      <div class="symbol">P</div>
      <div class="content">
        <div class="name">Вероятность (Probability)</div>
        <div class="text">
          Число от 0 до 1. P = 0 — невозможно, P = 0.5 — равные шансы, P = 1 —
          обязательно случится.
        </div>
      </div>
    </div>
    <div class="card">
      <div class="symbol">%</div>
      <div class="content">
        <div class="name">Проценты</div>
        <div class="text">
          Тот же язык, но умноженный на 100. Так удобнее: 0.5 = 50%, 0.3 = 30%.
        </div>
      </div>
    </div>
  </div>

  <div class="solution-card">
    <div class="label">Решение кризиса</div>
    <p>
      30% дождя означают: если мы проживём этот день <strong>10 раз</strong>
      в одинаковых условиях, дождь пойдёт только в
      <strong>3 случаях</strong>, а в <strong>7</strong> будет сухо. Риск есть, но
      шансы остаться сухим выше!
    </p>
    <div class="decision">
      <span class="icon">✓</span>
      <span class="text">Играем на улице. Шансы на нашей стороне.</span>
    </div>
  </div>
</Section>

<!-- Проверка понимания -->
<Section id="practice" title="Проверь себя">
  <div class="quiz-cards">
    <QuizCard icon="🌅">
      <div class="question">
        Куда на шкале от 0 до 1 ты поставишь событие «Завтра солнце взойдёт на
        западе»?
      </div>
      {#snippet answer()}
        <p>
          <strong>0</strong> — это невозможно. Солнце всегда всходит на востоке из-за
          направления вращения Земли.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🎲">
      <div class="question">
        Что более вероятно: выкинуть на кубике число 6 или выкинуть <strong
          >чётное</strong
        > число?
      </div>
      {#snippet answer()}
        <p>
          Чётное число (2, 4 или 6) — три варианта из шести. Только 6 — один
          вариант. Вероятность чётного = 3/6 = 50%, вероятность шестёрки = 1/6 ≈
          17%.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🪙">
      <div class="question">
        Монетка 5 раз подряд упала орлом. Какова вероятность, что на 6-й раз
        выпадет решка?
      </div>
      {#snippet answer()}
        <p>
          Всё ещё <strong>50%</strong>! Монетка «не помнит» предыдущие броски.
          Каждый бросок — независимое событие.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Будущее нельзя предсказать точно, но его можно <strong>«взвесить»</strong
      >. Вероятность — это не гадание, а способ превратить страх перед
      неизвестностью в <strong>расчёт риска</strong>. Знание шансов помогает
      принимать умные решения, даже когда ты не знаешь итога наверняка.
    </p>
  </Summary>
</Section>

<style>
  :global(#crisis) {
    .weather-display {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
      margin: 1.5rem 0;
      max-width: 320px;

      .icon {
        font-size: 3rem;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .label {
        font-size: 0.9rem;
        color: var(--color-surface-500);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .chance {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-surface-800);
      }
    }
  }

  :global(#limits) {
    .scale-demo {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .line {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
      }

      .point {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        max-width: 160px;
        text-align: center;

        &.left {
          align-items: flex-start;
          text-align: left;
        }

        &.right {
          align-items: flex-end;
          text-align: right;
        }
      }

      .value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-surface-800);
      }

      .label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-surface-700);
      }

      .example {
        font-size: 0.875rem;
        color: var(--color-surface-500);
      }

      .center {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      .marker {
        font-size: 1.5rem;
        color: var(--color-surface-400);
      }

      .bar {
        padding: 0 80px;
      }

      .track {
        height: 8px;
        background: linear-gradient(
          to right,
          var(--color-surface-900),
          var(--color-surface-400),
          var(--color-warning-400)
        );
        border-radius: var(--radius-container);
      }
    }
  }

  :global(#equilibrium) {
    .interactive-demo {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      h3 {
        margin-top: 0;
        color: var(--color-primary-700);
      }

      .instruction {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 1.5rem;
      }

      .result {
        padding: 1rem 1.5rem;
        border-radius: var(--radius-container);
        font-size: 1.125rem;
        font-weight: 600;
        margin-top: 1.5rem;

        &.success {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }
      }
    }

    .coin-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;

      .visual {
        padding: 2rem;
      }

      .coin {
        font-size: 5rem;
        transition: transform 0.3s ease;

        &.flipping {
          animation: flip 0.3s ease;
        }

        .face {
          display: block;
        }
      }

      .stats {
        width: 100%;
        max-width: 400px;

        .bar {
          display: flex;
          height: 24px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-200);
        }

        .fill {
          transition: width 0.3s ease;

          &.heads {
            background: var(--color-primary-500);
          }

          &.tails {
            background: var(--color-warning-400);
          }
        }

        .labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;

          .label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-700);
          }
        }

        .total {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-surface-500);
        }
      }

      .controls {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;

        .flip-btn,
        .reset-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .flip-btn {
          background: var(--color-primary-500);
          color: var(--color-primary-contrast-500);

          &:hover:not(:disabled) {
            background: var(--color-primary-600);
            transform: translateY(-2px);
          }

          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          &.secondary {
            background: var(--color-surface-200);
            color: var(--color-surface-700);

            &:hover {
              background: var(--color-surface-300);
            }
          }
        }

        .reset-btn {
          background: var(--color-surface-100);
          color: var(--color-surface-600);

          &:hover {
            background: var(--color-surface-200);
          }
        }
      }
    }
  }

  :global(#weighing) {
    .interactive-demo {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      h3 {
        margin-top: 0;
        color: var(--color-primary-700);
      }

      .instruction {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 1.5rem;
      }
    }

    .probability-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .bag-visual {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;

        .bag {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          padding: 1.5rem 2rem;
          background: var(--color-surface-100);
          border-radius: calc(var(--radius-container) * 4);
          min-width: 200px;
          min-height: 80px;
          border: 3px dashed var(--color-surface-300);

          .ball {
            font-size: 1.75rem;
            animation: pop-in 0.2s ease backwards;
            animation-delay: var(--delay, 0s);

            &.red {
              color: var(--color-error-500);
            }

            &.blue {
              color: var(--color-primary-500);
            }
          }

          .overflow {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-500);
            align-self: center;
          }
        }

        .label {
          font-size: 0.9rem;
          color: var(--color-surface-500);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }

      .scale {
        width: 100%;
        max-width: 400px;

        .track {
          position: relative;
          height: 16px;
          background: var(--color-surface-200);
          border-radius: 8px;
          overflow: visible;

          .fill {
            height: 100%;
            background: linear-gradient(
              to right,
              var(--color-error-400),
              var(--color-error-500)
            );
            border-radius: 8px 0 0 8px;
            transition: width 0.3s ease;
          }

          .marker {
            position: absolute;
            top: -8px;
            transform: translateX(-50%);
            transition: left 0.3s ease;

            .value {
              display: block;
              background: var(--color-surface-800);
              color: white;
              padding: 0.25rem 0.75rem;
              border-radius: var(--radius-base);
              font-size: 0.875rem;
              font-weight: 700;
              white-space: nowrap;
            }
          }
        }

        .labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-surface-500);
        }
      }

      .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 400px;

        .control {
          display: flex;
          align-items: center;
          gap: 1rem;

          label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-700);
            min-width: 120px;
          }

          input[type="range"] {
            flex: 1;
            height: 8px;
            accent-color: var(--color-primary-500);
          }

          .count {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-surface-800);
            min-width: 30px;
            text-align: center;
          }
        }
      }
    }
  }

  :global(#language) {
    .formula-cards {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 4);
        border: 2px solid var(--color-surface-200);

        .symbol {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-primary-500);
          font-family: "Georgia", serif;
          min-width: 60px;
          text-align: center;
        }

        .content {
          flex: 1;

          .name {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-surface-800);
            margin-bottom: 0.5rem;
          }

          .text {
            font-size: 1.125rem;
            color: var(--color-surface-600);
            line-height: 1.5;
          }
        }
      }
    }

    .solution-card {
      background: linear-gradient(
        135deg,
        var(--color-success-100),
        var(--color-success-50)
      );
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .label {
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-success-700);
        margin-bottom: 0.75rem;
      }

      p {
        margin-bottom: 1.5rem;
      }

      .decision {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: var(--radius-container);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

        .icon {
          font-size: 1.5rem;
          color: var(--color-success-600);
          font-weight: 700;
        }

        .text {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-surface-800);
        }
      }
    }
  }

  :global(#practice) {
    .quiz-cards {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800);
      }
    }
  }

  @keyframes flip {
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @keyframes pop-in {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    :global(#limits) .scale-demo {
      .bar {
        padding: 0 40px;
      }

      .point {
        max-width: 120px;
      }
    }

    :global(#language) .formula-cards .card {
      flex-direction: column;
      text-align: center;
    }

    :global(#weighing) .probability-demo .controls {
      .control {
        flex-wrap: wrap;

        label {
          min-width: auto;
          flex-basis: 100%;
        }
      }
    }
  }
</style>
