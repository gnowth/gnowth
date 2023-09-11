import React from 'react'

import { ModelPromise } from './model-promise'
import { useAsyncPromise } from './use-async-promise'

interface Props {
  children: React.ReactNode
  promise: Promise<unknown>
}

// TODO: load processing/error display component from theme
export const AsyncSuspense: React.FunctionComponent<Props> = (props) => {
  const asyncPromise = useAsyncPromise(props.promise)

  if (asyncPromise.status === ModelPromise.status.pending) {
    return <>Processing</>
  }

  if (asyncPromise.status === ModelPromise.status.rejected) {
    return <>Has errors</>
  }

  return <>{props.children}</>
}
