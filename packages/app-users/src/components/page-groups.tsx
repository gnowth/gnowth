import type { FunctionComponent } from 'react'

import { FormGroupFilter } from './form-group-filter'
import { SectionGroups } from './section-groups'

export const PageGroups: FunctionComponent = () => {
  return (
    <>
      <FormGroupFilter />

      <SectionGroups />
    </>
  )
}
