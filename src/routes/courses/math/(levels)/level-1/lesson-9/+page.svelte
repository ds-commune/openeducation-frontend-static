<script lang="ts">
  import { Crisis, DefinitionCard, Section, Summary } from "../../components";

  // Binary toggle switches simulation (8 bits)
  const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];
  let toggleStates = $state<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const decimalValue = $derived(
    toggleStates.reduce((acc, isOn, i) => acc + (isOn ? bitWeights[i] : 0), 0)
  );

  const binaryString = $derived(
    toggleStates.map((s) => (s ? "1" : "0")).join("")
  );

  function toggleBit(index: number) {
    toggleStates[index] = !toggleStates[index];
  }

  function resetToggles() {
    toggleStates = [false, false, false, false, false, false, false, false];
  }

  // Challenge mode
  let challengeTarget = $state<number | null>(null);
  let showChallengeSuccess = $state(false);

  function startChallenge() {
    const targets = [13, 21, 42, 50, 73, 100, 127, 200, 255];
    challengeTarget = targets[Math.floor(Math.random() * targets.length)];
    resetToggles();
    showChallengeSuccess = false;
  }

  // Check if challenge is solved
  $effect(() => {
    if (challengeTarget !== null && decimalValue === challengeTarget) {
      showChallengeSuccess = true;
    }
  });

  // Pixel art decoder - heart pattern
  const pixelData = [24, 60, 102, 126, 126, 102, 60, 24];
  let revealedRows = $state<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  let showAllPixels = $state(false);

  function toggleRowReveal(index: number) {
    revealedRows[index] = !revealedRows[index];
  }

  function revealAllPixels() {
    showAllPixels = true;
    revealedRows = [true, true, true, true, true, true, true, true];
  }

  function resetPixelArt() {
    showAllPixels = false;
    revealedRows = [false, false, false, false, false, false, false, false];
  }

  // Convert number to 8-bit binary array
  function toBinaryArray(num: number): boolean[] {
    const result: boolean[] = [];
    for (let i = 7; i >= 0; i--) {
      result.push((num & (1 << i)) !== 0);
    }
    return result;
  }

  // Hand counting exercise
  const fingerValues = [16, 8, 4, 2, 1];
  let fingerStates = $state<boolean[]>([false, false, false, false, false]);

  const handValue = $derived(
    fingerStates.reduce((acc, isUp, i) => acc + (isUp ? fingerValues[i] : 0), 0)
  );

  function toggleFinger(index: number) {
    fingerStates[index] = !fingerStates[index];
  }

  function resetFingers() {
    fingerStates = [false, false, false, false, false];
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Как представлять числа в двоичной системе. Учимся переводить из десятичной в двоичную и обратно."
  />
</svelte:head>

<Section id="crisis">
  <Crisis icon="🏠" title="Маяк и робот-спасатель">
    <p>
      Ты — инженер на маяке. На далёком острове стоит робот-спасатель, который
      понимает только два состояния: <strong>«свет горит»</strong>
      и
      <strong>«свет не горит»</strong>. Голосовой связи нет.
    </p>
    <p>
      Тебе нужно передать роботу количество ящиков с припасами — число <strong
        >13</strong
      >.
    </p>

    {#snippet question()}
      <strong>Первая идея:</strong> мигнуть 13 раз. Но если ящиков 1000? Мигать
      тысячу раз — долго, можно сбиться, и робот может «уснуть», ожидая конца
      сообщения.
      <br /><br />
      <strong>Кризис:</strong> унарная система (счёт палочками) неэффективна. Как
      передать большое число быстро, используя только вкл/выкл?
    {/snippet}
  </Crisis>
</Section>

<!-- Section 1: Place Value Reimagined -->
<Section
  id="place-value"
  title="Переосмысление «места»"
  description="В числе 13 цифра «1» стоит на месте десятков, а «3» — на месте единиц. Это потому, что у нас 10 пальцев. Но у лампочки «два пальца» — вкл и выкл."
>
  <p>
    Нам нужно изменить «ценность» позиции. Вместо того чтобы позиции росли в 10
    раз (1, 10, 100), они будут расти в <strong>2 раза</strong>.
  </p>

  <div class="metaphor">
    <div class="icon">👛</div>
    <div class="content">
      <h3>Метафора: кошельки с монетами</h3>
      <p>
        Представь стол, на котором в ряд лежат кошельки. На правом написано «1»,
        левее — «2», затем «4», «8», «16»...
      </p>
      <p>
        В каждый кошелёк можно положить <strong>только одну</strong> монету (1) или
        оставить его пустым (0). Две монеты в один кошелёк — нельзя!
      </p>
    </div>
  </div>

  <div class="wallets" aria-label="Кошельки номиналов">
    <div class="row">
      {#each [8, 4, 2, 1] as weight (weight)}
        <div class="wallet">
          <span class="value">{weight}</span>
          <span class="label">
            {#if weight === 8}
              восьмёрки
            {:else if weight === 4}
              четвёрки
            {:else if weight === 2}
              двойки
            {:else}
              единицы
            {/if}
          </span>
        </div>
      {/each}
    </div>
  </div>
</Section>

<!-- Section 2: Assembling a Number -->
<Section
  id="assembly"
  title="Сборка числа"
  description="Как набрать сумму 13, используя кошельки номиналом 8, 4, 2, 1?"
>
  <div class="steps">
    <div class="step">
      <span class="num">1</span>
      <span class="text">
        Берём самый большой кошелёк, который влезает в 13 → это <strong
          >8</strong
        >. Осталось набрать 5. Метка: «взяли» (1).
      </span>
    </div>
    <div class="step">
      <span class="num">2</span>
      <span class="text">
        Следующий кошелёк — <strong>4</strong>. Влезает в 5? Да. Берём. Осталось
        набрать 1. Метка: «взяли» (1).
      </span>
    </div>
    <div class="step">
      <span class="num">3</span>
      <span class="text">
        Следующий кошелёк — <strong>2</strong>. Влезает в 1? Нет. Пропускаем.
        Метка: «пусто» (0).
      </span>
    </div>
    <div class="step">
      <span class="num">4</span>
      <span class="text">
        Последний кошелёк — <strong>1</strong>. Влезает? Да! Берём. Метка:
        «взяли» (1).
      </span>
    </div>
  </div>

  <div class="result">
    <span class="label">Результат:</span>
    <span class="binary">1101</span>
    <span class="formula">= 8 + 4 + 0 + 1 = 13</span>
  </div>
</Section>

<!-- Interactive Simulation: Robot Control Panel -->
<Section id="simulation" title="Пульт управления роботом">
  <div class="panel">
    <p class="intro">
      Включай тумблеры, чтобы набрать нужное число. Каждый тумблер добавляет
      свой «вес» к сумме.
    </p>

    <div class="toggles" role="group" aria-label="Панель двоичных тумблеров">
      {#each bitWeights as weight, i (weight)}
        <button
          class="switch"
          class:on={toggleStates[i]}
          onclick={() => toggleBit(i)}
          aria-label="Тумблер {weight}: {toggleStates[i]
            ? 'включен'
            : 'выключен'}"
          aria-pressed={toggleStates[i]}
        >
          <span class="weight">{weight}</span>
          <span class="indicator">
            {#if toggleStates[i]}
              <span class="state-on">ВКЛ</span>
            {:else}
              <span class="state-off">ВЫКЛ</span>
            {/if}
          </span>
          <span class="bit">{toggleStates[i] ? "1" : "0"}</span>
        </button>
      {/each}
    </div>

    <div class="display">
      <div class="row">
        <span class="label">Двоичный код:</span>
        <span class="value binary">{binaryString}</span>
      </div>
      <div class="row">
        <span class="label">Десятичное число:</span>
        <span class="value decimal">{decimalValue}</span>
      </div>
    </div>

    <div class="controls">
      <button
        class="btn-reset"
        onclick={resetToggles}
        aria-label="Сбросить все тумблеры"
      >
        Сбросить
      </button>
      <button
        class="btn-challenge"
        onclick={startChallenge}
        aria-label="Начать испытание"
      >
        🎯 Испытание
      </button>
    </div>

    {#if challengeTarget !== null}
      <div class="challenge" class:success={showChallengeSuccess}>
        {#if showChallengeSuccess}
          <span class="icon">✓</span>
          <span class="text">Отлично! Ты набрал {challengeTarget}!</span>
        {:else}
          <span class="icon">🎯</span>
          <span class="text"
            >Набери число: <strong>{challengeTarget}</strong></span
          >
        {/if}
      </div>
    {/if}
  </div>
</Section>

<!-- Section 3: Universality -->
<Section
  id="universal"
  title="Почему это работает?"
  description="Любое целое число можно представить как сумму уникальных степеней двойки. Это не магия — это математическая неизбежность, как раскладывание гирек на весах."
>
  <div class="powers">
    <div class="row header">
      <span>Степень</span>
      <span>Значение</span>
    </div>
    {#each [0, 1, 2, 3, 4, 5, 6, 7] as exp (exp)}
      <div class="row">
        <span>2<sup>{exp}</sup></span>
        <span><strong>{Math.pow(2, exp)}</strong></span>
      </div>
    {/each}
  </div>
</Section>

<!-- Section 4: Formalization -->
<Section
  id="formal"
  title="Формализация"
  description="Чтобы не путать 10 (десять) и 10 (два в двоичной), используем нижний индекс:"
>
  <div class="notation">
    <div class="item">
      <span class="value">13<sub>10</sub></span>
      <span class="desc">— тринадцать (десятичная)</span>
    </div>
    <div class="item">
      <span class="value">1101<sub>2</sub></span>
      <span class="desc">— тоже тринадцать (двоичная)</span>
    </div>
  </div>

  <DefinitionCard title="Формула разложения">
    <p class="formula">
      N = d<sub>n</sub> × 2<sup>n</sup> + ... + d<sub>1</sub> × 2<sup>1</sup>
      + d<sub>0</sub> × 2<sup>0</sup>
    </p>
    <p>Где d — это цифра (0 или 1).</p>
    <p class="example">Для числа 13: 1×8 + 1×4 + 0×2 + 1×1 = 13</p>
  </DefinitionCard>
</Section>

<!-- Section 5: Practice -->
<Section id="practice" title="Практика">
  <div class="card">
    <h3>🖐️ Счёт на одной руке</h3>
    <p>
      Если каждый палец — двоичный разряд (мизинец = 1, безымянный = 2, средний
      = 4, указательный = 8, большой = 16), какое максимальное число можно
      показать?
    </p>

    <div class="hands" role="group" aria-label="Упражнение с пальцами">
      <div class="row">
        {#each fingerValues as value, i (value)}
          <button
            class="finger"
            class:up={fingerStates[i]}
            onclick={() => toggleFinger(i)}
            aria-label="Палец {value}: {fingerStates[i] ? 'поднят' : 'опущен'}"
            aria-pressed={fingerStates[i]}
          >
            <span class="icon">{fingerStates[i] ? "☝️" : "👇"}</span>
            <span class="value">{value}</span>
          </button>
        {/each}
      </div>

      <div class="result-area">
        <span class="label">Сумма:</span>
        <span class="value">{handValue}</span>
        {#if handValue === 31}
          <span class="max-badge">🎉 Максимум!</span>
        {/if}
      </div>

      <button
        class="btn-reset-small"
        onclick={resetFingers}
        aria-label="Сбросить пальцы"
      >
        Сбросить
      </button>
    </div>

    <p class="hint">
      <strong>Ответ:</strong> 31 = 16 + 8 + 4 + 2 + 1 (все пальцы подняты)
    </p>
  </div>

  <div class="insight">
    <h3>Сдвиг</h3>
    <p>
      Если к двоичному числу справа приписать ноль (было 101 → стало 1010), что
      произошло с числом?
    </p>
    <div class="demo">
      <span class="before">101<sub>2</sub> = 5</span>
      <span class="arrow">→ приписали 0 →</span>
      <span class="after">1010<sub>2</sub> = 10</span>
    </div>
    <p>
      <strong>Число удвоилось!</strong> Так же как приписка нуля в десятичной умножает
      на 10.
    </p>
  </div>

  <div class="insight">
    <h3>Чётность</h3>
    <p>Как мгновенно определить, чётное ли двоичное число 110101110?</p>
    <p>
      <strong>Смотри на последнюю цифру!</strong> Если 0 — чётное, если 1 — нечётное.
      Это работает, потому что последний разряд — это единицы.
    </p>
  </div>
</Section>

<!-- Mini-project: Pixel Art -->
<Section
  id="pixel-project"
  title="Мини-проект: чёрно-белый художник"
  description="Компьютер хранит картинки как набор чисел. Переведи каждое число в 8-битный двоичный код, и на сетке проявится узор!"
>
  <div class="container">
    <div class="numbers">
      {#each pixelData as num, rowIndex (rowIndex)}
        <button
          class="btn-number"
          class:revealed={revealedRows[rowIndex]}
          onclick={() => toggleRowReveal(rowIndex)}
          aria-label="Строка {rowIndex + 1}: число {num}"
        >
          <span class="num">{num}</span>
          {#if revealedRows[rowIndex]}
            <span class="binary">
              = {toBinaryArray(num)
                .map((b) => (b ? "1" : "0"))
                .join("")}
            </span>
          {/if}
        </button>
      {/each}
    </div>

    <div class="canvas" aria-label="Холст пикселей 8x8">
      {#each pixelData as num, rowIndex (rowIndex)}
        <div class="row">
          {#each toBinaryArray(num) as isBlack, colIndex (colIndex)}
            <div
              class="cell"
              class:black={isBlack && (showAllPixels || revealedRows[rowIndex])}
              class:hidden={!showAllPixels && !revealedRows[rowIndex]}
            ></div>
          {/each}
        </div>
      {/each}
    </div>

    <div class="controls">
      <button
        class="btn-reveal"
        onclick={revealAllPixels}
        aria-label="Показать всё"
      >
        Показать всё
      </button>
      <button
        class="btn-reset-small"
        onclick={resetPixelArt}
        aria-label="Сбросить"
      >
        Сбросить
      </button>
    </div>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p class="summary-text">
      Число — это абстрактная идея количества. «13», «XIII», «тринадцать» и
      «1101» — просто разные «костюмы» для одной идеи.
    </p>
    <p>
      Мы используем десятичную систему из-за анатомии (10 пальцев), а машины —
      двоичную из-за физики (ток есть / тока нет). Понимая двоичную систему, ты
      говоришь на родном языке электричества.
    </p>
  </Summary>
</Section>

<style>
  /* Common typography */
  p {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  /* Section: Place Value */
  :global(#place-value) {
    .metaphor {
      display: flex;
      gap: 1.5rem;
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid var(--color-surface-200);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      .icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          margin-top: 0;
          color: var(--color-surface-900);
        }

        p {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .wallets {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid var(--color-surface-200);

      .row {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
      }

      .wallet {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.5rem 0;
        background: var(--color-warning-100);
        border-radius: var(--radius-container);
        border: 2px solid var(--color-warning-400);
        flex: 1;
        min-width: 0;

        .value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-warning-800);
        }

        .label {
          font-size: 0.875rem;
          color: var(--color-surface-600);
          text-align: center;
          width: 100%;
        }
      }
    }
  }

  /* Section: Assembly */
  :global(#assembly) {
    .steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 2rem 0;

      .step {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        padding: 1.25rem 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        border: 1px solid var(--color-surface-200);

        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: var(--color-primary-600);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          flex-shrink: 0;
        }

        .text {
          font-size: 1.25rem;
          line-height: 1.5;
        }
      }
    }

    .result {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      padding: 2rem;
      background: var(--color-success-50);
      border-radius: var(--radius-container);
      margin: 2rem 0;
      flex-wrap: wrap;
      border: 1px solid var(--color-success-200);

      .label {
        font-size: 1.25rem;
        color: var(--color-surface-700);
      }

      .binary {
        font-size: 2.5rem;
        font-weight: 700;
        font-family: monospace;
        color: var(--color-success-800);
        letter-spacing: 0.15em;
      }

      .formula {
        font-size: 1.25rem;
        color: var(--color-surface-600);
      }
    }
  }

  /* Section: Simulation */
  :global(#simulation) {
    .panel {
      background: var(--color-primary-50);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .intro {
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 2rem;
      }

      .toggles {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        .switch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          width: 70px;
          border: 3px solid var(--color-surface-400);
          border-radius: var(--radius-container);
          background: var(--color-surface-100);
          cursor: pointer;
          transition:
            background 0.2s,
            border-color 0.2s,
            box-shadow 0.2s,
            transform 0.2s;

          &:hover {
            transform: translateY(-3px);
          }

          &.on {
            background: var(--color-success-100);
            border-color: var(--color-success-500);
            box-shadow: 0 0 15px var(--color-success-200);

            .indicator .state-on {
              color: var(--color-success-700);
            }
          }

          .weight {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--color-surface-700);
          }

          .indicator {
            font-size: 0.75rem;
            font-weight: 600;
            min-width: 2.5em;
            text-align: center;

            .state-off {
              color: var(--color-surface-500);
            }
          }

          .bit {
            font-size: 1.25rem;
            font-weight: 700;
            font-family: monospace;
          }
        }
      }

      .display {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        .row {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          .label {
            font-size: 1.125rem;
            color: var(--color-surface-600);
          }

          .value {
            font-size: 1.5rem;
            font-weight: 700;

            &.binary {
              font-family: monospace;
              letter-spacing: 0.1em;
              color: var(--color-primary-800);
            }

            &.decimal {
              font-size: 2rem;
              color: var(--color-success-700);
            }
          }
        }
      }

      .controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: calc(var(--radius-container) * 0.5);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-reset {
          background: var(--color-surface-200);
          color: var(--color-surface-700);

          &:hover {
            background: var(--color-surface-300);
          }
        }

        .btn-challenge {
          background: var(--color-primary-600);
          color: white;

          &:hover {
            background: var(--color-primary-700);
            transform: translateY(-2px);
          }
        }
      }

      .challenge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--color-warning-100);
        border-radius: var(--radius-container);
        border: 2px solid var(--color-warning-400);

        &.success {
          background: var(--color-success-100);
          border-color: var(--color-success-500);
        }

        .icon {
          font-size: 1.5rem;
        }

        .text {
          font-size: 1.25rem;
        }
      }
    }
  }

  /* Section: Universal */
  :global(#universal) {
    .powers {
      margin: 2rem 0;
      border-radius: var(--radius-container);
      overflow: hidden;
      border: 2px solid var(--color-surface-200);

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1rem 1.5rem;
        font-size: 1.125rem;
        background: var(--color-surface-50);

        &.header {
          background: var(--color-surface-100);
          font-weight: 600;
        }

        &:not(.header):nth-child(odd) {
          background: var(--color-surface-100);
        }
      }
    }
  }

  /* Section: Formal */
  :global(#formal) {
    .notation {
      display: flex;
      gap: 3rem;
      margin: 2rem 0;
      flex-wrap: wrap;

      .item {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .value {
          font-size: 1.75rem;
          font-weight: 700;
          font-family: monospace;
          color: var(--color-primary-700);
        }

        .desc {
          font-size: 1.125rem;
          color: var(--color-surface-600);
        }
      }
    }

    .formula {
      font-family: monospace;
      font-size: 1.375rem;
      background: var(--color-surface-100);
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      display: inline-block;
    }

    .example {
      color: var(--color-surface-600);
    }
  }

  /* Section: Practice */
  :global(#practice) {
    .card,
    .insight {
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      border: 2px solid var(--color-surface-200);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      h3 {
        color: var(--color-surface-700);
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.25rem;
        margin-bottom: 1.25rem;
      }
    }

    .hint {
      font-size: 1.125rem;
      color: var(--color-surface-600);
      padding: 1rem;
      background: var(--color-surface-100);
      border-radius: 0.5rem;
      margin: 0;
    }

    .hands {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      margin: 1.5rem 0;

      .row {
        display: flex;
        gap: 0.75rem;
      }

      .finger {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        min-width: 60px;
        border: 2px solid var(--color-surface-300);
        border-radius: var(--radius-container);
        background: var(--color-surface-100);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-3px);
        }

        &.up {
          background: var(--color-success-100);
          border-color: var(--color-success-500);
        }

        .icon {
          font-size: 1.5rem;
        }

        .value {
          font-size: 1rem;
          font-weight: 700;
        }
      }

      .result-area {
        display: flex;
        align-items: center;
        gap: 1rem;

        .label {
          font-size: 1.125rem;
          color: var(--color-surface-600);
        }

        .value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary-700);
        }

        .max-badge {
          font-size: 1.25rem;
        }
      }

      .btn-reset-small {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: calc(var(--radius-container) * 0.5);
        font-size: 0.875rem;
        background: var(--color-surface-200);
        color: var(--color-surface-700);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--color-surface-300);
        }
      }
    }

    .demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      margin: 1.5rem 0;
      flex-wrap: wrap;

      .before,
      .after {
        font-size: 1.5rem;
        font-weight: 700;
        font-family: monospace;
      }

      .before {
        color: var(--color-surface-600);
      }

      .after {
        color: var(--color-success-700);
      }

      .arrow {
        font-size: 1rem;
        color: var(--color-surface-500);
      }
    }
  }

  /* Section: Pixel Project */
  :global(#pixel-project) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      border: 2px solid var(--color-surface-300);
    }

    .numbers {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .btn-number {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1.25rem;
        border: 2px solid var(--color-surface-300);
        border-radius: 0.5rem;
        background: var(--color-surface-50);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1.125rem;

        &:hover {
          background: var(--color-surface-200);
        }

        &.revealed {
          background: var(--color-success-50);
          border-color: var(--color-success-400);
        }

        .num {
          font-weight: 700;
          min-width: 40px;
        }

        .binary {
          font-family: monospace;
          color: var(--color-success-700);
        }
      }
    }

    .canvas {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--color-surface-300);
      padding: 2px;
      border-radius: 0.5rem;

      .row {
        display: flex;
        gap: 2px;
      }

      .cell {
        width: 32px;
        height: 32px;
        background: var(--color-surface-50);
        border-radius: 2px;
        transition: all 0.3s;

        &.black {
          background: var(--color-surface-900);
        }

        &.hidden {
          background: var(--color-surface-200);
        }
      }
    }

    .controls {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: calc(var(--radius-container) * 0.5);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-reveal {
        background: var(--color-primary-600);
        color: white;

        &:hover {
          background: var(--color-primary-700);
          transform: translateY(-2px);
        }
      }

      .btn-reset-small {
        background: var(--color-surface-200);
        color: var(--color-surface-700);

        &:hover {
          background: var(--color-surface-300);
        }
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    :global(#place-value) {
      .metaphor {
        flex-direction: column;
      }

      .wallets .row {
        gap: 0.5rem;
      }

      .wallet {
        padding: 0.75rem 0.25rem;
        min-width: 0;
        flex: 1;
      }
    }

    :global(#simulation) {
      .toggles {
        gap: 0.5rem;

        .switch {
          width: 55px;
          padding: 0.75rem;

          .weight {
            font-size: 0.875rem;
          }
        }
      }

      .display {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
    }

    :global(#formal) {
      .notation {
        flex-direction: column;
        gap: 1rem;
      }
    }

    :global(#practice) {
      .hands {
        .row {
          flex-wrap: nowrap;
          gap: 0.25rem;
          width: 100%;
        }

        .finger {
          min-width: 0;
          flex: 1;
          padding: 0.5rem;

          .icon {
            font-size: 1.25rem;
          }
        }
      }

      .demo {
        flex-direction: column;
        gap: 0.75rem;
      }
    }

    :global(#pixel-project) {
      .canvas {
        .cell {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
</style>
