import React from 'react'

export interface VariantLayoutPage {
  as?: string
}

export interface PropsLayoutPage {
  children: React.ReactNode
}

const LayoutPage: React.FunctionComponent<PropsLayoutPage> = (props) => (
  <div className="layout-page">{props.children}</div>
)

export default LayoutPage
