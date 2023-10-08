import type { FunctionComponent } from 'react'

export interface VariantInputOrdering {
  as?: string
}

export interface PropsInputOrdering {
  name?: string
}

export const InputOrdering: FunctionComponent<PropsInputOrdering> = (props) => (
  <input className="input-ordering" name={props.name} />
)
