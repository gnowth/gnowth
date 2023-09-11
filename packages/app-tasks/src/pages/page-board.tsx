import React from 'react'
import { AsyncSuspense, useAsyncPromise, useAsyncQuery } from '@gnowth/lib-react'

export const PageBoard: React.FunctionComponent = () => {
  const asyncQuery = useAsyncQuery(() => Promise.resolve({ value: 'Board' }))
  const asyncPromise = useAsyncPromise(asyncQuery.promise)

  return <AsyncSuspense promise={asyncQuery.promise}>{asyncPromise.value?.value}</AsyncSuspense>
}
