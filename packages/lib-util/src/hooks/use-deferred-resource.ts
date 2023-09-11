import type { QueryResource } from '@gnowth/lib-types'
import { useEffect, useState } from 'react'

export function useDeferredResource(resource: QueryResource): QueryResource {
  const [resourceDeferred, setResourceDeferred] = useState(resource)

  useEffect(() => {
    // TODO only set resource if resource is resolved
    setResourceDeferred(resource)
  }, [resource])

  return resourceDeferred
}
