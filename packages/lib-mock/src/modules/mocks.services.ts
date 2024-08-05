import type { Server } from 'miragejs'

import { PlatformService } from '@gnowth/lib-platform'

export class MockService extends PlatformService {
  #server!: Server

  close() {
    return
  }

  listen() {
    return
  }

  async onInit(): Promise<void> {
    return
  }

  resetHandlers() {
    return
  }

  restoreHandlers() {
    return
  }

  use() {
    return
  }
}
