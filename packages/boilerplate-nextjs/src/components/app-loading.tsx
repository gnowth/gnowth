import type { FunctionComponent } from 'react'

import { LayoutSection, UIProgress } from '@gnowth/lib-react'

export const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection variant="container">
      <UIProgress variant="page" />
    </LayoutSection>
  )
}
