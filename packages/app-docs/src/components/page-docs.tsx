'use client'
import { LayoutPage, LayoutSection } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

export const PageDoc: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <LayoutPage>
      <LayoutSection variant="container">{props.children}</LayoutSection>
    </LayoutPage>
  )
}
