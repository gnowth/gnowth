import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIImage {
  as?: string
}

export interface PropsUIImage {
  children: ReactNode
}

export const UIImage: FunctionComponent<PropsUIImage> = (props) => (
  <div className="ui-image">{props.children}</div>
)
