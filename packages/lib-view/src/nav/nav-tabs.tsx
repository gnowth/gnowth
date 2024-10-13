import { FunctionComponent, ReactNode } from 'react'

export type PropsNavTabs = {
  as?: string
  children: ReactNode
}

export const NavTabs: FunctionComponent<PropsNavTabs> = (props) => (
  <div className="nav-tab" data-testid="view-nav-tabs">
    {props.children}
  </div>
)
