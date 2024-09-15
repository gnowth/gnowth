import { LayoutPage } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { FormUser } from './form-user'

export const PageUser: FunctionComponent = () => {
  return (
    <LayoutPage>
      <FormUser />
    </LayoutPage>
  )
}
