import { FunctionComponent, ReactNode } from 'react'

export interface PropsNavMenu {
  as?: string
  children: ReactNode
}

export const NavMenu: FunctionComponent<PropsNavMenu> = (props) => (
  <div className="nav-menu" data-testid="view-nav-menu">
    {props.children}
  </div>
)
