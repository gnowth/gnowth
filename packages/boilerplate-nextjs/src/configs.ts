const SERVER_LOCAL_PORT = 3000

interface Window {
  location: {
    hostname: string
  }
}

// DEBT(hack): if we are doing server side rendering, setting the host this way won't be right
function getWindow(): Window | undefined {
  if (typeof window === 'undefined') return undefined
  return window
}

const hostname = getWindow()?.location.hostname ?? 'localhost'

export const configs = {
  apiOrigin: hostname === 'localhost' ? `http://${hostname}:${SERVER_LOCAL_PORT}` : `https://api.${hostname}`,
  apiContextDefault: '/boilerplate/v1',
  webContext: '',
  webHostname: hostname,
}
