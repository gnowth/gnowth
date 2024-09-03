import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageLanding: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Landing" />
      </LayoutSection>
    </LayoutPage>
  )
}
