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

import type { Group, GroupData } from './groups.types'
import type { GroupFilterParams } from './group-filters'
import type { GroupModel } from './groups.models'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<GroupFilterParams>
}

type Parameters = {
  apiOrigin: string
  apiContext: string
  groupModel: GroupModel
  queryService: QueryService
}

export class GroupService {
  #groupModel: GroupModel
  #parameters: Parameters
  #queryService: QueryService
  #scope = 'groups'

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#groupModel = parameters.groupModel
    this.#queryService = parameters.queryService
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
      groups: (id = '') => `${urlBase}/v1/${this.#scope}/${id}`,
    }
  }

  detail = (parameters: QueryParametersDetail): Promise<QueryDetail<Group>> => {
    return this.#queryService.detail({
      route: this.routes.groups(parameters.queryKey.at(0)?.id),
      signal: parameters.signal,
      transform: (data: GroupData) => this.#groupModel.fromData(data),
    })
  }

  list = (parameters: QueryParametersList<GroupFilterParams>): Promise<QueryList<Group>> => {
    return this.#queryService.list({
      params: parameters.queryKey.at(0)?.params,
      route: this.routes.groups(),
      signal: parameters.signal,
      transform: (data: GroupData) => this.#groupModel.fromData(data),
    })
  }

  save = (group: Group): Promise<QueryDetail<Group>> => {
    return this.#queryService.save(this.#groupModel.toData(group), {
      method: this.#groupModel.getId(group) ? 'post' : 'put',
      route: this.routes.groups(group.id),
      transform: (data: GroupData) => this.#groupModel.fromData(data),
    })
  }
}
