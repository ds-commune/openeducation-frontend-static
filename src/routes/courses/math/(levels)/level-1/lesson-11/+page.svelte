<script lang="ts">
  import { Crisis, DefinitionCard, Summary } from "../../components";

  // Sheep-to-pebble simulation state
  let sheepInPen = $state<number[]>([]);
  const totalSheep = 7;

  function moveSheepToPen(sheepId: number) {
    if (!sheepInPen.includes(sheepId)) {
      sheepInPen = [...sheepInPen, sheepId];
    }
  }

  function removeSheepFromPen(sheepId: number) {
    sheepInPen = sheepInPen.filter((id) => id !== sheepId);
  }

  // Abstraction layers visualization
  let abstractionLevel = $state(0);
  const abstractionLevels = [
    { name: "Реальность", icon: "🍎" },
    { name: "Силуэты", icon: "⬤" },
    { name: "Точки", icon: "●" },
    { name: "Число", icon: "5" },
  ];

  // Object type selector for "fiveness" demo
  let objectType = $state(0);
  const objectTypes = ["🍎", "🚗", "🌍", "⚛️"];
  const objectNames = ["Яблоки", "Машины", "Планеты", "Атомы"];
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о происхождении чисел. Как люди научились отделять количество от предметов."
  />
</svelte:head>

