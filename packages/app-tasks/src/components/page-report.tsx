import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageReport: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Report" />
      </LayoutSection>
    </LayoutPage>
  )
}
