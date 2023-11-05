import type {
  QueryDetail,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
  QueryService,
} from '@gnowth/logic-core'
import { TokenQueryEntity } from '@gnowth/logic-core'

import type { User, UserData } from './users.types'
import type { UserFilterParams } from './user-filters'
import type { UserModel } from './users.models'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<UserFilterParams>
}

type Dependencies = {
  userModel: UserModel
  queryService: QueryService
}

type Parameters = {
  apiOrigin: string
  apiContext: string
  dependencies: Dependencies
}

export class UserService {
  #userModel: UserModel
  #parameters: Parameters
  #scope = 'users'
  #queryService: QueryService

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#userModel = parameters.dependencies.userModel
    this.#queryService = parameters.dependencies.queryService
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

  detail = (parameters: QueryParametersDetail): Promise<QueryDetail<User>> => {
    return this.#queryService.detail({
      route: this.routes.users(parameters.queryKey.at(0)?.id),
      signal: parameters.signal,
      transform: (data: UserData) => this.#userModel.fromData(data),
    })
  }

  list = (parameters: QueryParametersList<UserFilterParams>): Promise<QueryList<User>> => {
    return this.#queryService.list({
      params: parameters.queryKey.at(0)?.params,
      route: this.routes.users(),
      signal: parameters.signal,
      transform: (data: UserData) => this.#userModel.fromData(data),
    })
  }

  // TODO: check how to cancel
  save = (user: User): Promise<QueryDetail<User>> => {
    return this.#queryService.save(this.#userModel.toData(user), {
      method: this.#userModel.getId(user) ? 'post' : 'put',
      route: this.routes.users(user.id),
      transform: (data: UserData) => this.#userModel.fromData(data),
    })
  }
}
