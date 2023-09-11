interface Configs {
  message: string
  method: string
  package: string
  type?: string[] | string
}

export class UtilError extends Error {
  type?: string[] | string

  constructor(configs: Configs) {
    super(`${configs.package} [${configs.method}]: ${configs.message}`)

    this.type = configs.type
  }
}
