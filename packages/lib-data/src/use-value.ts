import { ErrorCustom, objectDefaults, objectSet } from '@gnowth/lib-utils'
import { useEnsureConstant, useRefValue } from '@gnowth/lib-utils-react'
import { useCallback, useState } from 'react'

import { DataName, DataValue, TokenMode } from './types'

interface Configs {
  errorCustomMode?: Error
  errorCustomValue?: Error
}

// TODO: make value required
interface Return<Value> {
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  value: Value
}

interface Props<Value> extends Return<Value> {
  mode?: TokenMode
}

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
  useEnsureConstant(props.value, {
    errorCustom: configsWithDefault.errorCustomValue,
    skip: mode === 'controlled',
  })

  const valueRef = useRefValue(props.value)
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
