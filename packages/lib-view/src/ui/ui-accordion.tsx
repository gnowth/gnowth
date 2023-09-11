// Note: should UICollapse be different?
import React from 'react'

export interface VariantUIAccordion {
  as?: string
}

export interface PropsUIAccordion {
  children: React.ReactNode
}

export const UIAccordion: React.FunctionComponent<PropsUIAccordion> = (props) => (
  <div className="ui-accordion">{props.children}</div>
)
