import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageReports } from '../components/page-reports'

export const PageReportsClient: PageClientComponent = () => {
  return <PageReports />
}
PageReportsClient.Layout = ApplicationUsersFrame
