import React from 'react'

export interface VariantLayoutGrid {
  as?: string
}

export interface PropsLayoutGrid {
  children: React.ReactNode
}

export const LayoutGrid: React.FunctionComponent<PropsLayoutGrid> = (props) => (
  <div className="layout-grid">{props.children}</div>
)
