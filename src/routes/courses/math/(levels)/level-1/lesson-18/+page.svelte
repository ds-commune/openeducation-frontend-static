<script lang="ts">
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  // Saw simulation state
  let beamLength = $state(10);
  let cutPosition = $state(4);
  let isCut = $state(false);

  let isBridgeTooShort = $state(false);
  let isSupportTooShort = $state(false);

  const leftPiece = $derived(cutPosition);
  const rightPiece = $derived(beamLength - cutPosition);
  const requiredBridge = 7;
  const requiredSupport = 3;

  const bridgeLength = $derived(Math.max(leftPiece, rightPiece));
  const supportLength = $derived(Math.min(leftPiece, rightPiece));

  function performCut() {
    isCut = true;

    isBridgeTooShort = bridgeLength < requiredBridge;
    isSupportTooShort = supportLength < requiredSupport;
  }

  function resetCut() {
    isCut = false;
    isBridgeTooShort = false;
    isSupportTooShort = false;
    cutPosition = 4;
  }

  // Conservation slider
  let sliderPosition = $state(4);
  const totalLength = 10;
  const removedPart = $derived(sliderPosition);
  const remainingPart = $derived(totalLength - sliderPosition);

  // Expedition mini-project
  let expeditionStage = $state(0);
  const waterTotal = 20;
  const segments = [5, 8, 9];
  const waterAfter = $derived.by(() => {
    let water = waterTotal;
    const results: number[] = [];
    for (let i = 0; i < segments.length; i++) {
      water -= segments[i];
      results.push(water);
    }
    return results;
  });

  function nextExpeditionStage() {
    if (expeditionStage < segments.length) {
      expeditionStage++;
    }
  }

  function resetExpedition() {
    expeditionStage = 0;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о вычитании как разделении целого. Учимся понимать минус как ножницы реальности."
  />
</svelte:head>

<!-- Крючок: Ошибка портного -->
<Section id="crisis">
  <Crisis icon="🪚" title="Ошибка портного">
    <p>
      Представьте: вы — инженер, строящий мост. Для конструкции нужны две
      детали: одна длинная балка для пролёта (<strong
        >{requiredBridge} метров</strong
      >) и короткая опора (<strong>{requiredSupport} метра</strong>). В наличии
      только одна балка длиной
      <strong>{beamLength} метров</strong>.
    </p>

    <div class="saw-demo">
      <div class="beam-container">
        <div class="beam" class:cut={isCut}>
          <div class="beam-full" style="width: 100%">
            {#if !isCut}
              <span class="beam-label">{beamLength} м</span>
            {/if}
          </div>
          {#if isCut}
            <div class="cut-pieces">
              <div
                class="piece left"
                style="width: {(leftPiece / beamLength) * 100}%"
              >
                <span class="label">{leftPiece} м</span>
              </div>
              <div class="mark">✂️</div>
              <div
                class="piece right"
                class:error={isBridgeTooShort || isSupportTooShort}
                style="width: {(rightPiece / beamLength) * 100}%"
              >
                <span class="label">{rightPiece} м</span>
              </div>
            </div>
          {/if}
        </div>

        {#if !isCut}
          <div class="controls">
            <label for="cut-slider">Позиция разреза:</label>
            <input
              id="cut-slider"
              type="range"
              bind:value={cutPosition}
              min="1"
              max={beamLength - 1}
              aria-label="Позиция разреза"
            />
            <span class="value">{cutPosition} м</span>
          </div>
          <button class="action-btn" onclick={performCut} aria-label="Отрезать">
            ✂️ Отрезать
          </button>
        {:else}
          <div class="result">
            {#if isBridgeTooShort}
              <div class="message error">
                ❌ Катастрофа! Оставшаяся часть ({bridgeLength} м) слишком коротка
                для моста ({requiredBridge} м). Балка испорчена!
              </div>
            {:else if isSupportTooShort}
              <div class="message error">
                ❌ Ошибка! Отрезанный кусок ({supportLength} м) слишком короток для
                опоры ({requiredSupport} м). Балка испорчена!
              </div>
            {:else}
              <div class="message success">
                ✅ Отлично! Полученные куски ({bridgeLength} м и {supportLength} м)
                подходят для моста и опоры.
              </div>
            {/if}
            <button class="reset-btn" onclick={resetCut}>↺ Начать заново</button
            >
          </div>
        {/if}
      </div>
    </div>

    <blockquote>
      Как узнать, какой длины <strong>останется</strong> кусок,
      <em>до того</em> как мы совершим необратимое действие? Как предсказать будущее
      состояние целого?
    </blockquote>
  </Crisis>
</Section>

<!-- Шаг 1: Мир до разделения -->
<Section
  id="world-before"
  title="Мир до разделения"
  description="Начнём с понятия целого. Это наш исходный ресурс — длина доски, заряд батареи, количество денег. В математике это число, из которого мы будем вычитать. Его называют уменьшаемым."
>
  <div class="visual">
    <div class="block">
      <span class="label">Целое</span>
      <span class="value">{totalLength}</span>
      <span class="unit">единиц</span>
    </div>
    <p class="caption">
      Целый ресурс светится единым цветом — пока он не разделён, он существует
      как одна сущность.
    </p>
  </div>
</Section>

<!-- Шаг 2: Ножницы реальности -->
<Section
  id="reality-knife"
  title="Ножницы реальности"
  description="Знак «−» — это не абстракция. Это инструмент действия. Минус — это нож, ножницы или пила. Он рассекает целое на части."
>
  <div class="visual">
    <div class="symbol">−</div>
    <div class="description">
      <p>
        Горизонтальная черта символизирует <strong>разрез</strong> — след от ножа,
        который делит единое на два.
      </p>
    </div>
  </div>
</Section>

<!-- Шаг 3: Весы сохранения -->
<Section
  id="conservation-scales"
  title="Весы сохранения"
  description="Когда мы применяем «минус», целое распадается на две части: уходящую (которую забираем) и остаток (который остаётся нам)."
>
  <div class="demo">
    <div class="equation">
      <span class="part removed">{removedPart}</span>
      <span class="operator">+</span>
      <span class="part remaining">{remainingPart}</span>
      <span class="operator">=</span>
      <span class="total">{totalLength}</span>
    </div>

    <div class="bar">
      <div
        class="segment removed"
        style="width: {(removedPart / totalLength) * 100}%"
      >
        <span class="label">ушло {removedPart}</span>
      </div>
      <div
        class="segment remaining"
        style="width: {(remainingPart / totalLength) * 100}%"
      >
        <span class="label">осталось {remainingPart}</span>
      </div>
    </div>

    <div class="controls">
      <label for="conservation-slider">Переместите точку разреза:</label>
      <input
        id="conservation-slider"
        type="range"
        bind:value={sliderPosition}
        min="0"
        max={totalLength}
        aria-label="Точка разреза"
      />
    </div>

    <p class="insight">
      Как бы мы ни двигали разрез, <strong
        >сумма частей всегда равна исходному целому</strong
      >. Вычитание — это обратная сторона сложения.
    </p>
  </div>
</Section>

<Section
  id="math-language"
  title="Язык математики"
  description="Переводим опыт на формальный язык:"
>
  <div class="breakdown">
    <div class="main-formula">A − B = C</div>
    <div class="parts">
      <div class="part">
        <span class="symbol">A</span>
        <span class="desc">— целое (то, что было)</span>
      </div>
      <div class="part">
        <span class="symbol">−</span>
        <span class="desc">— оператор разделения (ножницы)</span>
      </div>
      <div class="part">
        <span class="symbol">B</span>
        <span class="desc">— вычитаемое (то, что забираем)</span>
      </div>
      <div class="part">
        <span class="symbol">=</span>
        <span class="desc">— результат действия</span>
      </div>
      <div class="part">
        <span class="symbol">C</span>
        <span class="desc">— разность (то, что осталось)</span>
      </div>
    </div>
  </div>

  <DefinitionCard title="Закон сохранения">
    <p>
      <strong>C + B = A</strong>. Если склеить остаток и отрезанное, мы вернём
      исходное целое. Вычитание и сложение — зеркальные операции.
    </p>
  </DefinitionCard>
</Section>

<!-- Мини-проект: Логист экспедиции -->
<Section
  id="expedition-logistics"
  title="Логист экспедиции"
  description="У вас есть канистра с водой на {waterTotal} литров. Нужно пройти 3 отрезка пути с разным потреблением воды."
>
  <div class="demo">
    <div class="gauge">
      <div class="label">Запас воды:</div>
      <div class="track">
        <div
          class="fill"
          class:danger={expeditionStage > 0 &&
            waterAfter[expeditionStage - 1] < 0}
          style="width: {Math.max(
            0,
            ((expeditionStage === 0
              ? waterTotal
              : waterAfter[expeditionStage - 1]) /
              waterTotal) *
              100
          )}%"
        >
          <span class="value">
            {expeditionStage === 0
              ? waterTotal
              : Math.max(0, waterAfter[expeditionStage - 1])} л
          </span>
        </div>
      </div>
    </div>

    <div class="stages">
      {#each segments as segment, i}
        <div
          class="card"
          class:completed={expeditionStage > i}
          class:current={expeditionStage === i}
          class:crisis={expeditionStage > i && waterAfter[i] < 0}
        >
          <div class="number">Отрезок {i + 1}</div>
          <div class="consumption">−{segment} л</div>
          {#if expeditionStage > i}
            <div class="result" class:negative={waterAfter[i] < 0}>
              = {waterAfter[i]} л
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="controls">
      {#if expeditionStage < segments.length}
        <button class="action-btn" onclick={nextExpeditionStage}>
          Пройти отрезок {expeditionStage + 1} →
        </button>
      {:else}
        <div class="result-message">
          {#if waterAfter[2] < 0}
            <span class="text crisis">
              🚨 Кризис! На третьем отрезке воды не хватило ({waterAfter[2]}
              л). Экспедиция провалена.
            </span>
          {:else}
            <span class="text success">
              ✅ Экспедиция успешна! Остаток воды: {waterAfter[2]} л.
            </span>
          {/if}
        </div>
        <button class="reset-btn" onclick={resetExpedition}
          >↺ Начать заново</button
        >
      {/if}
    </div>

    <div class="math">
      <div class="step">
        <span class="operation"
          >{waterTotal} − {segments[0]} = {waterAfter[0]}</span
        >
        <span class="status">{expeditionStage >= 1 ? "✓" : ""}</span>
      </div>
      <div class="step">
        <span class="operation"
          >{waterAfter[0]} − {segments[1]} = {waterAfter[1]}</span
        >
        <span class="status">{expeditionStage >= 2 ? "✓" : ""}</span>
      </div>
      <div class="step" class:crisis={waterAfter[2] < 0}>
        <span class="operation"
          >{waterAfter[1]} − {segments[2]} = {waterAfter[2]}</span
        >
        <span class="status"
          >{expeditionStage >= 3 ? (waterAfter[2] < 0 ? "✗" : "✓") : ""}</span
        >
      </div>
    </div>
  </div>
</Section>

<!-- Проверка понимания -->
<Section id="practice" title="Проверь понимание">
  <div class="quiz-grid">
    <QuizCard icon="✂️">
      <div class="question">
        Если я отрезал от верёвки кусок, верёвка исчезла или изменилась?
      </div>
      {#snippet answer()}
        <p>
          Верёвка <strong>изменилась</strong>, но не исчезла. Материя
          сохранилась — просто теперь она существует в двух отдельных частях
          вместо одной.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="📊">
      <div class="question">
        Мы знаем целое (100%) и знаем остаток (30%). Как узнать, сколько мы
        отрезали, не измеряя отрезанный кусок?
      </div>
      {#snippet answer()}
        <p>
          <strong>100% − 30% = 70%</strong>. Закон сохранения работает в обе
          стороны: зная целое и остаток, можно вычислить отрезанное.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="➖">
      <div class="question">Почему знак «минус» похож на лежащую палочку?</div>
      {#snippet answer()}
        <p>
          Горизонтальная черта символизирует <strong>разрез</strong> или
          <strong>границу</strong> — линию, которая делит целое на части.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Резюме">
    <p>
      Вычитание — это способ <strong>предсказать, что останется</strong>, если
      часть целого будет удалена. Знак «минус» — это ножницы, которые делят одно
      большое число на две части: ту, что мы забираем, и ту, что остаётся нам.
    </p>
  </Summary>
</Section>

<style>
  /* Section 1: Crisis (Saw Demo) */
  :global(#crisis) {
    .saw-demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: var(--radius-container);
      border: 1px solid var(--color-surface-200);

      .beam-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .beam {
          position: relative;
          height: 60px;
          background: var(--color-surface-200);
          border-radius: var(--radius-container);
          overflow: hidden;

          &.cut {
            background: transparent;
          }

          .beam-full {
            height: 100%;
            background: linear-gradient(180deg, #8b7355, #6b5344);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-container);

            .beam-label {
              font-size: 1.5rem;
              font-weight: 700;
              color: white;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
          }

          .cut-pieces {
            display: flex;
            height: 100%;
            gap: 1rem;
            align-items: center;

            .piece {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: var(--radius-container);
              transition: all 0.3s;

              &.left {
                background: linear-gradient(
                  180deg,
                  var(--color-error-400),
                  var(--color-error-500)
                );
              }

              &.right {
                background: linear-gradient(
                  180deg,
                  var(--color-success-400),
                  var(--color-success-500)
                );

                &.error {
                  background: linear-gradient(
                    180deg,
                    var(--color-error-300),
                    var(--color-error-400)
                  );
                  animation: shake 0.5s;
                }
              }

              .label {
                font-size: 1.1rem;
                font-weight: 600;
                color: white;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
              }
            }

            .mark {
              font-size: 1.5rem;
            }
          }
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
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
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-primary-700);
            min-width: 50px;
          }
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          background: var(--color-error-500);
          color: var(--color-surface-50);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-error-600);
            transform: translateY(-2px);
          }
        }

        .result {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;

          .message {
            padding: 1rem 1.5rem;
            border-radius: var(--radius-container);
            font-size: 1.125rem;
            font-weight: 600;
            text-align: center;

            &.error {
              background: var(--color-error-100);
              color: var(--color-error-700);
            }

            &.success {
              background: var(--color-success-100);
              color: var(--color-success-700);
            }
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

            &:hover {
              background: var(--color-surface-300);
            }
          }
        }
      }
    }

    blockquote {
      margin: 1.5rem 0;
      color: var(--color-surface-700);
    }
  }

  /* Section 2: World Before Division */
  :global(#world-before) {
    .visual {
      margin: 2rem 0;
      text-align: center;

      .block {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 4rem;
        background: linear-gradient(135deg, #8b7355, #6b5344);
        border-radius: calc(var(--radius-container) * 2);
        box-shadow: 0 12px 32px
          color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

        .label {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.8);
        }

        .value {
          font-size: 4rem;
          font-weight: 700;
          color: white;
        }

        .unit {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }
      }

      .caption {
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-top: 1rem;
        font-style: italic;
      }
    }
  }

  /* Section 3: Reality Knife */
  :global(#reality-knife) {
    .visual {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);

      .symbol {
        font-size: 6rem;
        font-weight: 700;
        color: var(--color-error-500);
        line-height: 1;
      }

      .description p {
        margin: 0;
        font-size: 1.25rem;
      }
    }
  }

  /* Section 4: Conservation Scales */
  :global(#conservation-scales) {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: white;
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
      border: 1px solid var(--color-surface-200);

      .equation {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 2rem;
        font-weight: 700;
        font-family: "Consolas", "Monaco", monospace;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        .part {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-container);

          &.removed {
            background: var(--color-error-100);
            color: var(--color-error-700);
          }

          &.remaining {
            background: var(--color-success-100);
            color: var(--color-success-700);
          }
        }

        .operator {
          color: var(--color-surface-500);
        }

        .total {
          color: var(--color-primary-700);
        }
      }

      .bar {
        display: flex;
        height: 48px;
        border-radius: var(--radius-container);
        overflow: hidden;
        margin-bottom: 1.5rem;

        .segment {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s ease;
          overflow: hidden;

          &.removed {
            background: linear-gradient(
              180deg,
              var(--color-error-400),
              var(--color-error-500)
            );
          }

          &.remaining {
            background: linear-gradient(
              180deg,
              var(--color-success-400),
              var(--color-success-500)
            );
          }

          .label {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            text-align: center;
            white-space: nowrap;
          }
        }
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600);
        }

        input[type="range"] {
          flex: 1;
          accent-color: var(--color-primary-500);
        }
      }

      .insight {
        text-align: center;
        padding: 1rem;
        background: var(--color-primary-50);
        border-radius: var(--radius-container);
        margin: 0;
      }
    }
  }

  /* Section 5: Math Language */
  :global(#math-language) {
    .breakdown {
      margin: 2rem 0;
      padding: 2rem;
      background: white;
      border-radius: calc(var(--radius-container) * 2);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
      border: 1px solid var(--color-surface-200);

      .main-formula {
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
          background: var(--color-surface-50);
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

  /* Section 6: Expedition Logistics */
  :global(#expedition-logistics) {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-100);
      border-radius: calc(var(--radius-container) * 2);

      .gauge {
        margin-bottom: 2rem;

        .label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-600);
          margin-bottom: 0.5rem;
        }

        .track {
          height: 40px;
          background: var(--color-surface-200);
          border-radius: var(--radius-container);
          overflow: hidden;

          .fill {
            height: 100%;
            background: linear-gradient(
              180deg,
              var(--color-primary-400),
              var(--color-primary-500)
            );
            display: flex;
            align-items: center;
            justify-content: center;
            transition: width 0.5s ease;

            &.danger {
              background: linear-gradient(
                180deg,
                var(--color-error-400),
                var(--color-error-500)
              );
            }

            .value {
              font-size: 1.25rem;
              font-weight: 700;
              color: white;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
          }
        }
      }

      .stages {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        .card {
          flex: 1;
          min-width: 120px;
          padding: 1rem;
          background: white;
          border-radius: var(--radius-container);
          text-align: center;
          border: 2px solid var(--color-surface-200);
          transition: all 0.3s;

          &.current {
            border-color: var(--color-primary-400);
            box-shadow: 0 4px 12px
              color-mix(in oklab, var(--color-primary-500) 0.1, transparent);
          }

          &.completed {
            background: var(--color-success-100);
            border-color: var(--color-success-300);
          }

          &.crisis {
            background: var(--color-error-100);
            border-color: var(--color-error-300);
          }

          .number {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-surface-600);
            margin-bottom: 0.5rem;
          }

          .consumption {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-error-600);
          }

          .result {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--color-success-700);
            margin-top: 0.5rem;

            &.negative {
              color: var(--color-error-700);
            }
          }
        }
      }

      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .action-btn {
          padding: 0.75rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          background: var(--color-primary-500);
          color: var(--color-surface-50);
          border: none;
          border-radius: var(--radius-container);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: var(--color-primary-600);
            transform: translateY(-2px);
          }
        }

        .result-message {
          text-align: center;
          padding: 1rem;
          font-size: 1.125rem;
          font-weight: 600;

          .text {
            &.crisis {
              color: var(--color-error-700);
            }
            &.success {
              color: var(--color-success-700);
            }
          }
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

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }

      .math {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background: white;
        border-radius: var(--radius-container);

        .step {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          font-family: "Consolas", "Monaco", monospace;
          font-size: 1.125rem;

          &.crisis .operation {
            color: var(--color-error-600);
          }

          .status {
            font-size: 1.25rem;
          }
        }
      }
    }
  }

  /* Section 7: Practice */
  :global(#practice) {
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
    :global(#world-before) {
      .visual {
        .block {
          padding: 2rem;
          width: 100%;

          .value {
            font-size: 3rem;
          }
        }
      }
    }

    :global(#reality-knife) {
      .visual {
        flex-direction: column;
        text-align: center;
      }
    }

    :global(#expedition-logistics) {
      .stages {
        flex-direction: column;
      }
    }

    :global(#conservation-scales) {
      .demo {
        .equation {
          font-size: 1.5rem;
          flex-wrap: wrap;
        }
      }
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
</style>
