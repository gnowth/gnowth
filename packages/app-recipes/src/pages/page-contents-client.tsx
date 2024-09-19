import { PageClientComponent } from '@gnowth/lib-react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { RecipeService } from '../modules/recipes.services'

type Props = { source: MDXRemoteSerializeResult }
type Params = { slug: string }
export const PageContentsClient: PageClientComponent<Props, Params> = (props) => {
  return (
    <MDXRemote
      compiledSource={props.source.compiledSource}
      frontmatter={props.source.frontmatter}
      scope={props.source.scope}
    />
  )
}

PageContentsClient.staticPaths = async () => {
  const recipeService = new RecipeService()
  const params = await recipeService.contentGetParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageContentsClient.staticProps = async (context) => {
  const recipeService = new RecipeService()
  const source = await recipeService.contentGetSource(context.params as Params)
  return { props: { source } }
}
