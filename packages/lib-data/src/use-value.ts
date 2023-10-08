import type { DataName, DataValue } from '@gnowth/lib-types'
import { useState, useCallback } from 'react'
import { TokenMode } from '@gnowth/lib-token'
import { UtilError, useEnsureConstant, useRefValue } from '@gnowth/lib-util'
import { objectDefaults, objectSet } from '@gnowth/lib-utils'

interface Configs {
  errorCustomMode?: Error
  errorCustomValue?: Error
}

// TODO: make value required
interface Return<Value> {
  value: Value
  onChange?(value: Value, name?: DataName): void | Promise<void>
  onSubmit?(value: Value, name?: DataName): void | Promise<void>
}

interface Props<Value> extends Return<Value> {
  mode?: TokenMode
}

const configsDefault = {
  errorCustomMode: new UtilError({
    message: 'prop "mode" is not allowed to be changed. If this behaviour is needed, remount component',
    method: 'useValue',
    package: '@gnowth/lib-data',
  }),

  errorCustomValue: new UtilError({
    message: 'prop "value" is not allowed to be changed since component is in "uncontrolled" mode',
    method: 'useValue',
    package: '@gnowth/lib-data',
  }),
}

export function useValue<Value extends DataValue>(props: Props<Value>, configs: Configs = {}): Return<Value> {
  const { mode = TokenMode.controlled, onChange } = props
  const configsWithDefault = objectDefaults(configs, configsDefault)

  useEnsureConstant(props.mode, { errorCustom: configsWithDefault.errorCustomMode })
  useEnsureConstant(props.value, {
    errorCustom: configsWithDefault.errorCustomValue,
    skip: mode === TokenMode.controlled,
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
      [TokenMode.controlled]: handleChangeControlled,
      [TokenMode.shadow]: handleChangeShadow,
      [TokenMode.uncontrolled]: handleChangeUncontrolled,
    }[mode],
    onSubmit: mode === TokenMode.shadow ? props.onChange : props.onSubmit,
    value: mode === TokenMode.controlled ? props.value : value,
  }
}
