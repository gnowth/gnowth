import { ModelGroup, ServiceGroups } from './modules/groups'
import { ModelUser, ServiceUsers } from './modules/users'

const modelUser = new ModelUser()
const modelGroup = new ModelGroup()

export const dependencies = {
  modelGroup,
  modelUser,
  serviceGroups: new ServiceGroups({ dependencies: { modelGroup } }),
  serviceUsers: new ServiceUsers({ dependencies: { modelUser } }),
}
