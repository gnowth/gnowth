import { useEffect, useState } from 'react'

import { QueryResource } from './query-resource'

export function useDeferredResource<Value>(resource: QueryResource<Value>): QueryResource<Value> {
  const [resourceDeferred, setResourceDeferred] = useState(resource)

  useEffect(() => {
    setResourceDeferred(resource)
  }, [resource])

  return resourceDeferred
}
