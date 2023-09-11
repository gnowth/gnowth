import React from 'react'

export interface VariantNavDrawer {
  as?: string
}

export interface PropsNavDrawer {
  children: React.ReactNode
}

export const NavDrawer: React.FunctionComponent<PropsNavDrawer> = (props) => (
  <div className="nav-drawer">{props.children}</div>
)
