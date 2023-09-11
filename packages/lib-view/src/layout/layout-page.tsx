import React from 'react'

export interface VariantLayoutPage {
  as?: string
}

export interface PropsLayoutPage {
  children: React.ReactNode
}

export const LayoutPage: React.FunctionComponent<PropsLayoutPage> = (props) => (
  <div className="layout-page">{props.children}</div>
)
