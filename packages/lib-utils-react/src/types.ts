import { ObjectLiteral } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

// TODO: figure out why we can't extend FunctionComponent here
// https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
export interface PageServerComponent<TParams = object> {
  (props: { params?: TParams }): Promise<ReactNode>
  generateStaticParams?: () => Promise<TParams[]>
}

interface StaticPath<TParams> {
  fallback: boolean
  paths: { params: TParams }[]
}
interface StaticPropsContext<TParams> {
  params?: TParams
}

export interface PageClientComponent<TProps = object, TParams = unknown> extends FunctionComponent<TProps> {
  Layout?: ComponentType
  staticPaths?: () => Promise<StaticPath<TParams>>
  staticProps?: (context: StaticPropsContext<TParams>) => Promise<{ props: TProps }>
}

export interface Slottable {
  slot?: string
}

export type HigherComponent<Props = ObjectLiteral, Props2 = Props> = (
  Component: ComponentType<Props>,
) => ComponentType<Props2>
