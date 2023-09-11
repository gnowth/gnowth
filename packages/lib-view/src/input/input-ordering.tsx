import React from 'react'

export interface VariantInputOrdering {
  as?: string
}

export interface PropsInputOrdering {
  name?: string
}

export const InputOrdering: React.FunctionComponent<PropsInputOrdering> = (props) => (
  <input className="input-ordering" name={props.name} />
)
