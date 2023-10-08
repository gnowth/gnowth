import { UtilError } from '@gnowth/lib-utils'

import { usePrevious } from './use-previous'

interface Configs {
  errorCustom?: Error
  skip?: boolean
}

const errorCustom = new UtilError({
  message: 'unexpected change in value',
  method: 'useEnsureConstant',
  package: '@gnowth/lib-utils',
})

export function useEnsureConstant<Value>(value: Value, configs?: Configs): void {
  const valuePrevious = usePrevious(value)

  if (value !== valuePrevious && !configs?.skip) {
    throw configs?.errorCustom || errorCustom
  }
}
