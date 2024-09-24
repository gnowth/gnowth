import * as R from 'remeda'

import { guardNumberLike } from './guards'
import { ObjectKey, ObjectLiteral } from './types'

type ObjectDefaults = <Item extends ObjectLiteral>(...items: Partial<Item>[]) => Item

type ObjectGet = <Item extends ObjectLiteral>(item: Item, path: string | string[]) => unknown

type ObjectSet = <Item extends ObjectLiteral | unknown[]>(
  item: Item,
  name: ObjectKey | ObjectKey[],
  value: unknown,
) => Item

export const objectDefaults: ObjectDefaults = (...items) =>
  Object.assign(
    {},
    ...items
      .filter(R.isObjectType)
      .map(R.omitBy((value) => value === undefined))
      .toReversed(),
  )

// DEBT(fix): function assumes that if a field is an object, it only allows object
export const objectDefaultsDeep: ObjectDefaults = <Item>(...items: Partial<Item>[]) =>
  R.pipe(
    objectDefaults(...items),
    R.mapValues((value, key) =>
      R.isObjectType(value)
        ? objectDefaultsDeep(
            ...R.pipe(
              items,
              R.filter(R.isObjectType),
              R.map((item) => item?.[key as unknown as keyof typeof item] as object),
              R.filter(R.isObjectType),
            ),
          )
        : value,
    ),
  ) as Item

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
