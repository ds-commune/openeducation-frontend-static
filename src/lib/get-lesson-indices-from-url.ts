export function getLessonIndicesFromUrl(url: string) {
  // Try to match lesson URL first
  const lessonMatch = url.match(/level-(\d+)\/lesson-(\d+)/);
  if (lessonMatch) {
    const levelIndex = parseInt(lessonMatch[1], 10);
    const lessonIndex = parseInt(lessonMatch[2], 10) - 1;
    return { levelIndex, lessonIndex };
  }

  // Try to match level overview URL (no lesson)
  const levelMatch = url.match(/level-(\d+)(?:\/)?$/);
  if (levelMatch) {
    const levelIndex = parseInt(levelMatch[1], 10);
    return { levelIndex, lessonIndex: null };
  }

  throw new Error("Invalid URL format");
}
