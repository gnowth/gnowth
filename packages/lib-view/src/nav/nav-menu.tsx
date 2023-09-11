import React from 'react'

export interface VariantNavMenu {
  as?: string
}

export interface PropsNavMenu {
  children: React.ReactNode
}

export const NavMenu: React.FunctionComponent<PropsNavMenu> = (props) => (
  <div className="nav-menu">{props.children}</div>
)
