import { ErrorCustom, PageServerComponent } from '@gnowth/lib-react'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
export const PageIngredientsServer: PageServerComponent<Params> = async (props) => {
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
  const recipeService = new RecipeService()
  const { content } = await recipeService.ingredientGetSourceServer(props.params)
  return content
}

PageIngredientsServer.generateStaticParams = async () => {
  const recipeService = new RecipeService()
  return recipeService.ingredientGetParams()
}
