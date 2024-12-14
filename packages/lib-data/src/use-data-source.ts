import { objectDefaults, objectGet } from '@gnowth/lib-utils'
import { useCallback, useContext } from 'react'

import { DataContext } from './data-context'
import { DataName, DataValue, PropsData, TokenMode, WithConnect } from './types'
import { useValue } from './use-value'

export type PropsUseDataSource<Value> = PropsData<Value> & {
  context?: boolean
  mode?: TokenMode
  source?: unknown
}

export function useDataSource<Value extends DataValue>(
  props: PropsUseDataSource<Value>,
): PropsData<Value> & WithConnect {
  const { mode = 'controlled' } = props

  const context = useContext(DataContext) as PropsData<Value>
  const propsWithContext = objectDefaults(props, context)
  const onChangeFromProps = propsWithContext.onChange
  const nameFromProps = propsWithContext.name

  const handleChange = useCallback(
    (value: Value) => onChangeFromProps?.(value, nameFromProps),
    [nameFromProps, onChangeFromProps],
  )

  const { onChange, onSubmit, value } = useValue<Value>(
    // TODO: fix value type
    { ...propsWithContext, onChange: handleChange, value: props.value as Value },
  )

  const handleReset = useCallback(
    () => props.value && onChange?.(props.value, props.name),
    [onChange, props.name, props.value],
  )

  return {
    awaiting: props.awaiting,
    connect: <ValueConnect>(name?: DataName): PropsData<ValueConnect> => ({
      field: props.field?.getField(name),
      name,
      onChange: onChange as unknown as (value: ValueConnect, name?: DataName) => Promise<void> | void,
      value: (name ? objectGet(value, name) : value) as ValueConnect,
    }),
    disabled: props.disabled,
    errors: props.errors,
    field: props.field,
    name: props.name,
    onCancel: props.onCancel,
    onChange,
    onReset: mode === 'controlled' ? props.onReset : handleReset,
    onSubmit,
    value,
  }
}
