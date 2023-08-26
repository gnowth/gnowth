import React from 'react'

export interface VariantInputTextarea {
  as?: string
}

export interface PropsInputTextarea {
  name?: string
}

const InputTextarea: React.FunctionComponent<PropsInputTextarea> = (props) => (
  <input className="input-textarea" name={props.name} />
)

export default InputTextarea
