import type { FunctionComponent } from 'react'

import { LayoutStack } from '@gnowth/lib-react'

import { FormGroupFilter } from './form-group-filter'
import { SectionGroups } from './section-groups'

export const PageGroups: FunctionComponent = () => {
  return (
    <LayoutStack>
      <FormGroupFilter />

      <SectionGroups />
    </LayoutStack>
  )
}
