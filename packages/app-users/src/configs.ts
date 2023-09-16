import type { Environment } from '@gnowth/configs-app'
import { makeConfigs } from '@gnowth/configs-app'

export type Configs = {
  apiContext: `/${string}`
  apiOrigin: `http${string}`
}

interface Window {
  location: {
    hostname: string
  }
}

const SERVER_LOCAL_PORT = 4000

// DEBT(hack): if we are doing server side rendering, setting the host this way won't be right
function getWindow(): Window | undefined {
  if (typeof window === 'undefined') return undefined
  return window
}

const hostname = getWindow()?.location.hostname ?? 'localhost'

const configsDefault = (env: Environment): Configs => ({
  apiContext: '/boilerplate',
  apiOrigin: env === 'local' ? `http://${hostname}:${SERVER_LOCAL_PORT}` : `https://api.${hostname}`,
})

export const createConfigs = makeConfigs(configsDefault)

export const configs = createConfigs()
