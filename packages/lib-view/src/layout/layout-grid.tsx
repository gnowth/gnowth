import type { FunctionComponent, ReactNode } from 'react'

export interface VariantLayoutGrid {
  as?: string
}

export interface PropsLayoutGrid {
  children: ReactNode
}

export const LayoutGrid: FunctionComponent<PropsLayoutGrid> = (props) => (
  <div className="layout-grid">{props.children}</div>
)
