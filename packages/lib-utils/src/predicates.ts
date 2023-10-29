import { guardNullish } from './guards'

interface ParametersSort<Value> {
  compare?: (value1: Value, value2: Value) => number
  direction?: 'ascending' | 'descending'
  isNullish?: (value: Value) => boolean
}
type PredicateNoop = () => void
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

export const predicateIdentity = <Value>(value: Value): Value => value
export const predicateNoop: PredicateNoop = () => undefined
export const predicateSortFn: PredicateSortFn = (parameters) => (value1, value2) => {
  const isNullish = parameters?.isNullish ?? guardNullish
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
