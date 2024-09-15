import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

export const PageAboutUs: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="About us" />
      </LayoutSection>
    </LayoutPage>
  )
}
