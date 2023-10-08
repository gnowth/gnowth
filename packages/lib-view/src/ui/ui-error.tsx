import type { ReactElement } from 'react'
import { LayoutContent } from '../layout/layout-content'
import { UITypography } from './ui-typography'

export interface VariantUIError {
  as?: string
}

export interface PropsUIError {
  value?: Error[] | Error | null
}

export function UIError(props: PropsUIError): ReactElement | null {
  if (!props.value) return null

  return (
    <LayoutContent>
      {Array.isArray(props.value) &&
        props.value.map((error) => <UITypography key={error.message} value={error.message} />)}

      {!Array.isArray(props.value) && <UITypography value={props.value.message} />}
    </LayoutContent>
  )
}
