import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import type { RecipesQuery, RecipesQueryVariables } from '../types'
import { client } from '../client'
import { Collection, formatMap } from '../schema'

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

PageRecipes.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  return client.queries.recipes({
    relativePath: `${context.params?.slug}.${formatMap[Collection.Recipes]}`,
  })
}

PageRecipes.staticPaths = async (): Promise<Paths> => {
  const connection = await client.queries.recipesConnection()

  return (
    connection.data.recipesConnection.edges?.map((edge) => ({
      params: { slug: edge?.node?._sys.filename ?? '' },
    })) ?? []
  )
}
