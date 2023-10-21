import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIAvatar {
  as?: string
  children: ReactNode
}

export const UIAvatar: FunctionComponent<PropsUIAvatar> = (props) => (
  <div className="ui-avatar">{props.children}</div>
)
