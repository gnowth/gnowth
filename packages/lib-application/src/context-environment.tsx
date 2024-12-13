import { Theme } from '@gnowth/lib-theme'
import { ComponentType, createContext } from 'react'

import { AppModelEnvironment } from './app-model-environment'
import { QueryResource } from './queries/query-resource'
import { PropsBoundary, PropsFrame, PropsLayout, PropsSuspense } from './types'

export type PropsEnvironment = {
  boundaries: Record<string, ComponentType<PropsBoundary> | undefined>
  environment: AppModelEnvironment
  frames: Record<string, ComponentType<PropsFrame> | undefined>
  layouts: Record<string, ComponentType<PropsLayout> | undefined>
  suspenses: Record<string, ComponentType<PropsSuspense> | undefined>
  themes: Record<string, Theme | undefined>
  whoami: null | QueryResource
  whoamiSet: (resource: null | QueryResource) => void
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
