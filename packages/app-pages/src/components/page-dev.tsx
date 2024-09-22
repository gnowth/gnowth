import { LayoutPage } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { SectionSimulator } from './section-simulator'

export const PageDev: FunctionComponent = () => {
  return (
    <LayoutPage>
      <SectionSimulator />
    </LayoutPage>
  )
}
