import type { GetStaticPropsContext } from 'next'
import type { FunctionComponent } from 'react'

import source from '../../contents/source.json'
import sections from '../sections'

type Paths = { params: { slug: string } }[]
type Props = { contents: (keyof typeof sections)[] }

interface PageComponent<Props> extends FunctionComponent<Props> {
  staticPaths: () => Paths
  staticProps: (context: GetStaticPropsContext) => Props
}

const PageGenerated: PageComponent<Props> = (props) => {
  return (
    <>
      {props.contents?.map((section, index) => {
        const Component = sections[section]
        return <Component key={index} />
      })}
    </>
  )
}

PageGenerated.staticPaths = (): Paths => {
  const pagesKey = Object.keys(source)

  return pagesKey.map((key) => ({ params: { slug: key } }))
}

// DEBT: add type guard instead of casting
PageGenerated.staticProps = (context: GetStaticPropsContext): Props => {
  if (!context.params?.slug) return { contents: [] }

  const contents = (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
    context.params.slug as keyof typeof source
  ]

  return { contents }
}

export default PageGenerated
