import type { Theme } from '@gnowth/lib-theme'
import type { ComponentType } from 'react'

import { createContext } from 'react'

import type { PropsBoundary, PropsFrame, PropsSuspense } from './types'

import { AppModelApplication } from './app-model-application'

export interface PropsApplication {
  application: AppModelApplication
  boundary?: ComponentType<PropsBoundary> | null | string
  frame?: ComponentType<PropsFrame> | null | string
  page?: string
  suspense?: ComponentType<PropsSuspense> | string
  theme?: Theme | string
}

const propsDefault: PropsApplication = {
  application: new AppModelApplication({}),
}

export const ContextApplication = createContext(propsDefault)
