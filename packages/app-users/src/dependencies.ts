import { ServiceQuery } from '@gnowth/logic-core'
import { ModelGroup, ServiceGroups, ModelUser, ServiceUsers, ModelUserFilter } from '@gnowth/logic-users'

import { configs } from './configs'

const modelUser = new ModelUser()
const modelGroup = new ModelGroup()
const serviceQuery = new ServiceQuery()

export const dependencies = {
  modelGroup,
  modelUser,
  modelUserFilter: new ModelUserFilter(),
  serviceGroups: new ServiceGroups({ ...configs, dependencies: { modelGroup, serviceQuery } }),
  serviceUsers: new ServiceUsers({ ...configs, dependencies: { modelUser, serviceQuery } }),
}
