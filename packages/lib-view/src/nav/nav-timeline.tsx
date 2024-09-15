import { FunctionComponent, ReactNode } from 'react'

export interface PropsNavTimeline {
  as?: string
  children: ReactNode
}

export const NavTimeline: FunctionComponent<PropsNavTimeline> = (props) => (
  <div className="nav-timeline" data-testid="view-nav-timeline">
    {props.children}
  </div>
)
