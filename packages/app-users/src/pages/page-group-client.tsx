import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageGroup } from '../components/page-group'

export const PageGroupClient: PageClientComponent = () => {
  return <PageGroup />
}
PageGroupClient.Layout = FrameDefault
