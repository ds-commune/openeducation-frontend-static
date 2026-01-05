<script lang="ts">
  import { Crisis, DefinitionCard, QuizCard, Summary } from "../../components";

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
<section id="gamblers-fallacy">
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
</section>

<!-- Step 1: Coin has no memory -->
<section id="coin-memory">
  <h2>У монеты нет памяти</h2>
  <p>
    Мы должны разрушить миф о том, что монета «знает» историю прошлых бросков.
    Это <strong>ошибка игрока</strong> — одно из самых коварных когнитивных искажений.
  </p>

  <div class="metaphor">
    <div class="visual">
      <div class="character coin">
        <span class="emoji">💰</span>
        <div class="bubble">Я понятия не имею, что было в прошлый раз!</div>
      </div>
      <div class="character player">
        <span class="emoji">📝</span>
        <div class="notebook">О, О, О, О, О...</div>
      </div>
    </div>
    <div class="text">
      <h3>Монетка с амнезией</h3>
      <p>
        Представь монетку как человека с полной амнезией. Каждый раз, когда её
        подбрасывают, она «просыпается» и не помнит, что было секунду назад. Ей
        всё равно, выпадала она орлом 5 или 100 раз подряд.
        <strong>Для неё каждый бросок — это первый бросок в жизни.</strong>
      </p>
    </div>
  </div>

  <DefinitionCard title="Принцип независимости">
    <p>
      Результат броска №2 никак не зависит от броска №1. Вероятность орла
      остаётся <strong>1/2</strong> всегда, даже если до этого было 10 орлов подряд.
    </p>
  </DefinitionCard>
</section>

