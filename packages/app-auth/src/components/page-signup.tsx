import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

// TODO(feature): allow sign up
// TODO(enhancement): add ui for sign up
export const PageSignup: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Sign up" />
      </LayoutSection>
    </LayoutPage>
  )
}
