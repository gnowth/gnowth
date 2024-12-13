import { Theme } from '@gnowth/lib-theme'
import { ComponentType, createContext } from 'react'

import { AppModelApplication } from './app-model-application'
import { PropsBoundary, PropsFrame, PropsSuspense } from './types'

export type PropsApplication = {
  application: AppModelApplication
  boundary?: ComponentType<PropsBoundary> | null | string
  frame?: ComponentType<PropsFrame> | null | string
  page?: string
  suspense?: ComponentType<PropsSuspense> | string
  theme?: string | Theme
}

const propsDefault: PropsApplication = {
  application: new AppModelApplication({}),
}

export const ContextApplication = createContext(propsDefault)
