import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

import {
  QueryDetail,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
  QueryService,
  TokenQueryEntity,
} from './queries'
import { UserFilterData, UserFilterParams } from './user-filters'
import { UserModel } from './users.models'
import { User, UserData } from './users.types'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<UserFilterParams>
}

type Parameters = {
  apiContext: string
  apiOrigin: string
}

export class UserService {
  #parameters: Parameters
  #queryService!: QueryService
  #scope = 'users'
  #userModel!: UserModel

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

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.onInit()
  }

  listOptions(
    options: Partial<{ filtersData: UserFilterData } & UseQueryOptions<QueryList<User>>>,
  ): UseQueryOptions<QueryList<User>> {
    return {
      queryFn: (parameters) => this.list(parameters as QueryParametersList<UserFilterParams>),
      queryKey: this.queryKeys.list(options.filtersData),
      ...options,
    }
  }

  mutateOptions(
    options: Partial<UseMutationOptions<QueryDetail<User>, Error, User>>,
  ): UseMutationOptions<QueryDetail<User>, Error, User> {
    return {
      mutationFn: (user: User) => this.save(user),
      ...options,
    }
  }

  onInit() {
    this.#queryService = new QueryService()
    this.#userModel = new UserModel({})
  }

  queryOptions(
    options: Partial<{ id?: string } & UseQueryOptions<QueryDetail<User>>>,
  ): UseQueryOptions<QueryDetail<User>> {
    return {
      enabled: !!options.id,
      queryFn: (parameters) => this.detail(parameters as QueryParametersDetail),
      queryKey: this.queryKeys.detail(options.id!),
      ...options,
    }
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
}
