import React from 'react'

import UtilError from '../classes/util-error'

function useWarning(error: UtilError, shouldWarn: boolean): void {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    if (shouldWarn) console.warn(error)
  }, [shouldWarn, error])
}

export default useWarning
