<script>
  import {
    Section,
    Crisis,
    DefinitionCard,
    QuizCard,
    Summary,
    TakeawayCard,
    VisualBreak,
  } from "../../components";

  // Состояние цепи 1 (прямая связь)
  let btn1Pressed = $state(false);
  let wire1Cut = $state(false);

  // Состояние цепи 2 (через НЕ)
  let btn2Pressed = $state(false);
  let wire2aCut = $state(false); // Провод кнопка → НЕ
  let wire2bCut = $state(false); // Провод НЕ → лампа

  // Вычисляемые значения
  // Лампа 1: горит если кнопка нажата И провод цел
  let lamp1On = $derived(btn1Pressed && !wire1Cut);

  // Сигнал на входе НЕ: true если кнопка нажата И провод цел
  let notGateInput = $derived(btn2Pressed && !wire2aCut);

  // Выход оператора НЕ: инвертирует вход
  let notGateOutput = $derived(!notGateInput);

  // Лампа 2: горит если выход НЕ true И провод до лампы цел
  let lamp2On = $derived(notGateOutput && !wire2bCut);

  function resetCircuits() {
    btn1Pressed = false;
    wire1Cut = false;
    btn2Pressed = false;
    wire2aCut = false;
    wire2bCut = false;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о логических связках «если — то». Учимся строить цепочки причин и следствий."
  />
</svelte:head>

<!-- Крючок: мир без связей -->
<Section id="intro">
  <Crisis icon="🌀" title="Мир без связей">
    <p>
      Представьте мир, где ничто не связано. Человек нажимает на выключатель
      света — но вместо света включается вода в кране. Он открывает зонт — а на
      небе исчезает солнце, хотя дождя нет. Он пинает мяч — но мяч не летит, а
      просто меняет цвет.
    </p>
    <div class="chaos">
      <div class="item">
        <span class="action">💡 Щёлк</span>
        <span class="arrow">→</span>
        <span class="result">🚿 Вода?!</span>
      </div>
      <div class="item">
        <span class="action">☂️ Открыл зонт</span>
        <span class="arrow">→</span>
        <span class="result">☀️ Исчезло солнце?!</span>
      </div>
      <div class="item">
        <span class="action">⚽ Пнул мяч</span>
        <span class="arrow">→</span>
        <span class="result">🔴 Смена цвета?!</span>
      </div>
    </div>

    {#snippet question()}
      <p>
        В таком мире невозможно жить или планировать. Ты не можешь достичь цели,
        потому что твои действия не приводят к ожидаемым результатам. Это мир
        магии и хаоса, а не инженерии.
      </p>
      <p>
        <strong>
          Как нам «привязать» результат к действию так, чтобы это работало
          всегда и безотказно?
        </strong>
      </p>
    {/snippet}
  </Crisis>
</Section>

<!-- Шаг 1: Жёсткая сцепка -->
<Section id="rigid-link" title="Жёсткая сцепка: атом логики">
  {#snippet description()}
    Мы вводим понятие <strong>«если — то»</strong> не как абстракцию, а как механический
    рычаг. Это железная дорога: стрелка перевода путей. Поезд (событие) не может поехать
    иначе, если рельсы (условие) проложены определённым образом.
  {/snippet}

  <VisualBreak>
    <div class="implication">
      <div class="step condition">
        <div class="icon">🔑</div>
        <div class="text">Условие</div>
        <div class="example">«Кнопка нажата»</div>
      </div>
      <div class="connector">
        <div class="arrow">→</div>
        <div class="label">если истина</div>
      </div>
      <div class="step result">
        <div class="icon">💡</div>
        <div class="text">Следствие</div>
        <div class="example">«Свет горит»</div>
      </div>
    </div>
    <p class="caption">
      Связь работает как замок и ключ: правильное условие открывает результат
    </p>
  </VisualBreak>

  <div class="simulation">
    <div class="header">
      <span class="icon">🔌</span>
      <h3>Выключатель реальности</h3>
      <button class="reset-btn" type="button" onclick={() => resetCircuits()}>
        🔄 Сброс
      </button>
    </div>

    <!-- Цепь 1: Прямая связь -->
    <div class="circuit-block">
      <div class="circuit-label">Прямая связь: кнопка → лампа</div>
      <div class="circuit">
        <button
          class="element btn"
          type="button"
          onmousedown={() => (btn1Pressed = true)}
          onmouseup={() => (btn1Pressed = false)}
          onmouseleave={() => (btn1Pressed = false)}
          ontouchstart={(e) => {
            e.preventDefault();
            btn1Pressed = true;
          }}
          ontouchend={() => (btn1Pressed = false)}
          ontouchcancel={() => (btn1Pressed = false)}
          oncontextmenu={(e) => e.preventDefault()}
        >
          <div class="icon">{btn1Pressed ? "🔵" : "🔘"}</div>
          <div class="label">Кнопка</div>
        </button>
        <button
          class="wire long"
          class:cut={wire1Cut}
          class:active={btn1Pressed && !wire1Cut}
          type="button"
          onclick={() => (wire1Cut = true)}
          oncontextmenu={(e) => e.preventDefault()}
        >
          {#if wire1Cut}<span class="cut-mark">✂️</span>{/if}
        </button>
        <div class="element lamp" class:off={!lamp1On}>
          <div class="icon">💡</div>
          <div class="label">Лампа</div>
        </div>
      </div>
    </div>

    <!-- Цепь 2: Через оператор НЕ -->
    <div class="circuit-block">
      <div class="circuit-label">Инверсия: кнопка → НЕ → лампа</div>
      <div class="circuit">
        <button
          class="element btn"
          type="button"
          onmousedown={() => (btn2Pressed = true)}
          onmouseup={() => (btn2Pressed = false)}
          onmouseleave={() => (btn2Pressed = false)}
          ontouchstart={(e) => {
            e.preventDefault();
            btn2Pressed = true;
          }}
          ontouchend={() => (btn2Pressed = false)}
          ontouchcancel={() => (btn2Pressed = false)}
          oncontextmenu={(e) => e.preventDefault()}
        >
          <div class="icon">{btn2Pressed ? "🔵" : "🔘"}</div>
          <div class="label">Кнопка</div>
        </button>
        <button
          class="wire"
          class:cut={wire2aCut}
          class:active={btn2Pressed && !wire2aCut}
          type="button"
          onclick={() => (wire2aCut = true)}
          oncontextmenu={(e) => e.preventDefault()}
        >
          {#if wire2aCut}<span class="cut-mark">✂️</span>{/if}
        </button>
        <div class="element not-gate">
          <div class="icon">🚫</div>
          <div class="label">НЕ</div>
        </div>
        <button
          class="wire"
          class:cut={wire2bCut}
          class:active={notGateOutput && !wire2bCut}
          type="button"
          onclick={() => (wire2bCut = true)}
          oncontextmenu={(e) => e.preventDefault()}
        >
          {#if wire2bCut}<span class="cut-mark">✂️</span>{/if}
        </button>
        <div class="element lamp" class:off={!lamp2On}>
          <div class="icon">💡</div>
          <div class="label">Лампа</div>
        </div>
      </div>
    </div>

    <p class="text">
      Нажмите и удерживайте кнопки. Кликните на провод, чтобы перерезать его ✂️
    </p>
    <TakeawayCard>
      <p>
        Связь «если нажата кнопка — то горит свет» существует только пока цела
        структура (правило). <strong>Мы создаём правила сами.</strong>
      </p>
    </TakeawayCard>
  </div>
</Section>

<!-- Шаг 2: Односторонняя направленность -->
<Section
  id="one-way"
  title="Односторонняя улица"
  description="Самая частая ошибка новичков — думать, что связь работает в обе стороны. Но логика — это улица с односторонним движением."
>
  <div class="examples">
    <div class="correct">
      <div class="label">✓ Правильно</div>
      <p>Если идёт дождь → асфальт мокрый</p>
    </div>
    <div class="wrong">
      <div class="label">✗ Ошибка</div>
      <p>Асфальт мокрый → значит, идёт дождь?</p>
      <p class="why">(Нет! Могла проехать поливальная машина)</p>
    </div>
  </div>

  <VisualBreak>
    <div class="causality">
      <div class="title">Много причин — один результат</div>
      <div class="causes-row">
        <div class="cause">🌧️ Дождь</div>
        <div class="cause">💧 Ведро воды</div>
        <div class="cause">🚿 Полив</div>
      </div>
      <div class="arrows-row">
        <span class="arrow">↓</span>
        <span class="arrow">↓</span>
        <span class="arrow">↓</span>
      </div>
      <div class="result-item">💦 Мокрый асфальт</div>
      <p class="caption">
        Видя результат, нельзя точно сказать, какая именно причина его вызвала.
        Логика работает <strong>от причины к следствию</strong>, не наоборот.
      </p>
    </div>
  </VisualBreak>
</Section>

<!-- Шаг 3: Цепочки -->
<Section id="chains" title="Цепочки событий">
  {#snippet description()}
    События редко ходят поодиночке. Одно запускает другое. Как домино — толкнул
    первое, упало последнее. Это <strong>машина Голдберга</strong>: сложная
    цепочка простых «если — то».
  {/snippet}

  <div class="chain">
    <div class="step">
      <span class="icon">🌀</span>
      <span class="text">Если включить вентилятор</span>
    </div>
    <div class="arrow">↓</div>
    <div class="step">
      <span class="icon">⛵</span>
      <span class="text">То лодка на колёсах едет</span>
    </div>
    <div class="arrow">↓</div>
    <div class="step">
      <span class="icon">🔵</span>
      <span class="text">То толкает шарик</span>
    </div>
    <div class="arrow">↓</div>
    <div class="step">
      <span class="icon">🔘</span>
      <span class="text">То шарик нажимает кнопку</span>
    </div>
    <div class="arrow">↓</div>
    <div class="step final">
      <span class="icon">🍞</span>
      <span class="text">То тостер выбрасывает хлеб!</span>
    </div>
  </div>

  <TakeawayCard icon="⚠️" variant="danger">
    <p>
      <strong>Если убрать одно звено — вся цепочка после него умирает.</strong>
      Уберите шарик — кнопка не нажмётся, хлеб не выпрыгнет.
    </p>
  </TakeawayCard>
</Section>

<Section
  id="formalization"
  title="Формализация"
  description="Переводим интуицию «рычагов» и «воронок» на язык символов. Нам не нужно много слов, нам нужна стрелка."
>
  <div class="formal">
    <div class="block">
      <h3>Символ следования</h3>
      <p>
        Стрелка <strong class="math-symbol">→</strong> читается как «влечёт за собой»
        или «приводит к».
      </p>
      <div class="formula">
        <em>A</em> → <em>B</em>
      </div>
      <p class="explanation">
        Где <em>A</em> — причина/условие, а <em>B</em> — следствие/результат
      </p>
    </div>

    <div class="block">
      <h3>Блок-схема</h3>
      <svg
        class="flowchart-svg"
        viewBox="0 0 320 180"
        aria-label="Блок-схема условного оператора"
      >
        <!-- Diamond (condition) -->
        <polygon
          points="160,10 230,50 160,90 90,50"
          fill="var(--color-warning-100)"
          stroke="var(--color-warning-400)"
          stroke-width="2"
        />
        <text
          x="160"
          y="55"
          text-anchor="middle"
          font-size="14"
          font-weight="600"
          fill="var(--color-surface-700)">Условие?</text
        >

        <!-- Left branch line (Yes) -->
        <line
          x1="120"
          y1="70"
          x2="70"
          y2="120"
          stroke="var(--color-success-500)"
          stroke-width="2"
        />
        <polygon
          points="70,120 75,108 82,115"
          fill="var(--color-success-500)"
        />
        <text
          x="80"
          y="95"
          font-size="12"
          font-weight="600"
          fill="var(--color-success-700)">Да</text
        >

        <!-- Right branch line (No) -->
        <line
          x1="200"
          y1="70"
          x2="250"
          y2="120"
          stroke="var(--color-surface-400)"
          stroke-width="2"
        />
        <polygon
          points="250,120 245,108 238,115"
          fill="var(--color-surface-400)"
        />
        <text
          x="232"
          y="95"
          font-size="12"
          font-weight="600"
          fill="var(--color-surface-600)">Нет</text
        >

        <!-- Yes action box -->
        <rect
          x="10"
          y="125"
          width="120"
          height="45"
          rx="6"
          fill="var(--color-success-100)"
          stroke="var(--color-success-400)"
          stroke-width="1.5"
        />
        <text
          x="70"
          y="152"
          text-anchor="middle"
          font-size="12"
          fill="var(--color-success-700)">Выполнить</text
        >
        <text
          x="70"
          y="165"
          text-anchor="middle"
          font-size="12"
          fill="var(--color-success-700)">действие</text
        >

        <!-- No action box -->
        <rect
          x="190"
          y="125"
          width="120"
          height="45"
          rx="6"
          fill="var(--color-surface-100)"
          stroke="var(--color-surface-300)"
          stroke-width="1.5"
        />
        <text
          x="250"
          y="155"
          text-anchor="middle"
          font-size="12"
          fill="var(--color-surface-600)">Пропустить</text
        >
      </svg>
    </div>
  </div>

  <DefinitionCard label="Как это работает в реальности">
    <p>
      <strong>Компьютер</strong> — это миллионы маленьких «если — то», работающих
      вместе. Каждый транзистор в процессоре — это крошечный выключатель, который
      проверяет условие и пропускает (или не пропускает) электрический сигнал.
    </p>
    <p>
      Твой смартфон выполняет <strong>миллиарды</strong> таких проверок каждую секунду.
      Когда ты касаешься экрана, процессор проверяет: «Если палец коснулся этой зоны
      → открыть приложение». Вся магия технологий — это просто очень быстрые «если
      — то».
    </p>
  </DefinitionCard>
</Section>

<!-- Проверка понимания -->
<Section id="quiz" title="Проверь себя">
  <QuizCard icon="🍋" title="Ловушка обратной логики">
    <p>
      Если человек ест лимон, он морщится. Человек морщится. Значит ли это, что
      он ест лимон?
    </p>
    {#snippet answer()}
      <p>Нет! Он может морщиться от яркого солнца, от боли или от запаха.</p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🁅" title="Разрыв цепи">
    <p>
      У нас есть цепочка из 5 домино. Мы убрали третье. Толкаем первое. Упадёт
      ли пятое? Почему?
    </p>
    {#snippet answer()}
      <p>
        Нет! Первое и второе упадут, но третьего нет — четвёртое и пятое
        останутся стоять.
      </p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🚗" title="Скрытые условия">
    <p>
      «Машина едет, если нажат газ». Достаточно ли только нажать газ, чтобы
      машина поехала?
    </p>
    {#snippet answer()}
      <p>
        Нет! Должен быть бензин, мотор должен быть заведён, колёса должны
        касаться дороги...
      </p>
    {/snippet}
  </QuizCard>
</Section>

<!-- Мини-проект -->
<Section
  id="project"
  title="Мини-проект: умная теплица"
  description="Давайте построим логику для автоматической теплицы. У нас есть датчики (условия) и устройства (действия)."
>
  <div class="greenhouse">
    <div class="rules">
      <div class="card">
        <span class="icon">🏜️</span>
        <span class="condition">Если сухо</span>
        <span class="arrow">→</span>
        <span class="action">включить полив</span>
        <span class="icon-sm">💧</span>
      </div>
      <div class="card">
        <span class="icon">🌑</span>
        <span class="condition">Если темно</span>
        <span class="arrow">→</span>
        <span class="action">включить свет</span>
        <span class="icon-sm">💡</span>
      </div>
      <div class="card">
        <span class="icon">❄️</span>
        <span class="condition">Если холодно</span>
        <span class="arrow">→</span>
        <span class="action">включить обогрев</span>
        <span class="icon-sm">🔥</span>
      </div>
    </div>
  </div>

  <DefinitionCard label="🧠 Усложнение">
    <p>
      Растение нельзя поливать, когда холодно (замёрзнет). Нужно составное
      условие: Если сухо <strong>И</strong> тепло → включить полив.
    </p>
  </DefinitionCard>
</Section>

<Section id="summary">
  <Summary title="Главная мысль">
    <p>
      Логика «если — то» — это способ <strong>предсказывать будущее</strong>.
      Если ты знаешь правила, ты можешь выстроить цепочку событий сегодня, чтобы
      получить нужный результат завтра.
    </p>
    <p>
      Все сложные механизмы мира — от тостера до космической ракеты — состоят из
      простых пар причин и следствий.
    </p>
  </Summary>
</Section>

<style>
  /* #intro */
  :global(#intro) {
    .chaos {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 0.5rem 1rem;
      justify-content: start;
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: var(--color-warning-100);
      border-radius: var(--radius-container);
      font-size: 1.25rem;

      .item {
        display: contents;
      }

      .action {
        font-weight: 500;
        white-space: nowrap;
      }

      .arrow {
        color: var(--color-error-500);
        text-align: center;
      }

      .result {
        color: var(--color-error-600);
        font-weight: 600;
        white-space: nowrap;
      }
    }
  }

  /* #rigid-link */
  :global(#rigid-link) {
    .caption {
      font-size: 1.05rem;
      font-style: italic;
      color: var(--color-surface-600);
      margin: 1.5rem 0 0;
    }

    .implication {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        padding: 1rem 1.25rem;
        border-radius: calc(var(--radius-container) * 4);

        &.condition {
          background: var(--color-primary-100);
          border: 2px solid var(--color-primary-300);
        }

        &.result {
          background: var(--color-success-100);
          border: 2px solid var(--color-success-400);
        }

        .icon {
          font-size: 2rem;
        }

        .text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-surface-700);
        }

        .example {
          font-size: 0.85rem;
          color: var(--color-surface-600);
          font-style: italic;
        }
      }

      .connector {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;

        .arrow {
          font-size: 1.75rem;
          color: var(--color-primary-500);
          font-weight: 700;
        }

        .label {
          font-size: 0.75rem;
          color: var(--color-surface-500);
        }
      }
    }

    .simulation {
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      margin: 2rem 0;

      .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .icon {
          font-size: 2.5rem;
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
          flex: 1;
        }

        .reset-btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--color-surface-300);
          border-radius: var(--radius-container);
          background: var(--color-surface-100);
          cursor: pointer;
          font-size: 0.9rem;

          &:hover {
            background: var(--color-surface-200);
          }
        }
      }

      .circuit-block {
        margin: 1.5rem 0;

        .circuit-label {
          font-size: 0.95rem;
          color: var(--color-surface-600);
          margin-bottom: 0.75rem;
          font-weight: 500;
          text-align: center;
        }
      }

      .circuit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        .element {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          border: none;
          background: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;

          .icon {
            font-size: 2.5rem;
          }

          .label {
            font-size: 0.85rem;
            color: var(--color-surface-600);
            text-align: center;
          }

          &.btn {
            cursor: pointer;
            border-radius: var(--radius-container);
            transition: background 0.1s;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;

            @media (hover: hover) {
              &:hover {
                background: var(--color-surface-100);
              }
            }

            &:active {
              background: var(--color-primary-100);
            }
          }

          &.not-gate {
            background: var(--color-warning-100);
            border-radius: var(--radius-container);
            padding: 0.5rem 0.75rem;
            min-width: 3.5rem;
          }

          &.lamp {
            transition: filter 0.2s;

            &.off {
              filter: grayscale(1) opacity(0.5);
            }
          }
        }

        .wire {
          width: 60px;
          height: 6px;
          background: var(--color-surface-300);
          border: none;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;

          &.long {
            /* Ширина = 2 провода + оператор НЕ + gaps */
            width: calc(60px + 60px + 3.5rem + 0.5rem);
          }

          &:hover:not(.cut) {
            background: var(--color-error-300);
          }

          &.active {
            background: var(--color-success-400);
            box-shadow: 0 0 8px var(--color-success-400);
          }

          &.cut {
            background: transparent;
            cursor: default;

            &::before,
            &::after {
              content: "";
              position: absolute;
              top: 0;
              height: 100%;
              width: 35%;
              background: var(--color-surface-300);
              border-radius: 3px;
            }

            &::before {
              left: 0;
            }

            &::after {
              right: 0;
            }

            .cut-mark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 1rem;
              z-index: 1;
            }
          }
        }
      }

      .text {
        text-align: center;
        font-size: 1.125rem;
        margin: 1.5rem 0 0;
        color: var(--color-surface-600);
      }
    }
  }

  /* #one-way */
  :global(#one-way) {
    .examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin: 2rem 0;

      .correct,
      .wrong {
        padding: 1.5rem 2rem;
        border-radius: calc(var(--radius-container) * 4);

        p {
          font-size: 1.25rem;
          margin: 0;
        }
      }

      .correct {
        background: var(--color-success-50);
        border: 2px solid var(--color-success-300);

        .label {
          color: var(--color-success-700);
        }
      }

      .wrong {
        background: var(--color-error-50);
        border: 2px solid var(--color-error-300);

        .label {
          color: var(--color-error-700);
        }
      }

      .label {
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }

      .why {
        margin-top: 0.5rem;
        font-size: 1rem !important;
        font-style: italic;
        color: var(--color-surface-600);
      }
    }

    .causality {
      text-align: center;

      .caption {
        font-size: 1.05rem;
        font-style: italic;
        color: var(--color-surface-600);
        margin: 1.5rem 0 0;
      }

      .title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: var(--color-surface-700);
      }

      .causes-row {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        flex-wrap: nowrap;
      }

      .cause {
        padding: 0.5rem 1rem;
        background: var(--color-primary-100);
        border-radius: var(--radius-container);
        font-size: 1rem;
        border: 1px solid var(--color-primary-200);
        white-space: nowrap;
      }

      .arrows-row {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin: 0.75rem 0;

        .arrow {
          font-size: 1.5rem;
          color: var(--color-primary-500);
          font-weight: 700;
        }
      }

      .result-item {
        padding: 1rem 1.5rem;
        background: var(--color-success-200);
        color: var(--color-surface-900);
        border-radius: var(--radius-container);
        font-weight: 600;
        font-size: 1.25rem;
      }
    }
  }

  /* #chains */
  :global(#chains) {
    .chain {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);

      .step {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: var(--color-surface-50);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
        font-size: 1.25rem;

        &.final {
          background: var(--color-success-100);
          border: 2px solid var(--color-success-400);
        }

        .icon {
          font-size: 2rem;
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: var(--color-primary-500);
        margin: 0.25rem 0 0.25rem 2rem;
      }
    }
  }

  /* #formalization */
  :global(#formalization) {
    .formal {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;

      .block {
        padding: 2rem;
        border-radius: calc(var(--radius-container) * 4);
        background: var(--color-surface-50);

        h3 {
          margin-top: 0;
          font-size: 1.25rem;
        }

        p {
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .math-symbol {
          font-size: 1.5rem;
          color: var(--color-primary-600);
        }

        .formula {
          background: var(--color-surface-100);
          padding: 1.25rem 2rem;
          border-radius: var(--radius-container);
          font-family: "Georgia", serif;
          font-size: 1.5rem;
          text-align: center;
        }

        .explanation {
          font-size: 1rem !important;
          font-style: italic;
          color: var(--color-surface-600);
          margin-top: 1rem;
          text-align: center;
        }
      }
    }

    .flowchart-svg {
      width: 100%;
      max-width: 320px;
      height: auto;
      margin: 1rem auto 0;
      display: block;
    }
  }

  /* #project */
  :global(#project) {
    .greenhouse {
      margin: 2rem 0;

      .rules {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.25rem;
          background: var(--color-surface-50);
          border-radius: calc(var(--radius-container) * 4);
          box-shadow: 0 4px 12px
            color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
          font-size: 1.05rem;
          white-space: nowrap;

          .icon {
            font-size: 1.5rem;
          }

          .icon-sm {
            font-size: 1.25rem;
          }

          .condition {
            font-weight: 500;
          }

          .arrow {
            color: var(--color-primary-500);
            font-weight: 700;
          }

          .action {
            color: var(--color-success-700);
            font-weight: 600;
          }
        }
      }
    }
  }

  @media (max-width: 1100px) {
    :global(#one-way) .examples {
      grid-template-columns: 1fr;
    }
  }
</style>
