import type { Theme } from './theme/theme'
export type { SystemType, PaletteType, System, ScaleType } from './types'
export type { ThemeVariant } from './theme/theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantType<Type> = Partial<Type> | ((props: Type & { theme: Theme }) => Partial<Type>)
