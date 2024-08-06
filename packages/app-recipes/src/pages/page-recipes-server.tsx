import type { PageServerComponent } from '@gnowth/lib-react'

import { ErrorCustom } from '@gnowth/lib-react'
import { MDXRemote } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
type Props = { params?: Params }

export const PageRecipesServer: PageServerComponent<Props> = async (props) => {
  if (!props.params) {
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
  const recipeService = new RecipeService()
  const source = await recipeService.recipeGetSource(props.params)
  return (
    <MDXRemote compiledSource={source.compiledSource} frontmatter={source.frontmatter} scope={source.scope} />
  )
}

PageRecipesServer.generateStaticParams = async (): Promise<Params[]> => {
  const recipeService = new RecipeService()
  return recipeService.recipeGetParams()
}
