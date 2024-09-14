import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutStack } from '@gnowth/lib-react'

import source from '../../contents/source.json'
import { sections } from '../sections'

type Params = { slug: string }
type Props = { params?: Params }

interface PageServerComponent<Props> extends FunctionComponent<Props> {
  generateStaticParams?: () => Promise<Params[]>
}

export const PageGeneratedServer: PageServerComponent<Props> = (props) => {
  if (!props.params?.slug) {
    throw new Error('No page found')
  }

  const contents =
    (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
      props.params.slug as keyof typeof source
    ] ?? []

  return (
    <LayoutPage>
      <LayoutStack gap="none" minHeight="100vh">
        {contents.map((section, index) => {
          const Component = sections[section]
          return <Component key={index} />
        })}
      </LayoutStack>
    </LayoutPage>
  )
}

PageGeneratedServer.generateStaticParams = async (): Promise<Params[]> => {
  const pagesKey = Object.keys(source)

  return pagesKey.map((slug) => ({ slug }))
}
