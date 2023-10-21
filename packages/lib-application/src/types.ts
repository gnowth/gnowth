import type { ReactNode } from 'react'
import type { Slottable } from '@gnowth/lib-utils-react'

// TODO verify if we need to standardise this props with other components
// TODO: check if props need to be optional
export interface PropsBoundary extends Slottable {
  className?: string
  resetErrorBoundary?: () => void
  value?: Error[] | Error | null
}

export interface PropsFrame {
  className?: string
  children: ReactNode
}

export interface PropsLayout {
  className?: string
  classNamespace?: string
  children: ReactNode
  id?: string
  spacing?: string | number
  variant?: string
}

export interface PropsSuspense {
  className?: string
}
