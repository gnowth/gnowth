import { guardNullish } from './guards'

export type PredicateFilter<Item> = (item: Item, index: number, items: Item[]) => boolean
export type PredicateIdentity<Item> = (item: Item) => Item
export type PredicateReduce<Item, Output> = (
  output: Output,
  item: Item,
  index: number,
  items: Item[],
) => Output
export type PredicateSort<Item> = (item1: Item, item2: Item) => number
export type PredicateTransform<Item, Output> = (item: Item) => Output

interface OptionsSort<Item> {
  compare?: (item1: Item, item2: Item) => number
  direction?: 'ascending' | 'descending'
  isNullish?: (item: Item) => boolean
}
type PredicateIdentityGeneric = <Item>(item: Item) => Item
type PredicateNoop = () => void
type PredicateSortFn = <Item>(options?: OptionsSort<Item>) => PredicateSort<Item>

export const predicateIdentity: PredicateIdentityGeneric = (item) => item
export const predicateNoop: PredicateNoop = () => undefined
export const predicateSortFn: PredicateSortFn = (options) => (item1, item2) => {
  const isNullish = options?.isNullish ?? guardNullish
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

  const compareDefault = <Item>(item1: Item, item2: Item): number => (item1 > item2 ? 1 : -1)
  const compare = options?.compare ?? compareDefault

  return compare(item1, item2) * directionCoefficient
}
