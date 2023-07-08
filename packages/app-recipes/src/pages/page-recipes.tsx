import type { PageComponent } from '@gnowth/lib-utils-react'
import { UIMarkdownTina } from '@gnowth/boilerplate-tina'

import { dependencies } from '../dependencies'

type Params = { slug: string }
type Props = { params?: Params }

export const PageRecipes: PageComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw dependencies.modelError.generateForNotFound()
  }

  const content = await dependencies.serviceTina.getRecipesContent(props.params.slug)

  return (
    <UIMarkdownTina data={content.data} type="recipes" query={content.query} variables={content.variables} />
  )
}

PageRecipes.generateStaticParams = async (): Promise<Params[]> => {
  const pagesKey = await dependencies.serviceTina.getRecipesSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
