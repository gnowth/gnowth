import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIAlert {
  as?: string
}

export interface PropsUIAlert {
  children: ReactNode
}

export const UIAlert: FunctionComponent<PropsUIAlert> = (props) => (
  <div className="ui-alert">{props.children}</div>
)
