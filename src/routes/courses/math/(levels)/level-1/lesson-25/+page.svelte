<script lang="ts">
  import { Crisis, DefinitionCard, QuizCard, Summary } from "../../components";

  // Grid constructor state
  type CellType = "empty" | "wall" | "start" | "finish" | "danger";
  type Direction = "up" | "right" | "down" | "left";
  type Algorithm = "right-hand" | "random";

  const GRID_SIZE = 8;
  const MAX_STEPS = 200;
  const DANGER_SURVIVE_CHANCE = 0.5;

  function createInitialGrid(): CellType[][] {
    const g: CellType[][] = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "empty" as CellType)
    );
    g[0][0] = "start";
    g[GRID_SIZE - 1][GRID_SIZE - 1] = "finish";
    g[2][3] = "wall";
    g[3][3] = "wall";
    g[4][3] = "wall";
    g[5][2] = "danger";
    return g;
  }

  let grid = $state<CellType[][]>(createInitialGrid());
  let selectedTool = $state<CellType>("wall");
  let hoveredCell = $state<{ x: number; y: number } | null>(null);

  // Simulation state
  let selectedAlgorithm = $state<Algorithm>("right-hand");
  let isSimulating = $state(false);
  let robotPos = $state<{ x: number; y: number } | null>(null);
  let robotDir = $state<Direction>("right");
  let simStatus = $state<"idle" | "running" | "won" | "lost" | "stuck">("idle");
  let simStats = $state({ attempts: 0, wins: 0, losses: 0, stuck: 0 });
  let currentPath = $state<Array<{ x: number; y: number }>>([]);

  function handleCellClick(x: number, y: number) {
    if ((x === 0 && y === 0) || (x === GRID_SIZE - 1 && y === GRID_SIZE - 1)) {
      return;
    }
    grid[y][x] = grid[y][x] === selectedTool ? "empty" : selectedTool;
  }

  function getCellEmoji(type: CellType): string {
    switch (type) {
      case "start":
        return "🏁";
      case "finish":
        return "💎";
      case "wall":
        return "🧱";
      case "danger":
        return "⚠️";
      default:
        return "";
    }
  }

  function getCellLabel(type: CellType): string {
    switch (type) {
      case "start":
        return "старт";
      case "finish":
        return "финиш";
      case "wall":
        return "стена";
      case "danger":
        return "опасность";
      default:
        return "пусто";
    }
  }

  // Direction helpers
  const directionDeltas: Record<Direction, { dx: number; dy: number }> = {
    up: { dx: 0, dy: -1 },
    right: { dx: 1, dy: 0 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
  };

  const turnRight: Record<Direction, Direction> = {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  };

  const turnLeft: Record<Direction, Direction> = {
    up: "left",
    left: "down",
    down: "right",
    right: "up",
  };

  function canMove(x: number, y: number): boolean {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return false;
    return grid[y][x] !== "wall";
  }

  function getNextPos(
    x: number,
    y: number,
    dir: Direction
  ): { x: number; y: number } {
    const delta = directionDeltas[dir];
    return { x: x + delta.dx, y: y + delta.dy };
  }

  // Right-hand rule: try to turn right, if can't - go forward, if can't - turn left, if can't - turn back
  function rightHandStep(
    x: number,
    y: number,
    dir: Direction
  ): { newX: number; newY: number; newDir: Direction } {
    // First try to turn right and move
    const rightDir = turnRight[dir];
    const rightPos = getNextPos(x, y, rightDir);
    if (canMove(rightPos.x, rightPos.y)) {
      return { newX: rightPos.x, newY: rightPos.y, newDir: rightDir };
    }

    // Try to go forward
    const forwardPos = getNextPos(x, y, dir);
    if (canMove(forwardPos.x, forwardPos.y)) {
      return { newX: forwardPos.x, newY: forwardPos.y, newDir: dir };
    }

    // Try to turn left
    const leftDir = turnLeft[dir];
    const leftPos = getNextPos(x, y, leftDir);
    if (canMove(leftPos.x, leftPos.y)) {
      return { newX: leftPos.x, newY: leftPos.y, newDir: leftDir };
    }

    // Turn back
    const backDir = turnRight[turnRight[dir]];
    const backPos = getNextPos(x, y, backDir);
    if (canMove(backPos.x, backPos.y)) {
      return { newX: backPos.x, newY: backPos.y, newDir: backDir };
    }

    // Stuck
    return { newX: x, newY: y, newDir: dir };
  }

  // Random walker: pick a random valid direction
  function randomStep(
    x: number,
    y: number
  ): { newX: number; newY: number; newDir: Direction } {
    const dirs: Direction[] = ["up", "right", "down", "left"];
    const validMoves: Array<{ x: number; y: number; dir: Direction }> = [];

    for (const dir of dirs) {
      const pos = getNextPos(x, y, dir);
      if (canMove(pos.x, pos.y)) {
        validMoves.push({ x: pos.x, y: pos.y, dir });
      }
    }

    if (validMoves.length === 0) {
      return { newX: x, newY: y, newDir: "right" };
    }

    const choice = validMoves[Math.floor(Math.random() * validMoves.length)];
    return { newX: choice.x, newY: choice.y, newDir: choice.dir };
  }

  // Single simulation run (fast, no animation)
  function runSingleSimulation(): "won" | "lost" | "stuck" {
    let x = 0,
      y = 0;
    let dir: Direction = "right";
    const visited = new Set<string>();

    for (let step = 0; step < MAX_STEPS; step++) {
      // Check win
      if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) {
        return "won";
      }

      // Check danger
      if (grid[y][x] === "danger") {
        if (Math.random() > DANGER_SURVIVE_CHANCE) {
          return "lost";
        }
      }

      // Track visited for stuck detection
      const key = `${x},${y},${dir}`;
      if (visited.has(key)) {
        // Been here with same direction = likely looping
        return "stuck";
      }
      visited.add(key);

      // Move
      let result;
      if (selectedAlgorithm === "right-hand") {
        result = rightHandStep(x, y, dir);
      } else {
        result = randomStep(x, y);
      }

      if (result.newX === x && result.newY === y) {
        return "stuck";
      }

      x = result.newX;
      y = result.newY;
      dir = result.newDir;
    }

    return "stuck";
  }

  // Animated single run
  async function runAnimatedSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    simStatus = "running";
    currentPath = [];

    let x = 0,
      y = 0;
    let dir: Direction = "right";
    robotPos = { x, y };
    robotDir = dir;
    currentPath = [{ x, y }];

    for (let step = 0; step < MAX_STEPS; step++) {
      await new Promise((r) => setTimeout(r, 150));

      // Check win
      if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) {
        simStatus = "won";
        simStats.attempts++;
        simStats.wins++;
        isSimulating = false;
        return;
      }

      // Check danger
      if (grid[y][x] === "danger") {
        if (Math.random() > DANGER_SURVIVE_CHANCE) {
          simStatus = "lost";
          simStats.attempts++;
          simStats.losses++;
          isSimulating = false;
          return;
        }
      }

      // Move
      let result;
      if (selectedAlgorithm === "right-hand") {
        result = rightHandStep(x, y, dir);
      } else {
        result = randomStep(x, y);
      }

      if (result.newX === x && result.newY === y) {
        simStatus = "stuck";
        simStats.attempts++;
        simStats.stuck++;
        isSimulating = false;
        return;
      }

      x = result.newX;
      y = result.newY;
      dir = result.newDir;
      robotPos = { x, y };
      robotDir = dir;
      currentPath = [...currentPath, { x, y }];
    }

    simStatus = "stuck";
    simStats.attempts++;
    simStats.stuck++;
    isSimulating = false;
  }

  // Batch simulation
  async function runBatchSimulation(count: number) {
    if (isSimulating) return;
    isSimulating = true;
    simStatus = "running";
    robotPos = null;
    currentPath = [];

    for (let i = 0; i < count; i++) {
      const result = runSingleSimulation();
      simStats.attempts++;
      if (result === "won") simStats.wins++;
      else if (result === "lost") simStats.losses++;
      else simStats.stuck++;

      // Yield every 10 iterations for UI responsiveness
      if (i % 10 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    simStatus = "idle";
    isSimulating = false;
  }

  function resetSimulation() {
    robotPos = null;
    simStatus = "idle";
    currentPath = [];
  }

  function resetStats() {
    simStats = { attempts: 0, wins: 0, losses: 0, stuck: 0 };
    resetSimulation();
  }

  function resetGrid() {
    grid = createInitialGrid();
    resetStats();
  }

  const winRate = $derived(
    simStats.attempts > 0
      ? Math.round((simStats.wins / simStats.attempts) * 100)
      : 0
  );

  function getRobotEmoji(dir: Direction): string {
    switch (dir) {
      case "up":
        return "🤖⬆️";
      case "right":
        return "🤖➡️";
      case "down":
        return "🤖⬇️";
      case "left":
        return "🤖⬅️";
    }
  }

  function isOnPath(x: number, y: number): boolean {
    return currentPath.some((p) => p.x === x && p.y === y);
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Проект «Лабиринт шансов»: синтез координат, логики и вероятности. Создаём алгоритмы для непредсказуемого мира."
  />
</svelte:head>

<section id="crisis">
  <Crisis icon="🗺️" title="Живая пещера">
    <p>
      Представь себе <strong>Искателя</strong> — робота, который стоит перед входом
      в пещеру с сокровищами. Ты можешь дать ему список команд: «3 шага прямо, поворот
      направо, 2 шага прямо».
    </p>

    <div class="scenarios">
      <div class="item">
        <span class="icon">🪨</span>
        <span class="text">Внезапно падает камень</span>
      </div>
      <div class="item">
        <span class="icon">🎲</span>
        <span class="text">Стражник бросает монетку</span>
      </div>
      <div class="item">
        <span class="icon">❌</span>
        <span class="text">Жёсткий алгоритм ведёт в тупик</span>
      </div>
    </div>

    {#snippet question()}
      <strong>Интеллектуальный кризис:</strong> как написать инструкцию для героя,
      если мы заранее не знаем, где упадёт камень и как ляжет монета? Как создать
      план, который работает в изменяющемся мире?
    {/snippet}
  </Crisis>
</section>

<section id="grid-model">
  <h2>Мир как сетка</h2>
  <p>
    Мы не можем предсказать будущее, но можем <strong>описать карту</strong>.
    Лабиринт — это не хаотичный рисунок, а набор клеток с адресами. У каждой
    клетки есть координаты <strong>(x, y)</strong> и свойство: пусто, стена, опасность.
  </p>

  <div class="builder">
    <div class="header">
      <h3>Конструктор поля</h3>
      <p class="hint">Нажимай на клетки, чтобы расставить элементы</p>
    </div>

    <div class="toolbar">
      {#each ["wall", "danger", "empty"] as tool}
        <button
          class="tool"
          class:active={selectedTool === tool}
          onclick={() => (selectedTool = tool as CellType)}
          aria-label="Выбрать инструмент: {getCellLabel(tool as CellType)}"
        >
          <span class="icon">
            {tool === "wall" ? "🧱" : tool === "danger" ? "⚠️" : "⬜"}
          </span>
          <span class="label">{getCellLabel(tool as CellType)}</span>
        </button>
      {/each}
    </div>

    <div class="container">
      <div class="axis y">
        {#each Array(GRID_SIZE) as _, i}
          <span class="label">{GRID_SIZE - 1 - i}</span>
        {/each}
      </div>

      <div class="wrapper">
        <div class="grid" role="grid" aria-label="Игровое поле">
          {#each grid as row, y}
            {#each row as cell, x}
              <button
                class="cell {cell}"
                onclick={() => handleCellClick(x, y)}
                onmouseenter={() => (hoveredCell = { x, y })}
                onmouseleave={() => (hoveredCell = null)}
                aria-label="Клетка ({x}, {y}): {getCellLabel(cell)}"
              >
                <span class="content">{getCellEmoji(cell)}</span>
              </button>
            {/each}
          {/each}
        </div>

        <div class="axis x">
          {#each Array(GRID_SIZE) as _, i}
            <span class="label">{i}</span>
          {/each}
        </div>
      </div>
    </div>

    {#if hoveredCell}
      <div class="info">
        <span class="coord">({hoveredCell.x}, {hoveredCell.y})</span>
        <span class="type"
          >{getCellLabel(grid[hoveredCell.y][hoveredCell.x])}</span
        >
      </div>
    {:else}
      <div class="info placeholder">
        Наведи на клетку, чтобы увидеть её свойства
      </div>
    {/if}
  </div>

  <DefinitionCard title="Состояние системы">
    <p>
      Мир описывается множеством точек с координатами и свойствами. Например: <code
        >Wall(3, 4) = True</code
      > означает, что в клетке (3, 4) находится стена.
    </p>
  </DefinitionCard>
</section>

<section id="logic-navigator">
  <h2>Логика как навигатор</h2>
  <p>
    Вместо жёсткого «иди вперёд» мы вводим правило <strong>«ощупывания»</strong
    >. Если впереди стена — поверни. Если свободно — иди. Это называется
    <strong>алгоритм ветвления</strong>.
  </p>

  <div class="flowchart">
    <div class="header">
      <span class="icon">🤖</span>
      <h3>Мозг Искателя</h3>
    </div>

    <div class="diagram">
      <div class="node question">
        <span class="icon">💭</span>
        <span class="text">Путь свободен?</span>
      </div>

      <div class="branches">
        <div class="branch yes">
          <span class="label">Да</span>
          <div class="node action-yes">
            <span class="icon">⏩</span>
            <span class="text">Двигайся вперёд</span>
          </div>
        </div>

        <div class="branch no">
          <span class="label">Нет</span>
          <div class="node action-no">
            <span class="icon">↩️</span>
            <span class="text">Поверни направо</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DefinitionCard title="Условный переход">
    <p>
      Действие зависит от проверки условия. Если путь свободен — двигайся. Если
      путь заблокирован — поверни. Это основа адаптивного поведения.
    </p>
  </DefinitionCard>
</section>

<section id="simulator">
  <h2>Симулятор лабиринта</h2>
  <p>
    Выбери алгоритм поведения робота, расставь стены и опасности на поле выше,
    затем запусти симуляцию. <strong>Опасные клетки</strong> имеют 50% шанс уничтожить
    робота. Цель — добраться до 💎.
  </p>

  <div class="simulator-panel">
    <div class="algorithm-select">
      <h3>Алгоритм поведения</h3>
      <div class="options">
        <button
          class="option"
          class:active={selectedAlgorithm === "right-hand"}
          onclick={() => (selectedAlgorithm = "right-hand")}
        >
          <span class="icon">🖐️</span>
          <div class="text">
            <span class="name">Правило правой руки</span>
            <span class="desc">Всегда поворачивай направо, если можешь</span>
          </div>
        </button>
        <button
          class="option"
          class:active={selectedAlgorithm === "random"}
          onclick={() => (selectedAlgorithm = "random")}
        >
          <span class="icon">🎲</span>
          <div class="text">
            <span class="name">Случайный блуждатель</span>
            <span class="desc">Выбирай направление случайно</span>
          </div>
        </button>
      </div>
    </div>

    <div class="sim-grid-container">
      <div class="sim-axis y">
        {#each Array(GRID_SIZE) as _, i}
          <span class="label">{GRID_SIZE - 1 - i}</span>
        {/each}
      </div>

      <div class="sim-wrapper">
        <div class="sim-grid" role="grid" aria-label="Поле симуляции">
          {#each grid as row, y}
            {#each row as cell, x}
              <div
                class="sim-cell {cell}"
                class:robot={robotPos?.x === x && robotPos?.y === y}
                class:path={isOnPath(x, y) &&
                  !(robotPos?.x === x && robotPos?.y === y)}
              >
                {#if robotPos?.x === x && robotPos?.y === y}
                  <span class="robot-icon">{getRobotEmoji(robotDir)}</span>
                {:else}
                  <span class="content">{getCellEmoji(cell)}</span>
                {/if}
              </div>
            {/each}
          {/each}
        </div>

        <div class="sim-axis x">
          {#each Array(GRID_SIZE) as _, i}
            <span class="label">{i}</span>
          {/each}
        </div>
      </div>
    </div>

    {#if simStatus !== "idle" && simStatus !== "running"}
      <div
        class="sim-result"
        class:won={simStatus === "won"}
        class:lost={simStatus === "lost"}
        class:stuck={simStatus === "stuck"}
      >
        {#if simStatus === "won"}
          🎉 Робот нашёл сокровище!
        {:else if simStatus === "lost"}
          💥 Робот погиб в опасной зоне!
        {:else}
          🔄 Робот застрял в цикле
        {/if}
      </div>
    {/if}

    <div class="sim-actions">
      <button
        class="btn primary"
        onclick={runAnimatedSimulation}
        disabled={isSimulating}
      >
        {isSimulating ? "Симуляция..." : "▶️ Запустить"}
      </button>
      <button
        class="btn secondary"
        onclick={() => runBatchSimulation(100)}
        disabled={isSimulating}
      >
        🔄 100 попыток
      </button>
      <button class="btn tertiary" onclick={resetStats} disabled={isSimulating}>
        Сбросить
      </button>
      <button class="btn tertiary" onclick={resetGrid} disabled={isSimulating}>
        Новое поле
      </button>
    </div>

    <div class="sim-stats">
      <div class="stat">
        <span class="label">Попыток</span>
        <span class="value">{simStats.attempts}</span>
      </div>
      <div class="stat success">
        <span class="label">Успехов</span>
        <span class="value">{simStats.wins}</span>
      </div>
      <div class="stat danger">
        <span class="label">Погибло</span>
        <span class="value">{simStats.losses}</span>
      </div>
      <div class="stat warning">
        <span class="label">Застряло</span>
        <span class="value">{simStats.stuck}</span>
      </div>
      <div class="stat highlight">
        <span class="label">Успешность</span>
        <span class="value">{winRate}%</span>
      </div>
    </div>
  </div>
</section>

<section id="project">
  <h2>Мини-проект: архитектор подземелья</h2>
  <p>
    Твоя задача — создать лабиринт, который Искатель сможет пройти, но не
    слишком легко. Это баланс между сложностью и проходимостью.
  </p>

  <div class="project">
    <div class="steps">
      <div class="step">
        <span class="number">1</span>
        <div class="content">
          <h4>Постройка</h4>
          <p>
            Используй «Конструктор поля» в начале урока, чтобы расставить стены
            и ловушки
          </p>
        </div>
      </div>

      <div class="step">
        <span class="number">2</span>
        <div class="content">
          <h4>Алгоритм</h4>
          <p>
            Выбери логику поведения: «правило правой руки» или «случайный
            блуждатель»
          </p>
        </div>
      </div>

      <div class="step">
        <span class="number">3</span>
        <div class="content">
          <h4>Проверка</h4>
          <p>Запусти симуляцию 100 проходов подряд</p>
        </div>
      </div>

      <div class="step">
        <span class="number">4</span>
        <div class="content">
          <h4>Цель</h4>
          <p>
            Добейся проходимости 70%, но не 100% — это баланс сложности и
            надёжности
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="quiz">
  <h2>Проверь понимание</h2>

  <div class="list">
    <QuizCard icon="🤖">
      <p class="question">
        <strong>1.</strong> Почему жёсткий список команд («3 шага прямо») хуже, чем
        логическое правило («иди, пока свободно»)?
      </p>
      {#snippet answer()}
        <p>
          Подумай: что произойдёт, если на пути появится неожиданное
          препятствие?
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="⚠️">
      <p class="question">
        <strong>2.</strong> Если шанс пройти ловушку 50%, а таких ловушек подряд две,
        каковы шансы пройти обе?
      </p>
      {#snippet answer()}
        <p>
          Интуитивный ответ: шансы уменьшаются. Каждая ловушка «отсеивает» часть
          попыток.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="📍">
      <p class="question">
        <strong>3.</strong> Как координаты (x, y) помогают роботу понять, что он ходит
        кругами?
      </p>
      {#snippet answer()}
        <p>
          Робот может запомнить, где он уже был, и сравнить с текущей позицией.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      Мир непредсказуем, но управляем. Мы используем <strong>координаты</strong
      >, чтобы знать, где мы, <strong>логику</strong>, чтобы принимать решения,
      и понимание <strong>вероятности</strong>, чтобы оценивать риски.
      Математика превращает хаос лабиринта в карту победы.
    </blockquote>
  </Summary>
</section>

<style>
  code {
    font-family: "Consolas", "Monaco", monospace;
    font-size: 1.125rem;
    background: var(--color-surface-100);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-base);
  }

  /* Crisis Scenario Visual */
  #crisis {
    .scenarios {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 1.5rem 0;

      .item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: var(--color-surface-50);
        padding: 1rem 1.5rem;
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 2px 8px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .icon {
          font-size: 1.75rem;
        }

        .text {
          font-size: 1.125rem;
          color: var(--color-surface-700);
        }
      }
    }
  }

  /* Grid Constructor */
  #grid-model {
    .builder {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
      border: 1px solid var(--color-surface-200);

      .header {
        margin-bottom: 1.5rem;

        h3 {
          margin: 0 0 0.5rem;
        }

        .hint {
          font-size: 1rem;
          color: var(--color-surface-500);
          margin: 0;
        }
      }

      .toolbar {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        .tool {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--color-surface-100);
          border: 2px solid transparent;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          color: var(--color-surface-900);

          &:hover {
            background: var(--color-surface-200);
          }

          &.active {
            background: var(--color-primary-100);
            border-color: var(--color-primary-600);
          }

          .icon {
            font-size: 1.5rem;
          }

          .label {
            color: var(--color-surface-700);
          }
        }
      }

      .container {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .axis {
          display: flex;
          font-size: 0.875rem;
          color: var(--color-surface-500);
          font-weight: 600;

          &.y {
            flex-direction: column;
            justify-content: space-around;
            padding-right: 0.5rem;
          }

          &.x {
            justify-content: space-around;
            padding-top: 0.5rem;
          }
        }

        .wrapper {
          display: flex;
          flex-direction: column;

          .grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 2px;
            background: var(--color-surface-300);
            padding: 2px;
            border-radius: var(--radius-base);

            .cell {
              aspect-ratio: 1;
              width: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--color-surface-50);
              border: none;
              cursor: pointer;
              transition: all 0.15s;
              font-size: 1.25rem;

              &:hover {
                background: var(--color-primary-100);
              }

              &.wall {
                background: var(--color-surface-600);
              }

              &.start {
                background: var(--color-success-100);
              }

              &.finish {
                background: var(--color-warning-100);
              }

              &.danger {
                background: var(--color-error-100);
              }
            }
          }
        }
      }

      .info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: var(--color-surface-100);
        border-radius: var(--radius-container);
        font-size: 1.125rem;

        &.placeholder {
          color: var(--color-surface-500);
          font-style: italic;
        }

        .coord {
          font-family: "Consolas", "Monaco", monospace;
          font-weight: 600;
          color: var(--color-primary-700);
        }
      }
    }
  }

  /* Logic Navigator */
  #logic-navigator {
    .flowchart {
      background: linear-gradient(
        135deg,
        var(--color-primary-50),
        var(--color-surface-50)
      );
      border-radius: calc(var(--radius-container) * 2);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

      .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;

        .icon {
          font-size: 2.5rem;
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
        }
      }

      .diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;

        .node {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 2rem;
          border-radius: calc(var(--radius-container) * 2);
          font-size: 1.25rem;
          font-weight: 600;

          &.question {
            background: var(--color-warning-100);
            border: 2px solid var(--color-warning-400);
            color: var(--color-warning-900);
          }

          &.action-yes {
            background: var(--color-success-100);
            border: 2px solid var(--color-success-400);
            color: var(--color-success-900);
          }

          &.action-no {
            background: var(--color-error-100);
            border: 2px solid var(--color-error-400);
            color: var(--color-error-900);
          }

          .icon {
            font-size: 1.75rem;
          }
        }

        .branches {
          display: flex;
          gap: 3rem;

          .branch {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;

            .label {
              font-size: 1rem;
              font-weight: 700;
              padding: 0.5rem 1rem;
              border-radius: var(--radius-container);
            }

            &.yes .label {
              background: var(--color-success-200);
              color: var(--color-success-800);
            }

            &.no .label {
              background: var(--color-error-200);
              color: var(--color-error-800);
            }
          }
        }
      }
    }
  }

  /* Simulator */
  #simulator {
    .simulator-panel {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 2rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
      border: 1px solid var(--color-surface-200);
    }

    .algorithm-select {
      margin-bottom: 2rem;

      h3 {
        margin: 0 0 1rem;
        font-size: 1.25rem;
      }

      .options {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .option {
        flex: 1;
        min-width: 200px;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        background: var(--color-surface-100);
        border: 2px solid transparent;
        border-radius: var(--radius-container);
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;

        &:hover {
          background: var(--color-surface-200);
        }

        &.active {
          background: var(--color-primary-100);
          border-color: var(--color-primary-600);
        }

        .icon {
          font-size: 2rem;
        }

        .text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .name {
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-surface-900);
        }

        .desc {
          font-size: 0.875rem;
          color: var(--color-surface-600);
        }
      }
    }

    .sim-grid-container {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      justify-content: center;
    }

    .sim-axis {
      display: flex;
      font-size: 0.75rem;
      color: var(--color-surface-500);
      font-weight: 600;

      &.y {
        flex-direction: column;
        justify-content: space-around;
        padding-right: 0.25rem;
      }

      &.x {
        justify-content: space-around;
        padding-top: 0.25rem;
      }
    }

    .sim-wrapper {
      display: flex;
      flex-direction: column;
    }

    .sim-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 2px;
      background: var(--color-surface-300);
      padding: 2px;
      border-radius: var(--radius-base);
    }

    .sim-cell {
      aspect-ratio: 1;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-surface-50);
      font-size: 1rem;
      transition: all 0.15s;
      position: relative;

      &.wall {
        background: var(--color-surface-600);
      }

      &.start {
        background: var(--color-success-100);
      }

      &.finish {
        background: var(--color-warning-100);
      }

      &.danger {
        background: var(--color-error-100);
      }

      &.path {
        background: var(--color-primary-100);
      }

      &.robot {
        background: var(--color-primary-200);
        z-index: 1;
      }

      .robot-icon {
        font-size: 0.75rem;
        animation: pulse 0.5s ease-in-out infinite alternate;
      }
    }

    .sim-result {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 1rem;
      border-radius: var(--radius-container);
      margin-bottom: 1.5rem;

      &.won {
        background: var(--color-success-100);
        color: var(--color-success-800);
      }

      &.lost {
        background: var(--color-error-100);
        color: var(--color-error-800);
      }

      &.stuck {
        background: var(--color-warning-100);
        color: var(--color-warning-800);
      }
    }

    .sim-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .btn {
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: var(--radius-container);
      cursor: pointer;
      transition: all 0.2s;

      &.primary {
        background: var(--color-primary-600);
        color: white;

        &:hover:not(:disabled) {
          background: var(--color-primary-700);
          transform: translateY(-2px);
        }
      }

      &.secondary {
        background: var(--color-surface-200);
        color: var(--color-surface-700);

        &:hover:not(:disabled) {
          background: var(--color-surface-300);
        }
      }

      &.tertiary {
        background: transparent;
        color: var(--color-surface-600);
        border: 2px solid var(--color-surface-300);

        &:hover:not(:disabled) {
          background: var(--color-surface-100);
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .sim-stats {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      min-width: 70px;

      .label {
        font-size: 0.75rem;
        color: var(--color-surface-500);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-surface-800);
      }

      &.success .value {
        color: var(--color-success-600);
      }

      &.danger .value {
        color: var(--color-error-600);
      }

      &.warning .value {
        color: var(--color-warning-600);
      }

      &.highlight .value {
        color: var(--color-primary-600);
      }
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

  /* Project */
  #project {
    .project {
      background: linear-gradient(
        135deg,
        var(--color-primary-50),
        var(--color-surface-50)
      );
      border-radius: calc(var(--radius-container) * 2);
      padding: 2.5rem;
      margin: 2rem 0;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

      .steps {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;

        .step {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-surface-50);
          border-radius: var(--radius-container);
          box-shadow: 0 2px 4px
            color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

          .number {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-primary-600);
            color: white;
            font-size: 1.25rem;
            font-weight: 700;
            border-radius: 50%;
            flex-shrink: 0;
          }

          .content {
            h4 {
              margin: 0 0 0.5rem;
              font-size: 1.125rem;
            }

            p {
              font-size: 1rem;
              margin: 0;
              color: var(--color-surface-600);
            }
          }
        }
      }
    }
  }

  /* Quiz */
  #quiz {
    .list {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        margin: 0 0 1rem;
      }
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #logic-navigator .flowchart .diagram .branches {
      flex-direction: column;
      gap: 1.5rem;
    }

    #grid-model .builder .container {
      overflow-x: auto;
    }
  }

  @media (max-width: 768px) {
    #crisis .scenarios {
      flex-direction: column;

      .item {
        padding: 0.75rem 1rem;

        .icon {
          font-size: 1.5rem;
        }

        .text {
          font-size: 1rem;
        }
      }
    }

    #grid-model .builder {
      padding: 1.5rem;

      .toolbar {
        gap: 0.5rem;

        .tool {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;

          .icon {
            font-size: 1.25rem;
          }
        }
      }

      .container .wrapper .grid .cell {
        width: 36px;
        font-size: 1rem;
      }

      .info {
        padding: 0.75rem 1rem;
        font-size: 1rem;
        flex-wrap: wrap;
      }
    }

    #logic-navigator .flowchart {
      padding: 1.5rem;

      .header {
        .icon {
          font-size: 2rem;
        }

        h3 {
          font-size: 1.25rem;
        }
      }

      .diagram .node {
        padding: 1rem 1.25rem;
        font-size: 1rem;

        .icon {
          font-size: 1.25rem;
        }
      }
    }

    #simulator {
      .simulator-panel {
        padding: 1.25rem;
      }

      .algorithm-select {
        h3 {
          font-size: 1.125rem;
        }

        .options {
          flex-direction: column;
        }

        .option {
          min-width: unset;
          padding: 0.75rem 1rem;

          .icon {
            font-size: 1.5rem;
          }

          .name {
            font-size: 0.9rem;
          }

          .desc {
            font-size: 0.8rem;
          }
        }
      }

      .sim-grid-container {
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 0.5rem;
      }

      .sim-cell {
        width: 32px;
        font-size: 0.85rem;

        .robot-icon {
          font-size: 0.65rem;
        }
      }

      .sim-result {
        font-size: 1rem;
        padding: 0.75rem;
      }

      .sim-actions {
        .btn {
          flex: 1 1 calc(50% - 0.5rem);
          min-width: 120px;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
        }
      }

      .sim-stats {
        gap: 1rem;
        justify-content: center;
      }

      .stat {
        min-width: 60px;

        .label {
          font-size: 0.65rem;
        }

        .value {
          font-size: 1.25rem;
        }
      }
    }

    #project .project {
      padding: 1.5rem;

      .steps .step {
        padding: 1rem;

        .number {
          width: 32px;
          height: 32px;
          font-size: 1rem;
        }

        .content {
          h4 {
            font-size: 1rem;
          }

          p {
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    #grid-model .builder .container .wrapper .grid .cell {
      width: 28px;
      font-size: 0.85rem;
    }

    #simulator {
      .sim-cell {
        width: 26px;
        font-size: 0.75rem;

        .robot-icon {
          font-size: 0.55rem;
        }
      }

      .sim-actions .btn {
        flex: 1 1 100%;
      }
    }
  }
</style>
