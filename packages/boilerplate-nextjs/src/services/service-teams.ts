import type { QueryFunctionContext } from 'react-query'
import axios from 'axios'

import type { Detail, List } from '../models/model-axios'
import type { Team } from '../models/model-team'
import type { TeamFilterSerialized } from '../models/model-team-filter'
import type { ServiceQueryKeyDetail, ServiceQueryKeyList } from '../types'
import ModelAxios from '../models/model-axios'
import ModelTeam from '../models/model-team'
import configs from '../configs'

class ServiceTeams {
  static routes = {
    teams: (id = '') => `/${id}`,
  }

  axios = axios.create({
    baseURL: `${configs.apiOrigin}${configs.apiContextDefault}/teams`,
    withCredentials: true,
  })

  queryKeys = {
    detail: (id: string) => [{ id, entity: 'detail', scope: 'members' }],
    list: (filters: TeamFilterSerialized) => [{ filters, entity: 'list', scope: 'members' }],
  }

  detail = (configs: QueryFunctionContext<ServiceQueryKeyDetail[]>) => {
    return this.axios
      .get<Detail<Team>>(ServiceTeams.routes.teams(configs.queryKey[0].id), { signal: configs.signal })
      .then(ModelAxios.toData)
      .then(ModelTeam.deserialize)
  }

  list = (configs: QueryFunctionContext<ServiceQueryKeyList<TeamFilterSerialized>[]>) => {
    return this.axios
      .get<List<Team>>(ServiceTeams.routes.teams(), {
        params: configs.queryKey[0].filters,
        signal: configs.signal,
      })
      .then(ModelAxios.toDataList)
      .then(ModelAxios.listDeserializer(ModelTeam.deserialize))
  }

  save = (team: Team) => {
    return this.axios.post(ServiceTeams.routes.teams(team.id), ModelTeam.serialize(team))
  }
}

export default new ServiceTeams()
