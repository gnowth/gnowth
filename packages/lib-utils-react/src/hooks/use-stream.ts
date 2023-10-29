import type { Observable } from 'rxjs'
import { useEffect, useState } from 'react'

export function useStream<Type>(stream: Observable<Type>, action?: (data: Type) => void) {
  const [data, setData] = useState<Type | undefined>()

  useEffect(() => {
    const subscription = stream.subscribe((output) => {
      setData(output)
      action?.(output)
    })

    return () => subscription.unsubscribe()
  }, [stream, action])

  return data
}
