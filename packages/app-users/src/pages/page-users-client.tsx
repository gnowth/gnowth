import { PageClientComponent } from '@gnowth/lib-react'

import { FrameDefault } from '../components/frame-default'
import { PageUsers } from '../components/page-users'

export const PageUsersClient: PageClientComponent = () => {
  return <PageUsers />
}
PageUsersClient.Layout = FrameDefault
