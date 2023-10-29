export type FilterPredicate<Type> = (item: Type) => boolean
export type SortDirection = 'ascending' | 'descending'

export type SortKeyType<T extends string> = T extends `-${infer Prefix}`
  ? Prefix
  : T extends `${infer Type}`
  ? Type
  : never

export type SortPredicate<Type> = (item1: Type, item2: Type) => number
export type SortType<Type extends string> = `${Type}` | `-${Type}`
