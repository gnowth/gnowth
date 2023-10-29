import type { FunctionComponent, ReactNode } from 'react'
import { createContext, useCallback, useEffect, useReducer } from 'react'
import { ErrorCustom } from '@gnowth/lib-utils'

import type { AsyncStatus } from './types'
import { ModelPromise } from './model-promise'

// TODO check if we can get it from action map
type ActionTypes = 'add_promise' | 'reject' | 'remove_promise' | 'reset' | 'resolve'

interface ActionTypeMap {
  addPromise: 'add_promise'
  reject: 'reject'
  removePromise: 'remove_promise'
  reset: 'reset'
  resolve: 'resolve'
}

interface Action {
  errors?: Error[]
  payload?: Promise<unknown>
  type: ActionTypes
}

interface AsyncContext {
  addPromise: (promise: Promise<unknown>) => void
  errors: Error[]
  removePromise: (promise: Promise<unknown>) => void
  status: AsyncStatus
}

interface Props {
  children: ReactNode
}

interface State {
  errors: Error[]
  promises: Set<Promise<unknown>>
  status: AsyncStatus
}

export const AsyncContext = createContext<AsyncContext>({
  addPromise: () => {
    // eslint-disable-next-line no-console
    console.warn(
      new ErrorCustom({
        code: 'lib-async--async-context-01',
        message: 'must be used within an Async Provider',
        trace: {
          caller: 'addPromise',
          context: 'async-context',
          source: 'lib-async.AsyncContext',
        },
      }),
    )
  },
  errors: [],
  removePromise: () => {
    // eslint-disable-next-line no-console
    console.warn(
      new ErrorCustom({
        code: 'lib-async--async-context-02',
        message: 'must be used within an Async Provider',
        trace: {
          caller: 'removePromise',
          context: 'async-context',
          source: 'lib-async.AsyncContext',
        },
      }),
    )
  },
  status: ModelPromise.status.pending,
})

const initialState: State = {
  errors: [],
  promises: new Set<Promise<unknown>>(),
  status: 'pending',
}

const actions: ActionTypeMap = {
  addPromise: 'add_promise',
  reject: 'reject',
  removePromise: 'remove_promise',
  reset: 'reset',
  resolve: 'resolve',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.addPromise: {
      if (!action.payload) {
        throw new ErrorCustom({
          code: 'lib-async--async-context-03',
          message: 'payload must contain a promise',
          trace: {
            caller: 'reducer',
            context: 'async-context',
            source: 'lib-async.AsyncProvider',
          },
        })
      }

      return {
        errors: [],
        promises: state.promises.has(action.payload)
          ? state.promises
          : new Set(state.promises.add(action.payload)),
        status: ModelPromise.status.pending,
      }
    }

    case actions.reject: {
      if (!action.errors) {
        throw new ErrorCustom({
          code: 'lib-async--async-context-04',
          message: 'errors are required',
          trace: {
            caller: 'reducer',
            context: 'async-context',
            source: 'lib-async.AsyncProvider',
          },
        })
      }

      return {
        errors: state.errors.concat(action.errors),
        promises: state.promises,
        status: ModelPromise.status.rejected,
      }
    }

    case actions.removePromise: {
      if (!action.payload) {
        throw new ErrorCustom({
          code: 'lib-async--async-context-05',
          message: 'payload must contain a promise',
          trace: {
            caller: 'reducer',
            context: 'async-context',
            source: 'lib-async.AsyncProvider',
          },
        })
      }

      const didDelete = state.promises.delete(action.payload)

      if (!didDelete) {
        throw new ErrorCustom({
          code: 'lib-async--async-context-06',
          message: 'invalid promise provided',
          trace: {
            caller: 'reducer',
            context: 'async-context',
            source: 'lib-async.AsyncProvider',
          },
        })
      }

      return {
        errors: [],
        promises: state.promises,
        status: ModelPromise.status.pending,
      }
    }

    case actions.resolve:
      return {
        errors: state.errors,
        promises: state.promises,
        status: ModelPromise.status.resolved,
      }

    default:
      throw new ErrorCustom({
        code: 'lib-async--async-context-07',
        message: 'invalid action',
        trace: {
          caller: 'reducer',
          context: 'async-context',
          source: 'lib-async.AsyncProvider',
        },
      })
  }
}

export const AsyncProvider: FunctionComponent<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    Promise.all(state.promises)
      .then(() => dispatch({ type: actions.resolve }))
      .catch((error) => dispatch({ errors: [error], type: actions.reject }))

    // TODO: cleanup prevent dispatch if unmounted?
  }, [state.promises])

  const addPromise = useCallback((promise: Promise<unknown>) => {
    dispatch({
      payload: promise,
      type: actions.addPromise,
    })
  }, [])

  const removePromise = useCallback((promise: Promise<unknown>) => {
    dispatch({
      payload: promise,
      type: actions.removePromise,
    })
  }, [])

  return (
    <AsyncContext.Provider
      value={{
        addPromise,
        errors: state.errors,
        removePromise,
        status: state.status,
      }}
    >
      {props.children}
    </AsyncContext.Provider>
  )
}
