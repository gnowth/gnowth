import type { RecipesQuery, RecipesQueryVariables } from '@gnowth/tina-boilerplate'
import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { dependencies } from '../dependencies'

type Paths = { params: { slug: string } }[]

type Props = {
  data: RecipesQuery
  query: string
  variables: RecipesQueryVariables
}

export function PageRecipes(props: Props): ReactElement {
  const { data } = useTina(props)

  return (
    <>
      {!!data.recipes?.body && <TinaMarkdown content={data.recipes.body as unknown as TinaMarkdownContent} />}
    </>
  )
}

PageRecipes.staticPaths = async (): Promise<Paths> => {
  const slugs = await dependencies.serviceTina.getRecipesSlugs()

  return slugs.map((slug) => ({ params: { slug } }))
}

PageRecipes.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''

  return dependencies.serviceTina.getRecipesContent(slug)
}
