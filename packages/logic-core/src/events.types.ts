import type { ObjectLiteral } from '@gnowth/lib-utils'

export interface Event {
  payload?: ObjectLiteral
  source?: string
  target?: string
  type: string
}
