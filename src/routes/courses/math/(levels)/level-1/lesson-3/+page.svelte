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
    content="Урок о логическом отрицании НЕ (NOT). Учимся исключать лишнее и понимать противоречия."
  />
</svelte:head>

<!-- Крючок: комната с двумя дверьми -->
<section id="door-paradox">
  <Crisis icon="🚪" title="Комната с двумя дверьми">
    <p>
      Представьте: вы стоите перед двумя дверьми. За одной — выход, за другой —
      тупик. На стене висит экран с роботом-стражником.
    </p>
    <blockquote>
      «Выход находится за левой дверью. И выход находится НЕ за левой дверью»
    </blockquote>
    <p>
      Вы пытаетесь открыть левую дверь — заперта. Правую — тоже заперта. Система
      безопасности заблокирована.
    </p>

    {#snippet question()}
      <p>
        Робот получил инструкцию, которую невозможно выполнить. Как можно
        одновременно <em>быть</em> и <em>не быть</em> в одном месте?
      </p>
      <p>
        <strong>Как исправить логику робота, чтобы двери открылись?</strong>
      </p>
    {/snippet}
  </Crisis>
</section>

<!-- Отрицание как инструмент скульптора -->
<section id="michelangelo-method">
  <h2>Метод Микеланджело</h2>
  <p>
    Объясняем «НЕ» не как пустоту, а как инструмент скульптора. Когда мы говорим
    «это НЕ красное», мы не просто отрицаем красноту — мы утверждаем, что объект
    имеет <em>любой другой</em> цвет.
  </p>

  <VisualBreak>
    <div class="sculptor">
      <div class="block">🪨</div>
      <div class="arrow">→</div>
      <div class="result">🦁</div>
    </div>
    <p class="caption">
      «Как сделать льва? Просто убери всё, что НЕ является львом».
    </p>
  </VisualBreak>

  <DefinitionCard label="Принцип">
    <p>
      <strong>Оператор «НЕ»</strong> — это фильтр реальности. Он отсекает неподходящее,
      оставляя только нужное. Это мощный инструмент уточнения.
    </p>
  </DefinitionCard>
</section>

<!-- Инверсия в бинарном мире -->
<section id="binary-inversion">
  <h2>Переключатель в бинарном мире</h2>
  <p>
    Если вариантов всего два (свет включён / свет выключен), то «НЕ» работает
    как мгновенный телепорт к правильному ответу.
  </p>

  <div class="metaphor">
    <div class="icon">🪙</div>
    <div class="content">
      <strong>Метафора монеты:</strong> если я закрыл монету рукой и сказал «там
      НЕ орёл», ты
      <em>точно</em> знаешь, что там решка. Тебе не нужно видеть решку, чтобы знать
      это.
    </div>
  </div>

  <div class="inverter">
    <div class="state true-state">
      <span class="label">1</span>
      <span class="text">Истина</span>
    </div>
    <div class="action">
      <span class="operator">НЕ</span>
      <span class="arrow">⇄</span>
    </div>
    <div class="state false-state">
      <span class="label">0</span>
      <span class="text">Ложь</span>
    </div>
  </div>

  <TakeawayCard icon="🔄">
    <p>
      <strong>Двойное отрицание</strong> возвращает к исходной истине: НЕ (НЕ правда)
      = правда
    </p>
  </TakeawayCard>
</section>

<!-- Закон непротиворечия -->
<section id="contradiction-law">
  <h2>Почему робот сломался</h2>
  <p>
    Вернёмся к кризису. В реальности объект не может обладать свойством и не
    обладать им в один и тот же момент времени. Это фундаментальный <strong
      >закон непротиворечия</strong
    >.
  </p>

  <div class="demo">
    <div class="box">
      <div class="circle"></div>
      <div class="labels">
        <span class="blue">Покрась в синий</span>
        <span class="icon">⚡</span>
        <span class="not-blue">Сделай НЕ синим</span>
      </div>
    </div>
    <p class="result">
      💥 Противоречие разрушает логическую структуру. Это «баг» реальности.
    </p>
  </div>
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>Переходим от интуиции к языку математики.</p>

  <div class="grid">
    <div class="card">
      <h3>Символ отрицания</h3>
      <p>
        Вводим знак <strong>¬</strong> (или черту над буквой Ā, или оператор NOT).
      </p>
      <div class="formula">
        <em>A</em> = «Идёт дождь»<br />
        <em>¬A</em> = «Дождь НЕ идёт»
      </div>
    </div>

    <div class="card">
      <h3>Таблица истинности</h3>
      <div class="table-wrapper">
        <div class="row header">
          <span>Вход</span>
          <span>Выход (НЕ)</span>
        </div>
        <div class="row">
          <span class="true">1 (Истина)</span>
          <span class="false">0 (Ложь)</span>
        </div>
        <div class="row">
          <span class="false">0 (Ложь)</span>
          <span class="true">1 (Истина)</span>
        </div>
      </div>
    </div>
  </div>

  <TakeawayCard icon="⚠️" variant="danger">
    <p>
      <strong>Запись противоречия:</strong> A И ¬A = Невозможно (всегда Ложь)
    </p>
  </TakeawayCard>
</section>

<!-- Проверка понимания -->
<section id="quiz">
  <h2>Проверь себя</h2>

  <QuizCard icon="🤔">
    <p>
      <strong>Вопрос 1:</strong> если утверждение «в коробке лежит мяч» ложное, то
      что является истиной?
    </p>
    {#snippet answer()}
      <p>В коробке НЕТ мяча (или лежит что-то другое).</p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🤔">
    <p>
      <strong>Вопрос 2:</strong> мистер Икс говорит: «Я сейчас молчу». Почему это
      утверждение ломает логику?
    </p>
    {#snippet answer()}
      <p>
        Если он говорит — он НЕ молчит. Если молчит — не может это сказать.
        Парадокс!
      </p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🎯">
    <p>
      <strong>Вопрос 3:</strong> в комнате есть только красные и синие шары. Ты достал
      шар, он НЕ красный. Какого он цвета?
    </p>
    {#snippet answer()}
      <p>Синий. В бинарном мире «НЕ одно» означает «точно другое».</p>
    {/snippet}
  </QuizCard>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <blockquote>
      «Отрицание — это не отсутствие знания. Знать, чем вещь <strong
        >не является</strong
      >, часто так же важно, как знать, чем она <strong>является</strong>. В
      мире, где есть только два варианта, «НЕТ» означает «ДА» для
      противоположного».
    </blockquote>
  </Summary>
</section>

<style>
  /* Section: Michelangelo Method */
  #michelangelo-method {
    .sculptor {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      margin-bottom: 1.5rem;

      .block,
      .result {
        font-size: 5rem;
      }

      .arrow {
        font-size: 3rem;
        color: var(--color-surface-400);
      }
    }

    .caption {
      font-style: italic;
      color: var(--color-surface-600);
      margin: 0;
      font-size: 1.25rem;
      text-align: center;
    }

    @media (max-width: 1100px) {
      .sculptor {
        gap: 1.5rem;

        .block,
        .result {
          font-size: 3.5rem;
        }
      }
    }
  }

  /* Section: Binary Inversion */
  #binary-inversion {
    .metaphor {
      display: flex;
      gap: 1.25rem;
      background: var(--color-primary-50);
      border-radius: calc(var(--radius-container) * 4);
      padding: 2rem;
      margin: 2rem 0;

      .icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }

      .content {
        font-size: 1.25rem;
        line-height: 1.6;
      }
    }

    .inverter {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 3rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 4);

      .state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        .label {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
        }

        .text {
          font-size: 1.05rem;
          font-weight: 500;
        }

        &.true-state .label {
          background: var(--color-success-500);
          color: var(--color-surface-950);
          box-shadow: 0 0 24px
            color-mix(in oklab, var(--color-success-500) 0.4, transparent);
        }

        &.false-state .label {
          background: var(--color-surface-200);
          color: var(--color-surface-600);
        }
      }

      .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 1rem 1.5rem;
        background: var(--color-error-100);
        border-radius: var(--radius-container);

        .operator {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-error-700);
        }

        .arrow {
          font-size: 1.5rem;
          color: var(--color-error-500);
        }
      }
    }

    @media (max-width: 1100px) {
      .inverter {
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  }

  /* Section: Contradiction Law */
  #contradiction-law {
    .demo {
      margin: 2rem 0;
      text-align: center;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        padding: 2.5rem;
        background: var(--color-surface-50);
        border-radius: calc(var(--radius-container) * 4);
        margin-bottom: 1.5rem;
      }

      .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(
          45deg,
          var(--color-primary-500),
          var(--color-error-500),
          var(--color-primary-500),
          var(--color-error-500)
        );
        background-size: 200% 200%;
        animation: conflict-pulse 1s ease-in-out infinite;
      }

      .labels {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.125rem;

        .blue {
          color: var(--color-primary-600);
          font-weight: 600;
        }

        .not-blue {
          color: var(--color-error-600);
          font-weight: 600;
        }

        .icon {
          font-size: 1.5rem;
        }
      }

      .result {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--color-error-700);
        margin: 0;
      }
    }
  }

  @keyframes conflict-pulse {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Section: Formalization */
  #formalization {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .card {
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
    }

    .formula {
      background: var(--color-surface-200);
      padding: 1.25rem 2rem;
      border-radius: var(--radius-container);
      font-family: "Georgia", serif;
      font-size: 1.25rem;
    }

    .table-wrapper {
      border-radius: var(--radius-container);
      overflow: hidden;
      box-shadow: 0 4px 6px -1px
        color-mix(in oklab, var(--color-surface-950) 0.1, transparent);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;

      &.header {
        background: var(--color-surface-300);
        font-weight: 600;
      }

      span {
        padding: 0.75rem 1rem;
        text-align: center;
        font-size: 1rem;
        border-bottom: 1px solid var(--color-surface-300);
      }

      .true {
        color: var(--color-success-700);
        background: var(--color-success-100);
      }

      .false {
        color: var(--color-error-700);
        background: var(--color-error-100);
      }
    }
  }
</style>
