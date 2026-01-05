<script lang="ts">
  import { Crisis, DefinitionCard, Summary } from "../../components";

  // 8x8 Pixel Grid State
  const GRID_SIZE = 8;
  let pixelGrid = $state<boolean[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  function togglePixel(row: number, col: number) {
    pixelGrid[row][col] = !pixelGrid[row][col];
  }

  function clearGrid() {
    pixelGrid = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(false)
    );
  }

  // Generate binary string from grid
  const gridBinaryString = $derived(
    pixelGrid
      .map((row) => row.map((cell) => (cell ? "1" : "0")).join(""))
      .join("")
  );

  const gridBinaryFormatted = $derived(
    pixelGrid
      .map((row) => row.map((cell) => (cell ? "1" : "0")).join(" "))
      .join("\n")
  );

  // RGB Color Mixer State
  let red = $state(128);
  let green = $state(128);
  let blue = $state(128);

  const rgbColor = $derived(`rgb(${red}, ${green}, ${blue})`);

  function toBinary8(n: number): string {
    return n.toString(2).padStart(8, "0");
  }

  const redBinary = $derived(toBinary8(red));
  const greenBinary = $derived(toBinary8(green));
  const blueBinary = $derived(toBinary8(blue));
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о кодировании изображений, цвета и звука. Как двоичный код превращается в картинки и музыку."
  />
</svelte:head>

