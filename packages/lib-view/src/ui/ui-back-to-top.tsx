import React from 'react'

export interface VariantUIBackToTop {
  as?: string
}

export interface PropsUIBackToTop {
  children: React.ReactNode
}

export const UIBackToTop: React.FunctionComponent<PropsUIBackToTop> = (props) => (
  <div className="ui-back-to-top">{props.children}</div>
)
