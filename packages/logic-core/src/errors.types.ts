import type { Event } from './events'

export type ErrorType = {
  code: string
  message: string
  method?: string
  source?: string
  sourceNamespace?: string
}

export interface EventError extends Event {
  target: 'serviceError'
  type: 'error'
  payload: { errors: ErrorType[] }
}
