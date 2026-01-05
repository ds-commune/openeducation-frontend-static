import type { Course } from "./course";

function lessons(names: string[]) {
  return names.map((name) => ({ name }));
}

function m(name: string, lessonNames: string[]) {
  return {
    name,
    lessons: lessons(lessonNames),
  };
}

/*

*/

export const levels = {
  1: {
    name: "Архитектура реальности и логика",
    modules: [
      m("Логика и смыслы", [
        "Мир как утверждение",
        "Операторы «И» и «ИЛИ»",
        "Сила отрицания («НЕ»)",
        "Если — то. Логические цепочки",
      ]),
      m("Теория множеств", [
        "Сортировка реальности",
        "Внутри, снаружи и на границе",
        "Сравнение без счёта",
      ]),
      m("Бинарный мир", [
        "Язык двух состояний",
        "Считаем на двух пальцах",
        "Шифрование информации",
      ]),
      m("Понятие числа", [
        "Рождение числа",
        "Порядок против Количества",
        "Магия символов",
      ]),
      m("Переменная (инкогнито в математике)", [
        "Коробка с сюрпризом",
        "Имя для неизвестного",
        "Поиск героя",
      ]),
      m("Сложение и вычитание", [
        "Слияние миров",
        "Разделение и потеря",
        "Искусство прикидки",
      ]),
      m("Пространство и топология", [
        "Геометрия узнавания",
        "Внутри и снаружи границы",
        "Пластилиновый мир",
      ]),
      m("Интуитивная вероятность", [
        "Предсказание будущего",
        "Справедливая игра",
        "Проект «Лабиринт шансов»",
      ]),
    ],
  },

  2: {
    name: "Расширение горизонтов и структуры",
    modules: [
      m("Десятичная система и сила разряда", [
        "Почему десять?",
        "Магия нуля",
        "Масштабы вселенной",
      ]),
      m("Умножение и деление", [
        "Быстрое сложение (умножение)",
        "Справедливый дележ",
        "Механика алгоритма (столбик)",
      ]),
      m("Кризис целого (дроби)", [
        "Разрушение единицы",
        "Маски одного числа",
        "Дроби в десятичном виде",
      ]),
      m("Координаты и адрес в пространстве", [
        "Числовая прямая",
        "Карта сокровищ (X и Y)",
        "Рисование числами",
      ]),
      m("Трансформации (геометрия движения)", [
        "Зеркальный мир",
        "Танец фигур (Поворот и Перенос)",
        "Масштаб и Подобие",
      ]),
      m("Отрицательные числа", [
        "Ниже нуля",
        "Сражение знаков",
        "Вращение в 2D (тизер комплексных чисел)",
      ]),
      m("Паттерны и закономерности", [
        "Шаги прогрессии",
        "Взрывной рост",
        "Числа в природе (Фибоначчи)",
      ]),
      m("Статистика и анализ данных", [
        "Охота за данными",
        "Поиск середины (среднее значение)",
        "Детектор лжи в графиках",
      ]),
    ],
  },
};

export const levelsWithNumbers = Object.fromEntries(
  Object.entries(levels).map(([levelIndex, level]) => {
    const modules: {
      name: string;
      number: number;
      lessons: {
        number: number;
        name: string;
      }[];
    }[] = [];

    const lessons: {
      name: string;
      number: number;
      module: {
        number: number;
      };
    }[] = [];

    for (let i = 0, lessonNumber = 1; i < level.modules.length; i++) {
      const module = level.modules[i];

      const lessonsOfModule = module.lessons.map((lesson) => ({
        number: lessonNumber++,
        name: lesson.name,
        module: {
          number: i + 1,
        },
      }));

      modules.push({
        name: module.name,
        number: i + 1,
        lessons: lessonsOfModule.map((lesson) => ({
          number: lesson.number,
          name: lesson.name,
        })),
      });

      lessons.push(...lessonsOfModule);
    }

    return [
      +levelIndex as keyof typeof levels,
      {
        name: level.name,
        modules,
        lessons,
      },
    ];
  })
);

export const math = {
  levels,
  levelsWithNumbers,
} satisfies Course;
