import type { FunctionComponent, ReactNode } from 'react'

export interface PropsNavTabs {
  as?: string
  children: ReactNode
}

export const NavTabs: FunctionComponent<PropsNavTabs> = (props) => (
  <div className="nav-tab">{props.children}</div>
)
