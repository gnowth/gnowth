export type GuardFilter<Guard extends Item, Item> = (
  item: Item,
  index: number,
  items: Item[],
) => item is Guard
type Guard<Type> = (item: unknown) => item is Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any

export const guardBoolean: Guard<boolean> = (value): value is boolean => typeof value === 'boolean'
export const guardDate: Guard<Date> = (value): value is Date => value instanceof Date
export const guardNull: Guard<null> = (value): value is null => value === null
export const guardNumber: Guard<number> = (value): value is number => typeof value === 'number'
export const guardNumberLike: Guard<number> = (value): value is number => !isNaN(value as number)
export const guardObject = <ObjectType extends object = object>(value: unknown): value is ObjectType =>
  !!value && typeof value === 'object' && value.constructor === Object
export const guardString: Guard<string> = (value): value is string => typeof value === 'string'
export const guardUndefined: Guard<undefined> = (value): value is undefined => value === undefined

export const guardNullish: Guard<null | undefined> = (value): value is undefined | null =>
  guardNull(value) || guardUndefined(value)

export const guardFunction = <Type extends FunctionType = FunctionType>(value: unknown): value is Type =>
  typeof value === 'function'

export const guardArray = <Value = unknown>(value: unknown): value is Array<Value> => Array.isArray(value)
