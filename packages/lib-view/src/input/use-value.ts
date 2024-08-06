import type { DataName, TokenMode } from '@gnowth/lib-data'

import { useCallback, useState } from 'react'

interface ChangeEvent<Value> {
  target: {
    checked?: boolean
    value: Value
  }
}

export type ChangeEventHandler<Value> = (event: ChangeEvent<Value>) => Promise<void> | void

interface Return<Value> {
  name?: string
  onChange?: ChangeEventHandler<Value>
  onSubmit?: ChangeEventHandler<Value>
  value?: Value
}

interface PropsUseValue<Value> {
  mode?: TokenMode
  name?: DataName
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  value?: Value
}

export function useValue<Value>(props: PropsUseValue<Value>, valueDefault?: Value): Return<Value> {
  const { mode = 'controlled', name, onChange, onSubmit, value = valueDefault } = props
  const [valueLocal, setValueLocal] = useState(value)

  const handleSubmitControlled = useCallback(
    ({ target }: ChangeEvent<Value>) => onSubmit?.(target.value, name),
    [name, onSubmit],
  )

  const handleChangeControlled = useCallback(
    ({ target }: ChangeEvent<Value>) => onChange?.(target.value, name),
    [name, onChange],
  )

  const handleChangeShadow = useCallback(({ target }: ChangeEvent<Value>) => setValueLocal(target.value), [])

  const handleChangeUncontrolled = useCallback(
    (event: ChangeEvent<Value>) => {
      handleChangeShadow(event)

      return handleChangeControlled(event)
    },
    [handleChangeControlled, handleChangeShadow],
  )

  return {
    name: Array.isArray(props.name) ? props.name.at(-1) : props.name,
    onChange: {
      controlled: handleChangeControlled,
      shadow: handleChangeShadow,
      uncontrolled: handleChangeUncontrolled,
    }[mode],
    onSubmit: mode === 'shadow' ? handleChangeControlled : handleSubmitControlled,
    value: mode === 'controlled' ? (props.value ?? valueDefault) : valueLocal,
  }
}
