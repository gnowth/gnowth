import type { FunctionComponent } from 'react'

import { LayoutPage } from '@gnowth/lib-react'

import { SectionChangelog } from './section-changelog'

export const PageChangelog: FunctionComponent = () => {
  return (
    <LayoutPage>
      <SectionChangelog />
    </LayoutPage>
  )
}
