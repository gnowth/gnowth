import { css } from '@emotion/css'
import { CSSObject } from '@emotion/serialize'
import { UMappedType } from '@gnowth/lib-utils'
import * as R from 'remeda'

export const themeCreateStyles = <Styles extends Record<string, CSSObject | string>>(
  styles: Styles,
): UMappedType<Styles, string> =>
  R.mapValues(styles, (style) => css(style as CSSObject | string)) as UMappedType<Styles, string>
