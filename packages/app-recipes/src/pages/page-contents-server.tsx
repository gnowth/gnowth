import { ErrorCustom, PageServerComponent } from '@gnowth/lib-react'
import { MDXRemote } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Params = { slug: string }
type Props = { params?: Params }

export const PageContentsServer: PageServerComponent<Props> = async (props) => {
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
  const source = await recipeService.contentGetSource(props.params)
  return (
    <MDXRemote compiledSource={source.compiledSource} frontmatter={source.frontmatter} scope={source.scope} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const recipeService = new RecipeService()
  return recipeService.contentGetParams()
}
