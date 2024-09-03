import type { FunctionComponent } from 'react'

import { LayoutPage } from '@gnowth/lib-react'

import { FormGroupFilter } from './form-group-filter'
import { SectionGroups } from './section-groups'

export const PageGroups: FunctionComponent = () => {
  return (
    <LayoutPage>
      <FormGroupFilter />

      <SectionGroups />
    </LayoutPage>
  )
}
