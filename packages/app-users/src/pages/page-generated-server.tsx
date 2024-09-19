import { PageServerComponent } from '@gnowth/lib-react'

import source from '../../contents/source.json'
import { PageGenerated } from '../components/page-generated'
import { sections } from '../sections'

type Params = { slug: string }
export const PageGeneratedServer: PageServerComponent<Params> = async (props) => {
  if (!props.params?.slug) {
    throw new Error('No page found')
  }

  const contents =
    (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
      props.params.slug as keyof typeof source
    ] ?? []

  return <PageGenerated contents={contents} />
}

PageGeneratedServer.generateStaticParams = async () => {
  const pagesKey = Object.keys(source)
  return pagesKey.map((slug) => ({ slug }))
}
