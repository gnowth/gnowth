import type { FunctionComponent } from 'react'

import { AppLink, LayoutFlex, LayoutSection, UIButton, UIIcon, UITypography } from '@gnowth/lib-react'

import { TokenApplication } from '../app-model-environment'

interface Props {
  slot?: string
}

export const ViewAppHeader: FunctionComponent<Props> = () => {
  return (
    <LayoutSection
      boxVariant="float"
      data-testid="spa--layout-header"
      paddingBottom="none"
      paddingTop="none"
      palette="text"
      paletteWeight="a100"
      variant="pageRow"
    >
      <UIIcon size="sm" value="home" />

      <UITypography value="Header" />

      <LayoutFlex gap="none">
        <AppLink application={TokenApplication.recipes}>
          <UIButton textValue="Recipes" variant="navigation" />
        </AppLink>

        <AppLink application={TokenApplication.tasks}>
          <UIButton textValue="Tasks" variant="navigation" />
        </AppLink>
      </LayoutFlex>
    </LayoutSection>
  )
}
