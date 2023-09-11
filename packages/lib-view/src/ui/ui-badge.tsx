import React from 'react'

export interface VariantUIBadge {
  as?: string
}

export interface PropsUIBadge {
  children: React.ReactNode
}

export const UIBadge: React.FunctionComponent<PropsUIBadge> = (props) => (
  <div className="ui-badge">{props.children}</div>
)
