import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageGroup } from '../components/page-group'

export const PageGroupClient: PageClientComponent = () => {
  return <PageGroup />
}
PageGroupClient.Layout = ApplicationUsersFrame
