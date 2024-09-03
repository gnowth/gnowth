import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageFrequentlyAskedQuestions: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Frequently asked questions" />
      </LayoutSection>
    </LayoutPage>
  )
}
