import type {
  QueryDetail,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
} from '@gnowth/logic-core'
import { QueryService, TokenQueryEntity } from '@gnowth/logic-core'

import type { User, UserData } from './users.types'
import type { UserFilterParams } from './user-filters'
import { UserModel } from './users.models'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<UserFilterParams>
}

type Parameters = {
  apiOrigin: string
  apiContext: string
}

export class UserService {
  #parameters: Parameters
  #queryService!: QueryService
  #scope = 'users'
  #userModel!: UserModel

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

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.onInit()
  }

  onInit() {
    this.#queryService = new QueryService()
    this.#userModel = new UserModel({})
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
