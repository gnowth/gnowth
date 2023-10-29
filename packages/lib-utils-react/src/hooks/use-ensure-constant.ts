import { ErrorCustom } from '@gnowth/lib-utils'

import { usePrevious } from './use-previous'

interface Configs {
  errorCustom?: Error
  skip?: boolean
}

const errorCustom = new ErrorCustom({
  code: 'lib-utils-react--use-ensure-constant--01',
  message: 'unexpected change in value',
  trace: {
    caller: 'useEnsureConstant',
    context: 'use-ensure-constant',
    source: '@gnowth/lib-utils',
  },
})

export function useEnsureConstant<Value>(value: Value, configs?: Configs): void {
  const valuePrevious = usePrevious(value)

  if (value !== valuePrevious && !configs?.skip) {
    throw configs?.errorCustom || errorCustom
  }
}
