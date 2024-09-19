import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageUser } from '../components/page-user'

export const PageUserClient: PageClientComponent = () => {
  return <PageUser />
}
PageUserClient.Layout = FrameDefault
