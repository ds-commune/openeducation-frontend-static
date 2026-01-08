<script lang="ts">
  import {
    Card,
    Crisis,
    DefinitionCard,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  // Race simulation state
  let headsScore = $state(0);
  let tailsScore = $state(0);
  let isRacing = $state(false);
  let raceHistory = $state<("heads" | "tails")[]>([]);

  const totalFlips = $derived(headsScore + tailsScore);
  const headsPercent = $derived(
    totalFlips > 0 ? (headsScore / totalFlips) * 100 : 50
  );
  const tailsPercent = $derived(
    totalFlips > 0 ? (tailsScore / totalFlips) * 100 : 50
  );

  async function flipOnce() {
    if (isRacing) return;
    isRacing = true;
    const result = Math.random() < 0.5 ? "heads" : "tails";
    await new Promise((r) => setTimeout(r, 200));
    if (result === "heads") headsScore++;
    else tailsScore++;
    raceHistory = [...raceHistory.slice(-9), result];
    isRacing = false;
  }

  async function flipMultiple(count: number) {
    isRacing = true;
    for (let i = 0; i < count; i++) {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      if (result === "heads") headsScore++;
      else tailsScore++;
      if (count <= 10) {
        raceHistory = [...raceHistory.slice(-9), result];
        await new Promise((r) => setTimeout(r, 50));
      }
    }
    if (count > 10) {
      raceHistory = [];
    }
    isRacing = false;
  }

  function resetRace() {
    headsScore = 0;
    tailsScore = 0;
    raceHistory = [];
  }

  // Convergence graph state
  let graphData = $state<{ flip: number; ratio: number }[]>([]);
  let graphHeads = $state(0);
  let isGraphRunning = $state(false);

  async function runGraphSimulation() {
    graphData = [];
    graphHeads = 0;
    isGraphRunning = true;

    for (let i = 1; i <= 500; i++) {
      const result = Math.random() < 0.5;
      if (result) graphHeads++;
      const ratio = graphHeads / i;

      if (i <= 20 || i % 10 === 0) {
        graphData = [...graphData, { flip: i, ratio }];
        await new Promise((r) => setTimeout(r, i <= 20 ? 100 : 20));
      }
    }
    isGraphRunning = false;
  }

  function resetGraph() {
    graphData = [];
    graphHeads = 0;
  }

  // Casino detective state
  let detectiveFlips = $state(0);
  let detectiveHeads = $state(0);
  let isCoinFair = $state(true);
  let detectiveRevealed = $state(false);
  let isDetectiveRunning = $state(false);

  function startDetective(fair: boolean) {
    detectiveFlips = 0;
    detectiveHeads = 0;
    isCoinFair = fair;
    detectiveRevealed = false;
  }

  async function runDetective100() {
    isDetectiveRunning = true;
    const bias = isCoinFair ? 0.5 : 0.9;
    for (let i = 0; i < 100; i++) {
      if (Math.random() < bias) detectiveHeads++;
      detectiveFlips++;
      if (i < 10) await new Promise((r) => setTimeout(r, 50));
    }
    isDetectiveRunning = false;
  }

  function revealVerdict() {
    detectiveRevealed = true;
  }

  const detectiveHeadsPercent = $derived(
    detectiveFlips > 0 ? Math.round((detectiveHeads / detectiveFlips) * 100) : 0
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о справедливой игре, независимости событий и законе больших чисел. Почему монетка не помнит прошлые броски?"
  />
</svelte:head>

<!-- Hook: Gambler's Fallacy -->
<Section id="crisis">
  <Crisis icon="🎲" title="Странная серия">
    <p>
      Ты играешь с компьютером на виртуальные очки. Правила просты: подбрасываем
      монетку. <strong>Орёл</strong> — выигрывает компьютер.
      <strong>Решка</strong> — выигрываешь ты.
    </p>

    <div class="history">
      <div class="label">Последние 5 бросков:</div>
      <div class="coins">
        <span class="coin">🦅</span>
        <span class="coin">🦅</span>
        <span class="coin">🦅</span>
        <span class="coin">🦅</span>
        <span class="coin">🦅</span>
      </div>
    </div>

    {#snippet question()}
      <strong>Интеллектуальный кризис:</strong> как ты думаешь, на что лучше поставить
      в следующем броске? На Решку, потому что она «давно не выпадала» и «должна»
      наконец появиться? Или шансы всё ещё равны?
    {/snippet}
  </Crisis>
</Section>

<!-- Step 1: Coin has no memory -->
<Section
  id="coin-memory"
  title="У монеты нет памяти"
  description="Мы должны разрушить миф о том, что монета «знает» историю прошлых бросков. Это ошибка игрока — одно из самых коварных когнитивных искажений."
>
  <div class="memory-metaphor">
    <div class="character-card coin">
      <div class="avatar">
        <span class="emoji">🪙</span>
        <div class="status-badge">Память: 0 байт</div>
      </div>
      <div class="dialogue">
        «Я только что родилась! Что такое "прошлый бросок"?»
      </div>
    </div>

    <div class="divider">
      <span class="icon">⚡</span>
      <span class="label">vs</span>
    </div>

    <div class="character-card player">
      <div class="avatar">
        <span class="emoji">🧠</span>
        <div class="status-badge">Память: Перегружена</div>
      </div>
      <div class="notebook">
        <div class="entry">Бросок #1: Орёл</div>
        <div class="entry">Бросок #2: Орёл</div>
        <div class="entry">Бросок #3: Орёл...</div>
        <div class="entry highlight">Значит, сейчас будет Решка?!</div>
      </div>
    </div>
  </div>

  <div class="concept-explanation">
    <p>
      Для монеты каждый бросок — <strong>первый в жизни</strong>. Она физически не
      может «устать» выпадать орлом или «задолжать» вам решку. Прошлое не влияет
      на будущее.
    </p>
  </div>

  <DefinitionCard label="Принцип независимости">
    <p>
      Результат броска №2 никак не зависит от броска №1. Вероятность орла
      остаётся <strong>1/2</strong> всегда, даже если до этого было 10 орлов подряд.
    </p>
  </DefinitionCard>
</Section>

<!-- Step 2: Chaos near, order far -->
<Section
  id="chaos-order"
  title="Хаос вблизи, порядок вдали"
  description="Если каждый бросок случаен, почему мы говорим, что шанс 50/50? Здесь появляется важнейшая идея — масштаб."
>
  <div class="analogy">
    <div class="icon">🌧️</div>
    <div class="content">
      <h3>Дождь на асфальте</h3>
      <p>
        Когда падают <strong>первые капли</strong> — они ложатся хаотично. Где-то
        густо, где-то пусто. Нельзя предсказать, куда упадёт следующая капля.
      </p>
      <p>
        Когда <strong>проходит час</strong> — асфальт становится
        <em>равномерно</em> мокрым. Хаос отдельных капель превращается в идеальный
        порядок мокрой поверхности.
      </p>
    </div>
  </div>

  <div class="interactive">
    <div class="race-header">
      <h3>Гонка Орла и Решки</h3>
      <p>
        Бросайте монету! Кто вырвется вперёд? На короткой дистанции лидер меняется
        хаотично, но на длинной они должны идти ноздря в ноздрю.
      </p>
    </div>

    <div class="race-track">
      <!-- Heads Lane -->
      <div class="lane">
        <div class="runner" style:left="{Math.min(headsPercent, 95)}%">
          <div class="avatar">🦅</div>
          <div class="label">
            {headsScore} <span class="percent">({headsPercent.toFixed(0)}%)</span>
          </div>
        </div>
        <div class="track-line"></div>
      </div>

      <!-- Tails Lane -->
      <div class="lane">
        <div class="runner" style:left="{Math.min(tailsPercent, 95)}%">
          <div class="avatar">🌸</div>
          <div class="label">
            {tailsScore} <span class="percent">({tailsPercent.toFixed(0)}%)</span>
          </div>
        </div>
        <div class="track-line"></div>
      </div>

      <div class="finish-line">
        <span>50%</span>
      </div>
    </div>

    <div class="race-controls">
      <div class="main-btn">
        <button
          class="btn-primary"
          onclick={flipOnce}
          disabled={isRacing}
          aria-label="Бросить 1 раз"
        >
          🎲 Бросок
        </button>
      </div>
      <div class="quick-btns">
        <button
          class="btn-secondary"
          onclick={() => flipMultiple(10)}
          disabled={isRacing}
        >
          +10
        </button>
        <button
          class="btn-secondary"
          onclick={() => flipMultiple(100)}
          disabled={isRacing}
        >
          +100
        </button>
        <button
          class="btn-secondary"
          onclick={() => flipMultiple(1000)}
          disabled={isRacing}
        >
          +1000
        </button>
      </div>
      <button
        class="btn-ghost"
        onclick={resetRace}
        aria-label="Сбросить"
      >
        ↺ Сбросить
      </button>
    </div>

    {#if totalFlips >= 100}
      <div class="result success">
        ✓ Посмотрите, как близко они друг к другу! «Справедливость» наступает
        только на <strong>длинной дистанции</strong>.
      </div>
    {/if}
  </div>
</Section>

<!-- Step 3: Frequency as prediction tool -->
<Section
  id="frequency"
  title="Частота как инструмент предсказания"
  description="Мы не можем предсказать следующий бросок, но мы можем предсказать сумму тысячи бросков. Это наша суперсила."
>
  <div class="interactive">
    <h3>График сходимости частоты</h3>
    <p class="instruction">
      Запустите симуляцию и наблюдайте: линия сначала сильно скачет, но
      постепенно прижимается к уровню 0.5 — «идеальной справедливости».
    </p>

    <div class="graph">
      <div class="container">
        <div class="axis-y">
          <span>1.0</span>
          <span>0.5</span>
          <span>0.0</span>
        </div>
        <div class="area">
          <div class="line ideal"></div>
          {#if graphData.length > 1}
            <svg class="svg" viewBox="0 0 500 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="var(--color-primary-500)"
                stroke-width="2"
                points={graphData
                  .map((d) => `${d.flip},${100 - d.ratio * 100}`)
                  .join(" ")}
              />
            </svg>
          {/if}
        </div>
      </div>
      <div class="label-x">Количество бросков → 500</div>

      <div class="controls">
        <button
          class="btn"
          onclick={runGraphSimulation}
          disabled={isGraphRunning}
          aria-label="Запустить симуляцию"
        >
          ▶ Запустить
        </button>
        <button class="btn ghost" onclick={resetGraph} aria-label="Сбросить">
          ↺ Сбросить
        </button>
      </div>

      {#if graphData.length > 0}
        <div class="info">
          Бросков: <strong>{graphData[graphData.length - 1]?.flip}</strong>
          | Доля орлов:
          <strong
            >{(graphData[graphData.length - 1]?.ratio * 100).toFixed(
              1
            )}%</strong
          >
        </div>
      {/if}
    </div>
  </div>

  <DefinitionCard title="Закон больших чисел">
    <p>
      Чем больше <strong>N</strong> (количество попыток), тем ближе реальный
      результат к ожидаемому <strong>1/2</strong>. Случайность хаотична вблизи,
      но предсказуема издалека.
    </p>
  </DefinitionCard>
</Section>

<!-- Formalization -->
<Section id="formalization" title="Формализация">
  <p>Переводим интуицию на язык символов.</p>

  <div class="grid">
    <div class="card">
      <div class="symbol">P</div>
      <div class="content">
        <div class="name">Вероятность орла и решки</div>
        <div class="math">P(Орёл) = ½ &nbsp;&nbsp; P(Решка) = ½</div>
      </div>
    </div>
    <div class="card">
      <div class="symbol">⊥</div>
      <div class="content">
        <div class="name">Независимость событий</div>
        <div class="text">
          Результат броска №2 никак не зависит от броска №1. Вероятность
          остаётся неизменной: 1/2 всегда.
        </div>
      </div>
    </div>
    <div class="card">
      <div class="symbol">N→∞</div>
      <div class="content">
        <div class="name">Закон больших чисел</div>
        <div class="text">
          Чем больше N (количество попыток), тем ближе реальный результат к
          ожидаемому 1/2.
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Quiz -->
<Section id="practice" title="Проверь себя">
  <div class="cards">
    <QuizCard icon="⚫" title="Ловушка">
      <div class="question">
        В лотерее 10 раз подряд выпал чёрный шар. Какова вероятность, что в 11-й
        раз выпадет белый шар, если шаров поровну?
      </div>
      {#snippet answer()}
        <p>
          Такая же, как и всегда — <strong>50%</strong>. Шары не имеют памяти,
          каждое вытягивание независимо от предыдущих.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="💰" title="Масштаб">
      <div class="question">
        Вы подбросили монетку 10 раз и получили 7 орлов и 3 решки. Это нормально
        или монетка сломана?
      </div>
      {#snippet answer()}
        <p>
          <strong>Нормально!</strong> На малых числах возможен большой разброс. Чтобы
          проверить монетку, нужно сделать сотни бросков.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="📊" title="Прогноз">
      <div class="question">
        Если мы подбросим монету 1 000 000 раз, примерно сколько будет орлов?
      </div>
      {#snippet answer()}
        <p>
          Очень близко к <strong>500 000</strong>. Разброс будет ничтожно мал в
          процентном соотношении — это и есть закон больших чисел в действии.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<!-- Detective Mini-Project -->
<Section
  id="detective"
  title="Мини-проект: детектив казино"
  description="Вам дали подозрительную монетку. Хозяин казино утверждает, что она честная. Вы сделали 5 бросков: О, О, О, О, О. Можно ли обвинить хозяина в мошенничестве?"
>
  <div class="interactive">
    <div class="scenario">
      <div class="suspect">
        <span class="icon">💰❓</span>
        <span class="label">Подозрительная монета</span>
      </div>

      <div class="question">
        5 орлов подряд — это подозрительно? Или могло случиться случайно?
      </div>

      <div class="hint">
        <strong>Подсказка:</strong> вероятность 5 орлов подряд = 1/32 ≈ 3%. Редко,
        но возможно!
      </div>
    </div>

    <div class="test">
      <h3>Проверка на 100 бросках</h3>
      <p class="instruction">
        Выберите тип монеты и запустите 100 бросков, чтобы увидеть, как закон
        больших чисел разоблачает обман.
      </p>

      <div class="selector">
        <button
          class="type-btn"
          class:active={isCoinFair}
          onclick={() => startDetective(true)}
        >
          Честная (50/50)
        </button>
        <button
          class="type-btn"
          class:active={!isCoinFair}
          onclick={() => startDetective(false)}
        >
          Шулерская (90% орёл)
        </button>
      </div>

      {#if detectiveFlips > 0}
        <div class="results">
          <div class="bar">
            <div class="fill" style="width: {detectiveHeadsPercent}%"></div>
          </div>
          <div class="stats">
            Орлов: <strong>{detectiveHeads}</strong> из {detectiveFlips}
            (<strong>{detectiveHeadsPercent}%</strong>)
          </div>
        </div>
      {/if}

      <div class="controls">
        <button
          class="btn"
          onclick={runDetective100}
          disabled={isDetectiveRunning}
          aria-label="Бросить 100 раз"
        >
          <span>🎲</span> Бросить 100 раз
        </button>
        {#if detectiveFlips >= 100 && !detectiveRevealed}
          <button class="btn verdict" onclick={revealVerdict}>
            <span>📋</span> Вынести вердикт
          </button>
        {/if}
      </div>

      {#if detectiveRevealed}
        <div
          class="verdict-card"
          class:fair={isCoinFair}
          class:cheating={!isCoinFair}
        >
          {#if isCoinFair}
            <div class="icon">✓</div>
            <div class="text">
              <strong>Честная!</strong> Результат около 50% — просто повезло в начале.
              Освободить подозреваемого!
            </div>
          {:else}
            <div class="icon">✗</div>
            <div class="text">
              <strong>Мошенничество!</strong> ~90% орлов — закон больших чисел разоблачил
              обман. Арестовать шулера!
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Случайность хаотична, если смотреть на неё в упор, но предсказуема, если
      смотреть издалека. У отдельного события <strong>нет памяти</strong>, но у
      большой серии событий есть <strong>железные правила</strong>. Монетка не
      знает, что выпадало раньше — но мы знаем, что будет в сумме.
    </p>
  </Summary>
</Section>

<style>
  /* Gambler's Fallacy Section */
  :global(#crisis) {
    .history {
      padding: 1.5rem 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 2px 8px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
      margin: 1.5rem 0;
      display: inline-block;

      .label {
        font-size: 0.9rem;
        color: var(--color-surface-500);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }

      .coins {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .coin {
          font-size: 2rem;
          padding: 0.5rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);
        }
      }
    }
  }

  /* Coin Memory Section */
  :global(#coin-memory) {
    .memory-metaphor {
      display: flex;
      align-items: stretch;
      justify-content: center;
      gap: 2rem;
      margin: 3rem 0;
    }

    .character-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: white;
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 8px 24px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
      border: 1px solid var(--color-surface-200);
      text-align: center;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
      }

      .avatar {
        position: relative;
        
        .emoji {
          font-size: 4rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .status-badge {
          background: var(--color-surface-800);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
      }

      &.coin {
        background: linear-gradient(to bottom, white, var(--color-primary-50));
        border-color: var(--color-primary-200);

        .dialogue {
          font-family: "Georgia", serif;
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.5;
          color: var(--color-primary-800);
          background: white;
          padding: 1.25rem;
          border-radius: var(--radius-container);
          border: 1px solid var(--color-primary-100);
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);

          &::before {
            content: "";
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
          }
        }
      }

      &.player {
        background: linear-gradient(to bottom, white, var(--color-warning-50));
        border-color: var(--color-warning-200);

        .notebook {
          width: 100%;
          background: white;
          border: 1px solid var(--color-warning-200);
          border-radius: var(--radius-container);
          overflow: hidden;
          font-family: "Consolas", "Monaco", monospace;
          font-size: 0.9rem;
          text-align: left;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);

          .entry {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--color-surface-100);
            color: var(--color-surface-600);

            &:last-child {
              border-bottom: none;
            }

            &.highlight {
              background: var(--color-warning-100);
              color: var(--color-warning-900);
              font-weight: 700;
            }
          }
        }
      }
    }

    .divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--color-surface-400);

      .icon {
        font-size: 2rem;
        color: var(--color-surface-300);
      }
      
      .label {
        font-weight: 800;
        text-transform: uppercase;
        font-size: 1.25rem;
        color: var(--color-surface-300);
      }
    }

    .concept-explanation {
      max-width: 600px;
      margin: 0 auto 3rem;
      text-align: center;
      
      p {
        font-size: 1.25rem;
        color: var(--color-surface-700);
        line-height: 1.6;
      }
    }

    @media (max-width: 900px) {
      .memory-metaphor {
        flex-direction: column;
        gap: 1.5rem;
      }

      .divider {
        flex-direction: row;
        margin: -0.5rem 0;
        align-self: center; /* Center strictly in the flex column */
        
        .icon { font-size: 1.5rem; }
        .label { font-size: 1rem; }
      }
    }
  }

  /* Chaos Order Section */
  :global(#chaos-order) {
    .analogy {
      display: flex;
      gap: 2rem;
      margin: 2.5rem 0;
      padding: 2rem;
      background: linear-gradient(
        135deg,
        var(--color-primary-50),
        var(--color-surface-50)
      );
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
      flex-wrap: wrap;

      .icon {
        font-size: 3.5rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          margin-top: 0;
          color: var(--color-primary-800);
        }
        p:last-child {
          margin-bottom: 0;
        }
      }
    }

    .interactive {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .race-header {
        margin-bottom: 2rem;
        text-align: center;

        h3 {
          margin-top: 0;
          color: var(--color-primary-900);
        }

        p {
          font-size: 1.125rem;
          color: var(--color-surface-600);
        }
      }

      .race-track {
        position: relative;
        padding: 3rem 0;
        background: var(--color-surface-100);
        border-radius: var(--radius-container);
        margin-bottom: 2rem;
        border: 2px solid var(--color-surface-200);
        overflow: hidden;

        .finish-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            var(--color-surface-400),
            var(--color-surface-400) 10px,
            transparent 10px,
            transparent 20px
          );
          z-index: 0;

          span {
            position: absolute;
            top: 0.5rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface-200);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--color-surface-500);
          }
        }

        .lane {
          position: relative;
          height: 60px;
          margin-bottom: 1rem;
          z-index: 1;

          &:last-child {
            margin-bottom: 0;
          }

          .track-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-surface-300);
            z-index: -1;
          }

          .runner {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: left 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            display: flex;
            flex-direction: column;
            align-items: center;

            .avatar {
              font-size: 2.5rem;
              line-height: 1;
              background: var(--color-surface-50);
              border-radius: 50%;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .label {
              margin-top: 0.25rem;
              font-size: 0.875rem;
              font-weight: 700;
              white-space: nowrap;
              background: rgba(255, 255, 255, 0.8);
              padding: 0.1rem 0.4rem;
              border-radius: 4px;

              .percent {
                font-weight: 400;
                color: var(--color-surface-500);
                font-size: 0.75rem;
              }
            }
          }
        }
      }

      .race-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        .btn-primary {
          background: var(--color-primary-500);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 99px;
          border: none;
          font-weight: 700;
          font-size: 1.125rem;
          cursor: pointer;
          transition: transform 0.1s;
          box-shadow: 0 4px 12px
            color-mix(in oklab, var(--color-primary-500) 0.3, transparent);

          &:active {
            transform: scale(0.95);
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }

        .quick-btns {
          display: flex;
          gap: 0.5rem;
          background: var(--color-surface-200);
          padding: 0.25rem;
          border-radius: 99px;

          .btn-secondary {
            background: transparent;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 99px;
            font-weight: 600;
            color: var(--color-surface-700);
            cursor: pointer;
            transition: background 0.2s;

            &:hover:not(:disabled) {
              background: var(--color-surface-50);
              color: var(--color-primary-700);
            }

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }

        .btn-ghost {
          background: transparent;
          border: 2px solid var(--color-surface-200);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          font-weight: 600;
          color: var(--color-surface-600);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            border-color: var(--color-surface-400);
            color: var(--color-surface-800);
          }
        }
      }

      .result {
        margin-top: 2rem;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-container);
        font-size: 1.125rem;
        font-weight: 600;
        text-align: center;

        &.success {
          background: var(--color-success-100);
          color: var(--color-success-900);
        }
      }
    }
  }

  /* Frequency Section */
  :global(#frequency) {
    .interactive {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      h3 {
        margin-top: 0;
        color: var(--color-primary-900);
      }

      .instruction {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 1.5rem;
      }

      .graph {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .container {
          display: flex;
          gap: 0.5rem;

          .axis-y {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 0.75rem;
            color: var(--color-surface-500);
            padding: 0.5rem 0;
          }

          .area {
            flex: 1;
            height: 150px;
            background: var(--color-surface-100);
            border-radius: var(--radius-container);
            position: relative;
            overflow: hidden;

            .line.ideal {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              height: 2px;
              background: var(--color-error-400);
              opacity: 0.7;

              &::after {
                content: "0.5";
                position: absolute;
                right: 8px;
                top: -18px;
                font-size: 0.75rem;
                color: var(--color-error-500);
                font-weight: 600;
              }
            }

            .svg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

        .label-x {
          text-align: center;
          font-size: 0.875rem;
          color: var(--color-surface-500);
        }

        .info {
          text-align: center;
          font-size: 1rem;
          color: var(--color-surface-600);
        }

        .controls {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;

          .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: var(--radius-container);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            background: var(--color-primary-500);
            color: var(--color-surface-50);

            &:hover:not(:disabled) {
              background: var(--color-primary-600);
              transform: translateY(-2px);
            }

            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            &.ghost {
              background: transparent;
              color: var(--color-surface-600);
              border: 1px solid var(--color-surface-300);

              &:hover {
                background: var(--color-surface-200);
              }
            }
          }
        }
      }
    }
  }

  /* Formalization Section */
  :global(#formalization) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        border: 2px solid var(--color-surface-200);

        .symbol {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary-500);
          font-family: serif;
          min-width: 70px;
          text-align: center;
        }

        .content {
          flex: 1;

          .name {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-surface-900);
            margin-bottom: 0.5rem;
          }

          .math {
            font-size: 1.25rem;
            font-family: serif;
            color: var(--color-surface-700);
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

  /* Quiz Section */
  :global(#practice) {
    .cards {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-900);
      }
    }
  }

  /* Detective Section */
  :global(#detective) {
    .interactive {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .scenario {
        text-align: center;
        padding: 1.5rem;
        margin-bottom: 2rem;
        background: var(--color-surface-100);
        border-radius: calc(var(--radius-container) * 2);

        .suspect {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;

          .icon {
            font-size: 4rem;
          }

          .label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-600);
          }
        }

        .question {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-surface-900);
          margin-bottom: 1rem;
        }

        .hint {
          font-size: 1rem;
          color: var(--color-surface-600);
          background: white;
          padding: 1rem;
          border-radius: var(--radius-container);
          display: inline-block;
        }
      }

      .test {
        text-align: center;

        .instruction {
          font-size: 1.125rem;
          color: var(--color-surface-600);
          margin-bottom: 1.5rem;
        }

        .selector {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;

          .type-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--color-surface-300);
            border-radius: var(--radius-container);
            background: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            color: var(--color-surface-700);

            &:hover {
              border-color: var(--color-primary-400);
            }

            &.active {
              background: var(--color-primary-500);
              color: white;
              border-color: var(--color-primary-500);
            }
          }
        }

        .results {
          margin: 1.5rem 0;

          .bar {
            height: 24px;
            background: var(--color-surface-200);
            border-radius: 12px;
            overflow: hidden;
            max-width: 400px;
            margin: 0 auto 0.75rem;

            .fill {
              height: 100%;
              background: linear-gradient(
                to right,
                var(--color-primary-400),
                var(--color-primary-600)
              );
              transition: width 0.3s ease;
              border-radius: 12px;
            }
          }

          .stats {
            font-size: 1.125rem;
            color: var(--color-surface-700);
          }
        }

        .controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
          flex-wrap: wrap;

          .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: var(--radius-container);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            background: var(--color-primary-500);
            color: white;

            &:hover:not(:disabled) {
              background: var(--color-primary-600);
              transform: translateY(-2px);
            }

            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            &.verdict {
              background: var(--color-warning-500);
              color: var(--color-surface-900);

              &:hover {
                background: var(--color-warning-600);
              }
            }
          }
        }

        .verdict-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-radius: calc(var(--radius-container) * 2);
          margin-top: 1.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;

          &.fair {
            background: var(--color-success-100);
            .icon {
              color: var(--color-success-600);
            }
          }

          &.cheating {
            background: var(--color-error-100);
            .icon {
              color: var(--color-error-600);
            }
          }

          .icon {
            font-size: 2rem;
            font-weight: 700;
          }

          .text {
            font-size: 1.125rem;
            text-align: left;
            color: var(--color-surface-900);
          }
        }
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

  /* Responsive Design */
  @media (max-width: 1100px) {
    :global(#formalization) .grid {
      grid-template-columns: 1fr;
    }
  }
</style>