export type Event = {
  type: string
  payload?: unknown
}

export interface OptionsEventFn {
  namespace: string
  event: Event
}

export interface APIEvent {
  event: (options: OptionsEventFn) => Promise<void>
}
