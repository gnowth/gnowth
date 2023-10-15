import type { SystemInterpolate, System } from './system.types'
import { systemCompose, systemInterpolate } from './system'

type SystemCursor = { cursor?: SystemInterpolate<string> }
type SystemPointerEvents = { pointerEvents?: SystemInterpolate<string> }

export const systemCursor: () => System<SystemCursor> = () => (props, theme) =>
  systemInterpolate({ key: 'cursor', theme, value: props.cursor })

export const systemPointerEvents: () => System<SystemPointerEvents> = () => (props, theme) =>
  systemInterpolate({ key: 'pointerEvents', theme, value: props.pointerEvents })

export const systemPointer = () => systemCompose(systemCursor(), systemPointerEvents())
