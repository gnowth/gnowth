import { useCallback, useContext, useEffect, useState } from 'react'

import { AsyncContext } from '../components/async-context'

interface Configs {
  dependencies?: Array<unknown>
  trackingSkip?: boolean
}

interface Predicate<Value> {
  (): Promise<Value>
}

interface Query<Value> {
  promise: Promise<Value>
  reload: () => void
}

export function useAsyncQuery<Value>(predicate: Predicate<Value>, configs?: Configs): Query<Value> {
  const [firstPass, setFirstPass] = useState(true)
  const [promise, setPromise] = useState(predicate)
  const { addPromise, removePromise } = useContext(AsyncContext)
  const { trackingSkip } = configs || {}

  useEffect(
    () => {
      // TODO: check if there is a better way to have promise as a value from the start
      if (!firstPass) setPromise(predicate())
      setFirstPass(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    configs?.dependencies || [],
  )

  useEffect(() => {
    if (!trackingSkip) addPromise(promise)

    return () => {
      if (!trackingSkip) removePromise(promise)
    }
  }, [addPromise, promise, removePromise, trackingSkip])

  return {
    promise,
    reload: useCallback(() => setPromise(predicate()), [predicate]),
  }
}
