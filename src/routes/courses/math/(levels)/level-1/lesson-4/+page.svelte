<script>
  import {
    Crisis,
    DefinitionCard,
    QuizCard,
    Summary,
    TakeawayCard,
    VisualBreak,
  } from "../../components";
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о логических связках «если — то». Учимся строить цепочки причин и следствий."
  />
</svelte:head>

<!-- Крючок: мир без связей -->
<section id="intro">
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
</section>

<!-- Шаг 1: Жёсткая сцепка -->
<section id="rigid-link">
  <h2>Жёсткая сцепка: атом логики</h2>
  <p>
    Мы вводим понятие <strong>«если — то»</strong> не как абстракцию, а как механический
    рычаг. Это железная дорога: стрелка перевода путей. Поезд (событие) не может поехать
    иначе, если рельсы (условие) проложены определённым образом.
  </p>

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
    </div>
    <div class="circuit">
      <div class="element">
        <div class="icon">🔘</div>
        <div class="label">Кнопка</div>
      </div>
      <div class="wire"></div>
      <div class="element">
        <div class="icon">💡</div>
        <div class="label">Лампа</div>
      </div>
    </div>
    <p class="text">
      Ученик нажимает кнопку — лампа загорается. Отпускает — гаснет. Если
      разорвать провод ✂️ и нажать снова — лампа не горит.
    </p>
    <TakeawayCard>
      <p>
        Связь «если нажата кнопка — то горит свет» существует только пока цела
        структура (правило). <strong>Мы создаём правила сами.</strong>
      </p>
    </TakeawayCard>
  </div>
</section>

<!-- Шаг 2: Односторонняя направленность -->
<section id="one-way">
  <h2>Односторонняя улица</h2>
  <p>
    Самая частая ошибка новичков — думать, что связь работает в обе стороны. Но
    логика — это улица с односторонним движением.
  </p>

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
      <div class="grid">
        <div class="causes">
          <div class="item">🌧️ Дождь</div>
          <div class="item">💧 Ведро воды</div>
          <div class="item">🚿 Полив</div>
        </div>
        <div class="arrows">
          <span class="arrow">→</span>
          <span class="arrow">→</span>
          <span class="arrow">→</span>
        </div>
        <div class="results">
          <div class="item">💦 Мокрый асфальт</div>
        </div>
      </div>
      <p class="caption">
        Видя результат, нельзя точно сказать, какая именно причина его вызвала.
        Логика работает <strong>от причины к следствию</strong>, не наоборот.
      </p>
    </div>
  </VisualBreak>
</section>

<!-- Шаг 3: Цепочки -->
<section id="chains">
  <h2>Цепочки событий</h2>
  <p>
    События редко ходят поодиночке. Одно запускает другое. Как домино — толкнул
    первое, упало последнее. Это <strong>машина Голдберга</strong>: сложная
    цепочка простых «если — то».
  </p>

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
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>
    Переводим интуицию «рычагов» и «воронок» на язык символов. Нам не нужно
    много слов, нам нужна стрелка.
  </p>

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
      <div class="flowchart">
        <div class="row">
          <div class="diamond">Условие?</div>
        </div>
        <div class="row branches">
          <div class="branch yes">
            <span class="line">✓</span>
            <span>Да → выполнить действие</span>
          </div>
          <div class="branch no">
            <span class="line">✗</span>
            <span>Нет → пропустить</span>
          </div>
        </div>
      </div>
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
</section>

