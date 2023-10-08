import type { FunctionComponent } from 'react'
import { LayoutPage, LayoutContent, LayoutSection, TokenSpace, UITypography } from '@gnowth/lib-react'

export const PageLanding: FunctionComponent = () => (
  <LayoutPage>
    <LayoutSection paddingBottom={TokenSpace.xl} paddingTop={TokenSpace.xl} variant="page">
      <LayoutContent alignSelf="center">
        <UITypography value="Welcome" variant="h1" />
      </LayoutContent>

      <UITypography marginTop={TokenSpace.xl} value="Some text jdiof odfijdof odifj f" />
    </LayoutSection>

    <LayoutSection
      layoutSpacing={TokenSpace.lg}
      paddingBottom={TokenSpace.xxxl}
      paddingTop={TokenSpace.xxxl}
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
      layoutSpacing={TokenSpace.lg}
      paddingBottom={TokenSpace.xxxl}
      paddingTop={TokenSpace.xxxl}
      palette="text"
      paletteWeight="a100"
      variant="page"
    >
      <UITypography value="Some text jdiof odfijdof odifj f" />

      <UITypography value="Some text jdd dfdf df diof odfijdof odifj f" />
    </LayoutSection>

    <LayoutSection
      layoutSpacing={TokenSpace.lg}
      paddingBottom={TokenSpace.xxxl}
      paddingTop={TokenSpace.xxxl}
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
      layoutSpacing={TokenSpace.lg}
      paddingBottom={TokenSpace.xxxl}
      paddingTop={TokenSpace.xxxl}
      palette="text"
      paletteWeight="a100"
      variant="page"
    >
      <UITypography value="Some text jdiof odfijdof odifj f" />

      <UITypography value="Some text jdd dfdf df diof odfijdof odifj f" />
    </LayoutSection>
  </LayoutPage>
)
