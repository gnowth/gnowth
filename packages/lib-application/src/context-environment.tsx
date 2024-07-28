import type { QueryResource } from '@gnowth/lib-query'
import type { Theme } from '@gnowth/lib-theme'
import type { ComponentType } from 'react'

import { createContext } from 'react'

import type { PropsBoundary, PropsFrame, PropsLayout, PropsSuspense } from './types'

import { AppModelEnvironment } from './app-model-environment'

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
