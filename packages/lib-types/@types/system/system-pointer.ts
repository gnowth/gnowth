import type { Interpolate } from '../util'

export interface SystemCursor {
  cursor?: Interpolate<string>
}

export interface SystemPointerEvents {
  pointerEvents?: Interpolate<string>
}

export interface SystemPointer extends SystemCursor, SystemPointerEvents {}
