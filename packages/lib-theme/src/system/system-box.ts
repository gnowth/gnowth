import type { Interpolate, System } from '../types'
import { systemCompose, systemInterpolate } from './system'

type SystemBorder = { border?: Interpolate<string> }
type SystemBorderBottom = { borderBottom?: Interpolate<string> }
type SystemBorderColor = { borderColor?: Interpolate<string> }
type SystemBorderLeft = { borderLeft?: Interpolate<string> }
type SystemBorderRadius = { borderRadius?: Interpolate<string> }
type SystemBorderRight = { borderRight?: Interpolate<string> }
type SystemBorderTop = { borderTop?: Interpolate<string> }
type SystemBoxShadow = { boxShadow?: Interpolate<string> }
type SystemOutline = { outline?: Interpolate<string> }

export const systemBorder: () => System<SystemBorder> = () => (props, theme) =>
  systemInterpolate({ key: 'border', theme, value: props.border })

export const systemBorderBottom: () => System<SystemBorderBottom> = () => (props, theme) =>
  systemInterpolate({ key: 'borderBottom', theme, value: props.borderBottom })

export const systemBorderColor: () => System<SystemBorderColor> = () => (props, theme) =>
  systemInterpolate({ key: 'borderColor', theme, value: props.borderColor })

export const systemBorderLeft: () => System<SystemBorderLeft> = () => (props, theme) =>
  systemInterpolate({ key: 'borderLeft', theme, value: props.borderLeft })

export const systemBorderRadius: () => System<SystemBorderRadius> = () => (props, theme) =>
  systemInterpolate({ key: 'borderRadius', theme, value: props.borderRadius })

export const systemBorderRight: () => System<SystemBorderRight> = () => (props, theme) =>
  systemInterpolate({ key: 'borderRight', theme, value: props.borderRight })

export const systemBorderTop: () => System<SystemBorderTop> = () => (props, theme) =>
  systemInterpolate({ key: 'borderTop', theme, value: props.borderTop })

export const systemBoxShadow: () => System<SystemBoxShadow> = () => (props, theme) =>
  systemInterpolate({ key: 'boxShadow', theme, value: props.boxShadow })

export const systemOutline: () => System<SystemOutline> = () => (props, theme) =>
  systemInterpolate({ key: 'outline', theme, value: props.outline })

export const systemBox = () =>
  systemCompose(
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
