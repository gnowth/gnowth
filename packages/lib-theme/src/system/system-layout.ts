import type { ScaleName, ScaleType } from '../theme/scales'
import type { TokenBase, TokenLength } from '../tokens/tokens'
import type { System } from './system.types'

import { systemCompose, systemInterpolate } from './system'

type SystemDisplay = { display?: string }
type SystemHeight = { height?: string }
type SystemMaxHeight = { maxHeight?: string }
type SystemMaxWidth = { maxWidth?: string }
type SystemMinHeight = { minHeight?: string }
type SystemMinWidth = { minWidth?: string }
type SystemOverflow = { overflow?: string }
type SystemOverflowX = { overflowX?: string }
type SystemOverflowY = { overflowY?: string }
type SystemWidth<Value> = { width?: Value }

export const systemDisplay: () => System<SystemDisplay> = () => (props, theme) =>
  systemInterpolate({ key: 'display', theme, value: props.display })

export const systemHeight: () => System<SystemHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'height', theme, value: props.height })

export const systemMaxHeight: () => System<SystemMaxHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'maxHeight', theme, value: props.maxHeight })

export const systemMaxWidth: () => System<SystemMaxWidth> = () => (props, theme) =>
  systemInterpolate({ key: 'maxWidth', theme, value: props.maxWidth })

export const systemMinHeight: () => System<SystemMinHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'minHeight', theme, value: props.minHeight })

export const systemMinWidth: () => System<SystemMinWidth> = () => (props, theme) =>
  systemInterpolate({ key: 'minWidth', theme, value: props.minWidth })

export const systemOverflow: () => System<SystemOverflow> = () => (props, theme) =>
  systemInterpolate({ key: 'overflow', theme, value: props.overflow })

export const systemOverflowX: () => System<SystemOverflowX> = () => (props, theme) =>
  systemInterpolate({ key: 'overflowX', theme, value: props.overflowX })

export const systemOverflowY: () => System<SystemOverflowY> = () => (props, theme) =>
  systemInterpolate({ key: 'overflowY', theme, value: props.overflowY })

export const systemWidth: <Token extends TokenBase = TokenLength>(
  scale?: ScaleName | ScaleType,
) => System<SystemWidth<Token | string>> =
  (scale = 'length') =>
  (props, theme) =>
    systemInterpolate({ key: 'width', scale, theme, value: props.width })

export const systemLayout = () =>
  systemCompose(
    systemDisplay(),
    systemHeight(),
    systemMaxHeight(),
    systemMaxWidth(),
    systemMinHeight(),
    systemMinWidth(),
    systemOverflow(),
    systemOverflowX(),
    systemOverflowY(),
    systemWidth(),
  )
