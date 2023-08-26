import _ from 'lodash'

export { default as utilPickBy } from 'lodash/pickBy'

type Predicate<Obj, Key> = (value: Obj[keyof Obj], key: Key) => boolean

// eslint-disable-next-line @typescript-eslint/ban-types
export const funcPickBy =
  <ObjIn extends ObjOut, ObjOut extends object>(predicate: Predicate<ObjIn, keyof ObjIn>) =>
  (object: ObjIn): ObjOut =>
    _.pickBy(object, predicate as Predicate<ObjIn, string>) as ObjOut
