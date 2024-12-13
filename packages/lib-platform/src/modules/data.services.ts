import EventEmitter from 'eventemitter3'
import * as R from 'remeda'

import { PlatformParameters } from '../core/platform'

const DataConstant = {
  eventName: 'platformDataService/data',
} as const

type DataGetter<TData = unknown> = () => TData
type DataSetter<TData = unknown> = (data: TData) => void
type DataSubscriber<TData = unknown> = (setter: DataSetter<TData>) => DataUnsubscriber
type DataUnsubscriber = () => void

class EventEmitterService {
  #eventEmitter: EventEmitter = new EventEmitter()

  dispatch(name: string, event: unknown) {
    this.#eventEmitter.emit(name, event)
  }

  subscribe<TEvent>(name: string, callback: (event: TEvent) => void): () => void {
    const listener = (event: TEvent) => {
      try {
        callback(event)
        // eslint-disable-next-line sonarjs/no-ignored-exceptions
      } catch (_error) {
        // TODO: publish to stream
      }
    }
    this.#eventEmitter.on(name, listener)
    return () => this.#eventEmitter.off(name, listener)
  }
}

export class DataService {
  #data = new Map<string, unknown>()
  #eventEmitterService = new EventEmitterService()
  #getters = new Map<string, DataGetter>()
  #setters = new Map<string, DataSetter>()
  #subscribers = new Map<string, DataSubscriber>()

  static async construct(_parameters: PlatformParameters): Promise<DataService> {
    return new this()
  }

  get<TData>(name: string): TData {
    return this.#data.get(name) as TData
  }

  makeGet<TData>(name: string): DataGetter<TData> {
    const getter = this.#getterGet<TData>(name) ?? (() => this.get(name))
    this.#getters.set(name, getter)
    return getter
  }

  makeSet<TData>(name: string): DataSetter<TData> {
    const setter = this.#setters.get(name) ?? ((data) => this.set(name, data))
    this.#setters.set(name, setter)
    return setter
  }

  makeSubscribe<TData>(name: string): DataSubscriber<TData> {
    const subscriber = this.#subscriberGet<TData>(name) ?? ((setter) => this.subscribe(name, setter))
    this.#subscribers.set(name, subscriber)
    return subscriber
  }

  set<TData>(name: string, data: ((data: TData) => TData) | TData): void {
    const dataPrevious = this.get<TData>(name)
    const dataNext = R.isFunction(data) ? data(dataPrevious) : data
    this.#data.set(name, dataNext)
    if (dataPrevious !== dataNext) {
      this.#eventEmitterService.dispatch(`${DataConstant.eventName}/${name}`, dataNext)
    }
  }

  // TODO: allow support for selectors, like zustand/jotai? can custom equality check
  subscribe<TData>(name: string, setter: DataSetter<TData>): DataUnsubscriber {
    return this.#eventEmitterService.subscribe(`${DataConstant.eventName}/${name}`, setter)
  }

  #getterGet<TData>(name: string): DataGetter<TData> | undefined {
    return this.#getters.get(name) as DataGetter<TData>
  }

  #subscriberGet<TData>(name: string): DataSubscriber<TData> | undefined {
    return this.#subscribers.get(name) as DataSubscriber<TData>
  }
}
