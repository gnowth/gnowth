'use client'
import { PageClientComponent } from '@gnowth/lib-react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { ApplicationDocsLayout } from '../components/application-docs.layout'
import { PageDoc } from '../components/page-docs'
import { ContentService } from '../modules/contents'

type Props = { source: MDXRemoteSerializeResult }
type Params = { slug: string }
export const PageDocsClient: PageClientComponent<Props, Params> = (props) => {
  return (
    <PageDoc>
      <MDXRemote
        compiledSource={props.source.compiledSource}
        frontmatter={props.source.frontmatter}
        scope={props.source.scope}
      />
    </PageDoc>
  )
}

PageDocsClient.staticPaths = async () => {
  const contentService = new ContentService()
  const params = await contentService.getParams()
  return {
    fallback: false,
    paths: params.map((params) => ({ params })),
  }
}

PageDocsClient.staticProps = async (context) => {
  const contentService = new ContentService()
  const source = await contentService.getSource(context.params as Params)
  return { props: { source } }
}

PageDocsClient.Layout = ApplicationDocsLayout
