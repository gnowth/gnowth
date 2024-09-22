import { ErrorCustom, PageServerComponent } from '@gnowth/lib-react'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
export const PageRecipesServer: PageServerComponent<Params> = async (props) => {
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
  const { content } = await recipeService.recipeGetSourceServer(props.params)
  return content
}

PageRecipesServer.generateStaticParams = async () => {
  const recipeService = new RecipeService()
  return recipeService.recipeGetParams()
}
