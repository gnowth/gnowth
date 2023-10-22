import type { AppSetup } from '@gnowth/lib-react'
import { mockServer } from '@gnowth/lib-react'

type ConfigurationMock = { mockServer?: ReturnType<typeof mockServer> }
const setupMock: AppSetup<ConfigurationMock> = () => ({
  mockServer: process.env.NODE_ENV === 'development' ? mockServer({ env: 'development' }) : undefined,
})

export const setup = setupMock
