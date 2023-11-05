import type { PageServerComponent } from '@gnowth/lib-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageContentsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-contents-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageContentsServer',
        context: 'PageContentsServer',
        source: 'app-recipes',
      },
    })
  }

  const content = await dependencies.tinaService.getContentsContent(props.params.slug)

  return (
    <UIMarkdownTina data={content.data} query={content.query} type="contents" variables={content.variables} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const pagesKey = await dependencies.tinaService.getContentsSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
