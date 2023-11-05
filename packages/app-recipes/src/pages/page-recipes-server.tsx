import type { PageServerComponent } from '@gnowth/lib-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageRecipesServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-recipes-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageRecipesServer',
        context: 'PageRecipesServer',
        source: 'app-recipes',
      },
    })
  }

  const content = await dependencies.serviceTina.getRecipesContent(props.params.slug)

  return (
    <UIMarkdownTina data={content.data} query={content.query} type="recipes" variables={content.variables} />
  )
}

PageRecipesServer.generateStaticParams = async (): Promise<Params[]> => {
  const pagesKey = await dependencies.serviceTina.getRecipesSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
