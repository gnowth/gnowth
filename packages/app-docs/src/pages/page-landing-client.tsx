import { PageClientComponent } from '@gnowth/lib-react'

import { ApplicationDocsLayout } from '../components/application-docs.layout'
import { PageLanding } from '../components/page-landing'
import { ContentService } from '../modules/contents'

type Props = { paths: string[] }
export const PageLandingClient: PageClientComponent<Props> = (props) => {
  return <PageLanding paths={props.paths} />
}

PageLandingClient.staticProps = async () => {
  const contentService = new ContentService()
  const paths = await contentService.getPaths()
  return { props: { paths } }
}

PageLandingClient.Layout = ApplicationDocsLayout
