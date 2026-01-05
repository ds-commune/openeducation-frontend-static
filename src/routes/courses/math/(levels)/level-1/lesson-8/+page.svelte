<script lang="ts">
  import { Crisis, DefinitionCard, Summary } from "../../components";

  // Threshold slider state (0-100%)
  let thresholdPercent = $state(50);

  // Generate noisy sine wave path for SVG
  // Pre-computed noise values for consistent "jitter"
  const noiseValues = [
    0, 3, -2, 5, -4, 2, -3, 6, -1, 4, -5, 3, -2, 1, -4, 5, -3, 2, -1, 4,
  ];

  const signalPath = $derived.by(() => {
    const width = 400;
    const height = 120;
    const points: string[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      // Base sine wave (2.5 periods)
      const sineY = Math.sin((i / steps) * Math.PI * 5) * 0.35;
      // Add noise
      const noise = (noiseValues[i % noiseValues.length] / 100) * 0.8;
      // Convert to SVG coordinates (0 = top, height = bottom)
      const y = height / 2 - (sineY + noise) * height;
      points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }
    return points.join(" ");
  });

  // Interactive state for lamp calculator simulation
  let lampCount = $state(1);
  const combinations = $derived(Math.pow(2, lampCount));
  const maxLamps = 5;

  // State for each lamp (on/off)
  let lampStates = $state<boolean[]>([false, false, false, false, false]);

  function toggleLamp(index: number) {
    lampStates[index] = !lampStates[index];
  }

  function addLamp() {
    if (lampCount < maxLamps) {
      lampCount++;
    }
  }

  function removeLamp() {
    if (lampCount > 1) {
      lampCount--;
      lampStates[lampCount] = false;
    }
  }

  // Convert current lamp states to binary string
  const currentBinary = $derived(
    lampStates
      .slice(0, lampCount)
      .map((s) => (s ? "1" : "0"))
      .join("")
  );

  const currentDecimal = $derived(
    lampStates
      .slice(0, lampCount)
      .reduce((acc, s, i) => acc + (s ? Math.pow(2, lampCount - 1 - i) : 0), 0)
  );

  // Pixel grid state (5x5)
  let pixels = $state<boolean[]>(
    Array(25)
      .fill(false)
      .map((_, i) => [0, 4, 6, 8, 12, 15, 19, 21, 22, 23].includes(i))
  );

  function togglePixel(index: number) {
    pixels[index] = !pixels[index];
  }

  const pixelCode = $derived(
    Array.from({ length: 5 }, (_, row) =>
      pixels
        .slice(row * 5, row * 5 + 5)
        .map((p) => (p ? "1" : "0"))
        .join(" ")
    ).join(" / ")
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о двоичном кодировании. Почему компьютеры используют 0 и 1, и как из них получается любой смысл."
  />
</svelte:head>

<section class="crisis">
  <Crisis icon="📡" title="Сломанный передатчик">
    <p>
      Ты — участник космической миссии. Связь сломалась. Единственное, что
      работает — мощный прожектор, который можно только <strong>включить</strong
      >
      или <strong>выключить</strong>.
    </p>
    <p>
      Тебе нужно передать на базу сложное сообщение: «У нас закончилось топливо,
      нужны батареи типа А».
    </p>

    {#snippet question()}
      <strong>Проблема:</strong> у нас есть всего два состояния — свет есть и света
      нет. Но слов в языке тысячи! Если просто мигать один раз для «а», два раза для
      «б» и так далее — передача одного длинного слова займёт вечность.
    {/snippet}
  </Crisis>
</section>

<p class="key-question">
  <strong>Ключевой вопрос:</strong> может ли мир, состоящий из миллиардов оттенков
  и смыслов, быть построен всего из двух кирпичиков?
</p>

<!-- Section 1: Reliability -->
<section id="reliability" aria-labelledby="reliability-title">
  <h2 id="reliability-title">Надёжность против богатства</h2>

  <p>
    Почему не использовать 10 уровней яркости лампы — ведь это соответствовало
    бы привычным цифрам от 0 до 9?
  </p>

  <div class="metaphor">
    <div class="icon">🌊</div>
    <div class="content">
      <h3>Метафора: крик через шторм</h3>
      <p>
        Представь, что ты кричишь другу через бурю. Если вы договоритесь
        использовать 10 уровней громкости — ветер (шум) превратит «тихий шёпот»
        (цифра 1) в тишину (0), а «средний крик» (5) — в «громкий крик» (7).
        Ошибки неизбежны.
      </p>
      <p>
        <strong>Два состояния — самые надёжные во Вселенной.</strong>
        Либо сигнал есть, либо его нет. Это трудно перепутать даже при сильных помехах.
      </p>
    </div>
  </div>

  <div class="signal" aria-label="Демонстрация цифрового сигнала">
    <div class="visual">
      <svg class="wave-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
        <defs>
          <clipPath id="above-threshold">
            <rect
              x="0"
              y="0"
              width="400"
              height={120 * (1 - thresholdPercent / 100)}
            />
          </clipPath>
          <clipPath id="below-threshold">
            <rect
              x="0"
              y={120 * (1 - thresholdPercent / 100)}
              width="400"
              height={(120 * thresholdPercent) / 100}
            />
          </clipPath>
        </defs>
        <!-- Background zones -->
        <rect
          x="0"
          y="0"
          width="400"
          height={120 * (1 - thresholdPercent / 100)}
          fill="var(--color-success-100)"
        />
        <rect
          x="0"
          y={120 * (1 - thresholdPercent / 100)}
          width="400"
          height={(120 * thresholdPercent) / 100}
          fill="var(--color-error-100)"
        />
        <!-- Threshold line -->
        <line
          x1="0"
          y1={120 * (1 - thresholdPercent / 100)}
          x2="400"
          y2={120 * (1 - thresholdPercent / 100)}
          stroke="var(--color-surface-600)"
          stroke-width="2"
          stroke-dasharray="6,4"
        />
        <!-- Signal wave - green part (above threshold) -->
        <path
          d={signalPath}
          fill="none"
          stroke="var(--color-success-700)"
          stroke-width="3"
          clip-path="url(#above-threshold)"
        />
        <!-- Signal wave - red part (below threshold) -->
        <path
          d={signalPath}
          fill="none"
          stroke="var(--color-error-600)"
          stroke-width="3"
          clip-path="url(#below-threshold)"
        />
      </svg>
      <div
        class="threshold-badge"
        style="top: calc({100 - thresholdPercent}% - 12px)"
      >
        Порог
      </div>
      <div class="slider-row">
        <span class="slider-label">Двигай порог:</span>
        <input
          type="range"
          min="15"
          max="85"
          bind:value={thresholdPercent}
          class="threshold-slider"
          aria-label="Уровень порога"
        />
      </div>
      <div class="legend">
        <span class="one">● Выше порога = 1 (ВКЛ)</span>
        <span class="zero">● Ниже порога = 0 (ВЫКЛ)</span>
      </div>
    </div>
    <p class="caption">
      Сигнал «дрожит» от помех, но пока он выше порога — это «1», ниже — «0».
    </p>
  </div>
</section>

<!-- Section 2: Power of Combinations -->
<section id="combinations" aria-labelledby="combinations-title">
  <h2 id="combinations-title">Сила комбинации</h2>

  <p>
    Как из двух состояний получить больше? Мы используем <strong>место</strong>
    (позицию) и <strong>последовательность</strong>.
  </p>

  <ul class="list">
    <li>1 лампочка = <strong>2</strong> состояния (да/нет)</li>
    <li>2 лампочки = <strong>4</strong> состояния (00, 01, 10, 11)</li>
    <li>3 лампочки = <strong>8</strong> состояний</li>
    <li>
      5 лампочек = <strong>32</strong> состояния — хватит на весь алфавит!
    </li>
  </ul>

  <!-- Interactive Lamp Calculator -->
  <div class="simulation" aria-labelledby="lamp-sim-title">
    <h3 id="lamp-sim-title">🔌 Ламповый калькулятор состояний</h3>

    <div class="controls">
      <button
        class="btn"
        onclick={removeLamp}
        disabled={lampCount <= 1}
        aria-label="Убрать лампу"
      >
        −
      </button>
      <span class="count"
        >{lampCount}
        {lampCount === 1 ? "лампа" : lampCount < 5 ? "лампы" : "ламп"}</span
      >
      <button
        class="btn"
        onclick={addLamp}
        disabled={lampCount >= maxLamps}
        aria-label="Добавить лампу"
      >
        +
      </button>
    </div>

    <div class="lamps" role="group" aria-label="Ряд лампочек">
      {#each { length: lampCount } as _, i (i)}
        <button
          class="lamp"
          class:on={lampStates[i]}
          onclick={() => toggleLamp(i)}
          aria-label="Лампа {i + 1}: {lampStates[i] ? 'включена' : 'выключена'}"
          aria-pressed={lampStates[i]}
        >
          <span class="bulb">{lampStates[i] ? "💡" : "⚫"}</span>
          <span class="value">{lampStates[i] ? "1" : "0"}</span>
        </button>
      {/each}
    </div>

    <div class="result">
      <div class="row">
        <span class="label">Двоичный код:</span>
        <span class="value binary">{currentBinary}</span>
      </div>
      <div class="row">
        <span class="label">Номер комбинации:</span>
        <span class="value">{currentDecimal + 1} из {combinations}</span>
      </div>
    </div>

    <div class="counter">
      <strong>Всего возможных комбинаций: </strong>
      <span class="big">{combinations}</span>
      <span class="formula">(2<sup>{lampCount}</sup>)</span>
    </div>
  </div>
</section>

<!-- Section 3: Encoding Reality -->
<section id="encoding" aria-labelledby="encoding-title">
  <h2 id="encoding-title">Кодирование реальности</h2>

  <p>
    Мы договариваемся, что определённая комбинация света означает определённый
    символ. Это не магия — это просто словарь.
  </p>

  <div class="examples">
    <div class="card">
      <div class="icon">📻</div>
      <h4>Азбука Морзе</h4>
      <p>Короткие и длинные сигналы: точка и тире.</p>
    </div>
    <div class="card">
      <div class="icon">👆</div>
      <h4>Шрифт Брайля</h4>
      <p>Выпуклые и плоские точки для чтения пальцами.</p>
    </div>
  </div>

  <div class="pixel-demo">
    <h3>Нарисуй битами</h3>
    <p class="pixel-hint">Кликни на ячейку, чтобы переключить цвет</p>
    <div
      class="grid interactive"
      role="grid"
      aria-label="Интерактивная пиксельная сетка 5×5"
    >
      {#each pixels as isOn, i}
        <button
          class="pixel"
          class:black={isOn}
          class:white={!isOn}
          onclick={() => togglePixel(i)}
          aria-label="Пиксель {i + 1}: {isOn ? 'чёрный' : 'белый'}"
          aria-pressed={isOn}
        ></button>
      {/each}
    </div>
    <div class="code">
      <code>{pixelCode}</code>
    </div>
    <p class="caption">
      Любая картинка — это просто очень длинная цепь переключателей.
    </p>
  </div>
</section>

<!-- Section 4: Formalization -->
<section id="formalization" aria-labelledby="formalization-title">
  <h2 id="formalization-title">Формализация</h2>

  <p>
    Переходим от физики к математической записи. Убираем лампочки — оставляем
    символы.
  </p>

  <DefinitionCard title="Бит (Binary Digit)">
    <p>
      <strong>Бит</strong> — минимальная частица информации, отвечающая на
      вопрос «да или нет?». Записывается как <strong>0</strong> или
      <strong>1</strong>.
    </p>
  </DefinitionCard>

  <div class="table-container">
    <div class="row header">
      <span>Количество бит</span>
      <span>Формула</span>
      <span>Вариантов</span>
      <span>Пример</span>
    </div>
    <div class="row">
      <span>1 бит</span>
      <span>2<sup>1</sup></span>
      <span>2</span>
      <span>да / нет</span>
    </div>
    <div class="row">
      <span>2 бита</span>
      <span>2<sup>2</sup></span>
      <span>4</span>
      <span>00, 01, 10, 11</span>
    </div>
    <div class="row">
      <span>8 бит (байт)</span>
      <span>2<sup>8</sup></span>
      <span>256</span>
      <span>любой символ клавиатуры</span>
    </div>
  </div>
</section>

<section class="summary">
  <Summary title="Резюме">
    <blockquote>
      Сложность — это иллюзия. Любая цифровая картинка, игра или видео — это
      просто огромная гора ответов на простые вопросы «да» (1) или «нет» (0).
    </blockquote>
    <p>
      Мы используем 0 и 1 не потому, что компьютеры умные, а потому, что они
      понимают только простые и чёткие команды.
    </p>
  </Summary>
</section>

<style>
  .key-question {
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
    background: var(--color-primary-50);
    border-radius: calc(var(--radius-container) * 4);
    margin-bottom: 2.5rem;
  }

  /* Section: Reliability */
  #reliability {
    .metaphor {
      display: flex;
      gap: 1.5rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      margin: 2rem 0;
      border: 2px solid var(--color-surface-200);

      .icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          color: var(--color-surface-700);
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

    .signal {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      margin: 2rem 0;
      border: 2px solid var(--color-surface-300);

      .visual {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .wave-svg {
        width: 100%;
        height: 120px;
        border-radius: 0.5rem;
      }

      .threshold-badge {
        position: absolute;
        right: 1rem;
        background: var(--color-surface-800);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        white-space: nowrap;
        transition: top 0.1s ease;
        pointer-events: none;
      }

      .slider-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        .slider-label {
          font-size: 1rem;
          color: var(--color-surface-600);
        }

        .threshold-slider {
          width: 200px;
          accent-color: var(--color-primary-600);
          cursor: pointer;
        }
      }

      .legend {
        display: flex;
        justify-content: center;
        gap: 2rem;
        font-size: 1rem;

        .one {
          color: var(--color-success-700);
        }

        .zero {
          color: var(--color-surface-600);
        }
      }

      .caption {
        text-align: center;
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 1rem 0 0;
      }
    }
  }

  /* Section: Combinations */
  #combinations {
    .list {
      font-size: 1.375rem;
      line-height: 2;
      padding-left: 2rem;
      margin: 1.5rem 0 2rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    .simulation {
      background: var(--color-primary-50);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      h3 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;

        .btn {
          width: 48px;
          height: 48px;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 700;
          cursor: pointer;
          background: var(--color-primary-600);
          color: white;
          transition: all 0.2s;

          &:hover:not(:disabled) {
            background: var(--color-primary-700);
            transform: scale(1.1);
          }

          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        }

        .count {
          font-size: 1.25rem;
          font-weight: 600;
          min-width: 100px;
          text-align: center;
        }
      }

      .lamps {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        .lamp {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 3px solid var(--color-surface-400);
          border-radius: calc(var(--radius-container) * 4);
          background: var(--color-surface-100);
          cursor: pointer;
          transition: all 0.2s;
          min-width: 80px;

          &:hover {
            transform: translateY(-4px);
          }

          &.on {
            background: var(--color-warning-100);
            border-color: var(--color-warning-500);
            box-shadow: 0 0 20px var(--color-warning-300);
          }

          .bulb {
            font-size: 2.5rem;
          }

          .value {
            font-size: 1.25rem;
            font-weight: 700;
            font-family: monospace;
          }
        }
      }

      .result {
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
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-primary-800);
            white-space: nowrap;

            &.binary {
              font-family: monospace;
              font-size: 1.5rem;
              letter-spacing: 0.1em;
            }
          }
        }
      }

      .counter {
        text-align: center;
        font-size: 1.25rem;
        padding-top: 1.5rem;
        border-top: 2px solid var(--color-primary-200);

        .big {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary-700);
          margin: 0 0.5rem;
        }

        .formula {
          font-size: 1rem;
          color: var(--color-surface-500);
        }
      }
    }
  }

  /* Section: Encoding Reality */
  #encoding {
    .examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 4);
        padding: 2rem;
        text-align: center;
        border: 2px solid var(--color-surface-200);

        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.125rem;
          margin: 0;
          color: var(--color-surface-600);
        }
      }
    }

    .pixel-demo {
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;
      border: 2px solid var(--color-surface-300);

      h3 {
        margin-bottom: 0.5rem;
      }

      .pixel-hint {
        font-size: 1rem;
        color: var(--color-surface-500);
        margin-bottom: 1.5rem;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(5, 40px);
        gap: 4px;
        justify-content: center;
        margin-bottom: 1.5rem;

        &.interactive .pixel {
          cursor: pointer;
          transition:
            transform 0.1s,
            box-shadow 0.1s;
          border: none;
          padding: 0;

          &:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          &:active {
            transform: scale(0.95);
          }
        }

        .pixel {
          width: 40px;
          height: 40px;
          border-radius: 4px;

          &.black {
            background: var(--color-surface-900);
          }

          &.white {
            background: #ffffff;
            box-shadow: inset 0 0 0 1px var(--color-surface-300);
          }
        }
      }

      .code {
        font-family: monospace;
        font-size: 1rem;
        background: var(--color-surface-800);
        color: var(--color-success-400);
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: inline-block;
        margin-bottom: 1rem;
      }

      .caption {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 0;
      }
    }
  }

  /* Section: Formalization */
  #formalization {
    .table-container {
      margin: 2rem 0;
      border-radius: calc(var(--radius-container) * 4);
      overflow: hidden;
      border: 2px solid var(--color-surface-200);

      .row {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 2fr;
        padding: 1rem 1.5rem;
        font-size: 1.125rem;
        background: #ffffff;

        &.header {
          background: var(--color-surface-100);
          font-weight: 600;
        }

        &:not(.header):nth-child(odd) {
          background: var(--color-surface-50);
        }

        span {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .summary :global(p) {
    font-size: 1.25rem;
    margin: 0;
    color: var(--color-surface-700);
  }

  /* Mobile responsiveness */
  @media (max-width: 1100px) {
    #reliability .metaphor {
      flex-direction: column;
    }

    #combinations {
      .simulation {
        .lamps {
          gap: 0.75rem;

          .lamp {
            min-width: 60px;
            padding: 0.75rem;

            .bulb {
              font-size: 2rem;
            }
          }
        }

        .result {
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
      }
    }

    #formalization .table-container .row {
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;

      &.header span:nth-child(3),
      &.header span:nth-child(4),
      &:not(.header) span:nth-child(3),
      &:not(.header) span:nth-child(4) {
        display: none;
      }
    }
  }
</style>
