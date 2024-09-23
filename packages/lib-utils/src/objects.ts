import * as R from 'remeda'

import { guardNumberLike } from './guards'
import { ObjectKey, ObjectLiteral } from './types'

type ObjectGet = <Item extends ObjectLiteral>(item: Item, path: string | string[]) => unknown

type ObjectSet = <Item extends ObjectLiteral | unknown[]>(
  item: Item,
  name: ObjectKey | ObjectKey[],
  value: unknown,
) => Item

export const objectGet: ObjectGet = (item, name) =>
  Array.isArray(name)
    ? name.reduce(
        (output, itemReduced) => (output as Record<string, unknown>)?.[itemReduced],
        item as unknown,
      )
    : (item as Record<string, unknown>)[name]

export const objectSet: ObjectSet = (item, name, value) => {
  const path = Array.isArray(name) ? name : [name]
  const path0 = path.at(0) as string

  if (Array.isArray(item)) {
    return item.toSpliced(
      path0 as unknown as number,
      1,
      path.length <= 1
        ? value
        : objectSet(objectGet(item, path0) ?? (guardNumberLike(path0) ? [] : {}), path.slice(1), value),
    ) as typeof item
  }

  if (R.isObjectType(item)) {
    return {
      ...item,
      [path0]:
        path.length <= 1
          ? value
          : objectSet(objectGet(item, path0) ?? (guardNumberLike(path0) ? [] : {}), path.slice(1), value),
    } as typeof item
  }

  return item
}
