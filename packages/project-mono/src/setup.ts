// eslint-disable-next-line import/no-extraneous-dependencies
import { mockServer } from '@gnowth/lib-mock'
import { chain } from '@gnowth/lib-utils'

// TODO: fix types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setupDummy = () => (_settings: unknown) => undefined

const setupMock = () => () => {
  if (process.env.NODE_ENV === 'development') {
    mockServer({ env: 'development' })
  }
}

export const setup = chain(setupMock(), setupDummy())
