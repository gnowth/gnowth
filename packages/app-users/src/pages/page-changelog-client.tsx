import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageChangelog } from '../components/page-changelog'

export const PageChangelogClient: PageClientComponent = () => {
  return <PageChangelog />
}
PageChangelogClient.Layout = ApplicationUsersFrame
