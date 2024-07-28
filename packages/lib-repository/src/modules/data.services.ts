import * as R from 'remeda'

import { RepositoryService } from './repositories.modules'
import { EventEmitterService } from './event-emitters.exports'
import { TokenService } from './repositories.tokens'

const DataConstant = {
  eventName: 'repositoryDataService/data',
} as const

export class DataService extends RepositoryService {
  #data: Map<string, unknown> = new Map()
  #eventEmitterService!: EventEmitterService

  async onInit(): Promise<void> {
    this.#eventEmitterService = await this.repository.serviceGet({ name: TokenService.eventEmitter })
  }

  get<TData>(name: string): TData {
    return this.#data.get(name) as TData
  }

  set<TData>(name: string, data: TData | ((data: TData) => TData)): void {
    const newData = R.isFunction(data) ? data(this.get(name)) : data
    this.#data.set(name, newData)
    this.#eventEmitterService.dispatch(`${DataConstant.eventName}/${name}`, newData)
  }

  subscribe<TData>(name: string, callback: (data: TData) => void): () => void {
    return this.#eventEmitterService.subscribe(`${DataConstant.eventName}/${name}`, callback)
  }
}
