import { ErrorCustom, PageServerComponent } from '@gnowth/lib-react'

import { PageDoc } from '../components/page-docs'
import { ContentService } from '../modules/contents.services'

type Params = { slug: string }
export const PageDocsServer: PageServerComponent<Params> = async (props) => {
  if (!props.params) {
    throw new ErrorCustom({
      code: 'app-docs--page-docs-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageDocsServer',
        context: 'PageDocsServer',
        source: 'app-docs',
      },
    })
  }
  const contentService = new ContentService()
  const { content } = await contentService.getSourceServer(props.params)
  return <PageDoc>{content}</PageDoc>
}

PageDocsServer.generateStaticParams = async () => {
  const contentService = new ContentService()
  return contentService.getParams()
}
