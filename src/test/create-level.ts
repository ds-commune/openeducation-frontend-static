import fs from "node:fs/promises";
import { math } from "$lib/data/courses/math";

async function createLevel(n: keyof typeof math.levels) {
  for (let i = 0, lessonNumber = 1; i < math.levels[n].modules.length; i++) {
    const module = math.levels[n].modules[i];

    for (let j = 0; j < module.lessons.length; j++, lessonNumber++) {
      const levelRoot = `./src/routes/courses/math/level-${n}`;

      const legacyPath = `${levelRoot}/module-${i + 1}/lesson-${j + 1}`;
      const newPath = `${levelRoot}/lesson-${lessonNumber}`;

      console.log(
        `Creating level file at: ${newPath} (and migrating old file from ${legacyPath})`
      );

      if (await fs.stat(legacyPath).catch(() => null)) {
        await fs.rename(legacyPath, newPath);
      } else {
        await fs.mkdir(newPath, { recursive: true });
      }
    }
  }
}

await createLevel(1);
await createLevel(2);
