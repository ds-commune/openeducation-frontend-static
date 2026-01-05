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
    content="Урок о методе сравнения количеств без подсчёта. Учимся использовать соответствие один-к-одному."
  />
</svelte:head>

<!-- Крючок: сценарий на складе -->
<section id="robot-factory-crisis">
  <Crisis icon="🏭" title="Сбой на складе робототехники">
    <p>
      Представьте: вы попали на завод по производству роботов. Произошёл сбой
      конвейера. Перед вами — огромная куча корпусов роботов с одной стороны и
      гора аккумуляторных батарей с другой. Объекты лежат вперемешку, их сотни.
    </p>
    <p>Начальник цеха требует немедленного ответа:</p>
    <blockquote>
      «Хватит ли батарей на всех роботов, или нужно срочно дозаказывать партию?»
    </blockquote>

    <div class="problems">
      <div class="item">
        <span class="icon">⏱️</span>
        <p>
          Считать объекты по одному слишком долго — конвейер запустят через
          минуту.
        </p>
      </div>
      <div class="item">
        <span class="icon">🔢</span>
        <p>
          Если начнём считать (один, два, три...), мы собьёмся — кучи хаотичны.
        </p>
      </div>
      <div class="item">
        <span class="icon">👁️</span>
        <p>
          Визуально оценить сложно: роботы большие, батареи маленькие. Глаза нас
          обманут.
        </p>
      </div>
    </div>

    {#snippet question()}
      <p>
        <strong
          >Как со 100% точностью узнать, чего больше, не используя числа и не
          пересчитывая предметы?</strong
        >
      </p>
    {/snippet}
  </Crisis>
</section>

<!-- Основной концептуальный блок -->
<section id="matching-method">
  <h2>Решение: составляем пары</h2>
  <p>
    Мы отказываемся от идеи «узнать количество». Нам не нужно знать, сколько
    объектов в каждой куче. Нам важно только соотношение между ними. А для этого
    достаточно попробовать составить пары.
  </p>

  <p>
    Представьте, что вместо подсчёта мы запускаем конвейер: каждый робот едет по
    ленте и автоматически «хватает» ближайшую свободную батарею. Когда конвейер
    остановится, мы смотрим: что осталось без пары?
  </p>

  <div class="visual">
    <div class="step">
      <div class="number">1</div>
      <div class="content">
        <h3>Запускаем конвейер</h3>
        <p>Роботы и батареи движутся навстречу друг другу.</p>
      </div>
    </div>
    <div class="arrow">→</div>
    <div class="step">
      <div class="number">2</div>
      <div class="content">
        <h3>Автосцепка</h3>
        <p>Каждый робот захватывает одну батарею.</p>
      </div>
    </div>
    <div class="arrow">→</div>
    <div class="step">
      <div class="number">3</div>
      <div class="content">
        <h3>Смотрим остаток</h3>
        <p>Что осталось без пары?</p>
      </div>
    </div>
  </div>

  <div class="rule">
    <div class="icon">⚡</div>
    <p>
      <strong>Жёсткое правило:</strong> одна батарея — один робот. Нельзя подключить
      две батареи к одному роботу или двух роботов к одной батарее. Это правило «один
      к одному».
    </p>
  </div>
</section>

<!-- Три исхода -->
<section id="outcomes">
  <h2>Три возможных исхода</h2>
  <p>
    В конце процесса соединения возможны только три исхода. Анализируем, что
    осталось:
  </p>

  <div class="cards">
    <div class="card robots">
      <div class="visual">
        <span class="paired">🤖🔋</span>
        <span class="leftover">🤖 🤖</span>
      </div>
      <h3>Лишние роботы</h3>
      <p>
        Остались роботы без пары. Вывод: роботов <strong>больше</strong>.
      </p>
      <div class="symbol">&gt;</div>
    </div>

    <div class="card batteries">
      <div class="visual">
        <span class="paired">🤖🔋</span>
        <span class="leftover">🔋 🔋</span>
      </div>
      <h3>Лишние батареи</h3>
      <p>
        Остались батареи без пары. Вывод: батарей <strong>больше</strong>.
      </p>
      <div class="symbol">&lt;</div>
    </div>

    <div class="card equal">
      <div class="visual">
        <span class="paired">🤖🔋</span>
        <span class="paired">🤖🔋</span>
      </div>
      <h3>Пустота</h3>
      <p>Все нашли пару. Вывод: их <strong>поровну</strong>.</p>
      <div class="symbol">=</div>
    </div>
  </div>
</section>

<!-- Иллюзия размера -->
<section id="size-illusion">
  <h2>Независимость от формы</h2>
  <p>
    Важнейший вывод: количество не зависит от размера объектов. Большие объекты
    занимают больше места, но это ничего не говорит о том, сколько их.
  </p>

  <div class="demo">
    <div class="side">
      <div class="objects big">🐘 🐘 🐘 🐘 🐘</div>
      <p>5 огромных слонов</p>
    </div>
    <div class="connector">
      <div class="lines">
        <span>―</span><span>―</span><span>―</span><span>―</span><span>―</span>
      </div>
    </div>
    <div class="side">
      <div class="objects small">🐜 🐜 🐜 🐜 🐜</div>
      <p>5 крошечных муравьёв</p>
    </div>
  </div>

  <TakeawayCard>
    <p>
      Как бы мы ни меняли размер слонов или муравьёв, количество пар не
      изменится.
      <strong
        >«Больше» в математике означает количество экземпляров, а не занимаемое
        место.</strong
      >
    </p>
  </TakeawayCard>
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>Переходим от конвейера к языку математики.</p>

  <DefinitionCard>
    <p>
      <strong>Два множества равны</strong>, если каждому элементу одного
      множества можно найти пару в другом множестве, и при этом не останется
      лишних элементов. Числа для этого не нужны.
    </p>
  </DefinitionCard>

  <div class="rules">
    <div class="rule">
      <div class="symbol">&gt;</div>
      <p>
        Если остались объекты в группе A (роботы):
        <strong>A &gt; B</strong>
      </p>
    </div>
    <div class="rule">
      <div class="symbol">&lt;</div>
      <p>
        Если остались объекты в группе B (батареи):
        <strong>A &lt; B</strong>
      </p>
    </div>
    <div class="rule">
      <div class="symbol">=</div>
      <p>Если ничего не осталось: <strong>A = B</strong></p>
    </div>
  </div>
</section>

<!-- Практика -->
<section id="practice">
  <h2>Проверь понимание</h2>

  <div class="quizzes">
    <div class="quiz">
      <div class="icon">🪙</div>
      <div class="content">
        <p>
          На столе в ряд лежат 10 монет плотно друг к другу и 8 монет с большими
          промежутками. Ряд из 8 монет длиннее. Ребёнок скажет, что их больше.
          Как доказать обратное, не называя чисел?
        </p>
        <details>
          <summary>Показать ответ</summary>
          <div class="answer">
            Положить монеты из короткого ряда поверх монет из длинного ряда —
            одна на одну. Те, что остались без пары сверху, покажут, где больше.
          </div>
        </details>
      </div>
    </div>

    <div class="quiz">
      <div class="icon">🪑</div>
      <div class="content">
        <p>
          Можно ли сравнить количество стульев в комнате и количество людей,
          если вы не видите ни тех, ни других, но знаете, что все сидят и есть
          пустые места?
        </p>
        <details>
          <summary>Показать ответ</summary>
          <div class="answer">
            Да! Раз все сидят (каждый человек нашёл стул) и есть пустые места
            (стулья без пары) — значит, стульев больше, чем людей.
          </div>
        </details>
      </div>
    </div>
  </div>
</section>

<section id="lesson-summary">
  <Summary title="Главная мысль">
    <blockquote>Считать не обязательно, чтобы сравнивать.</blockquote>
    <p>
      Чтобы понять, где больше, нужно просто попытаться составить пары. Тот, кто
      остался без пары — «победил» (его больше).
      <strong>Равенство — это идеальное партнёрство без одиночек.</strong>
    </p>
  </Summary>
</section>

<style>
  /* Section 1: Crisis */
  #robot-factory-crisis {
    .problems {
      display: grid;
      gap: 1rem;
      margin: 1.5rem 0;

      .item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        background: var(--color-surface-100);
        padding: 1.25rem 1.5rem;
        border-radius: var(--radius-container);

        .icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        p {
          margin: 0;
          font-size: 1.25rem;
        }
      }
    }
  }

  /* Section 2: Method */
  #matching-method {
    .visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin: 3rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      flex-wrap: wrap;

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 200px;

        .number {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: var(--color-primary-500);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .content {
          h3 {
            margin: 0 0 0.5rem;
            font-size: 1.125rem;
          }

          p {
            margin: 0;
            font-size: 1rem;
            color: var(--color-surface-600);
          }
        }
      }

      .arrow {
        font-size: 2rem;
        color: var(--color-surface-400);
      }
    }

    .rule {
      display: flex;
      gap: 1.25rem;
      background: var(--color-error-50);
      border-radius: calc(var(--radius-container) * 2);
      padding: 1.5rem 2rem;
      margin-top: 2rem;

      .icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 1.25rem;
      }
    }
  }

  /* Section 3: Outcomes */
  #outcomes {
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        border-radius: calc(var(--radius-container) * 2);
        padding: 2rem;
        box-shadow: 0 2px 8px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);
        text-align: center;
        position: relative;

        &.robots {
          background: var(--color-warning-50);
        }

        &.batteries {
          background: var(--color-primary-50);
        }

        &.equal {
          background: var(--color-surface-100);
        }

        .visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-size: 2rem;
          margin-bottom: 1rem;

          .paired {
            opacity: 0.4;
          }

          .leftover {
            font-weight: bold;
          }
        }

        h3 {
          margin: 0.75rem 0 0.5rem;
        }

        p {
          margin: 0;
          font-size: 1.125rem;
        }

        .symbol {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-surface-500);
        }
      }
    }
  }

  /* Section 4: Illusion */
  #size-illusion {
    .demo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 3rem 0;
      padding: 2.5rem;
      background: var(--color-surface-50);
      border-radius: calc(var(--radius-container) * 2);
      flex-wrap: wrap;

      .side {
        text-align: center;

        .objects {
          margin-bottom: 1rem;
          letter-spacing: 0.25em;

          &.big {
            font-size: 3rem;
          }

          &.small {
            font-size: 1rem;
          }
        }

        p {
          margin: 0;
          font-size: 1rem;
          color: var(--color-surface-600);
        }
      }

      .connector {
        display: flex;
        flex-direction: column;
        align-items: center;

        .lines {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: var(--color-primary-400);
          font-size: 1.25rem;
        }
      }
    }
  }

  /* Section 5: Formalization */
  #formalization {
    .rules {
      display: grid;
      gap: 1rem;
      margin: 2rem 0;

      .rule {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: white;
        padding: 1.5rem 2rem;
        border-radius: var(--radius-container);
        box-shadow: 0 1px 3px
          color-mix(in oklab, var(--color-surface-900) 0.1, transparent);

        .symbol {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary-600);
          min-width: 50px;
          text-align: center;
        }

        p {
          margin: 0;
          font-size: 1.25rem;
        }
      }
    }
  }

  /* Section 6: Practice */
  #practice {
    .quizzes {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;

      .quiz {
        display: flex;
        gap: 1.5rem;
        background: white;
        border-radius: calc(var(--radius-container) * 2);
        padding: 2rem;
        box-shadow: 0 1px 3px
          color-mix(in oklab, var(--color-surface-900) 0.1, transparent);

        .icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .content {
          flex: 1;

          p {
            font-size: 1.25rem;
            margin: 0 0 1rem;
          }

          details {
            margin-top: 1rem;

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
              border-radius: var(--radius-container);
              font-size: 1.125rem;
            }
          }
        }
      }
    }
  }

  /* Responsive */
  @media (max-width: 1100px) {
    #outcomes .cards {
      grid-template-columns: 1fr;
    }

    #matching-method {
      .visual {
        flex-direction: column;

        .arrow {
          transform: rotate(90deg);
        }
      }
    }

    #size-illusion {
      .demo {
        flex-direction: column;

        .connector .lines {
          flex-direction: row;
        }
      }
    }

    #practice .quiz {
      flex-direction: column;
    }
  }
</style>
