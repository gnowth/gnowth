import React from 'react'

export interface VariantInputTextarea {
  as?: string
}

export interface PropsInputTextarea {
  name?: string
}

export const InputTextarea: React.FunctionComponent<PropsInputTextarea> = (props) => (
  <input className="input-textarea" name={props.name} />
)
