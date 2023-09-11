import type { ObjectKey, ObjectLike, UtilEntriesFromObject, UtilObjectFromPairs } from './types'
import type { PredicateObjectFilter } from './predicates'
import { guardObject, guardUndefined } from './guards'
import { operatorObjectFilterNot } from './operators'

type ObjectDefaults = <Item extends ObjectLike>(item: Item, ...items: Partial<Item | undefined>[]) => Item

type ObjectFilter = <Item extends ObjectLike>(item: Item, predicate: PredicateObjectFilter<Item>) => Item

type ObjectFromPairs = {
  <Key extends ObjectKey, Value>(pairs: [Key, Value][]): Record<Key, Value>
  <Type extends ObjectKey>(pairs: Type[][]): Record<Type, Type>
  <Pairs extends readonly [ObjectKey, unknown][]>(pairs: Pairs): UtilObjectFromPairs<Pairs>
}

type ObjectMapValues = <Value, Item extends ObjectLike>(
  item: Item,
  predicate: (value: Item[keyof Item], key: keyof Item, item: Item) => Value,
) => { [key in keyof Item]: Value }

type ObjectToEntries = <Item extends ObjectLike>(item: Item) => UtilEntriesFromObject<Item>[]

type ObjectToKeys = <Item extends ObjectLike>(item: Item) => (keyof Item)[]

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
