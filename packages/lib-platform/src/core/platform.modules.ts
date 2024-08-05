import type { Platform } from './platform.main'
import type { PlatformModuleDefinition } from './platform.types'

type Configs = {
  preloads: PlatformModuleDefinition[]
}

type Parameters = {
  platform: Platform
}

export class PlatformModule {
  protected platform: Platform

  constructor(parameters: Parameters) {
    this.platform = parameters.platform
  }

  static async construct(parameters: Parameters): Promise<PlatformModule> {
    return new this(parameters)
  }

  static async info(): Promise<Configs> {
    return {
      preloads: [],
    }
  }
}

export class PlatformService extends PlatformModule {}

export class PlatformMFE extends PlatformModule {}

export class PlatformStream extends PlatformModule {}

export class PlatformResource extends PlatformModule {}
