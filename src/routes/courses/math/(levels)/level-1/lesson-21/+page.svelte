<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  // Ray casting demo state
  let rayDemoPoint = $state<{ x: number; y: number } | null>(null);
  let rayEndPoint = $state<{ x: number; y: number } | null>(null);
  let rayResult = $state<{ count: number; isInside: boolean } | null>(null);

  // Simple closed curve path (complex tangled shape)
  const curvePath = `M 150,50 
    C 200,30 250,80 220,120 
    C 190,160 250,200 200,230 
    C 150,260 100,220 80,180 
    C 60,140 30,160 50,120 
    C 70,80 100,70 150,50 Z`;

  // Simplified polygon for interSection calculation
  const curvePolygon = [
    { x: 150, y: 50 },
    { x: 220, y: 120 },
    { x: 200, y: 230 },
    { x: 80, y: 180 },
    { x: 50, y: 120 },
  ];

  function countInterSections(
    px: number,
    py: number,
    ex: number,
    ey: number
  ): number {
    let count = 0;
    const n = curvePolygon.length;

    for (let i = 0; i < n; i++) {
      const p1 = curvePolygon[i];
      const p2 = curvePolygon[(i + 1) % n];

      if (segmentsIntersect(px, py, ex, ey, p1.x, p1.y, p2.x, p2.y)) {
        count++;
      }
    }
    return count;
  }

  function segmentsIntersect(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): boolean {
    const d1 = direction(x3, y3, x4, y4, x1, y1);
    const d2 = direction(x3, y3, x4, y4, x2, y2);
    const d3 = direction(x1, y1, x2, y2, x3, y3);
    const d4 = direction(x1, y1, x2, y2, x4, y4);

    if (
      ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
    ) {
      return true;
    }
    return false;
  }

  function direction(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): number {
    return (x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1);
  }

  function handleSvgClick(event: MouseEvent) {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 300;
    const y = ((event.clientY - rect.top) / rect.height) * 300;

    if (!rayDemoPoint) {
      rayDemoPoint = { x, y };
      rayResult = null;
    } else if (!rayEndPoint) {
      const dx = x - rayDemoPoint.x;
      const dy = y - rayDemoPoint.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      const scale = length > 0 ? 500 / length : 1;
      const extendedX = rayDemoPoint.x + dx * scale;
      const extendedY = rayDemoPoint.y + dy * scale;

      rayEndPoint = { x: extendedX, y: extendedY };
      const count = countInterSections(
        rayDemoPoint.x,
        rayDemoPoint.y,
        rayEndPoint.x,
        rayEndPoint.y
      );
      rayResult = { count, isInside: count % 2 === 1 };
    }
  }

  function resetRayDemo() {
    rayDemoPoint = null;
    rayEndPoint = null;
    rayResult = null;
  }

  // Toggle demo: crossing count
  let crossingCount = $state(0);
  const startedInside = true;
  const currentlyInside = $derived((crossingCount % 2 === 0) === startedInside);

  function addCrossing() {
    crossingCount++;
  }

  function resetCrossings() {
    crossingCount = 0;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о топологии: как определить, находится ли точка внутри или снаружи замкнутой линии. Алгоритм луча."
  />
</svelte:head>

<!-- Крючок: Лабиринт без стен -->
<Section id="crisis">
  <Crisis icon="🌀" title="Лабиринт без стен">
    <p>
      Представьте невероятно запутанную линию — как спутанные наушники, только
      концы соединены. Это одна замкнутая петля, но она настолько сложная, что
      глаз теряется при попытке проследить контур.
    </p>

    <div class="visual">
      <svg
        viewBox="0 0 300 300"
        class="tangled-svg"
        aria-label="Запутанная замкнутая линия"
      >
        <path d={curvePath} class="tangled-path" fill="none" />
        <circle cx="140" cy="140" r="8" class="point-a" />
        <text x="140" y="125" text-anchor="middle" class="point-label">А</text>
        <circle cx="260" cy="60" r="8" class="point-b" />
        <text x="260" y="45" text-anchor="middle" class="point-label">Б</text>
      </svg>
    </div>

    {#snippet question()}
      <strong>Проблема:</strong> где находится точка А — внутри петли или снаружи?
      Как, не прослеживая линию пальцем, мгновенно это доказать?
    {/snippet}
  </Crisis>
</Section>

<!-- Шаг 1: Простота круга -->
<Section id="island-concept" title="Остров и океан">
  <p>
    Начнём с простого. Представьте остров посреди океана. Линия берега — это <strong
      >граница</strong
    >. Если вы на острове и хотите попасть в океан, вы <strong>обязаны</strong> пересечь
    линию берега.
  </p>

  <div class="visual">
    <svg viewBox="0 0 300 200" class="island-svg" aria-label="Остров и океан">
      <rect x="0" y="0" width="300" height="200" class="ocean" />
      <ellipse cx="150" cy="100" rx="80" ry="50" class="island" />
      <text x="150" y="105" text-anchor="middle" class="label island-text"
        >остров</text
      >
      <text x="40" y="40" text-anchor="middle" class="label ocean-text"
        >океан</text
      >
    </svg>
  </div>

  <DefinitionCard label="Ключевое наблюдение">
    <p>
      Один шаг через границу <strong>меняет ваш статус</strong>: были «внутри» —
      стали «снаружи». И наоборот.
    </p>
  </DefinitionCard>
</Section>

<!-- Шаг 2: Метод лазерного луча -->
<Section id="ray-method" title="Метод лазерного луча">
  <p>
    Теперь вернёмся к нашей сложной фигуре. Представьте, что герой стреляет <strong
      >лучом света</strong
    > в любом направлении до бесконечности. Луч — это прямая линия.
  </p>

  <div class="grid">
    <div class="item">
      <svg viewBox="0 0 150 150" class="ray-svg" aria-label="Луч изнутри круга">
        <circle cx="75" cy="75" r="50" class="boundary" fill="none" />
        <circle cx="75" cy="75" r="6" class="point inside" />
        <line x1="75" y1="75" x2="150" y2="75" class="ray" />
        <circle cx="125" cy="75" r="4" class="interSection" />
      </svg>
      <div class="caption">изнутри: <strong>1</strong> пересечение</div>
    </div>

    <div class="item">
      <svg
        viewBox="0 0 150 150"
        class="ray-svg"
        aria-label="Луч снаружи сквозь круг"
      >
        <circle cx="75" cy="75" r="50" class="boundary" fill="none" />
        <circle cx="10" cy="75" r="6" class="point outside" />
        <line x1="10" y1="75" x2="150" y2="75" class="ray" />
        <circle cx="25" cy="75" r="4" class="interSection" />
        <circle cx="125" cy="75" r="4" class="interSection" />
      </svg>
      <div class="caption">сквозь: <strong>2</strong> пересечения</div>
    </div>

    <div class="item">
      <svg viewBox="0 0 150 150" class="ray-svg" aria-label="Луч мимо круга">
        <circle cx="75" cy="75" r="50" class="boundary" fill="none" />
        <circle cx="20" cy="15" r="6" class="point outside" />
        <line x1="20" y1="15" x2="150" y2="15" class="ray" />
      </svg>
      <div class="caption">мимо: <strong>0</strong> пересечений</div>
    </div>
  </div>
</Section>

<!-- Шаг 3: Чётность и нечётность -->
<Section id="toggle-rule" title="Правило переключателя">
  <p>
    Каждое пересечение границы — это <strong>щелчок выключателя</strong>.
    Представьте: вы начинаете внутри комнаты. Каждый раз, проходя через дверь,
    вы меняете своё положение.
  </p>

  <div class="container">
    <div class="visual">
      <div class="track">
        {#each Array(Math.min(crossingCount, 6)) as _, i}
          <div class="step" class:inside={(i % 2 === 1) === startedInside}>
            {i + 1}
          </div>
        {/each}
      </div>
      <div class="status" class:inside={currentlyInside}>
        {currentlyInside ? "🏠 Внутри" : "🌍 Снаружи"}
      </div>
    </div>

    <div class="info">
      <div class="counter">
        Пересечений: <strong>{crossingCount}</strong>
        ({crossingCount % 2 === 0 ? "чётное" : "нечётное"})
      </div>
    </div>

    <div class="controls">
      <button
        class="btn-cross"
        onclick={addCrossing}
        aria-label="Пересечь границу"
      >
        🚪 Пересечь границу
      </button>
      <button class="btn-reset" onclick={resetCrossings} aria-label="Сбросить">
        ↺ Сбросить
      </button>
    </div>
  </div>

  <div class="rules">
    <div class="card odd">
      <div class="icon">1, 3, 5...</div>
      <div class="text">
        <strong>Нечётное</strong> число пересечений = ты
        <strong>сменил</strong> положение
      </div>
    </div>
    <div class="card even">
      <div class="icon">0, 2, 4...</div>
      <div class="text">
        <strong>Чётное</strong> число пересечений = ты
        <strong>остался</strong> на месте
      </div>
    </div>
  </div>
</Section>

<!-- Интерактив: Побег из путаницы -->
<Section
  id="interactive-ray"
  title="Побег из путаницы"
  description="Кликните внутри фигуры, чтобы поставить точку, затем кликните ещё раз, чтобы выпустить луч. Система посчитает пересечения."
>
  <div class="demo">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <svg
      viewBox="0 0 300 300"
      class="svg-canvas"
      onclick={handleSvgClick}
      aria-label="Интерактивная демонстрация алгоритма луча. Кликните для взаимодействия."
      role="application"
    >
      <path d={curvePath} class="path" fill="none" />

      {#if rayDemoPoint}
        <circle cx={rayDemoPoint.x} cy={rayDemoPoint.y} r="8" class="point" />
      {/if}

      {#if rayDemoPoint && rayEndPoint}
        <line
          x1={rayDemoPoint.x}
          y1={rayDemoPoint.y}
          x2={rayEndPoint.x}
          y2={rayEndPoint.y}
          class="ray"
        />
      {/if}
    </svg>

    {#if rayResult}
      <div class="result" class:inside={rayResult.isInside}>
        <strong>{rayResult.count}</strong> пересечений.
        {rayResult.count % 2 === 0 ? "Чётно" : "Нечётно"}. Точка была
        <strong>{rayResult.isInside ? "ВНУТРИ" : "СНАРУЖИ"}</strong>.
      </div>
    {:else if rayDemoPoint && !rayEndPoint}
      <div class="hint">Кликните ещё раз, чтобы выпустить луч →</div>
    {:else}
      <div class="hint">Кликните, чтобы поставить точку</div>
    {/if}

    <button class="btn-reset" onclick={resetRayDemo} aria-label="Сбросить демо">
      ↺ Начать заново
    </button>
  </div>
</Section>

<!-- Шаг 4: Топологическая непрерывность -->
<Section id="topology" title="Резиновая граница">
  <p>
    Форма линии <strong>не важна</strong>. Круг, квадрат или клякса — если линия
    замкнута и не пересекает сама себя, она всегда делит мир ровно на
    <strong>две части</strong>: внутреннюю и внешнюю.
  </p>

  <div class="visual">
    <div class="card">
      <div class="icon">○</div>
      <div class="arrow">→</div>
      <div class="icon">◇</div>
      <div class="arrow">→</div>
      <div class="icon blob">◎</div>
    </div>
    <p class="note">
      Все эти формы <strong>топологически эквивалентны</strong> — точка внутри остаётся
      внутри при любой деформации без разрыва.
    </p>
  </div>
</Section>

<Section id="math-lang" title="Математический язык">
  <div class="grid">
    <div class="card">
      <div class="header">Жорданова кривая</div>
      <div class="body">
        Замкнутая кривая без самопересечений делит плоскость на два множества: <em
          >D</em
        ><sub>in</sub> (внутри) и <em>D</em><sub>out</sub> (снаружи).
      </div>
    </div>

    <div class="card">
      <div class="header">Алгоритм луча</div>
      <div class="body">
        Пусть <em>N</em> — число пересечений луча с границей.<br />
        Если <em>N</em> нечётное → точка <strong>внутри</strong>.<br />
        Если <em>N</em> чётное → точка <strong>снаружи</strong>.
      </div>
    </div>
  </div>
</Section>

<!-- Практика -->
<Section id="practice" title="Проверь понимание">
  <div class="quiz-list">
    <QuizCard icon="🧶" title="Верёвка">
      <div class="question">
        Вокруг тебя лежит верёвка, замкнутая в кольцо. Ты изначально был внутри
        и перешагнул через неё <strong>5 раз</strong>. Где ты сейчас?
      </div>
      {#snippet answer()}
        <p>
          <strong>Снаружи.</strong> 5 — нечётное число, значит, ты сменил положение.
          Был внутри → стал снаружи.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🕳️" title="Дырка в заборе">
      <div class="question">
        А если в заборе есть <strong>дырка</strong> (разрыв линии)? Работает ли правило
        чётности?
      </div>
      {#snippet answer()}
        <p>
          <strong>Нет.</strong> Если граница разорвана, понятия «внутри» и «снаружи»
          исчезают — пространство становится единым.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🐜" title="Муравей и птица">
      <div class="question">
        Круг нарисован на песке. Муравей внутри заперт. А если прилетит
        <strong>птица</strong>?
      </div>
      {#snippet answer()}
        <p>
          Птица свободна! В 2D линия — преграда, но в 3D нужен купол или сфера.
          Это введение в понятие <strong>размерности</strong>.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Граница — это то, что разделяет реальность на «здесь» и «там». Чтобы
      попасть из одного мира в другой, нужно совершить
      <strong>пересечение</strong>. В математике мы определяем своё
      местоположение не по виду стен, а по количеству шагов сквозь них:
      <strong>нечётное число шагов всегда ведёт в другой мир</strong>.
    </p>
  </Summary>
</Section>

<style>
  /* Crisis Section */
  :global(#crisis) {
    .visual {
      margin: 2rem 0;
      display: flex;
      justify-content: center;

      .tangled-svg {
        width: 100%;
        max-width: 300px;
        height: auto;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 20px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .tangled-path {
          stroke: var(--color-surface-500);
          stroke-width: 3;
        }

        .point-a {
          fill: var(--color-primary-500);
        }

        .point-b {
          fill: var(--color-error-500);
        }

        .point-label {
          font-size: 0.875rem;
          font-weight: 700;
          fill: var(--color-surface-900);
        }
      }
    }
  }

  /* Island Concept Section */
  :global(#island-concept) {
    .visual {
      margin: 2rem 0;
      display: flex;
      justify-content: center;

      .island-svg {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 20px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .ocean {
          fill: var(--color-primary-200);
        }

        .island {
          fill: var(--color-warning-200);
          stroke: var(--color-warning-400);
          stroke-width: 3;
        }

        .label {
          font-size: 1rem;
          font-weight: 600;

          &.island-text {
            fill: var(--color-surface-700);
          }

          &.ocean-text {
            font-size: 0.875rem;
            fill: var(--color-primary-800);
          }
        }
      }
    }
  }

  /* Ray Method Section */
  :global(#ray-method) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;

        .ray-svg {
          width: 100%;
          max-width: 150px;
          height: auto;
          background: var(--color-surface-50);
          border-radius: var(--radius-container);
          border: 2px solid var(--color-surface-200);

          .boundary {
            stroke: var(--color-surface-400);
            stroke-width: 3;
          }

          .point {
            transition: fill 0.3s;

            &.inside {
              fill: var(--color-primary-500);
            }

            &.outside {
              fill: var(--color-error-500);
            }
          }

          .ray {
            stroke: var(--color-warning-500);
            stroke-width: 2;
            stroke-dasharray: 5 3;
          }

          .interSection {
            fill: var(--color-error-500);
          }
        }

        .caption {
          font-size: 0.875rem;
          color: var(--color-surface-600);
          text-align: center;
        }
      }
    }
  }

  /* Toggle Rule Section */
  :global(#toggle-rule) {
    .container {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 20px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

      .visual {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        .track {
          display: flex;
          gap: 0.5rem;

          .step {
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            background: var(--color-error-100);
            color: var(--color-error-700);

            &.inside {
              background: var(--color-success-100);
              color: var(--color-success-700);
            }
          }
        }

        .status {
          padding: 1rem 2rem;
          border-radius: var(--radius-container);
          font-size: 1.5rem;
          font-weight: 700;
          background: var(--color-error-100);
          color: var(--color-error-700);
          transition: all 0.3s;

          &.inside {
            background: var(--color-success-100);
            color: var(--color-success-700);
          }
        }
      }

      .info {
        text-align: center;
        margin-bottom: 1.5rem;

        .counter {
          font-size: 1.25rem;
          color: var(--color-surface-700);
        }
      }

      .controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;

          &.btn-cross {
            background: var(--color-primary-500);
            color: var(--color-primary-contrast-500);

            &:hover {
              background: var(--color-primary-600);
              transform: translateY(-2px);
            }
          }

          &.btn-reset {
            background: var(--color-surface-200);
            color: var(--color-surface-800);

            &:hover {
              background: var(--color-surface-300);
            }
          }
        }
      }
    }

    .rules {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;

      .card {
        padding: 1.5rem;
        border-radius: calc(var(--radius-container) * 2);
        text-align: center;

        &.odd {
          background: var(--color-warning-50);
          border: 2px solid var(--color-warning-300);
        }

        &.even {
          background: var(--color-surface-100);
          border: 2px solid var(--color-surface-300);
        }

        .icon {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--color-surface-600);
        }

        .text {
          font-size: 1.125rem;
          color: var(--color-surface-700);
        }
      }
    }
  }

  /* Interactive Ray Section */
  :global(#interactive-ray) {
    .demo {
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;

      .svg-canvas {
        width: 100%;
        max-width: 400px;
        height: auto;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 20px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
        cursor: crosshair;

        .path {
          stroke: var(--color-surface-500);
          stroke-width: 3;
        }

        .point {
          fill: var(--color-primary-500);
          cursor: pointer;
        }

        .ray {
          stroke: var(--color-warning-500);
          stroke-width: 3;
          stroke-dasharray: 8 4;
        }
      }

      .result {
        padding: 1rem 2rem;
        border-radius: var(--radius-container);
        font-size: 1.25rem;
        background: var(--color-error-100);
        color: var(--color-error-700);
        text-align: center;

        &.inside {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }
      }

      .hint {
        font-size: 1.125rem;
        color: var(--color-surface-500);
        font-style: italic;
      }

      .btn-reset {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: var(--radius-container);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        background: var(--color-surface-200);
        color: var(--color-surface-800);

        &:hover {
          background: var(--color-surface-300);
        }
      }
    }
  }

  /* Topology Section */
  :global(#topology) {
    .visual {
      margin: 2rem 0;
      text-align: center;

      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 20px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
        margin-bottom: 1rem;
        flex-wrap: wrap;

        .icon {
          font-size: 4rem;
          color: var(--color-surface-500);

          &.blob {
            color: var(--color-primary-400);
          }
        }

        .arrow {
          font-size: 2rem;
          color: var(--color-surface-400);
        }
      }

      .note {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin: 0;
      }
    }
  }

  /* Math Lang Section */
  :global(#math-lang) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 20px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
        overflow: hidden;

        .header {
          background: var(--color-primary-100);
          padding: 1rem 1.5rem;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--color-primary-800);
        }

        .body {
          padding: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-surface-700);
        }
      }
    }
  }

  /* Practice Section */
  :global(#practice) {
    .quiz-list {
      display: flex;
      flex-direction: column;
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

  /* Responsive Adjustments (incorporated into structure, but keeping explicit overrides if needed) */
  @media (max-width: 1100px) {
    :global(#toggle-rule) {
      .visual {
        flex-direction: column;
      }
    }
  }
</style>
