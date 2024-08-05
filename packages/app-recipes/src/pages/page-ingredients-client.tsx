import type { PageClientComponent } from '@gnowth/lib-react'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { platformGet } from '@gnowth/lib-react'
import { MDXRemote } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Props = { source: MDXRemoteSerializeResult }
type Params = { slug: string }

export const PageIngredientsClient: PageClientComponent<Props> = (props) => {
  return (
    <MDXRemote
      compiledSource={props.source.compiledSource}
      frontmatter={props.source.frontmatter}
      scope={props.source.scope}
    />
  )
}

PageIngredientsClient.staticPaths = async () => {
  const platform = await platformGet()
  const recipeService = await platform.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const params = await recipeService.ingredientGetParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageIngredientsClient.staticProps = async (context) => {
  const platform = await platformGet()
  const recipeService = await platform.serviceGet<RecipeService>({
    Constructor: RecipeService,
    name: 'recipeService',
  })
  const source = await recipeService.ingredientGetSource(context.params as Params)
  return { props: { source } }
}
