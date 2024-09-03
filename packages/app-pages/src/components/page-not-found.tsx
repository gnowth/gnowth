import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageNotFound: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Page not found" />
      </LayoutSection>
    </LayoutPage>
  )
}
