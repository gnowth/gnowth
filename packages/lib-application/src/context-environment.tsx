import { QueryResource } from '@gnowth/lib-query'
import { Theme } from '@gnowth/lib-theme'
import { ComponentType, createContext } from 'react'

import { AppModelEnvironment } from './app-model-environment'
import { PropsBoundary, PropsFrame, PropsLayout, PropsSuspense } from './types'

export interface PropsEnvironment {
  boundaries: Record<string, ComponentType<PropsBoundary> | undefined>
  environment: AppModelEnvironment
  frames: Record<string, ComponentType<PropsFrame> | undefined>
  layouts: Record<string, ComponentType<PropsLayout> | undefined>
  suspenses: Record<string, ComponentType<PropsSuspense> | undefined>
  themes: Record<string, Theme | undefined>
  whoami: QueryResource | null
  whoamiSet: (resource: QueryResource | null) => void
}

export const propsDefaultEnvironment: PropsEnvironment = {
  boundaries: {},
  environment: new AppModelEnvironment(),
  frames: {},
  layouts: {},
  suspenses: {},
  themes: {},
  whoami: null,
  whoamiSet: () => undefined,
}

export const ContextEnvironment = createContext(propsDefaultEnvironment)
