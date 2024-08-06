import EventEmitter from 'eventemitter3'
import * as R from 'remeda'

import type { DataModule } from './data.modules'

const DataConstant = {
  eventName: 'platformDataService/data',
} as const

type DataGetter<TData = unknown> = () => TData
type DataSetter<TData = unknown> = (data: TData) => void
type DataUnsubscriber = () => void
type DataSubscriber<TData = unknown> = (setter: DataSetter<TData>) => DataUnsubscriber

class EventEmitterService {
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

type Parameters = { module: DataModule }
export class DataService {
  #data: Map<string, unknown> = new Map()
  #eventEmitterService = new EventEmitterService()
  #getters: Map<string, DataGetter> = new Map()
  #setters: Map<string, DataSetter> = new Map()
  #subscribers: Map<string, DataSubscriber> = new Map()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async construct(parameters: Parameters): Promise<DataService> {
    return new this()
  }

  #getterGet<TData>(name: string): DataGetter<TData> | undefined {
    return this.#getters.get(name) as DataGetter<TData>
  }

  #subscriberGet<TData>(name: string): DataSubscriber<TData> | undefined {
    return this.#subscribers.get(name) as DataSubscriber<TData>
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
}
