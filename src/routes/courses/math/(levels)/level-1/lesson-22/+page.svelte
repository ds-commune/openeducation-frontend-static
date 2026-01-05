<script lang="ts">
  import { Crisis, DefinitionCard, QuizCard, Summary } from "../../components";

  // Morphing slider state
  let morphValue = $state(0);

  // Alphabet sorting game state
  let sortedLetters = $state<Record<string, number | null>>({});
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const correctAnswers: Record<string, number> = {
    C: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0,
    A: 1,
    D: 1,
    O: 1,
    P: 1,
    Q: 1,
    R: 1,
    B: 2,
  };

  let showAlphabetResults = $state(false);

  function assignLetter(letter: string, genus: number) {
    sortedLetters = { ...sortedLetters, [letter]: genus };
  }

  function clearLetter(letter: string) {
    const newSorted = { ...sortedLetters };
    delete newSorted[letter];
    sortedLetters = newSorted;
  }

  function checkAlphabetAnswers() {
    showAlphabetResults = true;
  }

  function resetAlphabet() {
    sortedLetters = {};
    showAlphabetResults = false;
  }

  const lettersByGenus = $derived({
    0: alphabet.filter((l) => sortedLetters[l] === 0),
    1: alphabet.filter((l) => sortedLetters[l] === 1),
    2: alphabet.filter((l) => sortedLetters[l] === 2),
  });

  const unsortedLetters = $derived(
    alphabet.filter((l) => sortedLetters[l] === undefined)
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Урок о топологии: эквивалентность форм, понятие рода поверхности и инвариантов. Бублик равен кружке!"
  />
</svelte:head>

<section id="introduction">
  <Crisis icon="🚀" title="Аварийная сортировка">
    <p>
      Мы в лаборатории по производству универсальных деталей для космических
      кораблей. Материал деталей — «умный металл», который может менять форму
      под давлением, но сохраняет свою структуру.
    </p>
    <p>
      У нас есть <strong>сфера</strong> (топливный бак) и
      <strong>бублик</strong> (магнитное кольцо-ускоритель). В результате аварии при
      транспортировке все детали помялись!
    </p>

    <div class="damaged-parts">
      <div class="group">
        <div class="label">Было: сфера</div>
        <div class="icons">
          <span class="icon original">⚪</span>
          <span class="arrow">→</span>
          <span class="icon damaged">🥔</span>
          <span class="text">или</span>
          <span class="icon damaged">📦</span>
        </div>
        <div class="note">Стало: картофелина или куб</div>
      </div>
      <div class="group">
        <div class="label">Было: бублик</div>
        <div class="icons">
          <span class="icon original">🍩</span>
          <span class="arrow">→</span>
          <span class="icon damaged">☕</span>
          <span class="text">или</span>
          <span class="icon damaged">∞</span>
        </div>
        <div class="note">Стало: кружка или восьмёрка</div>
      </div>
    </div>

    {#snippet question()}
      <strong>Проблема:</strong> робот-сортировщик сошёл с ума. Он пытается
      использовать геометрические формулы (радиус, объём, количество углов), но
      у помятой сферы нет радиуса, а у куба есть углы, которых не было у сферы.
      Как объяснить роботу, что «картофелина» — это всё ещё
      <strong>бак</strong>, а «кружка» — это всё ещё <strong>кольцо</strong>, но
      при этом бак и кольцо — совершенно <strong>разные</strong> объекты?
    {/snippet}
  </Crisis>
</section>

<section id="rules">
  <h2>Правила пластилинового мира</h2>
  <p>
    Представим, что все объекты сделаны из бесконечно тягучего пластилина. В
    этом мире действует особая «физика»:
  </p>

  <div class="grid">
    <div class="card allowed">
      <div class="header">✓ Разрешено</div>
      <ul class="list">
        <li>Сжимать</li>
        <li>Растягивать</li>
        <li>Гнуть</li>
        <li>Скручивать</li>
        <li>Раздувать</li>
      </ul>
    </div>
    <div class="card forbidden">
      <div class="header">✗ Запрещено</div>
      <ul class="list">
        <li>Рвать (создавать новые дырки)</li>
        <li>Склеивать (уничтожать существующие дырки)</li>
      </ul>
    </div>
  </div>

  <DefinitionCard title="Ключевая идея">
    <p>
      Если один объект можно превратить в другой, используя только разрешённые
      действия, то для математика-тополога это <strong
        >один и тот же объект</strong
      >.
    </p>
  </DefinitionCard>
</section>

<section id="morph">
  <h2>Кружка превращается в бублик</h2>
  <p>
    Это не магия, а математика! Попробуйте сами: двигайте слайдер и наблюдайте,
    как кружка непрерывно превращается в бублик — <strong
      >без единого разрыва</strong
    >.
  </p>

  <div class="demo">
    <div class="visual">
      <svg
        viewBox="0 0 200 150"
        class="svg"
        aria-label="Анимация превращения кружки в бублик"
      >
        <!-- Cup body - shrinks to zero as morph progresses -->
        {#if morphValue < 95}
          <ellipse
            cx={100 - morphValue * 0.3}
            cy="75"
            rx={Math.max(0, 50 - morphValue * 0.53)}
            ry={Math.max(0, 45 - morphValue * 0.48)}
            fill="var(--color-primary-400)"
            stroke="var(--color-primary-800)"
            stroke-width="3"
            opacity={Math.max(0, 1 - morphValue / 90)}
          />
        {/if}
        <!-- Cup opening (inner ellipse) - fades out -->
        {#if morphValue < 80}
          <ellipse
            cx={100 - morphValue * 0.3}
            cy={40 + morphValue * 0.2}
            rx={35 - morphValue * 0.3}
            ry={12 - morphValue * 0.1}
            fill="var(--color-primary-200)"
            opacity={1 - morphValue / 100}
          />
        {/if}
        <!-- Handle - grows to become the main torus ring -->
        <ellipse
          cx={155 - morphValue * 0.55}
          cy="75"
          rx={20 + morphValue * 0.25}
          ry={25 + morphValue * 0.2}
          fill="none"
          stroke="var(--color-primary-800)"
          stroke-width={12 + morphValue * 0.08}
        />
      </svg>
    </div>

    <div class="controls">
      <span class="label">☕ Кружка</span>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={morphValue}
        class="slider"
        aria-label="Деформация кружки в бублик"
      />
      <span class="label">🍩 Бублик</span>
    </div>

    <div class="explanation">
      {#if morphValue < 30}
        <p>Кружка: ёмкость для напитка с одной ручкой.</p>
      {:else if morphValue < 70}
        <p>Дно кружки выпучивается вверх, ёмкость «втягивается» в ручку...</p>
      {:else}
        <p>Бублик! Ручка стала единственным телом объекта. Разрывов не было.</p>
      {/if}
    </div>
  </div>

  <DefinitionCard title="Вывод">
    <p>
      <strong>Кружка = Бублик</strong>. Оба имеют ровно одну сквозную дырку
      (ручка кружки).
    </p>
  </DefinitionCard>
</section>

<section id="holes">
  <h2>Охота на дырки</h2>
  <p>
    Как быстро отличить сферу от бублика, не пытаясь их мять?
    <strong>Посчитать сквозные отверстия!</strong>
  </p>

  <div class="cards">
    <div class="card">
      <div class="number">g = 0</div>
      <div class="title">Ноль дырок</div>
      <div class="examples">⚪ 📦 🥔 🍽️</div>
      <div class="list">сфера, куб, тарелка, яйцо</div>
    </div>
    <div class="card">
      <div class="number">g = 1</div>
      <div class="title">Одна дырка</div>
      <div class="examples">🍩 ☕ 🧵</div>
      <div class="list">бублик, кружка, трубочка</div>
    </div>
    <div class="card">
      <div class="number">g = 2</div>
      <div class="title">Две дырки</div>
      <div class="examples">✂️ 👓 8️⃣</div>
      <div class="list">ножницы, очки, крендель</div>
    </div>
  </div>
</section>

<section id="zoo">
  <h2>Топологический зоопарк</h2>
  <p>
    В этом необычном зоопарке сущности сгруппированы не по биологическим видам,
    а по количеству отверстий:
  </p>

  <div class="visual">
    <div class="section">
      <div class="header g0">Группа 0: без дырок</div>
      <div class="items">
        <span title="Апельсин">🍊</span>
        <span title="Кирпич">🧱</span>
        <span title="Вилка">🍴</span>
        <span title="Мяч">⚽</span>
      </div>
    </div>
    <div class="section">
      <div class="header g1">Группа 1: одна дырка</div>
      <div class="items">
        <span title="Иголка (ушко)">🪡</span>
        <span title="Кружка">☕</span>
        <span title="Бублик">🍩</span>
        <span title="Кольцо">💍</span>
      </div>
    </div>
    <div class="section">
      <div class="header g2">Группа 2: две дырки</div>
      <div class="items">
        <span title="Ножницы">✂️</span>
        <span title="Очки">👓</span>
        <span title="Буква B">🅱️</span>
      </div>
    </div>
  </div>
</section>

<section id="math-language">
  <h2>Математический язык</h2>

  <div class="cards">
    <div class="card">
      <div class="header">Гомеоморфизм (≅)</div>
      <div class="body">
        <p>
          Два объекта <strong>гомеоморфны</strong> (топологически эквивалентны), если
          существует взаимно однозначное и непрерывное отображение между ними.
        </p>
        <p class="simple">
          Простыми словами: превращение <strong
            >без разрывов и склеиваний</strong
          >.
        </p>
      </div>
    </div>

    <div class="card">
      <div class="header">Род поверхности (g)</div>
      <div class="body">
        <p>
          Число «дырок» или «ручек» у объекта. Обозначается буквой <strong
            >g</strong
          > (от англ. genus).
        </p>
        <ul class="list">
          <li>Сфера: g = 0</li>
          <li>Тор (бублик): g = 1</li>
          <li>Двойной тор: g = 2</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="header">Характеристика Эйлера</div>
      <div class="body">
        <div class="euler">χ = 2 − 2g</div>
        <p class="note">
          Где χ (хи) — число, связывающее количество дырок с тем, как объект
          устроен (вершины, грани, рёбра).
        </p>
      </div>
    </div>
  </div>
</section>

<section id="practice-alphabet">
  <h2>Проверь понимание: алфавит</h2>
  <p>
    Распредели буквы по группам в зависимости от количества дырок. Используй
    рубленый шрифт без засечек (как на экране).
  </p>

  <div class="game">
    <div class="unsorted">
      <div class="label">Нераспределённые буквы:</div>
      <div class="pool">
        {#each unsortedLetters as letter (letter)}
          <div class="chip">
            <span class="text">{letter}</span>
            <div class="buttons">
              <button
                class="btn g0"
                onclick={() => assignLetter(letter, 0)}
                aria-label="Назначить {letter} в группу g=0">0</button
              >
              <button
                class="btn g1"
                onclick={() => assignLetter(letter, 1)}
                aria-label="Назначить {letter} в группу g=1">1</button
              >
              <button
                class="btn g2"
                onclick={() => assignLetter(letter, 2)}
                aria-label="Назначить {letter} в группу g=2">2</button
              >
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="baskets">
      <div class="basket b0">
        <div class="header">g = 0 (без дырок)</div>
        <div class="letters">
          {#each lettersByGenus[0] as letter (letter)}
            <button
              class="letter"
              class:correct={showAlphabetResults &&
                correctAnswers[letter] === 0}
              class:incorrect={showAlphabetResults &&
                correctAnswers[letter] !== 0}
              onclick={() => clearLetter(letter)}
              aria-label="Убрать {letter}">{letter}</button
            >
          {/each}
        </div>
      </div>
      <div class="basket b1">
        <div class="header">g = 1 (одна дырка)</div>
        <div class="letters">
          {#each lettersByGenus[1] as letter (letter)}
            <button
              class="letter"
              class:correct={showAlphabetResults &&
                correctAnswers[letter] === 1}
              class:incorrect={showAlphabetResults &&
                correctAnswers[letter] !== 1}
              onclick={() => clearLetter(letter)}
              aria-label="Убрать {letter}">{letter}</button
            >
          {/each}
        </div>
      </div>
      <div class="basket b2">
        <div class="header">g = 2 (две дырки)</div>
        <div class="letters">
          {#each lettersByGenus[2] as letter (letter)}
            <button
              class="letter"
              class:correct={showAlphabetResults &&
                correctAnswers[letter] === 2}
              class:incorrect={showAlphabetResults &&
                correctAnswers[letter] !== 2}
              onclick={() => clearLetter(letter)}
              aria-label="Убрать {letter}">{letter}</button
            >
          {/each}
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="check" onclick={checkAlphabetAnswers}>Проверить</button>
      <button class="reset" onclick={resetAlphabet}>Сбросить</button>
    </div>

    {#if showAlphabetResults}
      <div class="hint">
        <strong>Правильные ответы:</strong>
        <ul>
          <li>
            <strong>g = 0:</strong> C, E, F, G, H, I, J, K, L, M, N, S, T, U, V, W,
            X, Y, Z
          </li>
          <li><strong>g = 1:</strong> A, D, O, P, Q, R</li>
          <li><strong>g = 2:</strong> B</li>
        </ul>
      </div>
    {/if}
  </div>
</section>

<section id="practice-quiz">
  <h2>Вопросы на понимание</h2>

  <div class="cards">
    <QuizCard icon="🥤">
      <div class="question">
        <strong>Проблема соломинки.</strong> Является ли питьевая соломинка топологически
        эквивалентной (гомеоморфной) листу бумаги?
      </div>
      {#snippet answer()}
        <p>
          <strong>Нет.</strong> Соломинка — это цилиндр (как бублик/кольцо), у неё
          есть сквозной проход (g = 1). Лист бумаги можно смять в шар (g = 0), но
          нельзя сделать из него кольцо без склеивания краёв.
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="👖">
      <div class="question">
        <strong>Джинсы.</strong> Топологически, чему эквивалентны джинсы? Сколько
        у них «дырок»?
      </div>
      {#snippet answer()}
        <p>
          Джинсы топологически эквивалентны диску с двумя дырками (или сфере с
          тремя вырезанными дисками — пояс и две штанины). Это сложнее, чем
          просто бублик!
        </p>
      {/snippet}
    </QuizCard>

    <QuizCard icon="🪢">
      <div class="question">
        <strong>Лассо на бублике.</strong> Жук на поверхности сферы рисует замкнутую
        петлю. Может ли он стянуть её в точку? А на бублике?
      </div>
      {#snippet answer()}
        <p>
          На <strong>сфере</strong> любую петлю можно стянуть в точку (как
          резинку соскользнуть). На <strong>бублике</strong> петлю, продетую сквозь
          дырку, стянуть нельзя — она «застрянет» вокруг тела бублика. Это ещё один
          способ обнаружить дырки!
        </p>
      {/snippet}
    </QuizCard>
  </div>
</section>

<section id="summary">
  <Summary title="Резюме">
    <blockquote>
      В геометрии важны размеры и углы. В топологии важны связи и целостность.
    </blockquote>
    <p class="main">
      <strong>Бублик и кружка — это одно и то же</strong>, потому что суть
      объекта не в его форме, а в количестве сквозных отверстий, которые
      невозможно уничтожить, не сломав сам предмет.
    </p>
  </Summary>
</section>

<style>
  #introduction {
    .damaged-parts {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 2rem 0;

      .group {
        background: var(--color-surface-50);
        border: 1px solid var(--color-surface-200);
        border-radius: var(--radius-container);
        padding: 1.5rem;
        box-shadow: 0 1px 2px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .label {
          font-weight: 600;
          color: var(--color-surface-600);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .icons {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2.5rem;
          flex-wrap: wrap;

          .icon.original {
            opacity: 0.6;
          }

          .arrow {
            font-size: 1.5rem;
            color: var(--color-surface-400);
          }

          .text {
            font-size: 1rem;
            color: var(--color-surface-500);
          }
        }

        .note {
          margin-top: 0.5rem;
          font-size: 1rem;
          color: var(--color-surface-600);
        }
      }
    }
  }

  #rules {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        border-radius: var(--radius-container);
        padding: 2rem;
        box-shadow: 0 1px 2px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        &.allowed {
          background: var(--color-success-50);
          border: 2px solid var(--color-success-200);

          .header {
            color: var(--color-success-700);
          }
        }

        &.forbidden {
          background: var(--color-error-50);
          border: 2px solid var(--color-error-200);

          .header {
            color: var(--color-error-700);
          }
        }

        .header {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 0.5rem 0;
            font-size: 1.125rem;
            color: var(--color-surface-700);
          }
        }
      }
    }
  }

  #morph {
    .demo {
      margin: 2rem 0;
      padding: 2rem;
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: calc(var(--radius-container) * 4);
      box-shadow: 0 12px 32px
        color-mix(in oklab, var(--color-surface-900) 0.12, transparent);

      .visual {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        margin-bottom: 2rem;

        .svg {
          width: 100%;
          max-width: 300px;
          height: auto;
        }
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1.5rem;

        .label {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-surface-700);
        }

        .slider {
          width: 200px;
          height: 8px;
          accent-color: var(--color-primary-500);
          cursor: pointer;
        }
      }

      .explanation {
        text-align: center;
        padding: 1rem;
        background: var(--color-surface-100);
        border-radius: var(--radius-container);

        p {
          margin: 0;
          font-size: 1.125rem;
          color: var(--color-surface-600);
        }
      }
    }
  }

  #holes {
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        background: var(--color-surface-50);
        border: 1px solid var(--color-surface-200);
        border-radius: calc(var(--radius-container) * 4);
        padding: 2rem;
        text-align: center;
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

        .number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary-600);
          margin-bottom: 0.5rem;
        }

        .title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-surface-700);
          margin-bottom: 1rem;
        }

        .examples {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .list {
          font-size: 0.95rem;
          color: var(--color-surface-500);
        }
      }
    }
  }

  #zoo {
    .visual {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 2rem 0;

      .section {
        background: var(--color-surface-50);
        border: 1px solid var(--color-surface-200);
        border-radius: var(--radius-container);
        padding: 1.5rem;
        box-shadow: 0 1px 2px
          color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

        .header {
          font-size: 1.125rem;
          font-weight: 700;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-container);
          margin-bottom: 1rem;

          &.g0 {
            background: var(--color-surface-100);
            color: var(--color-surface-700);
          }

          &.g1 {
            background: var(--color-primary-100);
            color: var(--color-primary-800);
          }

          &.g2 {
            background: var(--color-warning-100);
            color: var(--color-warning-800);
          }
        }

        .items {
          display: flex;
          gap: 1.5rem;
          font-size: 2.5rem;
          flex-wrap: wrap;
          justify-content: center;

          span {
            cursor: help;
          }
        }
      }
    }
  }

  #math-language {
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .card {
        background: var(--color-surface-50);
        border: 1px solid var(--color-surface-200);
        border-radius: var(--radius-container);
        box-shadow: 0 4px 12px
          color-mix(in oklab, var(--color-surface-900) 0.08, transparent);
        overflow: hidden;

        .header {
          background: var(--color-primary-100);
          padding: 1rem 1.5rem;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--color-primary-800);
        }

        .body {
          padding: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-surface-700);

          p {
            font-size: 1.125rem;
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .simple {
            background: var(--color-surface-100);
            padding: 0.75rem 1rem;
            border-radius: var(--radius-container);
            font-style: italic;
          }

          .list {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              padding: 0.25rem 0;
            }
          }

          .euler {
            font-size: 1.75rem;
            font-weight: 700;
            text-align: center;
            padding: 1rem;
            background: var(--color-primary-50);
            border-radius: var(--radius-container);
            color: var(--color-primary-800);
            margin-bottom: 1rem;
          }

          .note {
            font-size: 1rem !important;
            color: var(--color-surface-500) !important;
          }
        }
      }
    }
  }

  #practice-alphabet {
    .game {
      background: var(--color-surface-50);
      border: 1px solid var(--color-surface-200);
      border-radius: var(--radius-container);
      padding: 2rem;
      box-shadow: 0 4px 12px
        color-mix(in oklab, var(--color-surface-900) 0.08, transparent);

      .unsorted {
        margin-bottom: 2rem;

        .label {
          font-weight: 600;
          color: var(--color-surface-600);
          margin-bottom: 1rem;
        }

        .pool {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;

          .chip {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: var(--color-surface-100);
            border-radius: var(--radius-container);
            border: 2px solid var(--color-surface-200);

            .text {
              font-size: 1.5rem;
              font-weight: 700;
              font-family: "Arial", sans-serif;
              color: var(--color-surface-800);
            }

            .buttons {
              display: flex;
              gap: 0.25rem;

              .btn {
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                font-size: 0.875rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;

                &.g0 {
                  background: var(--color-surface-200);
                  color: var(--color-surface-700);
                }

                &.g1 {
                  background: var(--color-primary-200);
                  color: var(--color-primary-800);
                }

                &.g2 {
                  background: var(--color-warning-200);
                  color: var(--color-warning-800);
                }

                &:hover {
                  transform: scale(1.1);
                }
              }
            }
          }
        }
      }

      .baskets {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;

        .basket {
          border-radius: var(--radius-container);
          padding: 1rem;
          min-height: 100px;

          &.b0 {
            background: var(--color-surface-100);
            border: 2px dashed var(--color-surface-300);
          }

          &.b1 {
            background: var(--color-primary-50);
            border: 2px dashed var(--color-primary-300);
          }

          &.b2 {
            background: var(--color-warning-50);
            border: 2px dashed var(--color-warning-300);
          }

          .header {
            font-weight: 700;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            color: var(--color-surface-700);
          }

          .letters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            .letter {
              width: 36px;
              height: 36px;
              border: none;
              border-radius: var(--radius-container);
              background: white;
              font-size: 1.25rem;
              font-weight: 700;
              font-family: "Arial", sans-serif;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: 0 1px 2px
                color-mix(in oklab, var(--color-surface-900) 0.05, transparent);

              &:hover {
                transform: scale(1.1);
              }

              &.correct {
                background: var(--color-primary-100);
                color: var(--color-primary-800);
              }

              &.incorrect {
                background: var(--color-error-100);
                color: var(--color-error-800);
              }
            }
          }
        }
      }

      .controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1.5rem;

        .check,
        .reset {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-container);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .check {
          background: var(--color-primary-500);
          color: white;

          &:hover {
            background: var(--color-primary-600);
            transform: translateY(-2px);
          }
        }

        .reset {
          background: var(--color-surface-200);
          color: var(--color-surface-700);

          &:hover {
            background: var(--color-surface-300);
          }
        }
      }

      .hint {
        background: var(--color-primary-50);
        padding: 1.5rem;
        border-radius: var(--radius-container);

        ul {
          margin: 0.75rem 0 0;
          padding-left: 1.5rem;

          li {
            padding: 0.25rem 0;
            font-size: 1rem;
          }
        }
      }
    }
  }

  #practice-quiz {
    .cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .question {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--color-surface-800);
        margin-bottom: 1rem;
      }
    }
  }

  #summary {
    .main {
      font-size: 1.375rem;
      line-height: 1.7;
      color: var(--color-primary-900);
      margin: 0;
    }
  }

  @media (max-width: 1100px) {
    #rules .grid,
    #holes .cards,
    #math-language .cards,
    #practice-alphabet .game .baskets {
      grid-template-columns: 1fr;
    }

    #morph .demo {
      .controls {
        flex-direction: column;

        .slider {
          width: 100%;
          max-width: 300px;
        }
      }
    }

    #practice-alphabet .game .pool {
      justify-content: center;
    }
  }
</style>
