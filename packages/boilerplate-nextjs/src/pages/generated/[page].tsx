import type { GetStaticPropsContext } from 'next'
import type { ReactNode } from 'react'
import fs from 'fs'
import path from 'path'

import sections from '../../sections'

interface Props {
  contents: (keyof typeof sections)[]
}

function PageGenerated(props: Props) {
  return (
    props.contents?.map((section, index) => {
      const Component = sections[section]
      return <Component key={index} />
    }) ?? null
  )
}

PageGenerated.getLayout = function getLayout(page: ReactNode) {
  return page
}

export async function getStaticPaths() {
  const sourcePath = path.resolve('./public', '../src/contents/source.json')
  const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
  const pagesKey = Object.keys(source)

  return {
    paths: pagesKey.map((key) => ({ params: { page: key } })),
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const sourcePath = path.resolve('./public', '../src/contents/source.json')
  const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))

  if (!context.params?.page) return { props: {} }

  const contents = source[context.params.page as string]

  return { props: { contents } }
}

export default PageGenerated