<section id="crisis">
  <Crisis icon="🐑" title="Проблема богатого пастуха">
    <p>
      Перенесёмся в доисторическую эпоху. Ты — староста племени. У тебя огромное
      стадо овец, но в языке нет слов для точного количества. Только «один»,
      «два» и... «много».
    </p>
    <p>
      Тебе нужно договориться с соседним племенем об обмене овец на зерно. Но
      как передать посланнику <strong>точное</strong> количество овец, не отправляя
      само стадо?
    </p>

    {#snippet question()}
      <strong>Попытки:</strong> Пальцы? Не хватит рук. Зарубки на палке? Долго и ненадёжно.
      Камешки в мешке? Мешок становится слишком тяжёлым для тысячи овец.
    {/snippet}
  </Crisis>
</section>

<section id="intro">
  <div class="key-question">
    <p>
      <strong>Главный вопрос:</strong> как передать <em>суть</em> количества, избавившись
      от веса физических объектов? Как «забрать» число у овец, не забирая самих овец?
    </p>
  </div>
</section>

<!-- Section 1: One-to-one correspondence -->
<section id="correspondence">
  <h2>Пары существования</h2>

  <p>
    Первый шаг к числу — понять, что неважно, <em>что</em> мы считаем. Важен сам факт
    наличия пары «объект — метка». Каждая овца получает свой камешек. Камни разные,
    овцы разные — но связь между ними одинакова.
  </p>

  <div class="simulation" aria-label="Симуляция пар овца-камень">
    <div class="panel pasture">
      <h3>🌿 Пастбище</h3>
      <div class="grid">
        {#each Array(totalSheep) as _, i}
          {#if !sheepInPen.includes(i)}
            <button
              class="item"
              onclick={() => moveSheepToPen(i)}
              aria-label="Переместить овцу {i + 1} в загон"
            >
              🐑
            </button>
          {/if}
        {/each}
      </div>
    </div>

    <div class="arrow">→</div>

    <div class="panel pen">
      <h3>🏠 Загон</h3>
      <div class="grid">
        {#each sheepInPen as sheepId}
          <button
            class="item in-pen"
            onclick={() => removeSheepFromPen(sheepId)}
            aria-label="Вернуть овцу на пастбище"
          >
            🐑
          </button>
        {/each}
      </div>
    </div>

    <div class="arrow">≡</div>

    <div class="panel cave">
      <h3>🪨 Пещера</h3>
      <div class="grid">
        {#each sheepInPen as _}
          <span class="pebble">⬤</span>
        {/each}
      </div>
    </div>
  </div>

  <p class="hint">
    Нажми на овцу, чтобы переместить её в загон. Заметь: за каждой овцой
    появляется камень. Куча камней <strong>эквивалентна</strong> стаду овец по свойству
    «количество», хотя физически это разные вещи.
  </p>
</section>

<!-- Section 2: Abstraction -->
<section id="abstraction">
  <h2>Рентген реальности</h2>

  <p>
    Решаем проблему тяжёлого мешка. Мы понимаем, что 5 овец, 5 камней и 5 звёзд
    имеют что-то общее. Это «что-то» — невидимое свойство, которое остаётся,
    если мы уберём всю материю.
  </p>

  <div class="demo">
    <div class="layers">
      <div class="display">
        {#if abstractionLevel === 0}
          <div class="row real">
            <span>🍎</span>
            <span>🍐</span>
            <span>🍊</span>
            <span>🍋</span>
            <span>🍇</span>
          </div>
        {:else if abstractionLevel === 1}
          <div class="row silhouette">
            <span>🍎</span>
            <span>🍐</span>
            <span>🍊</span>
            <span>🍋</span>
            <span>🍇</span>
          </div>
        {:else if abstractionLevel === 2}
          <div class="row dots">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        {:else}
          <div class="reveal">5</div>
        {/if}
      </div>

      <div class="controls">
        <input
          type="range"
          min="0"
          max="3"
          bind:value={abstractionLevel}
          aria-label="Уровень абстракции"
        />
        <div class="labels">
          {#each abstractionLevels as level, i}
            <span class:active={abstractionLevel === i}>{level.name}</span>
          {/each}
        </div>
      </div>
    </div>

    <p class="caption">
      Передвинь ползунок: от реальных объектов → к силуэтам → к точкам → к
      чистому числу. <strong>Число — это «душа» кучи</strong>, которая остаётся,
      если убрать всё вещественное.
    </p>
  </div>
</section>

<!-- Section 3: Fiveness -->
<section id="fiveness">
  <h2>«Пятёрочность»</h2>

  <p>
    Вводим имена для этих «душ». Вместо того чтобы носить с собой эталон
    (камни), мы договариваемся о звуке или значке, который вызывает в голове
    образ нужного количества.
  </p>

  <div class="demo">
    <div class="switcher">
      {#each objectTypes as obj, i}
        <button
          class="btn"
          class:active={objectType === i}
          onclick={() => (objectType = i)}
          aria-label="Показать {objectNames[i]}"
        >
          {obj}
        </button>
      {/each}
    </div>

    <div class="display">
      <div class="dice">
        <span class="item">{objectTypes[objectType]}</span>
        <div class="row">
          <span class="item">{objectTypes[objectType]}</span>
          <span class="item">{objectTypes[objectType]}</span>
        </div>
        <div class="row">
          <span class="item">{objectTypes[objectType]}</span>
          <span class="item">{objectTypes[objectType]}</span>
        </div>
      </div>
      <div class="label">
        <span class="name">{objectNames[objectType]}</span>
        <span class="equals">=</span>
        <span class="number">5</span>
      </div>
    </div>

    <p class="insight">
      Меняется картинка, но структура остаётся неизменной. «Пятёрочность»
      (fiveness) не зависит от того, что именно мы считаем.
    </p>
  </div>
</section>

<!-- Section 4: Formalization -->
<section id="formal">
  <h2>Формальный язык</h2>

  <DefinitionCard title="Множество">
    <p>Любая совокупность различимых объектов. Обозначаем буквами: A, B, C…</p>
  </DefinitionCard>

  <DefinitionCard title="Мощность множества">
    <p>
      То самое «общее свойство», которое мы выделили — количество элементов.
    </p>
    <div class="formula-container">
      <span class="formula">|A|</span> или
      <span class="formula">card(A)</span>
    </div>
    <p class="example">Если A = &#123;яблоко, груша, слива&#125;, то |A| = 3</p>
  </DefinitionCard>

  <div class="distinction">
    <div class="item">
      <div class="icon">💭</div>
      <div>
        <strong>Число</strong> — абстрактная идея количества (смысл)
      </div>
    </div>
    <div class="divider">vs</div>
    <div class="item">
      <div class="icon">✍️</div>
      <div>
        <strong>Цифра</strong> — значок для записи числа (символ)
      </div>
    </div>
  </div>

  <p>
    Разница — как между человеком и его фотографией. Фото может быть цветным,
    чёрно-белым, большим или маленьким — но человек один и тот же.
  </p>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <blockquote>
      Число — это не предмет. Число — это общее свойство множества предметов,
      такое же, как цвет или температура, но отвечающее на вопрос «Сколько?». Мы
      изобрели числа, чтобы управлять реальностью, не таская её за собой в
      мешках.
    </blockquote>
  </Summary>
</section>

<style>
  #crisis {
    p {
      margin-bottom: 1rem;
    }
  }

  #intro {
    .key-question {
      font-size: 1.5rem;
      text-align: center;
      padding: 1.5rem 2rem;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      margin: 2rem 0 3rem;
    }
  }

  #correspondence {
    .simulation {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--color-surface-50);
      border: 2px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      flex-wrap: wrap;
      justify-content: center;

      .panel {
        flex: 1;
        min-width: 140px;
        text-align: center;

        h3 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: var(--color-surface-700);
        }
      }

      .arrow {
        font-size: 2rem;
        color: var(--color-surface-400);
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        min-height: 60px;
      }

      .item {
        font-size: 2rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.2);
        }

        &.in-pen {
          filter: drop-shadow(0 0 4px var(--color-primary-400));
        }
      }

      .pebble {
        font-size: 1.5rem;
        color: var(--color-surface-600);
      }
    }

    .hint {
      font-size: 1.125rem;
      color: var(--color-surface-600);
      text-align: center;
      margin-top: 1rem;
    }

    @media (max-width: 1100px) {
      .simulation {
        flex-direction: column;
        gap: 1.5rem;
      }

      .arrow {
        transform: rotate(90deg);
      }
    }
  }

  #abstraction {
    .demo {
      background: var(--color-surface-50);
      border: 2px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .layers {
        .display {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;

          .row {
            display: flex;
            gap: 1.5rem;
            font-size: 3rem;

            &.silhouette span {
              filter: brightness(0) saturate(100%) opacity(0.6);
            }

            &.dots span {
              font-size: 2rem;
              color: var(--color-surface-700);
            }
          }

          .reveal {
            font-size: 4.5rem;
            font-weight: 700;
            color: var(--color-primary-600);
            animation: pulse 1s ease-in-out infinite alternate;
          }
        }

        .controls {
          max-width: 400px;
          margin: 0 auto;

          input[type="range"] {
            width: 100%;
            margin-bottom: 0.75rem;
            accent-color: var(--color-primary-500);
          }

          .labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: var(--color-surface-500);

            span.active {
              font-weight: 600;
              color: var(--color-primary-700);
            }
          }
        }
      }

      .caption {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 1.5rem 0 0;
      }
    }

    @keyframes pulse {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.1);
      }
    }

    @media (max-width: 1100px) {
      .demo {
        .layers {
          .display {
            height: 90px;

            .row {
              font-size: 2rem;
              gap: 0.75rem;
            }
            .reveal {
              font-size: 3.5rem;
            }
          }
        }
      }
    }
  }

  #fiveness {
    .demo {
      background: var(--color-surface-50);
      border: 2px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .switcher {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;

        .btn {
          font-size: 2rem;
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-surface-300);
          border-radius: calc(var(--radius-container) * 0.5);
          background: white;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            border-color: var(--color-primary-400);
          }

          &.active {
            border-color: var(--color-primary-600);
            background: var(--color-primary-50);
          }
        }
      }

      .display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;

        .dice {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;

          .row {
            display: flex;
            gap: 2rem;
          }

          .item {
            font-size: 2.5rem;
          }
        }

        .label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;

          .name {
            color: var(--color-surface-600);
          }

          .equals {
            color: var(--color-surface-400);
          }

          .number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-primary-600);
          }
        }
      }

      .insight {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 1.5rem 0 0;
      }
    }

    @media (max-width: 1100px) {
      .demo .display .dice .item {
        font-size: 2rem;
      }
    }
  }

  #formal {
    .formula-container {
      background: white;
      padding: 1rem 1.5rem;
      border-radius: calc(var(--radius-container) * 0.5);
      display: inline-block;
      margin: 0.5rem 0;

      .formula {
        font-family: "Consolas", "Monaco", monospace;
        font-size: 1.375rem;
        color: var(--color-primary-700);
      }
    }

    .example {
      font-size: 1.125rem;
      color: var(--color-surface-600);
      margin-top: 0.5rem;
    }

    .distinction {
      display: flex;
      align-items: center;
      gap: 2rem;
      background: var(--color-surface-50);
      border: 2px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      justify-content: center;

      .item {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.25rem;

        .icon {
          font-size: 2rem;
        }
      }

      .divider {
        font-size: 1.125rem;
        color: var(--color-surface-400);
        font-weight: 600;
      }
    }

    @media (max-width: 1100px) {
      .distinction {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
</style>