<section id="introduction">
  <Crisis icon="🏝️" title="Проблема двух островов">
    <p>
      Ты и твой друг оказались на разных островах. Между вами нет мостов,
      интернета или лодок. Единственный способ связи — мощный прожектор, которым
      можно светить в сторону друга.
    </p>
    <p>
      Ты можешь только <strong>включить свет</strong> (сигнал есть) или
      <strong>выключить</strong> (сигнала нет).
    </p>

    {#snippet question()}
      <strong>Проблема:</strong> друг хочет увидеть твой рисунок — например,
      смайлик. Но ты не можешь перекинуть ему бумагу. У тебя есть только
      мигающая лампочка. Как передать <em>картинку</em>? А как передать
      <em>музыку</em>?
    {/snippet}
  </Crisis>

  <div class="key-question">
    <p>
      <strong>Кризис:</strong> наш мир богат и непрерывен (тысячи цветов, плавные
      звуки), а канал связи примитивен. Как вместить бесконечное разнообразие реальности
      в одну мигающую лампочку?
    </p>
  </div>
</section>

<!-- Part 1: Pixels -->
<section id="pixels" aria-labelledby="pixels-title">
  <h2 id="pixels-title">От атомов к пикселям</h2>

  <p>
    Любое изображение можно разбить на маленькие кусочки. Если кусочки
    достаточно маленькие, глаз не заметит подвоха.
  </p>

  <div class="metaphor">
    <div class="icon">🧩</div>
    <div class="content">
      <h3>Метафора: мозаика</h3>
      <p>
        Вспомни мозаику или вышивку крестиком. Издалека это картина, вблизи —
        набор цветных квадратиков. Экран работает точно так же!
      </p>
    </div>
  </div>

  <!-- Interactive 8x8 Grid -->
  <div class="simulation" aria-labelledby="grid-sim-title">
    <h3 id="grid-sim-title">🎨 Сетка реальности (8×8)</h3>
    <p class="instruction">
      Кликай по клеткам, чтобы закрасить их. Справа увидишь двоичный код твоего
      рисунка.
    </p>

    <div class="grid-wrapper">
      <div class="editor" role="grid" aria-label="Редактор пикселей">
        {#each pixelGrid as row, rowIndex (rowIndex)}
          <div class="row" role="row">
            {#each row as cell, colIndex (colIndex)}
              <button
                class="cell"
                class:filled={cell}
                onclick={() => togglePixel(rowIndex, colIndex)}
                aria-label="Пиксель {rowIndex + 1},{colIndex + 1}: {cell
                  ? 'закрашен'
                  : 'пустой'}"
                aria-pressed={cell}
              ></button>
            {/each}
          </div>
        {/each}
      </div>

      <div class="output">
        <div class="label">Двоичный код:</div>
        <pre class="code">{gridBinaryFormatted}</pre>
        <div class="stats">
          Всего бит: <strong>{gridBinaryString.length}</strong>
        </div>
      </div>
    </div>

    <button class="clear-btn" onclick={clearGrid} aria-label="Очистить сетку">
      Очистить
    </button>

    <p class="insight">
      <strong>Вывод:</strong> картинка — это просто список состояний клеток. Белая
      = 0, чёрная = 1.
    </p>
  </div>
</section>

<!-- Part 2: Color as Number -->
<section id="color" aria-labelledby="color-title">
  <h2 id="color-title">Цвет как число</h2>

  <p>
    Что делать, если мир не чёрно-белый? Нам нужно больше вариантов, чем 0 и 1.
    Но у нас по-прежнему только 0 и 1.
  </p>

  <p>
    Решение — использовать <strong>комбинации</strong>. Если 1 бит даёт 2
    состояния (чёрный/белый), то 8 бит дают 2<sup>8</sup> = 256 состояний (уровней
    яркости). А три группы по 8 бит (для красного, зелёного и синего) дают миллионы
    цветов!
  </p>

  <!-- RGB Color Mixer -->
  <div class="simulation" aria-labelledby="rgb-sim-title">
    <h3 id="rgb-sim-title">🌈 Смеситель света (RGB)</h3>
    <p class="instruction">
      Двигай ползунки и смотри, как из трёх чисел рождается любой цвет.
    </p>

    <div class="mixer">
      <div class="preview" style="background-color: {rgbColor}"></div>

      <div class="sliders">
        <div class="slider-row">
          <label class="label red" for="red-slider">R</label>
          <input
            id="red-slider"
            type="range"
            min="0"
            max="255"
            bind:value={red}
            class="range red"
          />
          <span class="value">{red}</span>
          <code class="binary">{redBinary}</code>
        </div>

        <div class="slider-row">
          <label class="label green" for="green-slider">G</label>
          <input
            id="green-slider"
            type="range"
            min="0"
            max="255"
            bind:value={green}
            class="range green"
          />
          <span class="value">{green}</span>
          <code class="binary">{greenBinary}</code>
        </div>

        <div class="slider-row">
          <label class="label blue" for="blue-slider">B</label>
          <input
            id="blue-slider"
            type="range"
            min="0"
            max="255"
            bind:value={blue}
            class="range blue"
          />
          <span class="value">{blue}</span>
          <code class="binary">{blueBinary}</code>
        </div>
      </div>
    </div>

    <div class="display">
      <span>RGB: ({red}, {green}, {blue})</span>
    </div>

    <p class="insight">
      <strong>Открытие:</strong> жёлтый цвет — это не магия, это математическая смесь
      (255, 255, 0). Попробуй!
    </p>
  </div>
</section>

<!-- Part 3: Sound -->
<section id="sound" aria-labelledby="sound-title">
  <h2 id="sound-title">Звук как лестница</h2>

  <p>
    Звук — это волна. Она плавная. Но компьютер не понимает плавности — он
    понимает только ступеньки.
  </p>

  <div class="metaphor">
    <div class="icon">🎬</div>
    <div class="content">
      <h3>Метафора: кинопленка</h3>
      <p>
        Движение в кино кажется плавным, но на самом деле это 24 статичных
        фотографии в секунду. Со звуком так же: мы делаем тысячи мгновенных
        «фотографий» громкости в секунду.
      </p>
    </div>
  </div>

  <div class="wave-demo">
    <h3>Оцифровка волны</h3>
    <div class="visual">
      <svg
        viewBox="0 0 400 120"
        class="svg"
        aria-label="Сравнение аналогового и цифрового сигнала"
      >
        <!-- Smooth analog wave -->
        <path
          d="M 0 60 Q 25 20, 50 60 Q 75 100, 100 60 Q 125 20, 150 60 Q 175 100, 200 60 Q 225 20, 250 60 Q 275 100, 300 60 Q 325 20, 350 60 Q 375 100, 400 60"
          fill="none"
          stroke="var(--color-primary-500)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <!-- Digital steps -->
        <path
          d="M 0 60 L 25 40 L 25 40 L 50 60 L 50 60 L 75 80 L 75 80 L 100 60 L 100 60 L 125 40 L 125 40 L 150 60 L 150 60 L 175 80 L 175 80 L 200 60 L 200 60 L 225 40 L 225 40 L 250 60 L 250 60 L 275 80 L 275 80 L 300 60 L 300 60 L 325 40 L 325 40 L 350 60 L 350 60 L 375 80 L 375 80 L 400 60"
          fill="none"
          stroke="var(--color-warning-500)"
          stroke-width="2"
          stroke-dasharray="5,3"
        />
        <!-- Sample points -->
        {#each [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400] as x, i}
          <circle
            cx={x}
            cy={[
              60, 40, 60, 80, 60, 40, 60, 80, 60, 40, 60, 80, 60, 40, 60, 80,
              60,
            ][i]}
            r="4"
            fill="var(--color-warning-500)"
          />
        {/each}
      </svg>
    </div>
    <div class="legend">
      <span class="analog">━ Аналоговый сигнал (реальный звук)</span>
      <span class="digital">┅ Цифровой сигнал (измерения)</span>
    </div>
    <p class="caption">
      Чем чаще мы измеряем высоту волны, тем точнее цифровая копия.
    </p>
  </div>
</section>

<!-- Formalization -->
<section id="formalization" aria-labelledby="formalization-title">
  <h2 id="formalization-title">Формализация</h2>

  <p>Переходим от интуиции к строгим определениям.</p>

  <DefinitionCard title="Бит (Bit)">
    <p>
      Минимальная единица информации. То самое состояние прожектора: включен (1)
      или выключен (0).
    </p>
  </DefinitionCard>

  <DefinitionCard title="Байт (Byte)">
    <p>
      «Слово» компьютера — группа из 8 битов. Позволяет закодировать 2<sup
        >8</sup
      > = 256 вариантов (символ клавиатуры или уровень яркости).
    </p>
  </DefinitionCard>

  <DefinitionCard title="Кодировка (Encoding)">
    <p>
      Таблица договорённостей. Для текста: ASCII/Unicode (буква «А» = число 65 =
      01000001). Для картинки: RGB.
    </p>
  </DefinitionCard>

  <div class="formula">
    <h3>Формула урока</h3>
    <div class="display">
      N<sub>вариантов</sub> = 2<sup>k</sup>
    </div>
    <p>
      где k — количество битов. Чем больше битов мы тратим на описание одной
      точки (пикселя или звука), тем точнее копия реальности, но тем больше
      «весит» файл.
    </p>
  </div>
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      Цифровой мир — это иллюзия непрерывности. Любую картинку, песню или видео
      можно разрезать на крошечные кусочки и превратить в огромный, но простой
      список чисел.
    </blockquote>
    <p>
      Компьютер — это не волшебный ящик, а сверхбыстрый калькулятор, который
      просто читает этот список и зажигает нужные точки на экране.
    </p>
  </Summary>
</section>

<style>
  /* Introduction */
  #introduction {
    .key-question {
      font-size: 1.25rem;
      text-align: center;
      padding: 2rem;
      padding-bottom: 0;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      margin-top: 2.5rem;
      margin-bottom: 2.5rem;
      border: 1px solid var(--color-surface-200);
    }
  }

  /* Pixels */
  #pixels {
    .metaphor {
      display: flex;
      gap: 1.5rem;
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid var(--color-surface-200);

      .icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          color: var(--color-surface-900);
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.125rem;
          margin-bottom: 1rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .simulation {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

      h3 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .instruction {
        text-align: center;
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 2rem;
      }

      .grid-wrapper {
        display: flex;
        gap: 3rem;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;

        .editor {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: var(--color-surface-300);
          padding: 2px;
          border-radius: var(--radius-base);

          .row {
            display: flex;
            gap: 2px;
          }

          .cell {
            width: 40px;
            height: 40px;
            border: none;
            background: var(--color-surface-50);
            cursor: pointer;
            transition: all 0.15s;

            &:hover {
              background: var(--color-surface-200);
            }

            &.filled {
              background: var(--color-surface-950);
            }
          }
        }

        .output {
          background: var(--color-surface-100);
          border: 2px solid var(--color-surface-300);
          border-radius: calc(var(--radius-container) * 2);
          padding: 1.5rem;
          min-width: 220px;

          .label {
            color: var(--color-surface-700);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          .code {
            font-family: monospace;
            font-size: 1.125rem;
            color: var(--color-surface-900);
            background: white;
            padding: 1rem;
            border-radius: var(--radius-base);
            margin: 0;
            line-height: 1.6;
            white-space: pre;
            letter-spacing: 0.15em;
          }

          .stats {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--color-surface-300);
            color: var(--color-surface-600);
            font-size: 1rem;
          }
        }
      }

      .clear-btn {
        display: block;
        margin: 1.5rem auto 0;
        padding: 0.75rem 2rem;
        border: none;
        border-radius: var(--radius-base);
        background: var(--color-surface-200);
        color: var(--color-surface-900);
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--color-surface-300);
        }
      }

      .insight {
        text-align: center;
        font-size: 1.125rem;
        margin: 1.5rem 0 0;
        padding: 1rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-base);
      }
    }
  }

  /* Color */
  #color {
    .simulation {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

      h3 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .instruction {
        text-align: center;
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 2rem;
      }

      .mixer {
        display: flex;
        gap: 3rem;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;

        .preview {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          box-shadow: 0 4px 12px
            color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
          transition: background-color 0.2s;
        }

        .sliders {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 300px;

          .slider-row {
            display: flex;
            align-items: center;
            gap: 1rem;

            .label {
              font-size: 1.25rem;
              font-weight: 700;
              width: 30px;
              text-align: center;

              &.red {
                color: #dc3545;
              }
              &.green {
                color: #28a745;
              }
              &.blue {
                color: #007bff;
              }
            }

            .range {
              flex: 1;
              height: 8px;
              appearance: none;
              border-radius: 4px;
              cursor: pointer;

              &.red {
                background: linear-gradient(to right, #000, #ff0000);
              }
              &.green {
                background: linear-gradient(to right, #000, #00ff00);
              }
              &.blue {
                background: linear-gradient(to right, #000, #0000ff);
              }

              &::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 2px solid var(--color-surface-400);
                box-shadow: 0 2px 4px
                  color-mix(in oklab, var(--color-surface-900) 0.1, transparent);
                cursor: pointer;
              }
            }

            .value {
              font-family: monospace;
              font-size: 1rem;
              min-width: 40px;
              text-align: right;
            }

            .binary {
              font-family: monospace;
              font-size: 0.75rem;
              color: var(--color-surface-500);
              min-width: 80px;
            }
          }
        }
      }

      .display {
        text-align: center;
        font-family: monospace;
        font-size: 1.25rem;
        padding: 1rem;
        background: var(--color-surface-200);
        border-radius: var(--radius-base);
        margin-bottom: 1rem;
      }

      .insight {
        text-align: center;
        font-size: 1.125rem;
        margin: 1.5rem 0 0;
        padding: 1rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-base);
      }
    }
  }

  /* Sound */
  #sound {
    .metaphor {
      display: flex;
      gap: 1.5rem;
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid var(--color-surface-200);

      .icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          color: var(--color-surface-900);
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.125rem;
          margin-bottom: 1rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .wave-demo {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;
      border: 2px solid var(--color-surface-200);

      h3 {
        margin-bottom: 1.5rem;
      }

      .visual {
        background: var(--color-surface-50);
        border-radius: var(--radius-base);
        padding: 1.5rem;
        margin-bottom: 1rem;

        .svg {
          width: 100%;
          max-width: 500px;
          height: auto;
        }
      }

      .legend {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        font-size: 0.875rem;
        margin-bottom: 1rem;

        .analog {
          color: var(--color-primary-600);
        }

        .digital {
          color: var(--color-warning-600);
        }
      }

      .caption {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 0;
      }
    }
  }

  /* Formalization */
  #formalization {
    .formula {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2rem 2.5rem;
      margin: 2rem 0;
      text-align: center;

      h3 {
        margin-bottom: 1rem;
      }

      .display {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-primary-700);
        padding: 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-base);
        display: inline-block;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.125rem;
        margin: 0;
        color: var(--color-surface-600);
      }
    }
  }

  /* Summary */
  #summary {
    blockquote {
      border-left: 4px solid var(--color-success-500);
      padding-left: 1rem;
      margin: 1.5rem 0;
    }

    p {
      font-size: 1.25rem;
      margin: 0;
      color: var(--color-surface-700);
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #pixels {
      .metaphor {
        flex-direction: column;
      }

      .simulation {
        .grid-wrapper {
          flex-direction: column;
          align-items: center;
        }

        .editor {
          .cell {
            width: 32px;
            height: 32px;
          }
        }
      }
    }

    #color {
      .simulation {
        .mixer {
          flex-direction: column;
        }

        .sliders {
          width: 100%;
          min-width: unset;

          .binary {
            display: none;
          }
        }
      }
    }

    #sound {
      .metaphor {
        flex-direction: column;
      }

      .wave-demo {
        .legend {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    }
  }
</style>
