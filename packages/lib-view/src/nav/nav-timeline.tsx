import React from 'react'

export interface VariantNavTimeline {
  as?: string
}

export interface PropsNavTimeline {
  children: React.ReactNode
}

export const NavTimeline: React.FunctionComponent<PropsNavTimeline> = (props) => (
  <div className="nav-timeline">{props.children}</div>
)
