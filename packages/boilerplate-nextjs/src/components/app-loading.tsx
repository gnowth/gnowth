import { LayoutSection, UIProgress } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

export const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection variant="container">
      <UIProgress variant="page" />
    </LayoutSection>
  )
}
