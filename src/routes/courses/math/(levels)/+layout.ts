import type { LayoutLoad } from "./$types";
import { getLessonIndicesFromUrl } from "$lib";
import { math } from "$lib/data/courses/math";

export const load: LayoutLoad = async (event) => {
  const { levelIndex, lessonIndex } = getLessonIndicesFromUrl(
    event.url.pathname
  );

  const level =
    math.levelsWithNumbers[levelIndex as keyof typeof math.levelsWithNumbers];

  // Level overview page (no lesson selected)
  if (lessonIndex === null) {
    return {
      levelIndex: levelIndex as keyof typeof math.levelsWithNumbers,
      lessonIndex: null,
      lesson: null,
      level,
      isLevelOverview: true,
    };
  }

  // Lesson page
  const lesson = level.lessons[lessonIndex];

  return {
    levelIndex: levelIndex as keyof typeof math.levelsWithNumbers,
    lessonIndex: lessonIndex,
    lesson,
    level,
    isLevelOverview: false,
  };
};
