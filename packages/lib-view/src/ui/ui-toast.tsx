import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIToast {
  as?: string
  children: ReactNode
}

export const UIToast: FunctionComponent<PropsUIToast> = (props) => (
  <div className="ui-toast">{props.children}</div>
)
