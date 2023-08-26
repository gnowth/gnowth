import _ from 'lodash'

type Optional<Type> = Partial<Type> | undefined

export const funcDefaults =
  <Obj>(...objects: Optional<Obj>[]) =>
  (object?: Obj): Obj =>
    Object.assign(
      {},
      ..._.reverse(objects)
        .concat([object])
        .map((obj) => _.omitBy(obj, _.isUndefined)),
    ) as Obj

export const utilDefaults = <Obj>(...objects: Optional<Obj>[]): Obj => funcDefaults(...objects)()
