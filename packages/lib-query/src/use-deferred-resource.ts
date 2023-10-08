import { useEffect, useState } from 'react'

import type { QueryResource } from './query-resource'

export function useDeferredResource<Value>(resource: QueryResource<Value>): QueryResource<Value> {
  const [resourceDeferred, setResourceDeferred] = useState(resource)

  useEffect(() => {
    // TODO only set resource if resource is resolved
    setResourceDeferred(resource)
  }, [resource])

  return resourceDeferred
}
