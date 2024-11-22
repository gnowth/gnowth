import { ErrorCustom, objectDefaults, objectSet } from '@gnowth/lib-utils'
import { useEnsureConstant } from '@gnowth/lib-utils-react'
import { useCallback, useState } from 'react'
import { useLatest } from 'react-use'

import { DataName, DataValue, TokenMode } from './types'

type Configs = {
  errorCustomMode?: Error
  errorCustomValue?: Error
}

// TODO: make value required
type Return<Value> = {
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  value: Value
}

type Props<Value> = {
  mode?: TokenMode
} & Return<Value>

const configsDefault = {
  errorCustomMode: new ErrorCustom({
    code: 'lib-data--use-value--01',
    message: 'prop "mode" is not allowed to be changed. If this behaviour is needed, remount component',
    trace: {
      caller: 'useValue',
      context: 'useValue',
      source: 'lib-data',
    },
  }),

  errorCustomValue: new ErrorCustom({
    code: 'lib-data--use-value--02',
    message: 'prop "value" is not allowed to be changed since component is in "uncontrolled" mode',
    trace: {
      caller: 'useValue',
      context: 'useValue',
      source: 'lib-data',
    },
  }),
}

export function useValue<Value extends DataValue>(props: Props<Value>, configs: Configs = {}): Return<Value> {
  const { mode = 'controlled', onChange } = props
  const configsWithDefault = objectDefaults(configs, configsDefault)

  useEnsureConstant(props.mode, { errorCustom: configsWithDefault.errorCustomMode })

  const valueRef = useLatest(props.value)
  const [value, setValue] = useState(props.value)

  const handleChangeControlled = useCallback<NonNullable<typeof onChange>>(
    (val, name) => onChange?.(name ? objectSet(valueRef.current, name, val) : val),
    [onChange, valueRef],
  )

  const handleChangeShadow = useCallback<NonNullable<typeof onChange>>(
    (val, name) => setValue((prevValue) => (name ? objectSet(prevValue, name, val) : prevValue)),
    [],
  )

  const handleChangeUncontrolled = useCallback<NonNullable<typeof onChange>>(
    async (val, name) => {
      await handleChangeShadow(val, name)

      await handleChangeControlled(val, name)
    },
    [handleChangeControlled, handleChangeShadow],
  )

  return {
    onChange: {
      controlled: handleChangeControlled,
      shadow: handleChangeShadow,
      uncontrolled: handleChangeUncontrolled,
    }[mode],
    onSubmit: mode === 'shadow' ? props.onChange : props.onSubmit,
    value: mode === 'controlled' ? props.value : value,
  }
}
