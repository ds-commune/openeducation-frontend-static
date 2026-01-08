<script lang="ts">
  import { Crisis, QuizCard, Section, Summary } from "../../components";

  // Space station simulation state
  let simulationStarted = $state(false);
  let showEstimation = $state(false);
  let showConclusion = $state(false);

  const distance = 3850;
  const speed = 1.2;
  const oxygenMinutes = 52;

  // Estimation values
  const roundedDistance = 4000;
  const roundedSpeed = 1;
  const estimatedSeconds = roundedDistance / roundedSpeed;
  const estimatedMinutes = Math.ceil(estimatedSeconds / 60);

  function startSimulation() {
    simulationStarted = true;
  }

  function revealEstimation() {
    showEstimation = true;
  }

  function revealConclusion() {
    showConclusion = true;
  }

  function resetSimulation() {
    simulationStarted = false;
    showEstimation = false;
    showConclusion = false;
  }

  // Precision vs Time slider
  let precisionLevel = $state(0);
  const timeForPrecision = $derived(() => {
    return Math.pow(2, precisionLevel) * 5;
  });

  // Fermi filter game
  type FermiQuestion = {
    question: string;
    correctOrder: string;
    options: string[];
    feedback: string;
  };

  const fermiQuestions: FermiQuestion[] = [
    {
      question: "Сколько зёрен риса в пакете (1 кг)?",
      correctOrder: "10 000 – 100 000",
      options: ["10 – 100", "10 000 – 100 000", "1 000 000+"],
      feedback: "В 1 кг примерно 50 000 зёрен риса.",
    },
    {
      question: "Сколько волос на голове человека?",
      correctOrder: "10 000 – 100 000",
      options: ["100 – 1 000", "10 000 – 100 000", "1 000 000+"],
      feedback: "На голове человека примерно 100 000 волос.",
    },
    {
      question: "Сколько весит слон (в кг)?",
      correctOrder: "1 000 – 10 000",
      options: ["100 – 1 000", "1 000 – 10 000", "100 000+"],
      feedback: "Африканский слон весит около 5 000–6 000 кг.",
    },
  ];

  let currentFermiIndex = $state(0);
  let fermiAnswer = $state<string | null>(null);
  let showFermiFeedback = $state(false);

  function selectFermiAnswer(answer: string) {
    fermiAnswer = answer;
    showFermiFeedback = true;
  }

  function nextFermiQuestion() {
    if (currentFermiIndex < fermiQuestions.length - 1) {
      currentFermiIndex++;
      fermiAnswer = null;
      showFermiFeedback = false;
    }
  }

  function resetFermi() {
    currentFermiIndex = 0;
    fermiAnswer = null;
    showFermiFeedback = false;
  }

  const currentFermi = $derived(fermiQuestions[currentFermiIndex]);
  const isCorrectFermi = $derived(fermiAnswer === currentFermi.correctOrder);

  // Budget estimation mini-project
  const budgetItems = [
    { name: "Пицца (5 шт.)", price: 499.99 },
    { name: "Напитки (20 шт.)", price: 89.5 },
    { name: "Декор", price: 1250.0 },
    { name: "Торт", price: 2199.0 },
    { name: "Одноразовая посуда", price: 345.75 },
  ];

  const actualTotal = $derived(
    budgetItems.reduce((sum, item) => sum + item.price, 0)
  );

  let userEstimate = $state<number | null>(null);
  let showBudgetResult = $state(false);

  function checkBudgetEstimate() {
    showBudgetResult = true;
  }

  function resetBudget() {
    userEstimate = null;
    showBudgetResult = false;
  }

  const estimateAccuracy = $derived(() => {
    if (userEstimate === null) return 0;
    return Math.abs((userEstimate - actualTotal) / actualTotal) * 100;
  });

  const isWithinTenPercent = $derived(() => estimateAccuracy() <= 10);
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок об искусстве прикидки. Учимся быстро оценивать порядки величин и принимать решения без точных вычислений."
  />
</svelte:head>

