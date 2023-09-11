import React from 'react'

export interface VariantUIPlaceholder {
  as?: string
}

export interface PropsUIPlaceholder {
  children?: React.ReactNode
  hidden?: boolean
}

export const UIPlaceholder: React.FunctionComponent<PropsUIPlaceholder> = (props) => (
  <div className="ui-placeholder">{props.children}</div>
)
