import type { CSSObject } from '@emotion/css'
import type { SystemColor, SystemPalette, Theme } from '@gnowth/lib-types'

import { systemInterpolate } from './system'

export function systemColor() {
  return (props: SystemColor, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'color', theme, value: props.color })
}

export function systemColorFromPalette() {
  return (props: SystemPalette, theme: Theme): CSSObject => {
    const color = theme.getPaletteColor(props)

    return color ? { color } : {}
  }
}

export function systemBackgroundColorFromPalette() {
  return (props: SystemPalette, theme: Theme): CSSObject => {
    const backgroundColor = theme.getPaletteColor(props)

    return backgroundColor ? { backgroundColor } : {}
  }
}
