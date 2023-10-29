import type { AppSetup } from '@gnowth/lib-react'
import { appSetupCompose, mockServer } from '@gnowth/lib-react'

import { AppModelEnvironmentMono } from './app-model-environment'

type ConfigurationMock = { mockServer?: ReturnType<typeof mockServer> }
const setupMock: AppSetup<ConfigurationMock> = () => ({
  mockServer: process.env.NODE_ENV === 'development' ? mockServer({ env: 'development' }) : undefined,
})

type ConfigurationEnvironment = { appModelEnvironment: AppModelEnvironmentMono }
const setupEnvironment: AppSetup<ConfigurationEnvironment> = () => ({
  appModelEnvironment: new AppModelEnvironmentMono(),
})

export const setup = appSetupCompose(setupMock, setupEnvironment)
