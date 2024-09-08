import * as R from 'remeda'

export type GuardFilter<Guard extends Item, Item> = (
  item: Item,
  index: number,
  items: Item[],
) => item is Guard
type Guard<Type> = (item: unknown) => item is Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any

export const guardNumberLike: Guard<number> = (value): value is number => !isNaN(value as number)
export const guardUndefined: Guard<undefined> = (value): value is undefined => value === undefined

export const guardFunction = <Type extends FunctionType = FunctionType>(value: unknown): value is Type =>
  R.isFunction(value)
