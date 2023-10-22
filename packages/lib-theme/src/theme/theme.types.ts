import type { UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import type { ServiceThemeMedia, Media } from './theme-media.service'
import type { ServiceThemeComponent } from './theme-component.service'
import type { ServiceThemePalette, PaletteType } from './theme-palette.service'
import type { ServiceThemeScale, ScaleType } from './theme-scale.service'
import type { ServiceThemeVariable, Variable } from './theme-variable.service'
import type { ServiceThemeVariant, VariantType } from './theme-variant.service'
import { TokenBreakpoint } from '../tokens/tokens'

type Dependencies = {
  serviceThemeMedia: ServiceThemeMedia
  serviceThemeComponent: ServiceThemeComponent
  serviceThemePalette: ServiceThemePalette
  serviceThemeScale: ServiceThemeScale
  serviceThemeVariable: ServiceThemeVariable
  serviceThemeVariant: ServiceThemeVariant
}

export type Configs = {
  componentsNamespaced?: UtilNamespaced<UtilNamespaced<ComponentType>>
  palettes?: PaletteType[]
  medias?: UtilNamespaced<Media>
  scales?: UtilNamespaced<ScaleType>
  variables?: UtilNamespaced<Variable>
  variantsNamespaced?: UtilNamespaced<UtilNamespaced<VariantType>>
  // fonts?: unknown
  // stylesheets?: unknown
}

export type ConfigsWithDependencies = Configs & {
  dependencies: Dependencies
}

export type Responsive<Type> = { responsive: true } & { [Key in TokenBreakpoint]?: Type }
