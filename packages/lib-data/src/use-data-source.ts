import type { DataName, DataValue, PropsData } from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { TokenMode } from '@gnowth/lib-token'
import { UtilError, useUtilEnsureConstant, utils } from '@gnowth/lib-util'

import type { WithConnect } from './types'
import DataContext from './data-context'
import useValue from './use-value'

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
  errorCustomContext: new UtilError({
    message: 'props "context" is not allowed to be changed. If this behaviour is needed, remount component',
    method: 'useDataSource',
    package: '@gnowth/lib-data',
  }),

  errorCustomMode: new UtilError({
    message: 'props "mode" is not allowed to be changed. If this behaviour is needed, remount component',
    method: 'useDataSource',
    package: '@gnowth/lib-data',
  }),

  errorCustomValue: new UtilError({
    message: 'props "value" is not allowed to be changed since component is in "uncontrolled" mode',
    method: 'useDataSource',
    package: '@gnowth/lib-data',
  }),
}

function useDataSource<Value extends DataValue>(
  props: PropsUseDataSource<Value>,
  configs?: Configs,
): PropsData<Value> & WithConnect {
  const { mode = TokenMode.controlled } = props
  const configsWithDefault = utils.defaults(configs, configsDefault)
  useUtilEnsureConstant(props.context, { errorCustom: configsWithDefault.errorCustomContext })

  const context = React.useContext(DataContext) as PropsData<Value>
  const propsWithContext = utils.defaults(props, context)
  const onChangeFromProps = propsWithContext.onChange
  const nameFromProps = propsWithContext.name

  const handleChange = React.useCallback(
    (value: Value) => onChangeFromProps?.(value, nameFromProps),
    [nameFromProps, onChangeFromProps],
  )

  const { onChange, onSubmit, value } = useValue<Value>(
    { ...propsWithContext, onChange: handleChange },
    configsWithDefault,
  )

  const handleReset = React.useCallback(
    () => props.value && onChange?.(props.value, props.name),
    [onChange, props.name, props.value],
  )

  return {
    onChange,
    onSubmit,
    value,
    awaiting: props.awaiting,
    disabled: props.disabled,
    errors: props.errors,
    field: props.field,
    name: props.name,
    connect: <ValueConnect>(name?: DataName): PropsData<ValueConnect> => ({
      name,
      field: props.field?.getField(name),
      onChange: onChange as unknown as (value: ValueConnect, name?: DataName) => void | Promise<void>,
      value: (name ? _.get(value, name) : value) as ValueConnect,
    }),
    onCancel: props.onCancel,
    onReset: mode === TokenMode.controlled ? props.onReset : handleReset,
  }
}

export default useDataSource