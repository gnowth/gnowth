import { objectDefaults, objectMapValues } from '@gnowth/lib-utils'
import * as R from 'remeda'

export const objectDefaultsDeep: typeof objectDefaults = (item, ...items) =>
  objectMapValues(objectDefaults(item, ...items), (value, key) =>
    R.isObjectType(value)
      ? objectDefaultsDeep(
          {},
          ...[item, ...items].map((item) => item?.[key] as unknown).filter(R.isObjectType),
        )
      : value,
  ) as typeof item
