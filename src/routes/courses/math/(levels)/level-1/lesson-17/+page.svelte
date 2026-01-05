<script lang="ts">
  import { Crisis, QuizCard, Summary } from "../../components";

  // Collider state - simple merge demo
  let isMerged = $state(false);
  const gemsA = 3;
  const gemsB = 2;
  const total = gemsA + gemsB;

  function toggleMerge() {
    isMerged = !isMerged;
  }

  // Number line state
  let segmentA = $state(3);
  let segmentB = $state(2);
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о сложении как слиянии двух миров. Учимся понимать, что сложение — это объединение историй."
  />
</svelte:head>

<!-- Крючок: Проблема двух карманов -->
<section id="two-pockets">
  <Crisis icon="🔮" title="Проблема двух карманов">
    <p>
      Представьте: вы — исследователь космоса. На планете А вы нашли
      <strong>3 синих кристалла</strong>. На планете Б —
      <strong>2 красных кристалла</strong>. Все кристаллы сбрасываются в один
      общий контейнер корабля, который закрыт и непрозрачен.
    </p>

    <div class="scenario">
      <div class="planet planet-a">
        <span class="label">Планета А</span>
        <div class="crystals blue">💎💎💎</div>
      </div>
      <div class="arrow">➡️</div>
      <div class="container">
        <span class="label">Контейнер</span>
        <div class="box">❓</div>
      </div>
      <div class="arrow">⬅️</div>
      <div class="planet planet-b">
        <span class="label">Планета Б</span>
        <div class="crystals red">🔺🔺</div>
      </div>
    </div>

    <blockquote>
      Корабельный компьютер требует ввести точное количество объектов, чтобы
      рассчитать топливо для взлёта. Открыть контейнер нельзя. Как предсказать
      состояние закрытого контейнера, не пересчитывая объекты заново?
    </blockquote>
  </Crisis>
</section>

<!-- Метафора слияния -->
<section id="merging-worlds">
  <h2>Слияние миров</h2>
  <p>
    Мы вводим понятие <strong>сложения</strong> не как «счёт пальцев», а как
    физический процесс <strong>уничтожения границ</strong> между двумя мирами.
  </p>

  <div class="visual">
    <div class="description">
      Представьте два мыльных пузыря, летящих навстречу друг другу. Когда они
      касаются, границы растворяются — и получается один большой пузырь. Объекты
      внутри не исчезают, а объединяются.
    </div>
  </div>

  <p>
    Знак <strong>«+»</strong> — это не команда «считай». Это
    <strong>клей</strong> или <strong>мост</strong>, который говорит: «Разрушь
    стены между этими комнатами и сделай один большой зал».
  </p>
</section>

