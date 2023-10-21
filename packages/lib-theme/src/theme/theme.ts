import type { Configs } from './theme.types'
import { ServiceTheme } from './theme.service'
import { ServiceThemeComponent } from './theme-component.service'
import { ServiceThemeMedia } from './theme-media.service'
import { ServiceThemePalette } from './theme-palette.service'
import { ServiceThemeScale } from './theme-scale.service'
import { ServiceThemeVariable } from './theme-variable.service'
import { ServiceThemeVariant } from './theme-variant.service'

export class Theme extends ServiceTheme {
  constructor(configs?: Configs) {
    super({
      dependencies: {
        serviceThemeComponent: new ServiceThemeComponent(configs),
        serviceThemeMedia: new ServiceThemeMedia(configs),
        serviceThemePalette: new ServiceThemePalette(configs),
        serviceThemeScale: new ServiceThemeScale(configs),
        serviceThemeVariable: new ServiceThemeVariable(configs),
        serviceThemeVariant: new ServiceThemeVariant(configs),
      },
      ...configs,
    })
  }
}
