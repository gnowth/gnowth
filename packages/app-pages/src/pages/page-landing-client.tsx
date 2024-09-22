import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationPagesLayout } from '../components/application-pages.layout'
import { PageLanding } from '../components/page-landing'

export const PageLandingClient: PageClientComponent = () => {
  return <PageLanding />
}
PageLandingClient.Layout = ApplicationPagesLayout
