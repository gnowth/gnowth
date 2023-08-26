import React from 'react'

export interface VariantUIButtonGroup {
  as?: string
}

export interface PropsUIButtonGroup {
  children: React.ReactNode
}

const UIButtonGroup: React.FunctionComponent<PropsUIButtonGroup> = (props) => (
  <div className="ui-button-group">{props.children}</div>
)

export default UIButtonGroup
