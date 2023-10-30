import type { AppSetup } from '@gnowth/lib-application'
import { ServiceQuery } from '@gnowth/logic-core'

import { ModelGroupFilter } from './modules/group-filters'
import { ModelGroup, ServiceGroups } from './modules/groups'
import { ModelUserFilter } from './modules/user-filters'
import { ModelUser, ServiceUsers } from './modules/users'

type Configs = {
  apiContext: string
  apiOrigin: string
}
type ConfigurationDependencies = {
  dependencies: {
    modelGroup: ModelGroup
    modelGroupFilter: ModelGroupFilter
    modelUser: ModelUser
    modelUserFilter: ModelUserFilter
    serviceGroups: ServiceGroups
    serviceUsers: ServiceUsers
  }
}
export const setupDependencies: AppSetup<ConfigurationDependencies, Configs> = (configs: Configs) => {
  const modelGroup = new ModelGroup({})
  const modelUser = new ModelUser({})
  const serviceQuery = new ServiceQuery()

  return {
    dependencies: {
      modelGroup,
      modelGroupFilter: new ModelGroupFilter({}),
      modelUser,
      modelUserFilter: new ModelUserFilter({}),
      serviceGroups: new ServiceGroups({ ...configs, dependencies: { modelGroup, serviceQuery } }),
      serviceUsers: new ServiceUsers({ ...configs, dependencies: { modelUser, serviceQuery } }),
    },
  }
}
