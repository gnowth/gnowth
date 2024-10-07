import { LayoutSection, UIBox, UITypography, usePlatformControllerSuspense } from '@gnowth/lib-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import packageJson from '../../package.json'
import { AppUserConstant, AppUserController, AppUserDependency } from '../modules/app-users'
import { withAugmented } from './with-augmented'

const SectionFooterComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const appUserController = usePlatformControllerSuspense<AppUserController>({
    name: AppUserDependency.appUserController,
  })
  return (
    <UIBox data-testid="app-users--section-footer">
      <LayoutSection layout="flex" layoutVariant="horizontalRight">
        <Link href={appUserController.routes.changelog()} prefetch={false}>
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
