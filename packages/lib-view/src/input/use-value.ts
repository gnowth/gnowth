import type { DataName } from '@gnowth/lib-types'
import React from 'react'
import { TokenMode } from '@gnowth/lib-token'

interface ChangeEvent<Value> {
  target: {
    checked?: boolean
    value: Value
  }
}

export type ChangeEventHandler<Value> = (event: ChangeEvent<Value>) => Promise<void> | void

interface Return<Value> {
  name?: string
  value?: Value
  onChange?: ChangeEventHandler<Value>
  onSubmit?: ChangeEventHandler<Value>
}

interface PropsUseValue<Value> {
  mode?: TokenMode
  name?: DataName
  onChange?(value: Value, name?: DataName): void | Promise<void>
  onSubmit?(value: Value, name?: DataName): void | Promise<void>
  value?: Value
}

export function useValue<Value>(props: PropsUseValue<Value>, valueDefault?: Value): Return<Value> {
  const { mode = TokenMode.controlled, name, onChange, onSubmit, value = valueDefault } = props
  const [valueLocal, setValueLocal] = React.useState(value)

  const handleSubmitControlled = React.useCallback(
    ({ target }: ChangeEvent<Value>) => onSubmit?.(target.value, name),
    [name, onSubmit],
  )

  const handleChangeControlled = React.useCallback(
    ({ target }: ChangeEvent<Value>) => onChange?.(target.value, name),
    [name, onChange],
  )

  const handleChangeShadow = React.useCallback(
    ({ target }: ChangeEvent<Value>) => setValueLocal(target.value),
    [],
  )

  const handleChangeUncontrolled = React.useCallback(
    (event: ChangeEvent<Value>) => {
      handleChangeShadow(event)

      return handleChangeControlled(event)
    },
    [handleChangeControlled, handleChangeShadow],
  )

  return {
    name: Array.isArray(props.name) ? props.name.at(-1) : props.name,
    onChange: {
      [TokenMode.controlled]: handleChangeControlled,
      [TokenMode.shadow]: handleChangeShadow,
      [TokenMode.uncontrolled]: handleChangeUncontrolled,
    }[mode],
    onSubmit: mode === TokenMode.shadow ? handleChangeControlled : handleSubmitControlled,
    value: mode === TokenMode.controlled ? props.value ?? valueDefault : valueLocal,
  }
}
