// Note: see ant design. very similar to skeleton
import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIEmpty {
  as?: string
}

export interface PropsUIEmpty {
  children: ReactNode
}

export const UIEmpty: FunctionComponent<PropsUIEmpty> = (props) => (
  <div className="ui-empty">{props.children}</div>
)
