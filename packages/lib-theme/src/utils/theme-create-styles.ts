import type { CSSObject } from '@emotion/serialize'
import type { UMappedType } from '@gnowth/lib-utils'

import { css } from '@emotion/css'
import * as R from 'remeda'

export const themeCreateStyles = <Styles extends Record<string, CSSObject | string>>(
  styles: Styles,
): UMappedType<Styles, string> =>
  R.mapValues(styles, (style) => css(style as CSSObject | string)) as UMappedType<Styles, string>
