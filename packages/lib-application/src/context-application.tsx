import { Theme } from '@gnowth/lib-theme'
import { i18n } from 'i18next'
import { ComponentType, createContext } from 'react'

import { AppModelApplication } from './app-model-application'
import { PropsBoundary, PropsFrame, PropsSuspense } from './types'

export interface PropsApplication {
  application: AppModelApplication
  boundary?: ComponentType<PropsBoundary> | null | string
  frame?: ComponentType<PropsFrame> | null | string
  i18n?: i18n
  i18nNamespace?: string
  page?: string
  suspense?: ComponentType<PropsSuspense> | string
  theme?: Theme | string
}

const propsDefault: PropsApplication = {
  application: new AppModelApplication({}),
}

export const ContextApplication = createContext(propsDefault)
