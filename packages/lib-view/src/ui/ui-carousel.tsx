import { FunctionComponent, ReactNode } from 'react'

export type PropsUICarousel = {
  as?: string
  children: ReactNode
}

export const UICarousel: FunctionComponent<PropsUICarousel> = (props) => (
  <div className="ui-carousel" data-testid="view-ui-carousel">
    {props.children}
  </div>
)
