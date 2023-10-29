import { ErrorCustom } from '@gnowth/lib-utils'
import { useEffect } from 'react'

export function useWarning(error: ErrorCustom, shouldWarn: boolean): void {
  useEffect(() => {
    // eslint-disable-next-line no-console
    if (shouldWarn) console.warn(error)
  }, [shouldWarn, error])
}
