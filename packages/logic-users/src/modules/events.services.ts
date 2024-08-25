import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { Event } from './events.types'

// TODO: Get type from error module
type ErrorData = {
  code: string
  message: string
  method?: string
  source?: string
  sourceNamespace?: string
}
// TODO: get type form log module
type Log = {
  code: string
  errors?: ErrorData[]
  logLevel?: 'bug' | 'debug' | 'error' | 'info' | 'none' | 'warn'
  message: string
  method: string
  payload?: ObjectLiteral
  source?: string
  sourceNamespace?: string
}

export class EventService {
  dispatch(event: Event): void {
    console.log(event)
  }

  log(log: Log): void {
    console.log(log)
  }

  logIfError(log: Log): void {
    console.log(log)
  }
}

// import type { APIEvent, Event } from './events.types'

// interface OptionsEvent {
//   namespace: string
//   apis?: APIEvent[]
// }

// // use for audit trail, analytics, communication between mfes
// export class EventService {
//   private apis: APIEvent[]
//   private options: OptionsEvent

//   constructor(options: OptionsEvent) {
//     this.apis = options.apis ?? []
//     this.options = options
//   }

//   // must allow to include/exclude event to certain apis
//   async event(event: Event): Promise<void> {
//     const promises = this.apis.map((api) => api.event({ event, namespace: this.options.namespace }))

//     await Promise.allSettled(promises)
//   }
// }
