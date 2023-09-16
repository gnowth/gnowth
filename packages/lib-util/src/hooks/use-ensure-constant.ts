import { UtilError } from '../classes/util-error'
import { usePrevious } from './use-previous'

interface Configs {
  errorCustom?: Error
  skip?: boolean
}

const errorCustom = new UtilError({
  message: 'unexpected change in value',
  method: 'useEnsureConstant',
  package: '@gnowth/lib-util',
})

export function useEnsureConstant<Value>(value: Value, configs?: Configs): void {
  const valuePrevious = usePrevious(value)

  if (value !== valuePrevious && !configs?.skip) {
    throw configs?.errorCustom || errorCustom
  }
}
