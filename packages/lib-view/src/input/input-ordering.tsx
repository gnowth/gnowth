import type { FunctionComponent } from 'react'

export interface PropsInputOrdering {
  as?: string
  name?: string
}

export const InputOrdering: FunctionComponent<PropsInputOrdering> = (props) => (
  <input className="input-ordering" data-testid="view-input-ordering" name={props.name} />
)
