import type { TinaCMS } from 'tinacms'
import { defineConfig } from 'tinacms'

import schema, { Collection } from '../.tina/schema'

const SERVER_LOCAL_PORT = 3000
const CMS_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_CMS_TINA_CLIENT_ID
const CMS_TINA_LOCAL_PORT = 4001
const CMS_TINA_EDIT_BRANCH = 'cms-edit'

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

const configs = {
  apiOrigin: hostname === 'localhost' ? `http://${hostname}:${SERVER_LOCAL_PORT}` : `https://api.${hostname}`,
  apiContextDefault: '/boilerplate/v1',
  cmsOrigin:
    hostname === 'localhost' ? `http://${hostname}:${CMS_TINA_LOCAL_PORT}` : 'https://content.tinajs.io',
  cmsContext:
    hostname === 'localhost' ? '/graphql' : `/content/${CMS_TINA_CLIENT_ID}/github/${CMS_TINA_EDIT_BRANCH}`,
  webContext: '',
  webHostname: hostname,
}

async function addRouteMappingToTinaCMS(cms: TinaCMS) {
  const { RouteMappingPlugin } = await import('tinacms')
  const routeMapping = new RouteMappingPlugin((collection, document) => {
    if (collection.name === Collection.Page) {
      return `/recipe/${document._sys.filename}`
    }

    return `/recipe/${collection.name}/${document._sys.filename}`
  })

  cms.plugins.add(routeMapping)
}

export const configsTina = defineConfig({
  schema,
  apiURL: `${configs.cmsOrigin}${configs.cmsContext}`,
  cmsCallback: (cms) => {
    addRouteMappingToTinaCMS(cms)
    return cms
  },
})

export default configs
