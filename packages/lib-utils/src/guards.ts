export type GuardFilter<Guard extends Item, Item> = (
  item: Item,
  index: number,
  items: Item[],
) => item is Guard
type Guard<Type> = (item: unknown) => item is Type

export const guardBoolean: Guard<boolean> = (type): type is boolean => typeof type === 'boolean'
export const guardDate: Guard<Date> = (type): type is Date => type instanceof Date
export const guardNull: Guard<null> = (type): type is null => type === null
export const guardNumber: Guard<number> = (type): type is number => typeof type === 'number'
export const guardObject: Guard<object> = (type): type is object => typeof type === 'object'
export const guardString: Guard<string> = (type): type is string => typeof type === 'string'
export const guardUndefined: Guard<undefined> = (type): type is undefined => type === undefined

export const guardNullish: Guard<null | undefined> = (type): type is undefined | null =>
  guardNull(type) || guardUndefined(type)

// export const guardFunction = (type: unknown): type is function => typeof type === 'function'
// export const guardArray = (type: unknown): type is Array => Array.isArray(type)
