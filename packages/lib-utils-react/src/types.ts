import type { FunctionComponent, ReactNode } from 'react'

type Params<Slug = string[] | string | undefined> = { slug: Slug }

// TODO: figure out why we can't extend FunctionComponent here
// https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
export interface PageComponent<Props> {
  (props: Props): Promise<ReactNode>
  generateStaticParams?: () => Promise<Params[]>
}

interface StaticPath<Slug = string[] | string | undefined> {
  paths: { params: Params<Slug> }[]
  fallback: boolean
}
interface StaticPropsContext<Slug = string[] | string | undefined> {
  params?: Params<Slug>
}

export interface PageComponentPages<Props, Slug = string[] | string | undefined>
  extends FunctionComponent<Props> {
  staticPaths?: () => Promise<StaticPath<Slug>>
  staticProps?: (context: StaticPropsContext<Slug>) => Promise<{ props: Props }>
}
