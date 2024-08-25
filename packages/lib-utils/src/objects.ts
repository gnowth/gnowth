import * as R from 'remeda'

import type { ObjectKey, ObjectLiteral, UtilEntriesFromObject } from './types'

import { guardNumberLike, guardObject, guardUndefined } from './guards'

type ObjectDefaults = <Item extends ObjectLiteral>(item: Item, ...items: Partial<Item | undefined>[]) => Item

type ObjectMapValues = <Value, Item extends ObjectLiteral>(
  item: Item,
  predicate: (value: Item[keyof Item], key: keyof Item, item: Item) => Value,
) => { [key in keyof Item]: Value }

type ObjectToEntries = <Item extends ObjectLiteral>(item: Item) => UtilEntriesFromObject<Item>[]

type ObjectGet = <Item extends ObjectLiteral>(item: Item, path: string | string[]) => unknown

type ObjectSet = <Item extends ObjectLiteral | unknown[]>(
  item: Item,
  name: ObjectKey | ObjectKey[],
  value: unknown,
) => Item

export const objectToEntries: ObjectToEntries = Object.entries

export const objectMapValues: ObjectMapValues = (item, predicate) =>
  objectToEntries(item).reduce(
    (output, [key, value]) => ({ ...output, [key]: predicate(value, key, item) }),
    {},
  ) as { [key in keyof typeof item]: ReturnType<typeof predicate> }

export const objectDefaults: ObjectDefaults = (...items) =>
  Object.assign({}, ...items.filter(guardObject).toReversed().map(R.omitBy(guardUndefined)))

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

  if (guardObject(item)) {
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
