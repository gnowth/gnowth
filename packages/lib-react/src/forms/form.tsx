// use service to fetch data if required
// use dataId to know whether to fetch or create

import type { FunctionComponent, ComponentType } from "react";

type Responsive<Type> = {
  default: Type
  xs?: Type
  sm?: Type
  md?: Type
  lg?: Type
  xl: Type
}

interface InterfaceServiceForm<Type> {
  fromPartial(partial?: Partial<Type>, partial2?: Partial<Type>): Type
}

type Services = {
  serviceLogger: ''
}

type Props<Type> = {
  boundaryComponent?: ComponentType
  suspenseComponent?: ComponentType
  dataId?: string
  layout?: ComponentType | Responsive<ComponentType>
  service: InterfaceServiceForm<Type>
  services: Services
}

export const Form: FunctionComponent<Props> = (props) => <div>{!props}</div>
