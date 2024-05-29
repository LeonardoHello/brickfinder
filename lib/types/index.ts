export type ArrElement<Arr> = Arr extends readonly (infer T)[] ? T : never;
export type SearchParam = string | string[] | undefined;
