import { guardArray, guardNullish } from './guards'

export const transformToArray = <Item>(item: Item | Item[] | undefined | null): Item[] => {
  if (guardNullish(item)) {
    return []
  }

  return guardArray(item) ? item : [item]
}
