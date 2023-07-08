import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import source from '../../contents/source.json'
import sections from '../sections'

type Params = { slug: string }
type Props = { params?: Params }

interface PageComponent<Props> extends FunctionComponent<Props> {
  generateStaticParams?: () => Promise<Params[]>
}

const PageGenerated: PageComponent<Props> = (props) => {
  if (!props.params?.slug) {
    throw new Error('No page found')
  }

  const contents =
    (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
      props.params.slug as keyof typeof source
    ] ?? []

  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      {contents.map((section, index) => {
        const Component = sections[section]
        return <Component key={index} />
      })}
    </VStack>
  )
}

PageGenerated.generateStaticParams = async (): Promise<Params[]> => {
  const pagesKey = Object.keys(source)

  return pagesKey.map((slug) => ({ slug }))
}

export default PageGenerated