<Section id="crisis">
  <Crisis icon="🚀" title="Цена ошибки">
    <p>
      Вы — астронавт на космической станции. Произошла авария: уровень кислорода
      падает. До спасательного шлюза
      <strong>{distance} метров</strong>. Скорость движения в скафандре —
      <strong>{speed} м/с</strong>. Запас кислорода —
      <strong>{oxygenMinutes} минуты</strong>.
    </p>

    <div class="panel">
      <div class="display">
        <div class="row">
          <span class="label">Дистанция:</span>
          <span class="value">{distance} м</span>
        </div>
        <div class="row">
          <span class="label">Скорость:</span>
          <span class="value">{speed} м/с</span>
        </div>
        <div class="row">
          <span class="label">Кислород:</span>
          <span class="value oxygen">{oxygenMinutes} мин</span>
        </div>
      </div>

      <div class="problem">
        <div class="icon">⚠️</div>
        <div class="text">
          Бортовой компьютер завис. Требуется ввести результат:
          <code>({distance} / {speed}) / 60 = ?</code>
        </div>
      </div>
    </div>

    <blockquote>
      Если начать делить {distance} на {speed} в столбик, кислород закончится раньше,
      чем будет принято решение. Как за
      <strong>3 секунды</strong> понять: идти или ждать помощи?
    </blockquote>
  </Crisis>
</Section>

<Section
  id="resolution"
  title="Размытие реальности"
  description="В реальном мире числа — это не точки, а «облака». Чтобы узнать друга в толпе, нам не нужны поры на его коже — достаточно силуэта. Точно так же для принятия решения нам часто нужен порядок числа, а не его точное значение."
>
  <div class="comparison">
    <div class="card high-res">
      <div class="image">🍎</div>
      <div class="label">3.1415926...</div>
      <div class="desc">Фотореализм</div>
    </div>
    <div class="arrow">→</div>
    <div class="card low-res">
      <div class="image pixel">🍎</div>
      <div class="label">≈ 3</div>
      <div class="desc">Силуэт</div>
    </div>
  </div>

  <p class="insight">
    Смысл «это яблоко» понят мгновенно в обоих случаях. Но правая картинка
    обрабатывается мозгом <strong>быстрее</strong>.
  </p>
</Section>

<Section
  id="estimation"
  title="Метод «округление до удобного»"
  description="Заменяем «неудобные» числа на ближайшие «круглые» — и мгновенно получаем оценку. В нашей космической ситуации:"
