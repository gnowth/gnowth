import { FunctionComponent, ReactNode } from 'react'

export type PropsNavBreadcrumb = {
  as?: string
  children: ReactNode
}

export const NavBreadcrumb: FunctionComponent<PropsNavBreadcrumb> = (props) => (
  <div className="nav-breadcrumb" data-testid="view-nav-breadcrumb">
    {props.children}
  </div>
)
