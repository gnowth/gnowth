import type { ObjectLiteral } from '@gnowth/lib-utils'
import { guardObject, objectDefaults, objectMapValues } from '@gnowth/lib-utils'

type ObjectDefaultsDeepByKeys = <Output extends ObjectLiteral>(
  keys: Array<keyof Output>,
  item: Output,
  ...items: Partial<Output | undefined>[]
) => Output

export const objectDefaultsDeepByKeys: ObjectDefaultsDeepByKeys = (keys, item, ...items) =>
  objectMapValues(objectDefaults(item, ...items), (value, key) =>
    keys.includes(key)
      ? objectDefaults({}, ...[item, ...items].map((item) => item?.[key] as unknown).filter(guardObject))
      : value,
  ) as typeof item
