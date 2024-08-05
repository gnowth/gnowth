import EventEmitter from 'eventemitter3'

import { PlatformService } from '../core/platform.modules'

export class EventEmitterService extends PlatformService {
  #eventEmitter: EventEmitter = new EventEmitter()

  dispatch(name: string, event: unknown) {
    this.#eventEmitter.emit(name, event)
  }

  subscribe<TEvent>(name: string, callback: (event: TEvent) => void): () => void {
    const listener = (event: TEvent) => {
      try {
        callback(event)
      } catch (error) {}
    }
    this.#eventEmitter.on(name, listener)
    return () => this.#eventEmitter.off(name, listener)
  }
}
