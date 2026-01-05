<script>
  import { Crisis, QuizCard, Summary, TakeawayCard } from "../../components";
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок об операторах И и ИЛИ. Учимся комбинировать условия для точной фильтрации."
  />
</svelte:head>

<!-- Крючок: полицейский участок -->
<section id="crisis" class="crisis">
  <Crisis icon="🔍" title="Ошибка в полицейском участке">
    <p>
      Представьте, что вы — оператор системы поиска преступников. На экране —
      толпа из 20 разных персонажей. Поступает ориентировка от свидетеля:
    </p>
    <blockquote>
      «Преступник был в красной куртке... и, кажется, в очках»
    </blockquote>
    <p>
      Вы нажимаете кнопку «Поймать». Но если выделить всех в красных куртках —
      система выдаёт ошибку: <em>«Задержаны невиновные (люди без очков)»</em>.
      Если выделить всех в очках — снова ошибка. А если выделять вручную по
      одному — преступник успевает сбежать!
    </p>

    {#snippet question()}
      <p>
        Как объяснить глупому компьютеру, что нам нужны только те люди, у
        которых есть <em>одновременно</em> оба признака? А что если свидетель не
        уверен и говорит «Он был в шляпе <strong>или</strong> в кепке»?
      </p>
      <p>
        <strong
          >Обычный язык слишком неточен. Нам нужен инструмент для жёсткой
          фильтрации.</strong
        >
      </p>
    {/snippet}
  </Crisis>
</section>

<!-- Оператор И -->
<section id="and-operator">
  <h2>Оператор «И» — строгий страж</h2>
  <p>
    Представьте, что «И» — это самый строгий охранник в мире. Чтобы пройти через
    ворота, нужно показать <em>два</em> пропуска одновременно. Если есть только один
    — проход закрыт.
  </p>

  <div class="visual-break">
    <div class="double-lock">
      <div class="lock-visual">
        <div class="door">🚪</div>
        <div class="locks">
          <div class="lock">🔐</div>
          <div class="lock">🔐</div>
        </div>
      </div>
      <div class="lock-explanation">
        <p>
          <strong>Двойной замок:</strong> чтобы открыть дверь, нужно повернуть
          ключи в <em>обоих</em> замках. Один ключ не сработает.
        </p>
      </div>
    </div>
  </div>

  <div class="metaphor">
    <div class="icon">💡</div>
    <div class="text">
      <strong>Метафора:</strong> пересечение лучей прожектора. Темнота. Один луч
      светит синим, другой жёлтым. Только там, где они
      <em>пересекаются</em>, появляется яркий зелёный цвет. Это зона «И».
    </div>
  </div>
</section>

<!-- Симуляция конвейера -->
<section id="mixing-lab">
  <h2>Лаборатория смешивания</h2>
  <p>
    Представьте конвейер с фильтр-прессом. Мы устанавливаем два условия: <strong
      >«Круг»</strong
    >
    И <strong>«Красный»</strong>. По ленте едут разные фигуры:
  </p>

  <div class="conveyor-demo">
    <div class="conveyor-item rejected">
      <div class="shape red-square">■</div>
      <div class="item-verdict">
        <span class="verdict-x">✗</span>
        <span>Красный квадрат — не круг. Отклонён.</span>
      </div>
    </div>
    <div class="conveyor-item rejected">
      <div class="shape blue-circle">●</div>
      <div class="item-verdict">
        <span class="verdict-x">✗</span>
        <span>Синий круг — не красный. Отклонён.</span>
      </div>
    </div>
    <div class="conveyor-item accepted">
      <div class="shape red-circle">●</div>
      <div class="item-verdict">
        <span class="verdict-check">✓</span>
        <span>Красный круг — оба условия! Проходит.</span>
      </div>
    </div>
  </div>

  <TakeawayCard icon="📌">
    <p>
      <strong>«И» сужает поиск.</strong> Результатов становится меньше, но они точнее.
    </p>
  </TakeawayCard>
</section>

<!-- Оператор ИЛИ -->
<section id="or-operator">
  <h2>Оператор «ИЛИ» — добрый официант</h2>
  <p>
    «ИЛИ» — это добрый официант, который спрашивает: «Вам чай или кофе?». Если
    вы выберете чай — вы довольны. Кофе — тоже довольны. А если жадно возьмёте и
    то, и другое — в логике это тоже допустимо!
  </p>

  <div class="visual-break">
    <div class="fork-road">
      <div class="road left-path">← Левая тропинка</div>
      <div class="road-center">🏁 Финиш</div>
      <div class="road right-path">Правая тропинка →</div>
    </div>
    <p class="fork-caption">
      Развилка дороги: можно пойти по любой тропинке — и вы всё равно придёте к
      финишу.
    </p>
  </div>

  <TakeawayCard icon="📌" variant="warning">
    <p>
      <strong>«ИЛИ» расширяет поиск.</strong> Результатов становится больше.
    </p>
  </TakeawayCard>
</section>

<!-- Диаграмма Венна -->
<section id="venn-diagram">
  <h2>Диаграмма Венна</h2>
  <p>
    Представьте два больших полупрозрачных круга. Левый круг — «Есть хвост».
    Правый — «Умеет плавать». Куда попадёт каждое животное?
  </p>

  <div class="venn-demo">
    <div class="venn-diagram">
      <div class="venn-circle left">
        <span class="circle-label">Есть хвост</span>
        <span class="animal">
          <span>🐱</span>
          Кошка
        </span>
      </div>
      <div class="venn-intersection">
        <span class="animal">
          <span>🦫</span>
          Бобёр
        </span>
      </div>
      <div class="venn-circle right">
        <span class="circle-label">Умеет плавать</span>
        <span class="animal">
          <span>🐟</span>
          Рыба
        </span>
      </div>
    </div>
    <div class="venn-legend">
      <div class="legend-item and-legend">
        <span class="legend-color"></span>
        <span>«И» — только середина (бобёр)</span>
      </div>
      <div class="legend-item or-legend">
        <span class="legend-color"></span>
        <span>«ИЛИ» — вся фигура целиком (все животные)</span>
      </div>
    </div>
  </div>
</section>

<section id="formalization">
  <h2>Формализация</h2>
  <p>Переходим от образов к «математической стенографии».</p>

  <div class="formal-blocks">
    <div class="formal-block and-block">
      <h3>Логическое умножение (И / AND)</h3>
      <ul>
        <li>Истина (1) <strong>И</strong> Истина (1) = Истина (1)</li>
        <li>Любая Ложь (0) превращает всё выражение в Ложь</li>
        <li>Как умножение на ноль: 1 × 0 = 0</li>
      </ul>
      <div class="code-notation">A && B &nbsp; или &nbsp; A AND B</div>
    </div>

    <div class="formal-block or-block">
      <h3>Логическое сложение (ИЛИ / OR)</h3>
      <ul>
        <li>Достаточно одной Истины (1), чтобы всё стало Истиной</li>
        <li>Только Ложь (0) <strong>ИЛИ</strong> Ложь (0) = Ложь</li>
      </ul>
      <div class="code-notation">A || B &nbsp; или &nbsp; A OR B</div>
    </div>
  </div>

  <div class="truth-table">
    <h3>Таблица истины</h3>
    <table class="table-semantic">
      <thead>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>A И B</th>
          <th>A ИЛИ B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>👍</td>
          <td>👍</td>
          <td class="yes">👍</td>
          <td class="yes">👍</td>
        </tr>
        <tr>
          <td>👍</td>
          <td>👎</td>
          <td class="no">👎</td>
          <td class="yes">👍</td>
        </tr>
        <tr>
          <td>👎</td>
          <td>👍</td>
          <td class="no">👎</td>
          <td class="yes">👍</td>
        </tr>
        <tr>
          <td>👎</td>
          <td>👎</td>
          <td class="no">👎</td>
          <td class="no">👎</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- Блиц-опрос -->
<section id="quiz" class="quiz">
  <h2>Проверь себя</h2>

  <QuizCard icon="🤔">
    <p>
      <strong>Ситуация 1:</strong> Мама сказала: «Ты пойдёшь гулять, если
      сделаешь уроки <strong>И</strong> помоешь посуду». Ты сделал уроки, но не помыл
      посуду. Пойдёшь ли ты гулять?
    </p>
    {#snippet answer()}
      <p>Нет — сработал строгий страж «И». Нужны оба условия!</p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🤔">
    <p>
      <strong>Ситуация 2:</strong> Бабушка сказала: «На десерт будет мороженое
      <strong>ИЛИ</strong> пирог». На столе стоит и то, и другое. Нарушила ли бабушка
      своё слово?
    </p>
    {#snippet answer()}
      <p>Нет — в логике «ИЛИ» допускает оба варианта!</p>
    {/snippet}
  </QuizCard>

  <QuizCard icon="🔍">
    <p>
      <strong>Ситуация 3:</strong> Мы ищем в интернете «Кроссовки Nike».
      Результатов 1000. Мы добавляем условие «... <strong>И</strong> чёрные». Результатов
      станет больше или меньше?
    </p>
    {#snippet answer()}
      <p>Меньше — «И» отсекает лишнее и сужает поиск.</p>
    {/snippet}
  </QuizCard>
</section>

<section id="summary" class="summary">
  <Summary title="Главная мысль">
    <ul class="summary-list">
      <li>
        <strong>«И» (AND)</strong> — это строгость. Оба условия должны совпасть. Используем,
        когда нужно найти что-то очень конкретное (фильтр сужается).
      </li>
      <li>
        <strong>«ИЛИ» (OR)</strong> — это гибкость. Достаточно любого из условий.
        Используем, когда нужно собрать больше вариантов (фильтр расширяется).
      </li>
      <li>
        Логика — это способ отсеять лишнее и найти нужное, не перебирая каждый
        предмет вручную.
      </li>
    </ul>
  </Summary>
</section>

<style>
  /* Оператор «И» — строгий страж */
  #and-operator,
  #or-operator {
    .visual-break {
      margin: 3rem -1rem;
      padding: 2.5rem;
      background: var(--color-surface-50, #f8f9fa);
      border-radius: calc(var(--radius-container, 0.25rem) * 4);
    }
  }

  #and-operator {
    .double-lock {
      display: flex;
      align-items: center;
      gap: 3rem;
    }

    .lock-visual {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .door {
      font-size: 5rem;
    }

    .locks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .lock {
      font-size: 2.5rem;
    }

    .lock-explanation {
      p {
        margin: 0;
        font-size: 1.25rem;
      }
    }

    .metaphor {
      display: flex;
      gap: 1.25rem;
      background: var(--color-primary-50, #e8f5e9);
      border-radius: calc(var(--radius-container, 0.25rem) * 4);
      padding: 2rem;
      margin-top: 2rem;

      .icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }

      .text {
        font-size: 1.25rem;
        line-height: 1.6;
      }
    }
  }

  /* Лаборатория смешивания */
  #mixing-lab {
    .conveyor-demo {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .conveyor-item {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem 2rem;
      border-radius: calc(var(--radius-container, 0.25rem) * 4);

      &.rejected {
        background: var(--color-error-50, #fdecea);
        border: 2px dashed var(--color-error-200, #fecaca);
      }

      &.accepted {
        background: var(--color-success-50, #e8f5e9);
        border: 2px solid var(--color-success-300, #86efac);
      }
    }

    .shape {
      font-size: 3.5rem;
      line-height: 1;
    }

    .red-square {
      color: #e53935;
    }

    .blue-circle {
      color: #1e88e5;
    }

    .red-circle {
      color: #e53935;
    }

    .item-verdict {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
    }

    .verdict-x {
      font-size: 1.75rem;
      color: var(--color-error-600, #c53030);
      font-weight: 700;
    }

    .verdict-check {
      font-size: 1.75rem;
      color: var(--color-success-600, #16a34a);
      font-weight: 700;
    }
  }

  /* Оператор «ИЛИ» — добрый официант */
  #or-operator {
    .fork-road {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
    }

    .road {
      font-size: 1.25rem;
      padding: 1rem 1.5rem;
      background: var(--color-surface-100, #f1f3f5);
      border-radius: calc(var(--radius-container, 0.25rem) * 2);
    }

    .road-center {
      font-size: 2.5rem;
    }

    .fork-caption {
      text-align: center;
      font-style: italic;
      color: var(--color-surface-600, #6b7280);
      margin: 0;
    }
  }

  /* Диаграмма Венна */
  #venn-diagram {
    .venn-demo {
      margin: 2rem 0;
    }

    .venn-diagram {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      margin-bottom: 2rem;
    }

    .venn-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      padding: 1.5rem;

      &.left {
        background: rgba(33, 150, 243, 0.2);
        border: 3px solid rgba(33, 150, 243, 0.5);
        margin-right: -80px;
      }

      &.right {
        background: rgba(255, 193, 7, 0.2);
        border: 3px solid rgba(255, 193, 7, 0.5);
        margin-left: -80px;
      }
    }

    .venn-intersection {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      background: rgba(76, 175, 80, 0.35);
      border-radius: 50%;
      z-index: 1;
    }

    .circle-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-surface-700, #374151);
    }

    .animal {
      font-size: 1.5rem;
      margin-top: 0.5rem;
    }

    .venn-legend {
      display: flex;
      justify-content: center;
      gap: 3rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.125rem;
    }

    .legend-color {
      width: 24px;
      height: 24px;
      border-radius: 4px;
    }

    .and-legend {
      .legend-color {
        background: rgba(76, 175, 80, 0.5);
      }
    }

    .or-legend {
      .legend-color {
        background: linear-gradient(
          90deg,
          rgba(33, 150, 243, 0.3),
          rgba(255, 193, 7, 0.3)
        );
      }
    }
  }

  /* Формализация */
  #formalization {
    .formal-blocks {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .formal-block {
      padding: 2rem;
      border-radius: calc(var(--radius-container, 0.25rem) * 4);

      h3 {
        margin-top: 0;
        font-size: 1.25rem;
      }

      ul {
        font-size: 1.125rem;
        line-height: 1.8;
        padding-left: 1.5rem;
        margin: 1rem 0;
      }

      &.and-block {
        background: var(--color-primary-50, #e8f5e9);
      }

      &.or-block {
        background: var(--color-warning-50, #fff8e6);
      }
    }

    .code-notation {
      font-family: monospace;
      font-size: 1.25rem;
      background: var(--color-surface-100, #f1f3f5);
      padding: 0.75rem 1.25rem;
      border-radius: calc(var(--radius-container, 0.25rem) * 2);
      text-align: center;
    }

    .truth-table {
      margin: 3rem 0;

      h3 {
        text-align: center;
        margin-bottom: 1.5rem;
      }
    }

    .table-semantic {
      max-width: 500px;
      margin: 0 auto;
      border-radius: calc(var(--radius-container, 0.25rem) * 4);
      overflow: hidden;
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);
      border-collapse: collapse;
      width: 100%;

      th {
        background: var(--color-surface-200, #e5e7eb);
        padding: 1rem;
        font-weight: 600;
        text-align: center;
        font-size: 1rem;
      }

      td {
        padding: 1rem;
        text-align: center;
        font-size: 1.5rem;
        background: var(--color-surface-50, #f8f9fa);
        border-top: 1px solid var(--color-surface-200, #e5e7eb);

        &.yes {
          background: var(--color-success-50, #e8f5e9);
        }

        &.no {
          background: var(--color-error-50, #fdecea);
        }
      }
    }
  }

  /* Резюме */
  #summary {
    .summary-list {
      font-size: 1.375rem;
      line-height: 1.8;
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    #and-operator {
      .double-lock {
        flex-direction: column;
        text-align: center;
      }
    }

    #or-operator {
      .fork-road {
        flex-direction: column;
        gap: 1rem;
      }
    }

    #venn-diagram {
      .venn-circle {
        width: 160px;
        height: 160px;

        &.left {
          margin-right: -50px;
        }

        &.right {
          margin-left: -50px;
        }
      }

      .venn-intersection {
        width: 100px;
        height: 100px;
      }

      .venn-legend {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
    }
  }
</style>
