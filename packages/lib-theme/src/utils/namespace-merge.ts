import { UtilNamespaced } from '@gnowth/lib-utils'
import * as R from 'remeda'

export const namespacedMerge = <Value>(
  merges: (UtilNamespaced<UtilNamespaced<Value>> | undefined)[],
): UtilNamespaced<UtilNamespaced<Value>> =>
  R.mapValues(Object.assign({}, ...merges) as UtilNamespaced<UtilNamespaced<Value>>, (_value, key) =>
    Object.assign({}, ...merges.map((merge) => merge?.[key])),
  )
