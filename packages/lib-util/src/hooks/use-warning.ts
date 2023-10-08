import { useEffect } from 'react'

import { UtilError } from '../classes/util-error'

export function useWarning(error: UtilError, shouldWarn: boolean): void {
  useEffect(() => {
    // eslint-disable-next-line no-console
    if (shouldWarn) console.warn(error)
  }, [shouldWarn, error])
}
