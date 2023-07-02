import type { Entries, FromPairs } from './types'
import { reduce } from './arrays'

type KeysFn = <Type extends object>() => <Type1 extends Type>(object: Type1) => (keyof Type1)[]
export const keys: KeysFn = () => Object.keys

type EntriesFn = <TypeOverride>() => <Type extends TypeOverride>(object: Type) => Entries<Type>[]
export const entries: EntriesFn = () => Object.entries

type FromPairsFn = {
  <Key extends string | number | symbol, Value>(pairs: [Key, Value][]): Record<Key, Value>
  <Type extends string | number | symbol>(pairs: Type[][]): Record<Type, Type>
  <Pairs extends readonly [unknown, string | number | symbol][]>(pairs: Pairs): FromPairs<Pairs>
}
export const fromPairs: FromPairsFn = <Pair extends [unknown, string | number | symbol]>(pairs: Pair[]) =>
  reduce((output, [value, key]: Pair) => ({ ...output, [key]: value }), {})(pairs)
