import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageBoard: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Board" />
      </LayoutSection>
    </LayoutPage>
  )
}
