import { FunctionComponent } from 'react'

export type PropsUIImage = {
  alt?: string
  as?: string
  src: string
}

export const UIImage: FunctionComponent<PropsUIImage> = (props) => (
  <img alt={props.alt} className="ui-image" data-testid="view-ui-image" src={props.src} />
)
