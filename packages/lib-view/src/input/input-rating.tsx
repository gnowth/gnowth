import React from 'react'

export interface VariantInputRating {
  as?: string
}

export interface PropsInputRating {
  name?: string
}

export const InputRating: React.FunctionComponent<PropsInputRating> = (props) => (
  <input className="input-rating" name={props.name} />
)
