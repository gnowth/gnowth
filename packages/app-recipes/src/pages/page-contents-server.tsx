import type { PageServerComponent } from '@gnowth/lib-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageContentsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw dependencies.modelError.generateForNotFound()
  }

  const content = await dependencies.serviceTina.getContentsContent(props.params.slug)

  return (
    <UIMarkdownTina data={content.data} query={content.query} type="contents" variables={content.variables} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const pagesKey = await dependencies.serviceTina.getContentsSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
