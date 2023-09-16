import type { ContentsQuery, ContentsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

interface Props {
  data: ContentsQuery
  query: string
  variables: ContentsQueryVariables
}

export const PageContentsClient: PageClientComponent<Props> = (props) => {
  return <UIMarkdownTina data={props.data} type="contents" query={props.query} variables={props.variables} />
}

PageContentsClient.staticPaths = async () => {
  const slugs = await dependencies.serviceTina.getContentsSlugs()

  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

PageContentsClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  // TODO: validate output
  const props = await dependencies.serviceTina.getContentsContent(slug)

  return { props }
}
