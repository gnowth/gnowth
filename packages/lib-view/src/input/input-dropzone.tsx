import type { FunctionComponent } from 'react'

export interface VariantInputDropzone {
  as?: string
}

export interface PropsInputDropzone {
  name?: string
}

export const InputDropzone: FunctionComponent<PropsInputDropzone> = (props) => (
  <input className="input-dropzone" name={props.name} />
)
