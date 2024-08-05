import * as R from 'remeda'

import type { Repository } from '../core/repositories.main'

import { RepositoryService } from '../core/repositories.modules'
import { TokenService } from '../core/repositories.tokens'
import { EventEmitterService } from './event-emitters'

const DataConstant = {
  eventName: 'repositoryDataService/data',
} as const

type DataGetter<TData = unknown> = () => TData
type DataSetter<TData = unknown> = (data: TData) => void
type DataUnsubscriber = () => void
type DataSubscriber<TData = unknown> = (setter: DataSetter<TData>) => DataUnsubscriber

type Dependencies = {
  eventEmitterService: EventEmitterService
}

type ConstructParameters = {
  repository: Repository
}

type Parameters = {
  dependencies: Dependencies
  repository: Repository
}

export class DataService extends RepositoryService {
  #data: Map<string, unknown> = new Map()
  #dependencies: Dependencies
  #getters: Map<string, DataGetter> = new Map()
  #setters: Map<string, DataSetter> = new Map()
  #subscribers: Map<string, DataSubscriber> = new Map()

  constructor(parameters: Parameters) {
    super(parameters)
    this.#dependencies = parameters.dependencies
  }

  static async construct(parameters: ConstructParameters): Promise<DataService> {
    const eventEmitterService = await parameters.repository.serviceGet<EventEmitterService>({
      name: TokenService.eventEmitter,
    })
    return new this({ dependencies: { eventEmitterService }, repository: parameters.repository })
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
      this.#dependencies.eventEmitterService.dispatch(`${DataConstant.eventName}/${name}`, dataNext)
    }
  }

  // TODO: allow support for selectors, like zustand/jotai? can custom equality check
  subscribe<TData>(name: string, setter: DataSetter<TData>): DataUnsubscriber {
    return this.#dependencies.eventEmitterService.subscribe(`${DataConstant.eventName}/${name}`, setter)
  }
}
