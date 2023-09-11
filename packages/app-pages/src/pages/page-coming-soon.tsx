import type { FunctionComponent } from 'react'
import React from 'react'
import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageComingSoon: FunctionComponent = () => (
  <LayoutPage>
    <LayoutSection variant="page">
      <UITypography value="Coming soon" variant="h1" />
    </LayoutSection>
  </LayoutPage>
)
