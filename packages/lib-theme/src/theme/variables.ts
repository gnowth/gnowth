import { UtilNamespaced } from '@gnowth/lib-utils'

type VariableName = string
type Variables = UtilNamespaced<Variable, VariableName>
type Configs = { variables?: Variables }

export type Variable = unknown

export class VariableManager {
  #variables: Variables

  constructor(configs?: Configs) {
    this.#variables = configs?.variables ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return { variables: Object.assign({}, ...configs.map((config) => config.variables)) }
  }

  get<Type>(name: VariableName): Type | undefined {
    return this.#variables[name] as Type
  }
}
