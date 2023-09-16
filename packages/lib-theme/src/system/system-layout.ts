import type { CSSObject } from '@emotion/css'
import type {
  SystemDisplay,
  SystemHeight,
  SystemLayout,
  SystemMaxHeight,
  SystemMaxSize,
  SystemMaxWidth,
  SystemMinHeight,
  SystemMinSize,
  SystemMinWidth,
  SystemOverflow,
  SystemOverflowX,
  SystemOverflowY,
  SystemSize,
  SystemWidth,
  Theme,
} from '@gnowth/lib-types'

import type { ThemeScale } from '../types'
import { systemCompose, systemInterpolate } from './system'

export function systemDisplay() {
  return (props: SystemDisplay, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'display', theme, value: props.display })
}

export function systemHeight() {
  return (props: SystemHeight, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'height', theme, value: props.height })
}

export function systemMaxHeight() {
  return (props: SystemMaxHeight, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'maxHeight', theme, value: props.maxHeight })
}

export function systemMaxSize() {
  return (props: SystemMaxSize, theme: Theme): CSSObject =>
    systemInterpolate({ key: ['maxHeight', 'maxWidth'], theme, value: props.maxSize })
}

export function systemMaxWidth() {
  return (props: SystemMaxWidth, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'maxWidth', theme, value: props.maxWidth })
}

export function systemMinHeight() {
  return (props: SystemMinHeight, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'minHeight', theme, value: props.minHeight })
}

export function systemMinSize() {
  return (props: SystemMinSize, theme: Theme): CSSObject =>
    systemInterpolate({ key: ['minHeight', 'minWidth'], theme, value: props.minSize })
}

export function systemMinWidth() {
  return (props: SystemMinWidth, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'minWidth', theme, value: props.minWidth })
}

export function systemOverflow() {
  return (props: SystemOverflow, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'overflow', theme, value: props.overflow })
}

export function systemOverflowX() {
  return (props: SystemOverflowX, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'overflowX', theme, value: props.overflowX })
}

export function systemOverflowY() {
  return (props: SystemOverflowY, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'overflowY', theme, value: props.overflowY })
}

// TODO set the proper scale default when creating width scale
export function systemSize(scale: ThemeScale | string = 'space') {
  return (props: SystemSize, theme: Theme): CSSObject =>
    systemInterpolate({ key: ['height', 'width'], scale, theme, value: props.size })
}

export function systemWidth(scale = 'length') {
  return (props: SystemWidth, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'width', scale, theme, value: props.width })
}

export function systemLayout(): (props: SystemLayout, theme: Theme) => CSSObject {
  return systemCompose<SystemLayout>(
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
}
