import { AuthPageToken } from '@gnowth/app-auth'
import { AppLink, LayoutFlex, LayoutSection, UIButton, UIIcon, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { TokenApplication } from '../modules/app-model-environment'

type Props = {
  slot?: string
}

export const ViewAppHeader: FunctionComponent<Props> = () => {
  return (
    <LayoutSection
      boxVariant="float"
      data-testid="spa--layout-header"
      layoutProps={{ gap: 'xs' }}
      variant="navigation"
    >
      <UIIcon size="sm" value="home" />

      <UITypography value="Header" />

      <LayoutFlex flexGrow="1" gap="none">
        <AppLink application={TokenApplication.recipes}>
          <UIButton palette="primaryText" textValue="Recipes" variant="navigation" />
        </AppLink>

        <AppLink application={TokenApplication.tasks}>
          <UIButton palette="primaryText" textValue="Tasks" variant="navigation" />
        </AppLink>
      </LayoutFlex>

      <LayoutFlex gap="none">
        <AppLink application={TokenApplication.auth} page={AuthPageToken.login}>
          <UIButton palette="primaryText" textValue="Sign in" variant="navigation" />
        </AppLink>

        <AppLink application={TokenApplication.auth} page={AuthPageToken.signup}>
          <UIButton palette="primaryText" textValue="Sign up" variant="navigation" />
        </AppLink>
      </LayoutFlex>
    </LayoutSection>
  )
}
