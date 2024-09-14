import type { DependencyList } from 'react'

import { useMemo } from 'react'
import { use } from 'react-use-polyfill'

export const useAsyncSuspense = <TResult>(
  asyncFn: () => Promise<TResult>,
  dependencies?: DependencyList,
): TResult => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = useMemo(() => asyncFn(), dependencies ?? [])
  return use(promise)
}
