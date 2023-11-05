import type { ContentsQuery, ContentsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

interface Props {
  data: ContentsQuery
  query: string
  variables: ContentsQueryVariables
}

export const PageContentsClient: PageClientComponent<Props> = (props) => {
  return <UIMarkdownTina data={props.data} query={props.query} type="contents" variables={props.variables} />
}

PageContentsClient.staticPaths = async () => {
  const slugs = await dependencies.tinaService.getContentsSlugs()

  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

PageContentsClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  // TODO: validate output
  const props = await dependencies.tinaService.getContentsContent(slug)

  return { props }
}
