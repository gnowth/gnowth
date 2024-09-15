import { LayoutPage } from '@gnowth/lib-react'
import { GetStaticPropsContext } from 'next'
import { FunctionComponent } from 'react'

import source from '../../contents/source.json'
import { sections } from '../sections'

type Paths = { params: { slug: string } }[]
type Props = { contents: (keyof typeof sections)[] }

interface PageServerComponent<Props> extends FunctionComponent<Props> {
  staticPaths: () => Paths
  staticProps: (context: GetStaticPropsContext) => Props
}

export const PageGeneratedClient: PageServerComponent<Props> = (props) => {
  return (
    <LayoutPage>
      {props.contents?.map((section, index) => {
        const Component = sections[section]
        return <Component key={index} />
      })}
    </LayoutPage>
  )
}

PageGeneratedClient.staticPaths = (): Paths => {
  const pagesKey = Object.keys(source)

  return pagesKey.map((key) => ({ params: { slug: key } }))
}

// DEBT: add type guard instead of casting
PageGeneratedClient.staticProps = (context: GetStaticPropsContext): Props => {
  if (!context.params?.slug) return { contents: [] }

  const contents = (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
    context.params.slug as keyof typeof source
  ]

  return { contents }
}
