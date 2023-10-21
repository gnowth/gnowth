import type { FunctionComponent } from 'react'

export interface PropsInputDropzone {
  as?: string
  name?: string
}

export const InputDropzone: FunctionComponent<PropsInputDropzone> = (props) => (
  <input className="input-dropzone" name={props.name} />
)
