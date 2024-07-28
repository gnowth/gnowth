import type { PageServerComponent } from '@gnowth/lib-react'

import { ErrorCustom, repositoryGet } from '@gnowth/lib-react'
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
  const repository = await repositoryGet()
  const recipeService = await repository.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const source = await recipeService.contentGetSource(props.params)
  return (
    <MDXRemote compiledSource={source.compiledSource} frontmatter={source.frontmatter} scope={source.scope} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const repository = await repositoryGet()
  const recipeService = await repository.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  return recipeService.contentGetParams()
}
