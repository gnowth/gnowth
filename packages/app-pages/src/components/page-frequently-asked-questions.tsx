import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

export const PageFrequentlyAskedQuestions: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Frequently asked questions" />
      </LayoutSection>
    </LayoutPage>
  )
}
