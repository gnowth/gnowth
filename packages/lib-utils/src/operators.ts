import type { PredicateArrayFilter, PredicateObjectFilter, PredicateSort } from './predicates'

type OperatorArrayFilter = <Value>(predicate: PredicateArrayFilter<Value>) => PredicateArrayFilter<Value>

type OperatorArrayFilters = <Value>(
  ...predicates: PredicateArrayFilter<Value>[]
) => PredicateArrayFilter<Value>

type OperatorSorts = <Value>(...predicates: PredicateSort<Value>[]) => PredicateSort<Value>

type OperatorObjectFilter = <Item>(predicate: PredicateObjectFilter<Item>) => PredicateObjectFilter<Item>

export const operatorArrayFilterAnd: OperatorArrayFilters =
  (...predicates) =>
  (value, index, values) =>
    predicates.every((predicate) => predicate(value, index, values))

export const operatorArrayFilterNot: OperatorArrayFilter = (predicate) => (value, index, values) =>
  !predicate(value, index, values)

export const operatorArrayFilterOr: OperatorArrayFilters =
  (...predicates) =>
  (value, index, values) =>
    predicates.some((predicate) => predicate(value, index, values))

export const operatorSortMultiple: OperatorSorts =
  (...predicates) =>
  (value1, value2) => {
    const predicate = predicates.find((predicate) => predicate(value1, value2) !== 0)

    return predicate?.(value1, value2) ?? 0
  }

export const operatorObjectFilterNot: OperatorObjectFilter = (predicate) => (value, key, item) =>
  !predicate(value, key, item)
