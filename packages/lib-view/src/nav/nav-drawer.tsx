import type { FunctionComponent, ReactNode } from 'react'

export interface VariantNavDrawer {
  as?: string
}

export interface PropsNavDrawer {
  children: ReactNode
}

export const NavDrawer: FunctionComponent<PropsNavDrawer> = (props) => (
  <div className="nav-drawer">{props.children}</div>
)
