import type { FunctionComponent } from 'react'

import { LayoutPage } from '@gnowth/lib-react'

import { FormGroup } from './form-group'

export const PageGroup: FunctionComponent = () => {
  return (
    <LayoutPage>
      <FormGroup />
    </LayoutPage>
  )
}
