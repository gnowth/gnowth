import type { UtilNamespaced } from '@gnowth/lib-utils'
import { objectMapValues } from '@gnowth/lib-utils'

export const namespacedMerge = <Value>(
  merges: (UtilNamespaced<UtilNamespaced<Value>> | undefined)[],
): UtilNamespaced<UtilNamespaced<Value>> =>
  objectMapValues(Object.assign({}, ...merges) as UtilNamespaced<UtilNamespaced<Value>>, (value, key) =>
    Object.assign({}, ...merges.map((merge) => merge?.[key])),
  )
