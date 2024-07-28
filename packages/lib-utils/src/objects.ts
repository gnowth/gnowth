import type { PredicateObjectFilter } from './predicates'
import type { ObjectKey, ObjectLiteral, UtilEntriesFromObject, UtilObjectFromPairs } from './types'

import { guardNumberLike, guardObject, guardUndefined } from './guards'
import { operatorObjectFilterNot } from './operators'

type ObjectDefaults = <Item extends ObjectLiteral>(item: Item, ...items: Partial<Item | undefined>[]) => Item

type ObjectFilter = <Item extends ObjectLiteral>(item: Item, predicate: PredicateObjectFilter<Item>) => Item

type ObjectFromPairs = {
  <Key extends ObjectKey, Value>(pairs: [Key, Value][]): Record<Key, Value>
  <Pairs extends readonly [ObjectKey, unknown][]>(pairs: Pairs): UtilObjectFromPairs<Pairs>
  <Type extends ObjectKey>(pairs: Type[][]): Record<Type, Type>
}

type ObjectMapValues = <Value, Item extends ObjectLiteral>(
  item: Item,
  predicate: (value: Item[keyof Item], key: keyof Item, item: Item) => Value,
) => { [key in keyof Item]: Value }

type ObjectToEntries = <Item extends ObjectLiteral>(item: Item) => UtilEntriesFromObject<Item>[]

type ObjectToKeys = <Item extends ObjectLiteral>(item: Item) => (keyof Item)[]

type ObjectGet = <Item extends ObjectLiteral>(item: Item, path: string | string[]) => unknown

type ObjectSet = <Item extends ObjectLiteral | unknown[]>(
  item: Item,
  name: ObjectKey | ObjectKey[],
  value: unknown,
) => Item

export const objectFromPairs: ObjectFromPairs = <Type extends ObjectKey>(
  pairs: Type[][],
): Record<Type, Type> =>
  pairs.reduce((output, [key, value]) => ({ ...output, [key]: value }), {} as Record<Type, Type>)

export const objectToEntries: ObjectToEntries = Object.entries

export const objectToKeys: ObjectToKeys = Object.keys

export const objectMapValues: ObjectMapValues = (item, predicate) =>
  objectToEntries(item).reduce(
    (output, [key, value]) => ({ ...output, [key]: predicate(value, key, item) }),
    {},
  ) as { [key in keyof typeof item]: ReturnType<typeof predicate> }

export const objectPickBy: ObjectFilter = (item, predicate) =>
  objectToEntries(item).reduce(
    (output, [key, value]) => (predicate(value, key, item) ? { ...output, [key]: value } : output),
    {} as typeof item,
  )

export const objectOmitBy: ObjectFilter = (item, predicate) =>
  objectPickBy(item, operatorObjectFilterNot(predicate))

export const objectDefaults: ObjectDefaults = (...items) =>
  Object.assign(
    {},
    ...items
      .filter(guardObject)
      .toReversed()
      .map((item) => objectOmitBy(item, guardUndefined)),
  )

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
