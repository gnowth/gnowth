const LOCAL_SERVER_PORT = 3000

interface Window {
	location: {
		hostname: string
	}
}

// DEBT: if we are doing server side rendering, setting the host this way won't be right
function getWindow(): Window | undefined {
	if (typeof window === 'undefined') return undefined
	return window
}

const hostname = getWindow()?.location.hostname ?? 'localhost'

const configs = {
	apiOrigin:
		hostname === 'localhost' ? `https://${hostname}:${LOCAL_SERVER_PORT}` : `https://api.${hostname}`,
	apiContextDefault: '/boilerplate/v1',
	webContext: '',
	webHostname: hostname,
}

export default configs
