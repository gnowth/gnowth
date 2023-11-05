import type { PageServerComponent } from '@gnowth/lib-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageIngredientsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-ingredients-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageIngredientsServer',
        context: 'PageIngredientsServer',
        source: 'app-recipes',
      },
    })
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
