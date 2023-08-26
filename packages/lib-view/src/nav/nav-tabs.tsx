import React from 'react'

export interface VariantNavTabs {
  as?: string
}

export interface PropsNavTabs {
  children: React.ReactNode
}

const NavTabs: React.FunctionComponent<PropsNavTabs> = (props) => (
  <div className="nav-tab">{props.children}</div>
)

export default NavTabs
