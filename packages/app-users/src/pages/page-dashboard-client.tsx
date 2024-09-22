import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationUsersFrame } from '../components/application-users.frame'
import { PageDashboard } from '../components/page-dashboard'

export const PageDashboardClient: PageClientComponent = () => {
  return <PageDashboard />
}
PageDashboardClient.Layout = ApplicationUsersFrame