<!-- Step 2: Chaos near, order far -->
<section id="chaos-order">
  <h2>Хаос вблизи, порядок вдали</h2>
  <p>
    Если каждый бросок случаен, почему мы говорим, что шанс 50/50? Здесь
    появляется важнейшая идея — <strong>масштаб</strong>.
  </p>

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
    <h3>Гонка Орла и Решки</h3>
    <p class="instruction">
      Бросайте монету и наблюдайте: при малом числе бросков полоски скачут
      неравномерно, но чем больше бросков — тем ближе они к равенству.
    </p>

    <div class="race">
      <div class="bars">
        <div class="row">
          <span class="label">🦅 Орёл</span>
          <div class="track">
            <div
              class="fill heads"
              style="width: {Math.min(headsPercent, 100)}%"
            ></div>
          </div>
          <span class="score">{headsScore}</span>
        </div>
        <div class="row">
          <span class="label">🌸 Решка</span>
          <div class="track">
            <div
              class="fill tails"
              style="width: {Math.min(tailsPercent, 100)}%"
            ></div>
          </div>
          <span class="score">{tailsScore}</span>
        </div>
      </div>

      {#if raceHistory.length > 0}
        <div class="history">
          {#each raceHistory as flip}
            <span class="icon">{flip === "heads" ? "🦅" : "🌸"}</span>
          {/each}
        </div>
      {/if}

      <div class="stats">
        <span>Всего бросков: <strong>{totalFlips}</strong></span>
        {#if totalFlips > 0}
          <span>Орёл: <strong>{headsPercent.toFixed(1)}%</strong></span>
          <span>Решка: <strong>{tailsPercent.toFixed(1)}%</strong></span>
        {/if}
      </div>

      <div class="controls">
        <button
          class="btn"
          onclick={flipOnce}
          disabled={isRacing}
          aria-label="Бросить 1 раз"
        >
          <span>&#x1F3B2;</span> Бросок ×1
        </button>
        <button
          class="btn secondary"
          onclick={() => flipMultiple(10)}
          disabled={isRacing}
          aria-label="10 бросков"
        >
          ×10
        </button>
        <button
          class="btn secondary"
          onclick={() => flipMultiple(100)}
          disabled={isRacing}
          aria-label="100 бросков"
        >
          ×100
        </button>
        <button
          class="btn secondary"
          onclick={() => flipMultiple(1000)}
          disabled={isRacing}
          aria-label="1000 бросков"
        >
          ×1000
        </button>
        <button class="btn ghost" onclick={resetRace} aria-label="Сбросить">
          ↺ Сбросить
        </button>
      </div>
    </div>

    {#if totalFlips >= 100}
      <div class="result success">
        ✓ «Справедливость» (равенство результатов) наступает только на
        <strong>длинной дистанции</strong>. Это и есть закон больших чисел.
      </div>
    {/if}
  </div>
</section>

<!-- Step 3: Frequency as prediction tool -->
<section id="frequency">
  <h2>Частота как инструмент предсказания</h2>
  <p>
    Мы не можем предсказать <em>следующий</em> бросок, но мы можем предсказать
    <em>сумму</em> тысячи бросков. Это наша суперсила.
  </p>

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
</section>

<!-- Formalization -->
<section id="formalization">
  <h2>Формализация</h2>
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
</section>

<!-- Quiz -->
<section id="quiz">
  <h2>Проверь себя</h2>

  <div class="cards">
    <QuizCard icon="⚫">
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

    <QuizCard icon="💰">
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

    <QuizCard icon="📊">
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
</section>

<!-- Detective Mini-Project -->
<section id="detective">
  <h2>Мини-проект: детектив казино</h2>
  <p>
    Вам дали подозрительную монетку. Хозяин казино утверждает, что она честная.
    Вы сделали 5 бросков: О, О, О, О, О.
    <strong>Можно ли обвинить хозяина в мошенничестве?</strong>
  </p>

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
          <span>&#x1F3B2;</span> Бросить 100 раз
        </button>
        {#if detectiveFlips >= 100 && !detectiveRevealed}
          <button class="btn verdict" onclick={revealVerdict}>
            <span>&#x1F4CB;</span> Вынести вердикт
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
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      Случайность хаотична, если смотреть на неё в упор, но предсказуема, если
      смотреть издалека. У отдельного события <strong>нет памяти</strong>, но у
      большой серии событий есть <strong>железные правила</strong>. Монетка не
      знает, что выпадало раньше — но мы знаем, что будет в сумме.
    </blockquote>
  </Summary>
</section>

<style>
  /* Global Layout overrides for sections are handled by +layout.svelte,
     we only scope styles inside components/visuals here. */

  /* Gambler's Fallacy Section */
  #gamblers-fallacy {
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
  #coin-memory {
    .metaphor {
      margin: 2.5rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .visual {
        display: flex;
        justify-content: center;
        gap: 3rem;
        padding: 2rem;
        margin-bottom: 1.5rem;

        .character {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;

          .emoji {
            font-size: 4rem;
          }

          &.coin .bubble {
            background: var(--color-primary-100);
            padding: 0.75rem 1.25rem;
            border-radius: calc(var(--radius-container) * 2);
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-primary-900);
            max-width: 200px;
            text-align: center;
            position: relative;

            &::after {
              content: "";
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              border: 8px solid transparent;
              border-top-color: var(--color-primary-100);
              border-bottom: none;
            }
          }

          &.player .notebook {
            background: var(--color-warning-100);
            padding: 0.5rem 1rem;
            border-radius: var(--radius-container);
            font-family: monospace;
            font-size: 0.9rem;
            color: var(--color-surface-700);
          }
        }
      }

      .text {
        h3 {
          margin-top: 0;
          color: var(--color-primary-800);
        }
        p {
          margin-bottom: 0;
        }
      }
    }
  }

  /* Chaos Order Section */
  #chaos-order {
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

      h3 {
        margin-top: 0;
        color: var(--color-primary-900);
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
          color: var(--color-success-900);
        }
      }

      .race {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .row {
            display: flex;
            align-items: center;
            gap: 1rem;

            .label {
              font-size: 1rem;
              font-weight: 600;
              min-width: 100px;
              color: var(--color-surface-700);
            }

            .track {
              flex: 1;
              height: 28px;
              background: var(--color-surface-200);
              border-radius: 999px;
              overflow: hidden;

              .fill {
                height: 100%;
                transition: width 0.3s ease;
                border-radius: 999px;

                &.heads {
                  background: linear-gradient(
                    to right,
                    var(--color-primary-400),
                    var(--color-primary-600)
                  );
                }

                &.tails {
                  background: linear-gradient(
                    to right,
                    var(--color-warning-400),
                    var(--color-warning-500)
                  );
                }
              }
            }

            .score {
              font-size: 1.25rem;
              font-weight: 700;
              min-width: 60px;
              text-align: right;
              color: var(--color-surface-900);
            }
          }
        }

        .history {
          display: flex;
          gap: 0.25rem;
          justify-content: center;
          flex-wrap: wrap;

          .icon {
            font-size: 1.5rem;
          }
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-size: 1rem;
          color: var(--color-surface-600);
        }

        .controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;

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

            &.secondary {
              background: var(--color-surface-200);
              color: var(--color-surface-800);

              &:hover:not(:disabled) {
                background: var(--color-surface-300);
              }
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

  /* Frequency Section */
  #frequency {
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
  #formalization {
    .grid {
      display: grid;
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
  #quiz {
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
  #detective {
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

  /* Responsive Design */
  @media (max-width: 1100px) {
    #chaos-order .analogy {
      flex-direction: column;
    }

    #coin-memory .metaphor .visual {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    #formalization .grid .card {
      flex-direction: column;
      text-align: center;
    }

    #detective .test .selector {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
