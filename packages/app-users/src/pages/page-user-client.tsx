import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageUser } from '../components/page-user'

export const PageUserClient: PageClientComponent = () => {
  return <PageUser />
}
PageUserClient.Layout = ApplicationUsersFrame
