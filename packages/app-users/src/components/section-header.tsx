import type { FunctionComponent } from 'react'

import { LayoutSection, LayoutStack, UIBox, UIButton, UITypography, useTranslation } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'
import { NavLink } from './nav-link'
import { ViewProgressGlobal } from './view-progress-global'
import { withAugmented } from './with-augmented'

// DEBT: remove prefetch in link where possible
const SectionHeaderComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

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
        <NavLink href={dependencies.appModel.routes.dashboard()} prefetch={false}>
          {t('Dashboard')}
        </NavLink>

        <NavLink href={dependencies.appModel.routes.groups()} prefetch={false}>
          {t('Teams')}
        </NavLink>

        <NavLink
          href={dependencies.appModel.routes.users()}
          hrefActive={dependencies.appModel.routes.user()}
          prefetch={false}
        >
          {t('Members')}
        </NavLink>

        <NavLink href={dependencies.appModel.routes.reports()} prefetch={false}>
          {t('Reports')}
        </NavLink>

        <NavLink
          href={dependencies.appModel.routes.generated()}
          hrefActive={dependencies.appModel.routes.generated('')}
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
