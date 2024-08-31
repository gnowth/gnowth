import type { FunctionComponent } from 'react'

import { LayoutContent, LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'

export const PageLanding: FunctionComponent = () => {
  return (
    <LayoutPage>
      <LayoutSection paddingBottom="xl" paddingTop="xl" variant="page">
        <LayoutContent alignSelf="center">
          <UITypography value="Welcome" variant="h1" />
        </LayoutContent>

        <UITypography marginTop="xl" value="Some text jdiof odfijdof odifj f" />
      </LayoutSection>

      <LayoutSection
        layoutProps={{ gap: 'lg' }}
        paddingBottom="xxxl"
        paddingTop="xxxl"
        palette="primary"
        variant="page"
      >
        <UITypography palette="primary" paletteForContrast value="Some text jdiof odfijdof odifj f" />

        <UITypography
          palette="primary"
          paletteForContrast
          value="Some text jdd dfdf df diof odfijdof odifj f"
        />
      </LayoutSection>

      <LayoutSection
        layoutProps={{ gap: 'lg' }}
        paddingBottom="xxxl"
        paddingTop="xxxl"
        palette="text"
        paletteWeight="a100"
        variant="page"
      >
        <UITypography value="Some text jdiof odfijdof odifj f" />

        <UITypography value="Some text jdd dfdf df diof odfijdof odifj f" />
      </LayoutSection>

      <LayoutSection
        layoutProps={{ gap: 'lg' }}
        paddingBottom="xxxl"
        paddingTop="xxxl"
        palette="secondary"
        variant="page"
      >
        <UITypography palette="secondary" paletteForContrast value="Some text jdiof odfijdof odifj f" />

        <UITypography
          palette="secondary"
          paletteForContrast
          value="Some text jdd dfdf df diof odfijdof odifj f"
        />
      </LayoutSection>

      <LayoutSection
        layoutProps={{ gap: 'lg' }}
        paddingBottom="xxxl"
        paddingTop="xxxl"
        palette="text"
        paletteWeight="a100"
        variant="page"
      >
        <UITypography value="Some text jdiof odfijdof odifj f" />

        <UITypography value="Some text jdd dfdf df diof odfijdof odifj f" />
      </LayoutSection>
    </LayoutPage>
  )
}
