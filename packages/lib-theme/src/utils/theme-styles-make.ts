import type { CSSObject } from '@emotion/serialize'

import { css } from '@emotion/css'
import * as R from 'remeda'

import type { Theme } from '../theme/theme'

type ConfigsMakeStyles<Props> = {
  [key: string]: ((props: Props, theme: Theme) => CSSObject) | CSSObject | string
}

type MappedType<Type, ToType> = {
  [Key in keyof Type]: ToType
}

// TODO: should also merge classNames from props
export const themeStylesMake = <Props>(configs: ConfigsMakeStyles<Props>) => {
  return function styles(props: Props, theme: Theme): MappedType<ConfigsMakeStyles<Props>, string> {
    return R.mapValues(configs, (makeStyles) =>
      R.isFunction(makeStyles) ? css(makeStyles(props, theme)) : css(makeStyles),
    )
  }
}
