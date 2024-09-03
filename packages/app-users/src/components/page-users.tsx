import type { FunctionComponent } from 'react'

import { FormUserFilter } from './form-user-filter'
import { SectionUsers } from './section-users'

export const PageUsers: FunctionComponent = () => {
  return (
    <>
      <FormUserFilter />

      <SectionUsers />
    </>
  )
}
