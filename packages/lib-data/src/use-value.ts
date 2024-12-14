import { objectSet } from '@gnowth/lib-utils'
import { useCallback, useState } from 'react'
import { useLatest } from 'react-use'

import { DataName, DataValue, TokenMode } from './types'

type Props<Value> = Return<Value> & {
  mode?: TokenMode
}

// TODO: make value required
type Return<Value> = {
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  value: Value
}

export function useValue<Value extends DataValue>(props: Props<Value>): Return<Value> {
  const { mode = 'controlled', onChange } = props

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
