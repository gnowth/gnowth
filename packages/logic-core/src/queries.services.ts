import type { ObjectLiteral } from '@gnowth/lib-utils'
import axios, { AxiosResponse } from 'axios'

import type { QueryDetail, QueryList } from './queries.types'

type TokenRestMethod = 'get' | 'options' | 'put' | 'post'
type Parameters<Item, ItemData> = {
  params?: ObjectLiteral
  method?: TokenRestMethod
  route: string
  signal?: AbortSignal
  transform?: (item: ItemData) => Item
}

export class ServiceQuery {
  #axios = axios.create({ withCredentials: true })

  // TODO: add override if transform is not provided
  async detail<Item, ItemData>(parameters: Parameters<Item, ItemData>): Promise<QueryDetail<Item>> {
    const response = await this.#axios.get<QueryDetail<ItemData>, AxiosResponse<QueryDetail<ItemData>>>(
      parameters.route,
      {
        params: parameters.params,
        // TODO: add signal
        // signal: parameters.signal,
      },
    )
    const transform = parameters.transform ?? ((x) => x as unknown as Item)

    return {
      data: transform(response.data.data),
    }
  }

  async list<Item, ItemData>(parameters: Parameters<Item, ItemData>): Promise<QueryList<Item>> {
    const response = await this.#axios.get<QueryList<ItemData>, AxiosResponse<QueryList<ItemData>>>(
      parameters.route,
      {
        params: parameters.params,
        // signal: parameters.signal,
      },
    )
    const transform = parameters.transform ?? ((x) => x as unknown as Item)

    return {
      data: response.data.data.map(transform),
      meta: response.data.meta,
    }
  }

  async save<Item, ItemData>(
    item: ItemData,
    parameters: Parameters<Item, ItemData>,
  ): Promise<QueryDetail<Item>> {
    // TODO: call proper method on axios
    const response = await this.#axios.post<QueryDetail<ItemData>, AxiosResponse<QueryDetail<ItemData>>>(
      parameters.route,
      item,
      {
        params: parameters.params,
        // signal: parameters.signal,
      },
    )
    const transform = parameters.transform ?? ((x) => x as unknown as Item)

    return {
      data: transform(response.data.data),
    }
  }
}
