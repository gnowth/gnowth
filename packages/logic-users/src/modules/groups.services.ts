import {
  PlatformConstant,
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
} from '@gnowth/lib-platform'

import { LogicUserConstant } from '../module.constants'
import { GroupFilterParams } from '../modules-deprecated/group-filters'
import { GroupModel } from './groups.models'
import { Group } from './groups.types'

type Parameters = { groupModel: GroupModel; queryService: QueryService }
export class GroupService {
  #constant = { apiContext: 'users', apiOrigin: 'https://api.gnowth.com', scope: 'groups' }
  #groupModel: GroupModel
  #queryService: QueryService

  private detail = (parameters: QueryParametersDetail): Promise<QueryDetail<Group>> => {
    const id = this.#queryService.getId(parameters)
    return this.#queryService.detail({
      signal: parameters.signal,
      transformData: this.#groupModel.fromData,
      url: this.routes.groups(id),
    })
  }

  private list = (parameters: QueryParametersList<GroupFilterParams>): Promise<QueryList<Group>> => {
    const params = this.#queryService.getParams(parameters)
    return this.#queryService.list({
      params,
      signal: parameters.signal,
      transformData: this.#groupModel.fromData,
      url: this.routes.groups(),
    })
  }

  private save = (group: Group): Promise<QueryDetail<Group>> => {
    return this.#queryService.save(this.#groupModel.toData(group), {
      method: this.#groupModel.getId(group) ? 'post' : 'put',
      transformData: this.#groupModel.fromData,
      url: this.routes.groups(group.id),
    })
  }

  detailOptions: QueryFnOptionsDetail<Group> = (options) => {
    return {
      queryFn: this.detail,
      queryKey: this.queryKeys.detail(options.id),
      ...options,
    }
  }

  listOptions: QueryFnOptionsList<Group, GroupFilterParams> = (options) => {
    return {
      queryFn: this.list,
      queryKey: this.queryKeys.list(options?.params),
      ...options,
    }
  }

  saveOptions: QueryFnOptionsSave<Group> = (options) => {
    return {
      mutationFn: this.save,
      ...options,
    }
  }

  constructor(parameters: Parameters) {
    this.#queryService = parameters.queryService
    this.#groupModel = parameters.groupModel
  }

  static async construct(parameters: PlatformParameters): Promise<GroupService> {
    const queryService = await parameters.platform.providerGet<QueryService>({
      name: PlatformConstant.queryService,
      type: 'provider',
    })
    const groupModel = await parameters.platform.providerGet<GroupModel>({
      name: LogicUserConstant.groupModel,
      type: 'provider',
    })
    return new this({ groupModel, queryService })
  }

  get queryKeys() {
    return {
      detail: (id: string): QueryKeyDetail => [{ entity: 'detail', id, scope: this.#constant.scope }],
      list: <TParams>(params?: TParams): QueryKeyList<TParams> => [
        { entity: 'list', params, scope: this.#constant.scope },
      ],
    }
  }

  get routes() {
    const urlBase = `${this.#constant.apiOrigin}${this.#constant.apiContext}`
    return {
      groups: (id: string = ''): string => `${urlBase}/v1/${this.#constant.scope}/${id}`,
    }
  }
}
