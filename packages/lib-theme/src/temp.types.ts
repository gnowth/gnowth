import type { Theme } from './theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantType<Type> = Partial<Type> | ((theme: Theme, props?: any) => Type)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScaleType = any
