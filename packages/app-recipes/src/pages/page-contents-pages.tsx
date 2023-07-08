import type { ContentsQuery, ContentsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageComponentPages } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

interface Props {
  data: ContentsQuery
  query: string
  variables: ContentsQueryVariables
}

export const PageContentsPages: PageComponentPages<Props> = (props) => {
  return <UIMarkdownTina data={props.data} type="contents" query={props.query} variables={props.variables} />
}

PageContentsPages.staticPaths = async () => {
  const slugs = await dependencies.serviceTina.getContentsSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

PageContentsPages.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  // TODO: validate output
  const props = await dependencies.serviceTina.getContentsContent(slug)

  return { props }
}