<!-- Интерактив: Коллайдер множеств -->
<section id="collider">
  <h2>Коллайдер множеств</h2>
  <p>
    Нажмите кнопку, чтобы объединить две группы в одну. Посмотрите: количество
    элементов не меняется — меняется только их расположение.
  </p>

  <div class="demo">
    {#if !isMerged}
      <!-- Раздельные группы -->
      <div class="row">
        <div class="group group-a">
          <span class="title">Группа А</span>
          <div class="gems">
            {#each Array(gemsA) as _}
              <span class="gem">💎</span>
            {/each}
          </div>
          <span class="count">{gemsA} штуки</span>
        </div>

        <span class="sign">+</span>

        <div class="group group-b">
          <span class="title">Группа Б</span>
          <div class="gems">
            {#each Array(gemsB) as _}
              <span class="gem">🔺</span>
            {/each}
          </div>
          <span class="count">{gemsB} штуки</span>
        </div>
      </div>
    {:else}
      <!-- Объединённая группа -->
      <div class="merged">
        <span class="title">Общая группа</span>
        <div class="gems">
          {#each Array(gemsA) as _}
            <span class="gem">💎</span>
          {/each}
          {#each Array(gemsB) as _}
            <span class="gem">🔺</span>
          {/each}
        </div>
        <span class="count">{total} штук</span>
      </div>
    {/if}

    <button class="toggle-btn" onclick={toggleMerge}>
      {#if !isMerged}
        Объединить →
      {:else}
        ← Разделить
      {/if}
    </button>
  </div>

  <!-- Уравнение -->
  <div class="equation">
    <span class="num">{gemsA}</span>
    <span class="sign">+</span>
    <span class="num">{gemsB}</span>
    <span class="sign">=</span>
    <span class="total">{total}</span>
  </div>
</section>

<!-- Числовая прямая -->
<section id="number-line">
  <h2>Линия жизни</h2>
  <p>
    Сложение — это <strong>продолжение пути</strong>. Второй отрезок не
    начинается с нуля — он пристыковывается к концу первого.
  </p>

  <div class="demo">
    <div class="controls">
      <div class="input-group">
        <label for="segment-a">Первый отрезок:</label>
        <input
          id="segment-a"
          type="range"
          bind:value={segmentA}
          min="1"
          max="5"
          aria-label="Длина первого отрезка"
        />
        <span class="value">{segmentA}</span>
      </div>
      <div class="input-group">
        <label for="segment-b">Второй отрезок:</label>
        <input
          id="segment-b"
          type="range"
          bind:value={segmentB}
          min="1"
          max="5"
          aria-label="Длина второго отрезка"
        />
        <span class="value">{segmentB}</span>
      </div>
    </div>

    <div class="line">
      <div class="axis">
        {#each Array(11) as _, i}
          <div class="tick" style="left: {i * 10}%">
            <span class="label">{i}</span>
          </div>
        {/each}
      </div>
      <div class="segment segment-a" style="width: {segmentA * 10}%">
        <span class="label">{segmentA}</span>
      </div>
      <div
        class="segment segment-b"
        style="left: {segmentA * 10}%; width: {segmentB * 10}%"
      >
        <span class="join">+</span>
        <span class="label">{segmentB}</span>
      </div>
      <div class="result" style="left: {(segmentA + segmentB) * 10}%">
        <span class="value">{segmentA + segmentB}</span>
      </div>
    </div>
  </div>
</section>

<section id="math-language">
  <h2>Язык математики</h2>
  <p>То, что мы видели в симуляции, записывается так:</p>

  <div class="breakdown">
    <div class="main">3 + 2 = 5</div>
    <div class="parts">
      <div class="part">
        <span class="symbol">3</span> и
        <span class="symbol">2</span>
        <span class="desc">— слагаемые (ингредиенты, состояния до слияния)</span
        >
      </div>
      <div class="part">
        <span class="symbol">+</span>
        <span class="desc">— сам процесс слияния (инструкция к действию)</span>
      </div>
      <div class="part">
        <span class="symbol">=</span>
        <span class="desc"
          >— момент истины (левая и правая части равноценны)</span
        >
      </div>
      <div class="part">
        <span class="symbol">5</span>
        <span class="desc">— сумма (новая сущность, состояние после)</span>
      </div>
    </div>
  </div>
</section>

<!-- Проверка понимания -->
<section id="practice">
  <h2>Проверь понимание</h2>

  <div class="quiz-grid">
    <QuizCard icon="🏖️">
      <div class="question">
        Если мы слили две кучи песка в одну, количество песчинок изменилось? А
        количество куч?
      </div>
      {#snippet answer()}
        <p>
          Количество песчинок <strong>не изменилось</strong> — они все на месте. А
          вот количество куч уменьшилось: было две, стала одна.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🍎">
      <div class="question">
        Даны три картинки: два отдельных яблока, яблочное пюре, два яблока в
        одной корзине. Какая лучше иллюстрирует математическое сложение?
      </div>
      {#snippet answer()}
        <p>
          <strong>Корзина с яблоками</strong>. Сложение сохраняет
          индивидуальность объектов, но объединяет их в единое целое. Пюре — это
          не сложение, а трансформация.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="⏰">
      <div class="question">Можно ли сложить 2 яблока и 3 часа времени?</div>
      {#snippet answer()}
        <p>
          <strong>Нет</strong>. Для слияния миры должны быть совместимы. Яблоки
          и часы — разные измерения реальности.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      Сложение (+) — это не просто увеличение числа. Это
      <strong>объединение двух разных историй в одну</strong>. Когда мы пишем 2
      + 3, мы строим мост между двумя отдельными группами, превращая их в единое
      целое, равное 5.
    </blockquote>
  </Summary>
</section>

<style>
  #two-pockets {
    .scenario {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      flex-wrap: wrap;

      .planet {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.25rem 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-950) 0.08, transparent);

        .label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-surface-600);
          margin-bottom: 0.5rem;
        }

        .crystals {
          font-size: 1.5rem;
          letter-spacing: 0.25rem;
        }
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 2rem;
        background: var(--color-surface-200);
        border-radius: var(--radius-container);
        border: 3px dashed var(--color-surface-400);

        .label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-surface-600);
          margin-bottom: 0.5rem;
        }

        .box {
          font-size: 2rem;
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: var(--color-surface-400);
      }
    }
  }

  #merging-worlds {
    .visual {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-primary-50);
      border-radius: calc(var(--radius-container) * 2);
      border: 2px solid var(--color-primary-200);

      .description {
        font-size: 1.25rem;
        line-height: 1.7;
        color: var(--color-surface-700);
        text-align: center;
      }
    }
  }

  #collider {
    .demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      margin: 2rem 0;
      padding: 2.5rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);

      .row {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-950) 0.08, transparent);
        min-width: 160px;

        &.group-a {
          border: 3px solid var(--color-primary-400);
        }

        &.group-b {
          border: 3px solid var(--color-error-400);
        }

        .title {
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--color-surface-800);
        }

        .gems {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;

          .gem {
            font-size: 2.5rem;
            line-height: 1;
          }
        }

        .count {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-surface-600);
        }
      }

      .sign {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-primary-600);
      }

      .merged {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2.5rem 3rem;
        background: linear-gradient(
          135deg,
          var(--color-primary-100) 0%,
          var(--color-error-100) 100%
        );
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 12px 32px
          color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
        border: 3px solid var(--color-warning-400);

        .title {
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--color-surface-800);
        }

        .gems {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;

          .gem {
            font-size: 2.5rem;
            line-height: 1;
          }
        }

        .count {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-surface-600);
        }
      }

      .toggle-btn {
        padding: 1rem 2.5rem;
        font-size: 1.375rem;
        font-weight: 600;
        border: none;
        border-radius: calc(var(--radius-container) * 2);
        background: var(--color-primary-500);
        color: var(--color-primary-contrast-500);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: var(--color-primary-600);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px
            color-mix(in oklab, var(--color-primary-900) 0.2, transparent);
        }
      }
    }

    .equation {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
      padding: 1.5rem 2rem;
      background: var(--color-success-100);
      border-radius: calc(var(--radius-container) * 2);

      .num {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-surface-800);
      }

      .sign {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-primary-600);
      }

      .total {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-success-700);
      }
    }
  }

  #number-line {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-950) 0.08, transparent);

      .controls {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        .input-group {
          display: flex;
          align-items: center;
          gap: 1rem;

          label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-surface-600);
          }

          input[type="range"] {
            width: 120px;
            accent-color: var(--color-primary-500);
          }

          .value {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-primary-700);
            min-width: 24px;
            text-align: center;
          }
        }
      }

      .line {
        position: relative;
        height: 80px;
        margin: 2rem 0;

        .axis {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-surface-400);

          .tick {
            position: absolute;
            bottom: 0;
            transform: translateX(-50%);

            &::before {
              content: "";
              display: block;
              width: 2px;
              height: 12px;
              background: var(--color-surface-400);
              margin: 0 auto;
            }

            .label {
              display: block;
              font-size: 0.875rem;
              color: var(--color-surface-600);
              margin-top: 4px;
              text-align: center;
            }
          }
        }

        .segment {
          position: absolute;
          bottom: 20px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.segment-a {
            left: 0;
            background: var(--color-primary-400);
          }

          &.segment-b {
            background: var(--color-warning-400);
          }

          .label {
            font-size: 0.875rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }

          .join {
            position: absolute;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: var(--color-primary-600);
            color: white;
            border-radius: 50%;
            font-size: 0.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .result {
          position: absolute;
          bottom: 50px;
          transform: translateX(-50%);

          .value {
            display: block;
            padding: 0.25rem 0.75rem;
            background: var(--color-success-600);
            color: white;
            border-radius: var(--radius-container);
            font-weight: 700;
            font-size: 1rem;

            &::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border: 6px solid transparent;
              border-top-color: var(--color-success-600);
            }
          }
        }
      }
    }
  }

  #math-language {
    .breakdown {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-950) 0.08, transparent);

      .main {
        font-size: 2.5rem;
        font-weight: 700;
        font-family: "Consolas", "Monaco", monospace;
        text-align: center;
        color: var(--color-primary-700);
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid var(--color-surface-200);
      }

      .parts {
        display: grid;
        gap: 1rem;

        .part {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--color-surface-100);
          border-radius: var(--radius-container);
          flex-wrap: wrap;

          .symbol {
            font-size: 1.5rem;
            font-weight: 700;
            font-family: "Consolas", "Monaco", monospace;
            color: var(--color-primary-600);
          }

          .desc {
            font-size: 1.125rem;
            color: var(--color-surface-700);
          }
        }
      }
    }
  }

  #practice {
    .quiz-grid {
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

  /* Responsive */
  @media (max-width: 1100px) {
    #two-pockets {
      .scenario {
        flex-direction: column;
      }
    }

    #collider {
      .demo {
        .row {
          flex-direction: column;
        }
      }
    }

    #number-line {
      .demo {
        .controls {
          flex-direction: column;
          gap: 1rem;
        }
      }
    }
  }
</style>