>
  <div class="demo">
    {#if !simulationStarted}
      <button class="primary-btn" onclick={startSimulation}>
        🚀 Начать прикидку
      </button>
    {:else}
      <div class="steps">
        <div class="step completed">
          <div class="number">1</div>
          <div class="content">
            <span class="original">{distance}</span>
            <span class="arrow">→</span>
            <span class="rounded">{roundedDistance}</span>
            <span class="note">(округляем вверх — худший сценарий)</span>
          </div>
        </div>

        <div class="step completed">
          <div class="number">2</div>
          <div class="content">
            <span class="original">{speed}</span>
            <span class="arrow">→</span>
            <span class="rounded">{roundedSpeed}</span>
            <span class="note">(округляем вниз — худший сценарий)</span>
          </div>
        </div>

        {#if !showEstimation}
          <button class="secondary-btn" onclick={revealEstimation}>
            Показать расчёт →
          </button>
        {:else}
          <div class="step completed">
            <div class="number">3</div>
            <div class="content">
              <span class="calculation"
                >{roundedDistance} / {roundedSpeed} = {estimatedSeconds} сек</span
              >
            </div>
          </div>

          <div class="step completed">
            <div class="number">4</div>
            <div class="content">
              <span class="calculation"
                >{estimatedSeconds} / 60 ≈ {estimatedMinutes} мин</span
              >
            </div>
          </div>

          {#if !showConclusion}
            <button class="secondary-btn" onclick={revealConclusion}>
              Вывод →
            </button>
          {:else}
            <div
              class="conclusion"
              class:danger={estimatedMinutes > oxygenMinutes}
            >
              <div class="icon">
                {estimatedMinutes > oxygenMinutes ? "☠️" : "✅"}
              </div>
              <div class="text">
                {#if estimatedMinutes > oxygenMinutes}
                  <strong>Не идти!</strong> Даже при грубой оценке нужно больше {estimatedMinutes}
                  минут. У нас только {oxygenMinutes}. Ждём помощи.
                {:else}
                  <strong>Идти!</strong> Успеем за {estimatedMinutes} минут.
                {/if}
              </div>
            </div>
            <p class="demo-insight">
              Мы спасли жизнь за 5 секунд, <strong
                >даже не зная точного ответа</strong
              >.
            </p>
            <button class="reset-btn" onclick={resetSimulation}>
              ↺ Начать заново
            </button>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</Section>

<Section
  id="precision"
  title="Весы точности"
  description="Чем больше знаков после запятой мы хотим получить, тем дольше считаем. Но нужна ли нам такая точность для принятия решения «больше/меньше порога»?"
>
  <div class="demo">
    <div class="slider-group">
      <label for="precision-range">Точность (знаков после запятой):</label>
      <input
        id="precision-range"
        type="range"
        bind:value={precisionLevel}
        min="0"
        max="6"
        aria-label="Уровень точности"
      />
      <span class="value">{precisionLevel}</span>
    </div>

    <div class="graph">
      <div class="bar" style="height: {Math.min(timeForPrecision(), 320)}px">
        <span class="bar-value">{timeForPrecision()} сек</span>
      </div>
      <span class="label">Время на расчёт</span>
    </div>

    <p class="insight">
      {#if precisionLevel === 0}
        Мгновенная прикидка: достаточно для решения «идти/не идти».
      {:else if precisionLevel <= 2}
        Разумная точность для большинства жизненных задач.
      {:else}
        ⚠️ Такая точность редко нужна. Время на расчёт растёт экспоненциально!
      {/if}
    </p>
  </div>
</Section>

<Section
  id="fermi"
  title="Порядки величин"
  description="Самая опасная ошибка — ошибка порядка. Получить 45 вместо 42 — не страшно. Получить 420 вместо 42 — катастрофа: мост рухнет, бюджет закончится."
>
  <div class="game">
    <h3>Ферми-фильтр</h3>
    <p class="instruction">
      Не считайте — мгновенно выбирайте правильный порядок!
    </p>

    <div class="question">
      <div class="text">{currentFermi.question}</div>

      <div class="options">
        {#each currentFermi.options as option}
          <button
            class="option-btn"
            class:selected={fermiAnswer === option}
            class:correct={showFermiFeedback &&
              option === currentFermi.correctOrder}
            class:wrong={showFermiFeedback &&
              fermiAnswer === option &&
              option !== currentFermi.correctOrder}
            onclick={() => selectFermiAnswer(option)}
            disabled={showFermiFeedback}
          >
            {option}
          </button>
        {/each}
      </div>

      {#if showFermiFeedback}
        <div class="feedback" class:correct={isCorrectFermi}>
          <div class="icon">{isCorrectFermi ? "✅" : "❌"}</div>
          <div class="text">{currentFermi.feedback}</div>
        </div>

        {#if currentFermiIndex < fermiQuestions.length - 1}
          <button class="action-btn" onclick={nextFermiQuestion}>
            Следующий вопрос →
          </button>
        {:else}
          <button class="reset-btn" onclick={resetFermi}>
            ↺ Начать заново
          </button>
        {/if}
      {/if}
    </div>

    <div class="progress">
      {#each fermiQuestions as _, i}
        <span
          class="dot"
          class:active={i === currentFermiIndex}
          class:completed={i < currentFermiIndex}
        ></span>
      {/each}
    </div>
  </div>
</Section>

<Section id="formal-concepts" title="От интуиции к математике">
  <div class="grid">
    <div class="card">
      <h3>Знак приближения ≈</h3>
      <p>
        Это не «почти равно». Это
        <strong>«достаточно равно для наших целей»</strong>. Мы осознанно
        жертвуем точностью ради скорости.
      </p>
      <div class="example">
        <code>3.14159... ≈ 3</code>
      </div>
    </div>

    <div class="card">
      <h3>Интервальная оценка</h3>
      <p>
        Ответ записывается не как число, а как <strong>неравенство</strong>:
      </p>
      <div class="example">
        <div class="interval">
          <div>98 × 102 = ?</div>
          <div class="bounds">
            <span>Нижняя: 90 × 100 = 9 000</span>
            <span>Верхняя: 100 × 110 = 11 000</span>
          </div>
          <div class="result">9 000 &lt; x &lt; 11 000</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Значащие цифры</h3>
      <p>
        Если вы измеряете длину комнаты шагами, глупо писать ответ в
        миллиметрах.
        <strong>Результат не может быть точнее исходных данных.</strong>
      </p>
    </div>
  </div>
</Section>

<Section id="quiz" title="Проверь понимание">
  <div class="grid">
    <QuizCard icon="🛒">
      <div class="question">
        Вы покупаете 4 товара по 198 рублей. В кармане 1000 рублей. Нужно ли
        считать точную сумму, чтобы понять, хватит ли денег?
      </div>
      {#snippet answer()}
        <p>
          <strong>Нет.</strong> Прикидка: 200 × 4 = 800, что явно меньше 1000. Этого
          достаточно для решения.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🔢">
      <div class="question">
        Вы умножаете 4561 на 0.9. Результат станет больше или меньше?
      </div>
      {#snippet answer()}
        <p>
          <strong>Меньше.</strong> Умножение на число меньше единицы всегда уменьшает
          результат. Это понимание важнее точного ответа.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🌙">
      <div class="question">
        Калькулятор показал, что расстояние до Луны — 384 километра. В чём
        ошибка?
      </div>
      {#snippet answer()}
        <p>
          <strong>Ошибка порядка!</strong> Должно быть 384 000 км. Это проверяется
          здравым смыслом, а не математикой — до Луны явно дальше, чем из Москвы до
          Петербурга.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section
  id="budget"
  title="Мини-проект: бюджет вечеринки"
  description="Вечеринка на 20 человек. Оцените общий бюджет за 1 минуту, не используя калькулятор. Попадёте ли вы в диапазон ±10%?"
>
  <div class="demo">
    <div class="list">
      {#each budgetItems as item}
        <div class="item">
          <span class="name">{item.name}</span>
          <span class="price">{item.price.toFixed(2)} ₽</span>
        </div>
      {/each}
    </div>

    <div class="estimate-input">
      <span class="estimate-label">Ваша прикидка</span>
      <input
        id="user-estimate"
        type="number"
        bind:value={userEstimate}
        disabled={showBudgetResult}
      />
      <span class="ruble">₽</span>
    </div>

    {#if !showBudgetResult}
      <button
        class="check-btn"
        onclick={checkBudgetEstimate}
        disabled={userEstimate === null}
      >
        Проверить
      </button>
    {:else}
      <div class="result" class:success={isWithinTenPercent()}>
        <div class="comparison">
          <div class="row">
            <span>Ваша оценка:</span>
            <span>{userEstimate?.toFixed(0)} ₽</span>
          </div>
          <div class="row">
            <span>Точная сумма:</span>
            <span>{actualTotal.toFixed(2)} ₽</span>
          </div>
          <div class="row accuracy">
            <span>Погрешность:</span>
            <span>{estimateAccuracy().toFixed(1)}%</span>
          </div>
        </div>

        <div class="verdict">
          {#if isWithinTenPercent()}
            ✅ Отлично! Вы попали в диапазон ±10%. Миссия выполнена!
          {:else}
            ⚠️ Погрешность больше 10%. Попробуйте ещё раз — округляйте смелее!
          {/if}
        </div>

        <button class="reset-btn" onclick={resetBudget}>
          ↺ Попробовать снова
        </button>
      </div>
    {/if}
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Точность — это инструмент, а не самоцель. В реальной жизни умение быстро
      определить <strong>порядок числа</strong> часто важнее способности часами вычислять
      идеальный ответ.
    </p>
    <p class="takeaway">
      <strong>Математическое чутьё</strong> — это умение видеть лес, а не считать
      листья на каждом дереве.
    </p>
  </Summary>
</Section>

<style>
  code {
    font-family: "Consolas", "Monaco", monospace;
    background: var(--color-surface-200);
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-base);
    font-size: 0.9em;
  }

  /* Crisis Panel */
  :global(#crisis) {
    .panel {
      margin: 2rem 0;
      background: var(--color-surface-800);
      border-radius: var(--radius-container);
      padding: 1.5rem;
      color: var(--color-surface-50);

      .display {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        .row {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-base);
          min-width: 120px;

          .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.7;
          }

          .value {
            font-size: 1.5rem;
            font-weight: 700;
            font-family: "Consolas", "Monaco", monospace;

            &.oxygen {
              color: var(--color-error-400);
            }
          }
        }
      }

      .problem {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--color-error-600);
        border-radius: var(--radius-base);

        .icon {
          font-size: 1.5rem;
        }

        .text {
          font-size: 1rem;

          code {
            background: rgba(0, 0, 0, 0.3);
            color: white;
          }
        }
      }
    }
  }

  /* Resolution Comparison */
  :global(#resolution) {
    .comparison {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);

      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 2rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);

        .image {
          font-size: 4rem;
          margin-bottom: 0.5rem;

          &.pixel {
            filter: blur(2px);
            opacity: 0.7;
          }
        }

        .label {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: "Consolas", "Monaco", monospace;
          color: var(--color-primary-700);
        }

        .desc {
          font-size: 0.875rem;
          color: var(--color-surface-500);
          margin-top: 0.25rem;
        }
      }

      .arrow {
        font-size: 2rem;
        color: var(--color-surface-400);
      }
    }

    .insight {
      font-size: 1.25rem;
      padding: 1.5rem;
      background: var(--color-primary-50);
      border-radius: var(--radius-container);
      border-left: 4px solid var(--color-primary-500);
    }
  }

  /* Estimation Demo */
  :global(#estimation) {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 20px
        color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

      .primary-btn {
        display: block;
        width: 100%;
        padding: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        background: var(--color-primary-500);
        color: var(--color-primary-contrast-500);
        border: none;
        border-radius: var(--radius-container);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--color-primary-600);
          transform: translateY(-2px);
        }
      }

      .steps {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .step {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);
          opacity: 0.5;
          transition: all 0.3s;

          &.completed {
            opacity: 1;
            background: var(--color-success-50);
            border-left: 4px solid var(--color-success-500);
          }

          .number {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-primary-500);
            color: var(--color-primary-contrast-500);
            border-radius: 50%;
            font-weight: 700;
            font-size: 0.875rem;
          }

          .content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            font-size: 1.125rem;

            .original {
              color: var(--color-surface-500);
              text-decoration: line-through;
            }

            .arrow {
              color: var(--color-surface-400);
            }

            .rounded {
              font-weight: 700;
              color: var(--color-primary-700);
            }

            .note {
              font-size: 0.875rem;
              color: var(--color-surface-500);
            }

            .calculation {
              font-family: "Consolas", "Monaco", monospace;
              font-weight: 600;
              color: var(--color-primary-700);
            }
          }
        }

        .secondary-btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          background: var(--color-primary-100);
          color: var(--color-primary-700);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;

          &:hover {
            background: var(--color-primary-200);
          }
        }

        .conclusion {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-success-100);
          border-radius: var(--radius-container);
          border: 2px solid var(--color-success-400);

          &.danger {
            background: var(--color-error-100);
            border-color: var(--color-error-400);
          }

          .icon {
            font-size: 2.5rem;
          }

          .text {
            font-size: 1.25rem;
            line-height: 1.5;
          }
        }

        .demo-insight {
          text-align: center;
          margin-top: 1.5rem;
          padding: 1rem;
          background: var(--color-primary-50);
          border-radius: var(--radius-container);
        }

        .reset-btn {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background: var(--color-surface-200);
          color: var(--color-surface-700);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;
          align-self: center;
          margin-top: 1rem;

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }
    }
  }

  /* Precision Demo */
  :global(#precision) {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 20px
        color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

      .slider-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600);
        }

        input[type="range"] {
          flex: 1;
          min-width: 150px;
          accent-color: var(--color-primary-500);
        }

        .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary-700);
          min-width: 30px;
          text-align: center;
        }
      }

      .graph {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .bar {
          width: 80px;
          min-height: 40px;
          background: linear-gradient(
            180deg,
            var(--color-warning-400),
            var(--color-error-400)
          );
          border-radius: var(--radius-base);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 0.5rem;
          transition: height 0.3s ease;

          .bar-value {
            font-size: 0.875rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
        }

        .label {
          font-size: 0.875rem;
          color: var(--color-surface-500);
        }
      }

      .insight {
        text-align: center;
        padding: 1rem;
        background: var(--color-surface-100);
        border-radius: var(--radius-container);
        margin: 0;
      }
    }
  }

  /* Fermi Game */
  :global(#fermi) {
    .game {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);

      h3 {
        text-align: center;
        margin-bottom: 0.5rem;
      }

      .instruction {
        text-align: center;
        font-size: 1rem;
        color: var(--color-surface-600);
        margin-bottom: 1.5rem;
      }

      .question {
        background: var(--color-surface-50);
        padding: 2rem;
        border-radius: var(--radius-container);
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);

        .text {
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--color-surface-800);
        }

        .options {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;

          .option-btn {
            padding: 1rem 1.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            background: var(--color-surface-50);
            border: 2px solid var(--color-surface-300);
            border-radius: var(--radius-container);
            cursor: pointer;
            transition: all 0.2s;

            &:hover:not(:disabled) {
              border-color: var(--color-primary-400);
              background: var(--color-primary-50);
            }

            &.selected {
              border-color: var(--color-primary-500);
              background: var(--color-primary-100);
            }

            &.correct {
              border-color: var(--color-success-500);
              background: var(--color-success-100);
            }

            &.wrong {
              border-color: var(--color-error-500);
              background: var(--color-error-100);
            }

            &:disabled {
              cursor: not-allowed;
              opacity: 0.7;
            }
          }
        }

        .feedback {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-container);
          margin-bottom: 1rem;

          &.correct {
            background: var(--color-success-100);
          }

          &:not(.correct) {
            background: var(--color-error-100);
          }

          .icon {
            font-size: 1.5rem;
          }

          .text {
            font-size: 1rem;
            line-height: 1.5;
          }
        }

        .action-btn {
          display: block;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          background: var(--color-primary-500);
          color: var(--color-primary-contrast-500);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-primary-600);
          }
        }

        .reset-btn {
          display: block;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          background: var(--color-surface-200);
          color: var(--color-surface-700);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }

      .progress {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1.5rem;

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-surface-300);
          transition: all 0.3s;

          &.active {
            background: var(--color-primary-500);
            transform: scale(1.2);
          }

          &.completed {
            background: var(--color-success-500);
          }
        }
      }
    }
  }

  /* Formal Concepts */
  :global(#formal-concepts) {
    .grid {
      display: grid;
      gap: 1.5rem;

      .card {
        padding: 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 2px solid var(--color-surface-200);

        h3 {
          color: var(--color-primary-700);
        }

        p {
          margin-bottom: 1rem;
        }

        .example {
          padding: 1rem 1.5rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);
          font-family: "Consolas", "Monaco", monospace;
          font-size: 1.25rem;

          .interval {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;

            .bounds {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
              font-size: 1rem;
              color: var(--color-surface-600);
            }

            .result {
              font-weight: 700;
              color: var(--color-primary-700);
            }
          }
        }
      }
    }
  }

  /* Quiz Cards */
  :global(#quiz) {
    .grid {
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

  /* Budget Demo */
  :global(#budget) {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 20px
        color-mix(in oklab, var(--color-surface-950) 0.05, transparent);

      .list {
        display: grid;
        gap: 0.75rem;
        margin-bottom: 2rem;

        .item {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);

          .name {
            font-size: 1.125rem;
            color: var(--color-surface-700);
          }

          .price {
            font-size: 1.125rem;
            font-weight: 600;
            font-family: "Consolas", "Monaco", monospace;
            color: var(--color-surface-800);
          }
        }
      }

      .estimate-input {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;

        .estimate-label {
          font-size: 1.125rem;
          color: var(--color-surface-700);
        }

        input {
          width: 140px;
          padding: 0.75rem 1rem;
          font-size: 1.25rem;
          font-family: "Consolas", "Monaco", monospace;
          text-align: center;
          color: var(--color-surface-900);
          background: #fff;
          border: none;
          border-radius: var(--radius-container);

          &:focus {
            outline: none;
          }

          &:disabled {
            opacity: 0.6;
          }

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
          }
          -moz-appearance: textfield;
          appearance: textfield;
        }

        .ruble {
          font-size: 1.25rem;
          color: var(--color-surface-600);
        }
      }

      .check-btn {
        display: block;
        width: 100%;
        padding: 1rem;
        font-size: 1.125rem;
        font-weight: 600;
        background: var(--color-primary-500);
        color: var(--color-primary-contrast-500);
        border: none;
        border-radius: var(--radius-container);
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(:disabled) {
          background: var(--color-primary-600);
          transform: translateY(-2px);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .result {
        padding: 1.5rem;
        border-radius: var(--radius-container);
        background: var(--color-warning-100);
        border: 2px solid var(--color-warning-400);

        &.success {
          background: var(--color-success-100);
          border-color: var(--color-success-400);
        }

        .comparison {
          margin-bottom: 1rem;

          .row {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            font-size: 1.125rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            &:last-child {
              border-bottom: none;
            }

            &.accuracy {
              font-weight: 700;
              font-size: 1.25rem;
            }
          }
        }

        .verdict {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
        }

        .reset-btn {
          display: block;
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          background: var(--color-surface-200);
          color: var(--color-surface-700);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    :global(#crisis) .panel .display {
      flex-direction: column;
    }

    :global(#fermi) .game .question .options {
      flex-direction: column;
    }

    :global(#fermi) .game .question .options .option-btn {
      width: 100%;
    }
  }
</style>
