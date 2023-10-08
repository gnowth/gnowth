export type Interpolate<Type> = Type | Record<string, Type>

export type MappedType<Type, ToType> = {
  [Key in keyof Type]: ToType
}

export interface Namespace<Type> {
  [namespace: string]: Record<string, Type | undefined> | undefined
}
