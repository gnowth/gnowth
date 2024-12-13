const SERVER_LOCAL_PORT = 3000

type Window = {
  location: {
    hostname: string
  }
}

// DEBT(hack): if we are doing server side rendering, setting the host this way won't be right
function getWindow(): undefined | Window {
  if (typeof window === 'undefined') return undefined
  return window
}

const hostname = getWindow()?.location.hostname ?? 'localhost'

export const configs = {
  apiContextDefault: '/boilerplate/v1',
  apiOrigin: hostname === 'localhost' ? `http://${hostname}:${SERVER_LOCAL_PORT}` : `https://api.${hostname}`,
  webContext: '',
  webHostname: hostname,
}

//allow to run other environment from command
// allow to run specific environment in preview
