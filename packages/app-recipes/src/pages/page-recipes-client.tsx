'use client'
import { PageClientComponent } from '@gnowth/lib-react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Props = { source: MDXRemoteSerializeResult }
type Params = { slug: string }
export const PageRecipesClient: PageClientComponent<Props, Params> = (props) => {
  return (
    <MDXRemote
      compiledSource={props.source.compiledSource}
      frontmatter={props.source.frontmatter}
      scope={props.source.scope}
    />
  )
}

PageRecipesClient.staticPaths = async () => {
  const recipeService = new RecipeService()
  const params = await recipeService.recipeGetParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageRecipesClient.staticProps = async (context) => {
  const recipeService = new RecipeService()
  const source = await recipeService.recipeGetSource(context.params as Params)
  return { props: { source } }
}
