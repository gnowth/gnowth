import {
  PlatformDependency,
  PlatformParameters,
  QueryDetail,
  QueryFnOptionsDetail,
  QueryFnOptionsList,
  QueryFnOptionsSave,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
  QueryService,
} from '@gnowth/lib-react'

import { configs } from '../configs'
import { AppUserDependency } from './app-users'
import { UserFilterParams } from './user-filters'
import { UserModel } from './users.models'
import { User } from './users.types'

type Parameters = { queryService: QueryService; userModel: UserModel }
export class UserService {
  #constant = { apiContext: configs.apiContext, apiOrigin: configs.apiOrigin, scope: 'users' }
  #queryService: QueryService
  #userModel: UserModel

  private detail = (parameters: QueryParametersDetail): Promise<QueryDetail<User>> => {
    const id = this.#queryService.getId(parameters)
    return this.#queryService.detail({
      signal: parameters.signal,
      transformData: this.#userModel.fromData,
      url: this.routes.users(id),
    })
  }

  private list = (parameters: QueryParametersList<UserFilterParams>): Promise<QueryList<User>> => {
    const params = this.#queryService.getParams(parameters)
    return this.#queryService.list({
      params,
      signal: parameters.signal,
      transformData: this.#userModel.fromData,
      url: this.routes.users(),
    })
  }

  private save = (user: User): Promise<QueryDetail<User>> => {
    return this.#queryService.save(this.#userModel.toData(user), {
      method: this.#userModel.getId(user) ? 'post' : 'put',
      transformData: this.#userModel.fromData,
      url: this.routes.users(user.id),
    })
  }

  detailOptions: QueryFnOptionsDetail<User> = (options) => {
    return {
      queryFn: options.id ? this.detail : () => Promise.resolve({ data: this.#userModel.fromData({}) }),
      queryKey: this.queryKeys.detail(options.id),
      ...options,
    }
  }

  listOptions: QueryFnOptionsList<User, UserFilterParams> = (options) => {
    return {
      queryFn: this.list,
      queryKey: this.queryKeys.list(options?.params),
      ...options,
    }
  }

  saveOptions: QueryFnOptionsSave<User> = (options) => {
    return {
      mutationFn: this.save,
      ...options,
    }
  }

  constructor(parameters: Parameters) {
    this.#queryService = parameters.queryService
    this.#userModel = parameters.userModel
  }

  static async construct(parameters: PlatformParameters): Promise<UserService> {
    const queryService = await parameters.platform.providerGet<QueryService>({
      name: PlatformDependency.queryService,
    })
    const userModel = await parameters.platform.providerGet<UserModel>({
      name: AppUserDependency.userModel,
    })
    return new this({ queryService, userModel })
  }

  get queryKeys() {
    return {
      detail: (id?: string): QueryKeyDetail => [
        { entity: 'detail', id: id ?? 'new', scope: this.#constant.scope },
      ],
      list: <TParams>(params?: TParams): QueryKeyList<TParams> => [
        { entity: 'list', params, scope: this.#constant.scope },
      ],
    }
  }

  get routes() {
    const urlBase = `${this.#constant.apiOrigin}${this.#constant.apiContext}`
    return {
      users: (id = ''): string => `${urlBase}/v1/${this.#constant.scope}/${id}`,
    }
  }
}
