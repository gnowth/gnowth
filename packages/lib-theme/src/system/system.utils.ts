import { guardObject, objectDefaults, objectMapValues } from '@gnowth/lib-utils'

export const objectDefaultsDeep: typeof objectDefaults = (item, ...items) =>
  objectMapValues(objectDefaults(item, ...items), (value, key) =>
    guardObject(value)
      ? objectDefaultsDeep({}, ...[item, ...items].map((item) => item?.[key] as unknown).filter(guardObject))
      : value,
  ) as typeof item
