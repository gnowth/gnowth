import { ObjectLiteral } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

type Params<Slug = string | string[] | undefined> = { slug: Slug }

// TODO: figure out why we can't extend FunctionComponent here
// https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
export interface PageServerComponent<Props> {
  (props: Props): Promise<ReactNode>
  generateStaticParams?: () => Promise<Params[]>
}

interface StaticPath<Slug = string | string[] | undefined> {
  fallback: boolean
  paths: { params: Params<Slug> }[]
}
interface StaticPropsContext<Slug = string | string[] | undefined> {
  params?: Params<Slug>
}

export interface PageClientComponent<Props, Slug = string | string[] | undefined>
  extends FunctionComponent<Props> {
  staticPaths?: () => Promise<StaticPath<Slug>>
  staticProps?: (context: StaticPropsContext<Slug>) => Promise<{ props: Props }>
}

export interface Slottable {
  slot?: string
}

export type HigherComponent<Props = ObjectLiteral, Props2 = Props> = (
  Component: ComponentType<Props>,
) => ComponentType<Props2>
