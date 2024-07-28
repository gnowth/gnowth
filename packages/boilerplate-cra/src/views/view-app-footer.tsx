import type { FunctionComponent } from 'react'

import { PagesPageToken } from '@gnowth/app-pages'
import { AppLink, LayoutFlex, LayoutFooter, LayoutSection, UITypography } from '@gnowth/lib-react'

interface Props {
  slot?: string
}

export const ViewAppFooter: FunctionComponent<Props> = () => (
  <LayoutFooter>
    <LayoutSection
      boxVariant="separator"
      layoutProps={{ spacing: 'xs' }}
      palette="text"
      paletteWeight="a100"
      variant="page"
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
  </LayoutFooter>
)
