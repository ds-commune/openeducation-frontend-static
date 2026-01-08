<script lang="ts">
  import {
    Crisis,
    FormalBlock,
    QuizCard,
    Section,
    Summary,
  } from "../../components";

  let showAnswer = $state(false);
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок 1.2: Равенство — это баланс. Понимаем знак '=' как весы, а не как команду 'посчитать'."
  />
</svelte:head>

<Section id="crisis">
  <Crisis title="Сломанный мост" icon="🌉">
    <p>
      Представь, что ты строишь мост. Слева у тебя балка весом 5 тонн. Справа —
      две балки: 2 тонны и 3 тонны. Если левая и правая части не будут
      уравновешены, мост рухнет.
    </p>
    <div class="bridge-visual">
      <div class="side left">5т</div>
      <div class="pivot">▲</div>
      <div class="side right">2т + 3т</div>
    </div>
    <blockquote>
      В школе нас учили, что <code>=</code> — это кнопка на калькуляторе, после которой
      появляется ответ. Но в реальной жизни (и в инженерии) знак равенства означает
      <strong>баланс</strong>.
    </blockquote>
  </Crisis>
</Section>

<Section
  id="scales-demo"
  title="Весы истины"
  description="Знак «=» работает как аптекарские весы. Левая чаша должна весить ровно столько же, сколько правая. Не важно, как выглядят гирьки, важен их общий вес."
>
  <div class="scales-demo">
    <div class="scale-pan">
      <div class="weight-circle">5</div>
    </div>
    <div class="scale-center">=</div>
    <div class="scale-pan">
      <div class="weight-group">
        <div class="weight-circle small">2</div>
        <div class="weight-circle small">3</div>
      </div>
    </div>
  </div>
  <p class="caption">
    5 — это не «ответ». 5 — это то же самое, что 2 + 3, просто записанное иначе.
  </p>
</Section>

<Section id="formal-definition">
  <FormalBlock title="Определение">
    <p>
      <strong>Равенство</strong> — это утверждение, что объекты слева и справа имеют
      одинаковую ценность (вес, количество, длину), даже если выглядят по-разному.
    </p>
    <div class="formula">A = B</div>
    <p class="explanation">
      «А» уравновешивает «B». Мы можем заменить «А» на «B» в любой момент, и
      ничего не сломается.
    </p>
  </FormalBlock>
</Section>

<Section
  id="quiz"
  title="Проверка на прочность"
  description="Попробуй найти ошибку в понимании знака равенства."
>
  <div class="quiz-container">
    <QuizCard title="Где правда?">
      <div class="question">
        Какое утверждение лучше описывает знак <code>=</code>?
      </div>
      {#snippet answer()}
        <p>
          <strong>Это весы.</strong> Левая и правая части равноценны. Вариант «это
          кнопка "получить ответ"» — самая частая ошибка новичков.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard title="Перевертыш">
      <div class="question">Правильно ли написать <code>5 = 2 + 3</code>?</div>
      {#snippet answer()}
        <p>
          <strong>Абсолютно!</strong> Если весы уравновешены, неважно, с какой стороны
          лежат гирьки. Читать можно и справа налево.
        </p>
      {/snippet}
    </QuizCard>
  </div>
</Section>

<Section id="summary">
  <Summary title="Ключевая мысль">
    <p>
      Знак равенства (<code>=</code>) — это не команда к действию. Это состояние
      <strong>равновесия</strong>. Когда ты пишешь код или решаешь уравнение, ты
      выступаешь в роли инженера, который следит, чтобы мост не перекосило.
    </p>
  </Summary>
</Section>

<style>
  /* Crisis */
  :global(#crisis) {
    .bridge-visual {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      font-family: "Consolas", monospace;
      font-size: 1.5rem;

      .side {
        padding: 1rem 2rem;
        border-bottom: 4px solid var(--color-surface-900);
        background: var(--color-surface-100);
        border-radius: var(--radius-base) var(--radius-base) 0 0;
      }

      .pivot {
        color: var(--color-primary-600);
        font-size: 2rem;
        transform: translateY(4px);
      }
    }
  }

  /* Scales Demo */
  :global(#scales-demo) {
    .scales-demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 3rem 0;

      .scale-pan {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: var(--color-surface-200);
        box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.1);

        .weight-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--color-primary-500);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

          &.small {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
            background: var(--color-secondary-500);
          }
        }

        .weight-group {
          display: flex;
          gap: 0.5rem;
        }
      }

      .scale-center {
        font-size: 3rem;
        font-weight: 800;
        color: var(--color-primary-600);
      }
    }

    .caption {
      text-align: center;
      font-style: italic;
      color: var(--color-surface-600);
      margin-top: 1rem;
    }
  }

  /* Formal Definition */
  :global(#formal-definition) {
    .formula {
      font-family: "Consolas", monospace;
      font-size: 2.5rem;
      text-align: center;
      margin: 1.5rem 0;
      color: var(--color-primary-700);
      font-weight: 700;
    }

    .explanation {
      text-align: center;
      color: var(--color-surface-700);
    }
  }

  /* Quiz */
  :global(#quiz) {
    .quiz-container {
      display: grid;
      gap: 1.5rem;

      .question {
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
    }
  }

  /* Summary */
  :global(#summary) {
    p {
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    :global(#scales-demo) .scales-demo {
      flex-direction: column;
      gap: 1rem;

      .scale-center {
        transform: rotate(90deg);
      }
    }
  }
</style>