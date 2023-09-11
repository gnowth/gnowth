import type { DataName, DataValue } from '@gnowth/lib-types'
import React from 'react'
import { TokenMode } from '@gnowth/lib-token'
import { UtilError, useUtilEnsureConstant, useUtilRefValue, utils } from '@gnowth/lib-util'
import { objectDefaults } from '@gnowth/lib-utils'

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

function useValue<Value extends DataValue>(props: Props<Value>, configs: Configs = {}): Return<Value> {
  const { mode = TokenMode.controlled, onChange } = props
  const configsWithDefault = objectDefaults(configs, configsDefault)

  useUtilEnsureConstant(props.mode, { errorCustom: configsWithDefault.errorCustomMode })
  useUtilEnsureConstant(props.value, {
    errorCustom: configsWithDefault.errorCustomValue,
    skip: mode === TokenMode.controlled,
  })

  const valueRef = useUtilRefValue(props.value)
  const [value, setValue] = React.useState(props.value)

  const handleChangeControlled = React.useCallback<NonNullable<typeof onChange>>(
    (val, name) => onChange?.(name ? utils.set(valueRef.current, name, val) : val),
    [onChange, valueRef],
  )

  const handleChangeShadow = React.useCallback<NonNullable<typeof onChange>>(
    (val, name) => setValue((prevValue) => (name ? utils.set(prevValue, name, val) : prevValue)),
    [],
  )

  const handleChangeUncontrolled = React.useCallback<NonNullable<typeof onChange>>(
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

export default useValue
