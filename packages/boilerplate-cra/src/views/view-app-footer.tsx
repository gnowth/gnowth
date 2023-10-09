import type { FunctionComponent } from 'react'
import { TokenPage as TokenPagePages } from '@gnowth/app-pages'
import { AppLink, LayoutFlex, LayoutFooter, LayoutSection, TokenSpace, UITypography } from '@gnowth/lib-react'

interface Props {
  slot?: string
}

export const ViewAppFooter: FunctionComponent<Props> = () => (
  <LayoutFooter>
    <LayoutSection
      boxVariant="separator"
      layoutProps={{ spacing: TokenSpace.xs }}
      palette="text"
      paletteWeight="a100"
      variant="page"
    >
      <UITypography value="© Copyright GNOWTH 2021" variant="overline" />

      <LayoutFlex>
        <AppLink application="pages" page={TokenPagePages.aboutUs}>
          <UITypography value="About us" variant="link" />
        </AppLink>

        <AppLink application="pages" page={TokenPagePages.termsAndConditions}>
          <UITypography value="Terms and conditions" variant="link" />
        </AppLink>

        <AppLink application="pages" page={TokenPagePages.privacy}>
          <UITypography value="Privacy" variant="link" />
        </AppLink>
      </LayoutFlex>
    </LayoutSection>
  </LayoutFooter>
)
