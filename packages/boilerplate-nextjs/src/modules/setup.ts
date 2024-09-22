import { AppSetup } from '@gnowth/lib-application'

import { makeServer } from './make-server'

type ConfigurationMockServer = { mockServer: ReturnType<typeof makeServer> }
export const setup: AppSetup<ConfigurationMockServer> = () => {
  const mockServer = makeServer({ environment: process.env.NODE_ENV ?? 'development' })

  // Note: uncomment code below to remove miragejs in production mode
  // let server
  // if (process.env.NODE_ENV === 'development') {
  //   server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  // }

  return { mockServer }
}
