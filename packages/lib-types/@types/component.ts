import type { ReactNode } from 'react'
import { Slottable } from './util'

// TODO verify if we need to standardise this props with other components
export interface PropsBoundary extends Slottable {
  value?: Error[] | Error | null
}

export interface PropsFrame {
  className?: string
}

export interface PropsLayout {
  className?: string
  classNameRoot?: string
  children: ReactNode
  id?: string
  spacing?: string | number
  variant?: string
}

export interface PropsSuspense {
  className?: string
}