<!-- Проверка понимания -->
<section id="quiz">
  <h2>Проверь себя</h2>

  <QuizCard icon="🍋">
    <p>
      <strong>Ловушка обратной логики:</strong> если человек ест лимон, он морщится.
      Человек морщится. Значит ли это, что он ест лимон?
    </p>
    {#snippet answer()}
      <p>Нет! Он может морщиться от яркого солнца, от боли или от запаха.</p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🀄">
    <p>
      <strong>Разрыв цепи:</strong> у нас есть цепочка из 5 домино. Мы убрали третье.
      Толкаем первое. Упадёт ли пятое? Почему?
    </p>
    {#snippet answer()}
      <p>
        Нет! Первое и второе упадут, но третьего нет — четвёртое и пятое
        останутся стоять.
      </p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🚗">
    <p>
      <strong>Скрытые условия:</strong> «машина едет, если нажат газ». Достаточно
      ли только нажать газ, чтобы машина поехала?
    </p>
    {#snippet answer()}
      <p>
        Нет! Должен быть бензин, мотор должен быть заведён, колёса должны
        касаться дороги...
      </p>
    {/snippet}
  </QuizCard>
</section>

<!-- Мини-проект -->
<section id="project">
  <h2>Мини-проект: умная теплица</h2>
  <p>
    Давайте построим логику для автоматической теплицы. У нас есть датчики
    (условия) и устройства (действия).
  </p>

  <div class="greenhouse">
    <div class="rules">
      <div class="card">
        <div class="condition">
          <span class="icon">🏜️</span>
          <span>Если сухо</span>
        </div>
        <div class="arrow">→</div>
        <div class="action">
          <span>Включить полив</span>
          <span class="icon-sm">💧</span>
        </div>
      </div>
      <div class="card">
        <div class="condition">
          <span class="icon">🌑</span>
          <span>Если темно</span>
        </div>
        <div class="arrow">→</div>
        <div class="action">
          <span>Включить свет</span>
          <span class="icon-sm">💡</span>
        </div>
      </div>
      <div class="card">
        <div class="condition">
          <span class="icon">❄️</span>
          <span>Если холодно</span>
        </div>
        <div class="arrow">→</div>
        <div class="action">
          <span>Включить обогрев</span>
          <span class="icon-sm">🔥</span>
        </div>
      </div>
    </div>
  </div>

  <TakeawayCard icon="🧠" variant="danger">
    <p>
      <strong>Усложнение:</strong> растение нельзя поливать, когда холодно
      (замёрзнет). Нужно составное условие:
      <em>Если сухо <strong>И</strong> тепло → Включить полив.</em>
    </p>
  </TakeawayCard>
</section>

<section id="summary">
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
</section>

<style>
  /* #intro */
  #intro {
    .chaos {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: var(--color-warning-100);
      border-radius: var(--radius-container);

      .item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.25rem;
      }

      .action {
        font-weight: 500;
      }

      .arrow {
        color: var(--color-error-500);
      }

      .result {
        color: var(--color-error-600);
        font-weight: 600;
      }
    }
  }

  /* #rigid-link */
  #rigid-link {
    .caption {
      font-size: 1.05rem;
      font-style: italic;
      color: var(--color-surface-600);
      margin: 1.5rem 0 0;
    }

    .implication {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.5rem 2rem;
        border-radius: calc(var(--radius-container) * 4);
        min-width: 160px;

        &.condition {
          background: var(--color-primary-100);
          border: 2px solid var(--color-primary-300);
        }

        &.result {
          background: var(--color-success-100);
          border: 2px solid var(--color-success-400);
        }

        .icon {
          font-size: 2.5rem;
        }

        .text {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-surface-700);
        }

        .example {
          font-size: 0.95rem;
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
          font-size: 2rem;
          color: var(--color-primary-500);
          font-weight: 700;
        }

        .label {
          font-size: 0.85rem;
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
        }
      }

      .circuit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin: 2rem 0;

        .element {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;

          .icon {
            font-size: 3rem;
          }

          .label {
            font-size: 1rem;
            color: var(--color-surface-600);
          }
        }

        .wire {
          width: 100px;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--color-surface-400) 0%,
            var(--color-surface-400) 45%,
            transparent 45%,
            transparent 55%,
            var(--color-surface-400) 55%
          );
          background-size: 20px 4px;
          animation: wire-flow 0.5s linear infinite;
        }
      }

      .text {
        text-align: center;
        font-size: 1.25rem;
        margin: 1.5rem 0;
      }
    }
  }

  @keyframes wire-flow {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 20px 0;
    }
  }

  /* #one-way */
  #one-way {
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

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;

        .causes {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;

          .item {
            padding: 0.75rem 1.25rem;
            background: var(--color-primary-100);
            border-radius: var(--radius-container);
            font-size: 1.125rem;
            border: 1px solid var(--color-primary-200);
          }
        }

        .arrows {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;

          .arrow {
            font-size: 1.5rem;
            color: var(--color-primary-500);
            font-weight: 700;
          }
        }

        .results {
          display: flex;
          align-items: center;

          .item {
            padding: 1rem 1.5rem;
            background: var(--color-success-500);
            color: var(--color-success-contrast-500);
            border-radius: var(--radius-container);
            font-weight: 600;
            font-size: 1.25rem;
          }
        }
      }
    }
  }

  /* #chains */
  #chains {
    .chain {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);

      .step {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 2rem;
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
        margin: 0.25rem 0;
      }
    }
  }

  /* #formalization */
  #formalization {
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

    .flowchart {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .row {
        display: flex;
        justify-content: center;
      }

      .diamond {
        padding: 1rem 2rem;
        background: var(--color-warning-100);
        border: 2px solid var(--color-warning-400);
        border-radius: var(--radius-container);
        font-weight: 600;
        font-size: 1.125rem;
      }

      .branches {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .branch {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        border-radius: var(--radius-container);
        font-size: 1rem;

        &.yes {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }

        &.no {
          background: var(--color-surface-100);
          color: var(--color-surface-600);
        }

        .line {
          font-weight: 700;
          font-size: 1.25rem;
        }
      }
    }
  }

  /* #project */
  #project {
    .greenhouse {
      margin: 2rem 0;

      .rules {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          background: var(--color-surface-50);
          border-radius: calc(var(--radius-container) * 4);
          box-shadow: 0 4px 12px
            color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

          .condition {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
          }

          .icon,
          .icon-sm {
            font-size: 1.75rem;
          }

          .arrow {
            font-size: 1.5rem;
            color: var(--color-primary-500);
            font-weight: 700;
          }

          .action {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.25rem;
            color: var(--color-success-700);
            font-weight: 600;
          }
        }
      }
    }
  }

  @media (max-width: 1100px) {
    #rigid-link .implication {
      flex-direction: column;
      gap: 1rem;
    }

    #one-way {
      .causality .grid {
        flex-direction: column;
      }

      .arrows {
        flex-direction: row;
      }

      .examples {
        grid-template-columns: 1fr;
      }
    }

    #project .greenhouse .rules .card {
      flex-wrap: wrap;
    }
  }
</style>
