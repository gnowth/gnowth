import type { CSSObject } from '@emotion/serialize'

import { css } from '@emotion/css'
import { guardString, objectMapValues } from '@gnowth/lib-utils'

import type { Theme } from '../theme/theme'

type ConfigsMakeStyles<Props> = {
  [key: string]: ((props: Props, theme: Theme) => CSSObject) | string
}

type MappedType<Type, ToType> = {
  [Key in keyof Type]: ToType
}

// TODO: should also merge classNames from props
export const themeStylesMake = <Props>(configs: ConfigsMakeStyles<Props>) => {
  return function styles(props: Props, theme: Theme): MappedType<ConfigsMakeStyles<Props>, string> {
    return objectMapValues(configs, (makeStyles) =>
      guardString(makeStyles) ? css(makeStyles) : css(makeStyles(props, theme)),
    )
  }
}
