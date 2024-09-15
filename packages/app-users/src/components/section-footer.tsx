import { LayoutSection, UIBox, UITypography, useTranslation } from '@gnowth/lib-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import packageJson from '../../package.json'
import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const SectionFooterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <UIBox data-testid="app-users--section-footer">
      <LayoutSection layout="flex" layoutVariant="horizontalRight">
        <Link href={dependencies.appModel.routes.changelog()} prefetch={false}>
          <UITypography
            value={t('Current version: {{packageJson.version}}', { packageJson })}
            variant="link"
          />
        </Link>
      </LayoutSection>

      <LayoutSection palette="primary">
        <UITypography
          palette="primary"
          paletteForContrast
          textAlign="center"
          value={t('Copyright © 2022 Gnowth')}
          variant="body2"
        />
      </LayoutSection>
    </UIBox>
  )
}

export const SectionFooter = withAugmented()(SectionFooterComponent)
