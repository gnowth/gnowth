import type { DependencyList } from 'react'

import { useMemo } from 'react'
import { useLatest } from 'react-use'
import { use } from 'react-use-polyfill'

export const useAsyncSuspense = <TResult>(
  asyncFn: () => Promise<TResult>,
  dependencies: DependencyList = [],
): TResult => {
  const functionRef = useLatest(asyncFn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = useMemo(() => functionRef.current(), [functionRef, ...dependencies])
  return use(promise)
}
