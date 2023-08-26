/* eslint-disable @typescript-eslint/ban-types */
import { utilDefaults } from './util-defaults'

type Optional<Type> = Partial<Type> | undefined

// TODO: instance where not all field value is an object
export const funcDefaultsDeep =
  <Obj extends {}>(...objects: Optional<Obj>[]) =>
  (object?: Obj): Obj => {
    const objectTemp = utilDefaults(object, ...objects) as unknown as Record<string, unknown>

    return Object.keys(objectTemp).reduce((prev, key) => {
      const value = objectTemp[key] as Record<string, unknown>

      return Object.assign(prev, {
        [key]:
          value?.constructor === Object
            ? funcDefaultsDeep(...objects.map((obj) => obj?.[key as keyof Obj]))(object?.[key as keyof Obj])
            : value,
      })
    }, {} as Obj)
  }

export const utilDefaultsDeep = <Obj extends {}>(object?: Obj, ...objects: Optional<Obj>[]): Obj =>
  funcDefaultsDeep(...objects)(object)
/* eslint-enable @typescript-eslint/ban-types */
