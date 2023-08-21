import type { PredicateIdentity, PredicateFilter, PredicateReduce, PredicateSort } from './predicates'

type GuardFilter<Item, Guard extends Item> = (item: Item, index: number, items: Item[]) => item is Guard
type ArrayFilterFn = {
  <Item, Guard extends Item>(predicate: GuardFilter<Item, Guard>): (items: Item[]) => Guard[]
  <Item>(predicate: PredicateFilter<Item>): PredicateIdentity<Item[]>
}
type ArrayReduceFn = <ItemOverride, Output>(
  predicate: PredicateReduce<ItemOverride, Output>,
  initial: Output,
) => <Item extends ItemOverride>(items: Item[]) => Output
type ArraySortFn = <Item>(predicate: PredicateSort<Item>) => PredicateIdentity<Item[]>

export const arrayFilterFn: ArrayFilterFn =
  <Item>(predicate: PredicateFilter<Item>): PredicateIdentity<Item[]> =>
  (items) =>
    items.filter(predicate)

export const arrayReduceFn: ArrayReduceFn = (predicate, valueInitial) => (items) =>
  items.reduce(predicate, valueInitial)

export const arraySortFn: ArraySortFn = (predicate) => (items) => [...items].sort(predicate)
