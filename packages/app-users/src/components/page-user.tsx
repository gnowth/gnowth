import type { FunctionComponent } from 'react'

import { LayoutPage } from '@gnowth/lib-react'

import { FormUser } from './form-user'

export const PageUser: FunctionComponent = () => {
  return (
    <LayoutPage>
      <FormUser />
    </LayoutPage>
  )
}
