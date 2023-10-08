import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIPlaceholder {
  as?: string
}

export interface PropsUIPlaceholder {
  children?: ReactNode
  hidden?: boolean
}

export const UIPlaceholder: FunctionComponent<PropsUIPlaceholder> = (props) => (
  <div className="ui-placeholder">{props.children}</div>
)
