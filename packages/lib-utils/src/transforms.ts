import * as R from 'remeda'

export const transformToArray = <Item>(item: Item | Item[] | null | undefined): Item[] => {
  const nonNullishItem = item ?? []
  return R.isArray(nonNullishItem) ? nonNullishItem : [nonNullishItem]
}
