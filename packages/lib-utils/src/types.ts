export type ObjectKey = number | string | symbol
// TODO: update proper type
export type ObjectLiteral = object

export type UtilEntriesFromObject<ObjectType extends object> = {
  [E in keyof ObjectType]: [E, ObjectType[E]]
}[keyof ObjectType]

export type UtilOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

// TODO: implement properly. it does not support union type
export type UtilRequired<Item extends ObjectLiteral, Key = void> = Key extends void
  ? Item
  : Key extends keyof Item
    ? Omit<Item, Key> & Required<Pick<Item, Key>>
    : never

export type UtilNamespaced<Value = unknown, Key extends ObjectKey = string> = Record<Key, Value | undefined>
export type UMappedType<TType, ToTType> = { [Key in keyof TType]: ToTType }
