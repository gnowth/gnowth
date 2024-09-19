import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageReports } from '../components/page-reports'

export const PageReportsClient: PageClientComponent = () => {
  return <PageReports />
}
PageReportsClient.Layout = FrameDefault
