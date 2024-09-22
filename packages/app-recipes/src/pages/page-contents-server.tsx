import { ErrorCustom, PageServerComponent } from '@gnowth/lib-react'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
export const PageContentsServer: PageServerComponent<Params> = async (props) => {
  if (!props.params) {
    throw new ErrorCustom({
      code: 'app-recipes--page-contents-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageContentsServer',
        context: 'PageContentsServer',
        source: 'app-recipes',
      },
    })
  }
  const recipeService = new RecipeService()
  const { content } = await recipeService.contentGetSourceServer(props.params)
  return content
}

PageContentsServer.generateStaticParams = async () => {
  const recipeService = new RecipeService()
  return recipeService.contentGetParams()
}
