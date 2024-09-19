import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageDashboard } from '../components/page-dashboard'

export const PageDashboardClient: PageClientComponent = () => {
  return <PageDashboard />
}
PageDashboardClient.Layout = FrameDefault
