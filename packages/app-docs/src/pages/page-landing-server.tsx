import { PageServerComponent } from '@gnowth/lib-react'

import { PageLanding } from '../components/page-landing'
import { ContentService } from '../modules/contents.services'

export const PageLandingServer: PageServerComponent = async () => {
  const contentService = new ContentService()
  const paths = await contentService.getPaths()
  return <PageLanding paths={paths} />
}
