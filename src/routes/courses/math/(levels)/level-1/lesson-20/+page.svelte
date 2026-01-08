<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  // Fairness generator: people around fire
  let fairnessLevel = $state(0);
  const maxFairness = 100;

  // Initial positions (scattered around fire but not inside)
  const initialPositions = [
    { x: 20, y: 30 },
    { x: 80, y: 25 },
    { x: 15, y: 70 },
    { x: 85, y: 75 },
    { x: 45, y: 15 },
    { x: 55, y: 85 },
    { x: 30, y: 50 },
    { x: 70, y: 55 },
  ];

  // Circle positions (equidistant from center)
  const circleRadius = 35;
  const centerX = 50;
  const centerY = 50;

  // Calculate target slots (8 positions on circle)
  const targetSlots = initialPositions.map((_, i) => {
    const angle = (i / initialPositions.length) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + circleRadius * Math.cos(angle),
      y: centerY + circleRadius * Math.sin(angle),
      angle,
    };
  });

  // Assign each person to their nearest slot (greedy algorithm)
  // Each person finds their nearest available slot
  function assignPersonsToSlots() {
    const assignments: number[] = new Array(initialPositions.length).fill(-1);
    const usedSlots = new Set<number>();

    // For each person, find the nearest available slot
    // We iterate multiple times to resolve conflicts
    const personDistances = initialPositions.map((pos, personIdx) => {
      return targetSlots.map((slot, slotIdx) => ({
        personIdx,
        slotIdx,
        distance: Math.sqrt((pos.x - slot.x) ** 2 + (pos.y - slot.y) ** 2),
      }));
    });

    // Flatten and sort by distance
    const allDistances = personDistances
      .flat()
      .sort((a, b) => a.distance - b.distance);

    // Greedy assignment: take the shortest distance that doesn't conflict
    for (const { personIdx, slotIdx } of allDistances) {
      if (assignments[personIdx] === -1 && !usedSlots.has(slotIdx)) {
        assignments[personIdx] = slotIdx;
        usedSlots.add(slotIdx);
      }
    }

    return assignments;
  }

  const slotAssignments = assignPersonsToSlots();

  const personPositions = $derived(
    initialPositions.map((pos, i) => {
      const t = fairnessLevel / maxFairness;
      const targetSlot = targetSlots[slotAssignments[i]];

      // Simple linear interpolation - people move directly to their assigned slot
      return {
        x: pos.x + (targetSlot.x - pos.x) * t,
        y: pos.y + (targetSlot.y - pos.y) * t,
      };
    })
  );

  const fairnessAchieved = $derived(fairnessLevel >= 95);

  // Crash test simulation
  let squareCollapsed = $state(false);
  let triangleLoaded = $state(false);
  let diagonalAdded = $state(false);

  function applyLoad() {
    squareCollapsed = !diagonalAdded;
    triangleLoaded = true;
  }

  function resetCrashTest() {
    squareCollapsed = false;
    triangleLoaded = false;
  }

  function toggleDiagonal() {
    diagonalAdded = !diagonalAdded;
    resetCrashTest();
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о геометрических формах и их функциях. Почему круг — форма справедливости, треугольник — прочности, а квадрат — порядка."
  />
</svelte:head>

<!-- Крючок: Сломанный мир -->
<Section id="crisis">
  <Crisis icon="🔧" title="Сломанный мир">
    <p>
      Представьте мир, где перепутаны все формы. Велосипед едет на
      <strong>квадратных</strong> колёсах — вас постоянно трясёт. Мыльный пузырь
      имеет форму <strong>пирамиды</strong> — он мгновенно лопается на острых
      углах. Дом построен в виде перевёрнутого
      <strong>шара</strong> — он катится и падает.
    </p>

    <div class="visual">
      <div class="item">
        <span class="emoji">🚲</span>
        <span class="shape">◼️◼️</span>
        <span class="effect">трясётся!</span>
      </div>
      <div class="item">
        <span class="emoji">🫧</span>
        <span class="shape">△</span>
        <span class="effect">лопается!</span>
      </div>
      <div class="item">
        <span class="emoji">🏠</span>
        <span class="shape">⚪</span>
        <span class="effect">катится!</span>
      </div>
    </div>

    <blockquote>
      Почему природа и инженеры выбирают именно эти формы? Круг — для колёс,
      сфера — для пузырей, прямоугольник — для домов. Это просто красота или
      математическая необходимость?
    </blockquote>
  </Crisis>
</Section>

<!-- Часть А: Круг -->
<Section
  id="circle"
  title="Круг — форма равноправия"
  description="Представьте холодную ночь у костра. Где встанут люди, чтобы всем было одинаково тепло? Если выстроиться квадратом, тем, кто в углах, будет холоднее — они дальше от огня. Но если встать кругом, каждый находится на одинаковом расстоянии от центра."
>
  <DefinitionCard>
    <p>
      <strong>Круг</strong> — это линия, где каждая точка находится на
      <strong>одинаковом расстоянии</strong> от центра. Это форма справедливости:
      никто не ближе и не дальше.
    </p>
  </DefinitionCard>

  <p>
    В природе круг (и его 3D-версия — сфера) ещё и самая
    <strong>экономная</strong> форма. Мыльный пузырь принимает форму шара, потому
    что так поверхность минимальна при максимальном объёме. Природа не любит тратить
    лишнее.
  </p>

  <!-- Интерактив: Генератор справедливости -->
  <div class="demo-card">
    <h3>Генератор «справедливости»</h3>
    <p class="instruction">
      В центре горит костёр. Вокруг — люди. Двигайте слайдер, чтобы уравнять
      тепло для всех.
    </p>

    <div class="demo-content">
      <svg
        viewBox="0 0 100 100"
        class="fire-circle"
        aria-label="Симуляция людей вокруг костра"
      >
        <!-- Огонь в центре -->
        <circle cx="50" cy="50" r="8" class="fire" />
        <text x="50" y="53" text-anchor="middle" class="fire-label">🔥</text>

        <!-- Люди -->
        {#each personPositions as pos}
          <circle
            cx={pos.x}
            cy={pos.y}
            r="4"
            class="person"
            class:warm={fairnessAchieved}
          />
        {/each}

        <!-- Круг справедливости (появляется при достижении) -->
        {#if fairnessAchieved}
          <circle
            cx="50"
            cy="50"
            r={circleRadius}
            class="fairness-circle"
            fill="none"
            stroke-dasharray="4 2"
          />
        {/if}
      </svg>

      <div class="control">
        <label for="fairness-slider">Уравнять тепло:</label>
        <input
          id="fairness-slider"
          type="range"
          min="0"
          max="100"
          bind:value={fairnessLevel}
          class="slider"
          aria-label="Уровень справедливости распределения тепла"
        />
        <span class="value">{fairnessLevel}%</span>
      </div>

      {#if fairnessAchieved}
        <div class="result success">
          ✓ Равновесие достигнуто. Форма: <strong>круг</strong>.
        </div>
      {/if}
    </div>
  </div>
</Section>

<!-- Часть Б: Треугольник -->
<Section
  id="triangle"
  title="Треугольник — форма жёсткости"
  description="Почему мосты, краны и Эйфелева башня состоят из треугольников? Дело в том, что треугольник — это самая жёсткая плоская фигура."
>
  <p>
    Сравните: если надавить на угол квадрата, он легко сложится в ромб — углы
    изменятся, хотя стороны останутся целыми. Квадрат — «мягкая» форма. Но у
    треугольника <strong>три стороны однозначно задают три угла</strong>. Чтобы
    изменить форму треугольника, нужно сломать саму сторону.
  </p>

  <DefinitionCard>
    <p>
      <strong>Треугольник</strong> — единственный многоугольник, который нельзя деформировать,
      не сломав стороны. Это геометрия прочности.
    </p>
  </DefinitionCard>

  <!-- Интерактив: Краш-тест -->
  <div class="demo-card">
    <h3>Краш-тест конструкций</h3>

    <div class="crash-test">
      <div class="visuals">
        <div class="structure">
          <div class="label">Квадратная рамка</div>
          <svg
            viewBox="0 0 100 100"
            class="canvas"
            aria-label="Квадратная конструкция"
          >
            {#if diagonalAdded}
              <line x1="20" y1="20" x2="80" y2="80" class="diagonal" />
            {/if}
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              class="frame"
              class:collapsed={squareCollapsed}
              fill="none"
            />
            {#if squareCollapsed}
              <text x="50" y="95" text-anchor="middle" class="status fail"
                >💥 сложилась</text
              >
            {:else if triangleLoaded && diagonalAdded}
              <text x="50" y="95" text-anchor="middle" class="status ok"
                >✓ держит!</text
              >
            {/if}
          </svg>
        </div>

        <div class="structure">
          <div class="label">Треугольная рамка</div>
          <svg
            viewBox="0 0 100 100"
            class="canvas"
            aria-label="Треугольная конструкция"
          >
            <polygon
              points="50,15 15,85 85,85"
              class="frame triangle"
              class:loaded={triangleLoaded}
              fill="none"
            />
            {#if triangleLoaded}
              <text x="50" y="95" text-anchor="middle" class="status ok"
                >✓ держит!</text
              >
            {/if}
          </svg>
        </div>
      </div>

      <div class="controls">
        <button
          class="btn preset-filled-primary-500"
          onclick={applyLoad}
          aria-label="Приложить нагрузку"
        >
          ⬇️ Приложить нагрузку
        </button>
        <button
          class="btn preset-tonal"
          onclick={resetCrashTest}
          aria-label="Сбросить"
        >
          ↺ Сбросить
        </button>
        <button
          class="btn {diagonalAdded
            ? 'preset-filled-success-500'
            : 'preset-outlined-surface-500'}"
          onclick={toggleDiagonal}
          aria-label="Добавить диагональ в квадрат"
        >
          {diagonalAdded ? "✓ Диагональ добавлена" : "+ Добавить диагональ"}
        </button>
      </div>

      {#if squareCollapsed && !diagonalAdded}
        <div class="hint">
          💡 Попробуйте добавить диагональ в квадрат — это превратит его в два
          треугольника!
        </div>
      {/if}
    </div>
  </div>
</Section>

<!-- Часть В: Квадрат -->
<Section
  id="square"
  title="Квадрат — форма порядка"
  description="Круги неудобно хранить — между ними остаются пустоты. Треугольники острые и неудобные. А вот квадраты и прямоугольники идеально прилегают друг к другу, заполняя пространство без зазоров."
>
  <div class="comparison">
    <div class="warehouse">
      <div class="label">Склад с бочками</div>
      <div class="visual circles">
        <div class="row">
          <span class="item circle">○</span>
          <span class="item circle">○</span>
          <span class="item circle">○</span>
        </div>
        <div class="row">
          <span class="item circle">○</span>
          <span class="item circle">○</span>
          <span class="item circle">○</span>
        </div>
        <div class="row">
          <span class="item circle">○</span>
          <span class="item circle">○</span>
          <span class="item circle">○</span>
        </div>
        <div class="indicator waste">~15% потерь места</div>
      </div>
    </div>

    <div class="warehouse">
      <div class="label">Склад с контейнерами</div>
      <div class="visual boxes">
        <div class="row">
          <span class="item box">▢</span>
          <span class="item box">▢</span>
          <span class="item box">▢</span>
        </div>
        <div class="row">
          <span class="item box">▢</span>
          <span class="item box">▢</span>
          <span class="item box">▢</span>
        </div>
        <div class="row">
          <span class="item box">▢</span>
          <span class="item box">▢</span>
          <span class="item box">▢</span>
        </div>
        <div class="indicator efficiency">100% заполнение!</div>
      </div>
    </div>
  </div>

  <DefinitionCard>
    <p>
      <strong>Квадрат</strong> — паркетная фигура. Четыре угла по 90° в сумме дают
      360° — идеальное покрытие плоскости без зазоров. Кирпичи, коробки, пиксели экрана
      — всё это квадраты.
    </p>
  </DefinitionCard>
</Section>

<Section
  id="math-language"
  title="Математический язык"
  description="Переведём наши открытия на язык математики:"
>
  <div class="cards">
    <div class="card">
      <div class="shape">○</div>
      <div class="content">
        <div class="name">Круг</div>
        <div class="text">
          Множество точек, равноудалённых от центра. Радиус R = const.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="shape">△</div>
      <div class="content">
        <div class="name">Треугольник</div>
        <div class="text">
          Три стороны однозначно задают три угла. Жёсткая фигура.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="shape">□</div>
      <div class="content">
        <div class="name">Квадрат</div>
        <div class="text">
          Сумма углов в точке стыка = 360°. Идеальное покрытие плоскости.
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Практика -->
<Section id="practice" title="Проверь понимание">
  <div class="quiz-list">
    <QuizCard icon="🕳️">
      <div class="question">
        <strong>Канализационный люк:</strong> почему крышки люков почти всегда круглые,
        а не квадратные?
      </div>
      {#snippet answer()}
        <p>
          Круглую крышку невозможно уронить в люк — диаметр одинаков со всех
          сторон. А квадратную можно уронить по диагонали, ведь диагональ
          длиннее стороны.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🐝">
      <div class="question">
        <strong>Пчелиные соты:</strong> пчёлам нужно сэкономить воск и максимизировать
        место для мёда. Почему они выбрали шестиугольник?
      </div>
      {#snippet answer()}
        <p>
          Шестиугольник — компромисс. Он почти круглый (экономный), но при этом
          стыкуется без зазоров, как плитка. Круги оставляют дыры, квадраты
          менее экономны по периметру.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🍕">
      <div class="question">
        <strong>Пицца:</strong> почему пицца круглая, коробка квадратная, а едим мы
        её треугольниками?
      </div>
      {#snippet answer()}
        <p>
          Круг — легко раскатать тесто от центра. Квадрат — коробку легко
          сложить из картона. Треугольник — честный способ поделить круг на
          равные части.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Форма в математике и природе — это не случайность, а
      <strong>функция</strong>. Нужно сохранить расстояние или сэкономить
      материал? → <strong>Круг</strong>. Нужна прочность? →
      <strong>Треугольник</strong>. Нужен порядок и плотная укладка? →
      <strong>Квадрат</strong>. Мы учимся видеть не просто фигуры, а инженерные
      решения, которые они несут.
    </p>
  </Summary>
</Section>

<style>
  /* Crisis */
  :global(#crisis) {
    .visual {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      flex-wrap: wrap;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-950) 0.05, transparent);
        min-width: 80px;

        .emoji {
          font-size: 2.5rem;
        }

        .shape {
          font-size: 1.5rem;
          color: var(--color-error-500);
        }

        .effect {
          font-size: 0.875rem;
          color: var(--color-error-600);
          font-weight: 600;
        }
      }
    }

    blockquote {
      margin: 1.5rem 0;
      color: var(--color-surface-700);
    }
  }

  /* Circle Section */
  :global(#circle) {
    .demo-card {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

      h3 {
        margin-top: 0;
        color: var(--color-primary-700);
      }
    }

    .instruction {
      font-size: 1.125rem;
      color: var(--color-surface-600);
      margin-bottom: 1.5rem;
    }

    .demo-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .fire-circle {
      width: 100%;
      max-width: 400px;
      height: auto;
      background: var(--color-surface-200);
      border-radius: calc(var(--radius-container) * 4);
    }

    .fire {
      fill: var(--color-warning-300);
    }

    .fire-label {
      font-size: 0.8rem;
    }

    .person {
      fill: var(--color-surface-500);
      transition: all 0.3s ease;

      &.warm {
        fill: var(--color-success-700);
        stroke: white;
        stroke-width: 1px;
      }
    }

    .fairness-circle {
      stroke: var(--color-success-400);
      stroke-width: 1;
    }

    .control {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      max-width: 400px;

      label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-surface-700);
        white-space: nowrap;
      }

      .slider {
        flex: 1;
        height: 8px;
        accent-color: var(--color-primary-500);
        cursor: pointer;
      }

      .value {
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-primary-600);
        min-width: 50px;
        text-align: right;
      }
    }

    .result {
      padding: 1rem 1.5rem;
      border-radius: var(--radius-container);
      font-size: 1.125rem;
      font-weight: 600;

      &.success {
        background: var(--color-success-100);
        color: var(--color-success-700);
      }
    }
  }

  /* Triangle Section */
  :global(#triangle) {
    .demo-card {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-950) 0.05, transparent);
    }

    .crash-test {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .visuals {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: center;
        gap: 2rem;

        .structure {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;

          .label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-700);
          }

          .canvas {
            width: 100%;
            max-width: 180px;
            height: auto;
            background: var(--color-surface-100);
            border-radius: var(--radius-container);
          }

          .frame {
            stroke: var(--color-surface-600);
            stroke-width: 4;
            transition: all 0.3s ease;

            &.collapsed {
              transform: skewX(-15deg);
              stroke: var(--color-error-500);
            }

            &.triangle.loaded {
              stroke: var(--color-success-500);
            }
          }

          .diagonal {
            stroke: var(--color-primary-500);
            stroke-width: 3;
            stroke-dasharray: 5 3;
          }

          .status {
            font-size: 0.7rem;

            &.fail {
              fill: var(--color-error-600);
            }

            &.ok {
              fill: var(--color-success-600);
            }
          }
        }
      }

      .controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;

        .btn {
          /* Inherits Skeleton button styles via class="btn" */
          font-weight: 600;
        }
      }

      .hint {
        padding: 1rem;
        background: var(--color-warning-50);
        border-radius: var(--radius-container);
        font-size: 1rem;
        color: var(--color-warning-700);
        text-align: center;
      }
    }
  }

  /* Square Section */
  :global(#square) {
    .comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 2rem 0;

      .warehouse {
        padding: 1.5rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 4);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

        .label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-700);
          margin-bottom: 1rem;
          text-align: center;
        }

        .visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: var(--radius-container);

          .row {
            display: flex;
            gap: 0.25rem;
          }

          .item {
            font-size: 2rem;
            line-height: 0.8;

            &.circle {
              color: var(--color-surface-400);
            }

            &.box {
              color: var(--color-primary-500);
            }
          }

          .indicator {
            margin-top: 0.75rem;
            padding: 0.5rem 1rem;
            border-radius: var(--radius-container);
            font-size: 0.875rem;
            font-weight: 600;

            &.waste {
              background: var(--color-error-100);
              color: var(--color-error-700);
            }

            &.efficiency {
              background: var(--color-success-100);
              color: var(--color-success-700);
            }
          }
        }
      }
    }
  }

  /* Math Language Section */
  :global(#math-language) {
    .cards {
      display: grid;
      gap: 1.5rem;

      .card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 4);
        border: 2px solid var(--color-surface-200);

        .shape {
          font-size: 3rem;
          color: var(--color-primary-500);
          line-height: 1;
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
  }

  /* Practice Section */
  :global(#practice) {
    .quiz-list {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800);
        margin-bottom: 1rem;
      }
    }
  }

  /* Summary Section */
  :global(#summary) {
    p {
      font-size: 1.25rem;
      margin: 0;
      color: var(--color-surface-700);
      line-height: 1.6;
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    :global(#broken-world) {
      .visual {
        gap: 1rem;
      }
    }

    :global(#square) {
      .comparison {
        grid-template-columns: 1fr;

        .warehouse {
          .item {
            line-height: 0.5;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    :global(#triangle) {
      .visuals {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
