import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import type { IngredientsQuery, IngredientsQueryVariables } from '../types'
import { client } from '../client'
import { Collection, formatMap } from '../schema'

type Paths = { params: { slug: string } }[]

type Props = {
  data: IngredientsQuery
  query: string
  variables: IngredientsQueryVariables
}

export function PageIngredients(props: Props): ReactElement {
  const { data } = useTina(props)

  return (
    <>
      {!!data.ingredients?.body && (
        <TinaMarkdown content={data.ingredients.body as unknown as TinaMarkdownContent} />
      )}
    </>
  )
}

PageIngredients.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  return client.queries.ingredients({
    relativePath: `${context.params?.slug}.${formatMap[Collection.Ingredients]}`,
  })
}

PageIngredients.staticPaths = async (): Promise<Paths> => {
  const connection = await client.queries.ingredientsConnection()

  return (
    connection.data.ingredientsConnection.edges?.map((edge) => ({
      params: { slug: edge?.node?._sys.filename ?? '' },
    })) ?? []
  )
}
