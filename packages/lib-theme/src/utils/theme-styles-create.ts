import { css } from '@emotion/css'
import { objectMapValues } from '@gnowth/lib-utils'

export const themeStylesCreate = <Styles extends Record<string, string>>(
  styles: Styles,
): Record<keyof Styles, string> => {
  return objectMapValues(styles, (style) => css(style))
}
