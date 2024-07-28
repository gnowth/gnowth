import type { FunctionComponent, ReactNode } from 'react'

import { useAsyncPromise } from '../hooks/use-async-promise'
import { PromiseModel } from '../modules/promises'

interface Props {
  children: ReactNode
  promise: Promise<unknown>
}

// TODO: load processing/error display component from theme
export const AsyncSuspense: FunctionComponent<Props> = (props) => {
  const asyncPromise = useAsyncPromise(props.promise)

  if (asyncPromise.status === PromiseModel.status.pending) {
    return <>Processing</>
  }

  if (asyncPromise.status === PromiseModel.status.rejected) {
    return <>Has errors</>
  }

  return <>{props.children}</>
}
