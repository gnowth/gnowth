import React from 'react'

export interface VariantInputDropzone {
  as?: string
}

export interface PropsInputDropzone {
  name?: string
}

const InputDropzone: React.FunctionComponent<PropsInputDropzone> = (props) => (
  <input className="input-dropzone" name={props.name} />
)

export default InputDropzone
