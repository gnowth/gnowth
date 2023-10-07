import type { DataName } from '@gnowth/lib-types'
import _ from 'lodash'
import { produce } from 'immer'

// eslint-disable-next-line @typescript-eslint/ban-types
export const funcSet =
  (name: DataName, value: unknown) =>
  <Obj extends object>(object: Obj): Obj =>
    produce(object, (draft) => {
      _.set(draft, name, value)
    })

// eslint-disable-next-line @typescript-eslint/ban-types
export const utilSet = <Obj extends object>(object: Obj, name: DataName, value: unknown): Obj =>
  funcSet(name, value)(object)
