import type { RecipesQuery, RecipesQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageComponentPages } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Props = {
  data: RecipesQuery
  query: string
  variables: RecipesQueryVariables
}

export const PageRecipesPages: PageComponentPages<Props> = (props) => {
  return <UIMarkdownTina data={props.data} type="recipes" query={props.query} variables={props.variables} />
}

PageRecipesPages.staticPaths = async () => {
  const slugs = await dependencies.serviceTina.getRecipesSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

PageRecipesPages.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''

  return dependencies.serviceTina.getRecipesContent(slug)
}
