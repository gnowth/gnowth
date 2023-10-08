import type {
  PropsBoundary,
  PropsLayout,
  PropsSuspense,
  Model,
  PropsData,
  PropsDataReadonly,
  Slottable,
} from '@gnowth/lib-types'
import { Theme } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent } from 'react'
import { AppBoundary, AppLayout, AppSuspense, AppTheme, useAppTheme } from '@gnowth/lib-application'
import { UtilError } from '@gnowth/lib-util'
import { objectDefaults } from '@gnowth/lib-utils'

import type { PropsUseDataConnect } from './use-data-connect'
import { DataWarning } from './data-warning'
import { useDataConnect } from './use-data-connect'

interface PropsComponent extends PropsData, Slottable {
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
  layoutSpacing?: string | number
  layoutVariant?: string
  many?: boolean
  readonly?: boolean
  slot?: string
  suspense?: ComponentType<PropsSuspense> | string | null
  suspenseClassName?: string
  theme?: Theme | string
  warning?: ComponentType<PropsBoundary> | string | null
  warningModel?: Model
}

const errorCustomComponent = new UtilError({
  message: 'unable to get component. Check props "component" or "type" or "theme" or "field" from dataSource',
  method: 'DataConnect',
  package: '@gnowth/lib-application',
})

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

  const LabelComponent = theme.getComponent({
    component: propsWithDefault.label,
    namespace: 'type',
  })

  const Component = theme.getComponent({
    component: propsWithDefault.component ?? connection.field?.type,
    namespace: propsWithDefault.readonly ? 'type' : 'input',
  })

  if (!Component) throw errorCustomComponent

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
            layoutSpacing={propsWithDefault.layoutSpacing}
            layoutVariant={propsWithDefault.layoutVariant}
          >
            {propsWithDefault.labelValue && LabelComponent && (
              <LabelComponent slot="label" value={propsWithDefault.labelValue} />
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
