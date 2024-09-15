import {
  AppBoundary,
  AppLayout,
  AppSuspense,
  AppTheme,
  PropsBoundary,
  PropsLayout,
  PropsSuspense,
  useAppTheme,
} from '@gnowth/lib-application'
import { Model } from '@gnowth/lib-model'
import { Theme } from '@gnowth/lib-theme'
import { ErrorCustom, objectDefaults } from '@gnowth/lib-utils'
import { Slottable } from '@gnowth/lib-utils-react'
import { ComponentType, FunctionComponent } from 'react'

import { DataWarning } from './data-warning'
import { PropsData, PropsDataReadonly } from './types'
import { PropsUseDataConnect, useDataConnect } from './use-data-connect'

interface PropsComponent extends PropsData, Slottable {
  placeholder?: string
  variant?: string
}

interface Props extends PropsUseDataConnect {
  awaiting?: boolean
  component?: ComponentType<PropsComponent> | string
  componentVariant?: string
  hidden?: boolean
  id?: string
  label?: ComponentType<PropsDataReadonly & Slottable> | string
  labelValue?: string
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutVariant?: string
  many?: boolean
  placeholder?: string
  readonly?: boolean
  slot?: string
  suspense?: ComponentType<PropsSuspense> | null | string
  suspenseClassName?: string
  theme?: Theme | string
  warning?: ComponentType<PropsBoundary> | null | string
  warningModel?: Model
}

const propsDefault = {
  label: 'label',
  layout: 'data',
}

// TODO: also get type from field
// TODO: get label component properly with default etc... and also finding the right props
// TODO: should be able to display a disabled Component if data is loading and a loading next to it
// TODO: option to show loading if errors is processing
// TODO: add transition if array
// TODO: convert to generic?
export const DataConnect: FunctionComponent<Props> = (props) => {
  const connection = useDataConnect(props)
  const theme = useAppTheme(props.theme)

  if (props.hidden) return null

  const propsWithDefault = objectDefaults(props, propsDefault)

  const LabelComponent = theme.getComponent({ component: propsWithDefault.label })

  const Component = theme.getComponent({
    component: propsWithDefault.component ?? connection.field?.type,
    componentNamespace: propsWithDefault.readonly ? 'type' : 'input',
  })

  if (!Component) {
    throw new ErrorCustom({
      code: 'lib-data--data-connect--01',
      message:
        'unable to get component. Check props "component" or "type" or "theme" or "field" from dataSource',
      trace: {
        caller: 'DataConnect',
        context: 'DataConnect',
        source: 'lib-data',
      },
    })
  }

  return (
    <AppTheme theme={propsWithDefault.theme}>
      <AppBoundary>
        <AppSuspense
          awaiting={!!propsWithDefault.suspense && !!connection.awaiting}
          suspense={propsWithDefault.suspense}
          suspenseClassName={propsWithDefault.suspenseClassName}
        >
          <AppLayout
            layout={propsWithDefault.layout}
            layoutProps={propsWithDefault.layoutProps}
            layoutVariant={propsWithDefault.layoutVariant}
          >
            {propsWithDefault.labelValue && LabelComponent && (
              <LabelComponent id={connection.id} slot="label" value={propsWithDefault.labelValue} />
            )}

            <Component
              awaiting={connection.awaiting}
              disabled={connection.disabled}
              errors={connection.errors}
              field={connection.field}
              id={connection.id}
              name={connection.name}
              onCancel={connection.onCancel}
              onChange={connection.onChange}
              onReset={connection.onReset}
              onSubmit={connection.onSubmit}
              placeholder={propsWithDefault.placeholder}
              slot="input"
              value={connection.value}
              variant={propsWithDefault.componentVariant}
            />

            <DataWarning name={propsWithDefault.name} slot="warning" warning={propsWithDefault.warning} />
          </AppLayout>
        </AppSuspense>
      </AppBoundary>
    </AppTheme>
  )
}
