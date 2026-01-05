<script>
  import {
    Crisis,
    DefinitionCard,
    Summary,
    TakeawayCard,
  } from "../../components";
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о высказываниях и бинарной логике. Учимся отличать факты от мнений."
  />
</svelte:head>

<!-- Крючок: история с роботом -->
<section id="crisis">
  <Crisis icon="🤖" title="Катастрофа на кухне">
    <p>
      Представьте, что вы купили новейшего домашнего робота. Он идеально знает
      физику, но совсем не понимает человеческих намеков. Вы даёте ему команду:
    </p>
    <blockquote>«Сделай мне хороший чай»</blockquote>
    <p>Робот зависает, дымится или заваривает чай в ледяной воде. Почему?</p>
    <p>
      Потому что <strong>«хороший»</strong> — это не точная инструкция. Для робота
      (и для математики) это пустой звук. Ваш «хороший» чай может быть сладким, а
      для друга — без сахара.
    </p>

    {#snippet question()}
      <p>
        Как нам общаться с миром и технологиями так, чтобы нас понимали
        однозначно? Если мы строим мост, запускаем ракету или пишем программу,
        мы не можем использовать слова «нормальный», «красивый» или «немного».
      </p>
      <p><strong>Нам нужен язык, в котором не бывает споров.</strong></p>
    {/snippet}
  </Crisis>
</section>

<!-- Основной концептуальный блок -->
<section id="reality-filter">
  <h2>Фильтр реальности</h2>
  <p>
    Математика начинается не с чисел, а с умения отсекать лишнее. Чтобы
    превратить хаос жизни в порядок, мы используем <strong>высказывания</strong>
    (утверждения).
  </p>

  <DefinitionCard>
    <p>
      <strong>Высказывание</strong> — это такое предложение, про которое можно
      абсолютно точно сказать: это
      <span class="true-label">правда (Истина)</span>
      или это
      <span class="false-label">неправда (Ложь)</span>. Третьего не дано.
    </p>
  </DefinitionCard>

  <!-- Визуальная метафора -->
  <div class="visual-break">
    <div class="fog-laser">
      <div class="titles-row">
        <div>Туман мнений</div>
        <div>Чёткость фактов</div>
      </div>

      <div class="icons-row">
        <div class="fog-cloud">☁️</div>
        <div class="prism">▶</div>
        <div class="laser-icon">🔍</div>
      </div>

      <div class="labels-row">
        <div class="fog-labels">
          <span>Вкусно</span>
          <span>Холодно</span>
          <span>Красиво</span>
        </div>
        <div class="laser-labels">
          <span class="true">Истина</span>
          <span class="false">Ложь</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="unambiguity-test">
  <h2>Тест на однозначность</h2>
  <p>
    Как проверить, является ли фраза математическим утверждением? Попробуйте
    представить, что вы — судья, который должен вынести вердикт прямо сейчас.
  </p>

  <div class="example-cards">
    <div class="card opinion">
      <div class="phrase">«Суп вкусный»</div>
      <div class="verdict">
        <span class="icon">🤷</span>
        <span>Судья в замешательстве. Кому вкусный? Вердикт невозможен.</span>
      </div>
      <div class="label">Это мнение</div>
    </div>

    <div class="card statement">
      <div class="phrase">«В супе есть картошка»</div>
      <div class="verdict">
        <span class="icon">⚖️</span>
        <span>Судья смотрит в тарелку. Картошка есть? Да или нет.</span>
      </div>
      <div class="label">Это утверждение</div>
    </div>
  </div>
</section>

<section id="binary-world">
  <h2>Бинарный мир</h2>
  <p>
    В математике утверждение похоже на выключатель света. Он либо включён, либо
    выключен. Нет состояния «немножко горит».
  </p>

  <div
    class="visual"
    aria-label="Демонстрация двоичного выключателя: ложь и истина"
  >
    <div class="pill false">
      <div class="value">0</div>
      <div class="label">Ложь</div>
    </div>

    <div class="pill true">
      <div class="value">1</div>
      <div class="label">Истина</div>
    </div>
  </div>
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>
    Переходим от слов к символам. Математики ленивы и не любят писать длинные
    слова «Истина» или «Ложь».
  </p>

  <ol class="formal-steps">
    <li>
      <p>
        Мы обозначаем утверждение любой латинской буквой. Например, <em>A</em>.
      </p>
      <div class="formula-block">
        <em>A</em> = «Сейчас идет дождь»
      </div>
    </li>
    <li>
      <p>У <em>A</em> есть значение истинности:</p>
      <ul>
        <li>
          Если дождь идёт, <em>A</em> =
          <strong class="truth-value true">1</strong> (или True, Истина).
        </li>
        <li>
          Если дождь <em>не</em> идёт, <em>A</em> =
          <strong class="truth-value false">0</strong> (или False, Ложь).
        </li>
      </ul>
    </li>
  </ol>

  <TakeawayCard>
    <p>
      Это — <strong>бит информации</strong>. Фундамент, на котором стоит вся
      цифровая вселенная.
    </p>
  </TakeawayCard>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <p>
      Математика начинается там, где исчезает двусмысленность. Мир состоит не из
      эмоций, а из фактов, которые могут быть либо истинными (<strong>1</strong
      >), либо ложными (<strong>0</strong>). Всё остальное — это просто шум.
    </p>
  </Summary>
</section>

<style>
  /* фильтр реальности: определение + туман/лазер */
  #reality-filter {
    .true-label {
      color: var(--color-success-600);
      font-weight: 600;
    }

    .false-label {
      color: var(--color-error-600);
      font-weight: 600;
    }

    .visual-break {
      margin: 3rem -2.5rem;
      padding: 2.5rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container, 0.25rem) * 4);
    }

    .fog-laser {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
    }

    .titles-row,
    .icons-row,
    .labels-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 520px;
      gap: 3rem;
    }

    .titles-row > * {
      margin-bottom: 0.75rem;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-surface-700);
    }

    .fog-cloud {
      font-size: 5rem;
      opacity: 0.6;
    }

    .fog-labels,
    .laser-labels {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 1.125rem;
    }

    .labels-row {
      align-items: center;
    }

    .fog-labels {
      color: var(--color-surface-500);
      font-style: italic;
    }

    .laser-labels {
      .true {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-success-600);
      }

      .false {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-error-600);
      }
    }

    .prism {
      font-size: 4rem;
      color: var(--color-surface-400);
    }

    .laser-icon {
      font-size: 3rem;
      color: var(--color-primary-700);
    }
  }

  /* карточки примеров */
  #unambiguity-test {
    .example-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin: 2rem 0;

      .card {
        border-radius: calc(var(--radius-container, 0.25rem) * 4);
        padding: 2rem;
        box-shadow: 0 12px 32px
          color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

        &.opinion {
          background: var(--color-surface-100);
          border: 2px dashed var(--color-surface-300);

          .label {
            color: var(--color-surface-500);
          }
        }

        &.statement {
          background: var(--color-success-50);
          border: 2px solid var(--color-success-300);

          .label {
            color: var(--color-surface-800);
          }
        }
      }

      .phrase {
        font-size: 1.375rem;
        font-weight: 600;
        margin-bottom: 1.25rem;
      }

      .verdict {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        font-size: 1.125rem;
        color: var(--color-surface-600);
        margin-bottom: 1.25rem;
      }

      .icon {
        font-size: 1.5rem;
      }

      .label {
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
  }

  /* бинарная визуализация */
  #binary-world {
    .visual {
      display: flex;
      justify-content: center;
      gap: 4rem;
      margin: 3rem 0;

      .pill {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.25rem;
      }

      .value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 999px;
        font-weight: 600;
        font-size: 1.75rem;
        border: 2px solid var(--color-surface-400);
        background: var(--color-surface-50);
      }

      .label {
        font-size: 1.125rem;
        color: var(--color-surface-700);
      }

      .pill.true .value {
        border-color: var(--color-primary-400);
        background: var(--color-primary-50);
        color: var(--color-primary-800);
      }

      .pill.false .value {
        color: var(--color-surface-700);
      }
    }
  }

  /* значения истинности и формализация */
  #formalization {
    .truth-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.375rem;
      font-size: 1.125rem;
    }

    .truth-value.true {
      background: var(--color-success-100);
      color: var(--color-success-700);
    }

    .truth-value.false {
      background: var(--color-surface-200);
      color: var(--color-surface-700);
    }

    .formal-steps {
      padding-left: 2rem;
      font-size: 1.375rem;

      li {
        margin-bottom: 2rem;
      }
    }

    .formula-block {
      background: var(--color-surface-100);
      padding: 1.25rem 2rem;
      border-radius: calc(var(--radius-container, 0.25rem) * 2);
      font-family: "Georgia", serif;
      font-size: 1.375rem;
      margin-top: 0.75rem;
    }
  }

  @media (max-width: 1100px) {
    #unambiguity-test {
      .example-cards {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
