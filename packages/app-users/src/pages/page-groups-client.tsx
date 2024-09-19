import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageGroups } from '../components/page-groups'

export const PageGroupsClient: PageClientComponent = () => {
  return <PageGroups />
}
PageGroupsClient.Layout = FrameDefault
