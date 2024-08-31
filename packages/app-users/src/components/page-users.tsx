import type { FunctionComponent } from 'react'

import { LayoutStack } from '@gnowth/lib-react'

import { FormUserFilter } from './form-user-filter'
import { SectionUsers } from './section-users'

export const PageUsers: FunctionComponent = () => {
  return (
    <LayoutStack>
      <FormUserFilter />

      <SectionUsers />
    </LayoutStack>
  )
}
