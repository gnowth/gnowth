import type { Group, GroupData } from './groups.types'
import type { GroupFilterParams } from './group-filters'
import type { ModelGroup } from './groups.models'
import type {
  QueryDetail,
  QueryKeyDetail,
  QueryKeyList,
  QueryList,
  QueryParametersDetail,
  QueryParametersList,
  ServiceQuery,
} from './queries'
import { TokenQueryEntity } from './queries'

type QueryKeys = {
  detail: QueryKeyDetail
  list: QueryKeyList<GroupFilterParams>
}

type Dependencies = {
  modelGroup: ModelGroup
  serviceQuery: ServiceQuery
}

type Parameters = {
  apiOrigin: string
  apiContext: string
  dependencies: Dependencies
}

export class ServiceGroups {
  #modelGroup: ModelGroup
  #parameters: Parameters
  #scope = 'groups'
  #serviceQuery: ServiceQuery

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#modelGroup = parameters.dependencies.modelGroup
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
      groups: (id = '') => `${urlBase}/v1/${this.#scope}/${id}`,
    }
  }

  detail(parameters: QueryParametersDetail): Promise<QueryDetail<Group>> {
    return this.#serviceQuery.detail({
      route: this.routes.groups(parameters.queryKey.at(0)?.id),
      signal: parameters.signal,
      transform: (data: GroupData) => this.#modelGroup.fromData(data),
    })
  }

  list(parameters: QueryParametersList<GroupFilterParams>): Promise<QueryList<Group>> {
    return this.#serviceQuery.list({
      params: parameters.queryKey.at(0)?.params,
      route: this.routes.groups(),
      signal: parameters.signal,
      transform: (data: GroupData) => this.#modelGroup.fromData(data),
    })
  }

  save(group: Group, parameters: QueryParametersDetail): Promise<QueryDetail<Group>> {
    return this.#serviceQuery.save(this.#modelGroup.toData(group), {
      method: this.#modelGroup.getId(group) ? 'post' : 'put',
      route: this.routes.groups(group.id),
      signal: parameters.signal,
      transform: (data: GroupData) => this.#modelGroup.fromData(data),
    })
  }
}
