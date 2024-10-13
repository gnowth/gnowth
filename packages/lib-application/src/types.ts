import { Slottable } from '@gnowth/lib-utils-react'
import { ReactNode } from 'react'

// TODO verify if we need to standardise this props with other components
// TODO: check if props need to be optional
export type PropsBoundary = {
  className?: string
  resetErrorBoundary?: () => void
  value?: Error | Error[] | null
} & Slottable

export type PropsFrame = {
  children: ReactNode
  className?: string
}

export type PropsLayout = {
  children: ReactNode
  className?: string
  classNamespace?: string
  id?: string
  variant?: PropsLayout | string
}

export type PropsSuspense = {
  className?: string
}
