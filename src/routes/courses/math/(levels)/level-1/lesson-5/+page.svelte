<script lang="ts">
  import { Crisis, DefinitionCard, QuizCard, Summary } from "../../components";

  let activeFilter = $state<"color" | "angles">("color");

  const allShapes = [
    { symbol: "●", color: "red", angles: 0 },
    { symbol: "▲", color: "red", angles: 3 },
    { symbol: "■", color: "red", angles: 4 },
    { symbol: "●", color: "blue", angles: 0 },
    { symbol: "◆", color: "green", angles: 4 },
    { symbol: "★", color: "yellow", angles: 5 },
  ];

  const attracted = $derived(
    allShapes.filter((s) =>
      activeFilter === "color" ? s.color === "red" : s.angles > 3
    )
  );

  const rejected = $derived(
    allShapes.filter((s) =>
      activeFilter === "color" ? s.color !== "red" : s.angles <= 3
    )
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о множествах как инструменте классификации. Учимся обобщать и фильтровать объекты по признакам."
  />
</svelte:head>

<section id="intro">
  <Crisis icon="🏭" title="Свалка цивилизации" questionTitle="Ключевой вопрос">
    <p>
      Вы — оператор гигантского перерабатывающего завода будущего. По конвейеру
      с огромной скоростью несётся поток предметов: старые батарейки, алмазы,
      банановая кожура, золотые монеты, радиоактивные отходы, плюшевые медведи.
    </p>
    <p>
      Система сломана. Всё сбрасывается в одну кучу — в печь. Если сжечь алмазы
      — потеряем деньги. Если не сжечь радиоактивные отходы — заразим город.
    </p>
    <blockquote>
      Поток слишком быстрый, чтобы перебирать вручную. Хаос нарастает, звучит
      сирена перегрузки...
    </blockquote>

    {#snippet question()}
      <p>
        Как объяснить глупой машине, что именно нужно спасти, а что уничтожить,
        <strong>не перечисляя каждый предмет по имени</strong>? Ведь предметов
        бесконечно много. Нам нужен способ обобщать.
      </p>
    {/snippet}
  </Crisis>
</section>

<section id="filter">
  <h2>Признак как фильтр</h2>
  <p>
    Мы не можем сказать машине «возьми этот камень». Мы должны сказать: «хватай
    всё, что блестит». Мы переходим от объекта к его свойству.
  </p>

  <div class="xray">
    <div class="object">🍎</div>
    <div class="arrow">→</div>
    <div class="tags">
      <span class="tag">цвет: красный</span>
      <span class="tag">форма: круглая</span>
      <span class="tag">тип: еда</span>
      <span class="tag">вкус: сладкий</span>
    </div>
  </div>

  <div class="analogy">
    <div class="icon">🚪</div>
    <div class="content">
      <h3>Аналогия: фейс-контроль</h3>
      <p>
        Охраннику в клубе не дают список из 1000 имён гостей. Ему дают правило:
        «в кроссовках нельзя». Это и есть <strong>признак</strong> — свойство, по
        которому мы делим мир на части.
      </p>
    </div>
  </div>
</section>

<section id="creation">
  <h2>Создание множества</h2>
  <p>
    Когда мы применяем правило, мы создаём невидимую границу. Всё, что попадает
    под правило, оказывается «внутри». Это и есть <strong>множество</strong>.
  </p>

  <div class="magnet">
    <div class="controls">
      <div class="label">Настройки магнита:</div>
      <div class="chips">
        <button
          class="chip"
          class:active={activeFilter === "color"}
          onclick={() => (activeFilter = "color")}
        >
          Цвет = красный
        </button>
        <button
          class="chip"
          class:active={activeFilter === "angles"}
          onclick={() => (activeFilter = "angles")}
        >
          Углы &gt; 3
        </button>
      </div>
    </div>
    <div class="visualization">
      <div class="zone">
        <div class="icon">🧲</div>
        <div class="attracted">
          {#each attracted as shape}
            <span class="shape {shape.color}">{shape.symbol}</span>
          {/each}
        </div>
      </div>
      <div class="reject">
        {#each rejected as shape}
          <span class="shape {shape.color}">{shape.symbol}</span>
        {/each}
      </div>
    </div>
  </div>

  <p>
    Только подходящие объекты «притягиваются» к магниту и образуют группу.
    Остальные остаются снаружи.
  </p>
</section>

<section id="binary">
  <h2>Бинарная природа принадлежности</h2>
  <p>
    Для математики (и компьютера) нет «почти подходит». Объект либо
    <strong>в множестве</strong>, либо <strong>нет</strong>. Границы абсолютны.
  </p>

  <div class="light-circle">
    <div class="label">Множество «Живое»</div>
    <div class="circle">
      <div class="inside">
        <span class="object active">🐕</span>
        <span class="object active">🌳</span>
        <span class="object active">🦋</span>
      </div>
    </div>
    <div class="outside">
      <span class="object dimmed">🪑</span>
      <span class="object dimmed">5️⃣</span>
      <span class="object dimmed">🪨</span>
    </div>
  </div>

  <p>
    Внутри освещённого круга — элементы множества. Снаружи — всё остальное.
    Никаких полутонов.
  </p>
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>
    Переведём интуицию «коробки с вещами» на язык математики. Математика — это
    способ записывать наши правила фильтрации максимально коротко.
  </p>

  <DefinitionCard title="Основные обозначения">
    <ul class="list">
      <li>
        <strong>Множество</strong> — наша «коробка» или «круг света». Обозначаем
        заглавной буквой: <span class="math">A</span>,
        <span class="math">B</span>, <span class="math">C</span>.
      </li>
      <li>
        <strong>Элемент</strong> — конкретный объект (яблоко, число 2).
        Обозначаем строчной буквой: <span class="math">a</span>,
        <span class="math">b</span>, <span class="math">x</span>.
      </li>
      <li>
        <strong>Принадлежность</strong>:
        <ul>
          <li>
            «Яблоко в коробке с едой» записываем: <span class="math">a ∈ A</span
            >
          </li>
          <li>
            Символ <span class="math">∈</span> похож на букву «Е» от слова Element.
          </li>
          <li>
            Если объект не подходит: <span class="math">b ∉ A</span>
          </li>
        </ul>
      </li>
    </ul>
  </DefinitionCard>

  <div class="notation">
    <div class="label">Пример записи множества:</div>
    <div class="formula">
      <span class="math">A = {"{"} яблоко, груша, банан {"}"}</span>
    </div>
    <div class="note">
      Фигурные скобки показывают, что внутри — элементы одного множества.
    </div>
  </div>
</section>

<section id="practice">
  <h2>Проверь понимание</h2>

  <div class="grid">
    <QuizCard icon="🥦">
      <h3>Парадокс границы</h3>
      <p>
        Если множество — это «вкусная еда», будет ли брокколи его элементом?
      </p>
      <details>
        <summary>Показать ответ</summary>
        <div class="answer">
          <p>
            Это ловушка! «Вкусная» — субъективное понятие. Для одного человека
            брокколи вкусная, для другого — нет.
          </p>
          <p>
            <strong>Вывод:</strong> множества в математике требуют объективных признаков,
            которые не зависят от мнения.
          </p>
        </div>
      </details>
    </QuizCard>

    <QuizCard icon="∅">
      <h3>Пустота</h3>
      <p>
        Можно ли создать множество, в котором нет ни одного элемента? Приведите
        пример.
      </p>
      <details>
        <summary>Показать ответ</summary>
        <div class="answer">
          <p>
            Да! Например: «множество летающих слонов» или «множество квадратных
            кругов».
          </p>
          <p>
            Такое множество называется <strong>пустым</strong> и обозначается
            символом <span class="math">∅</span> или
            <span class="math">{"{ }"}</span>.
          </p>
        </div>
      </details>
    </QuizCard>

    <QuizCard icon="5️⃣">
      <h3>Контекст</h3>
      <p>
        Является ли число 5 элементом множества «цифры номера телефона»? А
        множества «оценки в школе»?
      </p>
      <details>
        <summary>Показать ответ</summary>
        <div class="answer">
          <p>
            Да и да! Один и тот же объект может входить в разные множества
            одновременно.
          </p>
          <p>
            Число 5 — это и цифра в номере, и школьная оценка, и номер дома, и
            количество пальцев на руке...
          </p>
        </div>
      </details>
    </QuizCard>
  </div>
</section>

<section id="project">
  <h2>Мини-проект: умный плейлист</h2>

  <div class="card">
    <div class="scenario">
      <p>
        У вас есть база из 10 000 музыкальных треков. Нужно собрать плейлист для
        утренней пробежки. Вручную выбирать долго.
      </p>
    </div>

    <div class="tasks">
      <h3>Задание</h3>
      <ol>
        <li>
          Определите точные признаки для множества <span class="math">R</span> (Run).
          Нельзя использовать субъективные понятия вроде «бодрая» — компьютер их не
          поймёт. Используйте параметры: BPM, жанр, год.
        </li>
        <li>
          Запишите условия фильтрации, например:
          <div class="formula-example">
            <span class="math">{"{"} x | BPM &gt; 120 и Жанр ≠ Джаз {"}"}</span>
          </div>
        </li>
        <li>
          Представьте ситуацию, когда отличная песня не попала в выборку. Почему
          ваш алгоритм ошибся?
        </li>
      </ol>
    </div>
  </div>
</section>

<section id="summary">
  <Summary title="Главная мысль">
    <blockquote>
      Множество — это не просто группа предметов. Это <strong>правило</strong>,
      которое отделяет нужное от ненужного. Умение мыслить множествами — это
      умение видеть не хаос вещей, а структуру мира.
    </blockquote>
  </Summary>
</section>

<style>
  /* Общие стили для математических символов */
  .math {
    font-family: "Times New Roman", serif;
    font-size: 1.1em;
    color: var(--color-primary-800);
    background: rgba(255, 255, 255, 0.6);
    padding: 0.1em 0.4em;
    border-radius: var(--radius-base);
  }

  /* Filter Section */
  #filter {
    .xray {
      display: flex;
      align-items: center;
      gap: 2rem;
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;

      .object {
        font-size: 5rem;
      }

      .arrow {
        font-size: 2rem;
        color: var(--color-surface-400);
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .tag {
        background: var(--color-primary-100);
        color: var(--color-primary-800);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-base);
        font-family: monospace;
        font-size: 1rem;
      }
    }

    .analogy {
      display: flex;
      gap: 1.5rem;
      background: var(--color-primary-50);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;

      .icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .content p {
        margin: 0;
        font-size: 1.25rem;
      }
    }
  }

  /* Creation Section */
  #creation {
    .magnet {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;

      .controls {
        margin-bottom: 2rem;

        .label {
          font-size: 1rem;
          color: var(--color-surface-600);
          margin-bottom: 0.75rem;
        }

        .chips {
          display: flex;
          gap: 0.75rem;
        }

        .chip {
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          background: var(--color-surface-200);
          color: var(--color-surface-700);

          &.active {
            background: var(--color-primary-600);
            color: white;
          }
        }
      }

      .visualization {
        display: flex;
        gap: 3rem;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;

        .zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background: var(--color-success-50);
          border: 3px dashed var(--color-success-400);
          border-radius: var(--radius-container);

          .icon {
            font-size: 3rem;
          }

          .attracted {
            display: flex;
            gap: 1rem;
          }
        }

        .reject {
          display: flex;
          gap: 1rem;
          opacity: 0.5;
        }

        .shape {
          font-size: 2rem;

          &.red {
            color: var(--color-error-500);
          }
          &.blue {
            color: var(--color-secondary-500);
          }
          &.green {
            color: var(--color-success-500);
          }
          &.yellow {
            color: var(--color-warning-500);
          }
        }
      }
    }
  }

  /* Binary Section */
  #binary {
    .light-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      background: transparent;
      border: 2px solid var(--color-surface-300);
      border-radius: var(--radius-container);
      padding: 3rem;
      margin: 2rem 0;

      .label {
        color: var(--color-surface-700);
        font-size: 1.125rem;
        font-variant: small-caps;
      }

      .circle {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: var(--color-primary-50);
        border: 2px solid var(--color-primary-300);
        display: flex;
        align-items: center;
        justify-content: center;

        .inside {
          display: flex;
          gap: 1rem;
        }
      }

      .outside {
        display: flex;
        gap: 1.5rem;
      }

      .object {
        font-size: 2.5rem;
        transition: all 0.3s;

        &.active {
          filter: brightness(1.2);
        }
        &.dimmed {
          opacity: 0.3;
        }
      }
    }
  }

  /* Formalization Section */
  #formalization {
    .list {
      font-size: 1.25rem;
      line-height: 1.8;
      margin: 0;
      padding-left: 1.5rem;

      li {
        margin-bottom: 1rem;
      }

      ul {
        margin-top: 0.5rem;
        padding-left: 1.5rem;
      }
    }

    .notation {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;

      .label {
        font-size: 1rem;
        color: var(--color-surface-600);
        margin-bottom: 1rem;
      }

      .formula {
        font-size: 1.75rem;
        margin-bottom: 1rem;
      }

      .note {
        font-size: 1rem;
        color: var(--color-surface-600);
        font-style: italic;
      }
    }
  }

  /* Practice Section */
  #practice {
    .grid {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;
    }

    /* Styles inside QuizCard content */
    h3 {
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.25rem;
      margin: 0 0 1rem;
    }

    details {
      margin-top: 1rem;
    }

    summary {
      cursor: pointer;
      color: var(--color-primary-600);
      font-weight: 600;
      font-size: 1rem;

      &:hover {
        color: var(--color-primary-700);
      }
    }

    .answer {
      margin-top: 1rem;
      padding: 1.25rem;
      background: var(--color-success-50);
      border-radius: var(--radius-base);

      p {
        font-size: 1.125rem;
        margin: 0 0 0.75rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  /* Project Section */
  #project {
    .card {
      background: var(--color-surface-100);
      border-radius: var(--radius-container);
      padding: 2.5rem;
      margin: 2rem 0;

      .scenario {
        background: white;
        border-radius: var(--radius-base);
        padding: 1.5rem;
        margin-bottom: 2rem;

        p {
          margin: 0;
          font-size: 1.25rem;
        }
      }

      .tasks {
        ol {
          font-size: 1.25rem;
          line-height: 1.8;
          padding-left: 1.5rem;

          li {
            margin-bottom: 1.25rem;
          }
        }

        .formula-example {
          background: var(--color-surface-100);
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-base);
          margin: 1rem 0;
          text-align: center;

          .math {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #filter .xray {
      flex-direction: column;
      text-align: center;
    }

    #filter .analogy {
      flex-direction: column;
    }

    #creation .magnet .visualization {
      flex-direction: column;
    }
  }
</style>
