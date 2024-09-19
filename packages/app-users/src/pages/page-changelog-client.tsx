import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageChangelog } from '../components/page-changelog'

export const PageChangelogClient: PageClientComponent = () => {
  return <PageChangelog />
}
PageChangelogClient.Layout = FrameDefault
