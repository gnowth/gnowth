import type { FunctionComponent, ReactNode } from 'react'

export interface VariantNavMenu {
  as?: string
}

export interface PropsNavMenu {
  children: ReactNode
}

export const NavMenu: FunctionComponent<PropsNavMenu> = (props) => (
  <div className="nav-menu">{props.children}</div>
)
