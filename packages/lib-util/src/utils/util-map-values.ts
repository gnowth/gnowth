import _ from 'lodash'

export { default as utilMapValues } from 'lodash/mapValues'

type Predicate<ObjIn, ObjOut> = (
  value: ObjIn[keyof ObjIn],
  key: keyof ObjIn,
  object: ObjIn,
) => ObjOut[keyof ObjOut]

// eslint-disable-next-line @typescript-eslint/ban-types
export const funcMapValues =
  <ObjIn extends object, ObjOut extends object>(predicate: Predicate<ObjIn, ObjOut>) =>
  (object: ObjIn): ObjOut =>
    _.mapValues(object, predicate) as ObjOut
