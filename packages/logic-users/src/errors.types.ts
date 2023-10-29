import type { Event } from './events'

export type ErrorType = {
  code: string
  messages?: Record<string, string>
  method?: string
  source?: string
  sourceNamespace?: string
  values?: Record<string, string>
}

export interface EventError extends Event {
  target: 'serviceError'
  type: 'error'
  payload: { errors: ErrorType[] }
}
