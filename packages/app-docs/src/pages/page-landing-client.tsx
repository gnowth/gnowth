import { PageClientComponent } from '@gnowth/lib-react'

import { PageLanding } from '../components/page-landing'
import { ContentService } from '../modules/contents.services'

type Props = { paths: string[] }
export const PageLandingClient: PageClientComponent<Props> = (props) => {
  return <PageLanding paths={props.paths} />
}

PageLandingClient.staticProps = async () => {
  const contentService = new ContentService()
  const paths = await contentService.getPaths()
  return { props: { paths } }
}
