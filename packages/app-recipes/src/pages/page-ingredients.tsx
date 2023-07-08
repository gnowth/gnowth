import type { PageComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageIngredients: PageComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw dependencies.modelError.generateForNotFound()
  }

  const content = await dependencies.serviceTina.getIngredientsContent(props.params.slug)

  return (
    <UIMarkdownTina
      data={content.data}
      type="ingredients"
      query={content.query}
      variables={content.variables}
    />
  )
}

PageIngredients.generateStaticParams = async () => {
  const pagesKey = await dependencies.serviceTina.getIngredientsSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
