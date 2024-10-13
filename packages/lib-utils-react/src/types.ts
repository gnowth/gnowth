import { ObjectLiteral } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

// TODO: figure out why we can't extend FunctionComponent here
// https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
export type PageServerComponent<TParams = object> = {
  (props: { params?: TParams }): Promise<ReactNode>
  generateStaticParams?: () => Promise<TParams[]>
}

type StaticPath<TParams> = {
  fallback: boolean
  paths: { params: TParams }[]
}
type StaticPropsContext<TParams> = {
  params?: TParams
}

export type PageClientComponent<TProps = object, TParams = unknown> = {
  Layout?: ComponentType
  staticPaths?: () => Promise<StaticPath<TParams>>
  staticProps?: (context: StaticPropsContext<TParams>) => Promise<{ props: TProps }>
} & FunctionComponent<TProps>

export type Slottable = {
  slot?: string
}

export type HigherComponent<Props = ObjectLiteral, Props2 = Props> = (
  Component: ComponentType<Props>,
) => ComponentType<Props2>
