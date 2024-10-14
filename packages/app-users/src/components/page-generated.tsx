import { LayoutPage } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { sections } from '../sections'

type Props = { contents: (keyof typeof sections)[] }
export const PageGenerated: FunctionComponent<Props> = (props) => {
  return (
    <LayoutPage>
      {props.contents?.map((section, index) => {
        const Component = sections[section]
        return <Component key={`${section}-${index}`} />
      })}
    </LayoutPage>
  )
}
