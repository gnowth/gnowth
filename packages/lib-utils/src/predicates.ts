import * as R from 'remeda'

interface ParametersSort<Value> {
  compare?: (value1: Value, value2: Value) => number
  direction?: 'ascending' | 'descending'
  isNullish?: (value: Value) => boolean
}
type PredicateSortFn = <Value>(parameters?: ParametersSort<Value>) => PredicateSort<Value>

export type PredicateArrayFilter<Value> = (value: Value, index: number, values: Value[]) => boolean
export type PredicateArrayReduce<Value, Output> = (
  output: Output,
  value: Value,
  index: number,
  values: Value[],
) => Output
export type PredicateIdentity<Value> = (value: Value) => Value
export type PredicateSort<Value> = (value1: Value, value2: Value) => number
export type PredicateObjectFilter<Item> = (value: Item[keyof Item], key: keyof Item, item: Item) => boolean

export const predicateSortFn: PredicateSortFn = (parameters) => (value1, value2) => {
  const isNullish = parameters?.isNullish ?? R.isNullish
  const isNullish1 = isNullish(value1)
  const isNullish2 = isNullish(value2)
  const directionCoefficient = parameters?.direction === 'descending' ? -1 : 1

  if (value1 === value2 || (isNullish1 && isNullish2)) {
    return 0
  }

  if (isNullish1) {
    return -1 * directionCoefficient
  }

  if (isNullish2) {
    return 1 * directionCoefficient
  }

  const compareDefault = <Value>(value1: Value, value2: Value): number => (value1 > value2 ? 1 : -1)
  const compare = parameters?.compare ?? compareDefault

  return compare(value1, value2) * directionCoefficient
}
