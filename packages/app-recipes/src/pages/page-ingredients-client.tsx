import type { IngredientsQuery, IngredientsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { repositoryGet } from '@gnowth/lib-react'

type Props = {
  data: IngredientsQuery
  query: string
  variables: IngredientsQueryVariables
}

export const PageIngredientsClient: PageClientComponent<Props> = (props) => {
  return (
    <UIMarkdownTina data={props.data} query={props.query} type="ingredients" variables={props.variables} />
  )
}

PageIngredientsClient.staticPaths = async () => {
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const slugs = await tinaService.ingredientGetSlugs()

  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

PageIngredientsClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const props = await tinaService.ingredientGetContent(slug)

  return { props }
}
