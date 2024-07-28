import type { PageClientComponent } from '@gnowth/lib-react'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { repositoryGet } from '@gnowth/lib-react'
import { MDXRemote } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Props = { source: MDXRemoteSerializeResult }
type Params = { slug: string }

export const PageRecipesClient: PageClientComponent<Props> = (props) => {
  return (
    <MDXRemote
      compiledSource={props.source.compiledSource}
      frontmatter={props.source.frontmatter}
      scope={props.source.scope}
    />
  )
}

PageRecipesClient.staticPaths = async () => {
  const repository = await repositoryGet()
  const recipeService = await repository.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const params = await recipeService.recipeGetParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageRecipesClient.staticProps = async (context) => {
  const repository = await repositoryGet()
  const recipeService = await repository.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const source = await recipeService.recipeGetSource(context.params as Params)
  return { props: { source } }
}
