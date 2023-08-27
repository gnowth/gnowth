import type { FunctionComponent } from 'react'
import React from 'react'
import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

const PageComingSoon: FunctionComponent = () => (
  <LayoutPage>
    <LayoutSection variant="page">
      <UITypography value="Coming soon" variant="h1" />
    </LayoutSection>
  </LayoutPage>
)

export default PageComingSoon
