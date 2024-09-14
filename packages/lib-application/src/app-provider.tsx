import type { ReactElement, ReactNode } from 'react'

import { objectDefaults } from '@gnowth/lib-utils'
import { useContext } from 'react'
import { I18nextProvider } from 'react-i18next'

import type { PropsApplication } from './context-application'

import { ContextApplication } from './context-application'

interface Props extends Partial<PropsApplication> {
  children: ReactNode
}

export function AppProvider(props: Props): ReactElement {
  const context = useContext(ContextApplication)
  const propsWithDefault = objectDefaults(props as PropsApplication, context)

  return (
    <ContextApplication.Provider value={propsWithDefault}>
      {propsWithDefault.i18n && (
        <I18nextProvider defaultNS={propsWithDefault.i18nNamespace} i18n={propsWithDefault.i18n}>
          {props.children}
        </I18nextProvider>
      )}

      {!propsWithDefault.i18n && props.children}
    </ContextApplication.Provider>
  )
}
