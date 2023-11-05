import type { System } from './system.types'

import type { ScaleName, ScaleType } from '../theme/scales'
import type { TokenBase, TokenZIndex } from '../tokens/tokens'
import { systemCompose, systemInterpolate } from './system'

type SystemBottom = { bottom?: string }
type SystemLeft = { left?: string }
type SystemPosition = { position?: string }
type SystemRight = { right?: string }
type SystemTop = { top?: string }
type SystemZIndex<Value> = { zIndex?: Value }

export const systemBottom: () => System<SystemBottom> = () => (props, theme) =>
  systemInterpolate({ key: 'bottom', theme, value: props.bottom })

export const systemLeft: () => System<SystemLeft> = () => (props, theme) =>
  systemInterpolate({ key: 'left', theme, value: props.left })

export const systemPosition: () => System<SystemPosition> = () => (props, theme) =>
  systemInterpolate({ key: 'position', theme, value: props.position })

export const systemRight: () => System<SystemRight> = () => (props, theme) =>
  systemInterpolate({ key: 'right', theme, value: props.right })

export const systemTop: () => System<SystemTop> = () => (props, theme) =>
  systemInterpolate({ key: 'top', theme, value: props.top })

export const systemZIndex: <Token extends TokenBase = TokenZIndex>(
  scale?: ScaleType | ScaleName,
) => System<SystemZIndex<Token>> =
  (scale = 'zindex') =>
  (props, theme) =>
    systemInterpolate({ key: 'zIndex', scale, theme, value: props.zIndex })

export const systemPlace = () =>
  systemCompose(systemBottom(), systemLeft(), systemPosition(), systemRight(), systemTop(), systemZIndex())
