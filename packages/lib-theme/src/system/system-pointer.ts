import type { CSSObject } from '@emotion/css'
import type { SystemCursor, SystemPointer, SystemPointerEvents, Theme } from '@gnowth/lib-types'

import { systemCompose, systemInterpolate } from './system'

export function systemCursor() {
  return (props: SystemCursor, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'cursor', theme, value: props.cursor })
}

export function systemPointerEvents() {
  return (props: SystemPointerEvents, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'pointerEvents', theme, value: props.pointerEvents })
}

export function systemPointer(): (props: SystemPointer, theme: Theme) => CSSObject {
  return systemCompose<SystemPointer>(systemCursor(), systemPointerEvents())
}
