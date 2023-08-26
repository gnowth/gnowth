/* eslint-disable @typescript-eslint/ban-types */
import { utilDefaults } from './util-defaults'

type Optional<Type> = Partial<Type> | undefined

export const funcDefaultsDeepByKeys =
  <Obj extends {}>(keys: Array<keyof Obj>, ...objects: Optional<Obj>[]) =>
  (object?: Obj): Obj => {
    const objectTemp = utilDefaults(object, ...objects)

    return keys.reduce(
      (prev, key) => ({
        ...prev,
        [key]: utilDefaults(object?.[key], ...objects.map((obj) => obj?.[key])),
      }),
      objectTemp,
    )
  }

export const utilDefaultsDeepByKeys = <Obj extends {}>(
  keys: Array<keyof Obj>,
  object?: Obj,
  ...objects: Optional<Obj>[]
): Obj => funcDefaultsDeepByKeys(keys, ...objects)(object)
/* eslint-enable @typescript-eslint/ban-types */
