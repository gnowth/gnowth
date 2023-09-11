import type { DataName, Theme } from '@gnowth/lib-types'
import type { ReactElement } from 'react'
import React from 'react'
import { AppBoundary, AppTheme, useAppTheme } from '@gnowth/lib-application'
import { UtilError, useUtilRefValue } from '@gnowth/lib-util'
import { UtilRequired, objectDefaults } from '@gnowth/lib-utils'

import DataContext from './data-context'

interface PropsComponent {
  disabled?: boolean
  palette?: string
  progressHidden?: boolean
  textValue?: string
  variant?: string
}

interface Props<Value> {
  action?: (value: Value, name?: DataName) => Promise<Value> | Value
  component?: React.ComponentType<PropsComponent> | string
  componentPalette?: string
  componentProps?: Record<string, unknown>
  componentValue?: string
  componentVariant?: string
  event?: string
  hidden?: boolean
  onResolve?: () => Promise<void> | void
  theme?: Theme | string
  submit?: boolean
}

const errorCustomComponent = new UtilError({
  message: 'unable to get component. Check props "component" or "type" or "theme" or "field" from dataSource',
  method: 'DataTrigger',
  package: '@gnowth/lib-application',
})

const propsDefault = {
  component: 'button',
  event: 'onClick',
}

// TODO: standardise handling async error
function DataTrigger<Value>(props: Props<Value>): ReactElement | null {
  const context = React.useContext(DataContext)
  const refValue = useUtilRefValue(context.value as Value)
  const theme = useAppTheme(props.theme)
  const handleChange = props.submit ? context.onSubmit : context.onChange
  const { name } = context
  const { action = (x) => x, onResolve } = props

  const [awaiting, setAwaiting] = React.useState(false)
  const handleEvent = React.useCallback(async () => {
    setAwaiting(true)
    const output = await action?.(refValue.current, name)
    await handleChange?.(output, name)
    await onResolve?.()
    setAwaiting(false)
  }, [action, handleChange, name, onResolve, refValue])

  if (props.hidden) return null

  const propsWithDefault = objectDefaults(props as UtilRequired<Props<Value>, 'event'>, propsDefault)

  const Component = theme.getComponent({
    component: propsWithDefault.component,
    namespace: 'type',
  })

  if (!Component) throw errorCustomComponent

  const component = React.createElement(Component, {
    ...propsWithDefault.componentProps,
    [propsWithDefault.event]: handleEvent,
    disabled: awaiting, // TODO check if error is processing
    palette: propsWithDefault.componentPalette,
    progressHidden: !awaiting,
    textValue: propsWithDefault.componentValue,
    variant: propsWithDefault.componentVariant,
  })

  return (
    <AppTheme theme={props.theme}>
      <AppBoundary>{component}</AppBoundary>
    </AppTheme>
  )
}

export default DataTrigger
