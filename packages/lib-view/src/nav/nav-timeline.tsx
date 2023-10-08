import type { FunctionComponent, ReactNode } from 'react'

export interface VariantNavTimeline {
  as?: string
}

export interface PropsNavTimeline {
  children: ReactNode
}

export const NavTimeline: FunctionComponent<PropsNavTimeline> = (props) => (
  <div className="nav-timeline">{props.children}</div>
)
