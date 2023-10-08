import type { AsyncStatus } from '@gnowth/lib-types'
import { useEffect, useReducer } from 'react'
import { UtilError } from '@gnowth/lib-utils'

import { ModelPromise } from './model-promise'

type ActionTypes = 'reject' | 'reset' | 'resolve'

interface ActionTypeMap {
  reject: 'reject'
  reset: 'reset'
  resolve: 'resolve'
}

interface Action<Value> {
  type: ActionTypes
  value?: Value
  errors?: Error[]
}

interface State<Value> {
  errors: Error[]
  status: AsyncStatus
  value?: Value | undefined
}

const actions: ActionTypeMap = {
  reject: 'reject',
  reset: 'reset',
  resolve: 'resolve',
}

const initialState = {
  errors: [],
  status: ModelPromise.status.pending,
}

function reducer<Value>(state: State<Value>, action: Action<Value>): State<Value> {
  switch (action.type) {
    case actions.reject: {
      if (!action.errors) {
        throw new UtilError({
          message: 'errors are required',
          method: 'reducer',
          package: 'lib-async.useAsyncPromise',
        })
      }

      return {
        errors: action.errors,
        status: ModelPromise.status.rejected,
        value: state.value,
      }
    }

    case actions.reset:
      return initialState

    case actions.resolve:
      return {
        errors: state.errors.length === 0 ? state.errors : [],
        status: ModelPromise.status.resolved,
        value: action.value,
      }

    default:
      throw new Error()
  }
}

// TODO: fix typescript
export function useAsyncPromise<Value>(maybePromise?: Promise<Value>): State<Value> {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: actions.reset })

    const promise = maybePromise || Promise.resolve<Value>(undefined as unknown as Value)

    promise
      .then((value) => dispatch({ type: actions.resolve, value }))
      .catch((error) => dispatch({ errors: [error], type: actions.reject }))

    // TODO: cleanup to prevent dispatch after unmounting
  }, [maybePromise])

  return state as State<Value>
}
