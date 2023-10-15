import type { Theme } from './theme'
export type { SystemType, PaletteType, System } from './types'
export type { ThemeScale, ThemeVariant } from './theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantType<Type> = Partial<Type> | ((theme: Theme, props?: any) => Type)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScaleType = any
