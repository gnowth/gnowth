import type { CSSObject } from '@emotion/serialize'
import type { UMappedType } from '@gnowth/lib-utils'

import * as R from 'remeda'

import type { Theme } from '../theme/theme'

import { themeCreateStyles } from './theme-create-styles'

type Parameters<Props> = {
  [key: string]: ((props: Props, theme: Theme) => CSSObject) | CSSObject | string
}
export const themeMakeStyles =
  <Props>(parameters: Parameters<Props>) =>
  (props: Props, theme: Theme): UMappedType<Parameters<Props>, string> =>
    R.pipe(
      parameters,
      R.mapValues((maybeStyle) => (R.isFunction(maybeStyle) ? maybeStyle(props, theme) : maybeStyle)),
      themeCreateStyles,
    )
