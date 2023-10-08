import type {
  PropsVariant,
  ThemeConfigsComponent,
  ThemeConfigsPalette,
  ThemeConfigsScale,
  ThemeVariant,
} from '@gnowth/lib-types'
import type { Theme } from '@gnowth/lib-theme'
import type { ComponentType } from 'react'
import { guardString } from '@gnowth/lib-utils'

class ThemeShimmed {
  getComponent<Props>(configs: ThemeConfigsComponent<Props>): ComponentType<Props> | undefined {
    return guardString(configs.component) ? undefined : configs.component
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPaletteColor(_configs: ThemeConfigsPalette): string | undefined {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getScaleItem(_configs: ThemeConfigsScale): string | undefined {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getVariable<Type>(_name: string): Type | undefined {
    return undefined
  }

  getVariant<Props>(
    props: Props,
    propsDefault?: Partial<Props>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _variantsLocal?: Record<string, ThemeVariant<Props>>,
  ): Props {
    return { ...propsDefault, ...props }
  }

  getVariantByDefinitions<Props>(
    definitions: (props: Props) => PropsVariant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mergeKeys?: Array<keyof Props>,
  ): Props {
    return { ...propsDefault, ...props }
  }
}

export const shimmedTheme = new ThemeShimmed() as Theme
