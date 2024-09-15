import type { FunctionComponent } from 'react'

import { PagesPageToken } from '@gnowth/app-pages'
import { AppLink, LayoutFlex, LayoutSection, UITypography } from '@gnowth/lib-react'

interface Props {
  slot?: string
}

export const ViewAppFooter: FunctionComponent<Props> = () => {
  return (
    <LayoutSection
      boxVariant="separator"
      data-testid="spa--layout-footer"
      layoutProps={{ gap: 'xs' }}
      palette="text"
      paletteWeight="a100"
      variant="container"
    >
      <UITypography value="© Copyright GNOWTH 2021" variant="overline" />

      <LayoutFlex>
        <AppLink application="pages" page={PagesPageToken.aboutUs}>
          <UITypography value="About us" variant="link" />
        </AppLink>

        <AppLink application="pages" page={PagesPageToken.termsAndConditions}>
          <UITypography value="Terms and conditions" variant="link" />
        </AppLink>

        <AppLink application="pages" page={PagesPageToken.privacy}>
          <UITypography value="Privacy" variant="link" />
        </AppLink>
      </LayoutFlex>
    </LayoutSection>
  )
}
