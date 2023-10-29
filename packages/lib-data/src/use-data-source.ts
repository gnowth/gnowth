import { useContext, useCallback } from 'react'
import { useEnsureConstant } from '@gnowth/lib-utils-react'
import { objectDefaults, objectGet, ErrorCustom } from '@gnowth/lib-utils'

import type { DataName, DataValue, PropsData, TokenMode, WithConnect } from './types'
import { DataContext } from './data-context'
import { useValue } from './use-value'

interface Configs {
  errorCustomContext?: Error
  errorCustomMode?: Error
  errorCustomValue?: Error
}

export interface PropsUseDataSource<Value> extends PropsData<Value> {
  context?: boolean
  mode?: TokenMode
  source?: string | unknown
}

const configsDefault = {
  errorCustomContext: new ErrorCustom({
    code: 'lib-data--user-data-source--01',
    message: 'props "context" is not allowed to be changed. If this behaviour is needed, remount component',
    trace: {
      caller: 'useDataSource',
      context: 'use-data-source',
      source: '@gnowth/lib-data',
    },
  }),

  errorCustomMode: new ErrorCustom({
    code: 'lib-data--user-data-source--02',
    message: 'props "mode" is not allowed to be changed. If this behaviour is needed, remount component',
    trace: {
      caller: 'useDataSource',
      context: 'use-data-source',
      source: '@gnowth/lib-data',
    },
  }),

  errorCustomValue: new ErrorCustom({
    code: 'lib-data--user-data-source--03',
    message: 'props "value" is not allowed to be changed since component is in "uncontrolled" mode',
    trace: {
      caller: 'useDataSource',
      context: 'use-data-source',
      source: '@gnowth/lib-data',
    },
  }),
}

export function useDataSource<Value extends DataValue>(
  props: PropsUseDataSource<Value>,
  configs: Configs = {},
): PropsData<Value> & WithConnect {
  const { mode = 'controlled' } = props
  const configsWithDefault = objectDefaults(configs, configsDefault)
  useEnsureConstant(props.context, { errorCustom: configsWithDefault.errorCustomContext })

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
    configsWithDefault,
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
      onChange: onChange as unknown as (value: ValueConnect, name?: DataName) => void | Promise<void>,
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
