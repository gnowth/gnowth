import type { LocaleService } from '@gnowth/lib-platform'
import type { ReactElement, ReactNode } from 'react'

import { PlatformConstant } from '@gnowth/lib-platform'
import { objectDefaults } from '@gnowth/lib-utils'
import { usePlatformProvider } from '@gnowth/lib-utils-react'
import { useContext, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'

import type { PropsApplication } from './context-application'

import { ContextApplication } from './context-application'

interface Props extends Partial<PropsApplication> {
  children: ReactNode
}

export function AppProvider(props: Props): ReactElement {
  const context = useContext(ContextApplication)
  const propsWithDefault = objectDefaults(props as PropsApplication, context)
  const { value: localeService } = usePlatformProvider<LocaleService>({
    name: PlatformConstant.localeService,
    type: 'provider',
  })
  const { i18n } = propsWithDefault
  const i18next = useMemo(() => i18n ?? localeService?.createI18nInstance(), [i18n, localeService])

  return (
    <ContextApplication.Provider value={propsWithDefault}>
      {i18next && (
        <I18nextProvider defaultNS={propsWithDefault.i18nNamespace} i18n={i18next}>
          {props.children}
        </I18nextProvider>
      )}
    </ContextApplication.Provider>
  )
}
