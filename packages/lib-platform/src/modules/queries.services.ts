import { ObjectLiteral } from '@gnowth/lib-utils'
import axios from 'axios'

import { PlatformParameters } from '../core/platform'
import { QueryDetail, QueryList, QueryParametersDetail, QueryParametersList } from './queries.types'

type Parameters<Item, ItemData> = {
  method?: TokenRestMethod
  params?: ObjectLiteral
  signal?: AbortSignal
  transformData?: (item: ItemData) => Item
  url: string
}
type TokenRestMethod = 'get' | 'options' | 'patch' | 'post' | 'put'

export class QueryService {
  #client = axios.create({ withCredentials: true })

  static async construct(_parameters: PlatformParameters): Promise<QueryService> {
    return new this()
  }

  async detail<TItem, TItemData = TItem>(
    parameters: Parameters<TItem, TItemData>,
  ): Promise<QueryDetail<TItem>> {
    const response = await this.#client.request<QueryDetail<TItemData>>(parameters)
    const transform = parameters.transformData ?? ((x) => x as unknown as TItem)
    return { data: transform(response.data.data) }
  }

  getId(parameters: QueryParametersDetail): string {
    const [keyDetail] = parameters.queryKey
    return keyDetail.id
  }

  getParams<TParams>(parameters: QueryParametersList<TParams>): TParams | undefined {
    const [keyList] = parameters.queryKey
    return keyList.params
  }

  async list<TItem, TItemData = TItem>(parameters: Parameters<TItem, TItemData>): Promise<QueryList<TItem>> {
    const response = await this.#client.request<QueryList<TItemData>>(parameters)
    const transform = parameters.transformData ?? ((x) => x as unknown as TItem)
    return {
      data: response.data.data.map(transform),
      meta: {
        count: response.data.meta?.count ?? response.data.data.length,
        pages: response.data.meta?.pages ?? 1,
      },
    }
  }

  async save<TItem, TItemData = TItem>(
    data: TItemData,
    parameters: Parameters<TItem, TItemData>,
  ): Promise<QueryDetail<TItem>> {
    const response = await this.#client.request<QueryDetail<TItemData>>({
      ...parameters,
      data,
      method: parameters.method ?? 'post',
    })
    const transform = parameters.transformData ?? ((x) => x as unknown as TItem)
    return { data: transform(response.data.data) }
  }
}
