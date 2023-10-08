import type { FunctionComponent } from 'react'
import {
  AppLink,
  LayoutHeader,
  LayoutFlex,
  LayoutSection,
  TokenIconSize,
  TokenSpace,
  UIButton,
  UIIcon,
  UITypography,
} from '@gnowth/lib-react'

import { TokenApplication } from '../app-model-environment'

interface Props {
  slot?: string
}

export const ViewAppHeader: FunctionComponent<Props> = () => (
  <LayoutHeader>
    <LayoutSection
      boxVariant="float"
      paddingBottom={TokenSpace.none}
      paddingTop={TokenSpace.none}
      palette="text"
      paletteWeight="a100"
      variant="pageRow"
    >
      <UIIcon size={TokenIconSize.sm} value="home" />

      <UITypography value="Header" />

      <LayoutFlex spacing={0}>
        <AppLink application={TokenApplication.recipes}>
          <UIButton textValue="Recipes" variant="navigation" />
        </AppLink>

        <AppLink application={TokenApplication.tasks}>
          <UIButton textValue="Tasks" variant="navigation" />
        </AppLink>
      </LayoutFlex>
    </LayoutSection>
  </LayoutHeader>
)
