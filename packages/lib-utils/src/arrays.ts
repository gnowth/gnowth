// Filters
type FilterGuard<Type, Guard extends Type> = (item: Type, index: number, items: Type[]) => item is Guard
type FilterPredicate<Type> = (item: Type, index: number, items: Type[]) => boolean
type FilterFn = {
  <Type, Guard extends Type>(predicate: FilterGuard<Type, Guard>): (items: Type[]) => Guard[]
  <Type>(predicate: FilterPredicate<Type>): (items: Type[]) => Type[]
}
export const filter: FilterFn =
  <Type>(predicate: FilterPredicate<Type>) =>
  (items: Type[]) =>
    items.filter(predicate)

export function filterPredicateUsingAnd<Type>(...predicates: FilterPredicate<Type>[]): FilterPredicate<Type> {
  return (item, index, items) => predicates.every((predicate) => predicate(item, index, items))
}

export function filterPredicateUsingOr<Type>(...predicates: FilterPredicate<Type>[]): FilterPredicate<Type> {
  return (item, index, items) => predicates.some((predicate) => predicate(item, index, items))
}

// Sort
type SortPredicate<Type> = (item1: Type, item2: Type) => number
export const sort =
  <Type>(predicate: SortPredicate<Type>) =>
  (items: Type[]): Type[] =>
    [...items].sort(predicate)

export function sortPredicateUsingSequence<Type>(...predicates: SortPredicate<Type>[]): SortPredicate<Type> {
  return (item1, item2) => {
    const predicate = predicates.find((predicate) => predicate(item1, item2) !== 0)

    return predicate?.(item1, item2) ?? 0
  }
}

interface OptionsSort<Type> {
  compare?: (item1: Type, item2: Type) => number
  direction?: 'ascending' | 'descending'
  isNullish?: (item: Type) => boolean
}

export function makeSortPredicate<Type>(options?: OptionsSort<Type>): SortPredicate<Type> {
  return (item1, item2) => {
    const isNullishDefault = (item: Type) => item === undefined || item === null
    const isNullish = options?.isNullish ?? isNullishDefault
    const isNullish1 = isNullish(item1)
    const isNullish2 = isNullish(item2)
    const directionCoefficient = options?.direction === 'descending' ? -1 : 1

    if (item1 === item2 || (isNullish1 && isNullish2)) {
      return 0
    }

    if (isNullish1) {
      return -1 * directionCoefficient
    }

    if (isNullish2) {
      return 1 * directionCoefficient
    }

    const compareDefault = (item1: Type, item2: Type) => (item1 > item2 ? 1 : -1)
    const compare = options?.compare ?? compareDefault

    return compare(item1, item2) * directionCoefficient
  }
}

// Reduce
type ReducePredicate<Type, Output> = (output: Output, item: Type, index: number, items: Type[]) => Output
type ReduceFn = <Type, Output>(
  predicate: ReducePredicate<Type, Output>,
  initial: Output,
) => <Type1 extends Type>(items: Type1[]) => Output
export const reduce: ReduceFn = (predicate, initialValue) => (items) => items.reduce(predicate, initialValue)
