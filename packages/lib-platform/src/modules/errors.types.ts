import { PlatformEvent } from './events'

// TODO: use ErrorCustom within App and only convert when sending to server
export type ErrorData = {
  code: string
  message: string
  method?: string
  source?: string
  sourceNamespace?: string
}

export interface EventError extends PlatformEvent {
  payload: { errors: ErrorData[] }
  target: 'serviceError'
  type: 'error'
}
