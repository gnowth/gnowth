import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageUsers } from '../components/page-users'

export const PageUsersClient: PageClientComponent = () => {
  return <PageUsers />
}
PageUsersClient.Layout = ApplicationUsersFrame
