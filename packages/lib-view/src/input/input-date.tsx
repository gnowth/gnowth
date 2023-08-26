import React from 'react'

export interface VariantInputDate {
  as?: string
}

export interface PropsInputDate {
  name?: string
}

const InputDate: React.FunctionComponent<PropsInputDate> = (props) => (
  <input className="input-date" name={props.name} />
)

export default InputDate
