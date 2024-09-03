import type { FunctionComponent } from 'react'

import { LayoutPage } from '@gnowth/lib-react'

import { FormUserFilter } from './form-user-filter'
import { SectionUsers } from './section-users'

export const PageUsers: FunctionComponent = () => {
  return (
    <LayoutPage>
      <FormUserFilter />

      <SectionUsers />
    </LayoutPage>
  )
}
