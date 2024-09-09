import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUICarousel {
  as?: string
  children: ReactNode
}

export const UICarousel: FunctionComponent<PropsUICarousel> = (props) => (
  <div className="ui-carousel" data-testid="view-ui-carousel">
    {props.children}
  </div>
)
