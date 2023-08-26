import React from 'react'

export interface VariantLayoutFooter {
  as?: string
}

export interface PropsLayoutFooter {
  children: React.ReactNode
}

const LayoutFooter: React.FunctionComponent<PropsLayoutFooter> = (props) => (
  <footer className="layout-footer">{props.children}</footer>
)

export default LayoutFooter
