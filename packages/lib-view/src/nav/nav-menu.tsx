import React from 'react'

export interface VariantNavMenu {
  as?: string
}

export interface PropsNavMenu {
  children: React.ReactNode
}

const NavMenu: React.FunctionComponent<PropsNavMenu> = (props) => (
  <div className="nav-menu">{props.children}</div>
)

export default NavMenu
