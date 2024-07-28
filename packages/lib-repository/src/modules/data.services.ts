import * as R from 'remeda'

import { EventEmitterService } from './event-emitters.exports'
import { RepositoryService } from './repositories.modules'
import { TokenService } from './repositories.tokens'

const DataConstant = {
  eventName: 'repositoryDataService/data',
} as const

export class DataService extends RepositoryService {
  #data: Map<string, unknown> = new Map()
  #eventEmitterService!: EventEmitterService

  get<TData>(name: string): TData {
    return this.#data.get(name) as TData
  }

  async onInit(): Promise<void> {
    this.#eventEmitterService = await this.repository.serviceGet({ name: TokenService.eventEmitter })
  }

  set<TData>(name: string, data: ((data: TData) => TData) | TData): void {
    const newData = R.isFunction(data) ? data(this.get(name)) : data
    this.#data.set(name, newData)
    this.#eventEmitterService.dispatch(`${DataConstant.eventName}/${name}`, newData)
  }

  subscribe<TData>(name: string, callback: (data: TData) => void): () => void {
    return this.#eventEmitterService.subscribe(`${DataConstant.eventName}/${name}`, callback)
  }
}
