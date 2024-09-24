import { ErrorCustom } from '@gnowth/lib-utils'
import { useFirstMountState, usePrevious } from 'react-use'

interface Configs {
  errorCustom?: Error
  skip?: boolean
}

const errorCustom = new ErrorCustom({
  code: 'lib-utils-react--use-ensure-constant--01',
  message: 'unexpected change in value',
  trace: {
    caller: 'useEnsureConstant',
    context: 'useEnsureConstant',
    source: 'lib-utils',
  },
})

export function useEnsureConstant<Value>(value: Value, configs?: Configs): void {
  const valuePrevious = usePrevious(value)
  const isFirstMount = useFirstMountState()

  if (value !== valuePrevious && !configs?.skip && !isFirstMount) {
    throw configs?.errorCustom || errorCustom
  }
}
