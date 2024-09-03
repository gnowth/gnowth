import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageNotAuthorised: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Not Authorised" />
      </LayoutSection>
    </LayoutPage>
  )
}
