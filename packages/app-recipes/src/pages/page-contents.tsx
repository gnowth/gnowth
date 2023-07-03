import type { ContentsQuery, ContentsQueryVariables } from '@gnowth/tina-boilerplate'
import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { dependencies } from '../dependencies'

type Paths = { params: { slug: string } }[]

interface Props {
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
  const slugs = await dependencies.serviceTina.getContentsSlugs()

  return slugs.map((slug) => ({ params: { slug } }))
}

PageContents.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''

  return dependencies.serviceTina.getContentsContent(slug)
}
