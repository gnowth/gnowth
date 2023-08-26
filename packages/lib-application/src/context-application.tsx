import type { PropsFrame, PropsSuspense, Theme } from '@gnowth/lib-types'
import type { ComponentType } from 'react'
import React from 'react'

import AppModelApplication from './app-model-application'

export interface PropsApplication {
  application: AppModelApplication
  frame?: ComponentType<PropsFrame> | string | null
  page?: string
  suspense?: ComponentType<PropsSuspense> | string
  theme?: Theme | string
}

const propsDefault: PropsApplication = {
  application: new AppModelApplication({}),
}

const ContextApplication = React.createContext(propsDefault)

export default ContextApplication
