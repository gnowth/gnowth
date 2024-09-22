import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationPagesLayout } from '../components/application-pages.layout'
import { PageDev } from '../components/page-dev'

export const PageDevClient: PageClientComponent = () => {
  return <PageDev />
}
PageDevClient.Layout = ApplicationPagesLayout
