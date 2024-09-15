import { PageClientComponent } from '@gnowth/lib-react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

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
  const recipeService = new RecipeService()
  const params = await recipeService.ingredientGetParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageIngredientsClient.staticProps = async (context) => {
  const recipeService = new RecipeService()
  const source = await recipeService.ingredientGetSource(context.params as Params)
  return { props: { source } }
}
