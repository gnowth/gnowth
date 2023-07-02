export type Entries<Type> = { [E in keyof Type]: [Type[E], E] }[keyof Type]

type FromPair<Type> = Type extends readonly [infer L, infer R]
  ? R extends string | number | symbol
    ? { [K in R]: L }
    : unknown
  : unknown
export type FromPairs<A extends readonly unknown[]> = A extends readonly [infer L, ...infer R]
  ? ObjectIdentity<FromPair<L> & FromPairs<R>>
  : unknown

export type IntersectionFromUnion<Union> = (Union extends unknown ? (k: Union) => void : never) extends (
  k: infer Item,
) => void
  ? Item
  : never

export type ObjectIdentity<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type IdentityPredicate<Type> = (item: Type) => Type

export type Optional<Type, Key extends keyof Type> = Partial<Pick<Type, Key>> & Omit<Type, Key>
