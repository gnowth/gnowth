import React from 'react'

export interface VariantUIScrollSpy {
  as?: string
}

export interface PropsUIScrollSpy {
  children: React.ReactNode
}

export const UIScrollSpy: React.FunctionComponent<PropsUIScrollSpy> = (props) => (
  <div className="ui-scroll-spy">{props.children}</div>
)
