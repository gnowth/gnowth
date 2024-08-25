export type PlatformEvent = {
  payload: unknown
  source?: string
  target?: string
  type: string
}

// export type Event = {
//   type: string
//   payload?: unknown
// }

// export interface OptionsEventFn {
//   namespace: string
//   event: Event
// }

// export interface APIEvent {
//   event: (options: OptionsEventFn) => Promise<void>
// }
