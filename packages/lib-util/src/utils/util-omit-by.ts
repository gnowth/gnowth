import _ from 'lodash'

export { default as utilOmitBy } from 'lodash/omitBy'

type Predicate<Obj, Key> = (value: Obj[keyof Obj], key: Key) => boolean

// eslint-disable-next-line @typescript-eslint/ban-types
export const funcOmitBy =
  <ObjIn extends ObjOut, ObjOut extends object>(predicate: Predicate<ObjIn, keyof ObjIn>) =>
  (object: ObjIn): ObjOut =>
    _.omitBy(object, predicate as Predicate<ObjIn, string>) as ObjOut
