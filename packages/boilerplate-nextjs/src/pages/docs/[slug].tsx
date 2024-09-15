import fs from 'fs'
import matter from 'gray-matter'
import { GetStaticPropsContext } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

interface Props {
  source: MDXRemoteSerializeResult
}

const DOCS_PATH = '../../docs'

function PageDocs(props: Props) {
  return (
    <MDXRemote
      compiledSource={props.source.compiledSource}
      frontmatter={props.source.frontmatter}
      scope={props.source.scope}
    />
  )
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(DOCS_PATH)
    .map((path) => path.replace(/\.md$/, ''))
    .map((slug) => ({ params: { slug } }))

  return { fallback: false, paths }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const source = fs.readFileSync(`${DOCS_PATH}/${context.params?.slug}.md`, 'utf-8')
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })

  return { props: { source: mdxSource } }
}

export default PageDocs
