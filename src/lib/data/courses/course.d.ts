export type Course = {
  levels: Record<
    number,
    {
      name: string;
      modules: {
        name: string;
        lessons: {
          name: string;
        }[];
      }[];
    }
  >;

  levelsWithNumbers: Record<
    number,
    {
      name: string;

      modules: {
        number: number;
        name: string;
        lessons: {
          number: number;
          name: string;
        }[];
      }[];

      lessons: {
        number: number;
        name: string;

        module: {
          number: number;
        };
      }[];
    }
  >;
};
