import _ from 'lodash'
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockServer } from '@gnowth/lib-mock'

// TODO: fix types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setupDummy = () => (_settings: unknown) => undefined

const setupMock = () => () => {
  if (process.env.NODE_ENV === 'development') {
    mockServer({ env: 'development' })
  }
}

export default _.flowRight(setupMock(), setupDummy())
