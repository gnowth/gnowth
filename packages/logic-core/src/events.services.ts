import type { Log } from './logs'
import type { Event } from './events.types'

export class ServiceEvent {
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
