import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import type { ContentsQuery, ContentsQueryVariables } from '../types'
import { client } from '../client'
import { Collection, formatMap } from '../schema'

type Paths = { params: { slug: string } }[]

type Props = {
  data: ContentsQuery
  query: string
  variables: ContentsQueryVariables
}

export function PageContents(props: Props): ReactElement {
  const { data } = useTina(props)

  return (
    <>
      {!!data.contents?.body && (
        <TinaMarkdown content={data.contents.body as unknown as TinaMarkdownContent} />
      )}
    </>
  )
}

PageContents.staticPaths = async (): Promise<Paths> => {
  const connection = await client.queries.contentsConnection()

  return (
    connection.data.contentsConnection.edges?.map((edge) => ({
      params: { slug: edge?.node?._sys.filename ?? '' },
    })) ?? []
  )
}

PageContents.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  return client.queries.contents({
    relativePath: `${context.params?.slug}.${formatMap[Collection.Contents]}`,
  })
}
