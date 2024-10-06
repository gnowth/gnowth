import {
  LayoutSection,
  LayoutStack,
  UIBox,
  UIButton,
  UITypography,
  usePlatformControllerSuspense,
} from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { AppUserConstant, AppUserController, AppUserDependency } from '../modules/app-users'
import { NavLink } from './nav-link'
import { ViewProgressGlobal } from './view-progress-global'
import { withAugmented } from './with-augmented'

// DEBT: remove prefetch in link where possible
const SectionHeaderComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const appUserController = usePlatformControllerSuspense<AppUserController>({
    name: AppUserDependency.appUserController,
  })
  return (
    <div data-semantic="Header" data-testid="app-users--section-header">
      <LayoutSection layout="flex" palette="primary" variant="container">
        <UITypography palette="primary" paletteForContrast value={t('Teams App')} variant="title" />

        <UIBox flexGrow="1" />

        <LayoutStack gap="none" variant="horizontal">
          <UIButton size="xs" textValue={t('Sign up')} variant="flat" />

          <UIButton size="xs" textValue={t('Log in')} variant="flat" />
        </LayoutStack>
      </LayoutSection>

      <LayoutSection boxVariant="float" palette="primary" paletteWeight="50" variant="navigation">
        <NavLink href={appUserController.routes.dashboard()} prefetch={false}>
          {t('Dashboard')}
        </NavLink>

        <NavLink href={appUserController.routes.groups()} prefetch={false}>
          {t('Teams')}
        </NavLink>

        <NavLink
          href={appUserController.routes.users()}
          hrefActive={appUserController.routes.user()}
          prefetch={false}
        >
          {t('Members')}
        </NavLink>

        <NavLink href={appUserController.routes.reports()} prefetch={false}>
          {t('Reports')}
        </NavLink>

        <NavLink
          href={appUserController.routes.generated()}
          hrefActive={appUserController.routes.generated('')}
          prefetch={false}
        >
          {t('Generated page')}
        </NavLink>
      </LayoutSection>

      <ViewProgressGlobal />
    </div>
  )
}

export const SectionHeader = withAugmented()(SectionHeaderComponent)
