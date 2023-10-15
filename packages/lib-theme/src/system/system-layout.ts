import type { System } from './system.types'

import type { ThemeScale } from '../deprecated.types'
import { systemCompose, systemInterpolate } from './system'

type SystemDisplay = { display?: string }
type SystemHeight = { height?: string }
type SystemMaxHeight = { maxHeight?: string }
type SystemMaxSize = { maxSize?: string }
type SystemMaxWidth = { maxWidth?: string }
type SystemMinHeight = { minHeight?: string }
type SystemMinSize = { minSize?: string }
type SystemMinWidth = { minWidth?: string }
type SystemOverflow = { overflow?: string }
type SystemOverflowX = { overflowX?: string }
type SystemOverflowY = { overflowY?: string }
type SystemSize = { size?: string | number }
type SystemWidth = { width?: string | number }

export const systemDisplay: () => System<SystemDisplay> = () => (props, theme) =>
  systemInterpolate({ key: 'display', theme, value: props.display })

export const systemHeight: () => System<SystemHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'height', theme, value: props.height })

export const systemMaxHeight: () => System<SystemMaxHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'maxHeight', theme, value: props.maxHeight })

export const systemMaxSize: () => System<SystemMaxSize> = () => (props, theme) =>
  systemInterpolate({ key: ['maxHeight', 'maxWidth'], theme, value: props.maxSize })

export const systemMaxWidth: () => System<SystemMaxWidth> = () => (props, theme) =>
  systemInterpolate({ key: 'maxWidth', theme, value: props.maxWidth })

export const systemMinHeight: () => System<SystemMinHeight> = () => (props, theme) =>
  systemInterpolate({ key: 'minHeight', theme, value: props.minHeight })

export const systemMinSize: () => System<SystemMinSize> = () => (props, theme) =>
  systemInterpolate({ key: ['minHeight', 'minWidth'], theme, value: props.minSize })

export const systemMinWidth: () => System<SystemMinWidth> = () => (props, theme) =>
  systemInterpolate({ key: 'minWidth', theme, value: props.minWidth })

export const systemOverflow: () => System<SystemOverflow> = () => (props, theme) =>
  systemInterpolate({ key: 'overflow', theme, value: props.overflow })

export const systemOverflowX: () => System<SystemOverflowX> = () => (props, theme) =>
  systemInterpolate({ key: 'overflowX', theme, value: props.overflowX })

export const systemOverflowY: () => System<SystemOverflowY> = () => (props, theme) =>
  systemInterpolate({ key: 'overflowY', theme, value: props.overflowY })

// TODO set the proper scale default when creating width scale
export const systemSize: (scale?: ThemeScale | string) => System<SystemSize> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: ['height', 'width'], scale, theme, value: props.size })

export const systemWidth: (scale?: ThemeScale | string) => System<SystemWidth> =
  (scale = 'length') =>
  (props, theme) =>
    systemInterpolate({ key: 'width', scale, theme, value: props.width })

export const systemLayout = () =>
  systemCompose(
    systemDisplay(),
    systemSize(), // Note: not in alphabetical order because it can potentially conflict with height and width
    systemMaxSize(),
    systemMinSize(),
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
