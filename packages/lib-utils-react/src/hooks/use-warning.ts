import { UtilError } from '@gnowth/lib-utils'
import { useEffect } from 'react'

export function useWarning(error: UtilError, shouldWarn: boolean): void {
  useEffect(() => {
    // eslint-disable-next-line no-console
    if (shouldWarn) console.warn(error)
  }, [shouldWarn, error])
}
