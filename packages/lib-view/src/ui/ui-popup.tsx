import React from 'react'

export interface VariantUIPopup {
  as?: string
}

export interface PropsUIPopup {
  children: React.ReactNode
}

export const UIPopup: React.FunctionComponent<PropsUIPopup> = (props) => (
  <div className="ui-popup">{props.children}</div>
)
