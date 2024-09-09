import type { FunctionComponent, ReactNode } from 'react'

export interface PropsNavDrawer {
  as?: string
  children: ReactNode
}

export const NavDrawer: FunctionComponent<PropsNavDrawer> = (props) => (
  <div className="nav-drawer" data-testid="view-nav-drawer">
    {props.children}
  </div>
)
