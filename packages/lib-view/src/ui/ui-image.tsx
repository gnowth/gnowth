import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIImage {
  as?: string
  children: ReactNode
}

export const UIImage: FunctionComponent<PropsUIImage> = (props) => (
  <div className="ui-image">{props.children}</div>
)
