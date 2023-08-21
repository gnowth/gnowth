import type { UtilEntriesFromObject, UtilObjectFromPairs } from './types'
import { arrayReduceFn } from './arrays'

type ObjectFromPairsFn = {
  <Key extends string | number | symbol, Value>(pairs: [Key, Value][]): Record<Key, Value>
  <Type extends string | number | symbol>(pairs: Type[][]): Record<Type, Type>
  <Pairs extends readonly [unknown, string | number | symbol][]>(pairs: Pairs): UtilObjectFromPairs<Pairs>
}
type ObjectToEntriesFn = <TypeOverride extends object>() => <Type extends TypeOverride>(
  object: Type,
) => UtilEntriesFromObject<Type>[]
type ObjectToKeysFn = <TypeOverride extends object>() => <Type extends TypeOverride>(
  object: Type,
) => (keyof Type)[]

export const objectFromPairs: ObjectFromPairsFn = <Pair extends [unknown, string | number | symbol]>(
  pairs: Pair[],
) => arrayReduceFn((output, [value, key]: Pair) => ({ ...output, [key]: value }), {})(pairs)

export const objectToEntries: ObjectToEntriesFn = () => Object.entries

export const objectToKeys: ObjectToKeysFn = () => Object.keys
