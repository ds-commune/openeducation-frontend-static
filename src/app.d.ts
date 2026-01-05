// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // extend Object.fromEntries with TKey, TValue overload
  interface ObjectConstructor {
    fromEntries<T, U>(entries: Iterable<readonly [T, U]>): Record<T, U>;
  }
}

export {};
