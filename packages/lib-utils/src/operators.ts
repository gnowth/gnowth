import type { PredicateFilter, PredicateSort } from './predicates'

type OperatorFilter = <Type>(...predicates: PredicateFilter<Type>[]) => PredicateFilter<Type>
type OperatorSort = <Type>(...predicates: PredicateSort<Type>[]) => PredicateSort<Type>

export const operatorFilterAnd: OperatorFilter =
  (...predicates) =>
  (item, index, items) =>
    predicates.every((predicate) => predicate(item, index, items))

export const operatorFilterOr: OperatorFilter =
  (...predicates) =>
  (item, index, items) =>
    predicates.some((predicate) => predicate(item, index, items))

export const operatorSortMultiple: OperatorSort =
  (...predicates) =>
  (item1, item2) => {
    const predicate = predicates.find((predicate) => predicate(item1, item2) !== 0)

    return predicate?.(item1, item2) ?? 0
  }
