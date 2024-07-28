import { guardArray, guardNullish } from './guards'

export const transformToArray = <Item>(item: Item | Item[] | null | undefined): Item[] => {
  if (guardNullish(item)) {
    return []
  }

  return guardArray(item) ? item : [item]
}
