import type { CSSObject } from '@emotion/css'
import type {
  SystemBottom,
  SystemLeft,
  SystemPlace,
  SystemPosition,
  SystemRight,
  SystemTop,
  SystemZIndex,
  Theme,
} from '@gnowth/lib-types'

import type { ThemeScale } from '../types'
import { systemCompose, systemInterpolate } from './system'

export function systemBottom() {
  return (props: SystemBottom, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'bottom', value: props.bottom })
}

export function systemLeft() {
  return (props: SystemLeft, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'left', value: props.left })
}

export function systemPosition() {
  return (props: SystemPosition, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'position', value: props.position })
}

export function systemRight() {
  return (props: SystemRight, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'right', value: props.right })
}

export function systemTop() {
  return (props: SystemTop, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'top', value: props.top })
}

export function systemZIndex(scale: ThemeScale | string = 'zindex') {
  return (props: SystemZIndex, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'zIndex', value: props.zIndex })
}

export function systemPlace(): (props: SystemPlace, theme: Theme) => CSSObject {
  return systemCompose<SystemPlace>(
    systemBottom(),
    systemLeft(),
    systemPosition(),
    systemRight(),
    systemTop(),
    systemZIndex(),
  )
}
