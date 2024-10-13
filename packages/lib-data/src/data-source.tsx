import { AppLayout, AppTheme, PropsLayout } from '@gnowth/lib-application'
import { Theme } from '@gnowth/lib-theme'
import { ComponentType, ReactElement, ReactNode } from 'react'

import { DataContext } from './data-context'
import { DataValue } from './types'
import { PropsUseDataSource, useDataSource } from './use-data-source'

// TODO: get source from 'context', 'resource', 'datasource hook',
// TODO: note that using AppLayout directly from @gnowth/lib-application won't provide access to layout loader in @gnowth/lib-react, which is not what we want
// TODO: it should allow the layout to be a component
type Props<Value extends DataValue> = {
  children: ReactNode
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutVariant?: string
  theme?: Theme | string
} & PropsUseDataSource<Value>

// TODO: find out where to put the default warning/label/trigger component?
export function DataSource<Value extends DataValue>(props: Props<Value>): ReactElement<Props<Value>> {
  const dataSource = useDataSource(props)

  return (
    <AppTheme theme={props.theme}>
      <DataContext.Provider value={dataSource}>
        <AppLayout layout={props.layout} layoutProps={props.layoutProps} layoutVariant={props.layoutVariant}>
          {props.children}
        </AppLayout>
      </DataContext.Provider>
    </AppTheme>
  )
}
