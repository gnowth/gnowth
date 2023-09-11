import React from 'react'

export interface VariantUIImage {
  as?: string
}

export interface PropsUIImage {
  children: React.ReactNode
}

export const UIImage: React.FunctionComponent<PropsUIImage> = (props) => (
  <div className="ui-image">{props.children}</div>
)
