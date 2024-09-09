import type { FunctionComponent } from 'react'

export interface PropsInputRating {
  as?: string
  name?: string
}

export const InputRating: FunctionComponent<PropsInputRating> = (props) => (
  <input className="input-rating" data-testid="view-input-rating" name={props.name} />
)
