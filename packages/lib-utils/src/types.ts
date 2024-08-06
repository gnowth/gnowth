export type ObjectKey = number | string | symbol
// TODO: update proper type
export type ObjectLiteral = object

export type UtilIntersectionFromUnion<Union> = (Union extends unknown ? (k: Union) => void : never) extends (
  k: infer Item,
) => void
  ? Item
  : never

export type UtilEntriesFromObject<ObjectType extends object> = {
  [E in keyof ObjectType]: [E, ObjectType[E]]
}[keyof ObjectType]

type UtilObjectIdentity<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type UtilObjectFromPair<Type> = Type extends readonly [infer ItemLeft, infer ItemRight]
  ? ItemLeft extends number | string | symbol
    ? { [Key in ItemLeft]: ItemRight }
    : unknown
  : unknown

export type UtilObjectFromPairs<ArrayType extends readonly unknown[]> = ArrayType extends readonly [
  infer PairExtracted,
  ...infer PairsRest,
]
  ? UtilObjectIdentity<UtilObjectFromPair<PairExtracted> & UtilObjectFromPairs<PairsRest>>
  : unknown

export type UtilOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

// TODO: implement properly. it does not support union type
export type UtilRequired<Item extends ObjectLiteral, Key = void> = Key extends void
  ? Item
  : Key extends keyof Item
    ? Omit<Item, Key> & Required<Pick<Item, Key>>
    : never

export type UtilNamespaced<Value = unknown, Key extends ObjectKey = string> = Record<Key, Value | undefined>

export type UtilValues<T> = T[keyof T]
