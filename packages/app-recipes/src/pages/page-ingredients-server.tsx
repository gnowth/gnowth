import type { PageServerComponent } from '@gnowth/lib-react'

import { ErrorCustom, platformGet } from '@gnowth/lib-react'
import { MDXRemote } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
type Props = { params?: Params }

export const PageIngredientsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params) {
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
  const platform = await platformGet()
  const recipeService = await platform.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const source = await recipeService.ingredientGetSource(props.params)
  return (
    <MDXRemote compiledSource={source.compiledSource} frontmatter={source.frontmatter} scope={source.scope} />
  )
}

PageIngredientsServer.generateStaticParams = async () => {
  const platform = await platformGet()
  const recipeService = await platform.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  return recipeService.ingredientGetParams()
}
