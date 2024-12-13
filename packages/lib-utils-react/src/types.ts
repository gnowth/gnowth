import { ObjectLiteral } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

export type HigherComponent<Props = ObjectLiteral, Props2 = Props> = (
  Component: ComponentType<Props>,
) => ComponentType<Props2>

export type PageClientComponent<TProps = object, TParams = unknown> = FunctionComponent<TProps> & {
  Layout?: ComponentType
  staticPaths?: () => Promise<StaticPath<TParams>>
  staticProps?: (context: StaticPropsContext<TParams>) => Promise<{ props: TProps }>
}
// TODO: figure out why we can't extend FunctionComponent here
// https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
export type PageServerComponent<TParams = object> = {
  (props: { params?: TParams }): Promise<ReactNode>
  generateStaticParams?: () => Promise<TParams[]>
}

export type Slottable = {
  slot?: string
}

type StaticPath<TParams> = {
  fallback: boolean
  paths: { params: TParams }[]
}

type StaticPropsContext<TParams> = {
  params?: TParams
}
