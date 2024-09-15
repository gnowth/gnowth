import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

export const PageNotPermitted: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value="Not Permitted" />
      </LayoutSection>
    </LayoutPage>
  )
}
