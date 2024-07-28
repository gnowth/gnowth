import type { Slottable } from '@gnowth/lib-utils-react'
import type { ReactNode } from 'react'

// TODO verify if we need to standardise this props with other components
// TODO: check if props need to be optional
export interface PropsBoundary extends Slottable {
  className?: string
  resetErrorBoundary?: () => void
  value?: Error | Error[] | null
}

export interface PropsFrame {
  children: ReactNode
  className?: string
}

export interface PropsLayout {
  children: ReactNode
  className?: string
  classNamespace?: string
  id?: string
  spacing?: number | string
  variant?: PropsLayout | string
}

export interface PropsSuspense {
  className?: string
}
