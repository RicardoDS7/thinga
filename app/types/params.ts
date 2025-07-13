// types.ts
export type RouteParams<T extends string> = {
  params: Record<T, string>;
};
