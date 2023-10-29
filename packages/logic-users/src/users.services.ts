import type {
  QueryDetail,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
  ServiceQuery,
} from '@gnowth/logic-core'
import { TokenQueryEntity } from '@gnowth/logic-core'

import type { User, UserData } from './users.types'
import type { UserFilterParams } from './user-filters'
import type { ModelUser } from './users.models'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<UserFilterParams>
}

type Dependencies = {
  modelUser: ModelUser
  serviceQuery: ServiceQuery
}

type Parameters = {
  apiOrigin: string
  apiContext: string
  dependencies: Dependencies
}

export class ServiceUsers {
  #modelUser: ModelUser
  #parameters: Parameters
  #scope = 'users'
  #serviceQuery: ServiceQuery

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#modelUser = parameters.dependencies.modelUser
    this.#serviceQuery = parameters.dependencies.serviceQuery
  }

  get queryKeys(): QueryKeys {
    return {
      detail: (id) => [{ entity: TokenQueryEntity.detail, id, scope: this.#scope }],
      list: (params) => [{ entity: TokenQueryEntity.list, params, scope: this.#scope }],
    }
  }

  get routes() {
    const urlBase = `${this.#parameters.apiOrigin}${this.#parameters.apiContext}`

    return {
      users: (id = '') => `${urlBase}/v1/${this.#scope}/${id}`,
    }
  }

  detail(parameters: QueryParametersDetail): Promise<QueryDetail<User>> {
    return this.#serviceQuery.detail({
      route: this.routes.users(parameters.queryKey.at(0)?.id),
      signal: parameters.signal,
      transform: (data: UserData) => this.#modelUser.fromData(data),
    })
  }

  list(parameters: QueryParametersList<UserFilterParams>): Promise<QueryList<User>> {
    return this.#serviceQuery.list({
      params: parameters.queryKey.at(0)?.params,
      route: this.routes.users(),
      signal: parameters.signal,
      transform: (data: UserData) => this.#modelUser.fromData(data),
    })
  }

  save(user: User, parameters: QueryParametersDetail): Promise<QueryDetail<User>> {
    return this.#serviceQuery.save(this.#modelUser.toData(user), {
      method: this.#modelUser.getId(user) ? 'post' : 'put',
      route: this.routes.users(user.id),
      signal: parameters.signal,
      transform: (data: UserData) => this.#modelUser.fromData(data),
    })
  }
}
