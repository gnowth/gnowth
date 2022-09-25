import type { GetStaticPropsContext } from 'next'

import FrameGenerated from '../components/frame-generated'
import source from '../../contents/source.json'
import sections from '../sections'

type Paths = { params: { slug: string } }[]

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

PageGenerated.Layout = FrameGenerated

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
