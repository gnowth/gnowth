import type { PageServerComponent } from '@gnowth/lib-utils-react'
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
    <UIMarkdownTina data={content.data} type="contents" query={content.query} variables={content.variables} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const pagesKey = await dependencies.serviceTina.getContentsSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
