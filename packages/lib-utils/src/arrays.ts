import type { ObjectKey } from './types'

type ArrayKeyBy = <Item>(
  items: Item[],
  predicate: (item: Item, index: number, items: Item[]) => ObjectKey,
) => Record<ObjectKey, Item>
type ArrayUniqBy = <Item>(
  items: Item[],
  predicate: (item: Item, index: number, items: Item[]) => unknown,
) => Item[]

export const arrayKeyBy: ArrayKeyBy = (items, predicate) =>
  items.reduce(
    (output, item, index) => {
      output[predicate(item, index, items)] = item
      return output
    },
    {} as Record<ObjectKey, (typeof items)[number]>,
  )

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const arrayUniqBy: ArrayUniqBy = (items, predicate) => {
  return items
}
