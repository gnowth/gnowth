import React from 'react'

export interface VariantUITooltip {
  as?: string
}

export interface PropsUITooltip extends VariantUITooltip {
  children: React.ReactNode
}

const UITooltip: React.FunctionComponent<PropsUITooltip> = (props) => (
  <div className="ui-tooltip">{props.children}</div>
)

export default UITooltip
