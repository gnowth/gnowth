import type { ContentsQuery, ContentsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { repositoryGet } from '@gnowth/lib-react'

type Props = {
  data: ContentsQuery
  query: string
  variables: ContentsQueryVariables
}

export const PageContentsClient: PageClientComponent<Props> = (props) => {
  return <UIMarkdownTina data={props.data} query={props.query} type="contents" variables={props.variables} />
}

PageContentsClient.staticPaths = async () => {
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const slugs = await tinaService.contentGetSlugs()
  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

PageContentsClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  // TODO: validate output
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const props = await tinaService.contentGetContent(slug)
  return { props }
}
