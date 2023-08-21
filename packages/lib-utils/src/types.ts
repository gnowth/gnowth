export type UtilIntersectionFromUnion<Union> = (Union extends unknown ? (k: Union) => void : never) extends (
  k: infer Item,
) => void
  ? Item
  : never

export type UtilEntriesFromObject<ObjectType extends object> = {
  [E in keyof ObjectType]: [ObjectType[E], E]
}[keyof ObjectType]

type UtilObjectIdentity<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type UtilObjectFromPair<Type> = Type extends readonly [infer ItemLeft, infer ItemRight]
  ? ItemRight extends string | number | symbol
    ? { [Key in ItemRight]: ItemLeft }
    : unknown
  : unknown

export type UtilObjectFromPairs<ArrayType extends readonly unknown[]> = ArrayType extends readonly [
  infer PairExtracted,
  ...infer PairsRest,
]
  ? UtilObjectIdentity<UtilObjectFromPair<PairExtracted> & UtilObjectFromPairs<PairsRest>>
  : unknown

export type UtilOptional<Type, Key extends keyof Type> = Partial<Pick<Type, Key>> & Omit<Type, Key>
