import type { IngredientsQuery, IngredientsQueryVariables } from '@gnowth/boilerplate-tina'
import type { PageClientComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Props = {
  data: IngredientsQuery
  query: string
  variables: IngredientsQueryVariables
}

export const PageIngredientsClient: PageClientComponent<Props> = (props) => {
  return (
    <UIMarkdownTina data={props.data} type="ingredients" query={props.query} variables={props.variables} />
  )
}

PageIngredientsClient.staticPaths = async () => {
  const slugs = await dependencies.serviceTina.getIngredientsSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

PageIngredientsClient.staticProps = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''
  const props = await dependencies.serviceTina.getIngredientsContent(slug)

  return { props }
}
