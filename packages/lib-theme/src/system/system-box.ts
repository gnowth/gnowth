import type { CSSObject } from '@emotion/css'
import type {
  SystemBorder,
  SystemBorderBottom,
  SystemBorderColor,
  SystemBorderLeft,
  SystemBorderRadius,
  SystemBorderRight,
  SystemBorderTop,
  SystemBox,
  SystemBoxShadow,
  SystemOutline,
  Theme,
} from '@gnowth/lib-types'

import { systemCompose, systemInterpolate } from './system'

export function systemBorder() {
  return (props: SystemBorder, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'border', theme, value: props.border })
}

export function systemBorderBottom() {
  return (props: SystemBorderBottom, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderBottom', theme, value: props.borderBottom })
}

export function systemBorderColor() {
  return (props: SystemBorderColor, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderColor', theme, value: props.borderColor })
}

export function systemBorderLeft() {
  return (props: SystemBorderLeft, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderLeft', theme, value: props.borderLeft })
}

export function systemBorderRadius() {
  return (props: SystemBorderRadius, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderRadius', theme, value: props.borderRadius })
}

export function systemBorderRight() {
  return (props: SystemBorderRight, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderRight', theme, value: props.borderRight })
}

export function systemBorderTop() {
  return (props: SystemBorderTop, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'borderTop', theme, value: props.borderTop })
}

export function systemBoxShadow() {
  return (props: SystemBoxShadow, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'boxShadow', theme, value: props.boxShadow })
}

export function systemOutline() {
  return (props: SystemOutline, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'outline', theme, value: props.outline })
}

export function systemBox(): (props: SystemBox, theme: Theme) => CSSObject {
  return systemCompose<SystemBox>(
    systemBorder(),
    systemBorderBottom(),
    systemBorderColor(),
    systemBorderLeft(),
    systemBorderRadius(),
    systemBorderRight(),
    systemBorderTop(),
    systemBoxShadow(),
    systemOutline(),
  )
}
