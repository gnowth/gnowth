import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageGroups } from '../components/page-groups'

export const PageGroupsClient: PageClientComponent = () => {
  return <PageGroups />
}
PageGroupsClient.Layout = ApplicationUsersFrame
