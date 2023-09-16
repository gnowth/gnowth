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
    systemInterpolate({ key: 'bottom', theme, value: props.bottom })
}

export function systemLeft() {
  return (props: SystemLeft, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'left', theme, value: props.left })
}

export function systemPosition() {
  return (props: SystemPosition, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'position', theme, value: props.position })
}

export function systemRight() {
  return (props: SystemRight, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'right', theme, value: props.right })
}

export function systemTop() {
  return (props: SystemTop, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'top', theme, value: props.top })
}

export function systemZIndex(scale: ThemeScale | string = 'zindex') {
  return (props: SystemZIndex, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'zIndex', scale, theme, value: props.zIndex })
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
