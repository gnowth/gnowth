import type { RecipesQuery, RecipesQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Props = {
  data: RecipesQuery
  query: string
  variables: RecipesQueryVariables
}

export const PageRecipesClient: PageClientComponent<Props> = (props) => {
  return <UIMarkdownTina data={props.data} type="recipes" query={props.query} variables={props.variables} />
}

PageRecipesClient.staticPaths = async () => {
  const slugs = await dependencies.serviceTina.getRecipesSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

PageRecipesClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  const props = await dependencies.serviceTina.getRecipesContent(slug)

  return { props }
}