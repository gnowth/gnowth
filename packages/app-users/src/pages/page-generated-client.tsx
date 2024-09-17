import { LayoutPage, PageClientComponent } from '@gnowth/lib-react'

import source from '../../contents/source.json'
import { sections } from '../sections'

type Props = { contents: (keyof typeof sections)[] }

export const PageGeneratedClient: PageClientComponent<Props> = (props) => {
  return (
    <LayoutPage>
      {props.contents?.map((section, index) => {
        const Component = sections[section]
        return <Component key={index} />
      })}
    </LayoutPage>
  )
}

PageGeneratedClient.staticPaths = async () => {
  const pagesKey = Object.keys(source)
  const paths = pagesKey.map((key) => ({ params: { slug: key } }))
  return { fallback: false, paths }
}

// DEBT: add type guard instead of casting
PageGeneratedClient.staticProps = async (context) => {
  if (!context.params?.slug) return { props: { contents: [] } }
  const contents = (source as Record<keyof typeof source, (keyof typeof sections)[]>)[
    context.params.slug as keyof typeof source
  ]
  return { props: { contents } }
}
