import type { DependencyDefinition } from './dependencies.types'

type Configs = {
  dependencies: DependencyDefinition[]
  preloads: DependencyDefinition[]
}

export class Dependency {
  async onInit(): Promise<void> {
    return
  }

  async onPrepare(): Promise<Configs> {
    return {
      dependencies: [],
      preloads: [],
    }
  }
}
