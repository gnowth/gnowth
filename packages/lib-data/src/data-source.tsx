import type { DataValue, PropsLayout, Theme } from '@gnowth/lib-types'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import React from 'react'
import { AppLayout, AppTheme } from '@gnowth/lib-application'

import type { PropsUseDataSource } from './use-data-source'
import DataContext from './data-context'
import useDataSource from './use-data-source'

// TODO: get source from 'context', 'resource', 'datasource hook',
// TODO: note that using AppLayout directly from @gnowth/lib-application won't provide access to layout loader in @gnowth/lib-react, which is not what we want
// TODO: it should allow the layout to be a component
interface Props<Value extends DataValue> extends PropsUseDataSource<Value> {
  children: ReactNode
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  theme?: Theme | string
}

// TODO: find out where to put the default warning/label/trigger component?
function DataSource<Value extends DataValue>(props: Props<Value>): ReactElement<Props<Value>> {
  const dataSource = useDataSource(props)

  return (
    <AppTheme theme={props.theme}>
      <DataContext.Provider value={dataSource}>
        <AppLayout
          layout={props.layout}
          layoutProps={props.layoutProps}
          layoutSpacing={props.layoutSpacing}
          layoutVariant={props.layoutVariant}
        >
          {props.children}
        </AppLayout>
      </DataContext.Provider>
    </AppTheme>
  )
}

export default DataSource
