'use client'
import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type Props = { paths: string[] }
export const PageLanding: FunctionComponent<Props> = (props) => {
  return (
    <LayoutPage>
      <LayoutSection layoutProps={{ gap: 'xxs' }} layoutVariant="verticalStart" variant="container">
        {props.paths.map((path) => (
          <Link href={`/docs/docs/${path}`} key={path}>
            <UITypography value={path} variant="link" />
          </Link>
        ))}
      </LayoutSection>
    </LayoutPage>
  )
}
