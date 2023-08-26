import type { CSSObject } from '@emotion/css'
import type {
  SystemBackground,
  SystemBackgroundColor,
  SystemBackgroundImage,
  SystemBackgroundPosition,
  SystemBackgroundRepeat,
  SystemBackgroundSize,
  SystemImage,
  Theme,
} from '@gnowth/lib-types'

import { systemCompose, systemInterpolate } from './system'

export function systemBackground() {
  return (props: SystemBackground, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'background', value: props.background })
}

export function systemBackgroundColor() {
  return (props: SystemBackgroundColor, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'backgroundColor', value: props.backgroundColor })
}

export function systemBackgroundImage() {
  return (props: SystemBackgroundImage, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'backgroundImage', value: props.backgroundImage })
}

export function systemBackgroundPosition() {
  return (props: SystemBackgroundPosition, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'backgroundPosition', value: props.backgroundPosition })
}

export function systemBackgroundRepeat() {
  return (props: SystemBackgroundRepeat, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'backgroundRepeat', value: props.backgroundRepeat })
}

export function systemBackgroundSize() {
  return (props: SystemBackgroundSize, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'backgroundSize', value: props.backgroundSize })
}

export function systemImage(): (props: SystemImage, theme: Theme) => CSSObject {
  return systemCompose<SystemImage>(
    systemBackground(),
    systemBackgroundColor(),
    systemBackgroundImage(),
    systemBackgroundPosition(),
    systemBackgroundRepeat(),
    systemBackgroundSize(),
  )
}
