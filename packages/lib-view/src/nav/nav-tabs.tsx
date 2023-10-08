import type { FunctionComponent, ReactNode } from 'react'

export interface VariantNavTabs {
  as?: string
}

export interface PropsNavTabs {
  children: ReactNode
}

export const NavTabs: FunctionComponent<PropsNavTabs> = (props) => (
  <div className="nav-tab">{props.children}</div>
)
