import type { FunctionComponent } from 'react'

import { Text } from '@chakra-ui/react'
import { LayoutSection, UIBox, UITypography } from '@gnowth/lib-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import packageJson from '../../package.json'
import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const SectionFooterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <UIBox data-testid="app-users--section-footer">
      <LayoutSection layout="flex" layoutVariant="horizontalRight">
        <UITypography
          value={
            <Link href={dependencies.appModel.routes.changelog()} prefetch={false}>
              {t('Current version: {{packageJson.version}}', { packageJson })}
            </Link>
          }
          variant="link"
        />
      </LayoutSection>

      <LayoutSection palette="teal" paletteWeight="700">
        <Text color="white" fontSize="sm" textAlign="center">
          {t('Copyright © 2022 Gnowth')}
        </Text>
      </LayoutSection>
    </UIBox>
  )
}

export const SectionFooter = withAugmented()(SectionFooterComponent)
