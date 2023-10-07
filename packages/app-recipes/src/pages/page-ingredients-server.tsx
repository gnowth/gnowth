import type { PageServerComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageIngredientsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw dependencies.modelError.generateForNotFound()
  }

  const content = await dependencies.serviceTina.getIngredientsContent(props.params.slug)

  return (
    <UIMarkdownTina
      data={content.data}
      query={content.query}
      type="ingredients"
      variables={content.variables}
    />
  )
}

PageIngredientsServer.generateStaticParams = async () => {
  const pagesKey = await dependencies.serviceTina.getIngredientsSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
