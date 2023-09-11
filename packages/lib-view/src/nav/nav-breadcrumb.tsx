import React from 'react'

export interface VariantNavBreadcrumb {
  as?: string
}

export interface PropsNavBreadcrumb {
  children: React.ReactNode
}

export const NavBreadcrumb: React.FunctionComponent<PropsNavBreadcrumb> = (props) => (
  <div className="nav-breadcrumb">{props.children}</div>
)
