import type { FunctionComponent, ReactNode } from 'react'

export interface PropsLayoutGrid {
  as?: string
  children: ReactNode
}

export const LayoutGrid: FunctionComponent<PropsLayoutGrid> = (props) => (
  <div className="layout-grid">{props.children}</div>
)
