import type { RecipesQuery, RecipesQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { repositoryGet } from '@gnowth/lib-react'

type Props = {
  data: RecipesQuery
  query: string
  variables: RecipesQueryVariables
}

export const PageRecipesClient: PageClientComponent<Props> = (props) => {
  return <UIMarkdownTina data={props.data} query={props.query} type="recipes" variables={props.variables} />
}

PageRecipesClient.staticPaths = async () => {
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const slugs = await tinaService.recipeGetSlugs()

  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

PageRecipesClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const props = await tinaService.recipeGetContent(slug)

  return { props }
}
