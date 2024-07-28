import type { ComponentType, ReactElement, ReactNode } from 'react'

import { objectDefaults } from '@gnowth/lib-utils'

import type { PropsLayout } from './types'

import { useAppLayout } from './use-app-layout'

// TODO: check whether we need layoutProps, can it be layoutVariant with object or vice versa
interface Props {
  children: ReactNode
  className?: string
  classNamespace?: string
  id?: string
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: number | string
  layoutVariant?: string
  slot?: string
}

// TODO: changing layout, can be a place that require transition
export function AppLayout(props: Props): ReactElement {
  const LayoutComponent = useAppLayout(props.layout)

  if (!LayoutComponent) return <>{props.children}</>

  const propsCombined = objectDefaults(
    {
      className: props.className,
      classNamespace: props.classNamespace,
      id: props.id,
      spacing: props.layoutSpacing,
      variant: props.layoutVariant,
    },
    props.layoutProps,
  )

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutComponent {...propsCombined}>{props.children}</LayoutComponent>
  )
}
