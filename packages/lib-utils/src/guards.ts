type Guard<Type> = (item: unknown) => item is Type

export const guardNumberLike: Guard<number> = (value): value is number => !isNaN(value as number)
