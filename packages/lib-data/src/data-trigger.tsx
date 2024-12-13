import { AppBoundary, AppTheme, useAppTheme } from '@gnowth/lib-application'
import { Theme } from '@gnowth/lib-theme'
import { ErrorCustom, objectDefaults, UtilRequired } from '@gnowth/lib-utils'
import { ComponentType, createElement, ReactElement, useCallback, useContext, useState } from 'react'
import { useLatest } from 'react-use'

import { DataContext } from './data-context'
import { DataName } from './types'

type Props<Value> = {
  action?: (value: Value, name?: DataName) => Promise<Value> | Value
  component?: ComponentType<PropsComponent> | string
  componentPalette?: string
  componentProps?: Record<string, unknown>
  componentValue?: string
  componentVariant?: string
  event?: string
  hidden?: boolean
  onResolve?: () => Promise<void> | void
  submit?: boolean
  theme?: string | Theme
}

type PropsComponent = {
  disabled?: boolean
  palette?: string
  progressHidden?: boolean
  textValue?: string
  variant?: string
}

const propsDefault = {
  component: 'button',
  event: 'onClick',
}

// TODO: standardise handling async error
export function DataTrigger<Value>(props: Readonly<Props<Value>>): null | ReactElement {
  const context = useContext(DataContext)
  const refValue = useLatest(context.value as Value)
  const theme = useAppTheme(props.theme)
  const handleChange = props.submit ? context.onSubmit : context.onChange
  const { name } = context
  const { action = (x) => x, onResolve } = props

  const [awaiting, setAwaiting] = useState(false)
  const handleEvent = useCallback(async () => {
    setAwaiting(true)
    const output = await action?.(refValue.current, name)
    await handleChange?.(output, name)
    await onResolve?.()
    setAwaiting(false)
  }, [action, handleChange, name, onResolve, refValue])

  if (props.hidden) return null

  const propsWithDefault = objectDefaults(props as UtilRequired<Props<Value>, 'event'>, propsDefault)

  const Component = theme.getComponent({ component: propsWithDefault.component })

  if (!Component) {
    throw new ErrorCustom({
      code: 'lib-data--data-trigger--01',
      message:
        'unable to get component. Check props "component" or "type" or "theme" or "field" from dataSource',
      trace: {
        caller: 'DataTrigger',
        context: 'DataTrigger',
        source: 'lib-data',
      },
    })
  }

  const component = createElement(Component, {
    ...propsWithDefault.componentProps,
    disabled: awaiting, // TODO check if error is processing
    palette: propsWithDefault.componentPalette,
    progressHidden: !awaiting,
    [propsWithDefault.event]: handleEvent,
    textValue: propsWithDefault.componentValue,
    variant: propsWithDefault.componentVariant,
  })

  return (
    <AppTheme theme={props.theme}>
      <AppBoundary>{component}</AppBoundary>
    </AppTheme>
  )
}
